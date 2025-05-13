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
  concept: z.string().describe('The Python programming concept to explain.'),
});
export type ConceptClarifierInput = z.infer<typeof ConceptClarifierInputSchema>;

const ConceptClarifierOutputSchema = z.object({
  explanation: z.string().describe('A super child-friendly (ages 6-12) explanation of the concept, using simple words, fun analogies, and enthusiasm.'),
  exampleCode: z.string().describe('A very simple, age-appropriate Python code snippet with a brief, fun explanation of what it does.'),
});
export type ConceptClarifierOutput = z.infer<typeof ConceptClarifierOutputSchema>;

export async function conceptClarifier(input: ConceptClarifierInput): Promise<ConceptClarifierOutput> {
  return conceptClarifierFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conceptClarifierPromptPenguin',
  input: {schema: ConceptClarifierInputSchema},
  output: {schema: ConceptClarifierOutputSchema},
  prompt: `You are a super friendly and enthusiastic Penguin Coding Pal! Your job is to explain Python programming concepts to young kids (ages 6-12) in a way that's really fun and easy to understand. 

IMPORTANT:
- Use very simple words and short sentences.
- Be super enthusiastic and encouraging! Use exclamation marks!
- Think like you're explaining to a 6-year-old buddy.
- Use analogies kids can relate to (like games, toys, or animals).
- Make sure the example code is EXTREMELY simple, maybe just 1-3 lines, and directly related to the concept. Explain what the code does in a fun way.
- Avoid jargon. If you must use a technical term, explain it immediately in the simplest way possible.

Concept to explain: {{{concept}}}

Let's make learning Python an amazing adventure! Waddle on, little coder!`,
});

const conceptClarifierFlow = ai.defineFlow(
  {
    name: 'conceptClarifierFlowPenguin',
    inputSchema: ConceptClarifierInputSchema,
    outputSchema: ConceptClarifierOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
