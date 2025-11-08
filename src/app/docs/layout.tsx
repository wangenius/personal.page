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
        sidebar={{
          tabs: {
            transform(option, node) {
              const meta = source.getNodeMeta(node);
              if (!meta || !node.icon) return option;

              return {
                ...option,
                icon: <div>{node.icon}</div>,
              };
            },
          },
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
