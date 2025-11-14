import { createDeepSeek } from "@ai-sdk/deepseek";

export const openai = createDeepSeek({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_API_URL!,
});

export const MAIN_MODEL = openai("deepseek-v3.2-exp");
