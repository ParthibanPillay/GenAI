import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import Mobilesidebar from "@/components/mobile-sidebar";

const Navbar = () => {
    return (
        <div className="flex items-center p-4">
            <Mobilesidebar/>
            <div className="flex w-full justify-end">
                <UserButton/>
            </div>
        </div>
    );
}

export default Navbar;