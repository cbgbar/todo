import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import './TodoForm.css';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showDateInputs, setShowDateInputs] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(
      title,
      startTime || null,
      endTime || null
    );
    setTitle('');
    setStartTime('');
    setEndTime('');
    setShowDateInputs(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="form-control"
          required
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowDateInputs(!showDateInputs)}
        >
          <FaCalendarAlt />
        </button>
      </div>
      {showDateInputs && (
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
      )}
      <button type="submit" className="btn btn-primary w-100">
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;