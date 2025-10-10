"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  type PromptInputMessage,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";
import { cn } from "@/lib/utils";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { MessageSquare } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

const EMPTY_STATE = {
  title: "和 神仙鱼 聊聊",
  description: "问问关于项目、产品灵感，或者任何你在研究的东西。",
};

export function AIHomeChat({ className }: { className?: string }) {
  const chatTransport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );
  const { messages, sendMessage, status, error, clearError } = useChat({
    transport: chatTransport,
  });
  const [text, setText] = useState("");
  const isResponding = status === "submitted" || status === "streaming";

  const handleSubmit = useCallback(
    async (payload: PromptInputMessage) => {
      const nextText = payload.text?.trim();
      const hasText = Boolean(nextText);
      const hasFiles = Boolean(payload.files?.length);

      if (!(hasText || hasFiles)) {
        return;
      }

      if (error) {
        clearError();
      }

      await sendMessage({
        text: hasText ? nextText! : "发送了附件",
        files: payload.files,
      });
      setText("");
    },
    [clearError, error, sendMessage]
  );

  return (
    <div
      className={cn(
        "relative flex h-[520px] w-full flex-col overflow-hidden rounded-3xl border border-fd-border/80 bg-fd-card/80 shadow-lg shadow-fd-background/10 backdrop-blur",
        className
      )}
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        <Conversation className="flex-1">
          <ConversationContent className="space-y-2">
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className="size-10" />}
                title={EMPTY_STATE.title}
                description={EMPTY_STATE.description}
              />
            ) : (
              messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, index) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <Response key={`${message.id}-${index}`}>
                              {part.text}
                            </Response>
                          );
                        case "tool-invocation":
                        case "tool-result":
                          return (
                            <div
                              className="text-xs text-fd-muted-foreground"
                              key={`${message.id}-${index}`}
                            >
                              工具调用已省略
                            </div>
                          );
                        case "file":
                          return (
                            <div
                              className="text-xs text-fd-muted-foreground"
                              key={`${message.id}-${index}`}
                            >
                              {part.filename ?? "收到附件"}
                            </div>
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                </Message>
              ))
            )}
            {isResponding && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-full bg-fd-secondary/40 px-4 py-2 text-sm text-fd-muted-foreground">
                  <Loader />
                  神仙鱼思考中…
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="rounded-full bg-destructive/10 px-4 py-2 text-sm text-destructive">
                  出错啦，请重试一次。
                </div>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      <div className="border-t border-fd-border/60 bg-fd-background/40 p-4">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputBody>
            <PromptInputTextarea
              value={text}
              onChange={(event: any) => setText(event.currentTarget.value)}
              placeholder="问我任何与你的灵感、产品或职业相关的问题…"
              className="max-h-40"
            />
          </PromptInputBody>
          <PromptInputToolbar>
            <PromptInputTools />
            <PromptInputSubmit
              variant="default"
              status={status}
              disabled={!text.trim() || isResponding}
            />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}
