// app/api/dify/route.ts

import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();

        
        const response = await fetch(`https://api.coze.cn/v3/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.COZE_API_KEY!}`,
            },
            body: JSON.stringify({
                bot_id: process.env.BOT_ID!,
                stream: true,
                additional_messages:[{
                    "role": "user",
                    "content": body,
                    "content_type": "text"
                }],
                user_id: req.ip || 'unknown'
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Coze API错误:', error);
            return new Response(JSON.stringify(error), { 
                status: response.status,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // 直接返回 Coze 的响应
        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        console.error('API错误:', error);
        return new Response('服务器错误', { status: 500 });
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
