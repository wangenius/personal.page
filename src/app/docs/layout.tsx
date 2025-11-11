import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <DocsLayout
        tree={source.pageTree}
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
  );
}
