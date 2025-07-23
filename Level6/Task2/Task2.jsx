import React from "react";
import useCounter from "./useCounter";

const CounterComponent = () => {
    const { count, increment, decrement, reset } = useCounter(0);


    return (
        <div className="counter-container">
        <h2>Counter: {count}</h2>
        <button onClick={increment} className="counter-button">+</button>
        <button onClick={decrement} className="counter-button">-</button>
        <button onClick={reset} className="counter-button">Reset</button>
        </div>
    );
    };

export default CounterComponent;
