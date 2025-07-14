import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const CancellableRequest = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source(); 

        const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            { cancelToken: source.token } 
            );
            setData(response.data.slice(0, 5)); 
        } catch (err) {
            if (axios.isCancel(err)) {
            console.log("Request canceled:", err.message);
            } else {
            setError("Failed to fetch data");
            }
        } finally {
            setLoading(false);
        }
        };

        fetchData();

        return () => {
        source.cancel("Component unmounted: Request canceled");
        };
    }, []);

    return (
        <div className="container">
        <h2>Axios Request Cancellation</h2>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
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

export default CancellableRequest;
