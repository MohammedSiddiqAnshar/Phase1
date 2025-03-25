import React, { useState, useCallback } from "react";

const ChildComponent = ({ onClick }) => {
    console.log("Child re-rendered");
    return (
        <button onClick={onClick} className="memo-button">
        Increment
        </button>
    );
    };

    const MemoizedChild = React.memo(ChildComponent);

    const ParentComponent = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    const increment = useCallback(() => {
        setCount((prevCount) => prevCount + 1);
    }, []);

    return (
        <div className="memo-container">
        <h2>Count: {count}</h2>
        <MemoizedChild onClick={increment} />
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something..."
            className="memo-input"
        />
        </div>
    );
};

export default ParentComponent;
