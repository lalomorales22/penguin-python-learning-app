// src/components/turtle-editor.tsx
'use client';

import { useState, type FormEvent, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useToast } from '@/hooks/use-toast';
import { Save, Palette, Trash2, RefreshCcw, Play, Loader2, Wand2, Sparkles, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenguinIcon } from './icons/penguin-icon';
import { suggestCode } from '@/ai/flows/code-suggestion';
import type { SuggestCodeOutput } from '@/ai/flows/code-suggestion';

const initialCode = `# Welcome to the Penguin Playground, Little Coder!
# Ask the AI to help you draw, or try this example:
#
import turtle

pen = turtle.Turtle()
pen.shape("turtle") 
pen.color("blue") 
pen.speed(3)

pen.fillcolor("cyan")
pen.begin_fill()
for _ in range(4):
    pen.forward(100)
    pen.left(90)
pen.end_fill()

pen.hideturtle()

# turtle.done() # Not needed with Skulpt
`;

export default function TurtleEditor() {
  const [taskDescription, setTaskDescription] = useState('');
  const [artworkTitle, setArtworkTitle] = useState('');
  const [code, setCode] = useState(initialCode);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const { addProject } = usePortfolio();
  const { toast } = useToast();

  const [skulptLoaded, setSkulptLoaded] = useState(false);
  const [skulptStdLibLoaded, setSkulptStdLibLoaded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const skulptCanvasContainerRef = useRef<HTMLDivElement>(null);

  const handleGetAISuggestion = async () => {
    if (!taskDescription.trim()) {
      setAiError('Please tell Professor Penguino what you want to draw!');
      return;
    }
    setIsAiLoading(true);
    setAiError(null);
    setAiExplanation(null);
    try {
      const aiResponse: SuggestCodeOutput = await suggestCode({ task: taskDescription });
      setCode(aiResponse.codeSnippet || '');
      setAiExplanation(aiResponse.explanation);
      toast({
        title: 'Code Idea from Professor Penguino!',
        description: 'Check out the code and explanation below.',
      });
    } catch (e) {
      console.error(e);
      setAiError("Uh oh! Professor Penguino's AI brain is a bit frosty. Try asking again!");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const projectTitle = artworkTitle.trim() || taskDescription.trim();

    if (!projectTitle) {
      toast({
        title: 'Hold on, Little Penguin!',
        description: 'Please give your artwork a title, or ask the AI to help you create something first!',
        variant: 'destructive',
      });
      return;
    }
    if (!code.trim()) {
      toast({
        title: 'Oopsie!',
        description: 'You need some Penguin code to save your project.',
        variant: 'destructive',
      });
      return;
    }
    addProject({ title: projectTitle, code });
    toast({
      title: 'Hooray! Project Saved!',
      description: `Your masterpiece "${projectTitle}" is now in Maximus's Igloo!`,
    });
    setArtworkTitle(''); 
    // setTaskDescription(''); // Optionally clear task description
    // setCode(initialCode); // Optionally reset code
  };

  const handleClear = () => {
    setTaskDescription('');
    setArtworkTitle('');
    setCode('');
    setAiExplanation(null);
    setAiError(null);
    const skulptOutputDiv = document.getElementById('skulpt-canvas-output');
    if (skulptOutputDiv) skulptOutputDiv.innerHTML = '';
    const skulptPlaceholderText = document.getElementById('skulpt-placeholder-text');
    if (skulptPlaceholderText) skulptPlaceholderText.style.display = 'block';
    setRunError(null);
    toast({
      title: 'Fresh Ice!',
      description: 'Everything cleared. Ready for new frosty ideas!',
    });
  }

  const handleResetExample = () => {
    setCode(initialCode);
    setTaskDescription('');
    setAiExplanation(null);
    setAiError(null);
    toast({
      title: 'Example Loaded!',
      description: 'The example code is back. Feel free to change it!',
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

    if (skulptOutputDiv) skulptOutputDiv.innerHTML = ''; 
    if (skulptPlaceholderText) skulptPlaceholderText.style.display = 'none';
    setRunError(null);
    setIsRunning(true);

    if (!skulptLoaded || !skulptStdLibLoaded || typeof Sk === 'undefined' || typeof Sk.TurtleGraphics === 'undefined') {
        setRunError("Oops! The drawing tools aren't ready. Please refresh or wait.");
        setIsRunning(false);
        if (skulptPlaceholderText) skulptPlaceholderText.style.display = 'block';
        return;
    }
    
    const canvasContainer = skulptCanvasContainerRef.current;
    let canvasWidth = 400;
    let canvasHeight = 400;
    if (canvasContainer) {
        canvasWidth = canvasContainer.clientWidth;
        canvasHeight = canvasContainer.clientHeight;
    }
    
    Sk.configure({
      output: (text: string) => {},
      read: builtinRead,
      __future__: Sk.python3,
      debugging: true,
      inputfunTakesPrompt: true,
      TurtleGraphics: { target: 'skulpt-canvas-output', width: canvasWidth, height: canvasHeight },
    });
    
    if (Sk.TurtleGraphics.reset) {
        Sk.TurtleGraphics.reset(canvasWidth, canvasHeight);
    } else if (Sk.tg) {
        Sk.tg.canvasID = 'skulpt-canvas-output';
        const canvas = document.getElementById(Sk.tg.canvasID);
         if (canvas && canvas.firstChild && (canvas.firstChild as HTMLCanvasElement).getContext) {
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

    const cleanedCode = code.replace(/turtle\.done\(\)|turtle\.Screen\(\)\.mainloop\(\)|screen\.mainloop\(\)/g, '# $& # Removed for browser execution');

    Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, cleanedCode, true))
    .then((mod: any) => {})
    .catch((err: any) => {
      let errorMsg = err.toString();
      if (err.tp$name && err.args) {
          errorMsg = `${err.tp$name}: ${err.args.v[0].v}`;
          if (err.traceback && err.traceback.length > 0) {
              const tb = err.traceback[0];
              errorMsg += ` (line ${tb.lineno})`;
          }
      }
      setRunError(`Brrr! Penguin code slip-up! ${errorMsg}. Check your code or ask Professor Penguino!`);
      if (skulptPlaceholderText) skulptPlaceholderText.style.display = 'block'; 
      if (skulptOutputDiv) skulptOutputDiv.innerHTML = `<div class="text-destructive p-4 text-center">${errorMsg}</div>`;
    })
    .finally(() => setIsRunning(false));
  };

  return (
    <>
      <Script src="https://skulpt.org/js/skulpt.min.js" strategy="lazyOnload" onReady={() => setSkulptLoaded(true)} />
      <Script src="https://skulpt.org/js/skulpt-stdlib.js" strategy="lazyOnload" onReady={() => setSkulptStdLibLoaded(true)} />
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card rounded-xl shadow-xl kid-friendly-card">
          <div>
            <label htmlFor="task-description" className="block text-xl font-medium text-foreground mb-2">
              What do you want to create? (AI will help!)
            </label>
            <Input
              id="task-description"
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="e.g., draw a blue penguin, make a star"
              className="text-xl p-4 rounded-lg"
            />
          </div>
           <Button 
              type="button" 
              onClick={handleGetAISuggestion} 
              disabled={isAiLoading || !skulptLoaded || !skulptStdLibLoaded}
              className="w-full text-xl py-4 kid-friendly-button bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {isAiLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Wand2 className="mr-2 h-6 w-6" />}
              {isAiLoading ? 'Penguino Thinking...' : 'Get Penguin Code Ideas!'}
          </Button>

          {aiError && (
            <Alert variant="destructive">
              <PenguinIcon className="h-5 w-5" />
              <AlertTitle>AI Error</AlertTitle>
              <AlertDescription>{aiError}</AlertDescription>
            </Alert>
          )}

          {aiExplanation && (
            <Card className="bg-primary/10 animate-fadeIn">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Sparkles className="mr-2 h-6 w-6 text-secondary" />
                  Professor Penguino Explains:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-md text-muted-foreground whitespace-pre-wrap leading-relaxed">{aiExplanation}</p>
              </CardContent>
            </Card>
          )}
          
          <div>
            <label htmlFor="artwork-title" className="block text-xl font-medium text-foreground mb-2 mt-4">
              Artwork Title (optional):
            </label>
            <Input
              id="artwork-title"
              type="text"
              value={artworkTitle}
              onChange={(e) => setArtworkTitle(e.target.value)}
              placeholder="My Awesome Penguin Picture!"
              className="text-xl p-4 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="turtle-code" className="block text-xl font-medium text-foreground mb-2">
              Your Penguin Code:
            </label>
            <Textarea
              id="turtle-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your Python Penguin code here..."
              rows={12}
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
            >
              <Trash2 className="mr-2 h-6 w-6" />
              Clear All
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={handleResetExample}
              className="text-lg py-3 w-full kid-friendly-button text-muted-foreground hover:text-primary"
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
            style={{ minHeight: '400px' }}
          >
            <div id="skulpt-canvas-output" className="w-full h-full flex items-center justify-center"></div>
            <p id="skulpt-placeholder-text" className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground text-xl p-4">
                <PenguinIcon className="w-24 h-24 text-primary/50 mb-4" />
                Click &quot;Run My Penguin Code!&quot; to see your drawing here!
            </p>
          </div>
          {runError && (
              <Alert variant="destructive" className="mt-4">
                  <HelpCircle className="h-5 w-5" />
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
