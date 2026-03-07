'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccordionSection({ title, icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-4 group">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[var(--surface)] focus-ring rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-xl shadow-inner group-hover:border-[var(--border-glow)] transition-colors">
            {icon}
          </div>
          <h3 className="font-display text-lg tracking-wide text-[var(--text)] group-hover:text-[var(--accent-light)] transition-colors">
            {title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${isOpen ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]' : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] group-hover:border-[var(--border-glow)]'}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-6 pt-2 border-t border-[var(--border)] bg-[var(--surface)]/30">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
