import { ActivityItem, Project, TagDetail } from "@/types";

export const workHistory: ActivityItem[] = [
  {
    type: "work",
    title: "Data Analyst & Data Engineer & Product Researcher",
    company: "GRVC",
    description:
      "I was responsible for data analysis, data engineering, and product research in GRVC.",
    period: "2024.10 - 2025.1",
    skills: ["case study", "Python", "industry report", "scrapper"],
  },
  {
    type: "work",
    title: "Founder & Developer",
    company: "CSYZ Technology",
    description:
      "CSYZ is a startup company that I founded in 2024. We are a team of passionate startupers who are dedicated to building innovative solutions that solve problems in creativity and entertainment. We are building a platform for AI+ creativity call Jezzlab. the next generation of creativity.",
    period: "2024 - Present",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
  },
  {
    type: "study",
    title: "Computer Science & Software Engineering Student",
    description:
      "I was a student of Computer Science & Software Engineering in 2023. try to learn something new that can be the key point of the direction of the future.",
    period: "2023",
    skills: ["Python", "React", "Node.js", "AI", "Web3"],
  },
  {
    type: "work",
    title: "Architect & Developer",
    company: "ZIAD",
    description:
      "I was responsible for the architecture design especially in the Urban Planning and Design. at the same time, I find the fact that AI is the answer to the future. so I start to learn AI and build my first AI application.",
    period: "2022",
    skills: ["Rhinoceros", "Grasshopper", "Python", "AI"],
  },
  {
    type: "study",
    title: "Architecture Student",
    description:
      "I was a student of Architecture in 2022. I learn the basic knowledge of architecture and urban design in TJU, Tianjin University.",
    period: "2022",
    skills: ["Urban Design", "Architect", "Human Factors Engineering", "Design"],
  },
];

export const projects: Project[] = [
  {
    title: "Jezzlab",
    description: "An AI-driven creative platform that makes creation easier and more fun",
    image: "/projects/jezzlab.jpg",
    tags: ["Next.js", "AI", "Creative", "Design"],
    link: "https://jezzlab.com",
  },
  {
    title: "Mdrone",
    description: "A lightweight text generation tool with AI participation",
    image: "/projects/mdrone.png",
    tags: ["tauri", "AI", "Text Generation", "Lightweight"],
    github: "https://github.com/wangenius/mdrone"
  },
  {
    title: "GPT-shell",
    description: "A lightweight GPT access tool for terminal, support multi-platform models, and support highly customized",
    image: "/projects/gpt-shell.png",
    tags: ["GPT", "AI", "terminal","rust"],
    link: "https://github.com/wangenius/gpt-shell/releases/latest",
    github: "https://github.com/wangenius/gpt-shell"
  },
  {
    title: "Porfolio in Architect",
    description: "a portfolio in my architect career",
    image: "/projects/architect.png",
    tags: ["Urban Design", "Architect", "Rendering", "Design"],
    link: "/projects/protfolio4.0.pdf",
  }
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
      "唯独壮烈离座，可百世流芳"
    ]
  },
  {
    name: "篮球",
    icon: "🏀",
    desc: "GSW",
    longDesc: "热爱篮球运动，是金州勇士队的粉丝。",
    items: [
      "最喜欢的球队：Golden State Warriors",
      "最喜欢的球员：Stephen Curry",
      "最爱的比赛：2022赛季总决赛",
      "Stephen：I can do all things"
    ]
  },
  {
    name: "开发",
    icon: "💻",
    desc: "Full Stack",
    longDesc: "全栈开发工程师，热衷于探索新技术和创新解决方案。",
    items: [
      "前端技术：React、TypeScript",
      "后端技术：Node.js、Python、Rust",
      "数据库：MongoDB、PostgreSQL",
      "开发理念：产品为主，以解决实际问题为导向"
    ]
  },
  {
    name: "AI",
    icon: "🤖",
    desc: "application",
    longDesc: "AI在创意领域的应用",
    items: [
      "Gen AI",
      "LLM",
      "AI",
      "应用领域：创意生成、自然语言处理",
      "项目经验：AI创意平台开发",
      "发展愿景：AI赋能创意产业"
    ]
  },
  {
    name: "创作",
    icon: "🌐",
    desc: "Builder",
    longDesc: "具象的和抽象的艺术，故事性",
    items: [
      "探索生命的故事",
      "less is more",
      "The only dream that I've been chasing is my own",
      "这十八层怎么跳"
    ]
  },
  {
    name: "设计",
    icon: "🎨",
    desc: "UI/UX",
    longDesc: "注重用户体验的UI/UX设计师，追求美感与实用的平衡。",
    items: [
      "对空间、形态的探索",
      "从建筑到产品",
      "专注领域：交互设计、视觉设计",
      "项目类型：Web应用、移动应用",
      "设计方法：以用户为中心"
    ]
  }
]; 