import AsyncStorage from "@react-native-async-storage/async-storage";
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
  lng: "en", // fallback
  fallbackLng: "en",
  compatibilityJSON: "v4",
  interpolation: {
    escapeValue: false,
  },
});

export const loadLanguage = async () => {
  const saved = await AsyncStorage.getItem("language");
  if (saved) i18n.changeLanguage(saved);
};

export const changeAppLanguage = async (lng: "en" | "sp") => {
  await i18n.changeLanguage(lng);
  await AsyncStorage.setItem("language", lng);
};

export default i18n;
