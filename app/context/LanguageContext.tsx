import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (enText: string, hiText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 🎯 यहाँ 'export' होना ज़रूरी है क्योंकि _layout में इसे { LanguageProvider } करके मंगाया गया है
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const loadLang = async () => {
      const savedLang = await AsyncStorage.getItem("user_lang");
      if (savedLang === "en" || savedLang === "hi") {
        setLangState(savedLang);
      }
    };
    loadLang();
  }, []);

  const setLang = async (newLang: Language) => {
    setLangState(newLang);
    await AsyncStorage.setItem("user_lang", newLang);
  };

  const t = (enText: string, hiText: string) => {
    return lang === "en" ? enText : hiText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 🎯 हुक एक्सपोर्ट
export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
}
export default function DummyLanguageComponent() { return null; }