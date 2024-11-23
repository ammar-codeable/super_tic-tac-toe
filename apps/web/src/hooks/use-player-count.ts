import { useEffect, useState } from "react";

function usePlayerCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HTTP_SERVER_URL}/player-count`,
        );
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch player count:", error);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 5000);

    return () => clearInterval(interval);
  }, []);

  return count;
}

export { usePlayerCount };
