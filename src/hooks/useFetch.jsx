import { useEffect, useState, useMemo } from "react";

export default function useFetch() {
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
        if (!response.ok) {
          throw new Error("Network error");
        }
        const result = await response.json();
        setTitle(result.title);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const memoizedData = useMemo(
    () => ({ title, loading, error }),
    [title, loading, error]
  );

  return memoizedData;
}
