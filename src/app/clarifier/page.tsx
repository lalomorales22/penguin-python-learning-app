import ClarifierForm from '@/components/clarifier-form';
import { Lightbulb } from 'lucide-react';

export default function ClarifierPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <header className="text-center mb-12 space-y-4">
        <Lightbulb className="h-20 w-20 md:h-24 md:w-24 mx-auto text-secondary animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Concept Helper!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Stuck on a Python word like &quot;loop&quot; or &quot;variable&quot;? No worries! Type it in, and our super smart AI friend will explain it in a way that&apos;s easy-peasy for kids!
        </p>
      </header>
      <ClarifierForm />
    </div>
  );
}
