"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { DesktopIcon, GitHubLogoIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Globe,
  Library,
  Menu,
  Smartphone,
  Wallet,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  items: {
    title: string;
    url: string;
  }[];
};

const baseNav: NavItem[] = [
  {
    title: "基础",
    url: "/base",
    icon: Brain,
    items: [{ title: "基础知识", url: "/base/knowledge" }],
  },
];

const docsNav: NavItem[] = [
  {
    title: "Web",
    url: "/docs/webapp",
    icon: Globe,
    items: [
      { title: "React", url: "/docs/webapp/react" },
      { title: "Express", url: "/docs/webapp/express" },
      { title: "Next.js", url: "/docs/webapp/nextjs" },
    ],
  },
  {
    title: "Desktop",
    url: "/docs/desktop",
    icon: DesktopIcon,
    items: [
      { title: "Electron", url: "/docs/desktop/electron" },
      { title: "Tauri", url: "/docs/desktop/tauri" },
    ],
  },
  {
    title: "小程序",
    url: "/docs/weapp",
    icon: Smartphone,
    items: [{ title: "开发指南", url: "/docs/weapp/guide" }],
  },
  {
    title: "Libraries",
    url: "/docs/libs",
    icon: Library,
    items: [
      { title: "Echo", url: "/docs/libs/echo" },
      { title: "Silo", url: "/docs/libs/silo" },
    ],
  },
  {
    title: "AI",
    url: "/docs/ai",
    icon: Brain,
    items: [
      { title: "AI+", url: "/docs/ai/plus" },
      { title: "Agent", url: "/docs/ai/agent" },
      { title: "Diffusion", url: "/docs/ai/diffusion" },
      { title: "LLM", url: "/docs/ai/llm" },
    ],
  },
  {
    title: "Payment",
    url: "/docs/pay",
    icon: Wallet,
    items: [
      { title: "微信支付", url: "/docs/pay/wechat" },
      { title: "配置指南", url: "/docs/pay/setup" },
    ],
  },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.header
      initial={false}
      animate={scrolled ? "scrolled" : "top"}
      variants={{
        scrolled: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
        },
        top: {
          backgroundColor: "transparent",
          backdropFilter: "none",
          boxShadow: "none"
        }
      }}
      className="sticky top-0 z-50 w-full transition-all duration-300"
    >
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/icon_b.png"
              alt="WANGENIUS Logo"
              width={28}
              height={28}
              className="w-7 h-7"
            />
          </motion.div>
          <span className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">
            WANGENIUS
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">文档</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[650px] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground/80">开发文档</h4>
                    <Link 
                      href="/docs" 
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      浏览全部 →
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {docsNav.map((section) => (
                      <div 
                        key={section.title} 
                        className="group aspect-square p-4 bg-muted/30 hover:bg-muted/50
                          border border-border/40 hover:border-border
                          transition-colors duration-200"
                      >
                        <div className="h-full flex flex-col">
                          <Link
                            href={section.url}
                            className="flex items-center gap-2.5 group-hover:text-primary transition-colors"
                          >
                            <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center">
                              <section.icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">{section.title}</span>
                          </Link>
                          
                          <div className="h-px bg-border/40 my-3" />
                          
                          <div className="flex-1 space-y-2 overflow-hidden">
                            {section.items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.url}
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">知识库</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[650px] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground/80">知识库</h4>
                    <Link 
                      href="/base" 
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      浏览全部 →
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {baseNav.map((section) => (
                      <div 
                        key={section.title} 
                        className="group aspect-square p-4 bg-muted/30 hover:bg-muted/50
                          border border-border/40 hover:border-border
                          transition-colors duration-200"
                      >
                        <div className="h-full flex flex-col">
                          <Link
                            href={section.url}
                            className="flex items-center gap-2.5 group-hover:text-primary transition-colors"
                          >
                            <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center">
                              <section.icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">{section.title}</span>
                          </Link>
                          
                          <div className="h-px bg-border/40 my-3" />
                          
                          <div className="flex-1 space-y-2 overflow-hidden">
                            {section.items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.url}
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="bg-transparent">
              <Link href="/blogs" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    pathname === "/blogs" ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  博客
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="bg-transparent">
              <Link href="/portfolios" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    pathname === "/portfolios" ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  作品
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="bg-transparent">
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    pathname === "/contact" ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  联系
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </motion.div>
          </Button>

          <Button
            variant="ghost"
            onClick={() => window.open("https://github.com/wangenius/main", "_blank")}
            className="hidden md:flex items-center gap-2 rounded-full"
          >
            <GitHubLogoIcon className="w-5 h-5" />
            <span>GitHub</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden border-t bg-background/80 backdrop-blur-lg"
          >
            <nav className="container py-4 space-y-1">
              {[
                ["文档", "/docs"],
                ["博客", "/blogs"],
                ["作品", "/portfolios"],
                ["联系", "/contact"],
              ].map(([label, href]) => (
                <motion.div
                  key={href}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={href}
                    className={cn(
                      "block py-2 px-4 text-sm rounded-lg transition-colors",
                      pathname === href
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
