import { DEFAULT_DOC_LANGUAGE, docLanguages, type DocLanguage } from "@/lib/i18n/doc-config";

interface DocPathInfo {
  locale: DocLanguage;
  segments: string[];
}

const DOCS_SEGMENT = "docs";

const stripDelimiters = (pathname: string) => pathname.split(/[?#]/)[0];

const splitPathname = (pathname: string) => stripDelimiters(pathname).split("/").filter(Boolean);

export const isDocLanguage = (value: string | undefined): value is DocLanguage =>
  Boolean(value && docLanguages.includes(value as DocLanguage));

export const parseDocPath = (pathname: string): DocPathInfo | null => {
  const segments = splitPathname(pathname);
  if (segments.length === 0) return null;

  if (segments[0] === DOCS_SEGMENT) {
    return {
      locale: DEFAULT_DOC_LANGUAGE,
      segments: segments.slice(1),
    };
  }

  const maybeLocale = segments[0];
  if (isDocLanguage(maybeLocale) && segments[1] === DOCS_SEGMENT) {
    return {
      locale: maybeLocale,
      segments: segments.slice(2),
    };
  }

  return null;
};

export const buildDocPath = (locale: DocLanguage, segments: readonly string[] = []): string => {
  const suffix = segments.length > 0 ? `/${segments.join("/")}` : "";
  if (locale === DEFAULT_DOC_LANGUAGE) {
    return `/${DOCS_SEGMENT}${suffix}`;
  }
  return `/${locale}/${DOCS_SEGMENT}${suffix}`;
};

export const getLocalizedDocPath = (pathname: string, locale: DocLanguage): string | null => {
  const info = parseDocPath(pathname);
  if (!info) return null;
  return buildDocPath(locale, info.segments);
};
