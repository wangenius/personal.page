"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Hash } from "lucide-react";
import Image from "next/image";

export function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 100,
      },
    },
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
          {/* 标题部分 */}
          <div className="relative">
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-7xl font-bold"
            >
              Contact
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

          {/* 联系方式卡片 */}
          <div className="relative">
            {/* 背景装饰 */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Email Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative h-full p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/10 overflow-hidden">
                  <motion.div
                    className="h-full flex flex-col justify-between select-none cursor-pointer"
                    initial={false}
                    animate={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary">
                        Email
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        点击复制邮箱地址
                      </p>
                    </div>
                  </motion.div>

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 select-none cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText("wangenius@qq.com");
                    }}
                  >
                    <div className="text-center mb-12">
                      <p className="text-2xl font-bold text-primary mb-2">
                        wangenius@qq.com
                      </p>
                      <p className="text-sm text-primary/60">Click to copy</p>
                    </div>
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                      <motion.a
                        href="mailto:wangenius@qq.com"
                        className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                        style={{ transformOrigin: "center" }}
                      >
                        Open in mail app
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* WeChat Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative h-full p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/10 overflow-hidden">
                  <motion.div
                    className="h-full flex flex-col justify-between select-none"
                    initial={false}
                    animate={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary">
                        WeChat
                      </h3>
                      <p className="mt-1 text-muted-foreground">扫码添加好友</p>
                    </div>
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Image
                      src="/wechat.jpg"
                      alt="WeChat QR Code"
                      width={200}
                      height={200}
                      className="w-48 h-48 rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>

              {/* QQ Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative h-full p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/10 overflow-hidden">
                  <motion.div
                    className="h-full flex flex-col justify-between select-none cursor-pointer"
                    initial={false}
                    animate={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Hash className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary">QQ</h3>
                      <p className="mt-1 text-muted-foreground">点击复制QQ号</p>
                    </div>
                  </motion.div>

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 select-none cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText("2732822492");
                    }}
                  >
                    <div className="text-center mb-12">
                      <p className="text-2xl font-bold text-primary mb-2">
                        2732822492
                      </p>
                      <p className="text-sm text-primary/60">Click to copy</p>
                    </div>
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                      <motion.a
                        href="https://qm.qq.com/cgi-bin/qm/qr?k=2732822492"
                        target="_blank"
                        className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                        style={{ transformOrigin: "center" }}
                      >
                        Add friend
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
