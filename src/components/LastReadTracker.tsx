"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "last-read-path";

export function LastReadTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, pathname);
  }, [pathname]);

  return null;
}
