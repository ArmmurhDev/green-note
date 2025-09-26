"use client";

import { useContext } from 'react';
import { NotesContext, type NotesContextType } from '@/app/notes-provider';
import { useSidebar } from '@/components/ui/sidebar';

export const useNotes = (): NotesContextType & { setOpenMobile: (open: boolean) => void } => {
  const context = useContext(NotesContext);
  const sidebarContext = useSidebar();
  
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  return { ...context, setOpenMobile: sidebarContext?.setOpenMobile ?? (() => {}) };
};
