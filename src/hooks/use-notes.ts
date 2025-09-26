
"use client";

import { useContext } from 'react';
import { NotesContext, type NotesContextType } from '@/app/notes-provider';

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  return context;
};
