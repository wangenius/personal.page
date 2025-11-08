import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { MAIN_MODEL } from "@/lib/Model";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(request: Request) {
  const { messages = [] }: { messages?: UIMessage[] } = await request.json();

  const result = streamText({
    model: MAIN_MODEL,
    system:
      "You are 神仙鱼，一位产品工程师。保持语气友好、简洁，并鼓励用户继续提问。",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
