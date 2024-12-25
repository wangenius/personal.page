"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { AnimatePresence, motion } from "framer-motion";

export function ChatBubble() {
  const [showChat, setShowChat] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowChat(!showChat);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 1 
        }}
        style={{ zIndex: 101 }}

      >
        <Button
          className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-transform duration-200 hover:scale-110 relative group"
          onClick={handleButtonClick}
        >
          <motion.div
            className="absolute inset-0 bg-primary rounded-full opacity-50"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {showChat && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/20 backdrop-blur-sm md:hidden" 
            style={{ zIndex: 98 }}
            onClick={() => setShowChat(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChat && (
          <ChatWindow 
            showChat={showChat}
            setShowChat={setShowChat}
          />
        )}
      </AnimatePresence>
    </>
  );
} 