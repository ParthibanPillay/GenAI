"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import TypewriterComponent from "typewriter-effect";

const LandingHero = () => {
    const {isSignedIn} = useAuth();
    return (
        <div className="text-white py-36 text-center font-bold space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>All In One Place For</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent 
                        options={{
                            strings: [
                                "Conversation",
                                "Code Generation",
                                "Video Generation",
                                "Music Generation",
                                "Photo Generation",
                            ],
                            autoStart:true,
                            loop:true
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Create content faster using AI.
            </div> 
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                        Start Generating For Free
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default LandingHero;