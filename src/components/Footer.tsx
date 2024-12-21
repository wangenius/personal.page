"use client";
import {
  IconBrandBilibili,
  IconBrandGithub,
  IconMail,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 h-[80px]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            <p>&copy; {new Date().getFullYear()} wangenius@qq.com. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
    
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
