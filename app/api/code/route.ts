import { auth } from '@clerk/nextjs/server';
import { stat } from 'fs';
import { NextResponse } from 'next/server';
import {
  GoogleGenerativeAI,HarmCategory,HarmBlockThreshold,
} from "@google/generative-ai";
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const apiKey = "AIzaSyCStG12XPvsvDCCquk6C6040d8UBvDJMVY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

export async function POST(req:Request){
    try{
        const {userId} = auth();
        const body = await req.json();
        const { prompt } = body;

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
      
        const result = await model.generateContent(prompt);
        console.log(prompt);
        console.log(result.response.text());

            if(!isPro) {
                await increaseApiLimit();
            }

        return NextResponse.json(result,{status:200});

    } catch(error){
        console.log("[CODE_ERROR]",error);
        return new NextResponse("Internal Error",{status:500});
    }
}