import { auth } from '@clerk/nextjs/server';
import { stat } from 'fs';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import Replicate from 'replicate';
import Anthropic from "@anthropic-ai/sdk";
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';



const anthropic = new Anthropic();

export async function POST(req:Request){
    try{
        const {userId} = auth();
        const body = await req.json();
        const {prompt} = body;

        if (!userId) {
            return new NextResponse("unauthorized",{status:401});
        }

        if(!prompt) {
            return new NextResponse("messages are required",{status:400})
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro){
            return new NextResponse("free trial has expired.", {status:403})
        }

        const input = {
            prompt
        };
        
        const msg = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1000,
            temperature: 0,
            system: "You are an helpful assistant.",
            messages: [
                {
                "role": "user",
                "content": [
                    {
                    "type": "text",
                    "text": prompt
                    }
                ]
                }
            ]
            });

            if(!isPro) {
                await increaseApiLimit();
            }

        return NextResponse.json(msg.content);

    } catch(error){
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("Internal Error",{status:500});
    }
}

