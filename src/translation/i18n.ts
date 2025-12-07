import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./locales/en.json";
import translationSp from "./locales/sp.json";

const resources = {
  en: { translation: translationEn },
  sp: { translation: translationSp },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  compatibilityJSON: "v4",
  interpolation: { escapeValue: false },
  react: {
    useSuspense: false,
  },
});

export default i18n;
