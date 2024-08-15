"use client";

import {Montserrat} from 'next/font/google';
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Weight } from 'lucide-react';

const font = Montserrat({
    weight : "600",
    subsets : ["latin"]
});

const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className='p-4 bg-transparent flex items-center justify-between'>
            <Link href="/" className='flex items-center'>
                <h1 className='text-white font-bold text-xl'>GenA.I.</h1>
            </Link>

            <div className='flex items-center gap-x-3'>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button variant='outline'>Get Started</Button>
            </Link>
            </div>
        </nav>
    );
}

export default LandingNavbar;