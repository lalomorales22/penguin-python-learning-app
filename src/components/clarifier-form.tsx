'use client';

import { useState, type FormEvent } from 'react';
import { conceptClarifier } from '@/ai/flows/concept-clarifier';
import type { ConceptClarifierOutput } from '@/ai/flows/concept-clarifier';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Brain, MessageSquareQuote, FileText, Lightbulb } from 'lucide-react'; // Changed MessageSquareQuestion to MessageSquareQuote
import { PenguinIcon } from '@/components/icons/penguin-icon';

export default function ClarifierForm() {
  const [concept, setConcept] = useState('');
  const [result, setResult] = useState<ConceptClarifierOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!concept.trim()) {
      setError('Oops! Please type in a chilly Python word you want to know more about.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const aiResponse = await conceptClarifier({ concept });
      setResult(aiResponse);
    } catch (e) {
      console.error(e);
      setError('Uh oh! Professor Penguino\'s AI brain had a little snowball fight. Can you try asking again, please?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card rounded-xl shadow-xl kid-friendly-card">
        <div>
          <label htmlFor="concept-input" className="block text-xl font-medium text-foreground mb-3 flex items-center">
            <MessageSquareQuote className="mr-2 h-7 w-7 text-secondary" /> {/* Changed MessageSquareQuestion to MessageSquareQuote */}
            What chilly Python word are you curious about?
          </label>
          <Input
            id="concept-input"
            type="text"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="e.g., loop, variable, function"
            className="text-xl p-4 rounded-lg"
            aria-describedby={error ? "error-message" : undefined}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full text-xl py-4 kid-friendly-button bg-accent text-accent-foreground hover:bg-accent/90">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Professor Penguino is thinking...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-6 w-6" />
              Explain It, Professor!
            </>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" id="error-message" className="rounded-lg shadow-md p-5">
          <PenguinIcon className="h-6 w-6" /> {/* Using PenguinIcon */}
          <AlertTitle className="text-xl font-bold">Brrr! An Error!</AlertTitle>
          <AlertDescription className="text-lg">{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="shadow-2xl animate-fadeIn kid-friendly-card rounded-xl">
          <CardHeader className="bg-primary/10 rounded-t-xl p-6">
            <CardTitle className="text-3xl font-bold text-primary flex items-center">
              <Sparkles className="mr-3 h-8 w-8 text-secondary animate-pulse" />
              Professor Penguino on &quot;{concept}&quot;!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-3 flex items-center">
                <FileText className="mr-2 h-7 w-7 text-accent" />
                Here&apos;s what it means:
                </h3>
              <div className="text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed p-5 bg-secondary/10 rounded-lg shadow-inner">
                {result.explanation}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-3 flex items-center">
                <Lightbulb className="mr-2 h-7 w-7 text-accent" />
                 See it in action (Example Code):
                </h3>
              <pre className="bg-muted text-muted-foreground p-5 rounded-lg overflow-x-auto text-md font-mono shadow-inner">
                <code>{result.exampleCode}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
