import { useEffect } from "react";
import { useI18n, type Locale } from "@/i18n";

const SITE_URL = "https://nvtsdigital.com";

const seoData: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "NVTS Digital — One Expert. Five Pillars. Zero Gaps.",
    description:
      "I help ambitious companies generate more revenue, reduce operational friction and build digital experiences that actually perform across every layer of the stack.",
  },
  pt: {
    title: "NVTS Digital — Um Especialista. Cinco Pilares. Zero Lacunas.",
    description:
      "Ajudo empresas ambiciosas a gerar mais receita, reduzir fricção operacional e construir experiências digitais que realmente funcionam em todas as camadas do stack.",
  },
  fr: {
    title: "NVTS Digital — Un Expert. Cinq Piliers. Zéro Lacune.",
    description:
      "J'aide les entreprises ambitieuses à générer plus de revenus, réduire les frictions opérationnelles et construire des expériences digitales qui performent réellement.",
  },
};

const LOCALES: Locale[] = ["en", "pt", "fr"];

const useHeadMeta = () => {
  const { locale } = useI18n();

  useEffect(() => {
    const { title, description } = seoData[locale];

    document.title = title;
    document.documentElement.lang = locale;

    const setMeta = (selector: string, value: string, attr = "content") => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);

    // Remove old hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

    // Add hreflang links
    LOCALES.forEach((loc) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = loc;
      link.href = `${SITE_URL}/${loc}`;
      document.head.appendChild(link);
    });

    // x-default → en
    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.setAttribute("hreflang", "x-default");
    xDefault.href = `${SITE_URL}/en`;
    document.head.appendChild(xDefault);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}/${locale}`;

    // JSON-LD Organization structured data
    const JSON_LD_ID = "json-ld-organization";
    let scriptEl = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = JSON_LD_ID;
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "NVTS Digital",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      description,
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@nvtsdigital.com",
        contactType: "customer service",
        availableLanguage: ["English", "Portuguese", "French"],
      },
      sameAs: [],
      knowsAbout: [
        "Digital Transformation",
        "Data & Content Intelligence",
        "E-Commerce",
        "Growth & Acquisition",
        "Artificial Intelligence",
      ],
    });
  }, [locale]);
};

export default useHeadMeta;
