"use client";

import { useState, type ReactNode } from "react";
import { GlobalHeader } from "@/components/global-header";
import { ChatSidebar } from "@/components/chat-sidebar";

interface GlobalLayoutWrapperProps {
  children: ReactNode;
}

export function GlobalLayoutWrapper({ children }: GlobalLayoutWrapperProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <GlobalHeader onToggleChat={() => setIsChatOpen(!isChatOpen)} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Sidebar - covers full height including header */}
      <ChatSidebar isOpen={isChatOpen} />
    </div>
  );
}

