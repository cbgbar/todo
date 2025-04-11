import React from 'react';
import Todo from './Todo';
import './TodoList.css';

function TodoList({ todos, updateTodo, deleteTodo }) {
  return (
    <ul className="list-group mb-4">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;