"use client";

import { motion } from "framer-motion";

export function Footer() {
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
    <footer className="relative py-32 overflow-hidden">
      {/* 背景动画效果 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
        <motion.div
          className="absolute inset-0"
          initial={{ backgroundPosition: "0 0" }}
          animate={{ backgroundPosition: "100% 100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(var(--primary), 0.1) 0%, transparent 50%)",
            backgroundSize: "100% 100%",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            {/* 个性化签名 */}
            <div className="relative inline-block">
              <motion.div
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary"
                whileHover={{ scale: 1.05 }}
              >
                " 横渡大海的神仙鱼 "
              </motion.div>
            </div>

            {/* 标语 */}
            <motion.div 
              className="flex flex-col items-center gap-4 mt-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 text-lg text-muted-foreground"
              >
                <span>创造</span>
                <span className="w-12 h-[1px] bg-primary/20" />
                <span>探索</span>
                <span className="w-12 h-[1px] bg-primary/20" />
                <span>突破</span>
              </motion.div>
              
              <motion.p
                variants={itemVariants}
                className="text-sm text-muted-foreground/80 max-w-md"
              >
                在这里，我将代码与创意编织成梦想，让每一个像素都闪耀着独特的光芒
              </motion.p>
            </motion.div>

            {/* 签名和年份 */}
            <motion.div
              variants={itemVariants}
              className="pt-8 text-sm text-muted-foreground/60 font-mono"
            >
              <span>Made with ❤️ by WANGENIUS © 2024</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 