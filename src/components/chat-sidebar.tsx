"use client";

import { motion } from "framer-motion";
import { SimpleChatPanel } from "@/components/simple-chat-panel";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  isOpen: boolean;
}

export function ChatSidebar({ isOpen }: ChatSidebarProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        width: isOpen ? "400px" : "0px",
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn(
        "h-full overflow-hidden border-l border-fd-border",
        !isOpen && "pointer-events-none"
      )}
    >
      {isOpen && <SimpleChatPanel />}
    </motion.div>
  );
}

