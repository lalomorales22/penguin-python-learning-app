import ClarifierForm from '@/components/clarifier-form';
import { Lightbulb } from 'lucide-react';

export default function ClarifierPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-12 space-y-3">
        <Lightbulb className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Concept Clarifier
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Got a tricky Python term? Type it below and our AI friend will explain it in a super simple way!
        </p>
      </header>
      <ClarifierForm />
    </div>
  );
}
