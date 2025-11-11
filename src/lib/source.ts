import { docs, blog as blogPosts, product } from "@/.source";
import { loader, type VirtualFile } from "fumadocs-core/source";
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

const localizedDocsSource = {
  files(): VirtualFile[] {
    const files = docsSource.files();
    return files.map((file) => {
      if (docLanguages.some((locale) => file.path.startsWith(`${locale}/`))) {
        return file;
      }

      const normalized = file.absolutePath.replace(/\\/g, "/");
      const match = normalized.match(/\/content\/(en|zh)\//);
      const locale = match?.[1] as DocLanguage | undefined;
      if (!locale) return file;

      return {
        ...file,
        path: `${locale}/${file.path}`,
      };
    });
  },
};

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: "/docs",
  source: localizedDocsSource,
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
