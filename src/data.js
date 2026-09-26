export const COLUMNS = [
  { id: 'todo', title: 'To do', accent: '#8b5cf6' },
  { id: 'doing', title: 'In progress', accent: '#f59e0b' },
  { id: 'done', title: 'Done', accent: '#10b981' },
];

export const PRIORITIES = ['high', 'medium', 'low'];

/** Local calendar date as YYYY-MM-DD, `offset` days from today. */
export function isoDate(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export const SAMPLE_TASKS = [
  {
    id: 'sample-1',
    title: 'Design the landing page',
    description: 'Wireframes first, then a high-fidelity mockup in Figma.',
    priority: 'high',
    status: 'doing',
    due: isoDate(2),
  },
  {
    id: 'sample-2',
    title: 'Set up the React project',
    description: 'Vite, folder structure and a basic component library.',
    priority: 'medium',
    status: 'done',
    due: '',
  },
  {
    id: 'sample-3',
    title: 'Pick a color palette',
    description: 'Check contrast ratios for accessibility (WCAG AA).',
    priority: 'medium',
    status: 'done',
    due: '',
  },
  {
    id: 'sample-4',
    title: 'Build the contact form',
    description: 'Validation, loading state and a friendly success message.',
    priority: 'high',
    status: 'todo',
    due: isoDate(5),
  },
  {
    id: 'sample-5',
    title: 'Write the README',
    description: 'Screenshots, features and how to run the project locally.',
    priority: 'low',
    status: 'todo',
    due: '',
  },
];
