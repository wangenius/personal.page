import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source, docsI18nConfig } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <DocsLayout
        tree={source.getPageTree()}
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
          className: "bg-canvas-light dark:bg-canvas-dark [&>div:last-child]:py-0 [&_article]:py-2",
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
