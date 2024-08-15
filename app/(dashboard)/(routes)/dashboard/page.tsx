"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, CodeIcon, ImageIcon, MessageSquareIcon, Music2Icon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: 'conversation',
    icon: MessageSquareIcon,
    color: 'text-violet-500',
    bgcolor: 'bg-violet-500/10',
    href: "/conversation"
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-500',
    bgcolor: 'bg-pink-500/10',
    href: "/image"
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-500',
    bgcolor: 'bg-orange-500/10',
    href: "/video"
  },
  {
    label: 'Music Generation',
    icon: Music2Icon,
    color: 'text-green-500',
    bgcolor: 'bg-green-500/10',
    href: "/music"
  },
  {
    label: 'code generation',
    icon: CodeIcon,
    color: 'text-blue-500',
    bgcolor: 'bg-blue-500/10',
    href: "/code"
  },
]

const DashboardPage = () => {

  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI</h1>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">chat with smartest AI.Experience the power of AI</p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div>
                {tool.label}
              </div>
            </div>
            <ArrowRight />
          </Card>)
        )}
      </div>
    </div>
  );
}

export default DashboardPage;