import { MessageSquare, Search, Menu } from "lucide-react";
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

export function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dictionary } = useLanguage();
  const { navigation } = dictionary;
  const { isBayBarOpen } = useViewManager();

  const openSearchDialog = () => {
    if (typeof window === "undefined") return;

    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

    const event = new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      metaKey: isMac,
      ctrlKey: !isMac,
    });

    window.dispatchEvent(event);
  };

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
            onClick={openSearchDialog}
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
            onClick={openSearchDialog}
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
            <SheetContent side="right" className="w-screen max-w-none">
              <SheetTitle className="sr-only">
                {navigation.sheet.title}
              </SheetTitle>
              <SheetDescription className="sr-only">
                {navigation.sheet.description}
              </SheetDescription>

              <div className="mt-4 flex flex-col gap-6 px-4 pb-6">
                {/* Navigation - plain list */}
                <div className="flex flex-col gap-3">
                  <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    {navigation.sections.navigation}
                  </div>
                  <nav className="flex flex-col gap-1.5">
                    {navLinks.map((link) => {
                      const { href, active } = resolveNavLink(link);
                      return (
                        <Link
                          key={link.url}
                          href={href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center py-1.5 text-sm",
                            active
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span className="truncate">
                            {navigation.links[link.id]}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Settings - aligned with header style */}
                <div className="flex flex-col gap-3">
                  <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    {navigation.sections.settings}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {/* Theme toggle: same icon button style as header */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      title={navigation.actions.toggleTheme}
                    >
                      <BsSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <BsMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">
                        {navigation.actions.toggleTheme}
                      </span>
                    </Button>

                    {/* Language switcher: same component as header */}
                    <LanguageSwitcher />

                    {/* User menu: same component as header, pushed to the right */}
                    <div className="ml-auto">
                      <UserMenu />
                    </div>
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
