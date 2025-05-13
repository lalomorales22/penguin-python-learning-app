import TurtleEditor from '@/components/turtle-editor';
import { Palette } from 'lucide-react'; // Using Palette for drawing


export default function TurtlePage() {
  return (
    <div className="container mx-auto py-8 px-4 spacious-padding">
      <header className="text-center mb-12 space-y-4">
        <Palette className="h-20 w-20 md:h-24 md:w-24 mx-auto text-primary animate-waddleIn" /> 
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Penguin Playground: Code Your Own Penguin Art!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Let&apos;s be code artists! Write simple Python Turtle (or Penguin!) commands to make your penguin draw amazing pictures, colorful shapes, and cool icy patterns. Save your creations to Maximus&apos;s Igloo!
        </p>
      </header>
      <TurtleEditor />
    </div>
  );
}
