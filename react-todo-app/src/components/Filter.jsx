import React from 'react';

export default function Filter({ current, onChange }) {
  const options = ['all', 'completed', 'pending'];

  return (
    <div className="flex gap-2 mb-4">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={\`px-3 py-1 border \${current === opt ? 'bg-blue-500 text-white' : 'bg-white'}\`}
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </button>
      ))}
    </div>
  );
}
