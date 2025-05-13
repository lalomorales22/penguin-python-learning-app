'use server';
/**
 * @fileOverview An AI agent that suggests code snippets to help students write Python code.
 *
 * - suggestCode - A function that handles the code suggestion process.
 * - SuggestCodeInput - The input type for the suggestCode function.
 * - SuggestCodeOutput - The return type for the suggestCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCodeInputSchema = z.object({
  codeContext: z
    .string()
    .describe("The current code the user is working on.  This is important context for generating accurate code suggestions."),
  programmingTask: z.string().describe('The programming task the student is trying to accomplish.'),
  pythonVersion: z.string().describe('The version of python to use.'),
});
export type SuggestCodeInput = z.infer<typeof SuggestCodeInputSchema>;

const SuggestCodeOutputSchema = z.object({
  suggestedCode: z.string().describe('A code snippet that helps the student accomplish their programming task.'),
  explanation: z.string().describe('An explanation of the suggested code.'),
});
export type SuggestCodeOutput = z.infer<typeof SuggestCodeOutputSchema>;

export async function suggestCode(input: SuggestCodeInput): Promise<SuggestCodeOutput> {
  return suggestCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCodePrompt',
  input: {schema: SuggestCodeInputSchema},
  output: {schema: SuggestCodeOutputSchema},
  prompt: `You are a coding assistant helping a student write code.

The student is working on the following task: {{{programmingTask}}}

The student has written the following code so far:
\`\`\`python
{{{codeContext}}}
\`\`\`

Suggest a code snippet that helps the student accomplish their task. Explain the code snippet.

Your code suggestions should work with Python version {{{pythonVersion}}}.  Pay attention to the correct indentation.`,
});

const suggestCodeFlow = ai.defineFlow(
  {
    name: 'suggestCodeFlow',
    inputSchema: SuggestCodeInputSchema,
    outputSchema: SuggestCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
