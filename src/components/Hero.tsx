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
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { TrashIcon } from "@radix-ui/react-icons";
import { Textarea } from "./ui/textarea";


type Talk = {
  message: string;
  user: boolean;
  loading?: boolean;
};

type TalksState = {
  talks: Record<number, Talk>;
  currentId: number;
};

const INITIAL_STATE: TalksState = {
  talks: {
    0: { message: "你好，我是 WANGENIUS, 请输入你的问题。", user: false },
  },
  currentId: 0,
};

export default function Component() {
  const [inputText, setInputText] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [talksState, setTalksState] = useState<TalksState>(() => {
    if (typeof window === "undefined") return INITIAL_STATE;
    const saved = localStorage.getItem("talks");
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem("talks", JSON.stringify(talksState));
  }, [talksState]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [talksState]);

  const clear = () => {
    setTalksState(INITIAL_STATE);
  };

  const question = (msg: string) => {
    setTalksState((state) => ({
      talks: {
        ...state.talks,
        [state.currentId + 1]: { message: msg, user: true },
      },
      currentId: state.currentId + 1,
    }));
  };

  const answer = (msg: string, end?: boolean) => {
    setTalksState((state) => {
      const current = state.talks[state.currentId]?.user 
        ? state.currentId + 1 
        : state.currentId;
      return {
        talks: {
          ...state.talks,
          [current]: { message: msg, user: false, loading: !end },
        },
        currentId: current,
      };
    });
  };

  const handleSubmit = async () => {
    if (!inputText.trim() || talksState.talks[talksState.currentId]?.loading) return;
    
    question(inputText);
    setInputText("");
    answer("|");
    
    try {
      const res = await fetch("/api/dify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: inputText,
      });

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
    } catch (error) {
      answer("请求失败，请重试", true);
    }
  };

  return (
    <section className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col space-y-6">
            <div className="text-center md:text-left">
              <Image
                width={120}
                height={120}
                src="/me.png"
                alt="WANGENIUS"
                className="mx-auto md:mx-0 mb-4 rounded-full border-2 border-primary"
              />
              <h1 className="text-3xl font-bold md:text-4xl">WANGENIUS</h1>
              <p className="mt-2 text-muted-foreground">
                从勒·柯布西耶到迪杰斯特拉的特解
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>关于我</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  这里是我的个人网站，基于工作、生活日志、作品和笔记搭建的个人知识库。
                  欢迎您的访问，希望对您有所帮助。
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="flex h-[600px] flex-col">
            <CardHeader className="flex-none flex flex-row items-center justify-between">
              <CardTitle>与我对话</CardTitle>
              <Button onClick={clear} variant="ghost" size="icon">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {Object.values(talksState.talks || {})?.map((talk, index) => (
                    <div
                      key={index}
                      className={`flex ${talk.user ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[80%] ${
                        talk.user ? "flex-row-reverse" : "flex-row"
                      }`}>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={talk.user ? "/user.png" : "/me.png"} />
                          <AvatarFallback>
                            {talk.user ? "你" : "我"}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg p-3 ${
                          talk.user 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{talk.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={scrollAreaRef} />
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter className="flex-none p-4">
              <Textarea
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
