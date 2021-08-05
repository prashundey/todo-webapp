package com.rest.webservices.restfulwebservices.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardCodedService {
    private static List<Todo> todos = new ArrayList<>();
    private static long idCounter = 0;

    static {
        todos.add(new Todo(++idCounter, "prashun", "Learn fullstack", new Date(), false));
        todos.add(new Todo(++idCounter, "prashun", "Do leetcode problems", new Date(), false));
        todos.add(new Todo(++idCounter, "prashun", "Dive deep into java", new Date(), false));
    }

    public List<Todo> findAll() {
        return todos;
    }

    public Todo saveTodo(Todo todo) {
        // Shortcut Method taking care of updates and addition
        if (todo.getId() == -1 || todo.getId() == 0) todo.setId(++idCounter);
        else deleteById(todo.getId());
        todos.add(todo);
        return todo;
    }

    public Todo deleteById(long id) {
        Todo todo = findById(id);
        if (todo == null) return null;

        return todos.remove(todo) ? todo : null;
    }

    public Todo findById(long id) {
        for (Todo todo: todos) {
            if (todo.getId() == id)
                return todo;
        }
        return null;
    }
}
