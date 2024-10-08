"use client"

import axios from "axios";
import { useProModal } from "@/hooks/use-pro-modal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge";
import { Check, CodeIcon, ImageIcon, MessageSquareIcon, Music2Icon, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const tools = [
    {
        label: 'conversation',
        icon: MessageSquareIcon,
        color: 'text-violet-500',
        bgcolor: 'bg-violet-500/10',
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: 'text-pink-500',
        bgcolor: 'bg-pink-500/10',
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        color: 'text-orange-500',
        bgcolor: 'bg-orange-500/10',
    },
    {
        label: 'Music Generation',
        icon: Music2Icon,
        color: 'text-green-500',
        bgcolor: 'bg-green-500/10',
    },
    {
        label: 'code generation',
        icon: CodeIcon,
        color: 'text-blue-500',
        bgcolor: 'bg-blue-500/10',
    },
]

export const ProModal = () => {
    const proModal = useProModal();
    const [Loading, setLoading] = useState(false);

    const onSubscribe = async() => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 fontb' py-1">
                            Upgrade to GenAI
                            <Badge variant="premium" className="uppercase text-sm py-1">Pro</Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card
                                key={tool.label}
                                className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                    disabled={Loading}
                    onClick={onSubscribe}
                    size="lg"
                    variant="premium"
                    className="w-full">
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}