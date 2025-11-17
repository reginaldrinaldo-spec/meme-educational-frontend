// src/components/UserProfileCard.jsx
import React from "react";

const UserProfileCard = ({
  username,
  level,
  currentXp,
  xpForNextLevel,
  totalBadges,
}) => {
  const progress =
    xpForNextLevel > 0
      ? Math.min(100, (currentXp / xpForNextLevel) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Profile
        </p>
        <h3 className="text-lg font-semibold text-slate-900">{username}</h3>
        <p className="mt-1 text-xs text-slate-500">
          Level <span className="font-semibold">L{level}</span> •{" "}
          <span className="font-semibold">{currentXp}</span> XP
        </p>
        <div className="mt-3">
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {currentXp}/{xpForNextLevel} XP to next level
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-3 md:mt-0">
        <div className="rounded-xl bg-purple-50 px-3 py-2 text-center">
          <p className="text-xs text-slate-500">Badges</p>
          <p className="text-lg font-semibold text-purple-700">
            {totalBadges}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
