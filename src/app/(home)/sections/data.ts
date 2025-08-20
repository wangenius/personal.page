import { ActivityItem, Project, TagDetail } from "@/types";

export const workHistory: ActivityItem[] = [
  {
    type: "work",
    title: "独立开发者",
    description:
      "独立开发者，致力于构建创新解决方案，解决工作业务末梢场景的问题。主要产品：Ghostie、Mdrone等，同时设计了一整套快捷Agent方案。 期间锻炼和训练出来一套完整快捷的Agent设计开发思路和流程。同时参与了多个黑客松活动，对Agent的技术边界、场景和应用有了更深的理解。",
    period: "2025 - now",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
  },
  {
    type: "work",
    title: "数据分析 & 产品研究",
    company: "高榕创投",
    description: "基于产品瓶颈和认知局限的自我判断，2024年选择去高榕创投实习，从投资者的角度认知产品。负责数据分析、数据工程和产品研究工作。期间主要参与AI相关的产品的研究，包括： AI Coding 软件相关、 各供应商大模型的横向评测、 虚拟货币中Agent Coin相关的研究等。广泛涉猎了各种AI产品，学习了研究产品的方法论。",
    period: "2024",
    skills: ["案例研究", "Python", "行业报告", "爬虫"],
  },
  {
    type: "work",
    title: "Founder & Developer",
    company: "创生语宙",
    description:
      "2023年开始筹备AI创业，从产品、技术以及市场做了很多前期的调研和访谈。创生语宙是我在2024年创立的一家初创公司。和5个充满激情的小伙伴，对AI时代的创作范式做了革新性的创新，上线和运营了介子。这个过程中，作为发起人，我负责了基础工作、产品设计、技术开发、市场运营等等主要的工作。",
    period: "2023 - now",
    skills: ["React", "TypeScript", "Node.js", "AI", "Agent", "创作", "内容"],
  },
  {
    type: "work",
    title: "转行的GAP year",
    description:
      "2023年认识到未来的发展趋势是微型团队、一人公司、超级个体，但同时AI的能力并不足以支撑进阶的产品设计和开发，因此一边调研互联网和相关兴趣行业的同时，一边自学计算机科学，深入计算机组成原理、计算机网络、数据结构和算法等等软件背后的核心原理，并开始独立开发自己的项目，做了一些各种产品的尝试。",
    period: "2023",
    skills: ["Python", "React", "Node.js", "AI", "Web3"],
  },
  {
    type: "study",
    title: "建筑师 & 设计师",
    company: "ZIAD",
    description:
      "2017年-2022年，我是一名建筑学专业的学生。在天津大学学习建筑和城市设计。建筑学涉猎广泛，除了建筑外，学到了很多设计的思维和方法，开始对做产品有了兴趣。2022年在浙江省建筑设计研究院做建筑设计师，主要是利用参数化和其他数字化方式设计城市地标建筑。期间发现AI，开始学习计算机科学和AI等相关技能，并成为独立开发者。",
    period: "2017 - 2022",
    skills: ["Rhinoceros", "Grasshopper", "Python","城市设计",  "人因工程",],
  },
];

export const projects: Project[] = [
  {
    title: "Ghostie",
    description:
      "革新性的轻量级桌面 Agent 平台，让你完全掌控 AI 助手的一切可能。得益于开放的架构设计，你可以自由定制 Agent 的每个行为：从简单的指令到复杂的工作流，从基础自动化到深度系统集成。独特的快捷唤醒机制让你随时随地与 Agent 对话，现代流畅的界面带来极致体验。无需编程知识即可通过可视化界面创建 Agent，同时提供完整的开发接口满足进阶需求。开放的插件生态和完整的桌面权限让你能将 Ghostie 打造成真正属于你的智能助手。这是一个追求极致自由的平台，你的想象力就是它的边界。",
    image: "/projects/ghostie.svg",
    tags: [
      "开放生态",
      "自由定制",
      "智能助手",
      "桌面集成",
      "可视化编排",
      "便捷交互",
    ],
    link: "https://ghostie.wangenius.com",
  },
  {
    title: "Jezzlab",
    description:
      "创生语宙旗下的革新性 AI 创意平台「介子」，重新定义创作范式。取名自物理学基本粒子，象征着对创作本质的探索与突破。平台通过前沿 AIGC 技术，颠覆传统线性创作模式：将世界观构建从抽象概念转化为可视化系统，把角色塑造变成交互式设计过程，让情节编排化繁为简。创新的 AI 协同机制让创作不再是孤独的旅程，而成为人机共创的探索。采用新一代本地优先的存储架构，在保护创作者隐私的同时，提供无缝的协作体验。配备系统化的创作指南，为所有怀抱创意梦想的人打造一个突破性的创作平台。",
    image: "/projects/jezzlab.jpg",
    tags: ["创作革新", "AI协同", "世界观构建", "智能写作", "隐私保护"],
    link: "https://www.jezzlab.com",
  },
  {
    title: "Mdrone",
    description: "一个具有AI能力的轻量级Markdown写作工具，支持即时渲染，AI能力更加深层次的融合到写作环境当中。",
    image: "/projects/mdrone.png",
    tags: ["tauri", "AI", "文本生成", "轻量级"],
    github: "https://github.com/wangenius/mdrone",
  },

  {
    title: "建筑作品集",
    description: "我的建筑生涯作品集，希望可以展现我的设计和审美能力。点击链接可下载，下载的内容是低分辨率的PDF版本，如需高清或者更多视频、模型内容，可使用邮箱联系我。",
    image: "/projects/architect.png",
    tags: ["城市设计", "建筑", "渲染", "设计"],
    link: "/projects/protfolio4.0.pdf",
  },
];

export const tagDetails: TagDetail[] = [
  {
    name: "设计",
    icon: "🎨",
    desc: "用户界面/用户体验",
    longDesc: "注重用户体验的UI/UX设计师，追求美感与实用的平衡。",
    items: [
      "对空间、形态的探索",
      "从建筑到产品",
      "专注领域：交互设计、视觉设计",
      "项目类型：Web应用、移动应用",
      "Figma、Adobe系列PS、illustrator、InDesign",
      "Rhino、Grasshopper",
    ],
  },
  {
    name: "开发",
    icon: "💻",
    desc: "全栈",
    longDesc: "全栈开发工程师，热衷于探索新技术和创新解决方案。",
    items: [
      "前端技术：React、TypeScript",
      "后端技术：Node.js、Python、Rust",
      "数据库：PostgreSQL",
      "开发理念：产品为主，以解决实际问题为导向",
    ],
  },
  {
    name: "AI",
    icon: "🤖",
    desc: "应用",
    longDesc: "AI在创意领域的应用",
    items: [
      "GenAI + Agent 解决方案",
      "项目经验：AI创意平台开发、AI Agent 开发",
      "MCP + A2A",
      "ComfyUI"
    ],
  },
  {
    name: "音乐",
    icon: "🎵",
    desc: "Eason",
    longDesc: "音乐是我生活中不可或缺的一部分，尤其喜欢陈奕迅的音乐。",
    items: [
      "陈奕迅、谭咏麟、beyond、王菲、Dear Jane",
      "黄伟文",
      "从何时开始忌讳空山无人，从何时害怕遥望星辰",
      "想反胜你便再熬",
      "情愿你有读心的超能力，能发现我的心计，提早阻止",
      "唯独壮烈离座，可百世流芳",
    ],
  },
  {
    name: "篮球",
    icon: "🏀",
    desc: "GSW",
    longDesc: "热爱篮球运动，是金州勇士队的粉丝。",
    items: [
      "最喜欢的球队：金州勇士",
      "最喜欢的球员：斯蒂芬·库里",
      "最爱的比赛：2022赛季总决赛",
      "Stephen Curry: I can do all things",
    ],
  },

  {
    name: "创作",
    icon: "🌐",
    desc: "创作者",
    longDesc: "具象的和抽象的艺术，故事性",
    items: [
      "探索生命的故事",
      "少即是多"
    ],
  },
];
