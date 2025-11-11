import { docs, blog as blogPosts, product } from "@/.source";
import { loader } from "fumadocs-core/source";
import type { LocaleItem } from "fumadocs-ui/contexts/i18n";
import { createMDXSource } from "fumadocs-mdx";
import {
  DEFAULT_DOC_LANGUAGE,
  docLanguages,
  docLocaleLabels,
  type DocLanguage,
} from "@/lib/i18n/doc-config";

const docsI18n = {
  languages: Array.from(docLanguages),
  defaultLanguage: DEFAULT_DOC_LANGUAGE,
  hideLocale: "default-locale" as const,
  parser: "dir" as const,
};

const docsSource = docs.toFumadocsSource();

export const source = loader({
  // it assigns a URL to your pages
  baseUrl: "/content",
  source: docsSource,
  i18n: docsI18n,
});

export const docsI18nConfig = docsI18n;
export { docLanguages, DEFAULT_DOC_LANGUAGE };
export const docLocaleItems: LocaleItem[] = docLanguages.map((locale) => ({
  locale,
  name: docLocaleLabels[locale as DocLanguage] ?? locale.toUpperCase(),
}));

export const blog = loader({
  baseUrl: "/blog",
  source: createMDXSource(blogPosts),
});

export const products = loader({
  baseUrl: "/products",
  source: createMDXSource(product),
});
