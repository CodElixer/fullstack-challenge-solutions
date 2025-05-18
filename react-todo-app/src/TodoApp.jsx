import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Filter from './components/Filter';

const FILTERS = {
  all: () => true,
  completed: (todo) => todo.completed,
  pending: (todo) => !todo.completed,
};

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    } else {
      fetch('https://dummyjson.com/todos')
        .then(res => res.json())
        .then(data => {
          const cleaned = data.todos.map(todo => ({
            id: todo.id,
            text: todo.todo,
            completed: todo.completed
          }));
          setTodos(cleaned);
          localStorage.setItem('todos', JSON.stringify(cleaned));
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(FILTERS[filter]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">React To-Do App</h1>
      <AddTodo onAdd={addTodo} />
      <Filter current={filter} onChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
