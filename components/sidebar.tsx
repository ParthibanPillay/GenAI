"use client";

import { cn } from "@/lib/utils";
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquareIcon, Music2Icon, SettingsIcon, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/free-counter";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

const routes = [
    {
        label: 'DashBoard',
        icon: LayoutDashboard,
        href: "/dashboard",
        color: 'text-sky-500',
    },
    {
        label: 'Conversation',
        icon: MessageSquareIcon,
        href: "/conversation",
        color: 'text-violet-500',
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        href: "/image",
        color: 'text-pink-500',
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        href: "/video",
        color: 'text-orange-500',
    },
    {
        label: 'Music Generation',
        icon: Music2Icon,
        href: "/music",
        color: 'text-green-500',
    },
    {
        label: 'Code Pilot',
        icon: CodeIcon,
        href: "/code",
        color: 'text-blue-500',
    },
    {
        label: 'Settings',
        icon: SettingsIcon,
        href: "/settings",
        color: 'text-white',
    },
]

interface sidebarProps {
    apiLimitCount: number;
    isPro: boolean
};

const Sidebar = ({
    apiLimitCount = 0,
    isPro = false
}: sidebarProps) => {

    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href='/dashboard' className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt='logo' src="/logo.png" className=" w-5 h-5 " />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>GenA.I</h1>
                </Link>

                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 hover:text-white rounded-lg transition", pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter
            isPro={isPro}
                apiLimitCount={apiLimitCount}
            />
        </div>
    );
}

export default Sidebar;