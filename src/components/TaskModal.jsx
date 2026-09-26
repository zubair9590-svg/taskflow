import { useEffect, useRef, useState } from 'react';
import { COLUMNS, PRIORITIES } from '../data.js';

const EMPTY_TASK = { title: '', description: '', priority: 'medium', due: '' };

export default function TaskModal({ task, status, onSave, onClose }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState(() => ({ ...EMPTY_TASK, status, ...task }));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();
    if (!title) return;
    onSave({ ...form, title, description: form.description.trim() });
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="task-modal-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form className="modal-body" onSubmit={handleSubmit}>
        <h2 id="task-modal-title">{task ? 'Edit task' : 'New task'}</h2>

        <label className="field">
          <span>Title</span>
          <input autoFocus required maxLength={80} value={form.title} onChange={update('title')} placeholder="What needs to be done?" />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea rows={3} maxLength={300} value={form.description} onChange={update('description')} placeholder="Add a few details (optional)" />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Priority</span>
            <select value={form.priority} onChange={update('priority')}>
              {PRIORITIES.map((value) => (
                <option key={value} value={value}>
                  {value[0].toUpperCase() + value.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Status</span>
            <select value={form.status} onChange={update('status')}>
              {COLUMNS.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Due date</span>
            <input type="date" value={form.due} onChange={update('due')} />
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn primary">
            {task ? 'Save changes' : 'Add task'}
          </button>
        </div>
      </form>
    </dialog>
  );
}
