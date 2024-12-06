"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, ChevronDown, Globe, Smartphone, Library, Brain, Wallet, ArrowRight, ExternalLink, Component, Terminal, Box, Cpu, Layers, Workflow, Bot, Sparkles, Fingerprint, Network, CreditCard, Settings, Database } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { DesktopIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  items: {
    title: string;
    url: string;
  }[];
}

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
    items: [
      { title: "开发指南", url: "/docs/weapp/guide" },
    ],
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
  const [activeSection, setActiveSection] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full",
        scrolled 
          ? "bg-background/50 backdrop-blur-sm" 
          : "bg-background"
      )}
    >
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/icon_b.png"
            alt="WANGENIUS Logo"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="font-bold">WANGENIUS</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "text-sm transition-colors relative py-1 flex items-center gap-1 font-normal",
                  pathname.startsWith("/docs")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                文档
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[480px] p-4" align="start">
              <div className="grid grid-cols-2 gap-4">
                {docsNav.map((section) => (
                  <div key={section.title} className="group">
                    <Link 
                      href={section.url}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50"
                    >
                      <section.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </Link>
                    <div className="mt-1 ml-6 space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {[
            ["博客", "/blogs"],
            ["作品", "/portfolios"],
            ["联系", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm transition-colors relative py-1",
                pathname === href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300",
                pathname === href && "after:scale-x-100",
                "hover:after:scale-x-100"
              )}
            >
              {label}
            </Link>
          ))}
          
          <Button
            variant="ghost"
            onClick={()=>{
              window.open("https://github.com/wangenius/main","_blank")
            }}
            className="space-x-2 gap-2"
          >
            <GitHubLogoIcon/>
            github
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t bg-background"
        >
          <nav className="container py-4">
            {[
              ["文档", "/docs"],
              ["博客", "/blogs"],
              ["作品", "/portfolios"],
              ["联系", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "block py-2 text-sm transition-colors",
                  pathname === href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
