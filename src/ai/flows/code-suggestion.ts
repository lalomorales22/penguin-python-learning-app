'use server';
/**
 * @fileOverview An AI agent that suggests code snippets to help young students (ages 6-12) write Python code for Penguin Python.
 *
 * - suggestCode - A function that handles the code suggestion process.
 * - SuggestCodeInput - The input type for the suggestCode function.
 * - SuggestCodeOutput - The return type for the suggestCode function.
 */

import {ai} from '@/ai/genkit';
import {z}from 'genkit';

const SuggestCodeInputSchema = z.object({
  task: z.string().describe('The coding task or goal the student is trying to achieve (e.g., "draw a blue square", "make a penguin move").'),
});
export type SuggestCodeInput = z.infer<typeof SuggestCodeInputSchema>;

const SuggestCodeOutputSchema = z.object({
  codeSnippet: z.string().describe('A very simple Python code snippet that helps achieve the task, suitable for kids ages 6-12, focusing on drawing or simple animations.'),
  explanation: z.string().describe('A super child-friendly (ages 6-12) explanation of what the code does, using simple words, fun analogies, and encouragement. Explain how to run the code and see the result.'),
});
export type SuggestCodeOutput = z.infer<typeof SuggestCodeOutputSchema>;

export async function suggestCode(input: SuggestCodeInput): Promise<SuggestCodeOutput> {
  return suggestCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeSuggestionPromptPenguin',
  input: {schema: SuggestCodeInputSchema},
  output: {schema: SuggestCodeOutputSchema},
  prompt: `You are a friendly and helpful Penguin Pal, an AI coding assistant for kids (ages 6-12) learning Python! Your job is to give them super simple and fun Python code snippets that they can use to draw pictures or make things move.

IMPORTANT:
- Use very simple words and short sentences.
- Be super encouraging! Tell them they're doing great!
- Think like you're talking to a 7-year-old.
- If the task involves drawing, use the 'turtle' library.
- Make sure the code snippet is VERY short, maybe just 2-5 lines at most.
- Explain what the code does in a fun way, like "This code tells the penguin to draw a line!"
- Tell them how to run the code and see what happens!
- Focus on tasks related to drawing or simple animations.

Coding Task: {{{task}}}

Let's code something amazing! Waddle on!`,
});

const suggestCodeFlow = ai.defineFlow(
  {
    name: 'codeSuggestionFlowPenguin',
    inputSchema: SuggestCodeInputSchema,
    outputSchema: SuggestCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
