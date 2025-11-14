import "@/app/global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { GlobalLayoutWrapper } from "@/components/global-layout-wrapper";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="shortcut icon" href="/icon.png" />
        <title>WANGENIUS</title>
      </head>
      <body className="flex flex-col min-h-screen max-h-screen overflow-hidden">
        <ThemeProvider>
          <RootProvider
            search={{
              enabled: true,
              options: {
                api: "/api/search",
              },
            }}
          >
            <LanguageProvider>
              <GlobalLayoutWrapper>{children}</GlobalLayoutWrapper>
            </LanguageProvider>
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
