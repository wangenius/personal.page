"use client"
import {FloatingDock} from "@/components/ui/floating-dock";
import {GithubIcon, LucideMail} from "lucide-react";
import {IconBrandTiktok} from "@tabler/icons-react";

const Footer = () => {
    return (
        <footer className="bg-background py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                    <div className="text-center md:text-left">
                        <p>&copy; 2023 wangenius@qq.com. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <FloatingDock items={[{icon: <GithubIcon/>, title: "github", href: ""},{icon: <IconBrandTiktok/>, title: "github", href: ""},{icon: <LucideMail/>, title: "github", href: ""}]}/>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;