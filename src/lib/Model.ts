import { createXai } from "@ai-sdk/xai";

export const openai = createXai({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_URL,
});

export const BASE_MODEL = openai("grok-4-fast-reasoning");
export const MAIN_MODEL = openai("grok-4-fast-non-reasoning");
