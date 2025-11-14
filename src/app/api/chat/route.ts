import {
  streamText,
  convertToModelMessages,
  type UIMessage,
  stepCountIs,
} from "ai";
import { MAIN_MODEL } from "@/lib/Model";
import {
  get_blog_content,
  get_blog_list,
  get_doc_content,
  get_docs_tree,
  get_product_content,
  get_products_list,
} from "./tool";
import systemPrompt from "./system";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  const { messages = [] }: { messages?: UIMessage[] } = await request.json();

  const result = streamText({
    model: MAIN_MODEL,
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    tools: {
      get_doc_content,
      get_docs_tree,
      get_blog_list,
      get_blog_content,
      get_products_list,
      get_product_content,
    },
    stopWhen: stepCountIs(20),
  });

  return result.toUIMessageStreamResponse();
}
