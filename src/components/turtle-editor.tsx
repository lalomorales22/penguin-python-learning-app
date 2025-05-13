'use client';

import { useState, type FormEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useToast } from '@/hooks/use-toast';
import { Save, Palette, Trash2, RefreshCcw } from 'lucide-react';
import Image from 'next/image';

const initialCode = `# Welcome to the Turtle Showcase, Little Coder!
# Type your Python Turtle commands here.
# Let's make some amazing art!
#
# Try this example:
#
# import turtle
#
# # Get your turtle ready!
# my_turtle = turtle.Turtle()
# my_turtle.shape("turtle") # Let's make it look like a turtle!
# my_turtle.color("green") # What's your favorite color?
#
# # Let's draw a colorful square!
# my_turtle.fillcolor("yellow")
# my_turtle.begin_fill()
# for _ in range(4):
#   my_turtle.forward(100) # Move forward 100 steps
#   my_turtle.left(90)   # Turn left 90 degrees
# my_turtle.end_fill()
#
# # Make your turtle hide so you can see your drawing
# my_turtle.hideturtle()
#
# turtle.done() # Important to keep the window open!
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
        title: 'Hold on, Sprout!',
        description: 'Please give your amazing artwork a title.',
        variant: 'destructive',
      });
      return;
    }
    if (!code.trim()) {
      toast({
        title: 'Oopsie!',
        description: 'You need to write some Turtle code to save your project.',
        variant: 'destructive',
      });
      return;
    }
    addProject({ title, code });
    toast({
      title: 'Hooray! Project Saved!',
      description: `Your masterpiece "${title}" is now in your Learner's Space!`,
    });
    setTitle('');
    // setCode(initialCode); // Reset to initial example or clear
  };

  const handleClear = () => {
    setTitle('');
    setCode('');
     toast({
      title: 'Fresh Start!',
      description: 'Code and title cleared. Ready for new ideas!',
    });
  }

  const handleResetExample = () => {
    setCode(initialCode);
    toast({
      title: 'Example Loaded!',
      description: 'The example code is back. Feel free to change it!',
    });
  }


  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card rounded-xl shadow-xl kid-friendly-card">
        <div>
          <label htmlFor="project-title" className="block text-xl font-medium text-foreground mb-2">
            Name Your Artwork:
          </label>
          <Input
            id="project-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Super Turtle Drawing!"
            className="text-xl p-4 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="turtle-code" className="block text-xl font-medium text-foreground mb-2">
            Tell Your Turtle What To Do (Python Code):
          </label>
          <Textarea
            id="turtle-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your Python Turtle code here..."
            rows={18}
            className="font-mono text-md p-4 leading-relaxed bg-muted/50 focus:bg-background rounded-lg shadow-inner"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button type="submit" className="text-xl py-4 kid-friendly-button bg-accent text-accent-foreground hover:bg-accent/90 col-span-1 sm:col-span-2">
            <Save className="mr-2 h-6 w-6" />
            Save My Art!
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
            Show Example Code Again
          </Button>
      </form>

      <div className="space-y-6 p-6 bg-card rounded-xl shadow-xl kid-friendly-card">
        <h3 className="text-3xl font-semibold text-foreground flex items-center justify-center">
          <Palette className="mr-3 h-8 w-8 text-secondary" />
          Your Turtle&apos;s Drawing Board!
        </h3>
        <div 
          className="aspect-square w-full bg-sky-100 dark:bg-sky-900/30 rounded-lg shadow-inner flex items-center justify-center border-4 border-dashed border-secondary/50 p-4"
          aria-label="Conceptual Turtle Graphics Canvas where drawings appear"
        >
          <div className="text-center">
            <Image 
              src="https://picsum.photos/seed/turtleworld/400/300" 
              alt="A conceptual image of what a turtle drawing might look like" 
              width={400} 
              height={300} 
              className="rounded-md opacity-80 shadow-lg mx-auto"
              data-ai-hint="colorful turtle drawing"
            />
            <p className="mt-6 text-muted-foreground text-xl">
              This is where your turtle&apos;s amazing drawings will appear!
            </p>
            <p className="text-md text-muted-foreground/70 mt-2">
              (Right now, this is a sneak peek. The actual drawing happens when you run your Python code on your computer or a special Python runner!)
            </p>
          </div>
        </div>
        <p className="text-md text-muted-foreground text-center">
          Want to learn new Turtle tricks? Ask the <Link href="/clarifier" className="text-accent hover:underline font-semibold">Concept Clarifier</Link>!
        </p>
      </div>
    </div>
  );
}
