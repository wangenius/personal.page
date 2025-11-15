"use client";

import { MessageSquare, Search, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { toggleBayBar, useViewManager } from "@/lib/viewManager";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  BsLayoutSidebarReverse,
  BsLayoutSidebarInsetReverse,
  BsSun,
  BsMoon,
} from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { cn } from "@/lib/cn";

type NavLink = {
  id: keyof Dictionary["navigation"]["links"];
  url: string;
};

const navLinks: NavLink[] = [
  { id: "techne", url: "/docs/techne" },
  { id: "venture", url: "/docs/venture" },
  { id: "anthropocene", url: "/docs/anthropocene" },
  { id: "blog", url: "/blog" },
  { id: "products", url: "/products" },
  { id: "subscribe", url: "/subscription" },
];

export function GlobalHeader() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dictionary } = useLanguage();
  const { navigation } = dictionary;
  const { isBayBarOpen } = useViewManager();

  const resolveNavLink = (link: NavLink) => {
    const href = link.url;
    const active = pathname === href || pathname?.startsWith(`${href}/`);
    return { href, active };
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
            const { href, active } = resolveNavLink(link);
            return (
              <Link
                key={link.url}
                href={href}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{navigation.links[link.id]}</span>
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-1">
          <UserMenu />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {}}
            title={navigation.actions.search}
          >
            <BiSearch className="h-4 w-4" />
            <span className="sr-only">{navigation.actions.search}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={navigation.actions.toggleTheme}
          >
            <BsSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <BsMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{navigation.actions.toggleTheme}</span>
          </Button>

          <LanguageSwitcher />

          <div className="h-4 w-px bg-border mx-1" />

          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", isBayBarOpen ? "bg-muted" : "")}
            onClick={() => toggleBayBar()}
            title={navigation.actions.chat}
          >
            {isBayBarOpen ? (
              <BsLayoutSidebarInsetReverse className="h-4 w-4" />
            ) : (
              <BsLayoutSidebarReverse className="h-4 w-4" />
            )}
            <span className="sr-only">{navigation.actions.chat}</span>
          </Button>
        </div>

        {/* Mobile Actions - Only essential buttons */}
        <div className="flex md:hidden items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {}}
            title={navigation.actions.search}
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">{navigation.actions.search}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => toggleBayBar()}
            title={navigation.actions.chat}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">{navigation.actions.chat}</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title={navigation.actions.toggleMenu}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetTitle className="sr-only">
                {navigation.sheet.title}
              </SheetTitle>
              <SheetDescription className="sr-only">
                {navigation.sheet.description}
              </SheetDescription>

              <div className="flex flex-col gap-6 mt-6">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {navigation.sections.navigation}
                  </div>
                  {navLinks.map((link) => {
                    const { href, active } = resolveNavLink(link);
                    return (
                      <Link
                        key={link.url}
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 py-2 text-base font-medium transition-colors ${
                          active
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>{navigation.links[link.id]}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {navigation.sections.settings}
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
                    <span className="ml-6">
                      {navigation.actions.toggleTheme}
                    </span>
                  </button>

                  <LanguageSwitcher variant="full" />

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
