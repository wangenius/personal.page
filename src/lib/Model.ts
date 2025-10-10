import { createOpenAI } from "@ai-sdk/openai";

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_URL,
});

export const BASE_MODEL = openai("gpt-5-nano");
export const MAIN_MODEL = openai("gpt-5-nano");
