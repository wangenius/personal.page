"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 m-auto items-center">
        <div className="mr-4 hidden md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 hidden h-10 w-10 rounded-full p-1 lg:flex"
            onClick={toggleMenu}
          >
            <img src={'/app.svg'} alt={""}/>
          </Button>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">WANGENIUS</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#base">Knowledge Base</Link>
            <Link href="#blog">Blogs</Link>
            <Link href="#portfolios">Portfolios</Link>
            <Link href="#contact">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full ml-2 flex-1 md:w-auto md:flex-none">
            <ModeToggle />
          </div>
          <nav className="flex items-center">
            <Button
              variant="ghost"
              className="mr-6 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 py-4">
            <Link href="#about" onClick={toggleMenu}>About</Link>
            <Link href="#projects" onClick={toggleMenu}>Projects</Link>
            <Link href="#contact" onClick={toggleMenu}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;