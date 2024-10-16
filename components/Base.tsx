import { BoxIcon, Share2Icon, SparklesIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Marquee from "@/components/ui/marquee";
import { IconBrandProducthunt } from "@tabler/icons-react";
import Globe from "@/components/ui/globe";

const files = [
  {
    name: "MVP.pdf",
    body: "Minimum Viable Product是一种精益创业方法的核心概念，指的是用最少的资源和功能开发出一个能够验证产品核心价值的产品。其目的是快速测试市场需求，降低开发风险，并根据用户的反馈不断优化和迭代。",
  },
  {
    name: "package.json",
    body: "A package.json file is a JSON file that contains metadata about a project. It is used to specify the dependencies of a project, the scripts that can be run, and other information about the project.",
  },
  {
    name: "logo.svg",
    body: "A logo is a visual representation of a brand or organization. It can be anything from a simple word or phrase to a complex design.",
  },
  {
    name: "requirement.txt",
    body: "A requirements file is a text file that lists the dependencies of a project. It is used to specify the packages that a project needs to run.",
  },
  {
    name: ".env",
    body: ".env文件是存储环境变量的文件，它包含应用程序运行所需的各种配置参数，如数据库连接信息、API密钥等。",
  },
];

const features = [
  {
    Icon: IconBrandProducthunt,
    name: "快速创建一个产品",
    description:
      "从最初的想法到MVP（最小可行产品）上线，全流程涵盖产品构思、技术实现、前端开发（包括Web和小程序）和市场测试。帮助团队在短时间内验证产品概念，提高产品迭代效率。",
    href: "https://best-picture-cb6.notion.site/121f95213f8380509fbbff0d94d2f221?pvs=4",
    cta: "开始",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: SparklesIcon,
    name: "AI+",
    description:
      "深入了解AI如何赋能产品设计与开发，掌握应用层面的AI使用场景。课程涵盖NLP、计算机视觉等领域的功能开发、AI基础理论以及真实项目中的AI实践，助力打造智能化产品。",
    href: "https://best-picture-cb6.notion.site/AI-11ff95213f8380c09e90c03762b1a288?pvs=4",
    cta: "开始",
    className: "col-span-3 lg:col-span-2",
    background: <Globe />,
  },
  {
    Icon: Share2Icon,
    name: "计算机基础知识",
    description:
      "探索计算机科学的核心领域，包括计算机体系结构、操作系统、计算机网络和信息安全。通过案例学习理解各模块之间的交互与应用，打下扎实的技术基础，为未来编程和系统开发做好准备。",
    href: "https://best-picture-cb6.notion.site/11ff95213f83807d8d7ef4eb6e115b20?pvs=4",
    cta: "开始",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: BoxIcon,
    name: "更多",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "/knowledge",
    cta: "了解更多",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

export function Base() {
  return (
    <section id="base" className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-2 text-center text-3xl font-bold">Knowledge Base</h2>
        <div
          className={cn(
            "mx-auto mb-2 max-w-[600px] text-center text-muted-foreground",
          )}
        >
          Note is Gone. Knowledge Base is the Answer.
        </div>
        <div
          className={cn(
            "mx-auto mb-12 max-w-[600px] text-center text-muted-foreground",
          )}
        >
          这是基于工作、生活日志、作品和笔记搭建的个人知识库。希望对您有所帮助。
        </div>

        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
