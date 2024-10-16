"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-4">
      <h1 className="my-4 text-2xl font-bold sm:text-3xl md:text-4xl">
        Knowledge Base
      </h1>
      <p className={"text-gray-500 mb-4"}>
        这是基于工作、生活日志、作品和笔记搭建的个人知识库。希望对您有所帮助。
      </p>
      <HoverEffect items={projects} />
    </div>
  );
}

const projects = [
  {
    title: "快速创建一个产品",
    description: "从开发的角度，想法到MVP全流程涵盖产品构思、技术实现、程序开发、流程需要和市场测试。这一部分旨在将整个流程快速跑通，以便快速验证想法。为之后的再次创建制作适合自己的模板。",
    link: "https://best-picture-cb6.notion.site/121f95213f8380509fbbff0d94d2f221?pvs=4",
  },
  {
    title: "AI+",
    description:
      "深入了解AI如何赋能产品设计与开发，掌握应用层面的AI使用场景。NLP、SD等场景的功能开发、AI基础理论以及真实项目中的AI实践，助力打造智能化产品。",
    link: "https://best-picture-cb6.notion.site/AI-11ff95213f8380c09e90c03762b1a288?pvs=4",
  },
  {
    title: "产品",
    description: "从策划的角度，系统总结从产品策划、需求分析、用户研究到交互设计的完整流程。帮助掌握如何制定产品路线图、进行市场分析、设计用户体验，以及利用原型工具进行快速验证，推动产品成功上线和运营。",
    link: "https://best-picture-cb6.notion.site/121f95213f838029907bd4210e4ddaf5?pvs=4",
  },
  {
    title: "计算机基础知识",
    description:
      "系统总结计算机科学的基础知识，包括计算机体系结构、操作系统、计算机网络和信息安全。方便后期对程序的Dev过程。",
    link: "https://best-picture-cb6.notion.site/11ff95213f83807d8d7ef4eb6e115b20?pvs=4",
  },
  {
    title: "编程语言和框架",
    description:
      "系统总结自用编程语言（Typescript、Python），掌握热门框架，掌握多种数据库，提升全栈开发能力。",
    link: "https://best-picture-cb6.notion.site/11ff95213f8380459db7eb5b8515f369?pvs=4",
  },
  {
    title: "程序设计和SDLC过程优化",
    description:
      "在SDLC的各个阶段用敏捷开发、瀑布模型等方法进行优化，实现高效开发与协作。学习开发与运维一体化的最佳实践DevOps，重点掌握CI/CD流程，以及自动化测试、监控、容器化技术等工具，实现软件快速稳定地迭代。",
    link: "https://best-picture-cb6.notion.site/SDLC-11ff95213f8380cd9d83fdc2f88c4e5f?pvs=4",
  },
  {
    title: "数学基础",
    description:
      "提供线性代数、概率论、微积分等数学知识的系统总结，并结合机器学习和算法开发的应用场景。",
    link: "https://best-picture-cb6.notion.site/11ff95213f83800f865cccb832fbf252?pvs=4",
  },
  {
    title: "自定义工具箱",
    description:
      "选用适合自己项目的专属工具。涵盖自动化脚本开发、插件工具的集成以及生产力工具的选型，为提高团队的效率和协作能力提供有力支持。",
    link: "https://best-picture-cb6.notion.site/121f95213f838040bdbfd36840e5dca8?pvs=4",
  },
];
