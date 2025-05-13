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
  codeSnippet: z.string().describe('A very simple Python Turtle code snippet (3-10 lines) that helps achieve the task, suitable for kids ages 6-12. This MUST be raw Python code only, without any markdown formatting. Include `import turtle` and necessary setup. Do NOT include `turtle.done()` or `screen.mainloop()`. Should be penguin or ice/snow themed.'),
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
  prompt: `You are Captain Pengu, a super brave and helpful coding penguin for Penguin Python! You're helping kids (ages 6-12) learn Python by drawing with the 'turtle' library, making cool penguin pictures and icy scenes. Your job is to give them very simple and fun Python Turtle code snippets and explanations.

IMPORTANT GUIDELINES:
- ALWAYS use the 'turtle' library for drawing tasks.
- The 'codeSnippet' MUST be raw Python code ONLY. Do NOT include markdown formatting like \`\`\`python ... \`\`\` or any other text outside the code.
- Do NOT include \`turtle.done()\` or \`screen.mainloop()\` in the \`codeSnippet\`, as it will be run in a special browser environment (Skulpt).
- ALWAYS include \`import turtle\` and any necessary setup like \`pen = turtle.Turtle()\` in the \`codeSnippet\`.
- Keep the \`codeSnippet\` VERY short and simple, ideally 3-10 lines.
- Use extremely simple words and short sentences in your 'explanation'. Think like you're talking to a 6-year-old!
- Be super encouraging and enthusiastic! "You're a Pawesome Coder!", "Waddle on, that's great!".
- Explain what each part of the code does in a fun, penguin-themed way in the 'explanation' (e.g., "This line tells your turtle to slide forward on the ice!").
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
    // Ensure the code snippet is just the raw code, removing any potential markdown artifacts if the model misbehaves.
    if (output && output.codeSnippet) {
        let rawCode = output.codeSnippet;
        const pythonBlockRegex = /```python\n([\s\S]*?)\n```/;
        const match = pythonBlockRegex.exec(rawCode);
        if (match && match[1]) {
            rawCode = match[1];
        }
        // Further strip any leading/trailing backticks if they are not part of a block
        rawCode = rawCode.replace(/^```python\s*|```\s*$/g, '').trim();
        output.codeSnippet = rawCode;
    }
    return output!;
  }
);
