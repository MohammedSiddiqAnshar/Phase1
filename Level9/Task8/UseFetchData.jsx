import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";

const cache = new Map();

const UseFetchData = (url) => {
  const [data, setData] = useState(cache.get(url) || null);
  const [loading, setLoading] = useState(!cache.has(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache.has(url)) return;

    const fetchData = debounce(async () => {
      try {
        const response = await axios.get(url);
        cache.set(url, response.data);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default UseFetchData;
