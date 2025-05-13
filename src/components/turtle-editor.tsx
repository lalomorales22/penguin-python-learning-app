'use client';

import { useState, type FormEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useToast } from '@/hooks/use-toast';
import { Save, Palette, Trash2, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const initialCode = `# Welcome to the Penguin Playground, Little Coder!
# Type your Python Turtle commands here.
# Let's make some amazing penguin art!
#
# Try this example:
#
import turtle

# Get your penguin ready!
pen = turtle.Turtle()
pen.shape("turtle") # We'll pretend this is a penguin for now!
pen.color("black", "white") # Penguin colors!
pen.speed(3) # Not too fast, not too slow

# Let's draw a simple penguin body
pen.begin_fill()
pen.circle(50) # Big body
pen.end_fill()

pen.penup()
pen.goto(0, 100) # Move up for the head
pen.pendown()

pen.color("black", "orange") # Head and beak
pen.begin_fill()
pen.circle(25) # Smaller head
pen.end_fill()

# Add a tiny beak
pen.color("orange")
pen.penup()
pen.goto(25, 110)
pen.pendown()
pen.begin_fill()
pen.right(45)
pen.forward(15)
pen.left(90)
pen.forward(15)
pen.left(135)
pen.forward(21)
pen.end_fill()

# Hide your penguin artist
pen.hideturtle()

turtle.done() # Important to keep the window open!
`;

export default function TurtleEditor() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState(initialCode);
  const { addProject } = usePortfolio();
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      toast({
        title: 'Hold on, Little Penguin!',
        description: 'Please give your amazing artwork a title.',
        variant: 'destructive',
      });
      return;
    }
    if (!code.trim()) {
      toast({
        title: 'Oopsie!',
        description: 'You need to write some Penguin code to save your project.',
        variant: 'destructive',
      });
      return;
    }
    addProject({ title, code });
    toast({
      title: 'Hooray! Project Saved!',
      description: `Your masterpiece "${title}" is now in Maximus's Igloo!`,
    });
    setTitle('');
    // setCode(initialCode); // Optionally reset code
  };

  const handleClear = () => {
    setTitle('');
    setCode('');
     toast({
      title: 'Fresh Ice!',
      description: 'Code and title cleared. Ready for new frosty ideas!',
    });
  }

  const handleResetExample = () => {
    setCode(initialCode);
    toast({
      title: 'Example Loaded!',
      description: 'The penguin example code is back. Feel free to change it!',
    });
  }


  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card rounded-xl shadow-xl kid-friendly-card">
        <div>
          <label htmlFor="project-title" className="block text-xl font-medium text-foreground mb-2">
            Name Your Penguin Masterpiece:
          </label>
          <Input
            id="project-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Penguin Picture!"
            className="text-xl p-4 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="turtle-code" className="block text-xl font-medium text-foreground mb-2">
            Tell Your Penguin What To Do (Python Code):
          </label>
          <Textarea
            id="turtle-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your Python Penguin code here..."
            rows={18}
            className="font-mono text-md p-4 leading-relaxed bg-muted/50 focus:bg-background rounded-lg shadow-inner"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button type="submit" className="text-xl py-4 kid-friendly-button bg-accent text-accent-foreground hover:bg-accent/90 col-span-1 sm:col-span-2">
            <Save className="mr-2 h-6 w-6" />
            Save My Penguin Art!
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClear}
            className="text-xl py-4 kid-friendly-button"
            aria-label="Clear code and title"
          >
            <Trash2 className="mr-2 h-6 w-6" />
            Clear All
          </Button>
        </div>
         <Button 
            type="button" 
            variant="ghost" 
            onClick={handleResetExample}
            className="text-lg py-3 w-full kid-friendly-button text-muted-foreground hover:text-primary"
            aria-label="Reset to example code"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Show Penguin Example Again
          </Button>
      </form>

      <div className="space-y-6 p-6 bg-card rounded-xl shadow-xl kid-friendly-card">
        <h3 className="text-3xl font-semibold text-foreground flex items-center justify-center">
          <Palette className="mr-3 h-8 w-8 text-secondary" />
          Your Penguin&apos;s Icy Canvas!
        </h3>
        <div 
          className="aspect-square w-full bg-blue-100 dark:bg-blue-900/30 rounded-lg shadow-inner flex items-center justify-center border-4 border-dashed border-secondary/50 p-4"
          aria-label="Conceptual Penguin Graphics Canvas where drawings appear"
        >
          <div className="text-center">
            <Image 
              src="https://picsum.photos/seed/penguinart/400/300" 
              alt="A conceptual image of what a penguin drawing might look like" 
              width={400} 
              height={300} 
              className="rounded-md opacity-80 shadow-lg mx-auto"
              data-ai-hint="cute penguin drawing"
            />
            <p className="mt-6 text-muted-foreground text-xl">
              This is where your penguin&apos;s amazing drawings will appear!
            </p>
            <p className="text-md text-muted-foreground/70 mt-2">
              (Right now, this is a sneak peek. The actual drawing happens when you run your Python code on your computer or a special Python runner!)
            </p>
          </div>
        </div>
        <p className="text-md text-muted-foreground text-center">
          Want to learn new Penguin tricks? Ask <Link href="/clarifier" className="text-accent hover:underline font-semibold">Professor Penguino</Link>!
        </p>
      </div>
    </div>
  );
}
