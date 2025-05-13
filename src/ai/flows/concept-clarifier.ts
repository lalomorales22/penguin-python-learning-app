'use server';
/**
 * @fileOverview An AI agent that explains Python programming concepts in a child-friendly way.
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
  explanation: z.string().describe('A child-friendly explanation of the concept.'),
  exampleCode: z.string().describe('An age-appropriate example code snippet.'),
});
export type ConceptClarifierOutput = z.infer<typeof ConceptClarifierOutputSchema>;

export async function conceptClarifier(input: ConceptClarifierInput): Promise<ConceptClarifierOutput> {
  return conceptClarifierFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conceptClarifierPrompt',
  input: {schema: ConceptClarifierInputSchema},
  output: {schema: ConceptClarifierOutputSchema},
  prompt: `You are a friendly AI tutor specializing in explaining Python programming concepts to children aged 6-12. Explain the concept in a simple, age-appropriate manner. Provide an example code snippet that demonstrates the concept. 

Concept: {{{concept}}}`,
});

const conceptClarifierFlow = ai.defineFlow(
  {
    name: 'conceptClarifierFlow',
    inputSchema: ConceptClarifierInputSchema,
    outputSchema: ConceptClarifierOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
