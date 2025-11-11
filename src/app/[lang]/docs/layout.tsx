import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { I18nProvider } from "fumadocs-ui/i18n";
import { docLanguages, docsI18nConfig, docLocaleItems, source } from "@/lib/source";

interface LangLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export default function LangDocsLayout({ children, params }: LangLayoutProps) {
  const lang = params.lang;

  if (!docLanguages.includes(lang)) {
    notFound();
  }

  return (
    <I18nProvider locale={lang} locales={docLocaleItems}>
      <div className="flex-1 flex flex-col">
        <DocsLayout
          tree={source.getPageTree(lang)}
          i18n={docsI18nConfig}
          nav={{
            enabled: false,
          }}
          searchToggle={{ enabled: false }}
          themeSwitch={{ enabled: false }}
          sidebar={{
            collapsible: false,
            tabs: false,
            footer: null,
            banner: null,
          }}
          containerProps={{
            className: "bg-canvas-light dark:bg-canvas-dark [&>div:last-child]:py-0",
          }}
        >
          {children}
        </DocsLayout>
      </div>
    </I18nProvider>
  );
}
