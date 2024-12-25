"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Mail, Twitter } from "lucide-react";
import { motion, MotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChatWindow } from "../ui/chat/ChatWindow";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface HeroProps {
  scrollY: MotionValue<number>;
  scrollToSection: (section: string) => void;
  onChatToggle?: (isOpen: boolean) => void;
}

export function Hero({ scrollY, scrollToSection, onChatToggle }: HeroProps) {
  const [showChat, setShowChat] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleChatToggle = (isOpen: boolean) => {
    setShowChat(isOpen);
    onChatToggle?.(isOpen);
  };

  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const yOffset = useTransform(scrollY, [0, 400], [0, -50]);

  return (
    <motion.section 
      style={{ opacity }}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute w-[45vw] aspect-square"
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['0%', '15%', '0%'],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: '10%',
            left: '15%',
            background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.15), rgba(167, 139, 250, 0.15), transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <motion.div
          className="absolute w-[40vw] aspect-square"
          animate={{
            x: ['10%', '-15%', '10%'],
            y: ['5%', '-10%', '5%'],
            scale: [1.1, 0.9, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: '20%',
            right: '10%',
            background: 'radial-gradient(circle at center, rgba(129, 140, 248, 0.12), rgba(147, 51, 234, 0.12), transparent 70%)',
            filter: 'blur(70px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <motion.div
          className="absolute w-[35vw] aspect-square"
          animate={{
            x: ['-5%', '15%', '-5%'],
            y: ['10%', '-5%', '10%'],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            bottom: '15%',
            left: '10%',
            background: 'radial-gradient(circle at center, rgba(45, 212, 191, 0.1), rgba(56, 189, 248, 0.1), transparent 70%)',
            filter: 'blur(65px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <motion.div
          className="absolute w-[30vw] aspect-square"
          animate={{
            x: ['5%', '-10%', '5%'],
            y: ['-10%', '5%', '-10%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            bottom: '20%',
            right: '15%',
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.12), rgba(192, 132, 252, 0.12), transparent 70%)',
            filter: 'blur(55px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative -mt-20 md:-mt-32 z-10">
        <motion.div 
          className="flex flex-col items-center relative"
          animate={{
            x: showChat ? (isDesktop ? "-25%" : 0) : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.32, 0.72, 0, 1]
          }}
        >
          <div className="relative">
            <AnimatePresence>
              {!showChat && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-24 w-[300px] left-0 z-10"
                >
                  <div className="relative w-full px-6 py-3">
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-md rounded-2xl border border-primary/20" />
                    <div className="absolute -bottom-2 left-16 w-4 h-4 bg-background/80 border-b border-r border-primary/20 transform rotate-45" />
                    <div className="relative w-full flex items-center gap-3">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      >
                        👋
                      </motion.div>
                      <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/70">
                        点击我，来和我聊天吧
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="relative cursor-pointer w-32 h-32 md:w-40 md:h-40"
              whileHover="hover"
              onClick={() => handleChatToggle(!showChat)}
            >
              {/* 外层光晕效果 */}
              <motion.div
                className="absolute -inset-8 rounded-full opacity-70"
                style={{
                  background: `
                    radial-gradient(circle at center, 
                      rgba(var(--primary), 0.2) 0%,
                      rgba(147, 51, 234, 0.15) 25%, 
                      rgba(236, 72, 153, 0.1) 50%,
                      transparent 70%
                    )
                  `,
                  filter: 'blur(15px)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* 旋转光环 */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  background: `
                    conic-gradient(
                      from 0deg at 50% 50%,
                      rgba(var(--primary), 0.3),
                      rgba(147, 51, 234, 0.2) 25%,
                      rgba(236, 72, 153, 0.3) 50%,
                      rgba(var(--primary), 0.2) 75%,
                      rgba(var(--primary), 0.3)
                    )
                  `,
                  filter: 'blur(8px)',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* 头像容器 */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/30 p-[2px]"
                variants={{
                  hover: {
                    scale: 1.05,
                    rotate: 5,
                  }
                }}
                transition={{ duration: 0.4 }}
              >
                <motion.div className="w-full h-full rounded-full overflow-hidden bg-background p-[2px]">
                  <Avatar className="w-full h-full">
                    <AvatarImage 
                      src="/avatar.jpg" 
                      alt="Wang" 
                      className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
                    />
                    <AvatarFallback>WG</AvatarFallback>
                  </Avatar>
                </motion.div>
              </motion.div>


            </motion.div>
          </div>

          <div className="mt-16 space-y-12">
            <motion.div 
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="absolute -inset-x-32 -inset-y-16"
                style={{
                  background: `
                    radial-gradient(circle at 30% 50%, rgba(var(--primary), 0.08), transparent 50%),
                    radial-gradient(circle at 70% 50%, rgba(147, 51, 234, 0.08), transparent 50%)
                  `,
                  filter: 'blur(40px)',
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative space-y-4">
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold tracking-tight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  <motion.span
                    initial={{ 
                      filter: "blur(12px)",
                      y: 20,
                      rotateX: -90
                    }}
                    animate={{ 
                      filter: "blur(0px)",
                      y: 0,
                      rotateX: 0
                    }}
                    transition={{ 
                      duration: 1.2,
                      delay: 0.3,
                      type: "spring",
                      stiffness: 150
                    }}
                    className="bg-clip-text text-primary font-bold text-4xl md:text-5xl duration-500"
                  >
                    WANGENIUS
                  </motion.span>
                </motion.h1>
                
                <div className="flex items-center justify-center gap-3">
                  <motion.div 
                    className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <motion.p 
                    className="text-lg md:text-xl text-muted-foreground/80 font-medium tracking-wide px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Full Stack Developer & UI/UX Designer
                  </motion.p>
                  <motion.div 
                    className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex justify-center gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { href: "https://github.com/wangenius", icon: <Github className="w-5 h-5" /> },
                { href: "https://twitter.com/wangenius314", icon: <Twitter className="w-5 h-5" /> },
                { href: "mailto:wangenius@qq.com", icon: <Mail className="w-5 h-5" /> }
              ].map((social, index) => (
                <motion.div
                  key={social.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SocialButton
                    href={social.href}
                    icon={
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          transition: {
                            duration: 0.4,
                            ease: "easeInOut"
                          }
                        }}
                        className="text-primary/80 hover:text-primary transition-colors"
                      >
                        {social.icon}
                      </motion.div>
                    }
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="relative"
                whileHover="hover"
                initial="initial"
                animate="animate"
              >
                <Button
                  variant="ghost"
                  className="relative px-8 py-6 group hover:bg-primary/5 transition-colors"
                  onClick={() => scrollToSection("about")}
                >
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm" />
                    <motion.div
                      className="absolute inset-0"
                      variants={{
                        initial: {
                          opacity: 0,
                          backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 100%)',
                        },
                        animate: {
                          opacity: 0.1,
                          backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 100%)',
                        },
                        hover: {
                          opacity: [0.1, 0.15, 0.1],
                          backgroundImage: [
                            'linear-gradient(90deg, transparent 0%, transparent 100%)',
                            'linear-gradient(90deg, rgba(var(--primary), 0.2) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)',
                            'linear-gradient(90deg, transparent 0%, transparent 100%)',
                          ],
                          transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }
                      }}
                    />
                  </div>

                  <div className="relative flex items-center gap-3">
                    <motion.span 
                      className="text-base font-medium text-foreground/80"
                      variants={{
                        hover: { 
                          x: -2,
                          transition: {
                            duration: 0.3,
                            ease: [0.32, 0.72, 0, 1]
                          }
                        }
                      }}
                    >
                      了解更多
                    </motion.span>

                    <motion.div
                      className="relative h-4 overflow-hidden"
                      variants={{
                        initial: { width: 16 },
                        animate: { width: 16 },
                        hover: { 
                          width: 28,
                          transition: {
                            duration: 0.3,
                            ease: [0.32, 0.72, 0, 1]
                          }
                        }
                      }}
                    >
                      <motion.div
                        className="absolute top-1/2 left-0 h-[2px] bg-foreground/80"
                        variants={{
                          initial: { width: 12 },
                          animate: { width: 12 },
                          hover: { 
                            width: 24,
                            transition: {
                              duration: 0.3,
                              ease: [0.32, 0.72, 0, 1]
                            }
                          }
                        }}
                      />
                      <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-foreground/80 rotate-45"
                        variants={{
                          hover: {
                            x: [0, 2, 0],
                            transition: {
                              duration: 1.2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }
                        }}
                      />
                    </motion.div>
                  </div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className={cn(
            "absolute -top-12 right-8 w-[90%] md:w-[45%] h-[600px] md:h-[700px]",
            "origin-right"
          )}
          initial={false}
          animate={{
            x: showChat ? "0%" : "100%",
            opacity: showChat ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.32, 0.72, 0, 1]
          }}
        >
          <div className="relative h-full">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <ChatWindow setShowChat={handleChatToggle} showChat={showChat} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function SocialButton({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="hover:bg-primary/10 transition-colors"
      asChild
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-primary"
        >
          {icon}
        </motion.div>
      </a>
    </Button>
  );
}