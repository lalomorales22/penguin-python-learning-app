'use client';

import Link from 'next/link';
import { Home, Lightbulb, UserCircle } from 'lucide-react';
import { PythonLogo } from '@/components/icons/python-logo';
import { TurtleIcon } from '@/components/icons/turtle-icon';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/clarifier', label: 'Concept Clarifier', icon: Lightbulb },
  { href: '/turtle', label: 'Turtle Showcase', icon: TurtleIcon },
  { href: '/profile', label: 'Learner Space', icon: UserCircle },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 text-primary-foreground hover:text-opacity-80 transition-opacity">
            <PythonLogo className="h-10 w-10 text-secondary" />
            <span className="text-2xl font-bold tracking-tight">Python Sprouts</span>
          </Link>
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                asChild
                className={cn(
                  "text-primary-foreground hover:bg-primary-foreground/10",
                  pathname === item.href && "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                )}
              >
                <Link href={item.href} className="flex items-center space-x-2 px-3 py-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>
          {/* Mobile Menu Button (optional, not implemented for brevity) */}
        </div>
      </div>
    </header>
  );
}
