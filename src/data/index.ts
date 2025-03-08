import { ActivityItem, Project, TagDetail } from "@/types";

export const workHistory: ActivityItem[] = [
  {
    type: "work",
    title: "数据分析 & 产品研究",
    company: "高榕创投",
    description: "我在高榕创投负责数据分析、数据工程和产品研究工作。",
    period: "2024.10 - 2025.01",
    skills: ["案例研究", "Python", "行业报告", "爬虫"],
  },
  {
    type: "work",
    title: "创始人 & 开发者",
    company: "创生语宙",
    description:
      "创生语宙是我在2024年创立的一家初创公司。我们是一支充满激情的创业团队，致力于构建创新解决方案，解决创意和娱乐领域的问题。我们正在建设一个名为Jezzlab的AI+创意平台，这是下一代创意平台。",
    period: "2024 - 至今",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
  },
  {
    type: "work",
    title: "个人开发者",
    description:
      "2023年开始自学计算机科学，并开始构建自己的项目。同时涉猎AI，希望这些能成为未来发展方向的关键点。",
    period: "2023",
    skills: ["Python", "React", "Node.js", "AI", "Web3"],
  },
  {
    type: "work",
    title: "建筑师 & 开发者",
    company: "ZIAD",
    description:
      "我主要负责建筑设计，特别是在城市规划与设计方面。同时，我发现AI是未来的答案，所以我开始学习AI并构建了我的第一个AI应用。",
    period: "2022",
    skills: ["Rhinoceros", "Grasshopper", "Python", "AI"],
  },
  {
    type: "study",
    title: "建筑学专业学生",
    description:
      "2022年，我是一名建筑学专业的学生。在天津大学学习建筑和城市设计的基础知识。",
    period: "2022",
    skills: ["城市设计", "建筑", "人因工程", "设计"],
  },
];

export const projects: Project[] = [
  {
    title: "Ghostie",
    description:
      "革新性的轻量级桌面 Agent 平台，让你完全掌控 AI 助手的一切可能。得益于开放的架构设计，你可以自由定制 Agent 的每个行为：从简单的指令到复杂的工作流，从基础自动化到深度系统集成。独特的快捷唤醒机制让你随时随地与 Agent 对话，现代流畅的界面带来极致体验。无需编程知识即可通过可视化界面创建 Agent，同时提供完整的开发接口满足进阶需求。开放的插件生态和完整的桌面权限让你能将 Ghostie 打造成真正属于你的智能助手。这是一个追求极致自由的平台，你的想象力就是它的边界。",
    image: "/projects/ghostie.png",
    tags: [
      "开放生态",
      "自由定制",
      "智能助手",
      "桌面集成",
      "可视化编排",
      "便捷交互",
    ],
    link: "https://ghostie.wangenius.com",
    github: "https://github.com/wangenius/ghostie",
  },
  {
    title: "Jezzlab",
    description:
      "创生语宙旗下的革新性 AI 创意平台「介子」，重新定义创作范式。取名自物理学基本粒子，象征着对创作本质的探索与突破。平台通过前沿 AIGC 技术，颠覆传统线性创作模式：将世界观构建从抽象概念转化为可视化系统，把角色塑造变成交互式设计过程，让情节编排化繁为简。创新的 AI 协同机制让创作不再是孤独的旅程，而成为人机共创的探索。采用新一代本地优先的存储架构，在保护创作者隐私的同时，提供无缝的协作体验。配备系统化的创作指南，为所有怀抱创意梦想的人打造一个突破性的创作平台。",
    image: "/projects/jezzlab.jpg",
    tags: ["创作革新", "AI协同", "世界观构建", "智能写作", "隐私保护"],
    link: "https://jezzlab.com",
  },
  {
    title: "Mdrone",
    description: "一个具有AI参与的轻量级文本生成工具",
    image: "/projects/mdrone.png",
    tags: ["tauri", "AI", "文本生成", "轻量级"],
    github: "https://github.com/wangenius/mdrone",
  },
  {
    title: "GPT-shell",
    description: "一个轻量级的终端GPT访问工具，支持多平台模型，支持高度自定义",
    image: "/projects/gpt-shell.png",
    tags: ["GPT", "AI", "终端", "rust"],
    link: "https://github.com/wangenius/gpt-shell/releases/latest",
    github: "https://github.com/wangenius/gpt-shell",
  },
  {
    title: "建筑作品集",
    description: "我的建筑生涯作品集",
    image: "/projects/architect.png",
    tags: ["城市设计", "建筑", "渲染", "设计"],
    link: "/projects/protfolio4.0.pdf",
  },
];

export const tagDetails: TagDetail[] = [
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
      "斯蒂芬：我无所不能",
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
      "数据库：MongoDB、PostgreSQL",
      "开发理念：产品为主，以解决实际问题为导向",
    ],
  },
  {
    name: "AI",
    icon: "🤖",
    desc: "应用",
    longDesc: "AI在创意领域的应用",
    items: [
      "生成式AI",
      "大语言模型",
      "人工智能",
      "应用领域：创意生成、自然语言处理",
      "项目经验：AI创意平台开发",
      "发展愿景：AI赋能创意产业",
    ],
  },
  {
    name: "创作",
    icon: "🌐",
    desc: "创作者",
    longDesc: "具象的和抽象的艺术，故事性",
    items: [
      "探索生命的故事",
      "少即是多",
      "我追逐的唯一梦想就是属于我自己的梦",
      "这十八层怎么跳",
    ],
  },
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
      "设计方法：以用户为中心",
    ],
  },
];
