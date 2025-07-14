import React from "react";

const Task5 = React.memo(() => {
    const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);

    return (
        <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        <h3>Large List (1000 items)</h3>
        <ul>
            {items.map((item, index) => (
            <li key={index}>{item}</li>
            ))}
        </ul>
        </div>
    );
});

export default Task5;
