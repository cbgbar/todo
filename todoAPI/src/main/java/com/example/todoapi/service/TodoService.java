package com.example.todoapi.service;

import com.example.todoapi.entity.Todo;
import com.example.todoapi.entity.Status;
import com.example.todoapi.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        List<Todo> todos = todoRepository.findAll();
        // Check and update status for overdue todos
        todos.forEach(this::updateStatusIfOverdue);
        return todos;
    }

    public Todo createTodo(Todo todo) {
        todo.setStatus(Status.ONGOING);
        todo.setStartTime(todo.getStartTime() != null ? todo.getStartTime() : LocalDateTime.now());
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo updatedTodo) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setTitle(updatedTodo.getTitle());
        if (updatedTodo.getStatus() != null) {
            todo.setStatus(updatedTodo.getStatus());
        }
        if (updatedTodo.getEndTime() != null) {
            todo.setEndTime(updatedTodo.getEndTime());
        }
        if (todo.getStatus() == Status.COMPLETED || todo.getStatus() == Status.FAILED) {
            todo.setCompletedTime(LocalDateTime.now());
        }

        // Check if todo is overdue
        updateStatusIfOverdue(todo);

        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    public void deleteCompletedTodos() {
        todoRepository.findByStatus(Status.COMPLETED).forEach(todo -> todoRepository.delete(todo));
    }

    private void updateStatusIfOverdue(Todo todo) {
        if (todo.getEndTime() != null && todo.getEndTime().isBefore(LocalDateTime.now())
                && todo.getStatus() == Status.ONGOING) {
            todo.setStatus(Status.INCOMPLETE);
            todoRepository.save(todo);
        }
    }
}