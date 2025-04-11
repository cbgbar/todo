import React from 'react';

function TodoCounter({ todos }) {
  const activeCount = todos.filter((todo) => todo.status === 'ONGOING').length;
  return (
    <span className="badge bg-info text-dark">
      {activeCount} item{activeCount !== 1 ? 's' : ''} left
    </span>
  );
}

export default TodoCounter;