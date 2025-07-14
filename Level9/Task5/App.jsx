import React, { useState, useEffect } from "react";
import Task5 from "./Task5";

const App = () => {
    const [count, setCount] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
        setCount((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Optimized List with React.memo</h1>
        <h2>Counter: {count}</h2>
        <Task5 />
        </div>
    );
};

export default App;
