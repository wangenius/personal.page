"use client";

import { Hero } from "./Hero";
import { Timeline } from "./Timeline";
import { Contact } from "./Contact";

export function PersonalProfile() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16 mb-20">
      <Hero />
      <Timeline />
      <Contact />
    </div>
  );
}
