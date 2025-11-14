"use client";

import { useMemo } from "react";
import { type ReasoningUIPart, type ToolUIPart, type UIMessage } from "ai";
import { FileText, CornerDownRight } from "lucide-react";
import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
} from "@/components/ai-elements/chain-of-thought";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { dialog } from "@/components/custom/DialogModal";

/**
 * 解析消息中的文件标记
 * 格式：[FILE]url|filename[/FILE]
 */
export interface ParsedFile {
  url: string;
  name: string;
}

export function parseFiles(text: string): {
  parts: Array<{ type: "text" | "file"; content: string | ParsedFile }>;
} {
  const parts: Array<{
    type: "text" | "file";
    content: string | ParsedFile;
  }> = [];

  // 匹配 [FILE]url|filename[/FILE] 格式
  const fileRegex = /\[FILE\]([^|]+)\|([^\]]+)\[\/FILE\]/g;

  let lastIndex = 0;
  let match;

  while ((match = fileRegex.exec(text)) !== null) {
    // 添加文件标记之前的文本
    if (match.index > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index);
      if (beforeText.trim()) {
        parts.push({ type: "text", content: beforeText });
      }
    }

    const [, url, name] = match;
    parts.push({
      type: "file",
      content: {
        url: url.trim(),
        name: name.trim(),
      },
    });

    lastIndex = match.index + match[0].length;
  }

  // 添加剩余的文本
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    if (remainingText.trim()) {
      parts.push({ type: "text", content: remainingText });
    }
  }

  // 如果没有找到任何文件，返回整个文本
  if (parts.length === 0) {
    parts.push({ type: "text", content: text });
  }

  return { parts };
}

/**
 * 解析消息中的引用标记
 * 支持格式：
 * - [QUOTE_START]\nquote text\n[QUOTE_END]\n\nmessage text
 * - [QUOTE_START=/docs/xxx/xxx]\nquote text\n[QUOTE_END]\n\nmessage text
 */
export interface ParsedQuote {
  hasQuote: boolean;
  quote: string;
  message: string;
  path?: string;
}

export function parseQuote(text: string): ParsedQuote {
  // 可选路径部分：=...，例如 =/docs/xxx/xxx
  const quoteRegex = /\[QUOTE_START(?:=([^\]]+))?\]\n([\s\S]*?)\n\[QUOTE_END\]\n\n([\s\S]*)/;
  const match = text.match(quoteRegex);

  if (match) {
    return {
      hasQuote: true,
      path: match[1] || undefined,
      quote: match[2],
      message: match[3],
    };
  }

  return {
    hasQuote: false,
    quote: "",
    message: text,
  };
}

/**
 * 文件显示组件
 */
function FileDisplay({ file }: { file: ParsedFile }) {
  return (
    <div
      onClick={() => {
        dialog.confirm({
          title: "是否下载文档",
          content: file.name,
          onOk: () => {
            window.open(file.url, "_blank");
          },
        });
      }}
      className="inline-flex select-none items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-background/80 hover:bg-muted/60 transition-colors group w-fit ml-auto"
    >
      <FileText className="h-4 w-4 text-blue-500 shrink-0" />
      <span className="text-xs text-foreground/80 truncate max-w-[200px]">
        {file.name}
      </span>
    </div>
  );
}

/**
 * 用户消息内容组件
 */
function UserMessageContent({
  parsedQuote,
}: {
  parsedQuote: ParsedQuote;
  parsedFiles: {
    parts: Array<{ type: "text" | "file"; content: string | ParsedFile }>;
  };
}) {
  // 首先处理引用，然后处理文件
  const messageWithoutQuote = parsedQuote.message;
  const parsedFilesFromMessage = parseFiles(messageWithoutQuote);

  const hasFiles = parsedFilesFromMessage.parts.some((p) => p.type === "file");
  const textParts = parsedFilesFromMessage.parts.filter(
    (p) => p.type === "text"
  );
  const hasText =
    textParts.length > 0 && textParts.some((p) => (p.content as string).trim());

  return (
    <div className="flex flex-col items-end w-full gap-2">
      {/* 引用内容显示 - 最上面 */}
      {parsedQuote.hasQuote && (
        <div className="text-sm text-foreground/60 pr-6 max-h-24 overflow-y-auto max-w-[80%]">
          <CornerDownRight className="h-4 w-4 inline mr-2 text-foreground/60" />
          {parsedQuote.quote.length > 60
            ? parsedQuote.quote.slice(0, 60) + "..."
            : parsedQuote.quote}
        </div>
      )}

      {/* 文件显示区域 - 在 MessageContent 外面、中间 */}
      {hasFiles && (
        <div className="flex flex-col gap-1.5 w-full">
          {parsedFilesFromMessage.parts
            .filter((p) => p.type === "file")
            .map((part, idx) => {
              const file = part.content as ParsedFile;
              return <FileDisplay key={idx} file={file} />;
            })}
        </div>
      )}

      {/* 文本内容 - 最下面 */}
      {hasText && (
        <MessageContent
          className="whitespace-pre-wrap wrap-break-words text-sm leading-relaxed w-fit max-w-2xl"
          variant="flat"
        >
          {textParts.map((part, idx) => {
            const content = (part.content as string).trim();
            return <span key={idx}>{content}</span>;
          })}
        </MessageContent>
      )}
    </div>
  );
}

interface MessageRendererProps {
  message: UIMessage;
  index: number;
  messages: UIMessage[];
  isLastMessage: boolean;
  isStreaming: boolean;
  getTextFromMessage: (message: UIMessage) => string;
  onOptionSelect: (formattedText: string) => void;
}

export function MessageRenderer({
  message,
  isStreaming,
  getTextFromMessage,
}: MessageRendererProps) {
  const parts = message.parts ?? [];
  const messageText = getTextFromMessage(message);

  // 解析用户消息中的文件
  const parsedFiles = useMemo(() => {
    return message.role === "user" && messageText
      ? parseFiles(messageText)
      : { parts: [] };
  }, [messageText, message.role]);

  // 解析用户消息中的引用
  const parsedQuote = useMemo(() => {
    return message.role === "user" && messageText
      ? parseQuote(messageText)
      : { hasQuote: false, quote: "", message: messageText };
  }, [messageText, message.role]);

  // 过滤出 reasoning 和 tool parts
  const thinkingParts = parts.filter(
    (part): part is ReasoningUIPart | ToolUIPart =>
      part.type === "reasoning" || part.type.startsWith("tool-")
  );

  const hasValidThinking = thinkingParts.some((part) => {
    if (part.type === "reasoning") {
      return (part as ReasoningUIPart).text?.trim();
    }
    return true;
  });

  let stepCounter = 0;

  // 确定思维链标题
  const getChainTitle = () => {
    // 检查是否有工具调用正在执行
    const hasActiveToolCall = thinkingParts.some(
      (part) =>
        part.type.startsWith("tool-") &&
        (part as ToolUIPart).state !== "output-available" &&
        (part as ToolUIPart).state !== "output-error"
    );

    // 检查是否所有步骤都完成
    const allCompleted = thinkingParts.every((part) => {
      if (part.type === "reasoning") {
        return (part as ReasoningUIPart).state === "done";
      }
      if (part.type.startsWith("tool-")) {
        const toolPart = part as ToolUIPart;
        return (
          toolPart.state === "output-available" ||
          toolPart.state === "output-error"
        );
      }
      return true;
    });

    // 根据状态返回标题
    if (allCompleted && !isStreaming) {
      return "思考过程";
    } else if (hasActiveToolCall) {
      return "执行中...";
    } else {
      return "思考中...";
    }
  };

  return (
    <Message className={"w-full"} key={message.id} from={message.role}>
      {message.role === "assistant" ? (
        <MessageContent variant="flat" className="w-full">
          {/* 思考过程 */}
          {hasValidThinking && (
            <ChainOfThought className="max-w-full w-full" defaultOpen={true}>
              <ChainOfThoughtHeader className="max-w-auto w-full">
                {getChainTitle()}
              </ChainOfThoughtHeader>
              <ChainOfThoughtContent className="max-w-full w-full mb-4">
                {thinkingParts.map((part, idx) => {
                  if (part.type === "reasoning") {
                    const reasoningPart = part as ReasoningUIPart;
                    if (!reasoningPart.text?.trim()) return null;
                    stepCounter++;
                    return (
                      <ChainOfThoughtStep
                        key={`${message.id}-reasoning-${idx}`}
                        label={`步骤 ${stepCounter}`}
                        status={
                          reasoningPart.state === "done"
                            ? "complete"
                            : isStreaming
                              ? "active"
                              : "pending"
                        }
                      >
                        <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {reasoningPart.text}
                        </div>
                      </ChainOfThoughtStep>
                    );
                  }

                  if (part.type.startsWith("tool-")) {
                    const toolPart = part as ToolUIPart;
                    stepCounter++;
                    const methodName = toolPart.type
                      .split("-")
                      .slice(1)
                      .join("_");

                    return (
                      <ChainOfThoughtStep
                        key={`${message.id}-tool-${idx}`}
                        label={`步骤 ${stepCounter}`}
                        status={
                          toolPart.state === "output-available"
                            ? "complete"
                            : toolPart.state === "output-error"
                              ? "complete"
                              : isStreaming
                                ? "active"
                                : "pending"
                        }
                      >
                        <div className="flex items-center gap-2.5 px-2 py-1.5">
                          <code className="font-mono text-xs text-foreground/60 bg-muted rounded-md px-2 py-1">
                            {methodName}
                          </code>
                        </div>
                      </ChainOfThoughtStep>
                    );
                  }

                  return null;
                })}
              </ChainOfThoughtContent>
            </ChainOfThought>
          )}

          {/* 助手回复内容 */}
          {messageText && message.role === "assistant" && (
            <div className="text-sm leading-relaxed">
              <Response>{messageText}</Response>
            </div>
          )}
        </MessageContent>
      ) : (
        /* 用户消息 */
        <UserMessageContent
          parsedQuote={parsedQuote}
          parsedFiles={parsedFiles}
        />
      )}
    </Message>
  );
}
