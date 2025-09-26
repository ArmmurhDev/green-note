'use server';
/**
 * @fileOverview An AI agent that suggests relevant tags for a note based on its content.
 *
 * - suggestTagsForNote - A function that suggests tags for a note.
 * - SuggestTagsForNoteInput - The input type for the suggestTagsForNote function.
 * - SuggestTagsForNoteOutput - The return type for the suggestTagsForNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTagsForNoteInputSchema = z.object({
  noteContent: z.string().describe('The content of the note.'),
});
export type SuggestTagsForNoteInput = z.infer<typeof SuggestTagsForNoteInputSchema>;

const SuggestTagsForNoteOutputSchema = z.object({
  tags: z.array(z.string()).describe('The suggested tags for the note.'),
});
export type SuggestTagsForNoteOutput = z.infer<typeof SuggestTagsForNoteOutputSchema>;

export async function suggestTagsForNote(input: SuggestTagsForNoteInput): Promise<SuggestTagsForNoteOutput> {
  return suggestTagsForNoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTagsForNotePrompt',
  input: {schema: SuggestTagsForNoteInputSchema},
  output: {schema: SuggestTagsForNoteOutputSchema},
  prompt: `You are a tagging expert. Given the content of a note, you will suggest relevant tags for the note.

Note Content: {{{noteContent}}}

Suggested Tags:`,
});

const suggestTagsForNoteFlow = ai.defineFlow(
  {
    name: 'suggestTagsForNoteFlow',
    inputSchema: SuggestTagsForNoteInputSchema,
    outputSchema: SuggestTagsForNoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
