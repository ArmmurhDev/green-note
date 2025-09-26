"use client";

import React, { createContext, useState, useCallback, useMemo } from 'react';
import type { Note } from '@/lib/types';
import { initialNotes } from '@/lib/data';
import { generateId } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export interface NotesContextType {
  notes: Note[];
  selectedNoteId: string | null;
  editingNoteId: string | null;
  searchTerm: string;
  addNote: (note: Pick<Note, 'title' | 'content' | 'tags'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  selectNote: (id: string | null) => void;
  setEditingNoteId: (id: string | null) => void;
  setSearchTerm: (term: string) => void;
}

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(initialNotes[0]?.id ?? null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const addNote = useCallback((note: Pick<Note, 'title' | 'content' | 'tags'>) => {
    const newNote: Note = {
      ...note,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setSelectedNoteId(newNote.id);
    setEditingNoteId(null);
    toast({ title: "Note created", description: "Your new note has been saved." });
  }, [toast]);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note
      )
    );
    setEditingNoteId(null);
    toast({ title: "Note updated", description: "Your changes have been saved." });
  }, [toast]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prevNotes => {
      const newNotes = prevNotes.filter(note => note.id !== id);
      if (selectedNoteId === id) {
        setSelectedNoteId(newNotes[0]?.id ?? null);
      }
      return newNotes;
    });
    toast({ variant: "destructive", title: "Note deleted", description: "Your note has been moved to the trash." });
  }, [selectedNoteId, toast]);

  const selectNote = useCallback((id: string | null) => {
    if (editingNoteId) return;
    setSelectedNoteId(id);
  }, [editingNoteId]);

  const contextValue = useMemo(
    () => ({
      notes,
      selectedNoteId,
      editingNoteId,
      searchTerm,
      addNote,
      updateNote,
      deleteNote,
      selectNote,
      setEditingNoteId,
      setSearchTerm,
    }),
    [notes, selectedNoteId, editingNoteId, searchTerm, addNote, updateNote, deleteNote, selectNote]
  );

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
}
