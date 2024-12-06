"use client";
import {
  IconBrandBilibili,
  IconBrandGithub,
  IconMail,
} from "@tabler/icons-react";
import { ThemeToggle } from "@/components/theme-toggle";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            <p>&copy; {new Date().getFullYear()} wangenius@qq.com. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex gap-4">
              <a
                href="https://github.com/wangenius"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="GitHub"
              >
                <IconBrandGithub className="h-5 w-5" />
              </a>
              <a
                href="https://space.bilibili.com/247967944"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Bilibili"
              >
                <IconBrandBilibili className="h-5 w-5" />
              </a>
              <a
                href="mailto:wangenius@qq.com"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Email"
              >
                <IconMail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
