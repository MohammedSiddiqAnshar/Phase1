import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const LocalStorageComponent = () => {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div className="storage-container">
    
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name..." 
        className="storage-input"
      />
      <p>Stored Name: {name}</p>
    </div>
  );
};

export default LocalStorageComponent;
