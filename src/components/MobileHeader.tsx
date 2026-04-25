'use client';

import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';

interface MobileHeaderProps {
  title: React.ReactNode;
  children?: React.ReactNode;
}

export function MobileHeader({ title, children }: MobileHeaderProps) {
  return (
    <div className="flex-none p-4 border-b flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 min-w-0">
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <PanelLeft />
          </Button>
        </SheetTrigger>
        <div className="text-lg font-bold truncate">{title}</div>
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  );
}
