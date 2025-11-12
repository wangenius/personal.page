import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { docsI18nConfig, source } from "@/lib/source";

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangDocsLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = await params;

  return (
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
          className:
            "bg-canvas-light dark:bg-canvas-dark [&>div:last-child]:py-0",
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
