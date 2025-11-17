// src/components/BadgeDisplay.jsx
import React from "react";

const BadgeDisplay = ({ badges }) => {
  if (!badges || badges.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
        No badges unlocked yet. Start a quiz and earn your first badge! 💫
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-slate-900">
        Your Badges
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {badges.map((badge) => (
          <div
            key={badge.code}
            className="flex flex-col items-center rounded-xl border bg-white p-3 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl">
              {badge.icon || "🏅"}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-900">
                {badge.name}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                {badge.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeDisplay;
