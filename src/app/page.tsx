"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/chat";
import {
  Briefcase,
  Code2,
  Github,
  Link as LinkIcon,
  Mail,
  MapPin,
  Twitter,
  ArrowRight,
  ChevronDown,
  Menu,
  Sparkles,
  MessageCircle,
  Hash,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useVelocity } from "framer-motion";
import Lenis from '@studio-freight/lenis';
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

// 修改活动历史的接口
interface ActivityItem {
  type: "work" | "project" | "study";
  title: string;
  company?: string;
  description: string;
  period: string;
  skills?: string[];
  link?: string;
}

const workHistory: ActivityItem[] = [
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

// 添加作品接口
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
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
  },{
    title: "Porfolio in Architect",
    description: "a portfolio in my architect career",
    image: "/projects/architect.png",
    tags: ["Urban Design", "Architect", "Rendering", "Design"],
    link: "/projects/protfolio4.0.pdf",
  }
];

// 添加标签详情数据接口和内容
interface TagDetail {
  name: string;
  icon: string;
  desc: string;
  longDesc: string;
  items: string[];
}

const tagDetails: TagDetail[] = [
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

interface Message {
  content: string;
  type: "user" | "bot";
  timestamp: number;
  isStreaming?: boolean;
  followUpQuestions?: {
    id: string;
    content: string;
  }[];
}

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  
  // 使用 Lenis 实现平滑滚动
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchInertiaMultiplier: 2,
      infinite: false,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 化滚动动画参数
  const smoothScroll = useSpring(scrollY, {
    stiffness: 35,    // 降低刚度
    damping: 20,      // 适中阻尼
    mass: 0.2,        // 适中的量
    restDelta: 0.001,
    restSpeed: 0.001,
    velocity: 2       // 保持初始速度
  });

  // 导航栏动画
  const navOpacity = useSpring(
    useTransform(smoothScroll, [0, 100], [0, 1]),
    { 
      stiffness: 35, 
      damping: 20,
      mass: 0.2
    }
  );

  const navBackdrop = useSpring(
    useTransform(smoothScroll, [0, 100], [0, 12]),
    { 
      stiffness: 35, 
      damping: 20,
      mass: 0.2
    }
  );

  // 背景视差效果
  const y = useSpring(
    useTransform(smoothScroll, [0, 1000], ["0%", "50%"]),
    { 
      stiffness: 35, 
      damping: 20,
      mass: 0.2
    }
  );

  const opacity = useSpring(
    useTransform(smoothScroll, [0, 300], [1, 0]),
    { 
      stiffness: 35, 
      damping: 20,
      mass: 0.2
    }
  );

  const scale = useSpring(
    useTransform(smoothScroll, [0, 300], [1, 0.8]),
    { 
      stiffness: 35, 
      damping: 20,
      mass: 0.2
    }
  );

  const [activeSection, setActiveSection] = useState("hero");
  const [showChat, setShowChat] = useState(false);
  
  const sections = useRef([
    { id: "hero", name: "Home" },
    { id: "about", name: "About" },
    { id: "projects", name: "Projects" },
    { id: "experience", name: "Experience" },
    { id: "contact", name: "Contact" }
  ]).current;
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // 简化滚动到指定区域的函使用原生平滑滚动
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  };

  // 简滚动检测，只更新当前区域
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // 找当前可见的区域
      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const { messages, addMessage, updateLastBotMessage, clearHistory } =
    useChatStore();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const viewport = messagesEndRef.current.closest(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: "smooth"
        });
      }
    }
  };

  // 监听消息变化自动滚动
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 监听消息内容变化自动滚动
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.type === "bot" && lastMessage.content) {
      scrollToBottom();
    }
  }, [messages.length > 0 ? messages[messages.length - 1]?.content : null]);

  const handleFollowUpClick = async (content: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    let isComponentMounted = true;

    const userMessage = {
      content,
      type: "user" as const,
      timestamp: Date.now(),
    };

    addMessage(userMessage);

    const botMessage = {
      content: "",
      type: "bot" as const,
      timestamp: Date.now(),
      isStreaming: true,
    };
    addMessage(botMessage);

    try {
      const apiUrl = `${window.location.origin}/api/dify`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: content,
        signal: abortControllerRef.current?.signal,
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
      }

      const reader = new ReadableStreamDefaultReader(response.body!);
      const decoder = new TextDecoder();
      let accumulatedContent = "";
      let currentFollowUps: { id: string; content: string; }[] = [];

      while (true) {
        const { done, value } = await reader.read();
        console.log(decoder.decode(value));
        if (done) break;

        const text = decoder.decode(value);
        console.log(text);
        const lines = text.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data:')) {
            console.log(line);
            try {
              const data = JSON.parse(line.slice(5));
              if (data.type === 'answer' && data.content && !data.created_at) {
                accumulatedContent += data.content;
                if (isComponentMounted) {
                  updateLastBotMessage(accumulatedContent, true, currentFollowUps);
                }
              } else if (data.type === 'follow_up' && data.content) {
                currentFollowUps = [...currentFollowUps, {
                  id: data.id,
                  content: data.content
                }];
                if (isComponentMounted) {
                  updateLastBotMessage(accumulatedContent, true, currentFollowUps);
                }
              }
            } catch (e) {
              continue;
            }
          }
        }
      }

      if (isComponentMounted) {
        updateLastBotMessage(accumulatedContent, false, currentFollowUps);
      }

    } catch (error: any) {
      console.error("发送消息时出错:", error);
      if (error.name !== 'AbortError' && isComponentMounted) {
        let errorMessage = '抱歉，发生了错误';
        if (error instanceof Error) {
          errorMessage += `: ${error.message}`;
        }
        updateLastBotMessage(errorMessage, false);
      }
    }

    return () => {
      isComponentMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const content = inputValue;
    setInputValue("");
    await handleFollowUpClick(content);
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const [selectedTag, setSelectedTag] = useState<TagDetail | null>(null);

  return (
    <div className="relative bg-gradient-to-b from-background via-background to-muted min-h-screen">
     <Toaster />
      {/* 导航栏 */}
      <motion.nav
        style={{ 
          opacity: navOpacity,
          backdropFilter: useTransform(navBackdrop, (value) => `blur(${value}px)`)
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10"
      >
        <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <motion.span 
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
            whileHover={{ scale: 1.05 }}
          >
            WANGENIUS
          </motion.span>
          
          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative px-2 py-1 text-sm transition-colors duration-200 ${
                  activeSection === section.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.name}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30 
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </motion.nav>

      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <motion.div
          style={{ y, opacity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/20 blur-[100px] -z-10"
        />
      </div>

      {/* 英雄区域 */}
      <motion.section 
        ref={(el) => (sectionRefs.current.hero = el)}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="relative"
          style={{ scale }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ 
              scale: 1.05,
              rotate: 5,
              transition: { type: "spring", stiffness: 300, damping: 15 }
            }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2 
            }}
            className="relative z-10"
          >
            <Avatar className="w-[200px] h-[200px] rounded-full border-4 border-primary/20 shadow-2xl">
              <AvatarImage
                src="/avatar.jpg"
                alt="Wang"
                className="object-cover"
              />
              <AvatarFallback>WG</AvatarFallback>
            </Avatar>
          </motion.div>
          
          <motion.div 
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        <motion.div 
          className="text-center mt-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary"
            variants={itemVariants}
          >
            WANGENIUS
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mt-4 font-serif italic"
            variants={itemVariants}
          >
            亦余心之所善兮，虽九死其犹未悔。
          </motion.p>
          
          <motion.div 
            className="flex gap-6 mt-8 justify-center"
            variants={itemVariants}
          >
            {[
              { icon: Github, href: "https://github.com/wangenius", label: "GitHub" },
              { icon: Mail, href: "mailto:wangenius@qq.com", label: "Email" },
              { icon: Twitter, href: "https://twitter.com/wangenius314", label: "Twitter" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                className="relative group"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-4 bg-background/80 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-lg">
                  <social.icon className="w-6 h-6 text-primary" />
                </div>
                <motion.span
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full opacity-0 group-hover:opacity-100"
                  initial={false}
                >
                  {social.label}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection("about")}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.2 }}
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </motion.div>
      </motion.section>

      {/* 关于我区域 */}
      <section 
        ref={(el) => (sectionRefs.current.about = el)}
        className="relative py-32"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="relative">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-7xl font-bold"
              >
                About Me
              </motion.h2>
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-primary to-blue-500"
                style={{ originX: 0 }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div 
                  className="p-6 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/10"
                  variants={itemVariants}
                >
                  <p className="text-lg leading-relaxed">
                    一个从柯布西耶到迪杰斯特拉的特解。
                    <br />
                    一条想横渡大海的神仙鱼
                  </p>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3 p-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/10"
                  variants={itemVariants}
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Shenzhen, China</span>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3 p-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/10"
                  variants={itemVariants}
                >
                  <LinkIcon className="w-5 h-5 text-primary" />
                  <a
                    href="https://wangenius.com"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    wangenius.com
                  </a>
                </motion.div>
              </motion.div>

              {/* About 右侧标签部分 - 新卡片使其可点击 */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {tagDetails.map((tag, index) => (
                  <div key={tag.name} className="relative">
                    <motion.div
                      layoutId={`card-container-${tag.name}`}
                      variants={itemVariants}
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedTag(tag)}
                      layout
                    >
                      <motion.div 
                        layoutId={`card-bg-${tag.name}`}
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-violet-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" 
                      />
                      <motion.div 
                        layoutId={`card-content-${tag.name}`}
                        className="relative p-4 bg-background/30 backdrop-blur-md rounded-2xl border border-primary/5 hover:border-primary/10 hover:bg-background/40 transition-all duration-500"
                      >
                        <div className="flex flex-col items-center gap-2 text-center">
                          <motion.span 
                            layoutId={`card-icon-${tag.name}`} 
                            className="text-2xl"
                          >
                            {tag.icon}
                          </motion.span>
                          <div>
                            <motion.p 
                              layoutId={`card-title-${tag.name}`} 
                              className="font-medium text-foreground/90"
                            >
                              {tag.name}
                            </motion.p>
                            <motion.p 
                              layoutId={`card-desc-${tag.name}`} 
                              className="text-xs text-muted-foreground/60"
                            >
                              {tag.desc}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 标签详情模态框 */}
      <AnimatePresence mode="wait">
        {selectedTag && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTag(null)}
          >
            <motion.div
              layoutId={`card-container-${selectedTag.name}`}
              className="relative w-full max-w-lg bg-background/50 rounded-2xl shadow-xl overflow-hidden border border-primary/10"
              onClick={(e) => e.stopPropagation()}
              layout
            >
              <motion.div
                layoutId={`card-bg-${selectedTag.name}`}
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-violet-500/5 opacity-30"
                transition={{ type: "spring", bounce: 0.2 }}
              />
              
              <motion.div
                layoutId={`card-content-${selectedTag.name}`}
                className="relative p-6 backdrop-blur-sm"
                transition={{ type: "spring", bounce: 0.2 }}
              >
                {/* 关闭按钮 */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedTag(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/5 transition-colors"
                >
                  <X className="w-4 h-4 text-foreground/60" />
                </motion.button>

                {/* 标签头部 */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    layoutId={`card-icon-${selectedTag.name}`}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/5 via-blue-500/5 to-violet-500/5 flex items-center justify-center"
                    transition={{ type: "spring", bounce: 0.2 }}
                  >
                    <span className="text-4xl">{selectedTag.icon}</span>
                  </motion.div>
                  <div>
                    <motion.h3
                      layoutId={`card-title-${selectedTag.name}`}
                      className="text-2xl font-bold text-foreground/90"
                      transition={{ type: "spring", bounce: 0.2 }}
                    >
                      {selectedTag.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`card-desc-${selectedTag.name}`}
                      className="text-muted-foreground/70"
                      transition={{ type: "spring", bounce: 0.2 }}
                    >
                      {selectedTag.desc}
                    </motion.p>
                  </div>
                </div>

                {/* 详细内容 - 带入场动画 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.3,
                    delay: 0.2,
                    ease: "easeOut"
                  }}
                >
                  {/* 详细描述 */}
                  <p className="text-muted-foreground/80 mb-6 leading-relaxed">
                    {selectedTag.longDesc}
                  </p>

                  {/* 详细列表 */}
                  <div className="space-y-3">
                    {selectedTag.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ 
                          duration: 0.3,
                          delay: 0.3 + index * 0.05,
                          ease: "easeOut"
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-primary/5 via-blue-500/5 to-violet-500/5 hover:from-primary/10 hover:via-blue-500/10 hover:to-violet-500/10 transition-colors group"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary/40 to-blue-500/40 group-hover:from-primary/60 group-hover:to-blue-500/60 transition-colors" />
                        <span className="text-foreground/80 group-hover:text-foreground/90 transition-colors">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 作品展示区域 - 高级设计 */}
      <section 
        ref={(el) => (sectionRefs.current.projects = el)}
        className="relative py-32"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="relative">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-7xl font-bold"
              >
                Projects
              </motion.h2>
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-primary to-blue-500"
                style={{ originX: 0 }}
              />
            </div>

            <div className="grid grid-cols-1 gap-12">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="group relative p-8 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-2xl border border-primary/5 hover:border-primary/20 transition-all duration-500">
                    <div className="flex flex-col md:flex-row gap-12">
                      {/* 项目图片 */}
                      <div className="relative w-full md:w-[240px] h-[240px] rounded-xl overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5"
                          whileHover={{
                            scale: 1.1,
                            background: "radial-gradient(circle at center, rgba(var(--primary), 0.2), rgba(var(--blue-500), 0.1))"
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain p-4"
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          />
                        </motion.div>
                      </div>

                      {/* 项目信息 */}
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div className="space-y-6">
                          <motion.div
                            initial={false}
                            whileHover={{ x: 8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 inline-flex items-center gap-2">
                              {project.title}
                              <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </motion.div>
                            </h3>
                            <p className="mt-3 text-muted-foreground/80 leading-relaxed">
                              {project.description}
                            </p>
                          </motion.div>

                          <motion.div 
                            className="flex flex-wrap gap-2"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                          >
                            {project.tags.map((tag, i) => (
                              <motion.span
                                key={tag}
                                variants={{
                                  hidden: { opacity: 0, y: 20 },
                                  visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                      type: "spring",
                                      stiffness: 100,
                                      delay: i * 0.1
                                    }
                                  }
                                }}
                                className="px-3 py-1 text-xs font-medium text-primary/80 bg-primary/5 rounded-full ring-1 ring-primary/10"
                                whileHover={{ scale: 1.05 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </motion.div>
                        </div>

                        <div className="flex gap-6 pt-6">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              className="inline-flex items-center gap-2 text-sm font-medium text-primary/80 hover:text-primary transition-colors group/link"
                            >
                              <LinkIcon className="w-4 h-4" />
                              <span className="relative">
                                Visit
                                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-primary/50 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                              </span>
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              className="inline-flex items-center gap-2 text-sm font-medium text-primary/80 hover:text-primary transition-colors group/github"
                            >
                              <Github className="w-4 h-4" />
                              <span className="relative">
                                Code
                                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-primary/50 scale-x-0 group-hover/github:scale-x-100 transition-transform duration-300" />
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 工作经历区域 */}
      <section 
        ref={(el) => (sectionRefs.current.experience = el)}
        className="relative py-32 bg-muted/20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="relative">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-7xl font-bold"
              >
                Experience
              </motion.h2>
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-primary to-blue-500"
                style={{ originX: 0 }}
              />
            </div>

            <div className="space-y-8">
              {workHistory.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="group p-8 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-2xl border border-primary/5 hover:border-primary/20 transition-all duration-500">
                    <div className="flex items-start gap-8">
                      <motion.div
                        whileHover={{ 
                          scale: 1.1,
                          background: "radial-gradient(circle at center, rgba(var(--primary), 0.2), rgba(var(--blue-500), 0.1))"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="relative p-4 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/10 group/icon"
                      >
                        {item.type === "work" ? (
                          <motion.div
                            initial={false}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                              <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={false}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                              <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.div>
                        )}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl opacity-0 group-hover/icon:opacity-100 blur-xl transition-opacity duration-500"
                        />
                      </motion.div>

                      <div className="flex-1 space-y-6">
                        <div>
                          <div className="flex items-center justify-between">
                            <motion.div 
                              className="inline-flex items-center gap-2"
                              whileHover={{ x: 4 }}
                            >
                              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                                {item.title}
                              </h3>
                              <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                            <span className="px-4 py-1.5 text-sm font-medium text-primary/80 bg-primary/5 rounded-full ring-1 ring-primary/10">
                              {item.period}
                            </span>
                          </div>
                          {item.company && (
                            <p className="mt-2 text-primary/80 font-medium">
                              {item.company}
                            </p>
                          )}
                        </div>

                        <p className="text-muted-foreground/80 leading-relaxed">
                          {item.description}
                        </p>

                        {item.skills && (
                          <motion.div 
                            className="flex flex-wrap gap-2"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                          >
                            {item.skills.map((skill, i) => (
                              <motion.span
                                key={i}
                                variants={{
                                  hidden: { opacity: 0, y: 20 },
                                  visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                      type: "spring",
                                      stiffness: 100,
                                      delay: i * 0.1
                                    }
                                  }
                                }}
                                className="px-3 py-1 text-xs font-medium text-primary/80 bg-primary/5 rounded-full ring-1 ring-primary/10"
                                whileHover={{ scale: 1.05 }}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </motion.div>
                        )}

                        {item.link && (
                          <motion.a
                            href={item.link}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary/80 hover:text-primary transition-colors group/link mt-4"
                            whileHover={{ x: 5 }}
                          >
                            <span className="relative">
                              查看项目
                              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-primary/50 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                            </span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact 区域 */}
      <section 
        ref={(el) => (sectionRefs.current.contact = el)}
        className="relative py-32"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            {/* 标题部分 - 保持原有样式 */}
            <div className="relative">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-7xl font-bold"
              >
                Contact
              </motion.h2>
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-primary to-blue-500"
                style={{ originX: 0 }}
              />
            </div>

            {/* 联系方式卡片 */}
            <div className="relative">
              {/* 背景装饰 */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] opacity-30" />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {/* Email Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group relative aspect-square"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative h-full p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/10 overflow-hidden">
                    <motion.div 
                      className="h-full flex flex-col justify-between select-none cursor-pointer"
                      initial={false}
                      animate={{ opacity: 1 }}
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary">Email</h3>
                        <p className="mt-1 text-muted-foreground">点击复制邮箱地址</p>
                      </div>
                    </motion.div>

                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 select-none cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText("wangenius@qq.com");
                        toast("邮箱地址已复制到剪贴板", {
                          duration: 2000,
                          className: "bg-primary text-primary-foreground",
                        });
                      }}
                    >
                      <div className="text-center mb-12">
                        <p className="text-2xl font-bold text-primary mb-2">wangenius@qq.com</p>
                        <p className="text-sm text-primary/60">Click to copy</p>
                      </div>
                      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                        <motion.a
                          href="mailto:wangenius@qq.com"
                          className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-all"
                          whileHover={{ scale: 1.05 }}
                          style={{ transformOrigin: "center" }}
                        >
                          Open in mail app
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* WeChat Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group relative aspect-square"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative h-full p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/10 overflow-hidden">
                    <motion.div 
                      className="h-full flex flex-col justify-between select-none"
                      initial={false}
                      animate={{ opacity: 1 }}
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary">WeChat</h3>
                        <p className="mt-1 text-muted-foreground">扫码添加好友</p>
                      </div>
                    </motion.div>

                    <div
                      className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <img 
                        src="/wechat.jpg" 
                        alt="WeChat QR Code" 
                        className="w-48 h-48 rounded-xl"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* QQ Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group relative aspect-square"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative h-full p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/10 overflow-hidden">
                    <motion.div 
                      className="h-full flex flex-col justify-between select-none cursor-pointer"
                      initial={false}
                      animate={{ opacity: 1 }}
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Hash className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary">QQ</h3>
                        <p className="mt-1 text-muted-foreground">点击复制QQ号</p>
                      </div>
                    </motion.div>

                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 select-none cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText("2732822492");
                        toast("QQ号已复制到剪贴板", {
                          duration: 2000,
                          className: "bg-primary text-primary-foreground",
                        });
                      }}
                    >
                      <div className="text-center mb-12">
                        <p className="text-2xl font-bold text-primary mb-2">2732822492</p>
                        <p className="text-sm text-primary/60">Click to copy</p>
                      </div>
                      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                        <motion.a
                          href="https://qm.qq.com/cgi-bin/qm/qr?k=2732822492"
                          target="_blank"
                          className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-all"
                          whileHover={{ scale: 1.05 }}
                          style={{ transformOrigin: "center" }}
                        >
                          Add friend
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 聊天按钮和窗口 */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 1 
        }}
      >
        <Button
          className="w-16 h-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-transform duration-200 hover:scale-110 relative group"
          onClick={() => setShowChat(!showChat)}
        >
          <motion.div
            className="absolute inset-0 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Sparkles className="w-6 h-6 relative z-10" />
        </Button>
      </motion.div>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-8 w-[400px] bg-background/80 backdrop-blur-lg rounded-2xl border border-primary/20 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-primary/10 flex items-center justify-between">
              <h3 className="font-medium">Chat with Me</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-xs hover:bg-destructive/10 hover:text-destructive"
              >
                Clear
              </Button>
            </div>

            <ScrollArea 
              className="h-[400px]"
              onWheel={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="p-4">
                <AnimatePresence>
                  {messages.length > 0 ? (
                    <motion.div className="space-y-4">
                      {messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`flex ${
                            message.type === "bot"
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          {message.type === "bot" && (
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/avatar.jpg" alt="Wang" />
                              <AvatarFallback>WG</AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex flex-col gap-2 max-w-[80%]">
                            <motion.div
                              className={`
                                relative px-4 py-2 rounded-2xl
                                ${
                                  message.type === "bot"
                                    ? "bg-muted text-foreground rounded-tl-sm"
                                    : "bg-primary text-primary-foreground rounded-tr-sm"
                                }
                              `}
                              whileHover={{ scale: 1.02 }}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                {message.content}
                                {message.isStreaming && (
                                  <motion.span 
                                    className="inline-flex items-center ml-2 gap-[2px]"
                                    animate={{ opacity: [0.4, 1] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                  >
                                    <span className="w-1 h-1 rounded-full bg-current" />
                                    <span className="w-1 h-1 rounded-full bg-current" />
                                    <span className="w-1 h-1 rounded-full bg-current" />
                                  </motion.span>
                                )}
                              </p>
                            </motion.div>
                            
                            {/* 进问题展示 */}
                            {message.type === "bot" && message.followUpQuestions && message.followUpQuestions.length > 0 && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col gap-2"
                              >
                                <div className="text-xs text-muted-foreground ml-1">建议的问题：</div>
                                <div className="flex flex-wrap gap-2">
                                  {message.followUpQuestions.map((question, idx) => (
                                    <motion.button
                                      key={question.id}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{
                                        delay: 0.5 + idx * 0.1,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 10
                                      }}
                                      onClick={() => handleFollowUpClick(question.content)}
                                      className="px-3 py-1.5 text-xs bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-full transition-colors cursor-pointer"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      {question.content}
                                    </motion.button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-muted-foreground py-8"
                    >
                      开始对话吧 👋
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-primary/10">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={inputValue}
                  autoFocus
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="输入消息..."
                  className="flex-1 bg-background/50"
                />
                <Button type="submit">发送</Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer 模块 */}
      <footer className="relative py-32 overflow-hidden">
        {/* 背景动画效果 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
          <motion.div
            className="absolute inset-0"
            initial={{ backgroundPosition: "0 0" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(var(--primary), 0.1) 0%, transparent 50%)",
              backgroundSize: "100% 100%",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              {/* 个性化签名 */}
              <div className="relative inline-block">
                <motion.div
                  className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  " 横渡大海的神仙鱼 "
                </motion.div>
              </div>

              {/* 意标语 */}
              <motion.div 
                className="flex flex-col items-center gap-4 mt-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 text-lg text-muted-foreground"
                >
                  <span>创造</span>
                  <span className="w-12 h-[1px] bg-primary/20" />
                  <span>探索</span>
                  <span className="w-12 h-[1px] bg-primary/20" />
                  <span>突破</span>
                </motion.div>
                
                <motion.p
                  variants={itemVariants}
                  className="text-sm text-muted-foreground/80 max-w-md"
                >
                  在这里，我将代码与创意编织成梦想，让每一个像素都闪耀着独特的光芒
                </motion.p>
              </motion.div>

              {/* 签名和年份 */}
              <motion.div
                variants={itemVariants}
                className="pt-8 text-sm text-muted-foreground/60 font-mono"
              >
                <span>Made with ❤️ by WANGENIUS © 2024</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
