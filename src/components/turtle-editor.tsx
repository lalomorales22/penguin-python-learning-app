// src/components/turtle-editor.tsx
'use client';

import { useState, type FormEvent, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useToast } from '@/hooks/use-toast';
import { Save, Palette, Trash2, RefreshCcw, Play, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PenguinIcon } from './icons/penguin-icon';

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
pen.color("black", "hsl(35, 100%, 60%)") # Penguin colors! (using HSL for beak)
pen.speed(3) # Not too fast, not too slow

# Let's draw a simple penguin body
pen.fillcolor("black")
pen.begin_fill()
pen.circle(50) # Big body
pen.end_fill()

pen.penup()
pen.goto(0, 75) # Move up for the head
pen.pendown()

pen.fillcolor("white")
pen.begin_fill()
pen.circle(30) # Smaller head, white face part
pen.end_fill()

# Re-outline head in black
pen.color("black")
pen.circle(30)


# Add eyes
pen.penup()
pen.goto(-10, 95)
pen.pendown()
pen.fillcolor("black")
pen.begin_fill()
pen.circle(3)
pen.end_fill()

pen.penup()
pen.goto(10, 95)
pen.pendown()
pen.fillcolor("black")
pen.begin_fill()
pen.circle(3)
pen.end_fill()

# Add a tiny beak
pen.penup()
pen.goto(0, 85)
pen.pendown()
pen.color("hsl(35, 100%, 60%)") # Sunny Orange/Yellow for beak
pen.fillcolor("hsl(35, 100%, 60%)")
pen.begin_fill()
pen.setheading(-60) # Point beak downwards
pen.forward(15)
pen.left(120)
pen.forward(15)
pen.left(120)
pen.forward(15)
pen.end_fill()

# Hide your penguin artist
pen.hideturtle()

# turtle.done() # Not needed with Skulpt, remove or comment out
`;

export default function TurtleEditor() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState(initialCode);
  const { addProject } = usePortfolio();
  const { toast } = useToast();

  const [skulptLoaded, setSkulptLoaded] = useState(false);
  const [skulptStdLibLoaded, setSkulptStdLibLoaded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const skulptCanvasContainerRef = useRef<HTMLDivElement>(null);

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
    const skulptOutputDiv = document.getElementById('skulpt-canvas-output');
    if (skulptOutputDiv) skulptOutputDiv.innerHTML = ''; // Clear canvas
    const skulptPlaceholderText = document.getElementById('skulpt-placeholder-text');
    if (skulptPlaceholderText) skulptPlaceholderText.style.display = 'block';
    setRunError(null);
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

  const builtinRead = (x: string) => {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
      throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
  }

  const handleRunCode = () => {
    const skulptOutputDiv = document.getElementById('skulpt-canvas-output');
    const skulptPlaceholderText = document.getElementById('skulpt-placeholder-text');

    if (skulptOutputDiv) {
      skulptOutputDiv.innerHTML = ''; // Clear previous output
    }
    if (skulptPlaceholderText) {
        skulptPlaceholderText.style.display = 'none'; // Hide placeholder
    }
    setRunError(null);
    setIsRunning(true);

    if (!skulptLoaded || !skulptStdLibLoaded || typeof Sk === 'undefined' || typeof Sk.TurtleGraphics === 'undefined') {
        console.error("Skulpt or Skulpt TurtleGraphics not loaded.");
        setRunError("Oops! The drawing tools aren't ready. Please refresh the page or try again in a moment.");
        setIsRunning(false);
        if (skulptPlaceholderText) skulptPlaceholderText.style.display = 'block';
        return;
    }
    
    // Ensure the container for the canvas is sized before Skulpt uses it.
    const canvasContainer = skulptCanvasContainerRef.current;
    let canvasWidth = 400;
    let canvasHeight = 400;
    if (canvasContainer) {
        canvasWidth = canvasContainer.clientWidth;
        canvasHeight = canvasContainer.clientHeight;
    }
    
    Sk.configure({
      output: (text: string) => { 
        // console.log(text); // You might want to display print() output somewhere
      },
      read: builtinRead,
      __future__: Sk.python3,
      debugging: true,
      inputfunTakesPrompt: true,
      TurtleGraphics: {
        target: 'skulpt-canvas-output', 
        width: canvasWidth, 
        height: canvasHeight,
      },
    });
    
    if (Sk.TurtleGraphics.reset) {
        Sk.TurtleGraphics.reset(canvasWidth, canvasHeight);
    } else if (Sk.tg) { // Fallback for older Skulpt or different structure
        Sk.tg.canvasID = 'skulpt-canvas-output'; // Ensure it knows the target
        const canvas = document.getElementById(Sk.tg.canvasID);
         if (canvas && canvas.firstChild && canvas.firstChild.getContext) { // Skulpt creates its own canvas element
            const ctx = (canvas.firstChild as HTMLCanvasElement).getContext('2d');
            ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
            (canvas.firstChild as HTMLCanvasElement).width = canvasWidth;
            (canvas.firstChild as HTMLCanvasElement).height = canvasHeight;
        }
        Sk.tg.turtle_list = [];
        Sk.tg.WIDTH = canvasWidth;
        Sk.tg.HEIGHT = canvasHeight;
    }

    (Sk.TurtleGraphics || (Sk.tg = {})).width = canvasWidth;
    (Sk.TurtleGraphics || (Sk.tg = {})).height = canvasHeight;

    const modifiedCode = code.replace(/turtle\.done\(\)|turtle\.Screen\(\)\.mainloop\(\)|screen\.mainloop\(\)/g, '# $& # Removed for browser execution');

    Sk.misceval.asyncToPromise(() => {
      return Sk.importMainWithBody("<stdin>", false, modifiedCode, true);
    })
    .then((mod: any) => {
      // console.log('Skulpt execution success');
    })
    .catch((err: any) => {
      console.error('Skulpt execution error:', err);
      let errorMsg = err.toString();
      if (err.tp$name && err.args) { // Try to format Python-like errors
          errorMsg = `${err.tp$name}: ${err.args.v[0].v}`;
          if (err.traceback && err.traceback.length > 0) {
              const tb = err.traceback[0];
              errorMsg += ` (line ${tb.lineno})`;
          }
      }
      setRunError(`Brrr! Penguin code slip-up! ${errorMsg}. Check your code for typos or ask Professor Penguino!`);
      if (skulptPlaceholderText) skulptPlaceholderText.style.display = 'block'; 
      if (skulptOutputDiv) skulptOutputDiv.innerHTML = `<div class="text-destructive p-4 text-center">${errorMsg}</div>`;
    })
    .finally(() => {
      setIsRunning(false);
    });
  };


  return (
    <>
      <Script src="https://skulpt.org/js/skulpt.min.js" strategy="lazyOnload" onReady={() => setSkulptLoaded(true)} />
      <Script src="https://skulpt.org/js/skulpt-stdlib.js" strategy="lazyOnload" onReady={() => setSkulptStdLibLoaded(true)} />
      
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button 
              type="button" 
              onClick={handleRunCode} 
              disabled={isRunning || !skulptLoaded || !skulptStdLibLoaded}
              className="text-xl py-4 kid-friendly-button bg-green-500 hover:bg-green-600 text-white"
            >
              {isRunning ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Play className="mr-2 h-6 w-6" />}
              {isRunning ? 'Penguin Drawing...' : 'Run My Penguin Code!'}
            </Button>
            <Button type="submit" className="text-xl py-4 kid-friendly-button bg-accent text-accent-foreground hover:bg-accent/90">
              <Save className="mr-2 h-6 w-6" />
              Save My Penguin Art!
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <Button 
              type="button" 
              variant="ghost" 
              onClick={handleResetExample}
              className="text-lg py-3 w-full kid-friendly-button text-muted-foreground hover:text-primary"
              aria-label="Reset to example code"
            >
              <RefreshCcw className="mr-2 h-5 w-5" />
              Show Example Again
            </Button>
          </div>
          {(!skulptLoaded || !skulptStdLibLoaded) && !isRunning && (
            <Alert variant="default" className="mt-4 bg-blue-100 border-blue-300 text-blue-700">
                <Loader2 className="h-5 w-5 animate-spin mr-2 inline-block" />
                <AlertDescription>Warming up the drawing tools... Please wait a moment!</AlertDescription>
            </Alert>
          )}
        </form>

        <div className="space-y-6 p-6 bg-card rounded-xl shadow-xl kid-friendly-card">
          <h3 className="text-3xl font-semibold text-foreground flex items-center justify-center">
            <Palette className="mr-3 h-8 w-8 text-secondary" />
            Your Penguin&apos;s Icy Canvas!
          </h3>
          <div 
            id="turtle-canvas-container"
            ref={skulptCanvasContainerRef}
            className="aspect-square w-full bg-sky-100 dark:bg-sky-900/30 rounded-lg shadow-inner flex items-center justify-center border-4 border-dashed border-primary/40 p-1 relative overflow-hidden"
            aria-label="Penguin Graphics Canvas where drawings appear"
            style={{ minHeight: '400px' }} // Ensure it has a minimum size for Skulpt
          >
            <div id="skulpt-canvas-output" className="w-full h-full flex items-center justify-center">
              {/* Skulpt will inject its canvas here. Child canvas should be 100% width/height of this div. */}
            </div>
            <p id="skulpt-placeholder-text" className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground text-xl p-4">
                <PenguinIcon className="w-24 h-24 text-primary/50 mb-4" />
                Click &quot;Run My Penguin Code!&quot; to see your drawing here!
            </p>
          </div>
          {runError && (
              <Alert variant="destructive" className="mt-4">
                  <AlertTitle className="font-bold text-lg">Oopsie! Error on the Ice!</AlertTitle>
                  <AlertDescription className="text-md whitespace-pre-wrap">{runError}</AlertDescription>
              </Alert>
          )}
          <p className="text-md text-muted-foreground text-center">
            Want to learn new Penguin tricks? Ask <Link href="/clarifier" className="text-accent hover:underline font-semibold">Professor Penguino</Link>!
          </p>
        </div>
      </div>
    </>
  );
}
