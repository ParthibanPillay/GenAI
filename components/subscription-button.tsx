"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
    isPro: boolean;
}

const SubscriptionButton = ({
    isPro = false
}:SubscriptionButtonProps) => {
    const [Loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("api/stripe");
            window.location.href = response.data.url;
        } catch (error) {
            toast.error("something went wrong")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button disabled={Loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
        </Button>
    );
}

export default SubscriptionButton;