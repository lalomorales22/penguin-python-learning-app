import TurtleEditor from '@/components/turtle-editor';
import { TurtleIcon } from '@/components/icons/turtle-icon';

export default function TurtlePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-12 space-y-3">
        <TurtleIcon className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Turtle Showcase
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Bring your imagination to life with Python Turtle! Write code to draw colorful shapes and patterns, then save your creations to your portfolio.
        </p>
      </header>
      <TurtleEditor />
    </div>
  );
}
