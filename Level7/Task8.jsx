import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const ParallelRequests = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const [usersResponse, postsResponse] = await Promise.all([
            axios.get("https://jsonplaceholder.typicode.com/users"),
            axios.get("https://jsonplaceholder.typicode.com/posts"),
            ]);

            setUsers(usersResponse.data);
            setPosts(postsResponse.data);
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
        <h2>Parallel API Requests</h2>
        {loading && <div className="loading">Loading...</div>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
            <>
            <h3>Users</h3>
            <ul>
                {users.slice(0, 5).map((user) => (
                <li key={user.id}>
                    <strong>{user.name}</strong> ({user.email})
                </li>
                ))}
            </ul>

            <h3>Posts</h3>
            <ul>
                {posts.slice(0, 5).map((post) => (
                <li key={post.id}>
                    <strong>{post.title}</strong>
                    <p>{post.body}</p>
                </li>
                ))}
            </ul>
            </>
        )}
        </div>
    );
};

export default ParallelRequests;
