'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg)] border-t border-[var(--border)] pt-16 pb-6 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L20.6603 7V17L12 22L3.33975 17V7L12 2Z" stroke="var(--accent-light)" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="4" fill="var(--accent)"/>
              </svg>
              <span className="font-display text-xl tracking-wide font-medium">DropoutAI</span>
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
              Early intervention powered by machine learning. Identify at-risk students before they slip through the cracks.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <h4 className="text-[var(--text)] font-medium mb-4 uppercase tracking-wider text-xs">Model Stack</h4>
            <div className="text-[var(--text-dim)] text-sm space-y-2 mb-6 font-mono">
              <p>XGBoost 2.0 · scikit-learn · Flask</p>
              <p>pandas · SMOTE</p>
            </div>
            
            <h4 className="text-[var(--text)] font-medium mb-4 uppercase tracking-wider text-xs">Frontend Stack</h4>
            <div className="text-[var(--text-dim)] text-sm space-y-2 font-mono">
              <p>Next.js 15 · Three.js</p>
              <p>Framer Motion · Tailwind CSS</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <h4 className="text-[var(--text)] font-medium mb-4 uppercase tracking-wider text-xs">Model Files</h4>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] rounded px-3 py-2 w-max font-mono">
                <span>📦</span> dropout_binary_model.pkl
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] rounded px-3 py-2 w-max font-mono">
                <span>📦</span> dropout_binary_scaler.pkl
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-auto">
              <span className="w-2 h-2 rounded-full bg-[var(--green)]"></span>
              <span className="text-xs text-[var(--text-dim)] font-mono">Connected to Flask at localhost:5000</span>
            </div>
          </div>
          
        </div>

        <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-dim)] font-mono">
          <p>Student Dropout Risk Prediction</p>
          <div className="flex gap-4">
            <span>XGBoost Model</span>
            <span>88.9% Accuracy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
