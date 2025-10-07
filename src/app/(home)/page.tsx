"use client";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Hash, ExternalLink, Copy } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
    const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const Card = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <div className="group rounded-xl border bg-fd-card p-6 transition-colors hover:bg-fd-accent">
      {children}
    </div>
  );
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <section className="mx-auto w-full max-w-fd-container px-4 md:py-16">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-fd-muted-foreground">
            Say hello
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
            Contact
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border bg-fd-secondary/30 p-2">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-fd-muted-foreground">
                      wangenius@qq.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => copy("wangenius@qq.com")}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "inline-flex items-center gap-2"
                  )}
                >
                  <Copy className="h-4 w-4" /> 复制
                </button>
                <a
                  href="mailto:wangenius@qq.com"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "inline-flex items-center gap-2"
                  )}
                >
                  <ExternalLink className="h-4 w-4" /> 打开邮件
                </a>
              </div>
            </Card>
          </motion.div>

          {/* WeChat */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <Card>
              <div className="flex items-start gap-3">
                <div className="rounded-lg border bg-fd-secondary/30 p-2">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">WeChat</p>
                  <p className="text-sm text-fd-muted-foreground">
                    扫码添加好友
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Image
                  src="/wechat.jpg"
                  alt="WeChat QR Code"
                  width={240}
                  height={240}
                  className="mx-auto w-48 rounded-lg border"
                />
              </div>
            </Card>
          </motion.div>

          {/* QQ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border bg-fd-secondary/30 p-2">
                    <Hash className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">QQ</p>
                    <p className="text-sm text-fd-muted-foreground">
                      2732822492
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => copy("2732822492")}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "inline-flex items-center gap-2"
                  )}
                >
                  <Copy className="h-4 w-4" /> 复制
                </button>
                <a
                  href="https://qm.qq.com/cgi-bin/qm/qr?k=2732822492"
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "inline-flex items-center gap-2"
                  )}
                >
                  <ExternalLink className="h-4 w-4" /> 添加好友
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    <footer className="mx-auto w-full max-w-fd-container px-4 py-12">
      <div className="rounded-2xl border bg-fd-card p-8 text-center">
        <p className="text-2xl font-bold">横渡大海的神仙鱼</p>
        <p className="mt-2 text-sm text-fd-muted-foreground">
          在这里，我将代码与创意编织成梦想，让每一个像素都闪耀着独特的光芒
        </p>
        <div className="mt-6 text-xs text-fd-muted-foreground/80">
          Made with ❤️ by WANGENIUS © 2025
        </div>
      </div>
    </footer>
    </main>
  );
}
