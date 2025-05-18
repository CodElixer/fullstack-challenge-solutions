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
    fetch('https://dummyjson.com/todos?limit=10')
      .then(res => res.json())
      .then(data => {
        const cleaned = data.todos.map(todo => ({
          id: todo.id,
          text: todo.todo,
          completed: todo.completed
        }));
        setTodos(cleaned);
      });
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const toggleTodo = async (todo) => {
    try {
      const res = await fetch(`https://dummyjson.com/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      });
      const updated = await res.json();
      setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: updated.completed } : t));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const filteredTodos = todos.filter(FILTERS[filter]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">React To-Do App (with DummyJSON API)</h1>
      <AddTodo onAdd={addTodo} />
      <Filter current={filter} onChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}