"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Link as LinkIcon } from "lucide-react";
import { TagDetail } from "@/types";
import { tagDetails } from "@/data";
import { useState } from "react";
import { X } from "lucide-react";

export function About() {
  const [selectedTag, setSelectedTag] = useState<TagDetail | null>(null);

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

  return (
    <section className="relative py-32">
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

            {/* About 右侧标签部分 */}
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
    </section>
  );
} 