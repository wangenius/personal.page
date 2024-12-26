"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Link as LinkIcon } from "lucide-react";
import { projects } from "@/data";

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
                          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 inline-flex items-center gap-2">
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
  );
} 