"use client";

import { AIHomeChat } from "@/components/ai-home-chat";
import { Github, Globe, Linkedin, Twitter } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    handle: "@wangenius",
    href: "https://github.com/wangenius",
    icon: Github,
  },
  {
    label: "X / Twitter",
    handle: "@wangenius",
    href: "https://x.com/wangenius",
    icon: Twitter,
  },
  {
    label: "LinkedIn",
    handle: "WANGENIUS",
    href: "https://www.linkedin.com/in/wangenius",
    icon: Linkedin,
  },
  {
    label: "Blog",
    handle: "blog.wangenius.com",
    href: "https://blog.wangenius.com",
    icon: Globe,
  },
];


export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col bg-fd-background">
      <section className="mx-auto w-full max-w-fd-container px-4 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium tracking-tight text-fd-muted-foreground">
            AI 对话
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            和神仙鱼一起头脑风暴
          </h1>
          <p className="mt-3 text-sm text-fd-muted-foreground md:text-base">
            这是一个 24/7 在线的产品工程师。聊聊你的想法、职业问题、
            或者让他帮你梳理下一步的行动计划。
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <AIHomeChat />
        </div>
      </section>
      <section className="mx-auto w-full max-w-fd-container px-4 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            社媒与频道
          </h2>
          <p className="mt-2 text-sm text-fd-muted-foreground md:text-base">
            想收藏更多内容或直接私信，可以从这里出发。
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 md:grid-cols-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border bg-fd-card p-4 transition-colors hover:bg-fd-accent/70"
            >
              <div className="rounded-xl border bg-fd-secondary/30 p-2">
                <social.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-fd-foreground">{social.label}</p>
                <p className="text-sm text-fd-muted-foreground">
                  {social.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
