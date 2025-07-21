import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?q=${input}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '1rem' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search recipes..."
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
        Search
      </button>
    </form>
  );
}
