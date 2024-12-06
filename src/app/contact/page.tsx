"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { IconBrandGithub, IconBrandTwitter, IconMail } from '@tabler/icons-react';

interface Portfolio {
  title: string
  description: string
  link: string
  tags: string[]
  color: string
}

const portfolios: Portfolio[] = [
  {
    title: 'Jezzlab',
    description: 'AI创作平台',
    link: 'https://jezzlab.com',
    tags: ['React', 'Node.js', 'TypeScript'],
    color: '#4F46E5'
  },
  {
    title: 'Crafr',
    description: '开发工具集',
    link: 'https://github.com/wangenius/crafr',
    tags: ['tauri', 'rust'],
    color: '#16A34A'
  },
  {
    title: 'Echo',
    description: 'React 状态管理工具',
    link: 'https://github.com/wangenius/echo',
    tags: ['React', 'Zustand'],
    color: '#DB2777'
  }
]

export default function DefaultPersonalPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* 动态背景 */}
      <motion.div 
        className="fixed inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.3) 0%, transparent 80%)`,
        }}
      />
      
      {/* 英雄区 */}
      <div className="relative z-10">
        <motion.div
          style={{ y: textY }}
          className="h-screen flex items-center justify-center"
        >
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  创造数字体验
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                全栈开发者 / UI设计师 / 开源爱好者
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 作品集 */}
      <div className="relative z-10 bg-black/90 py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            精选作品
          </h2>
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
                  className="block relative rounded-xl overflow-hidden"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
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
                    <p className="text-gray-400 mb-4">{portfolio.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm text-white/80 rounded-full"
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
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
      <div className="relative z-10 bg-black/95 py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">让我们连接</h2>
          <div className="flex justify-center space-x-8">
            <motion.a
              href="mailto:your.email@example.com"
              whileHover={{ scale: 1.1 }}
              className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <IconMail className="w-8 h-8 text-white" />
            </motion.a>
            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <IconBrandGithub className="w-8 h-8 text-white" />
            </motion.a>
            <motion.a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <IconBrandTwitter className="w-8 h-8 text-white" />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}	