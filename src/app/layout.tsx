import "@/app/global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { GlobalLayoutWrapper } from "@/components/global-layout-wrapper";
import { LanguageProvider } from "@/components/language-provider";
import { DEFAULT_DOC_LANGUAGE, docLocaleItems } from "@/lib/source";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="shortcut icon" href="/icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <title>WANGENIUS</title>
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            enabled: true,
            options: {
              api: "/api/search",
            },
          }}
          i18n={{
            locale: DEFAULT_DOC_LANGUAGE,
            locales: docLocaleItems,
          }}
        >
          <LanguageProvider>
            <GlobalLayoutWrapper>{children}</GlobalLayoutWrapper>
          </LanguageProvider>
        </RootProvider>
      </body>
    </html>
  );
}
