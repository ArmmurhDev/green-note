'use client';

import { Toaster } from '@/components/ui/toaster';
import { NotesProvider } from './notes-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NotesProvider>
      {children}
      <Toaster />
    </NotesProvider>
  );
}
