import type { Note } from './types';

export const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Meeting Notes 2024-07-26',
    content: '- Discussed Q3 roadmap.\n- Finalized marketing budget.\n- Assigned action items for the new campaign.',
    tags: ['work', 'meeting', 'q3'],
    createdAt: new Date('2024-07-26T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-26T10:30:00Z').toISOString(),
  },
  {
    id: '2',
    title: 'Grocery List',
    content: '- Milk\n- Bread\n- Eggs\n- Avocados\n- Spinach',
    tags: ['personal', 'shopping'],
    createdAt: new Date('2024-07-25T18:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-25T18:05:00Z').toISOString(),
  },
  {
    id: '3',
    title: 'React Code Snippet',
    content: '```javascript\nimport React, { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```',
    tags: ['code', 'react', 'javascript'],
    createdAt: new Date('2024-07-24T14:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-24T14:00:00Z').toISOString(),
  },
    {
    id: '4',
    title: 'Brainstorming: New App Idea',
    content: 'A note-taking app with AI-powered tagging and a minimalist, pastel green UI. Features: create, edit, search, tagging. Simple and intuitive.',
    tags: ['ideas', 'project', 'app'],
    createdAt: new Date('2024-07-23T11:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-23T11:20:00Z').toISOString(),
  },
];
