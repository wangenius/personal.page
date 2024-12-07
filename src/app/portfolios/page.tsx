"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Portfolios() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-center relative"
      >
        <h1 className="text-7xl font-bold text-gray-200 dark:text-gray-800">
          作品集
        </h1>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-4xl font-medium text-gray-800 dark:text-gray-200">
            敬请期待
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}	