import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Toaster } from "../components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "wangenius",
  description: "A special solution from Le Corbusier to Dijkstra.",
  icons: {
    icon: "/icon_b.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="min-h-screen min-w-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
