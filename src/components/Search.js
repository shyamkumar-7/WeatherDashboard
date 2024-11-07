import React, { useState } from 'react';

function Search({ setCity }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter city name" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
