import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <Image
        src="/avatar.png"
        alt="Logo"
        width={32}
        height={32}
        className="rounded-full"
      />
    ),
  },
  links: [
    {
      text: "文档",
      url: "/docs",
      active: "nested-url",
    },
    {
      text: "博客",
      url: "/blog",
      active: "nested-url",
    },
  ],
};
