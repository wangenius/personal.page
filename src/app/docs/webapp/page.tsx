import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookOpen, Code, Compass, Sparkles } from "lucide-react";
import { getNavigation } from "@/lib/navigations";
import Link from "next/link";
import { LightningBoltIcon } from "@radix-ui/react-icons";

export default function DocsPage() {
  const sections = getNavigation("docs/webapp");
  
  return (
    <div className="relative min-h-screen">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-full bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 blur-[100px]" />

      <div className="container px-4 py-10 md:py-16">
        {/* 头部区域 */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="mr-2 h-3 w-3" />
            Web 应用开发文档 v2.0
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            构建现代 Web 应用
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            探索全面的开发指南，从基础架构到高级特性，助您构建出色的 Web 应用
          </p>
          <div className="flex gap-4 mt-8">
            <Button size="lg">
              <BookOpen className="mr-2 h-4 w-4" />
              开始学习
            </Button>
            <Button variant="outline" size="lg">
              <Code className="mr-2 h-4 w-4" />
              示例代码
            </Button>
          </div>
        </div>

        {/* 特性展示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { icon: LightningBoltIcon, title: "快速上手", desc: "简洁明了的文档结构" },
            { icon: Compass, title: "最佳实践", desc: "行业推荐的开发模式" },
            { icon: Code, title: "代码示例", desc: "详尽的示例代码" },
          ].map((item) => (
            <Card key={item.title} className="border-none bg-gradient-to-b from-muted/50 to-muted p-6">
              <item.icon className="h-10 w-10 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </Card>
          ))}
        </div>

        {/* 文档导航区域 */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
                <Separator className="flex-1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => (
                  <Link key={item.title} href={item.href}>
                    <Card className="group hover:shadow-md transition-all hover:border-primary/50 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
