import { useState } from 'react';
import TaskCard from './TaskCard.jsx';

export default function Column({ column, tasks, onDropTask, onAdd, onEdit, onDelete, onMove }) {
  const [isOver, setIsOver] = useState(false);

  function handleDrop(event) {
    event.preventDefault();
    setIsOver(false);
    const id = event.dataTransfer.getData('text/plain');
    if (id) onDropTask(id, column.id);
  }

  return (
    <section
      className={`column${isOver ? ' is-over' : ''}`}
      style={{ '--accent': column.accent }}
      aria-label={column.title}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setIsOver(true);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOver(false);
      }}
      onDrop={handleDrop}
    >
      <header className="column-head">
        <span className="dot" aria-hidden="true" />
        <h2>{column.title}</h2>
        <span className="count">{tasks.length}</span>
        <button type="button" className="icon-btn" onClick={() => onAdd(column.id)} aria-label={`Add a task to ${column.title}`}>
          +
        </button>
      </header>

      <div className="column-body">
        {tasks.length === 0 ? (
          <p className="empty">Drop tasks here</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
          ))
        )}
      </div>
    </section>
  );
}
