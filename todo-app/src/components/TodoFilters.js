import React from 'react';
import './TodoFilters.css';

function TodoFilters({ filter, setFilter }) {
  return (
    <div className="btn-group">
      <button
        className={`btn btn-outline-primary ${filter === 'All' ? 'active' : ''}`}
        onClick={() => setFilter('All')}
      >
        All
      </button>
      <button
        className={`btn btn-outline-primary ${filter === 'Active' ? 'active' : ''}`}
        onClick={() => setFilter('Active')}
      >
        Active
      </button>
      <button
        className={`btn btn-outline-primary ${filter === 'Completed' ? 'active' : ''}`}
        onClick={() => setFilter('Completed')}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;