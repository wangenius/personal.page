"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {ArrowRight, ChevronRight, FileText, Heart, Send} from "lucide-react"
import Image from "next/image"
import {useState} from "react"
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import {cn} from "@/lib/utils";
import {RainbowButton} from "./ui/rainbow-button"
import ShinyButton from "@/components/ui/shiny-button";
import {CommandLoading} from "cmdk";


export default function Component() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [res, setRes] = useState<Record<number, string>>({})
    const [reqs, setReqs] = useState<Record<number, string>>({})
    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState(0)
    const [text, setText] = useState("")

    const handleSubmit = async () => {
        try {
            /** 创建一个新的请求，并设置请求体为用户输入的文本*/
            if (loading) return;
            setLoading(true)
            setText("")
            setCurrent(prevState => prevState + 1)
            setReqs((prev)=>{
                return {
                    ...prev,
                    [current]: text
                }
            })
            const res = await fetch('/api/dify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:text,
            });
            if (!res.body) {
                return setRes(prev=>{
                    return {
                        ...prev,
                        [current]: "请求失败，请重试"
                    };
                })
            }
            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8');

            let result = '';
            let partial = ''; // 用于存储未完整解析的数据块

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                partial += decoder.decode(value, { stream: true }); // 使用流模式解码

                let lines = partial.split('\n'); // 每个事件块以 '\n' 分隔
                partial = lines.pop() || ''; // 如果最后一块不完整，留在 partial 中等待下一块数据

                for (let line of lines) {
                    if (line.trim().startsWith('data:')) {
                        let jsonData = line.slice(5).trim(); // 去除 'data: ' 前缀
                        try {
                            const parsedData = JSON.parse(jsonData);
                            if (parsedData.answer) {
                                result += parsedData.answer; // 逐块累积答案
                                setRes((prev) => ({
                                    ...prev,
                                    [current]: result,
                                }));
                            }
                        } catch (err) {
                            console.error('JSON parse error:', err);
                        }
                    }
                }
            }
            setLoading(false)
            console.log('Final result:', result);
        } catch (error) {
            console.error('Error fetching data:', error);
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
                        <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">WANGENIUS</h1>
                        <p className="mb-8 text-lg text-muted-foreground">
                            功败也极乐，我即是佛莲
                        </p>
                        <div className={'flex gap-5 mb-8 items-center'}>
                            <RainbowButton className={'font-semibold'}> 了解更多 <ArrowRight className="ml-2 h-4 w-4"/>
                            </RainbowButton>
                            <ShinyButton onClick={() => {
                                window.open("https://giant-origami-e45.notion.site/WANGENIUS-11f7a4f8703f80ae8da1ca4721971097?pvs=4")
                            }}> <FileText className="mr-2 h-4 w-4"/>
                                我的简历</ShinyButton>
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

                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="text-xl">赞赏支持</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-muted-foreground">如果您喜欢我的内容，您可以进行赞赏，以支持我继续创作。</p>
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full">
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
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="flex flex-col h-full">
                        <CardHeader className={'flex flex-row items-center justify-between'}>
                            <CardTitle className="text-2xl">与我对话</CardTitle>
                            <AnimatedGradientText>
                                🎉 <hr className="mx-2 h-4 shrink-0 bg-gray-300"/>
                                <span
                                    className={cn(
                                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                                    )}
                                >你好</span>
                                <ChevronRight
                                    className="ml-1 size-3 p-0.5 stroke-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"/>
                            </AnimatedGradientText>
                        </CardHeader>
                        <CardContent className="flex-grow overflow-hidden flex flex-col">
                            <div className="flex-grow mb-4 max-h-[800px] overflow-y-scroll space-y-4">
                                <p className="text-muted-foreground">欢迎来到我的个人页面，有什么想聊的吗？</p>
                                {Object.keys(reqs).sort((a, b) => Number(a) - Number(b)).map((item) => (
                                    <div key={item} className="space-y-1">
                                        <div className="bg-gray-100 p-2 rounded-lg">{reqs[Number(item)]}</div>
                                        <div className="flex items-center space-x-2">
                                            <span>{res[Number(item)]}</span>
                                            {loading && current === Number(item) ? "正在加载" : ""}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <div className="flex p-6">
                            <Input onChange={e => setText(e.target.value)} value={text} onKeyDown={(event) => {
                                /*如果按下回车执行提交*/
                                if (event.key === 'Enter') {
                                    handleSubmit();
                                }
                            }} placeholder="输入您的消息..." className="flex-grow mr-2"/>
                            <Button disabled={loading} onClick={handleSubmit} size="icon">
                                <Send className="h-4 w-4"/>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}