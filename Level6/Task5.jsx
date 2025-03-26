import { useState, useEffect } from "react";
import './index.css'

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error("Failed to fetch data");
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
    };

    const FetchComponent = () => {
    const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts/1");

    return (
        <div className="fetch-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
            <div className="fetch-data">
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            </div>
        )}
        </div>
    );
    };

export default FetchComponent;