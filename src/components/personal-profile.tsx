"use client";

import { Hero } from "./Hero";
import { Timeline } from "./Timeline";

export function PersonalProfile() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <Hero />
      <Timeline />
    </div>
  );
}
