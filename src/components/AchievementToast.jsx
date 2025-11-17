// src/components/AchievementToast.jsx
import React, { useEffect } from "react";

const AchievementToast = ({
  title,
  message,
  icon = "✨",
  visible,
  onClose,
  durationMs = 4000,
}) => {
  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(onClose, durationMs);
    return () => clearTimeout(id);
  }, [visible, durationMs, onClose]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <div className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl bg-slate-900/95 px-4 py-3 text-white shadow-lg">
        <span className="mt-0.5 text-xl">{icon}</span>
        <div className="flex-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs text-slate-200">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-xs text-slate-300 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AchievementToast;
