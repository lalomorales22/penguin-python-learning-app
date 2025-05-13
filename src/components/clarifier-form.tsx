'use client';

import { useState, type FormEvent } from 'react';
import { conceptClarifier } from '@/ai/flows/concept-clarifier';
import type { ConceptClarifierOutput } from '@/ai/flows/concept-clarifier';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Terminal } from 'lucide-react';

export default function ClarifierForm() {
  const [concept, setConcept] = useState('');
  const [result, setResult] = useState<ConceptClarifierOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!concept.trim()) {
      setError('Please enter a Python concept to clarify.');
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
      setError('Oops! Something went wrong while clarifying the concept. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-card rounded-lg shadow-lg">
        <div>
          <label htmlFor="concept-input" className="block text-lg font-medium text-foreground mb-2">
            What Python concept do you want to understand?
          </label>
          <Input
            id="concept-input"
            type="text"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="e.g., loops, variables, functions"
            className="text-lg p-3"
            aria-describedby={error ? "error-message" : undefined}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full text-lg py-3 bg-accent text-accent-foreground hover:bg-accent/90">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Clarifying...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Clarify Concept
            </>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" id="error-message">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="shadow-xl animate-fadeIn">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary flex items-center">
              <Sparkles className="mr-3 h-8 w-8 text-secondary" />
              Here&apos;s the scoop on &quot;{concept}&quot;!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">Explanation:</h3>
              <p className="text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed p-4 bg-secondary/10 rounded-md">
                {result.explanation}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">Example Code:</h3>
              <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto text-sm font-mono shadow-inner">
                <code>{result.exampleCode}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
