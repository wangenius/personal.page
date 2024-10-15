"use client"

import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowRight, ChevronRight, FileText, Heart, Send } from "lucide-react"
import Image from "next/image"
import AnimatedGradientText from "@/components/ui/animated-gradient-text"
import { cn } from "@/lib/utils"
import { RainbowButton } from "./ui/rainbow-button"
import ShinyButton from "@/components/ui/shiny-button"

interface Message {
    id: number
    content: string
    isUser: boolean
}

export default function Component() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, content: "欢迎来到我的个人页面，有什么想聊的吗？", isUser: false }
    ])
    const [inputText, setInputText] = useState("")
    const [loading, setLoading] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    const handleSubmit = async () => {
        if (!inputText.trim() || loading) return

        setLoading(true)
        const newUserMessage: Message = { id: messages.length, content: inputText, isUser: true }
        setMessages(prev => [...prev, newUserMessage])
        setInputText("")

        try {
            const res = await fetch('/api/dify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: inputText,
            })
            console.log(res)

            if (!res.body) {
                throw new Error("请求失败，请重试")
            }

            const reader = res.body.getReader()
            const decoder = new TextDecoder('utf-8')

            let result = ''
            let partial = ''

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                partial += decoder.decode(value, { stream: true })

                let lines = partial.split('\n')
                partial = lines.pop() || ''

                for (let line of lines) {
                    if (line.trim().startsWith('data:')) {
                        let jsonData = line.slice(5).trim()
                        try {
                            const parsedData = JSON.parse(jsonData)
                            if (parsedData.answer) {
                                result += parsedData.answer
                                setMessages(prev => {
                                    const lastMessage = prev[prev.length - 1]
                                    if (!lastMessage.isUser) {
                                        return [...prev.slice(0, -1), { ...lastMessage, content: result }]
                                    } else {
                                        return [...prev, { id: prev.length, content: result, isUser: false }]
                                    }
                                })
                            }
                        } catch (err) {
                            console.error('JSON parse error:', err)
                        }
                    }
                }
            }

            setLoading(false)
            console.log('Final result:', result)
        } catch (error) {
            console.error('Error fetching data:', error)
            setMessages(prev => [...prev, { id: prev.length, content: "请求失败，请重试", isUser: false }])
            setLoading(false)
        }
    }

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
                        <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">WANGENIUS</h1>
                        <p className="mb-8 text-lg text-muted-foreground">
                            功败也极乐，我即是佛莲
                        </p>
                        <div className="flex gap-5 mb-8 items-center">
                            <RainbowButton className="font-semibold"> 了解更多 <ArrowRight className="ml-2 h-4 w-4"/></RainbowButton>
                            <ShinyButton onClick={() => {
                                window.open("https://giant-origami-e45.notion.site/WANGENIUS-11f7a4f8703f80ae8da1ca4721971097?pvs=4")
                            }}> <FileText className="mr-2 h-4 w-4"/>我的简历</ShinyButton>
                        </div>

                        <Card className="w-full mb-8">
                            <CardHeader>
                                <CardTitle className="text-2xl">我的宣言</CardTitle>
                                <p className="text-muted-foreground">
                                    I can do all things.
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    日志的主人公形象是光线在躯壳和意识之间的反射，当一个环节发生变故，就会像日出后的雪人一样令人唏嘘的不见。那就把左矩阵刻录下来，叠成教训的谱，将歌声传向每一个开放的终端。
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="flex flex-col h-[600px]">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl">与我对话</CardTitle>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className={cn(
                                        `flex animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent hover:text-transparent`,
                                    )} variant="outline">
                                        <Heart className="mr-2 h-4 w-4 text-red-500"/> 赞赏作者
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
                                    <Input type="number" placeholder="其他金额" className="mb-4"/>
                                    <Button className="w-full">确认赞赏</Button>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent className="flex-grow overflow-hidden p-0">
                            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`flex items-end space-x-2 max-w-[80%] ${
                                                    message.isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                                                }`}
                                            >
                                                <Avatar className="w-8 h-8">
                                                    <AvatarImage src={message.isUser ? "/user.png" : "/me.png"} />
                                                    <AvatarFallback>{message.isUser ? "你" : "我"}</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className={`rounded-lg p-3 ${
                                                        message.isUser
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-muted'
                                                    }`}
                                                >
                                                    <p className="text-sm">{message.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {loading && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted rounded-lg p-3">
                                                <p className="text-sm">正在输入...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <CardFooter className="p-4">
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex w-full space-x-2">
                                <Input
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="输入您的消息..."
                                    className="flex-grow"
                                />
                                <Button type="submit" size="icon" disabled={loading}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}