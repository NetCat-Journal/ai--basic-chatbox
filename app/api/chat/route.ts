import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export async function POST(request: NextRequest) {
    if (!process.env['OPENAI_API_KEY']) {
        return NextResponse.json(
            { success: false, error: 'Missing OpenAI API key' },
            { status: 500 }
        );
    }
    const client = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'],
    });
    try {
        const { message } = await request.json();
        console.log('Received message:', message);
        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: message },
            ],
        });
        return NextResponse.json({ success: true, received: message, reply: completion.choices[0].message.content || 'No reply from model' });
    }
    catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
    }
}