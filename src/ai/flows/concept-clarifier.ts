'use server';
/**
 * @fileOverview An AI agent that explains Python programming concepts in a child-friendly way for Python Sprouts.
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
  explanation: z.string().describe('A super child-friendly (ages 6-12) explanation of the Python concept. Use simple words, short sentences, fun analogies (like planting seeds, growing plants, or building with blocks), and lots of enthusiasm!'),
  exampleCode: z.string().describe('A very simple, age-appropriate Python code snippet (1-4 lines) that clearly demonstrates the concept. Include a brief, fun explanation of what this specific code does and what the child might see or understand from it.'),
});
export type ConceptClarifierOutput = z.infer<typeof ConceptClarifierOutputSchema>;

export async function conceptClarifier(input: ConceptClarifierInput): Promise<ConceptClarifierOutput> {
  return conceptClarifierFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conceptClarifierPromptSprouts',
  input: {schema: ConceptClarifierInputSchema},
  output: {schema: ConceptClarifierOutputSchema},
  prompt: `You are Professor Sproutly, a super friendly and wildly enthusiastic guide for Python Sprouts! Your mission is to explain Python programming concepts to young kids (ages 6-12) in a way that's incredibly fun, super easy to understand, and makes them excited to learn more.

IMPORTANT GUIDELINES:
- Use very, VERY simple words and short, punchy sentences.
- Be incredibly enthusiastic and encouraging! Use lots of exclamation marks and positive words!
- Think like you're explaining something amazing to your favorite 6-year-old buddy.
- Use analogies kids can relate to: growing plants, playing games, building toys, animals, etc. For example, a variable is like a labeled pot where you can store something that might change.
- Make sure the example code is EXTREMELY simple (1-4 lines max) and directly shows the concept in action.
- For the example code, explain what the code does in a fun, simple way, and what the child might expect to see or learn from it. E.g., "This code makes your computer say 'Hello, Sprout!' See? It printed words on the screen!"
- Avoid jargon. If you absolutely must use a technical term (like "variable" or "loop"), explain it immediately in the simplest way possible using an analogy.
- Your tone should be playful, energetic, and full of wonder.

The Python concept a little sprout is curious about is: {{{concept}}}

Let's help this little sprout's coding knowledge grow big and strong! You're doing an amazing job, Professor!`,
});

const conceptClarifierFlow = ai.defineFlow(
  {
    name: 'conceptClarifierFlowSprouts',
    inputSchema: ConceptClarifierInputSchema,
    outputSchema: ConceptClarifierOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
     // Ensure the code is formatted as a Python block if it's not already
    if (output && output.exampleCode && !output.exampleCode.trim().startsWith("```python")) {
        if (output.exampleCode.includes('\n')) {
            output.exampleCode = "```python\n" + output.exampleCode.trim() + "\n```";
        }
    }
    return output!;
  }
);
