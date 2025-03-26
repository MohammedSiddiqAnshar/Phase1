import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"; 

const DataFetcher = () => {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
            );
            setData(response.data.slice(0, 10)); 
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false); 
        }
        };

        fetchData();
    }, []);

    return (
        <div className="data-container">
        <h1>Fetched Data</h1>
        {loading ? (
            <p className="loading">Loading data...</p>
        ) : error ? (
            <p className="error">{error}</p>
        ) : (
            <ul>
            {data.map((post) => (
                <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default DataFetcher;
