"use client";

import { AlbumIcon, BoxIcon, Heart, LayoutTemplate, MessageSquare, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSearchContext } from "fumadocs-ui/provider";

const navLinks = [
  {
    icon: <AlbumIcon className="w-4 h-4" />,
    text: "Base",
    url: "/docs",
  },
  {
    text: "Blog",
    url: "/blog",
    icon: <LayoutTemplate className="w-4 h-4" />,
  },
  {
    text: "Products",
    url: "/products",
    icon: <BoxIcon className="w-4 h-4" />,
  },
  {
    text: "About",
    url: "/about",
    icon: <Heart className="w-4 h-4" />,
  },
];

interface GlobalHeaderProps {
  onToggleChat: () => void;
}

export function GlobalHeader({ onToggleChat }: GlobalHeaderProps) {
  const { theme, setTheme } = useTheme();
  const searchContext = useSearchContext();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-fd-border bg-fd-background/95 backdrop-blur supports-[backdrop-filter]:bg-fd-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/avatar.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="flex items-center gap-2 text-fd-foreground/60 transition-colors hover:text-fd-foreground"
            >
              {link.icon}
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>

        {/* Right side buttons - absolute right */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            title="搜索"
            onClick={() => searchContext.setOpenSearch(true)}
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
            title="切换主题"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">切换主题</span>
          </Button>

          {/* Chat Toggle */}
          <Button
            variant="ghost"
            onClick={onToggleChat}
            className="h-9"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            对话
          </Button>
          
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

