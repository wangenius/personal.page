"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { TbLogout } from "react-icons/tb";
import {
  SubscriptionStatusDto,
  SubscriptionStatusResponse,
} from "@/lib/subscription";
import { cn } from "@/lib/utils";
import { BiUser } from "react-icons/bi";

export function UserMenu() {
  const { data: session, isPending } = useSession();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatusDto | null>(null);

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

  useEffect(() => {
    let isMounted = true;

    if (!session) {
      setSubscriptionStatus(null);
      return () => {
        isMounted = false;
      };
    }

    fetch("/api/subscription/status", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          return null;
        }
        return (await res.json()) as SubscriptionStatusResponse | null;
      })
      .then((payload) => {
        if (!isMounted) return;
        setSubscriptionStatus(payload?.subscription ?? null);
      })
      .catch(() => {
        if (!isMounted) return;
        setSubscriptionStatus(null);
      });

    return () => {
      isMounted = false;
    };
  }, [session]);

  if (isPending) {
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

  const handleSignOut = async () => {
    await signOut();
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
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <TbLogout className="mr-2 h-4 w-4" />
          logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
