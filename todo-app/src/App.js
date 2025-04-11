import React, { useState, useEffect } from 'react';
import api from './config'; // Đảm bảo import đúng từ config.js
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoCounter from './components/TodoCounter';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get(''); // Sử dụng api từ config.js
      setTodos(response.data);
      setError(null);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách todo:', error);
      setError('Không thể lấy danh sách todo. Vui lòng kiểm tra API Key.');
    }
  };

  const addTodo = async (title, startTime, endTime) => {
    if (!title.trim()) return;
    try {
      const response = await api.post('', {
        title,
        status: 'ONGOING',
        startTime: startTime || new Date().toISOString(),
        endTime: endTime || null,
      });
      setTodos([...todos, response.data]);
      setError(null);
    } catch (error) {
      console.error('Lỗi khi thêm todo:', error);
      setError('Không thể thêm todo. Vui lòng kiểm tra API Key.');
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await api.put(`/${id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      setError(null);
    } catch (error) {
      console.error('Lỗi khi cập nhật todo:', error);
      setError('Không thể cập nhật todo. Vui lòng kiểm tra API Key.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
      setError(null);
    } catch (error) {
      console.error('Lỗi khi xóa todo:', error);
      setError('Không thể xóa todo. Vui lòng kiểm tra API Key.');
    }
  };

  const clearCompleted = async () => {
    try {
      await api.delete('/completed');
      setTodos(todos.filter((todo) => todo.status !== 'COMPLETED'));
      setError(null);
    } catch (error) {
      console.error('Lỗi khi xóa các todo đã hoàn thành:', error);
      setError('Không thể xóa các todo đã hoàn thành. Vui lòng kiểm tra API Key.');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Active') return todo.status === 'ONGOING';
    if (filter === 'Completed') return todo.status === 'COMPLETED';
    return true; // All
  });

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white text-center">
          <h1 className="mb-0">Todo App</h1>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <TodoForm addTodo={addTodo} />
          <TodoList todos={filteredTodos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
          <div className="d-flex justify-content-between align-items-center mt-4">
            <TodoCounter todos={todos} />
            <TodoFilters filter={filter} setFilter={setFilter} />
            {todos.some((todo) => todo.status === 'COMPLETED') && (
              <button className="btn btn-outline-danger btn-sm" onClick={clearCompleted}>
                Xóa các todo đã hoàn thành
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;