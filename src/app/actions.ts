'use server';
import { suggestTagsForNote } from '@/ai/flows/suggest-tags-for-note';

export async function suggestTagsAction(noteContent: string): Promise<string[]> {
  try {
    if (!noteContent.trim()) {
      return [];
    }
    const result = await suggestTagsForNote({ noteContent });
    return result.tags;
  } catch (error) {
    console.error('Error suggesting tags:', error);
    return [];
  }
}
