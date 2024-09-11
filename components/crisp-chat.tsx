"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("3b358bee-a32a-4547-ac8b-1c2955709dd5")
    },[]);

    return null;
}