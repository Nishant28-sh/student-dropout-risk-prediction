'use client';

export default function TogglePill({ label, name, value, onChange }) {
  const isYes = value === 1;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[var(--text-muted)]">{label}</label>
      <div className="flex gap-2 p-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-inner">
        <button
          type="button"
          onClick={() => onChange(name, 1)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-ring ${
            isYes 
              ? 'bg-[var(--accent)] text-white shadow-[0_0_15px_var(--accent-glow)] border border-[var(--accent-light)]' 
              : 'text-[var(--text-muted)] hover:text-[var(--text)] bg-transparent border border-transparent hover:bg-[var(--card)]'
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(name, 0)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-ring ${
            !isYes 
              ? 'bg-[var(--card)] text-[var(--text)] border border-[var(--border)] shadow-sm' 
              : 'text-[var(--text-muted)] hover:text-[var(--text)] bg-transparent border border-transparent hover:bg-[var(--surface)]'
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}
