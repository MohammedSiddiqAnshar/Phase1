import { useState, useRef } from "react";

const InputComponent = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="input-container">
      <input 
        value={value} 
        onChange={handleChange} 
        ref={inputRef} 
        placeholder="Enter your name..." 
        className="input-field" 
      />
      <p>Typed: {value}</p>
    </div>
  );
};

export default InputComponent;
