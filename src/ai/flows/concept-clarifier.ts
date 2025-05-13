'use server';
/**
 * @fileOverview An AI agent that explains Python programming concepts in a child-friendly way for Penguin Python.
 *
 * - conceptClarifier - A function that explains a given concept.
 * - ConceptClarifierInput - The input type for the conceptClarifier function.
 * - ConceptClarifierOutput - The return type for the conceptClarifier function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConceptClarifierInputSchema = z.object({
  concept: z.string().describe('The Python programming concept to explain (e.g., "variable", "loop", "function", "list").'),
});
export type ConceptClarifierInput = z.infer<typeof ConceptClarifierInputSchema>;

const ConceptClarifierOutputSchema = z.object({
  explanation: z.string().describe('A super child-friendly (ages 6-12) explanation of the Python concept, using a penguin theme. Use simple words, short sentences, fun analogies (like penguins sliding, fish, igloos, snowflakes), and lots of enthusiasm!'),
  exampleCode: z.string().describe('A very simple, age-appropriate Python code snippet (1-4 lines) that clearly demonstrates the concept. Include a brief, fun explanation of what this specific code does and what the child might see or understand from it, related to penguins or simple actions.'),
});
export type ConceptClarifierOutput = z.infer<typeof ConceptClarifierOutputSchema>;

export async function conceptClarifier(input: ConceptClarifierInput): Promise<ConceptClarifierOutput> {
  return conceptClarifierFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conceptClarifierPromptPenguin',
  input: {schema: ConceptClarifierInputSchema},
  output: {schema: ConceptClarifierOutputSchema},
  prompt: `You are Professor Penguino, a super smart and friendly penguin guide for Penguin Python! Your mission is to explain Python programming concepts to young kids (ages 6-12) in a way that's incredibly fun, super easy to understand, and makes them excited to learn more about coding in the Antarctic!

IMPORTANT GUIDELINES:
- Use very, VERY simple words and short, punchy sentences. "Waddle-ful!", "That's ice cool!".
- Be incredibly enthusiastic and encouraging! Use lots of exclamation marks and positive words!
- Think like you're explaining something amazing to your favorite 6-year-old penguin chick.
- Use analogies kids can relate to, especially penguin-themed: penguins fishing, sliding on ice, building igloos, snowflakes, different types of fish. For example, a variable is like a labeled ice bucket where you can store a fish (or a number of fish) that might change. A loop is like a penguin waddling around a big snowball again and again.
- Make sure the example code is EXTREMELY simple (1-4 lines max) and directly shows the concept in action. It could be printing a message, a simple calculation, or a tiny turtle/penguin movement.
- For the example code, explain what the code does in a fun, simple way, and what the child might expect to see or learn from it. E.g., "This code makes your computer say 'Hello, Little Penguin!' See? It printed words on the screen, just like a penguin squawks!"
- Avoid jargon. If you absolutely must use a technical term (like "variable" or "loop"), explain it immediately in the simplest way possible using a penguin analogy.
- Your tone should be playful, energetic, and full of wonder, like discovering a new fish!

The Python concept a little penguin coder is curious about is: {{{concept}}}

Let's help this little penguin's coding knowledge slide to greatness! You're doing an amazing job, Professor Penguino! Brrrr-illiant!`,
});

const conceptClarifierFlow = ai.defineFlow(
  {
    name: 'conceptClarifierFlowPenguin',
    inputSchema: ConceptClarifierInputSchema,
    outputSchema: ConceptClarifierOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
     // Ensure the code is formatted as a Python block if it's not already
    if (output && output.exampleCode && !output.exampleCode.trim().startsWith("```python")) {
        if (output.exampleCode.includes('\n') || !output.exampleCode.trim().startsWith("print")) { // Add backticks if multiline or seems like a snippet
            output.exampleCode = "```python\n" + output.exampleCode.trim() + "\n```";
        }
    }
    return output!;
  }
);
