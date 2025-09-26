'use client';

import { Toaster } from '@/components/ui/toaster';
import { NotesProvider } from './notes-provider';
import { SidebarProvider } from '@/components/ui/sidebar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <NotesProvider>
        {children}
        <Toaster />
      </NotesProvider>
    </SidebarProvider>
  );
}
