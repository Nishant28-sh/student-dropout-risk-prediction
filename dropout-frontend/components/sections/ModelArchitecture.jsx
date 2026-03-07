'use client';

import { motion } from 'framer-motion';

export default function ModelArchitecture() {
  const pipelineSteps = [
    { icon: '📊', title: 'Raw Data', desc: '36 features' },
    { icon: '⚙️', title: 'Feature Engineering', desc: '+11 engineered' },
    { icon: '📏', title: 'StandardScaler', desc: 'Normalizes inputs' },
    { icon: '🧠', title: 'XGBoost', desc: '700 trees' },
    { icon: '🎯', title: 'Risk Score', desc: '0-100% + Tier' }
  ];

  return (
    <section id="model-architecture" className="w-full bg-[#03040c] border-y border-[var(--border)] py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--accent)]" />
            <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] tracking-wider">
              How the Model Works
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--accent)]" />
          </motion.div>
        </div>

        {/* Pipeline Diagram */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-20">
          {pipelineSteps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center w-full lg:w-auto"
            >
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center w-full lg:w-48 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-glow)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-3xl mb-3">{step.icon}</span>
                <h4 className="font-medium text-[var(--text)] mb-1">{step.title}</h4>
                <p className="text-sm font-mono text-[var(--text-muted)]">{step.desc}</p>
              </div>
              
              {i < pipelineSteps.length - 1 && (
                <div className="hidden lg:flex flex-col items-center justify-center px-2">
                  <div className="w-8 h-px bg-[var(--border-glow)] shadow-[0_0_10px_var(--accent-glow)]"></div>
                  <div className="text-[var(--border-glow)] text-xs mt-1">▶</div>
                </div>
              )}
              {i < pipelineSteps.length - 1 && (
                <div className="flex lg:hidden justify-center items-center py-4 w-full">
                  <div className="w-px h-8 bg-[var(--border-glow)] shadow-[0_0_10px_var(--accent-glow)]"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="font-display text-xl text-[var(--text)] mb-4 flex items-center gap-2">
              <span className="text-[var(--accent)]">●</span> Training Data
            </h3>
            <ul className="space-y-3 text-[var(--text-muted)] text-sm">
              <li className="flex justify-between items-center"><span className="text-[var(--text)]">4,424</span> students</li>
              <li className="flex justify-between items-center break-all"><span className="mr-2">Source:</span> <span className="text-[var(--text)] font-mono text-xs">UCI Dataset #697</span></li>
              <li className="flex justify-between items-center"><span>Class Balance:</span> <span className="text-[var(--accent-light)] font-mono">SMOTE</span></li>
              <li className="flex justify-between items-center"><span>Split:</span> <span className="text-[var(--text)]">80% Train / 20% Test</span></li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="font-display text-xl text-[var(--text)] mb-4 flex items-center gap-2">
              <span className="text-[var(--accent)]">●</span> Model Performance
            </h3>
            <div className="mb-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-sm text-[var(--text-muted)]">Overall Accuracy</span>
                <span className="font-mono text-[var(--green)]">88.9%</span>
              </div>
              <div className="w-full h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--green)] w-[88.9%] shadow-[0_0_10px_var(--green-glow)]"></div>
              </div>
            </div>
            <ul className="space-y-3 text-[var(--text-muted)] text-sm">
              <li className="flex justify-between items-center"><span>Dropout F1 Score:</span> <span className="text-[var(--text)] font-mono">0.82</span></li>
              <li className="flex justify-between items-center"><span>Macro F1 Score:</span> <span className="text-[var(--text)] font-mono">0.87</span></li>
              <li className="flex justify-between items-center"><span className="text-xs">Tested on 885 held-out students</span></li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="font-display text-xl text-[var(--text)] mb-4 flex items-center gap-2">
              <span className="text-[var(--accent)]">●</span> Top Risk Signals
            </h3>
            <ol className="space-y-3 text-[var(--text-muted)] text-sm list-decimal list-inside font-medium border-l border-[var(--border)] pl-4">
              <li className="text-[var(--red)]"><span className="text-[var(--text)] ml-2">2nd Sem Pass Rate</span></li>
              <li className="text-[var(--yellow)]"><span className="text-[var(--text)] ml-2">Tuition Fee Status</span></li>
              <li className="text-[var(--accent-light)]"><span className="text-[var(--text)] ml-2">Units Approved</span></li>
              <li><span className="text-[var(--text)] ml-2">Financial Risk Score</span></li>
              <li><span className="text-[var(--text)] ml-2">Scholarship Status</span></li>
            </ol>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
