const DOC_LANGUAGES = ["en", "zh"] as const;

export type DocLanguage = (typeof DOC_LANGUAGES)[number];

export const docLanguages = Array.from(DOC_LANGUAGES);

export const DEFAULT_DOC_LANGUAGE: DocLanguage = DOC_LANGUAGES[0];

export const docLocaleLabels: Record<DocLanguage, string> = {
  en: "English",
  zh: "中文",
};
