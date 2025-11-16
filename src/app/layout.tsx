"use client";

import "@/app/global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SelectionProvider } from "@/components/docs/selection-quote";
import SearchDialog from "@/components/search";
import { Header } from "@/components/Header";
import { Chatbar } from "@/components/baybar/Chatbar";
import { useChatInputFocus } from "@/lib/useChatInputFocus";
import { useViewManager } from "@/lib/viewManager";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: ReactNode }) {
  useChatInputFocus(true, true); // 启用快捷键 + 自动切换 Baybar
  const { isBayBarOpen } = useViewManager();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="shortcut icon" href="/icon.png" />
        <title>WANGENIUS</title>
      </head>
      <body
        className={cn(
          "flex flex-col min-h-screen max-h-screen overflow-hidden",
          isBayBarOpen && "baybar-open"
        )}
      >
        <ThemeProvider>
          <LanguageProvider>
            <RootProvider
              search={{
                SearchDialog,
              }}
            >
              <Header />
              <SelectionProvider>
                <main className="flex h-[calc(100vh-3rem)] w-full overflow-hidden">
                  <div className="flex-1 min-w-0 overflow-auto relative">
                    {children}
                  </div>
                  <Chatbar />
                </main>
              </SelectionProvider>
            </RootProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
