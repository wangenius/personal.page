// app/api/dify/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.text(); // 解析请求体
        console.log(body)
        console.log('Request Body:', body);
        console.log('Dify API Key:', process.env.DIFY_API_KEY);

        const response = await fetch('https://api.dify.ai/v1/chat-messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.DIFY_API_KEY!}`,
            },
            body: JSON.stringify({
                user: req.ip || 'unknown',
                query: body,
                response_mode: 'streaming', // 使用流模式
                inputs:{}
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Dify API Error:', errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        // 创建一个新的流，将 Dify API 的响应流式转发给客户端
        const readableStream = new ReadableStream({
            start(controller) {
                const reader = response.body?.getReader();

                if (!reader) {
                    controller.close();
                    return;
                }

                // 处理流数据
                function push() {
                    reader?.read().then(({ done, value }) => {
                        if (done) {
                            console.log('Stream completed');
                            controller.close();
                            return;
                        }

                        // 将流中的数据块传递给客户端
                        controller.enqueue(value);
                        push(); // 继续读取
                    }).catch((error) => {
                        console.error('Stream error:', error);
                        controller.error(error);
                    });
                }

                push();
            },
        });

        // 返回流给客户端
        return new Response(readableStream, {
            headers: { 'Content-Type': 'text/event-stream' },
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {

        console.log('Dify API Key:', process.env.DIFY_API_KEY);
        return NextResponse.json({ message: 'Hello from Dify API' });
        // const response = await fetch(`https://api.dify.ai/v1/meta?user=${req.ip || "unknown"}`, {
        //     method: 'GET',
        //     headers: {
        //         Authorization: `Bearer ${process.env.DIFY_API_KEY!}`,
        //     },
        // });
        // console.log('response:', response.body)
        // // 返回流给客户端
        // return response;
    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
