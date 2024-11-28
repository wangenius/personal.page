"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Portfolio {
  title: string
  description: string
  link: string
  tags: string[]
}

const portfolios: Portfolio[] = [
  {
    title: 'Jezzlab',
    description: 'AI创作平台',
    link: 'https://jezzlab.com',
    tags: ['React', 'Node.js', 'TypeScript']
  },
  {
    title: 'Crafr',
    description: '开发工具集',
    link: 'https://github.com/wangenius/crafr',
    tags: ['tauri', 'rust']
  },
  {
    title: 'Echo',
    description: 'React 状态管理工具',
    link: 'https://github.com/wangenius/echo',
    tags: ['React', 'Zustand']
  }
]

export default function Portfolios() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 py-24">
        <h1 className="text-2xl font-normal mb-16 tracking-tight">
          精选作品
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
          {portfolios.map((item, idx) => (
            <a
              href={item.link}
              key={item.link}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-neutral-800/[0.8] block rounded-3xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              
              <div className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20"
              )}>
                <div className="relative z-50">
                  <div className="p-4">
                    <h4 className="text-zinc-100 font-bold tracking-wide mt-4">
                      {item.title}
                    </h4>
                    <p className="mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs text-zinc-400 border border-zinc-700 px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}	