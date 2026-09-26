import { useEffect, useMemo, useState } from 'react';
import Column from './components/Column.jsx';
import TaskModal from './components/TaskModal.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { COLUMNS, SAMPLE_TASKS } from './data.js';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('taskflow:tasks', SAMPLE_TASKS);
  const [theme, setTheme] = useLocalStorage('taskflow:theme', 'dark');
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('all');
  const [editing, setEditing] = useState(null); // null, or { task?, status }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const visibleTasks = useMemo(() => {
    const text = query.trim().toLowerCase();
    return tasks.filter(
      (task) =>
        (priority === 'all' || task.priority === priority) &&
        (!text || `${task.title} ${task.description}`.toLowerCase().includes(text)),
    );
  }, [tasks, query, priority]);

  const doneCount = tasks.filter((task) => task.status === 'done').length;
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  function saveTask(data) {
    setTasks((current) =>
      data.id
        ? current.map((task) => (task.id === data.id ? { ...task, ...data } : task))
        : [...current, { ...data, id: crypto.randomUUID() }],
    );
    setEditing(null);
  }

  function moveTask(id, status) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, status } : task)));
  }

  function deleteTask(task) {
    if (window.confirm(`Delete "${task.title}"?`)) {
      setTasks((current) => current.filter((t) => t.id !== task.id));
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
          <div>
            <h1>TaskFlow</h1>
            <p className="subtitle">
              {doneCount} of {tasks.length} tasks done
            </p>
          </div>
        </div>

        <div className="toolbar">
          <input
            className="search"
            type="search"
            placeholder="Search tasks…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search tasks"
          />
          <select value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Filter by priority">
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            type="button"
            className="btn ghost square"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button type="button" className="btn primary" onClick={() => setEditing({ status: 'todo' })}>
            + New task
          </button>
        </div>
      </header>

      <div className="progress" role="progressbar" aria-label="Tasks completed" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <main className="board">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={visibleTasks.filter((task) => task.status === column.id)}
            onDropTask={moveTask}
            onAdd={(status) => setEditing({ status })}
            onEdit={(task) => setEditing({ task, status: task.status })}
            onDelete={deleteTask}
            onMove={moveTask}
          />
        ))}
      </main>

      {editing && (
        <TaskModal task={editing.task} status={editing.status} onSave={saveTask} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}
