import { useState, useEffect } from "react";

const fetchDataPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const data = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
        ];
        resolve(data); 
        }, 2000);
    });
    };

    const PromiseComponent = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDataPromise()
        .then((data) => {
            setData(data);
        })
        .catch((err) => {
            setError("Failed to fetch data");
            console.error(err);
        });
    }, []);

    return (
        <div className="promise-container">
        <h1>Promise Example</h1>
        {error ? (
            <p>{error}</p>
        ) : data.length === 0 ? (
            <p>Loading data...</p>
        ) : (
            <ul>
            {data.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
            </ul>
        )}
        </div>
    );
    };

export default PromiseComponent;
