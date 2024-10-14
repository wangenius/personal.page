import {BellIcon, BoxIcon, Share2Icon, SparklesIcon} from "lucide-react";

import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {BentoCard, BentoGrid} from "@/components/ui/bento-grid";
import Marquee from "@/components/ui/marquee";

const files = [
    {
        name: "bitcoin.pdf",
        body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
    },
    {
        name: "finances.xlsx",
        body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
    },
    {
        name: "logo.svg",
        body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
    },
    {
        name: "keys.gpg",
        body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
    },
    {
        name: "seed.txt",
        body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
    },
];

const features = [
    {
        Icon: SparklesIcon,
        name: "快速入门",
        description: "when you need to know something, you can find it here.",
        href: "#",
        cta: "开始",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Marquee
                pauseOnHover
                className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
            >
                {files.map((f, idx) => (
                    <figure
                        key={idx}
                        className={cn(
                            "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                            "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
                        )}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex flex-col">
                                <figcaption className="text-sm font-medium dark:text-white ">
                                    {f.name}
                                </figcaption>
                            </div>
                        </div>
                        <blockquote className="mt-2 text-xs">{f.body}</blockquote>
                    </figure>
                ))}
            </Marquee>
        ),
    },
    {
        Icon: SparklesIcon,
        name: "AI和工作流的应用",
        description: "Get notified when something happens.",
        href: "#",
        cta: "开始",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    },
    {
        Icon: Share2Icon,
        name: "计算机和编程快速入门",
        description: "Supports 100+ integrations and counting.",
        href: "#",
        cta: "开始",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    },
    {
        Icon: BoxIcon,
        name: "更多",
        description: "Use the calendar to filter your files by date.",
        className: "col-span-3 lg:col-span-1",
        href: "#",
        cta: "了解更多",
        background: (
            <Calendar
                mode="single"
                selected={new Date(2022, 4, 11, 0, 0, 0)}
                className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
            />
        ),
    },
];

export function Base() {
    return (
        <section id="base" className="bg-muted py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-2 text-center text-3xl font-bold">Knowledge Base</h2>
                <div className={cn("mx-auto mb-12 max-w-[600px] text-center text-muted-foreground")}>Note is Gone. Knowledge Base is the Answer.</div>

                <BentoGrid>
                    {features.map((feature, idx) => (
                        <BentoCard key={idx} {...feature} />
                    ))}
                </BentoGrid></div>
        </section>
    );
}
