import React from 'react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex justify-between items-center p-2 border rounded">
      <span
        className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
        onClick={() => onToggle(todo)}
      >
        {todo.text}
      </span>
      <button
        className="text-red-500 hover:text-red-700 ml-4"
        onClick={() => onDelete(todo.id)}
      >
        ❌
      </button>
    </li>
  );
}