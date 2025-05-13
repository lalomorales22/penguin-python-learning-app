'use server';
/**
 * @fileOverview An AI agent that suggests Python code snippets for Python Sprouts, focusing on Turtle graphics for young learners (ages 6-12).
 *
 * - suggestCode - A function that handles the code suggestion process.
 * - SuggestCodeInput - The input type for the suggestCode function.
 * - SuggestCodeOutput - The return type for the suggestCode function.
 */

import {ai} from '@/ai/genkit';
import {z}from 'genkit';

const SuggestCodeInputSchema = z.object({
  task: z.string().describe('The drawing or coding task the student (age 6-12) is trying to achieve with Python Turtle (e.g., "draw a red flower", "make the turtle spin").'),
});
export type SuggestCodeInput = z.infer<typeof SuggestCodeInputSchema>;

const SuggestCodeOutputSchema = z.object({
  codeSnippet: z.string().describe('A very simple Python Turtle code snippet (2-6 lines) that helps achieve the task, suitable for kids ages 6-12. Include `import turtle` and `turtle.done()` if appropriate for a complete, runnable small example.'),
  explanation: z.string().describe('A super child-friendly (ages 6-12) explanation of what the Python Turtle code does. Use simple words, fun analogies, and lots of encouragement. Explain how to try the code and see the turtle draw!'),
});
export type SuggestCodeOutput = z.infer<typeof SuggestCodeOutputSchema>;

export async function suggestCode(input: SuggestCodeInput): Promise<SuggestCodeOutput> {
  return suggestCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeSuggestionPromptSprouts',
  input: {schema: SuggestCodeInputSchema},
  output: {schema: SuggestCodeOutputSchema},
  prompt: `You are Sprout, a friendly and super helpful coding buddy for Python Sprouts! You're helping kids (ages 6-12) learn Python by drawing with the 'turtle' library. Your job is to give them very simple and fun Python Turtle code snippets.

IMPORTANT GUIDELINES:
- ALWAYS use the 'turtle' library for drawing tasks.
- Keep the code snippet VERY short, ideally 2-6 lines. If it's a complete small example, include \`import turtle\` and \`turtle.done()\` (or \`screen.mainloop()\` if you use \`screen = turtle.Screen()\`).
- Use extremely simple words and short sentences in your explanation.
- Be super encouraging and enthusiastic! Tell them they're doing a great job!
- Think like you're talking to a 7-year-old.
- Explain what each part of the code does in a fun way (e.g., "This line tells your turtle to take a big step forward!").
- Tell them to try the code and see what their turtle draws!
- Focus on tasks related to drawing shapes, using colors, or making the turtle move in simple ways.

The young coder wants to: {{{task}}}

Let's help them grow their coding skills! You can do it, little sprout!`,
});

const suggestCodeFlow = ai.defineFlow(
  {
    name: 'codeSuggestionFlowSprouts',
    inputSchema: SuggestCodeInputSchema,
    outputSchema: SuggestCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Ensure the code is formatted as a Python block if it's not already
    if (output && output.codeSnippet && !output.codeSnippet.trim().startsWith("```python")) {
        // Heuristic: if it's multiline and doesn't have backticks, add them.
        // Simple single lines might not need them if the LLM is consistent.
        if (output.codeSnippet.includes('\n')) {
             output.codeSnippet = "```python\n" + output.codeSnippet.trim() + "\n```";
        }
    }
    return output!;
  }
);
