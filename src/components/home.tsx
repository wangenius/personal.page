"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

interface Portfolio {
  title: string;
  description: string;
  link: string;
  tags: string[];
  color: string;
}

const portfolios: Portfolio[] = [
  {
    title: "Jezzlab",
    description: "AI创作平台",
    link: "https://jezzlab.com",
    tags: ["React", "Node.js", "TypeScript"],
    color: "#4F46E5",
  },
  {
    title: "Crafr",
    description: "开发工具集",
    link: "https://github.com/wangenius/crafr",
    tags: ["tauri", "rust"],
    color: "#16A34A",
  },
  {
    title: "Echo",
    description: "React 状态管理工具",
    link: "https://github.com/wangenius/echo",
    tags: ["React", "Zustand"],
    color: "#DB2777",
  },
];

const skills = [
  {
    category: "前端开发",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue"],
  },
  {
    category: "后端开发",
    items: ["Node.js", "Rust", "Python", "PostgreSQL", "Redis"],
  },
  {
    category: "工具和设计",
    items: ["Git", "Docker", "Figma", "AWS", "Linux"],
  },
];

interface Message {
  content: string;
  type: "bot" | "user";
  timestamp: number;
}

const initialMessages: Message[] = [
  { content: "👋 你好！我是 Wang", type: "bot", timestamp: Date.now() },
  {
    content: "很高兴见到你！让我们来聊聊吧",
    type: "bot",
    timestamp: Date.now() + 500,
  },
];

const botResponses = [
  "我是一名全栈开发者，主要使用 React、TypeScript 和 Node.js",
  "你可以问我关于编程、设计或者其他任何话题",
  "我很喜欢探索新技术，最近在研究 AI 和 WebAssembly",
  "如果你对我的项目感兴趣，可以往下滚动查看我的作品集",
  "你也可以通过页面底部的联系方式找到我",
];

const MessageList = memo(
  ({ messages, isTyping }: { messages: Message[]; isTyping: boolean }) => {
    return (
      <div className="space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.timestamp}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            layout
            className={cn(
              "flex",
              message.type === "bot" ? "justify-start" : "justify-end"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] px-4 py-2 rounded-2xl backdrop-blur-sm",
                message.type === "bot"
                  ? "bg-gradient-to-r from-purple-500/10 to-cyan-500/10 text-foreground"
                  : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
              )}
            >
              <p className="text-sm md:text-base">{message.content}</p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div className="flex justify-start">
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 text-foreground px-4 py-2 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      delay: i * 0.2,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

const VirtualizedMessages = memo(
  ({
    messages,
    isTyping,
    messagesEndRef,
  }: {
    messages: Message[];
    isTyping: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement>;
  }) => {
    return (
      <ScrollArea className="h-[400px] pr-4">
        <MessageList messages={messages} isTyping={isTyping} />
        <div ref={messagesEndRef} />
      </ScrollArea>
    );
  }
);

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 优化滚动动效
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  // 更平滑的视差效果
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacityProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.8, 0]
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim()) return;

      const userMessage: Message = {
        content: inputValue.trim(),
        type: "user",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);

      requestAnimationFrame(() => {
        setTimeout(() => {
          const randomResponse =
            botResponses[Math.floor(Math.random() * botResponses.length)];
          setMessages((prev) => [
            ...prev,
            {
              content: randomResponse,
              type: "bot",
              timestamp: Date.now(),
            },
          ]);
          setIsTyping(false);
        }, 1000);
      });
    },
    [inputValue]
  );

  // 优化背景动画效果
  const backgroundVariants = {
    animate: {
      x: ["0%", "100%", "0%"],
      y: ["0%", "50%", "0%"],
      scale: [1, 1.1, 1],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <>
      <div ref={containerRef} className="relative min-h-screen">
        {/* 优化背景效果 */}
        <motion.div className="fixed inset-0 -z-10" style={{ y: backgroundY }}>
          {/* 网格背景 */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

          {/* 主渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0)_50%)]" />
          </div>

          {/* 动态光效 */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial="initial"
              animate="animate"
            >
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-[100%] bg-gradient-to-b from-purple-500/10 to-cyan-500/10 blur-3xl"
                  variants={backgroundVariants}
                  custom={i}
                  style={{
                    width: `${400 + i * 200}px`,
                    height: `${400 + i * 200}px`,
                    left: `${-20 + i * 60}%`,
                    top: `${-20 + i * 40}%`,
                    willChange: "transform",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Hero 区域 */}
        <motion.div
          className="relative z-10"
          style={{ y: contentY, opacity: opacityProgress }}
        >
          <div className="min-h-screen">
            <div className="container mx-auto px-4 h-screen flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
                {/* 左侧内容区 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-10"
                >
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block"
                    >
                      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-md rounded-full p-1">
                        <Badge variant="outline" className="border-0">
                          <Sparkles className="mr-2 h-3 w-3 text-purple-500" />
                          <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                            全栈开发者 / UI设计师 / 开源爱好者
                          </span>
                        </Badge>
                      </div>
                    </motion.div>

                    <div className="relative">
                      <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                          创造数字体验
                        </span>
                      </h1>{" "}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute -left-4 -bottom-5 h-px bg-gradient-to-r from-purple-500/50 to-transparent"
                      />
                    </div>

                    <p className="text-lg text-muted-foreground/80 max-w-lg leading-relaxed">
                      专注于创建优雅且高效的数字解决方案，让技术与创意激情碰撞
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                    >
                      <span className="relative z-10 flex items-center">
                        查看作品
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                        style={{ opacity: 0.2 }}
                      />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="group border-purple-500/20 hover:border-purple-500/40 transition-colors"
                    >
                      了解更多
                    </Button>
                  </div>

                  <div className="pt-8">
                    <div className="flex flex-wrap gap-3">
                      {["React", "TypeScript", "Node.js", "UI/UX", "Web3"].map(
                        (tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <Badge
                              variant="secondary"
                              className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 hover:from-purple-500/20 hover:to-cyan-500/20 transition-colors cursor-pointer"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* 右侧对话框 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-30" />
                  <Card className="relative overflow-hidden border-0 bg-gradient-to-b from-background/80 to-background/50 backdrop-blur-xl">
                    <CardContent className="p-8">
                      <VirtualizedMessages
                        messages={messages}
                        isTyping={isTyping}
                        messagesEndRef={messagesEndRef}
                      />

                      <Separator className="my-6 opacity-20" />

                      <form onSubmit={handleSendMessage} className="flex gap-3">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="输入消息..."
                          className="flex-1 px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-950/50 border border-purple-500/20 focus:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:opacity-90 transition-opacity"
                        >
                          发送
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 关于我 */}
        <div className="relative z-10 bg-background/95 py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">关于我</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                我是一名充满激情的全栈开发者，专注于创建优雅且高效的数字解决方案。
                拥有丰富的 Web 开发经验，热衷于开源项目和新技术探索。
                我相信技术不仅能解决问题，还能创造美好的用户体验。
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border border-border/50 bg-muted/50"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 作品集 */}
        <div className="relative z-10  py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">精选作品</h2>
              <p className="text-lg text-muted-foreground">
                探索我的最新项目和开源贡
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((portfolio, index) => (
                <motion.div
                  key={portfolio.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={portfolio.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative  rounded-xl overflow-hidden border border-border/50"
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      backgroundColor: "hsl(var(--muted))",
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: portfolio.color }}
                        />
                        <h3 className="text-xl font-semibold text-white">
                          {portfolio.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 mb-4">
                        {portfolio.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {portfolio.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm text-white/80 rounded-full"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.1)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r"
                          style={{
                            backgroundImage: `linear-gradient(45deg, ${portfolio.color}20, transparent)`,
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="relative z-10 bg-background/95 py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                让我们连接
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                无论是项目合作还是技术交流，都欢迎与我联系
              </p>
            </motion.div>
            <div className="flex justify-center space-x-8">
              <motion.a
                href="mailto:wangenius@foxmail.com"
                whileHover={{ scale: 1.1 }}
                className="p-4 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <IconMail className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://github.com/wangenius"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-4 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <IconBrandGithub className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com/wangenius"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-4 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <IconBrandTwitter className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
