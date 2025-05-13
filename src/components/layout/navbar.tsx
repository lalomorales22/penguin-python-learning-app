'use client';

import Link from 'next/link';
import { Home, Lightbulb, UserCircle, Menu, Sprout, Turtle } from 'lucide-react'; // Added Sprout and Turtle
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import React from 'react';

// Placeholder for PythonSproutsLogo - replace with actual SVG or component
const PythonSproutsLogo = () => <Sprout className="h-12 w-12 md:h-16 md:w-16 text-secondary drop-shadow-md" />;


const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/clarifier', label: 'Concept Clarifier', icon: Lightbulb },
  { href: '/turtle', label: 'Turtle Showcase', icon: Turtle }, // Updated from Penguin Playground
  { href: '/profile', label: "Learner's Space", icon: UserCircle }, // Updated from Maximus's Hub
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="flex items-center space-x-2 text-primary-foreground hover:opacity-90 transition-opacity">
            <PythonSproutsLogo />
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight">Python Sprouts</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                asChild
                className={cn(
                  "text-primary-foreground hover:bg-primary-foreground/20 text-lg kid-friendly-button px-4 py-3",
                  pathname === item.href && "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md"
                )}
              >
                <Link href={item.href} className="flex items-center space-x-2">
                  <item.icon className="h-6 w-6" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                  <Menu className="h-8 w-8" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-primary p-6">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      variant={pathname === item.href ? 'secondary' : 'ghost'}
                      asChild
                      className={cn(
                        "text-primary-foreground hover:bg-primary-foreground/20 text-xl justify-start kid-friendly-button w-full py-3",
                        pathname === item.href && "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={item.href} className="flex items-center space-x-3">
                        <item.icon className="h-7 w-7" />
                        <span>{item.label}</span>
                      </Link>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
