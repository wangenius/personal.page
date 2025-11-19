"use client";

import {
  Mail,
  Twitter,
  Github,
  MessageCircle,
  AtSign,
  Box,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

export const Contact = () => {
  const { dictionary } = useLanguage();
  const contact = dictionary.contact;

  const links = [
    {
      icon: Mail,
      label: contact.email.label,
      value: "wangenius.os@gmail.com",
      href: "mailto:wangenius.os@gmail.com",
      type: "link",
    },
    {
      icon: Twitter,
      label: contact.twitter.label,
      value: "@iamwangenius",
      href: "https://x.com/iamwangenius",
      type: "link",
    },
    {
      icon: Github,
      label: contact.github.label,
      value: "github.com/wangenius",
      href: "https://github.com/wangenius",
      type: "link",
    },
    {
      icon: Box,
      label: contact.bento.label,
      value: "bento.me/wangenius",
      href: "https://bento.me/wangenius",
      type: "link",
    },
    {
      icon: MessageCircle,
      label: contact.wechat.label,
      value: "wzdoing",
      href: null,
      type: "qr",
      qrCode: "/wechat.jpg",
    },
    {
      icon: AtSign,
      label: contact.wechatOfficial.label,
      value: "wangenius",
      href: null,
      type: "text",
    },
  ];

  return (
    <section id="contact" className="mb-32 space-y-12">
      <div className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          {contact.section.label}
        </p>

        <h2 className="text-2xl font-medium text-fd-foreground border-b border-fd-border pb-4">
          {contact.section.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {links.map((link) => (
          <div key={link.label}>
            {link.type === "link" ? (
              <a
                href={link.href!}
                target={link.href!.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href!.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex items-center gap-4 p-2 -ml-2 rounded-lg hover:bg-fd-muted/30 transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fd-muted/50 text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
                  <link.icon className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-fd-muted-foreground uppercase tracking-wider mb-0.5">
                    {link.label}
                  </p>
                  <p className="text-sm font-medium text-fd-foreground truncate group-hover:underline underline-offset-4 decoration-fd-border">
                    {link.value}
                  </p>
                </div>
              </a>
            ) : link.type === "qr" ? (
              <div className="group relative flex items-center gap-4 p-2 -ml-2 rounded-lg hover:bg-fd-muted/30 transition-colors cursor-pointer">
                {/* QR Code Popover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-10">
                  <div className="bg-fd-popover p-2 rounded-xl shadow-xl border border-fd-border">
                    <div className="relative w-32 h-32 bg-white rounded-lg overflow-hidden">
                      <Image
                        src={link.qrCode!}
                        alt={link.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 border-8 border-transparent border-t-fd-popover drop-shadow-sm"></div>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fd-muted/50 text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
                  <link.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-fd-muted-foreground uppercase tracking-wider mb-0.5">
                    {link.label}
                  </p>
                  <p className="text-sm font-medium text-fd-foreground">
                    {link.value}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-2 -ml-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fd-muted/50 text-fd-muted-foreground">
                  <link.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-fd-muted-foreground uppercase tracking-wider mb-0.5">
                    {link.label}
                  </p>
                  <p className="text-sm font-medium text-fd-foreground">
                    {link.value}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
