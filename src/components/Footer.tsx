"use client";
import {
  IconBrandBilibili,
  IconBrandGithub,
  IconMail,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <p>&copy; 2023 wangenius@qq.com. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/wangenius"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <IconBrandGithub size={24} />
            </a>
            <a
              href="https://space.bilibili.com/247967944"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <IconBrandBilibili size={24} />
            </a>
            <a
              href="mailto:wangenius@qq.com"
              className="text-foreground hover:text-primary transition-colors"
            >
              <IconMail size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
