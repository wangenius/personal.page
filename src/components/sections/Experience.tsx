"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { workHistory } from "./data";

export function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative py-32 bg-muted/20">
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
                        background:
                          "radial-gradient(circle at center, rgba(var(--primary), 0.2), rgba(var(--blue-500), 0.1))",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="relative p-4 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/10 group/icon"
                    >
                      {item.type === "work" ? (
                        <motion.div
                          initial={false}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-primary"
                          >
                            <path
                              d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={false}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-primary"
                          >
                            <path
                              d="M16 18L22 12L16 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 6L2 12L8 18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      )}
                      <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl opacity-0 group-hover/icon:opacity-100 blur-xl transition-opacity duration-500" />
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
                          {item.skills.map((skill: string, i: number) => (
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
                                    delay: i * 0.1,
                                  },
                                },
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
  );
}
