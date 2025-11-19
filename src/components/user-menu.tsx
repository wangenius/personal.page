"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { TbLogout } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { BiUser } from "react-icons/bi";
import { dialog } from "@/components/custom/DialogModal";

export function UserMenu() {
  const { data: session, isPending } = useSession();
  const [mounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  // Delay rendering anything that depends on client-only state (session, user image)
  // so that the server and first client render stay in sync and avoid hydration drift.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setImageUrl(session?.user.image || undefined);
  }, [session?.user.image]);

  useEffect(() => {
    if (session && !session.user.image) {
      fetch("/api/auth/user-image")
        .then((r) => r.json())
        .then((d) => {
          if (d?.imageUrl) setImageUrl(d.imageUrl as string);
        })
        .catch(() => {});
    }
  }, [session]);

  if (!mounted || isPending) {
    return (
      <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
        <BiUser className="h-4 w-4" />
      </Button>
    );
  }

  if (!session) {
    return (
      <Button variant="ghost" size="sm" className="h-8 gap-2" asChild>
        <Link href="/signin">login</Link>
      </Button>
    );
  }

  const handleSignOut = () => {
    dialog.confirm({
      title: "确认退出登录",
      content: "确定要退出当前账号吗？",
      variants: "destructive",
      okText: "退出登录",
      cancelText: "取消",
      onOk: async () => {
        await signOut();
      },
    });
  };

  return (
    <DropdownMenu>
      <div className="flex items-center gap-2">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Avatar className={cn("h-7 w-7")}>
              <AvatarImage src={imageUrl} alt={session.user.name} />
              <AvatarFallback className="text-xs">
                {session.user.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link
            href="/subscribe"
            className="flex w-full items-center text-sm font-medium"
          >
            <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-semibold text-emerald-500">
              $
            </span>
            订阅
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <TbLogout className="mr-2 h-4 w-4" />
          <span className="text-sm font-medium">退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
