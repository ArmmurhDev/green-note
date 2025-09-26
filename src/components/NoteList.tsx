'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import NoteCard from './NoteCard';
import type { Note } from '@/lib/types';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useNotes } from '@/hooks/use-notes';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const { searchTerm, setSearchTerm } = useNotes();
  return (
    <div className="flex flex-col h-full mt-4">
      <div className="relative mb-4 group-data-[collapsible=icon]:hidden">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search notes..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 pb-4">
          {notes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
