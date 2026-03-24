import { createContext, useContext } from "react";
import type { Locale, Translations } from "./types";
import { en } from "./en";
import { pt } from "./pt";
import { fr } from "./fr";

export type { Locale, Translations };

export const translations: Record<Locale, Translations> = { en, pt, fr };

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "fr", label: "FR" },
];

export const I18nContext = createContext<{ locale: Locale; t: Translations }>({
  locale: "en",
  t: en,
});

export const useI18n = () => useContext(I18nContext);
