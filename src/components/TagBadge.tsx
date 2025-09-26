'use client';

import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagBadgeProps {
  tag: string;
  onRemove?: (tag: string) => void;
}

export default function TagBadge({ tag, onRemove }: TagBadgeProps) {
  return (
    <Badge variant="secondary" className="py-1 px-2 text-sm font-normal">
      {tag}
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(tag)}
          className="ml-2 rounded-full hover:bg-destructive/20 p-0.5"
          aria-label={`Remove tag ${tag}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}
