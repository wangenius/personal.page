// 活动历史的接口
export interface ActivityItem {
  type: "work" | "project" | "study";
  title: string;
  company?: string;
  description: string;
  period: string;
  skills?: string[];
  link?: string;
}

// 项目接口
export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

// 标签详情数据接口
export interface TagDetail {
  name: string;
  icon: string;
  desc: string;
  longDesc: string;
  items: string[];
}

// 聊天消息接口
export interface Message {
  content: string;
  type: "user" | "bot";
  timestamp: number;
  isStreaming?: boolean;
  followUpQuestions?: {
    id: string;
    content: string;
  }[];
} 