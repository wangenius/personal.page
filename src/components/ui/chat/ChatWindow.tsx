"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/chat";
import { CaretRightIcon, TrashIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Trash2Icon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatBubble } from "./ChatBubble";

interface ChatWindowProps {
  setShowChat: (show: boolean) => void;
  showChat: boolean;
}

export function ChatWindow({ setShowChat, showChat }: ChatWindowProps) {
  const { messages, addMessage, updateLastBotMessage, clearHistory } = useChatStore();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (showChat) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [showChat]);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data:')) {
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

  return (
    <div className="flex flex-col h-full">
      <div className="relative px-4 py-3 md:px-5 md:py-3.5">
        <div className="absolute inset-0" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={clearHistory}
              className="h-8 w-8 md:h-9 md:w-9 rounded-full text-foreground/50 hover:text-destructive/90 transition-colors duration-300"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowChat(false)}
              className="h-8 w-8 md:h-9 md:w-9 rounded-full text-foreground/50 hover:text-foreground/90 transition-colors duration-300"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea 
        className="flex-1"
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="p-3 md:p-4">
          {messages.length > 0 ? (
            <motion.div className="space-y-4 md:space-y-6">
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
                    <Avatar className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3 shrink-0">
                      <AvatarImage src="/avatar.jpg" alt="Wang" />
                      <AvatarFallback>WG</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col gap-2 md:gap-3 max-w-[85%] md:max-w-[80%] min-w-0">
                    <motion.div
                      className={`
                        relative px-4 md:px-5 py-2.5 md:py-3 rounded-2xl text-sm w-fit
                        ${
                          message.type === "bot"
                            ? "bg-background/40 backdrop-blur-sm text-foreground/90 rounded-tl-sm border border-primary/5"
                            : "bg-primary/10 backdrop-blur-sm text-foreground/90 rounded-tr-sm border border-primary/5 ml-auto"
                        }
                      `}
                      whileHover={{ scale: 1.01 }}
                    >
                      <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                        {message.isStreaming && (
                          <motion.span 
                            className="inline-flex items-center ml-1.5 md:ml-2 gap-[2px]"
                            animate={{ opacity: [0.4, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                            <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                            <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                          </motion.span>
                        )}
                      </p>
                    </motion.div>
                    
                    {/* 后续问题展示 - 只在最后一条机器人消息中显示 */}
                    {message.type === "bot" && 
                     message.followUpQuestions && 
                     message.followUpQuestions.length > 0 && 
                     index === messages.length - 1 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col gap-2 md:gap-3"
                      >
                        <div className="text-[10px] md:text-xs text-foreground/60 ml-1">建议的问题：</div>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
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
                              className="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs bg-background/30 hover:bg-background/50 text-foreground/70 hover:text-foreground/90 rounded-full transition-colors cursor-pointer backdrop-blur-sm border border-primary/5"
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
              className="text-center text-foreground/60 py-8 md:py-10 text-sm"
            >
              开始对话吧 👋
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="px-4 py-3 md:px-5 md:py-4">
        <form onSubmit={handleSendMessage} className="relative">
          <div className="relative flex items-end gap-2">
            <div className="relative flex-1 group">
              <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: 'linear-gradient(to right, rgba(var(--primary), 0.2), rgba(147, 51, 234, 0.2)) padding-box, linear-gradient(to right, rgba(var(--primary), 0.2), rgba(147, 51, 234, 0.2)) border-box'
              }} />
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onClick={handleFocus}
                onFocus={handleFocus}
                placeholder="输入消息..."
                className="w-full min-h-[44px] md:min-h-[48px] pl-4 pr-3 py-3 text-sm bg-background/20 backdrop-blur-sm border border-primary/[0.08] rounded-xl placeholder:text-foreground/40  transition-colors duration-300 focus:ring-0 focus:ring-violet-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
            </div>
            
            <Button 
              type="submit" 
              size="icon"
              disabled={!inputValue.trim()}
              className={`
                relative group h-11 w-11 md:h-12 md:w-12 rounded-xl shrink-0
                ${inputValue.trim() 
                  ? 'bg-primary/10 hover:bg-primary/20' 
                  : 'bg-background/20'}
                transition-all duration-300
              `}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: 'linear-gradient(45deg, rgba(var(--primary), 0.2), rgba(147, 51, 234, 0.2))'
              }} />
              <motion.div
                initial={false}
                animate={inputValue.trim() ? { 
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className={`${inputValue.trim() ? 'text-foreground/90' : 'text-foreground/40'}`}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  className="w-5 h-5 md:w-6 md:h-6"
                >
                  <path 
                    d="M5 12h14m-7-7l7 7-7 7" 
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 