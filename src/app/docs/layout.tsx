import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";

interface DocsLayoutProps {
  children: ReactNode;
}

export default function LangDocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex-1 flex flex-col">
      <DocsLayout
        tree={source.getPageTree()}
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
