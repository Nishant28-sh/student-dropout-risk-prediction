'use client';

import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GaugeChart({ probability, risk }) {
  // ✅ Plain state for the displayed number
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);

  useEffect(() => {
    // Reset to 0 first so it always animates from start
    count.set(0);
    setDisplayValue(0);

    const animation = animate(count, probability, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        // ✅ Convert MotionValue to plain number for React rendering
        setDisplayValue(Math.round(latest));
      },
    });

    return animation.stop;
  }, [probability]);

  const getColor = () => {
    switch (risk) {
      case 'HIGH':   return 'var(--red)';
      case 'MEDIUM': return 'var(--yellow)';
      case 'LOW':    return 'var(--green)';
      default:       return 'var(--accent)';
    }
  };

  const getGlow = () => {
    switch (risk) {
      case 'HIGH':   return 'var(--red-glow)';
      case 'MEDIUM': return 'var(--yellow-glow)';
      case 'LOW':    return 'var(--green-glow)';
      default:       return 'var(--accent-glow)';
    }
  };

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (probability / 100) * circumference;

  return (
    <div className="relative w-[220px] h-[220px] flex items-center justify-center mx-auto my-8 shrink-0">
      {/* Glow background */}
      <div
        className="absolute inset-0 rounded-full blur-[40px] opacity-30 pointer-events-none"
        style={{ backgroundColor: getGlow() }}
      />

      {/* SVG Donut */}
      <svg
        className="w-full h-full transform -rotate-90 relative z-10"
        viewBox="0 0 220 220"
      >
        {/* Track */}
        <circle
          cx="110" cy="110" r={radius}
          stroke="var(--surface)"
          strokeWidth="16"
          fill="transparent"
        />
        {/* Animated progress arc */}
        <motion.circle
          cx="110" cy="110" r={radius}
          stroke={getColor()}
          strokeWidth="16"
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>

      {/* Center text — uses plain number state, NOT MotionValue */}
      <div className="absolute flex flex-col items-center justify-center z-20">
        <span
          className="text-5xl font-mono font-bold"
          style={{ color: getColor() }}
        >
          {displayValue}
          <span className="text-3xl">%</span>
        </span>
        <span className="text-xs text-[var(--text-dim)] uppercase tracking-widest mt-2 font-medium">
          Dropout Probability
        </span>
      </div>
    </div>
  );
}