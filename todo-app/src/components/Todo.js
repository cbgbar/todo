import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './Todo.css';

function Todo({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleStatusChange = (newStatus) => {
    updateTodo(todo.id, { ...todo, status: newStatus });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = (e) => {
    if (e.key === 'Enter' && editTitle.trim()) {
      updateTodo(todo.id, { ...todo, title: editTitle });
      setIsEditing(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'ONGOING':
        return 'bg-warning text-dark';
      case 'COMPLETED':
        return 'bg-success';
      case 'INCOMPLETE':
        return 'bg-secondary';
      case 'FAILED':
        return 'bg-danger';
      default:
        return 'bg-light';
    }
  };

  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleEditSubmit}
          className="form-control"
          autoFocus
        />
      ) : (
        <>
          <div className="d-flex align-items-center flex-grow-1">
            <span
              className={`badge me-2 ${getStatusBadgeClass(todo.status)}`}
            >
              {todo.status}
            </span>
            <span
              onDoubleClick={handleDoubleClick}
              className={`todo-title flex-grow-1 ${todo.status !== 'ONGOING' ? 'text-muted' : ''}`}
            >
              {todo.title}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <small className="text-muted me-3">
              Start: {new Date(todo.startTime).toLocaleString()}
              {todo.endTime && ` | End: ${new Date(todo.endTime).toLocaleString()}`}
              {todo.completedTime && ` | Done: ${new Date(todo.completedTime).toLocaleString()}`}
            </small>
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="form-select form-select-sm me-2"
            >
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
              <option value="INCOMPLETE">Incomplete</option>
              <option value="FAILED">Failed</option>
            </select>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline-primary btn-sm me-2"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="btn btn-outline-danger btn-sm"
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default Todo;