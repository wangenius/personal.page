import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookOpen, Code, Compass, Sparkles } from "lucide-react";
import { getNavigation } from "@/lib/navigations";
import Link from "next/link";
import { LightningBoltIcon, HeartIcon } from "@radix-ui/react-icons";
import DocNav from "@/components/docNav";

export default function DocsPage() {

  const sections = getNavigation("base");
  console.log(sections[0].items[0]);
  

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
            知识库 v2.0
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            我的知识库
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            从这里开始，继续探索，永不停止
          </p>
          <div className="flex gap-4 mt-8">
            <Link href="/base/cs">
              <Button size="lg">
                <BookOpen className="mr-2 h-4 w-4" />
                开始学习
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <HeartIcon className="mr-2 h-4 w-4" />
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
              desc: "简洁明了的文档结构",
            },
            {
              icon: Compass,
              title: "最佳实践",
              desc: "行业推荐的开发模式",
            },
            {
              icon: Code,
              title: "代码示例",
              desc: "详尽的示例代码",
            },
          ].map((item) => (
            <Card 
              key={item.title} 
              className="group relative overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mb-6 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 文档导航区域 */}
        <div className="space-y-16">
          <DocNav sections={sections} />
        </div>
      </div>
    </div>
  );

}