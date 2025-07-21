import React, { useState } from 'react'

function Task1(){

    const [count,setCount] = useState(0);
    
    const increment = ()=>{
        setCount(count+1)
    }

    const decrement = ()=>{
        setCount(count-1)
    }
    
    return (
        <div>
            <h1>Counting Game</h1>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}

export default Task1