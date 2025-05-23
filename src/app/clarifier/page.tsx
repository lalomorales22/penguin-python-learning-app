import ClarifierForm from '@/components/clarifier-form';
import { Brain } from 'lucide-react'; // Using Brain for concepts

export default function ClarifierPage() {
  return (
    <div className="container mx-auto py-10 px-4 spacious-padding">
      <header className="text-center mb-12 space-y-4">
        <Brain className="h-20 w-20 md:h-24 md:w-24 mx-auto text-secondary animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Professor Penguino&apos;s Python Explanations!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Stuck on a frosty Python word like &quot;loop,&quot; &quot;variable,&quot; or &quot;function&quot;? Don&apos;t worry! Professor Penguino, our super smart penguin friend, will explain it in a way that&apos;s super easy for young coders to understand!
        </p>
      </header>
      <ClarifierForm />
    </div>
  );
}
