import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";
import "./index.css";

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/posts");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-container">
      <h2>Posts</h2>
      <div id="loading-indicator" className="loading">Loading...</div>
      {error && <p className="error">{error}</p>}
      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
