"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
