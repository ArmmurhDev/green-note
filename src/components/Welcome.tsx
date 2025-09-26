'use client';

import { useNotes } from '@/hooks/use-notes';
import { Button } from './ui/button';
import { FilePlus2, Notebook } from 'lucide-react';

export default function Welcome() {
    const { setEditingNoteId } = useNotes();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <Notebook className="h-24 w-24 text-primary/50 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Welcome to GreenNotes</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Select a note from the list on the left to view its content, or create a new note to start capturing your thoughts.
      </p>
      <Button onClick={() => setEditingNoteId('new')}>
        <FilePlus2 className="mr-2 h-4 w-4" />
        Create a New Note
      </Button>
    </div>
  );
}
