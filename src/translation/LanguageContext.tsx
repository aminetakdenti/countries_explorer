import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import i18n from "./i18n";

type Language = "en" | "sp";

interface LanguageContextType {
  currentLang: Language;
  changeLanguage: (lng: Language) => Promise<void>;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const saved = await AsyncStorage.getItem("language");
        console.log("saved language: ", saved);

        const langToUse = saved === "en" || saved === "sp" ? saved : "en";

        await i18n.changeLanguage(langToUse);
        setCurrentLang(langToUse);
      } catch {
      } finally {
        setIsReady(true);
      }
    };
    init();
  }, []);

  const changeLanguage = async (lng: Language) => {
    try {
      await i18n.changeLanguage(lng);
      await AsyncStorage.setItem("language", lng);
      setCurrentLang(lng);

      // Force a small delay to ensure i18n has updated
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, isReady }}>
      {isReady ? children : null}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
