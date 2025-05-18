import React, { useState } from 'react';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleAdd = async () => {
    if (!text.trim()) return;

    const newTodo = {
      todo: text,
      completed: false,
      userId: 5,
    };

    try {
      const res = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const data = await res.json();
      onAdd({ id: data.id, text: data.todo, completed: data.completed });
      setText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border px-2 py-1 flex-1"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button className="bg-blue-500 text-white px-3 py-1" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}