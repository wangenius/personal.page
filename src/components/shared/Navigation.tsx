"use client";

import { useState } from "react";
import { motion, useTransform, useSpring, MotionValue } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavigationProps {
  sections: { id: string; name: string }[];
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  scrollY: MotionValue<number>;
}

export function Navigation({ sections, activeSection, scrollToSection, scrollY }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const smoothScroll = useSpring(scrollY, {
    stiffness: 35,
    damping: 20,
    mass: 0.2,
    restDelta: 0.001,
    restSpeed: 0.001,
    velocity: 2
  });

  const navOpacity = useSpring(
    useTransform(smoothScroll, [0, 100], [0, 1]),
    { 
      stiffness: 35, 
      damping: 20,
      mass: 0.2
    }
  );

  const navBackdrop = useSpring(
    useTransform(smoothScroll, [0, 100], [0, 12]),
    { 
      stiffness: 35, 
      damping: 20,
      mass: 0.2
    }
  );

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {sections.map((section) => (
        <motion.button
          key={section.id}
          onClick={() => {
            scrollToSection(section.id);
            if (isMobile) setIsOpen(false);
          }}
          className={`relative px-2 py-1.5 text-sm transition-colors duration-200 ${
            isMobile ? "w-full text-left py-3 px-4" : ""
          } ${
            activeSection === section.id
              ? "text-primary font-medium"
              : "text-muted-foreground hover:text-primary/80"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {section.name}
          {activeSection === section.id && !isMobile && (
            <motion.div
              layoutId="activeSection"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }}
            />
          )}
        </motion.button>
      ))}
    </>
  );

  return (
    <motion.nav
      style={{ 
        opacity: navOpacity,
        backdropFilter: useTransform(navBackdrop, (value) => `blur(${value}px)`)
      }}
      className="fixed w-full top-0 left-0 right-0 z-50 border-b border-primary/10 bg-background/80"
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 md:h-20 flex items-center justify-between">
          <motion.span 
            className="text-base md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 sm:text-4xl duration-500"
            whileHover={{ scale: 1.05 }}
          >
            WANGENIUS
          </motion.span>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <NavLinks />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                {isOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <div className="flex flex-col pt-20">
                <NavLinks isMobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
} 