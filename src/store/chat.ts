import { create } from "zustand";

interface Message {
  content: string;
  type: "user" | "bot";
  timestamp: number;
  isStreaming?: boolean;
  followUpQuestions?: {
    id: string;
    content: string;
  }[];
}

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateLastBotMessage: (content: string, isStreaming?: boolean, followUpQuestions?: Message['followUpQuestions']) => void;
  clearHistory: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  updateLastBotMessage: (content, isStreaming = false, followUpQuestions) =>
    set((state) => {
      const messages = [...state.messages];
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.type === "bot") {
        messages[messages.length - 1] = {
          ...lastMessage,
          content,
          isStreaming,
          followUpQuestions
        };
      }
      return { messages };
    }),
  clearHistory: () => set({ messages: [] }),
}));
