"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, FileText, Heart } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RainbowButton } from "./ui/rainbow-button";
import ShinyButton from "@/components/ui/shiny-button";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import { TrashIcon } from "@radix-ui/react-icons";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

type TalksStore = {
  /** 存储对话记录, key 为对话 id, value 为对话内容*/
  talks: Record<string, { message: string; user: boolean; loading?: boolean }>;
  question(msg: string): void;
  answer(msg: string, end?: boolean): void;
  currentId: number;
  clear(): void;
};
type MyPersist = (
  config: StateCreator<TalksStore>,
  options: PersistOptions<TalksStore>,
) => StateCreator<TalksStore>;

const useTalksStore = create<TalksStore>(
  (persist as MyPersist)(
    (set) => ({
      talks: {
        0: { message: "你好，我是 WANGENIUS, 请输入你的问题。", user: false },
      },
      currentId: 0,
      clear() {
        set({
          talks: {
            0: {
              message: "你好，我是 WANGENIUS, 请输入你的问题。",
              user: false,
            },
          },
          currentId: 0,
        });
      },
      question(msg) {
        set((state) => {
          /** 创建前增加指针*/
          const current = state.currentId + 1;
          state.talks[current] = {
            message: msg,
            user: true,
          };
          return { ...state, currentId: current };
        });
      },
      answer(msg, end) {
        set((state) => {
          if (state.talks[state.currentId].user) {
            const current = state.currentId + 1;
            state.talks[current] = {
              message: msg,
              user: false,
              loading: !end,
            };
            return { ...state, currentId: current };
          } else {
            state.talks[state.currentId] = {
              message: msg,
              user: false,
              loading: !end,
            };
            return { ...state };
          }
        });
      },
    }),
    {
      name: "talks",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default function Component() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { question, answer, talks, clear, currentId } = useTalksStore();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [talks, currentId]);

  const handleSubmit = async () => {
    if (!inputText.trim() || talks[currentId]?.loading) return;
    question(inputText);
    setInputText("");
    answer("|");
    try {
      const res = await fetch("/api/dify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: inputText,
      });
      console.log(res);

      if (!res.body) {
        return answer("请求失败，请重试", true);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let result = "";
      let partial = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        partial += decoder.decode(value, { stream: true });

        let lines = partial.split("\n");
        partial = lines.pop() || "";

        for (let line of lines) {
          if (line.trim().startsWith("data:")) {
            let jsonData = line.slice(5).trim();
            try {
              const parsedData = JSON.parse(jsonData);
              if (parsedData.answer) {
                result += parsedData.answer;
                answer(result);
              }
            } catch (err) {
              console.error("JSON parse error:", err);
            }
          }
        }
        answer(result, true);
      }

      console.log("Final result:", result);
    } catch (error) {
      answer("请求失败，请重试", true);
    }
  };

  return (
    <section className="bg-gradient-to-b from-background to-secondary py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Image
              width={150}
              height={150}
              src="/me.png"
              alt="WANGENIUS"
              className="mb-6 rounded-full border-4 border-primary"
            />
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
              WANGENIUS
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              从勒·柯布西耶到迪杰斯特拉的特解
            </p>
            <div className="flex gap-5 mb-8 items-center">
              <RainbowButton
                onClick={() => {
                  window.location.replace("/knowledge");
                }}
                className="font-semibold"
              >
                开始探索 <ArrowRight className="ml-2 h-4 w-4" />
              </RainbowButton>
              <ShinyButton
                onClick={() => {
                  window.open(
                    "https://giant-origami-e45.notion.site/WANGENIUS-11f7a4f8703f80ae8da1ca4721971097?pvs=4",
                  );
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                我的简历
              </ShinyButton>
            </div>

            <Card className="w-full flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">欢迎来访</CardTitle>
                <p className="text-muted-foreground">
                  这里是我的个人网站，基于工作、生活日志、作品和笔记搭建的个人知识库。欢迎您的访问，希望对您有所帮助。{" "}
                </p>
              </CardHeader>
              <CardContent className={"flex-1 flex flex-col justify-between"}>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className={cn(
                        `flex animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent hover:text-transparent`,
                      )}
                      variant="outline"
                    >
                      <Heart className="mr-2 h-4 w-4 text-red-500" /> 赞赏作者
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>赞赏作者</DialogTitle>
                      <DialogDescription>
                        您的支持是我继续创作的动力。请选择赞赏金额或输入自定义金额。
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-3 gap-4 py-4">
                      {[10, 20, 50].map((amount) => (
                        <Button key={amount} variant="outline">
                          {amount} 元
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="其他金额"
                      className="mb-4"
                    />
                    <Button className="w-full">确认赞赏</Button>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          <Card className="flex flex-col h-[720px] max-h-[75vh]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">与我对话</CardTitle>
              <Button onClick={clear} variant="outline" size="icon">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-0">
              <ScrollArea className="h-full p-4 overflow-y-auto">
                <div className="space-y-4">
                  {Object.values(talks)?.map((talk, index) => (
                    <div
                      key={index}
                      className={`flex ${talk.user ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-end space-x-2 max-w-[80%] ${
                          talk.user
                            ? "flex-row-reverse space-x-reverse"
                            : "flex-row"
                        }`}
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={talk.user ? "/user.png" : "/me.png"}
                          />
                          <AvatarFallback>
                            {talk.user ? "你" : "我"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            talk.user
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{talk.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div ref={scrollAreaRef}></div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4">
              <PlaceholdersAndVanishInput
                placeholders={[
                  "你有什么技能？",
                  "你的偶像是谁？",
                  "你有哪些经历？",
                ]}
                onChange={(e) => setInputText(e.target.value)}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
