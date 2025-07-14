import { useState, useEffect } from "react";

// Function that simulates fetching data with a callback
const fetchData = (callback) => {
  setTimeout(() => {
    const data = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    callback(data);
  }, 2000);
};

const CallbackComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(setData); // Fetch data and update state
  }, []);

  return (
    <div className="callback-container">
      <h1>Callback Example</h1>
      {data.length === 0 ? (
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

export default CallbackComponent;
