import React, { useReducer } from "react";
import './index.css'

const counterReducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
        return { count: state.count + 1 };
        case "DECREMENT":
        return { count: state.count - 1 };
        case "RESET":
        return { count: 0 };
        default:
        return state;
    }
    };

    const Task8 = () => {
    
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });

    return (
        <div className="counter">
        <h2>Counter: {state.count}</h2>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
        </div>
    );
};

export default Task8;
