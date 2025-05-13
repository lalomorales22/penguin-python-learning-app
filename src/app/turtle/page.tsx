import TurtleEditor from '@/components/turtle-editor';
import { TurtleIcon } from '@/components/icons/turtle-icon'; // Assuming this is still the desired icon
import { Palette } from 'lucide-react';


export default function TurtlePage() {
  return (
    <div className="container mx-auto py-8 px-4 spacious-padding">
      <header className="text-center mb-12 space-y-4">
        {/* Using Palette as a more generic drawing icon, or keep TurtleIcon if preferred */}
        <Palette className="h-20 w-20 md:h-24 md:w-24 mx-auto text-primary animate-bounceIn" /> 
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Turtle Drawing Fun!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Let&apos;s be code artists! Write simple Python Turtle commands to make your turtle draw amazing pictures, colorful shapes, and cool patterns. Save your creations to your Learner&apos;s Space!
        </p>
      </header>
      <TurtleEditor />
    </div>
  );
}
