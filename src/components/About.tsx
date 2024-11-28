"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button } from "@/components/ui/button";
import {IconBrandQq, IconBrandWechat, IconMail} from "@tabler/icons-react";
import {useToast} from "@/hooks/use-toast";

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

const words = [
  {
    text: "Contact",
  },
  {
    text: "with",
  },
  {
    text: "me",
  },
  {
    text: ":",
  },
  {
    text: "wangenius@qq.com",
    className: "text-blue-500 dark:text-blue-500",
  },
];
const About = () => {
  const {toast} = useToast()
  return (
    <section id="contact" className="bg-muted pb-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-[18rem]">
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
            如果你对我的项目或理念感兴趣，欢迎联系，我期待与志同道合的你探讨更多可能性。
          </p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Button
              onClick={() => {
                /**复制*/
                navigator.clipboard.writeText("upterophyllum");
                toast({
                  style:{backgroundColor:"green",color:"white"},
                  description: "复制微信号成功：upterophyllum",
                })              }}
              className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
            >
              <IconBrandWechat className={"mr-2"} /> 微信            </Button>
            <Button
              onClick={() => {
                /**复制*/
                navigator.clipboard.writeText("2732822492");
                toast({
                  style:{backgroundColor:"green",color:"white"},
                  description: "复制QQ号成功：2732822492",
                })
              }}
              variant={"secondary"}
              className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm"
            >
              <IconBrandQq className={"mr-2"} /> QQ
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
