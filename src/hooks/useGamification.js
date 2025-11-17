// src/hooks/useGamification.js
import { useState } from "react";

export const useGamification = () => {
  const [xpGain, setXpGain] = useState(null);
  const [level, setLevel] = useState(null);
  const [totalXp, setTotalXp] = useState(null);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [streak, setStreak] = useState(null);
  const [categoryProgress, setCategoryProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const completeQuiz = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/quizzes/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Failed to complete quiz");
      }
      const data = await res.json();
      setXpGain(data.xp_gained);
      setTotalXp(data.new_total_xp);
      setLevel(data.new_level);
      setEarnedBadges(data.earned_badges || []);
      setStreak(data.streak);
      setCategoryProgress(data.category_progress);
      return data;
    } catch (err) {
      setError(err.message || "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    completeQuiz,
    xpGain,
    level,
    totalXp,
    earnedBadges,
    streak,
    categoryProgress,
    loading,
    error,
  };
};
