import React, { useState, useMemo, useCallback } from "react";
import Task6 from './Task6'

const findPrimes = (limit) => {
    console.log("Calculating primes...");
    const primes = [];
    for (let num = 2; num <= limit; num++) {
        let isPrime = true;
        for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            isPrime = false;
            break;
        }
        }
        if (isPrime) primes.push(num);
    }
    return primes;
    };

    const App = () => {
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(50);

    
    const primeNumbers = useMemo(() => findPrimes(limit), [limit]);

    
    const handleClick = useCallback(() => {
        console.log("Button clicked!");
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Optimizing with useMemo & useCallback</h1>
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount(count + 1)}>Increment Counter</button>

        <div style={{ marginTop: "20px" }}>
            <label>
            Prime Limit: 
            <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                style={{ marginLeft: "10px", padding: "5px" }}
            />
            </label>
        </div>

        <h3>Prime Numbers up to {limit}:</h3>
        <p>{primeNumbers.join(", ")}</p>

        <Task6 onClick={handleClick} />
        </div>
    );
};

export default App;
