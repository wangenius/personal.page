"use client";

import { MessageSquare, Search, Moon, Sun, Menu } from "lucide-react";
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
  { text: "Base", url: "/docs" },
  { text: "Blog", url: "/blog" },
  { text: "Products", url: "/products" },
  { text: "About", url: "/about" },
];

export function GlobalHeader() {
  const { theme, setTheme } = useTheme();
  const searchContext = useSearchContext();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (url: string) => {
    if (url === "/docs") {
      return pathname?.startsWith("/docs");
    }
    return pathname === url || pathname?.startsWith(url + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-12 max-w-screen-2xl items-center px-4">
        {/* Logo */}
        <Link href="/" className="mr-4 md:mr-6 flex items-center gap-2">
          <Image
            src="/avatar.png"
            alt="Logo"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-semibold text-sm hidden sm:inline-block">
            WanGenius
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={
                isActive(link.url)
                  ? "text-foreground transition-colors"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {link.text}
            </Link>
          ))}
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
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
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
                  {navLinks.map((link) => (
                    <Link
                      key={link.url}
                      href={link.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className={
                        isActive(link.url)
                          ? "text-foreground font-medium text-base transition-colors py-2"
                          : "text-muted-foreground font-medium text-base transition-colors hover:text-foreground py-2"
                      }
                    >
                      {link.text}
                    </Link>
                  ))}
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

