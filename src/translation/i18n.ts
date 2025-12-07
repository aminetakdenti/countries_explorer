import { useCallback, useEffect, useState } from "react";

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
  lng: "en",
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

type Language = "en" | "sp";

export const useLanguage = () => {
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const saved = await AsyncStorage.getItem("language");
      if (saved === "en" || saved === "sp") {
        await i18n.changeLanguage(saved);
        setCurrentLang(saved);
      }
      setLoading(false);
    };
    init();
  }, []);

  const changeLanguage = useCallback(async (lng: Language) => {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem("language", lng);
    setCurrentLang(lng);
  }, []);

  return { currentLang, changeLanguage, loading };
};

export default i18n;
