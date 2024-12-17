// app/api/dify/route.ts

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        
        const response = await fetch('https://api.dify.ai/v1/chat-messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.DIFY_API_KEY!}`,
            },
            body: JSON.stringify({
                user: req.ip || 'unknown',
                query: body,
                response_mode: 'streaming',
                inputs: {}
            }),
        });

        if (!response.ok) {
            throw new Error(`Dify API 错误: ${response.status}`);
        }

        // 创建转换流来处理 SSE 数据
        const transformStream = new TransformStream({
            transform(chunk, controller) {
                const text = new TextDecoder().decode(chunk);
                try {
                    // 解析返回的数据
                    const lines = text.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data:')) {
                            const data = JSON.parse(line.slice(5));
                            if (data.event === 'message') {
                                controller.enqueue(data.answer);
                            }
                        }
                    }
                } catch (e) {
                    console.error('解析响应数据时出错:', e);
                }
            }
        });

        return new Response(response.body?.pipeThrough(transformStream), {
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-cache',
            },
        });

    } catch (error: any) {
        console.error('错误:', error);
        return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {

        return NextResponse.json({ message: 'process.env.DIFY_API_KEY' });
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

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
