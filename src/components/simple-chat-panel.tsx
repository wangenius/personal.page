"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { DefaultChatTransport } from "ai";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { TbTrash } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  ChatInput,
  type ChatInputProps,
  type ChatInputRef,
} from "@/components/baybar/ChatInput";
import { MessageRenderer } from "@/components/baybar/MessageRenderer";
import { useChatStore } from "@/lib/chatStore";
import { toggleBayBar } from "@/lib/viewManager";
import { X } from "lucide-react";

type TextPart = Extract<UIMessage["parts"][number], { type: "text" }>;

const isTextPart = (part: UIMessage["parts"][number]): part is TextPart =>
  part.type === "text";

const getMessageContent = (message: UIMessage) =>
  message.parts
    .filter(isTextPart)
    .map((part) => part.text)
    .join("")
    .trim();

export function SimpleChatPanel() {
  const chatInputRef = useRef<ChatInputRef>(null);

  // 从 zustand store 获取持久化的消息
  const {
    messages: storedMessages,
    setMessages: setStoredMessages,
    clearMessages: clearStoredMessages,
  } = useChatStore();

  const chatTransport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const {
    messages,
    sendMessage,
    status,
    error,
    clearError,
    stop,
    setMessages,
  } = useChat({
    transport: chatTransport,
    messages: storedMessages,
  });

  // 同步 useChat 的 messages 到 zustand store
  useEffect(() => {
    if (messages.length > 0) {
      setStoredMessages(messages);
    }
  }, [messages, setStoredMessages]);

  const isStreaming = status === "submitted" || status === "streaming";

  const resolveInputStatus = useCallback((): ChatInputProps["status"] => {
    if (error || status === "error") return "error";
    if (status === "streaming" || status === "submitted")
      return status as ChatInputProps["status"];
    return "ready";
  }, [status, error]);

  const inputStatus = resolveInputStatus();

  const handleInputSubmit = useCallback(
    async (message: { text?: string }) => {
      const text = message.text?.trim();
      if (!text) return;

      if (error) clearError();

      await sendMessage({ text });
    },
    [sendMessage, error, clearError]
  );

  const handleClearChat = useCallback(() => {
    clearStoredMessages();
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "你好，我是神仙鱼 AI 助手。有什么可以帮你的吗？",
          },
        ],
      },
    ]);
    if (error) clearError();
  }, [clearStoredMessages, setMessages, error, clearError]);

  const visibleMessages = messages.filter((msg) => msg.role !== "system");

  const handleOptionSelect = useCallback((formattedText: string) => {
    if (!formattedText) return;
    chatInputRef.current?.setQuote(formattedText);
    chatInputRef.current?.focus();
  }, []);

  return (
    <div className="h-full w-full md:w-[400px] flex flex-col overflow-hidden bg-accent">
      {/* 顶部固定栏 */}
      <div className="flex h-12 md:h-10 flex-none items-center justify-between md:justify-end px-4 md:px-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleBayBar(false)}
          className="h-8 w-8 md:hidden"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close chat</span>
        </Button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-6 md:w-6"
            onClick={handleClearChat}
            title="清空对话"
          >
            <TbTrash className="h-4 w-4 md:h-3.5 md:w-3.5" />
          </Button>
        </div>
      </div>

      {/* 对话内容 */}
      <Conversation className="flex-1 bg-transparent">
        <ConversationContent className="mx-auto flex w-full flex-col gap-1">
          {visibleMessages.map((message, index) => {
            const isLastMessage = index === visibleMessages.length - 1;
            const isStreamingMessage =
              isStreaming && isLastMessage && message.role === "assistant";

            return (
              <MessageRenderer
                key={message.id}
                message={message}
                index={index}
                messages={visibleMessages}
                isLastMessage={isLastMessage}
                isStreaming={isStreamingMessage}
                getTextFromMessage={getMessageContent}
                onOptionSelect={handleOptionSelect}
              />
            );
          })}
          {error ? (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">
              <div>生成出错：{error.message || "未知错误"}</div>
            </div>
          ) : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* 输入框 */}
      <div className="p-4 md:p-2">
        <ChatInput
          ref={chatInputRef}
          status={inputStatus}
          placeholder="输入消息..."
          onSubmit={handleInputSubmit}
          onStop={stop}
          enableQuote
          showFileUpload={false}
        />
      </div>
    </div>
  );
}
