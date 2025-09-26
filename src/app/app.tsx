'use client';

import { useNotes } from '@/hooks/use-notes';
import NoteList from '@/components/NoteList';
import NoteEditor from '@/components/NoteEditor';
import NoteView from '@/components/NoteView';
import Welcome from '@/components/Welcome';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { FilePlus2, Notebook } from 'lucide-react';
import { useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function App() {
  const { notes, selectedNoteId, editingNoteId, searchTerm, setEditingNoteId, setOpenMobile } = useNotes();
  const isMobile = useIsMobile();

  const selectedNote = useMemo(() => notes.find(n => n.id === selectedNoteId), [notes, selectedNoteId]);
  
  const editingNote = useMemo(() => {
    if (editingNoteId === 'new') {
      return { id: 'new', title: '', content: '', tags: [], createdAt: '', updatedAt: '' };
    }
    return notes.find(n => n.id === editingNoteId);
  }, [notes, editingNoteId]);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const lowercasedTerm = searchTerm.toLowerCase();
      return (
        note.title.toLowerCase().includes(lowercasedTerm) ||
        note.content.toLowerCase().includes(lowercasedTerm) ||
        note.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
      );
    });
  }, [notes, searchTerm]);

  const handleNewNoteClick = () => {
    setEditingNoteId('new');
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
      <div className="flex w-full">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2 justify-between group-data-[collapsible=icon]:justify-center">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Notebook className="size-5" />
                </Button>
                <h1 className="text-lg font-bold group-data-[collapsible=icon]:hidden">GreenNotes</h1>
              </div>
              <SidebarTrigger className="group-data-[collapsible=icon]:hidden md:flex" />
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <Button onClick={handleNewNoteClick} className="w-full justify-start" size="lg">
              <FilePlus2 />
              <span className="group-data-[collapsible=icon]:hidden">New Note</span>
            </Button>
            <NoteList notes={filteredNotes} />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
             <div className="p-4 md:hidden flex items-center justify-between">
                <h1 className="text-lg font-bold">GreenNotes</h1>
                <SidebarTrigger />
            </div>
          <main className="h-full">
            {editingNoteId ? (
              <NoteEditor note={editingNote!} />
            ) : selectedNote ? (
              <NoteView note={selectedNote} />
            ) : (
              <Welcome />
            )}
          </main>
        </SidebarInset>
      </div>
  );
}
