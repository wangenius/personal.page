import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Message {
  content: string;
  type: "bot" | "user";
  timestamp: number;
  isStreaming?: boolean;
}

const initialMessages: Message[] = [];

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateLastBotMessage: (content: string, isStreaming?: boolean) => void;
  clearHistory: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: initialMessages,

      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      updateLastBotMessage: (content: string, isStreaming?: boolean) =>
        set((state) => {
          const newMessages = [...state.messages];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage?.type === "bot") {
            lastMessage.content = content;
            if (isStreaming !== undefined) {
              if (!isStreaming) {
                setTimeout(() => {
                  set((state) => {
                    const messages = [...state.messages];
                    const lastMsg = messages[messages.length - 1];
                    if (lastMsg?.type === "bot") {
                      lastMsg.isStreaming = false;
                    }
                    return { messages };
                  });
                }, 100);
                return { messages: newMessages };
              }
              lastMessage.isStreaming = isStreaming;
            }
          }
          return { messages: newMessages };
        }),

      clearHistory: () =>
        set(() => ({
          messages: initialMessages,
        })),
    }),
    {
      name: "chat-storage",
    }
  )
);
