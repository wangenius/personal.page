"use client";

import { Hero } from "./Hero";
import { Timeline } from "./Timeline";
import { Contact } from "./Contact";

export function PersonalProfile() {
  return (
    <div className="w-full overflow-auto">
      <div className="max-w-6xl px-4  mx-auto py-12 md:py-16">
        <Hero />
        <Timeline />
        <Contact />
      </div>
    </div>
  );
}
