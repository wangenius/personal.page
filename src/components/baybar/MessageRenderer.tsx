"use client";

import { useMemo, useState } from "react";
import { SelectField } from "@/components/docs/selection-quote";
import { type ReasoningUIPart, type ToolUIPart, type UIMessage } from "ai";
import { FileText, CornerDownRight, Copy, Check } from "lucide-react";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { dialog } from "@/components/custom/DialogModal";
import { Button } from "../ui/button";
import { toast } from "sonner";

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
  const quoteRegex =
    /\[QUOTE_START(?:=([^\]]+))?\]\n([\s\S]*?)\n\[QUOTE_END\]\n\n([\s\S]*)/;
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

type ThinkingPart = ReasoningUIPart | ToolUIPart;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      toast.success("复制成功");
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleCopy}
      variant="ghost"
      size="icon"
      className="size-5 invisible group-hover:visible"
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
    </Button>
  );
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
          className="whitespace-pre-wrap wrap-break-words text-sm leading-relaxed w-fit max-w-2xl px-2 py-1 rounded-lg bg-muted-foreground/10!"
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
  const parts = useMemo(() => message.parts ?? [], [message.parts]);
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

  // 过滤出 reasoning 和 tool parts（用于整体状态判断）
  const thinkingParts = parts.filter(
    (part): part is ReasoningUIPart | ToolUIPart =>
      part.type === "reasoning" || part.type.startsWith("tool-")
  );

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

  const segments = useMemo(() => {
    if (message.role !== "assistant")
      return [] as (
        | { kind: "thinking"; parts: ThinkingPart[] }
        | { kind: "text"; text: string }
      )[];

    const result: (
      | { kind: "thinking"; parts: ThinkingPart[] }
      | { kind: "text"; text: string }
    )[] = [];

    let currentThinking: ThinkingPart[] = [];
    let currentTextParts: string[] = [];

    const flushThinking = () => {
      if (currentThinking.length === 0) return;
      result.push({ kind: "thinking", parts: currentThinking });
      currentThinking = [];
    };

    const flushText = () => {
      if (currentTextParts.length === 0) return;
      const text = currentTextParts.join("").trim();
      if (text) {
        result.push({ kind: "text", text });
      }
      currentTextParts = [];
    };

    for (const part of parts) {
      if (part.type === "reasoning" || part.type.startsWith("tool-")) {
        flushText();
        currentThinking.push(part as ThinkingPart);
      } else if (part.type === "text") {
        flushThinking();
        if (part.text) {
          currentTextParts.push(part.text);
        }
      }
    }

    flushThinking();
    flushText();

    return result;
  }, [message.role, parts]);

  return (
    <Message className={"w-full"} key={message.id} from={message.role}>
      <SelectField
        onSelect={(text) => ({
          text,
        })}
      >
        {message.role === "assistant" ? (
          <MessageContent variant="flat" className="w-full">
            {segments.map(
              (
                segment:
                  | { kind: "thinking"; parts: ThinkingPart[] }
                  | { kind: "text"; text: string },
                segmentIndex: number
              ) => {
                if (segment.kind === "thinking") {
                  const segmentThinkingParts = segment.parts;
                  const reasoningTexts = segmentThinkingParts
                    .filter((part: ThinkingPart) => part.type === "reasoning")
                    .map((part: ThinkingPart) =>
                      (part as ReasoningUIPart).text?.trim()
                    )
                    .filter((text): text is string => Boolean(text));

                  const toolParts = segmentThinkingParts.filter((part) =>
                    part.type.startsWith("tool-")
                  ) as ToolUIPart[];

                  if (reasoningTexts.length === 0 && toolParts.length === 0)
                    return null;

                  return (
                    <div
                      key={`${message.id}-thinking-${segmentIndex}`}
                      className="space-y-0.5 text-xs text-muted-foreground"
                    >
                      {reasoningTexts.length > 0 && (
                        <div className="rounded-md bg-muted/40 px-3 py-2">
                          <div className="text-[11px] font-medium text-muted-foreground/80">
                            {getChainTitle()}
                          </div>
                          <div className="space-y-1">
                            {reasoningTexts.map((text, idx) => (
                              <p
                                key={`${message.id}-reasoning-${segmentIndex}-${idx}`}
                                className="whitespace-pre-wrap leading-relaxed"
                              >
                                {text}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {toolParts.map((toolPart, idx) => {
                        const methodName = toolPart.type
                          .split("-")
                          .slice(1)
                          .join("_");

                        let statusText = "调用中";
                        if (toolPart.state === "output-available") {
                          statusText = "完成";
                        } else if (toolPart.state === "output-error") {
                          statusText = "出错";
                        }

                        return (
                          <div
                            key={`${message.id}-tool-${segmentIndex}-${idx}`}
                            className="flex items-center gap-2 pl-1"
                          >
                            <code className="font-mono text-[11px] text-foreground/70 bg-muted rounded px-1.5 py-0.5">
                              {methodName}
                            </code>
                            <span className="text-[11px] text-muted-foreground/80">
                              {statusText}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                // 文本片段
                return (
                  <div
                    key={`${message.id}-text-${segmentIndex}`}
                    className="text-sm leading-relaxed group"
                  >
                    <Response>{segment.text}</Response>
                    <CopyButton text={segment.text} />
                  </div>
                );
              }
            )}
          </MessageContent>
        ) : (
          /* 用户消息 */
          <UserMessageContent
            parsedQuote={parsedQuote}
            parsedFiles={parsedFiles}
          />
        )}
      </SelectField>
    </Message>
  );
}
