'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ParticleNetwork = dynamic(
  () => import('@/components/three/ParticleNetwork'), 
  { ssr: false }
);
const RiskSphere = dynamic(
  () => import('@/components/three/RiskSphere'),
  { ssr: false }
);

export default function Hero({ result }) {
  const scrollToForm = () => {
    document.getElementById('prediction-form')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToArchitecture = () => {
    document.getElementById('model-architecture')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <section className="relative w-full min-h-screen pt-20 overflow-hidden flex items-center justify-center">
      <ParticleNetwork />
      
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start pt-12 lg:pt-0"
        >
          <motion.div variants={itemVariants} className="px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-mono font-bold tracking-wider mb-6 flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
            <span className="text-sm">⚡</span> Powered by XGBoost + Flask
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-display font-medium leading-tight mb-6">
            <span className="block text-5xl md:text-7xl text-[var(--text)]">Predict Student</span>
            <span className="block text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[#a855f7] pb-2 drop-shadow-lg">
              Dropout Risk
            </span>
            <span className="block text-3xl md:text-5xl text-[var(--text-dim)] mt-2">
              Before It's Too Late
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-[var(--text-muted)] max-w-xl leading-relaxed mb-10 border-l-2 border-[var(--border)] pl-4">
            AI-powered early intervention system trained on <span className="text-[var(--text)] font-medium">4,424</span> student records. 
            Identify at-risk students instantly with <span className="text-[var(--accent-light)] font-medium">88.9%</span> accuracy.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-10 w-full max-w-lg">
            <div className="glass-card p-4 flex flex-col items-center justify-center rounded-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="font-mono text-xl md:text-2xl font-bold text-[var(--gold)]">88.9%</span>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">Accuracy</span>
            </div>
            <div className="glass-card p-4 flex flex-col items-center justify-center rounded-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="font-mono text-xl md:text-2xl font-bold text-[var(--text)]">4,424</span>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">Students</span>
            </div>
            <div className="glass-card p-4 flex flex-col items-center justify-center rounded-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#a855f7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="font-mono text-xl md:text-2xl font-bold text-[var(--text)]">0.82</span>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">Dropout F1</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <button 
              onClick={scrollToForm}
              className="px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_20px_var(--accent-glow)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center gap-3 transform hover:scale-[1.03]"
            >
              Analyze a Student <span>→</span>
            </button>
            <button 
              onClick={scrollToArchitecture}
              className="px-8 py-4 bg-transparent border border-[var(--border)] hover:border-[var(--text-muted)] text-[var(--text-muted)] hover:text-[var(--text)] rounded-xl font-medium text-lg transition-all duration-300 flex items-center gap-3"
            >
              View Model Details <span>↓</span>
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: 3D Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center justify-center relative mt-12 lg:mt-0"
        >
          <div className="relative">
            <RiskSphere risk={result?.risk || null} />
          </div>
          
          <div className="glass-panel px-6 py-4 rounded-2xl flex flex-col items-center gap-3 mt-4 border-[var(--border)] relative z-10 shadow-2xl">
            <span className="text-xs font-mono text-[var(--text-dim)] uppercase tracking-widest">
              Risk Assessment Sphere
            </span>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--red)] shadow-[0_0_8px_var(--red-glow)]"></span>
                <span className="text-xs text-[var(--text-muted)] font-medium">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--yellow)] shadow-[0_0_8px_var(--yellow-glow)]"></span>
                <span className="text-xs text-[var(--text-muted)] font-medium">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--green)] shadow-[0_0_8px_var(--green-glow)]"></span>
                <span className="text-xs text-[var(--text-muted)] font-medium">Low Risk</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
