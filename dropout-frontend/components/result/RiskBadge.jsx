'use client';

import { motion } from 'framer-motion';

export default function RiskBadge({ risk }) {
  const getStyle = () => {
    switch (risk) {
      case 'HIGH':
        return { text: 'HIGH DROPOUT RISK', emoji: '🔴', classes: 'bg-[var(--red)]/10 border-[var(--red)] text-[var(--red)] shadow-[0_0_15px_var(--red-glow)]' };
      case 'MEDIUM':
        return { text: 'MEDIUM RISK', emoji: '🟡', classes: 'bg-[var(--yellow)]/10 border-[var(--yellow)] text-[var(--yellow)] shadow-[0_0_15px_var(--yellow-glow)]' };
      case 'LOW':
        return { text: 'LOW RISK', emoji: '🟢', classes: 'bg-[var(--green)]/10 border-[var(--green)] text-[var(--green)] shadow-[0_0_15px_var(--green-glow)]' };
      default:
        return { text: 'UNKNOWN RISK', emoji: '❓', classes: 'bg-[var(--surface)] border-[var(--border)] text-[var(--text)]' };
    }
  };

  const style = getStyle();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border ${style.classes} font-bold tracking-wide text-sm`}
    >
      <span className="text-base">{style.emoji}</span>
      <span>{style.text}</span>
    </motion.div>
  );
}
