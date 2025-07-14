import React, { useRef } from "react";

const FocusInput = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="focus-container">
      <input ref={inputRef} type="text" placeholder="Type something..." className="input-field" />
      <button onClick={handleFocus} className="focus-button">Focus Input</button>
    </div>
  );
};

export default FocusInput;
