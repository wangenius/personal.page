"use client";
import { Contact } from "@/components/Contact";
import {
  SelectField
} from "@/components/docs/selection-quote";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";

export default function HomePage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl px-4 mx-auto py-12 md:py-16">
        <SelectField
          onSelect={(text) => ({
            text,
          })}
        >
          <Hero />
          <Timeline />
          <Contact />
        </SelectField>
      </div>
    </div>
  );
}
