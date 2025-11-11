"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { dictionaries, type Dictionary, type Locale } from "@/lib/i18n/dictionaries";
import { DEFAULT_DOC_LANGUAGE } from "@/lib/i18n/doc-config";
import { parseDocPath } from "@/lib/i18n/routing";

const LANGUAGE_STORAGE_KEY = "preferred-language";

interface LanguageContextValue {
  language: Locale;
  setLanguage: (next: Locale) => void;
  dictionary: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Locale>(DEFAULT_DOC_LANGUAGE);
  const pathname = usePathname();

  useEffect(() => {
    const docPathInfo = pathname ? parseDocPath(pathname) : null;
    if (docPathInfo) {
      setLanguageState(docPathInfo.locale);
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, docPathInfo.locale);
      return;
    }

    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "en" || stored === "zh") {
      setLanguageState(stored);
    }
  }, [pathname]);

  const setLanguage = useCallback((next: Locale) => {
    setLanguageState(next);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      dictionary: dictionaries[language],
    }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
