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
    description: "从最初的想法到MVP（最小可行产品）上线，全流程涵盖产品构思、技术实现、前端开发（包括Web和小程序）和市场测试。帮助团队在短时间内验证产品概念，提高产品迭代效率。",
    link: "https://best-picture-cb6.notion.site/121f95213f8380509fbbff0d94d2f221?pvs=4",
  },
  {
    title: "AI+",
    description:
      "深入了解AI如何赋能产品设计与开发，掌握应用层面的AI使用场景。课程涵盖NLP、计算机视觉等领域的功能开发、AI基础理论以及真实项目中的AI实践，助力打造智能化产品。",
    link: "https://best-picture-cb6.notion.site/AI-11ff95213f8380c09e90c03762b1a288?pvs=4",
  },
  {
    title: "产品",
    description: "系统性学习从产品策划、需求分析、用户研究到交互设计的完整流程。帮助掌握如何制定产品路线图、进行市场分析、设计用户体验，以及利用原型工具进行快速验证，推动产品成功上线和运营。",
    link: "https://best-picture-cb6.notion.site/121f95213f838029907bd4210e4ddaf5?pvs=4",
  },
  {
    title: "计算机基础知识",
    description:
      "探索计算机科学的核心领域，包括计算机体系结构、操作系统、计算机网络和信息安全。通过案例学习理解各模块之间的交互与应用，打下扎实的技术基础，为未来编程和系统开发做好准备。",
    link: "https://best-picture-cb6.notion.site/11ff95213f83807d8d7ef4eb6e115b20?pvs=4",
  },
  {
    title: "编程语言和框架",
    description:
      "系统学习主流编程语言（如JavaScript、Python、Java），深入理解面向对象和函数式编程的思想，并掌握React、Vue、Spring等热门框架，提升前端和后端开发能力。",
    link: "https://best-picture-cb6.notion.site/11ff95213f8380459db7eb5b8515f369?pvs=4",
  },
  {
    title: "程序设计和SDLC过程优化",
    description:
      "学习软件开发生命周期（SDLC）的各个阶段，并通过敏捷开发、瀑布模型等方法进行优化。探索如何在实际项目中应用代码重构、版本控制、测试驱动开发（TDD）等实践，实现高效开发与协作。以及DevOps，学习开发与运维一体化的最佳实践，重点掌握CI/CD（持续集成与持续交付）流程，以及自动化测试、监控、容器化技术（如Docker和Kubernetes）等工具，实现软件快速稳定地迭代。",
    link: "https://best-picture-cb6.notion.site/SDLC-11ff95213f8380cd9d83fdc2f88c4e5f?pvs=4",
  },
  {
    title: "数学基础",
    description:
      "提供线性代数、概率论、微积分等数学知识的系统讲解，并结合机器学习和算法开发的应用场景。帮助学员理解基础数学在科技产品中的作用，为深入学习AI和数据科学奠定基础。",
    link: "https://https://best-picture-cb6.notion.site/11ff95213f83800f865cccb832fbf252?pvs=4",
  },
  {
    title: "自定义工具箱",
    description:
      "选用适合自己团队或项目的专属工具。涵盖自动化脚本开发、插件工具的集成以及生产力工具的选型，为提高团队的效率和协作能力提供有力支持。",
    link: "https://best-picture-cb6.notion.site/121f95213f838040bdbfd36840e5dca8?pvs=4",
  },
];
