'use client';

import { useState, type FormEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useToast } from '@/hooks/use-toast';
import { Save, Palette, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function TurtleEditor() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState(
    '# Welcome to the Turtle Showcase!\n# Type your Python Turtle commands here.\n# For example:\n\n# import turtle\n# screen = turtle.Screen()\n# my_turtle = turtle.Turtle()\n\n# my_turtle.color("blue")\n# my_turtle.forward(100)\n# my_turtle.left(90)\n# my_turtle.forward(100)\n\n# screen.mainloop()'
  );
  const { addProject } = usePortfolio();
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !code.trim()) {
      toast({
        title: 'Uh oh!',
        description: 'Please provide a title and some code for your masterpiece.',
        variant: 'destructive',
      });
      return;
    }
    addProject({ title, code });
    toast({
      title: 'Woohoo! Project Saved!',
      description: `"${title}" has been added to your portfolio.`,
    });
    setTitle('');
    // Optionally clear code or keep it for further editing
    // setCode(''); 
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card rounded-lg shadow-lg">
        <div>
          <label htmlFor="project-title" className="block text-lg font-medium text-foreground mb-2">
            Project Title:
          </label>
          <Input
            id="project-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Turtle Drawing"
            className="text-lg p-3"
          />
        </div>
        <div>
          <label htmlFor="turtle-code" className="block text-lg font-medium text-foreground mb-2">
            Python Turtle Code:
          </label>
          <Textarea
            id="turtle-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your Python Turtle code here..."
            rows={15}
            className="font-mono text-sm p-3 leading-relaxed bg-muted/50 focus:bg-background"
          />
        </div>
        <div className="flex space-x-3">
          <Button type="submit" className="text-lg py-3 flex-grow bg-accent text-accent-foreground hover:bg-accent/90">
            <Save className="mr-2 h-5 w-5" />
            Save to Portfolio
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => { setCode(''); setTitle(''); }}
            className="text-lg py-3"
            aria-label="Clear code and title"
          >
            <Trash2 className="mr-2 h-5 w-5" />
            Clear
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground flex items-center">
          <Palette className="mr-2 h-7 w-7 text-secondary" />
          Turtle Canvas (Conceptual)
        </h3>
        <div 
          className="aspect-square w-full bg-secondary/20 rounded-lg shadow-inner flex items-center justify-center border-2 border-dashed border-secondary/50"
          aria-label="Conceptual Turtle Graphics Canvas"
        >
          <div className="text-center p-4">
            <Image 
              src="https://picsum.photos/seed/turtlecanvas/400/300" 
              alt="Conceptual Turtle Output" 
              width={400} 
              height={300} 
              className="rounded-md opacity-70"
              data-ai-hint="abstract line art"
            />
            <p className="mt-4 text-muted-foreground text-lg">
              Your Turtle creations would appear here!
            </p>
            <p className="text-sm text-muted-foreground/70">
              (Currently, this is a visual placeholder. Code execution is not implemented in this showcase.)
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Tip: Use Python&apos;s <code>turtle</code> module commands. Our AI can help you learn them in the Concept Clarifier!
        </p>
      </div>
    </div>
  );
}
