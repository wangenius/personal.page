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
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute w-[50vw] sm:w-[32vw] aspect-square opacity-[0.15]"
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: ['-10%', '20%', '-10%'],
            rotate: [-10, 10, -10],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: '10%',
            left: '5%',
            background: 'linear-gradient(135deg, var(--primary) 0%, rgba(147, 51, 234, 1) 50%, rgba(236, 72, 153, 1) 100%)',
            filter: 'blur(80px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <motion.div
          className="absolute w-[45vw] sm:w-[28vw] aspect-square opacity-[0.12]"
          animate={{
            x: ['15%', '-25%', '15%'],
            y: ['5%', '-15%', '5%'],
            rotate: [5, -15, 5],
            scale: [1, 0.7, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: '15%',
            right: '10%',
            background: 'linear-gradient(225deg, rgba(236, 72, 153, 1) 0%, rgba(167, 139, 250, 1) 50%, rgba(99, 102, 241, 1) 100%)',
            filter: 'blur(70px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <motion.div
          className="absolute w-[48vw] sm:w-[30vw] aspect-square opacity-[0.15]"
          animate={{
            x: ['-15%', '25%', '-15%'],
            y: ['10%', '-20%', '10%'],
            rotate: [-5, 15, -5],
            scale: [0.9, 1.3, 0.9],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            bottom: '15%',
            left: '10%',
            background: 'linear-gradient(45deg, rgba(45, 212, 191, 1) 0%, rgba(56, 189, 248, 1) 50%, rgba(124, 58, 237, 1) 100%)',
            filter: 'blur(75px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <motion.div
          className="absolute w-[42vw] sm:w-[26vw] aspect-square opacity-[0.12]"
          animate={{
            x: ['20%', '-20%', '20%'],
            y: ['-15%', '15%', '-15%'],
            rotate: [10, -10, 10],
            scale: [1.1, 0.8, 1.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            bottom: '20%',
            right: '5%',
            background: 'linear-gradient(315deg, rgba(139, 92, 246, 1) 0%, rgba(192, 132, 252, 1) 50%, rgba(244, 114, 182, 1) 100%)',
            filter: 'blur(65px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-8 sm:-mt-12 z-10">
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
          <div className="relative mt-10 flex flex-col items-center gap-4">
            <motion.div
              className="relative cursor-pointer w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
              whileHover="hover"
              onClick={() => handleChatToggle(!showChat)}
            >
              <motion.div
                className="absolute -inset-6 sm:-inset-8 rounded-full opacity-70"
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

            <div className="h-[72px]">
              <AnimatePresence mode="popLayout">
                {!showChat && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-[200px] mx-auto"
                  >
                    <motion.div 
                      className="relative cursor-pointer"
                      whileHover="hover"
                      initial="initial"
                      animate="animate"
                    >
                      <div className="relative">
                        <div className="relative bg-background/95 backdrop-blur-sm rounded-2xl border border-primary/20 p-3"             
                        >
                          <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-4 h-4">
                            <div className="absolute w-full h-full rotate-45 bg-background/95 backdrop-blur-sm border-l border-t border-primary/20" />
                          </div>

                          <div   onClick={() => handleChatToggle(!showChat)} className="flex items-center justify-center gap-3">
                            <motion.div
                              className="w-7 h-7 rounded-full bg-primary/5 flex items-center justify-center"
                              animate={{
                                rotate: [0, -5, 5, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <span className="text-base">👋</span>
                            </motion.div>

                            <p className="text-sm font-medium text-primary/90">
                              点击头像开始对话
                            </p>
                          </div>
                        </div>

                        <motion.div
                          className="absolute -inset-2 rounded-3xl opacity-0"
                          style={{
                            background: `
                              radial-gradient(circle at center, 
                                rgba(var(--primary), 0.15) 0%,
                                transparent 70%
                              )
                            `,
                            filter: 'blur(8px)',
                          }}
                          variants={{
                            hover: {
                              opacity: 1,
                              scale: 1.05,
                              transition: { duration: 0.3 }
                            }
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            <motion.div 
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative space-y-3 sm:space-y-4">
                <motion.h1 
                  className="font-bold tracking-tight"
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
                    className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 font-bold text-3xl sm:text-4xl md:text-5xl duration-500"
                  >
                    WANGENIUS
                  </motion.span>
                </motion.h1>
                
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <motion.div 
                    className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <motion.p 
                    className="text-base sm:text-lg md:text-xl text-muted-foreground/80 font-medium tracking-wide px-2 sm:px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Full Stack Developer & UI/UX Designer
                  </motion.p>
                  <motion.div 
                    className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex justify-center gap-6 sm:gap-8 md:gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { href: "https://github.com/wangenius", icon: <Github className="w-4 h-4 sm:w-5 sm:h-5" /> },
                { href: "https://twitter.com/wangenius314", icon: <Twitter className="w-4 h-4 sm:w-5 sm:h-5" /> },
                { href: "mailto:wangenius@qq.com", icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> }
              ].map((social, index) => (
                <motion.div
                  key={social.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SocialButton
                    href={social.href}
                    icon={social.icon}
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
                  className="relative px-6 sm:px-8 py-5 sm:py-6 group hover:bg-primary/5 transition-colors"
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

                  <div className="relative flex items-center gap-2 sm:gap-3">
                    <motion.span 
                      className="text-sm sm:text-base font-medium text-foreground/80"
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
                      className="relative h-3 sm:h-4 overflow-hidden"
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
                    >
                      <motion.div
                        className="absolute top-1/2 left-0 h-[2px] bg-foreground/80"
                        variants={{
                          initial: { width: 8 },
                          animate: { width: 8 },
                          hover: { 
                            width: 20,
                            transition: {
                              duration: 0.3,
                              ease: [0.32, 0.72, 0, 1]
                            }
                          }
                        }}
                      />
                      <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 border-t-2 border-r-2 border-foreground/80 rotate-45"
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
            isDesktop 
              ? "absolute -top-12 right-8 w-[45%] h-[700px]" 
              : "fixed inset-0 bg-background z-[100]",
            "origin-right",
            !isDesktop && "translate-x-full",
            !showChat && "pointer-events-none"
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
          <div className={cn(
            "relative h-full", 
            showChat && "pointer-events-auto"
          )}>
            {!isDesktop && showChat && (
              <div className="sticky top-0 left-0 right-0 h-14 sm:h-16 bg-background/80 backdrop-blur-md border-b border-primary/10 px-3 sm:px-4 flex items-center z-[101]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                  onClick={() => handleChatToggle(false)}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                      <AvatarImage src="/avatar.jpg" alt="Wang" />
                      <AvatarFallback>WG</AvatarFallback>
                    </Avatar>
                  </motion.div>
                </Button>
              </div>
            )}
            <div className={cn(
              "absolute inset-0 overflow-hidden",
              isDesktop && "rounded-2xl",
              !isDesktop && "top-14 sm:top-16"
            )}>
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