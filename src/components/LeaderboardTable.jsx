// src/components/LeaderboardTable.jsx
import React from "react";

const LeaderboardTable = ({ entries, currentUserId }) => {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-slate-900">
        Leaderboard
      </h3>
      <div className="max-h-80 overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-2 pr-2">Rank</th>
              <th className="py-2 pr-2">User</th>
              <th className="py-2 pr-2">Level</th>
              <th className="py-2 pr-2">XP</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const isCurrent = entry.user_id === currentUserId;
              return (
                <tr
                  key={entry.user_id}
                  className={`border-b last:border-0 ${
                    isCurrent
                      ? "bg-purple-50 font-semibold text-purple-900"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <td className="py-2 pr-2 text-xs sm:text-sm">
                    #{entry.rank}
                  </td>
                  <td className="py-2 pr-2 text-xs sm:text-sm">
                    {entry.username}
                    {isCurrent && (
                      <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700">
                        You
                      </span>
                    )}
                  </td>
                  <td className="py-2 pr-2 text-xs sm:text-sm">
                    L{entry.level}
                  </td>
                  <td className="py-2 pr-2 text-xs sm:text-sm">{entry.xp}</td>
                </tr>
              );
            })}
            {entries.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 text-center text-xs text-slate-500"
                >
                  No leaderboard data yet. Complete a quiz to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
