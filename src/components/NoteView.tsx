'use client';

import type { Note } from '@/lib/types';
import { useNotes } from '@/hooks/use-notes';
import { Button } from './ui/button';
import { FilePenLine, Trash2 } from 'lucide-react';
import TagBadge from './TagBadge';
import { ScrollArea } from './ui/scroll-area';
import { format } from 'date-fns';

interface NoteViewProps {
  note: Note;
}

export default function NoteView({ note }: NoteViewProps) {
  const { setEditingNoteId, deleteNote } = useNotes();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-4 border-b flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{note.title || 'Untitled Note'}</h2>
          <p className="text-xs text-muted-foreground">
            Last updated: {format(new Date(note.updatedAt), "PPP p")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => deleteNote(note.id)}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
          <Button onClick={() => setEditingNoteId(note.id)}>
            <FilePenLine className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-6">
          <article className="prose prose-stone dark:prose-invert max-w-none text-foreground">
            {note.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
          </article>
          
          {note.tags && note.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
