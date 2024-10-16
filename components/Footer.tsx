"use client";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandBilibili,
    IconBrandGithub, IconBrandQq,
    IconBrandTiktok,
    IconBrandWechat,
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
          <div className="flex space-x-4">
            <FloatingDock
              items={[
                { icon: <IconBrandGithub />, title: "Github", href: "https://github.com/wangenius" },
                { icon: <IconBrandBilibili />, title: "B站", href: "https://space.bilibili.com/247967944?spm_id_from=333.788.0.0" },
                { icon: <IconMail />, title: "wangenius@qq.com", href: "mailto:wangenius@qq.com" },
              ]}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
