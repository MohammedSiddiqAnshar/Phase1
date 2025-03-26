import { useState, useEffect } from "react";
import axios from "axios";

const cache = new Map(); // Simple caching mechanism

const useAxios = (url, config = {}, forceRefresh = false) => {
  const [data, setData] = useState(cache.get(url) || null);
  const [loading, setLoading] = useState(!cache.has(url));
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!forceRefresh && cache.has(url)) {
        setData(cache.get(url));
      } else {
        const response = await axios.get(url, config);
        cache.set(url, response.data);
        setData(response.data);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, forceRefresh]);

  return { data, loading, error, refresh: fetchData };
};

export default useAxios;
