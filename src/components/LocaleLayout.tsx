import { Outlet, useParams, Navigate } from "react-router-dom";
import { I18nContext, translations, type Locale } from "@/i18n";

const VALID_LOCALES = new Set<string>(["en", "pt", "fr"]);

const LocaleLayout = () => {
  const { lang } = useParams<{ lang: string }>();

  if (!lang || !VALID_LOCALES.has(lang)) {
    return <Navigate to="/en" replace />;
  }

  const locale = lang as Locale;

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale] }}>
      <Outlet />
    </I18nContext.Provider>
  );
};

export default LocaleLayout;
