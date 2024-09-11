import { auth } from '@clerk/nextjs/server';
import { stat } from 'fs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { scheduler } from 'timers/promises';
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const replicate = new Replicate();

export async function POST(req:Request){
    try{
        const {userId} = auth();
        const body = await req.json();
        const {prompt, amount = 1, resolution = "512x512"} = body;

        if (!userId) {
            return new NextResponse("unauthorized",{status:401});
        }

        if(!prompt) {
            return new NextResponse("prompt is required",{status:400})
        }

        if(!amount) {
            return new NextResponse("amount is required",{status:400})
        }

        if(!resolution) {
            return new NextResponse("resolution is required",{status:400})
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro){
            return new NextResponse("free trial has expired.", {status:403})
        }


        const response = await replicate.run("stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", { 
            input : {
                prompt
            }
         });

         if(!isPro) {
            await increaseApiLimit();
        }

        return NextResponse.json(response);

    } catch(error){
        console.log("[IMAGE_ERROR]",error);
        return new NextResponse("Internal Error",{status:500});
    }
}

