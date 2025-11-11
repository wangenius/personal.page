"use client";

import { type ReactNode } from "react";
import { GlobalHeader } from "@/components/global-header";
import { ChatSidebar } from "@/components/chat-sidebar";
import { useChatInputFocus } from "@/lib/useChatInputFocus";

interface GlobalLayoutWrapperProps {
  children: ReactNode;
}

export function GlobalLayoutWrapper({ children }: GlobalLayoutWrapperProps) {
  useChatInputFocus(true, true); // 启用快捷键 + 自动切换 Baybar
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <GlobalHeader />
        <main className="flex-1 w-full overflow-auto">{children}</main>
      </div>

      {/* Sidebar - covers full height including header */}
      <ChatSidebar />
    </div>
  );
}
