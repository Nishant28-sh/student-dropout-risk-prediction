'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
  const scrollToForm = () => {
    document.getElementById('prediction-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 h-16 z-50 glass-panel border-b border-[var(--border)] px-6 lg:px-12 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        {/* Hexagon SVG Logo */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L20.6603 7V17L12 22L3.33975 17V7L12 2Z" stroke="var(--accent-light)" strokeWidth="2" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="4" fill="var(--accent)"/>
        </svg>
        <span className="font-display text-xl tracking-wide font-medium">DropoutAI</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-mono font-bold uppercase tracking-wider">
          <span>Model: XGBoost · 88.9%</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-50"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--green)]"></span>
          </div>
          <span className="text-[var(--text-muted)] text-sm font-medium">Flask API Connected</span>
        </div>

        <button 
          onClick={scrollToForm}
          className="px-5 py-2 rounded-lg border border-[var(--border-glow)] text-[var(--text)] text-sm font-medium hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 ml-2 shadow-[0_0_0_0_var(--accent-glow)] hover:shadow-[0_0_15px_var(--accent-glow)] transform hover:scale-[1.03]"
        >
          Analyze Student
        </button>
      </div>
    </motion.nav>
  );
}
