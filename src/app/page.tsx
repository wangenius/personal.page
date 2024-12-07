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
  Twitter
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  updatedAt: string;
}

const featuredRepos: Repository[] = [
  {
    name: "jezzlab-front",
    description: "A modern web application built with Next.js and TypeScript",
    stars: 128,
    forks: 23,
    language: "TypeScript",
    languageColor: "#3178c6",
    updatedAt: "Updated 2 days ago",
  },
  {
    name: "personal-page",
    description: "My personal website built with modern tech stack",
    stars: 45,
    forks: 12,
    language: "JavaScript",
    languageColor: "#f1e05a",
    updatedAt: "Updated last week",
  },
];

// 修改活动历史的接口
interface ActivityItem {
  type: "work" | "project";
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
    title: "Founder & CEO & Founder Developer",
    company: "CSYZ Technology",
    description:
      "CSYZ is a startup company that I founded in 2024. We are a team of passionate startupers who are dedicated to building innovative solutions that solve problems in creativity and entertainment. We are building a platform for AI+ creativity call Jezzlab. the next generation of creativity.",
    period: "2024 - Present",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
  },
  {
    type: "project",
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
];

export default function Home() {
  const { messages, addMessage, updateLastBotMessage, clearHistory } =
    useChatStore();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const viewport = messagesEndRef.current.closest(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (!isFirstRender.current && messages.length > 0) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 50);
      return () => clearTimeout(timer);
    }
    isFirstRender.current = false;
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      content: inputValue,
      type: "user" as const,
      timestamp: Date.now(),
    };

    setInputValue("");
    addMessage(userMessage);

    // 创建一个带有加载动画的机器人消息
    const botMessage = {
      content: "",
      type: "bot" as const,
      timestamp: Date.now(),
      isStreaming: true,
    };
    addMessage(botMessage);

    try {
      const response = await fetch("/api/dify", {
        method: "POST",
        body: inputValue,
      });

      if (!response.ok) {
        throw new Error("API 请求失败");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("无法获取响应流");
      }

      let accumulatedContent = "";
      let lastUpdateTime = Date.now();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        accumulatedContent += text;

        // 控制更新频率，避免过于频繁的更新
        const now = Date.now();
        if (now - lastUpdateTime > 50) {
          // 每50ms更新一次
          updateLastBotMessage(accumulatedContent);
          lastUpdateTime = now;
        }
      }

      // 最后一次更新，确保显示完整内容
      updateLastBotMessage(accumulatedContent);

      // 延迟移除加载动画
      setTimeout(() => {
        updateLastBotMessage(accumulatedContent, false);
      }, 200);
    } catch (error) {
      console.error("发送消息时出错:", error);
      updateLastBotMessage("抱歉，发生了一些错误。请稍后再试。", false);
    }
  };

  return (
    <div className="bg-background">
      <div className="container max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[296px_1fr] gap-6">
          {/* 左侧个人信息栏 - 固定宽度 296px */}
          <div className="space-y-4">
            <div className="flex flex-col items-center lg:items-start">
              <Avatar className="h-[296px] w-[296px] rounded-full border-0 overflow-hidden">
                <AvatarImage
                  src="/avatar.jpg"
                  alt="Wang"
                  className="object-cover"
                />
                <AvatarFallback>WG</AvatarFallback>
              </Avatar>
              <div className="mt-4 w-full">
                <h1 className="text-2xl font-semibold">WANGENIUS</h1>
                <p className="text-lg text-muted-foreground">
                  亦余心之所善兮，虽九死其犹未悔。
                </p>
              </div>
            </div>

            <div className="w-full">
              <p className="text-base text-muted-foreground">
                一个从柯布西耶到迪杰斯特拉的特解。
                <br />
                一条想横渡大海的神仙鱼。
                <br />
                Full-stack developer passionate about building innovative
                solutions. Currently focusing on AI and Creator Economy.
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Shenzhen, China</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <LinkIcon className="w-4 h-4" />
                  <a
                    href="https://wangenius.com"
                    className="hover:text-blue-500"
                  >
                    wangenius.com
                  </a>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {[
                  { icon: Github, href: "https://github.com/wangenius" },
                  { icon: Mail, href: "mailto:contact@example.com" },
                  { icon: Twitter, href: "https://twitter.com/wangenius" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* 个人标签 */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Eason", icon: "🎵" },
                  { name: "GSW", icon: "🏀" },
                  { name: "Basketball", icon: "🎯" },
                  { name: "React", icon: "⚛️" },
                  { name: "TypeScript", icon: "📘" },
                  { name: "Next.js", icon: "▲" },
                  { name: "AI", icon: "🤖" },
                  { name: "Web3", icon: "🌐" },
                  { name: "设计", icon: "🎨" },
                  { name: "音乐", icon: "🎼" },
                ].map((tag) => (
                  <span
                    key={tag.name}
                    onClick={() => {
                      window.open(
                        `https://x.com/search?q=${tag.name}`,
                        "_blank"
                      );
                    }}
                    className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{tag.icon}</span>
                    <span>{tag.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧主要内容区 */}
          <div className="space-y-6">
            {/* 聊天区域 */}
            <div className="border rounded-md">
              <div className="bg-muted/30 px-4 py-2 border-b flex items-center justify-between">
                <h2 className="text-sm font-medium">Chat</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Online</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={clearHistory}
                  >
                    清除记录
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="px-4 py-4">
                  <div className="space-y-4">
                    {messages.length > 0 ? (
                      messages.map((message, index) => (
                        <div
                          key={message.timestamp}
                          className={`flex ${
                            message.type === "bot"
                              ? "justify-start"
                              : "justify-end"
                          } animate-in slide-in-from-bottom-2 duration-300 ease-out`}
                        >
                          {message.type === "bot" && (
                            <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                              <AvatarImage src="/avatar.jpg" alt="Wang" />
                              <AvatarFallback>WG</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`
                            relative max-w-[80%] px-4 py-2 rounded-2xl
                            ${
                              message.type === "bot"
                                ? "bg-muted/50 text-foreground rounded-tl-sm"
                                : "bg-blue-500 text-white rounded-tr-sm"
                            }
                            transform transition-all duration-200
                          `}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                              {message.content}
                              {message.isStreaming && (
                                <span className="inline-flex items-center ml-1 gap-[2px]">
                                  <span className="w-1 h-1 rounded-full bg-current opacity-60 animate-pulse" />
                                  <span className="w-1 h-1 rounded-full bg-current opacity-60 animate-pulse [animation-delay:0.2s]" />
                                  <span className="w-1 h-1 rounded-full bg-current opacity-60 animate-pulse [animation-delay:0.4s]" />
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted-foreground">
                        请开始对话
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-muted/30">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-background"
                  />
                  <Button
                    type="submit"
                    variant="default"
                    className="px-4 py-2 h-auto"
                  >
                    Send
                  </Button>
                </form>
              </div>
            </div>

            {/* 工作和项目经历 */}
            <div className="border rounded-md">
              <div className="bg-muted/30 px-4 py-2 border-b">
                <h2 className="text-sm font-medium">Work & Project History</h2>
              </div>
              <div className="divide-y">
                {workHistory.map((item, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {item.type === "work" ? (
                          <Briefcase className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Code2 className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              {item.title}
                            </h3>
                            {item.company && (
                              <p className="text-sm text-muted-foreground">
                                {item.company}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item.period}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mt-2">
                          {item.description}
                        </p>

                        {item.skills && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            className="text-sm text-blue-500 hover:underline mt-2 inline-block"
                          >
                            View project →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
