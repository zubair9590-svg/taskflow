import { COLUMNS, isoDate } from '../data.js';

const PRIORITY_LABELS = { high: 'High', medium: 'Medium', low: 'Low' };

function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  const index = COLUMNS.findIndex((column) => column.id === task.status);
  const previous = COLUMNS[index - 1];
  const next = COLUMNS[index + 1];
  const overdue = Boolean(task.due) && task.status !== 'done' && task.due < isoDate();

  return (
    <article
      className="card"
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', task.id);
        event.dataTransfer.effectAllowed = 'move';
      }}
    >
      <div className="card-meta">
        <span className={`tag tag-${task.priority}`}>{PRIORITY_LABELS[task.priority]}</span>
        {task.due && (
          <span className={`due${overdue ? ' is-overdue' : ''}`}>
            {overdue ? 'Overdue · ' : ''}
            {formatDate(task.due)}
          </span>
        )}
      </div>

      <h3 className="card-title">{task.title}</h3>
      {task.description && <p className="card-text">{task.description}</p>}

      <div className="card-actions">
        <button
          type="button"
          className="icon-btn"
          disabled={!previous}
          onClick={() => onMove(task.id, previous.id)}
          aria-label={previous ? `Move to ${previous.title}` : 'Already in the first column'}
        >
          ←
        </button>
        <button
          type="button"
          className="icon-btn"
          disabled={!next}
          onClick={() => onMove(task.id, next.id)}
          aria-label={next ? `Move to ${next.title}` : 'Already in the last column'}
        >
          →
        </button>
        <span className="spacer" />
        <button type="button" className="text-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" className="text-btn danger" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </article>
  );
}
