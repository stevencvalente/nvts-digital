/**
 * Pulls translations from the public Google Sheet and regenerates
 * src/i18n/en.ts, src/i18n/pt.ts, src/i18n/fr.ts.
 *
 * Run:  npx tsx scripts/sync-translations.ts
 */

const SHEET_ID = "1nvEXo4ppQDomajLlmoY-p8xZrW0JveNdX76OnwFxVHU";
const GID = "1947049881";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ---------- CSV parser (handles quoted fields with newlines) ----------
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let i = 0;
  while (i < text.length) {
    const row: string[] = [];
    while (i < text.length) {
      if (text[i] === '"') {
        i++; // skip opening quote
        let field = "";
        while (i < text.length) {
          if (text[i] === '"') {
            if (text[i + 1] === '"') { field += '"'; i += 2; }
            else { i++; break; }
          } else { field += text[i]; i++; }
        }
        row.push(field);
      } else {
        let field = "";
        while (i < text.length && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') {
          field += text[i]; i++;
        }
        row.push(field);
      }
      if (i < text.length && text[i] === ',') { i++; continue; }
      if (i < text.length && text[i] === '\r') i++;
      if (i < text.length && text[i] === '\n') i++;
      break;
    }
    if (row.length > 0) rows.push(row);
  }
  return rows;
}

// ---------- Rebuild nested object from dot-notation keys ----------
function setNested(obj: any, keyPath: string, value: string) {
  const parts: (string | number)[] = [];
  for (const seg of keyPath.split(".")) {
    const m = seg.match(/^(.+?)\[(\d+)\]$/);
    if (m) { parts.push(m[1], parseInt(m[2])); }
    else parts.push(seg);
  }
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const next = parts[i + 1];
    if (cur[key] === undefined) {
      cur[key] = typeof next === "number" ? [] : {};
    }
    cur = cur[key];
  }
  const last = parts[parts.length - 1];
  // If value looks like a JSON array of strings (services field)
  if (value.startsWith("[") && value.endsWith("]")) {
    try { cur[last] = JSON.parse(value); return; } catch {}
  }
  cur[last] = value;
}

function toSource(langVar: string, obj: any): string {
  const json = JSON.stringify(obj, null, 2);
  // Escape backticks and ${} in template
  const escaped = json
    .replace(/\\\\/g, "\\\\")
    .replace(/\\n/g, "\\n");
  return `import type { Translations } from "./types";\n\nexport const ${langVar}: Translations = ${escaped};\n`;
}

// ---------- Main ----------
async function main() {
  console.log("Fetching translations from Google Sheet...");
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);
  const csv = await res.text();
  const rows = parseCsv(csv);
  const header = rows[0]; // Key, English, Português, Français
  console.log(`Parsed ${rows.length - 1} translation keys.`);

  const langs: Record<string, any> = { en: {}, pt: {}, fr: {} };
  const colMap: Record<number, string> = { 1: "en", 2: "pt", 3: "fr" };

  for (let r = 1; r < rows.length; r++) {
    const key = rows[r][0];
    if (!key) continue;
    for (const [colIdx, lang] of Object.entries(colMap)) {
      const val = rows[r][parseInt(colIdx)] ?? "";
      setNested(langs[lang], key, val);
    }
  }

  const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), "../src/i18n");
  for (const [lang, obj] of Object.entries(langs)) {
    const path = resolve(srcDir, `${lang}.ts`);
    writeFileSync(path, toSource(lang, obj), "utf-8");
    console.log(`  ✓ ${path}`);
  }
  console.log("Done!");
}

main().catch((e) => { console.error(e); process.exit(1); });
