package com.example.todoapi.repository;

import com.example.todoapi.entity.Todo;
import com.example.todoapi.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByStatus(Status status);
}