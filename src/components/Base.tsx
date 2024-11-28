import { BoxIcon, Share2Icon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconBrandProducthunt } from "@tabler/icons-react";

const features = [
  {
    Icon: IconBrandProducthunt,
    name: "快速创建一个产品",
    description:
      "从开发的角度，想法到MVP全流程涵盖产品构思、技术实现、程序开发、流程需要和市场测试。这一部分旨在将整个流程快速跑通，以便快速验证想法。为之后的再次创建制作适合自己的模板。",
    href: "https://best-picture-cb6.notion.site/121f95213f8380509fbbff0d94d2f221?pvs=4",
    cta: "开始"
  },
  {
    Icon: SparklesIcon,
    name: "AI+",
    description:
      "深入了解AI如何赋能产品设计与开发，掌握应用层面的AI使用场景。NLP、SD等场景的功能开发、AI基础理论以及真实项目中的AI实践，助力打造智能化产品。",
    href: "https://best-picture-cb6.notion.site/AI-11ff95213f8380c09e90c03762b1a288?pvs=4",
    cta: "开始"
  },
  {
    Icon: Share2Icon,
    name: "计算机基础知识",
    description:
      "系统总结计算机科学的基础知识，包括计算机体系结构、操作系统、计算机网络和信息安全。方便后期对程序的Dev过程。",
    href: "https://best-picture-cb6.notion.site/11ff95213f83807d8d7ef4eb6e115b20?pvs=4",
    cta: "开始"
  },
  {
    Icon: BoxIcon,
    name: "更多",
    description: "了解更多相关知识，为超级个体时代做准备",
    href: "/knowledge",
    cta: "了解更多"
  }
];

export function Base() {
  return (
    <section id="base" >
      <div className="container mx-auto px-4">
        <h2 className="mb-2 text-center text-3xl font-bold">Knowledge Base</h2>
        <div className={cn("mx-auto mb-2 max-w-[600px] text-center text-muted-foreground")}>
          Note is Gone. Knowledge Base is the Answer.
        </div>
        <div className={cn("mx-auto mb-12 max-w-[600px] text-center text-muted-foreground")}>
          这是基于工作、生活日志、作品和笔记搭建的个人知识库。希望对您有所帮助。
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <a 
              key={idx}
              href={feature.href}
              className="block p-6 rounded-lg border hover:shadow-lg transition-shadow"
            >
              <feature.Icon className="w-6 h-6 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <span className="text-primary font-medium">{feature.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
