"use client";

import {
  MessageSquare,
  Search,
  Moon,
  Sun,
  Menu,
  BookOpen,
  LineChart,
  PenLine,
  Package,
  BellRing,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSearchContext } from "fumadocs-ui/provider";
import { usePathname } from "next/navigation";
import { toggleBayBar } from "@/lib/viewManager";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const navLinks = [
  { text: "Knowledges", url: "/docs/base", icon: BookOpen },
  { text: "MarcoEconomy", url: "/docs/economic", icon: LineChart },
  { text: "Blog", url: "/blog", icon: PenLine },
  { text: "Products", url: "/products", icon: Package },
  { text: "Subscribe", url: "/subscription", icon: BellRing },
];

export function GlobalHeader() {
  const { theme, setTheme } = useTheme();
  const searchContext = useSearchContext();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (url: string) => {
    if (url.startsWith("/docs/")) {
      if (pathname === "/docs" && url === "/docs/base") {
        return true;
      }
      return pathname === url || pathname?.startsWith(url + "/");
    }
    return pathname === url || pathname?.startsWith(url + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-12 max-w-screen-2xl items-center px-4">
        {/* Logo */}
        <Link href="/" className="mr-4 md:mr-6 flex items-center gap-2">
          <Image src="/icon.png" alt="Logo" width={24} height={24} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.url}
                href={link.url}
                className={`flex items-center gap-1 transition-colors ${
                  isActive(link.url)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span>{link.text}</span>
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => searchContext.setOpenSearch(true)}
            title="Search"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => toggleBayBar()}
            title="Chat"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Chat</span>
          </Button>

          <div className="h-4 w-px bg-border mx-1" />

          <UserMenu />
        </div>

        {/* Mobile Actions - Only essential buttons */}
        <div className="flex md:hidden items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => searchContext.setOpenSearch(true)}
            title="Search"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => toggleBayBar()}
            title="Chat"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Chat</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Access navigation links and settings
              </SheetDescription>

              <div className="flex flex-col gap-6 mt-6">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Navigation
                  </div>
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.url}
                        href={link.url}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 py-2 text-base font-medium transition-colors ${
                          isActive(link.url)
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                        <span>{link.text}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Settings
                  </div>

                  {/* Theme Toggle */}
                  <button
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                    }}
                    className="flex items-center gap-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                    <span className="ml-6">Toggle Theme</span>
                  </button>

                  {/* User Menu Content */}
                  <div className="py-2">
                    <UserMenu />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
