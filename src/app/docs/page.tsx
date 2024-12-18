import DocNav from "@/components/docNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getNavigation } from "@/lib/navigations";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { BookOpen, Code, Compass, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  const sections = getNavigation("docs");

  return (
    <div className="relative min-h-screen w-full max-w-[1600px] mx-auto">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-full bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 blur-[100px]" />

      <div className="container px-4 py-10 md:py-16">
        {/* 头部区域 */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="mr-2 h-3 w-3" />
            AI+ 应用开发文档 v2.0
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            快速构建 AI+ 时代的应用产品
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            探索全面的开发指南，快速构建出色的 AI+ 应用产品
          </p>
          <div className="flex gap-4 mt-8">
            <Link href="/docs/start/begin">
              <Button size="lg">
                <BookOpen className="mr-2 h-4 w-4" />
                开始构建
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-4 w-4" />
              支持我
            </Button>
          </div>
        </div>

        {/* 特性展示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: LightningBoltIcon,
              title: "快速上手",
              desc: "从零开始，利用套路和模板，快速开始项目开发",
            },
            {
              icon: Compass,
              title: "AI+",
              desc: "深度探索结合AI的开发模式",
            },
            {
              icon: Code,
              title: "全栈开发",
              desc: "提供全栈方案，包括支付体系",
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="group relative border border-border/50 bg-background/50 hover:border-border transition-colors duration-200"
            >
              <CardContent className="p-6">
                <div className="mb-6 w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 文档导航区域 */}
        <DocNav sections={sections} />
      </div>
    </div>
  );
}
