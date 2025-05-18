import React, { useState } from 'react';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText('');
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
