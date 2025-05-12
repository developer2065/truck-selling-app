// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// فایل‌های ترجمه
import translationFA from "@/public/locales/fa/navbar.json";
import translationEN from "@/public/locales/en/navbar.json";

const resources = {
  fa: {
    navbar: translationFA,
  },
  en: {
    navbar: translationEN,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    ns: ["navbar"],
    defaultNS: "navbar",
    fallbackLng: "fa",
    supportedLngs: ["fa", "en", "ar"],

    // برای تشخیص زبان از URL استفاده کنید
    detection: {
      order: ["path", "navigator", "htmlTag"],
      lookupFromPathIndex: 0,
      checkWhitelist: true,
    },

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
