'use server';
/**
 * @fileOverview An AI agent that suggests Python code snippets for Penguin Python, focusing on Turtle graphics for young learners (ages 6-12), with a penguin theme.
 *
 * - suggestCode - A function that handles the code suggestion process.
 * - SuggestCodeInput - The input type for the suggestCode function.
 * - SuggestCodeOutput - The return type for the suggestCode function.
 */

import {ai} from '@/ai/genkit';
import {z}from 'genkit';

const SuggestCodeInputSchema = z.object({
  task: z.string().describe('The drawing or coding task the student (age 6-12) is trying to achieve with Python Turtle, focusing on penguins or icy scenes (e.g., "draw a blue penguin", "make the penguin slide", "draw a snowflake").'),
});
export type SuggestCodeInput = z.infer<typeof SuggestCodeInputSchema>;

const SuggestCodeOutputSchema = z.object({
  codeSnippet: z.string().describe('A very simple Python Turtle code snippet (3-7 lines) that helps achieve the task, suitable for kids ages 6-12. Include `import turtle` and `turtle.done()` if appropriate for a complete, runnable small example. Should be penguin or ice/snow themed.'),
  explanation: z.string().describe('A super child-friendly (ages 6-12) explanation of what the Python Turtle code does, with a fun penguin theme. Use simple words, analogies about penguins, snow, or ice, and lots of encouragement. Explain how to try the code and see the penguin draw!'),
});
export type SuggestCodeOutput = z.infer<typeof SuggestCodeOutputSchema>;

export async function suggestCode(input: SuggestCodeInput): Promise<SuggestCodeOutput> {
  return suggestCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeSuggestionPromptPenguin',
  input: {schema: SuggestCodeInputSchema},
  output: {schema: SuggestCodeOutputSchema},
  prompt: `You are Captain Pengu, a super brave and helpful coding penguin for Penguin Python! You're helping kids (ages 6-12) learn Python by drawing with the 'turtle' library, making cool penguin pictures and icy scenes. Your job is to give them very simple and fun Python Turtle code snippets.

IMPORTANT GUIDELINES:
- ALWAYS use the 'turtle' library for drawing tasks.
- Keep the code snippet VERY short, ideally 3-7 lines. If it's a complete small example, include \`import turtle\` and \`turtle.done()\` (or \`screen.mainloop()\` if you use \`screen = turtle.Screen()\`).
- Use extremely simple words and short sentences in your explanation. Think like you're talking to a 6-year-old!
- Be super encouraging and enthusiastic! "You're a Pawesome Coder!", "Waddle on, that's great!".
- Explain what each part of the code does in a fun, penguin-themed way (e.g., "This line tells your turtle to slide forward on the ice!").
- Tell them to try the code and see what their penguin draws!
- Focus on tasks related to drawing penguins, snowflakes, igloos, or making the turtle move in simple, fun ways.
- If they ask for something complex, simplify it to a very basic version suitable for a 6-12 year old first-time coder.

The young coder wants to: {{{task}}}

Let's help them on their coding expedition! You can do it, little penguin chick! Brrr-illiant!`,
});

const suggestCodeFlow = ai.defineFlow(
  {
    name: 'codeSuggestionFlowPenguin',
    inputSchema: SuggestCodeInputSchema,
    outputSchema: SuggestCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Ensure the code is formatted as a Python block if it's not already
    if (output && output.codeSnippet && !output.codeSnippet.trim().startsWith("```python")) {
        if (output.codeSnippet.includes('\n') || !output.codeSnippet.trim().startsWith("import turtle")) { // Add backticks if multiline or seems like a snippet
             output.codeSnippet = "```python\n" + output.codeSnippet.trim() + "\n```";
        }
    }
    return output!;
  }
);
