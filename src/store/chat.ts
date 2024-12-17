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

      updateLastBotMessage: (content: string, isStreaming: boolean = true) =>
        set((state) => {
          const messages = [...state.messages];
          const lastMessage = messages[messages.length - 1];
          if (lastMessage && lastMessage.type === 'bot') {
            messages[messages.length - 1] = {
              ...lastMessage,
              content,
              isStreaming,
            };
          }
          return { messages };
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
