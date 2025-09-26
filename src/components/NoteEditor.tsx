'use client';

import React, { useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { Note } from '@/lib/types';
import { useNotes } from '@/hooks/use-notes';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Sparkles, X } from 'lucide-react';
import { suggestTagsAction } from '@/app/actions';
import TagBadge from './TagBadge';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface NoteEditorProps {
  note: Note;
}

export default function NoteEditor({ note }: NoteEditorProps) {
  const { addNote, updateNote, setEditingNoteId } = useNotes();
  const { toast } = useToast();
  const { register, handleSubmit, control, watch, setValue } = useForm<Note>({
    defaultValues: note,
  });
  const [isSuggesting, startSuggestionTransition] = useTransition();

  const currentTags = watch('tags');

  const onSubmit = (data: Note) => {
    if (note.id === 'new') {
      addNote(data);
    } else {
      updateNote(note.id, data);
    }
  };
  
  const handleSuggestTags = () => {
    const content = watch('content');
    if (!content) {
      toast({
        variant: 'destructive',
        title: 'Content needed',
        description: 'Please write some content before suggesting tags.',
      });
      return;
    }
    startSuggestionTransition(async () => {
      const suggestedTags = await suggestTagsAction(content);
      if (suggestedTags.length > 0) {
        const newTags = Array.from(new Set([...currentTags, ...suggestedTags]));
        setValue('tags', newTags);
        toast({
          title: 'Tags suggested!',
          description: 'We\'ve added some AI-suggested tags for you.',
        });
      } else {
        toast({
          title: 'No new tags found',
          description: 'We couldn\'t find any new tags to suggest.',
        });
      }
    });
  };

  const handleTagRemove = (tagToRemove: string) => {
    setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };
  
  const handleTagsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const input = e.currentTarget;
      const newTag = input.value.trim().replace(/,/g, '');
      if (newTag && !currentTags.includes(newTag)) {
        setValue('tags', [...currentTags, newTag]);
      }
      input.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="flex-none p-4 border-b flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">
          {note.id === 'new' ? 'Create Note' : 'Edit Note'}
        </h2>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="icon" onClick={() => setEditingNoteId(null)}>
            <X className="h-4 w-4" />
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input id="title" placeholder="Note title" {...register('title')} className="mt-1 text-2xl font-bold p-2 h-auto" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="content" className="text-sm font-medium">Content</label>
            </div>
            <Textarea
              id="content"
              placeholder="Start writing..."
              {...register('content')}
              className="min-h-[300px] text-base"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="tags" className="text-sm font-medium">Tags</label>
              <Button type="button" size="sm" variant="outline" onClick={handleSuggestTags} disabled={isSuggesting}>
                {isSuggesting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Suggest Tags
              </Button>
            </div>
            <div className="p-2 border rounded-md min-h-[40px] flex flex-wrap gap-2">
                {currentTags.map(tag => (
                  <TagBadge key={tag} tag={tag} onRemove={handleTagRemove} />
                ))}
                 <input
                  type="text"
                  onKeyDown={handleTagsKeyDown}
                  placeholder={currentTags.length === 0 ? "Add tags (press Enter)..." : ""}
                  className="flex-1 bg-transparent outline-none min-w-[150px]"
                />
            </div>
             <p className="text-xs text-muted-foreground mt-2">Separate tags with a comma or by pressing Enter.</p>
          </div>
        </div>
      </ScrollArea>
    </form>
  );
}
