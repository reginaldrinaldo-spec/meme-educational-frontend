// src/components/XPGainAnimation.jsx
import React, { useEffect, useState } from "react";

const XPGainAnimation = ({ xpAmount }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (xpAmount && xpAmount > 0) {
      setVisible(true);
      const id = setTimeout(() => setVisible(false), 1200);
      return () => clearTimeout(id);
    }
  }, [xpAmount]);

  if (!visible || !xpAmount) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
      <div className="animate-bounce-up text-3xl font-bold text-green-400 drop-shadow-[0_0_12px_rgba(0,0,0,0.6)]">
        +{xpAmount} XP
      </div>
    </div>
  );
};

export default XPGainAnimation;
