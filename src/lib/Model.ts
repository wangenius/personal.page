import { createDeepSeek } from "@ai-sdk/deepseek";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export const openai = createDeepSeek({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_API_URL!,
});

// export const MAIN_MODEL = openai("deepseek-v3.2-exp");
export const gemini = createOpenAICompatible({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_API_URL!,
  name: "302",
});

export const MAIN_MODEL = gemini("gemini-3-pro-preview-free");
