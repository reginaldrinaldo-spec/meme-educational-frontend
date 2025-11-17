// src/hooks/useLeaderboardPolling.js
import { useEffect, useState } from "react";

export const useLeaderboardPolling = (
  endpoint = "/api/leaderboard",
  intervalMs = 30000
) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      setError(null);
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const id = setInterval(fetchLeaderboard, intervalMs);
    return () => clearInterval(id);
  }, [endpoint, intervalMs]);

  return { leaderboard, loading, error, refresh: fetchLeaderboard };
};
