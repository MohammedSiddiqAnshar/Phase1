import React, { useState } from "react";
import useAxios from "./useAxios";
import "./index.css";

const AxiosWithCache = () => {
  const [forceRefresh, setForceRefresh] = useState(false);

  
  const { data = [], loading, error, refresh } = useAxios(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    {},
    forceRefresh
  );

  return (
    <div className="container">
      <h2>Axios with Caching</h2>
      
      <div className="button-group">
        <button onClick={() => setForceRefresh((prev) => !prev)}>
          {forceRefresh ? "Disable" : "Enable"} Force Refresh
        </button>
        <button onClick={refresh}>Refresh Data</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && data.length > 0 ? (
        <ul>
          {data.map((post) => (
            <li key={post.id} className="post-item">
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No data available</p>
      )}
    </div>
  );
};

export default AxiosWithCache;

