import { useState, useEffect } from "react";


const fetchDataPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const data = [
            { id: 1, name: "Mohammed" },
            { id: 2, name: "samad" },
        ];
        resolve(data); 
        }, 2000);
    });
    };

    const fetchDataAsync = async () => {
    try {
        const data = await fetchDataPromise();
        console.log("Fetched Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
    };

    const AsyncAwaitComponent = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
        try {
            const fetchedData = await fetchDataAsync();
            setData(fetchedData);
        } catch (err) {
            setError("Failed to fetch data");
        }
        };

        getData();
    }, []);

    return (
        <div className="async-container">
        <h1>Async/Await Example</h1>
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

export default AsyncAwaitComponent;
