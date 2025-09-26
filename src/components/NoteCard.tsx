'use client';

import type { Note } from '@/lib/types';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useNotes } from '@/hooks/use-notes';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const { selectNote, selectedNoteId } = useNotes();
  const isSelected = note.id === selectedNoteId;

  return (
    <div className="group-data-[collapsible=icon]:hidden md:group-data-[collapsible=icon]:block">
      <Card
        className={cn(
          'cursor-pointer transition-colors hover:bg-primary/10',
          isSelected && 'border-primary bg-primary/5'
        )}
        onClick={() => selectNote(note.id)}
      >
        <CardHeader className="p-4">
          <CardTitle className="text-base font-semibold truncate">{note.title || 'Untitled Note'}</CardTitle>
          <CardDescription className="text-xs truncate">
            {note.content.split('\n')[0] || 'No content'}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
