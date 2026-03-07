'use client';

import { motion, AnimatePresence } from 'framer-motion';
import RiskBadge from './RiskBadge';
import GaugeChart from './GaugeChart';
import FactorsPanel from './FactorsPanel';

export default function ResultPanel({ result, formData }) {
  
  const Recommendation = ({ risk }) => {
    if (risk === 'HIGH') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="w-full bg-[var(--red)]/10 border border-[var(--red)]/30 rounded-xl p-5 mb-6 shadow-[0_4px_20px_var(--red-glow)]">
          <h4 className="flex items-center gap-2 text-[var(--red)] font-bold mb-2">
            <span>⚠️</span> Immediate Intervention Required
          </h4>
          <p className="text-sm text-[var(--text)] leading-relaxed">
            This student shows critical dropout risk factors. Schedule immediate counseling and financial support review.
          </p>
        </motion.div>
      );
    }
    if (risk === 'MEDIUM') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="w-full bg-[var(--yellow)]/10 border border-[var(--yellow)]/30 rounded-xl p-5 mb-6 shadow-[0_4px_20px_var(--yellow-glow)]">
          <h4 className="flex items-center gap-2 text-[var(--yellow)] font-bold mb-2">
            <span>👁</span> Monitor Closely
          </h4>
          <p className="text-sm text-[var(--text)] leading-relaxed">
            This student shows warning signs. Regular check-ins and academic support are recommended.
          </p>
        </motion.div>
      );
    }
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="w-full bg-[var(--green)]/10 border border-[var(--green)]/30 rounded-xl p-5 mb-6 shadow-[0_4px_20px_var(--green-glow)]">
        <h4 className="flex items-center gap-2 text-[var(--green)] font-bold mb-2">
          <span>✅</span> On Track
        </h4>
        <p className="text-sm text-[var(--text)] leading-relaxed">
          This student appears to be progressing well. Continue standard monitoring procedures.
        </p>
      </motion.div>
    );
  };

  const getMotionConfig = () => {
    if (!result) return { borderColor: 'var(--border)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' };
    if (result.risk === 'HIGH') {
      return { 
        borderColor: 'var(--red)',
        boxShadow: ['0 0 0px var(--red-glow)', '0 0 40px var(--red-glow)', '0 0 0px var(--red-glow)', '0 0 40px var(--red-glow)', '0 0 0px var(--red-glow)', '0 0 40px var(--red-glow)']
      };
    }
    if (result.risk === 'LOW') {
      return {
        borderColor: 'var(--green)',
        boxShadow: ['0 0 10px var(--green-glow)', '0 0 30px var(--green-glow)', '0 0 10px var(--green-glow)']
      };
    }
    return { borderColor: 'var(--yellow)', boxShadow: '0 0 30px var(--yellow-glow)' };
  };

  const getTransitionConfig = () => {
    if (!result) return {};
    if (result.risk === 'HIGH') return { duration: 3, ease: 'easeInOut' };
    if (result.risk === 'LOW') return { duration: 2, repeat: Infinity, ease: 'easeInOut' };
    return { duration: 0.5 };
  };

  return (
    <motion.div 
      animate={getMotionConfig()}
      transition={getTransitionConfig()}
      className={`sticky top-24 glass-panel rounded-3xl p-8 lg:p-10 min-h-[700px] flex flex-col border overflow-hidden`} 
      style={{ perspective: '1200px' }}
    >
      
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay"></div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-8 relative z-10"
          >
            <div className="w-28 h-28 bg-[var(--bg)] rounded-full flex items-center justify-center border border-[var(--border)] shadow-[inset_0_0_30px_rgba(255,255,255,0.02)] relative group mt-8">
              <div className="absolute inset-[-4px] bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-light)] rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700"></div>
              <span className="text-6xl drop-shadow-lg filter grayscale opacity-80">🧠</span>
            </div>
            <div>
              <h3 className="text-3xl font-display text-[var(--accent)] mb-4 tracking-wide">Awaiting Analysis</h3>
              <p className="text-[var(--text-muted)] max-w-sm leading-relaxed text-base mx-auto">
                Complete the form and run analysis to see this student's dropout risk assessment.
              </p>
            </div>
            
            <div className="mt-8 py-4 px-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md">
              <p className="text-xs font-mono text-[var(--text-muted)] leading-relaxed">
                <span className="text-[var(--accent-light)]">XGBoost model.pkl</span> <br className="md:hidden" /><span className="hidden md:inline">→</span> 
                <span className="text-[var(--gold)] ml-1">scaler.pkl</span> <br className="md:hidden" /><span className="hidden md:inline">→</span> 
                <span className="text-[var(--text)] ml-1">47 features</span> <br className="md:hidden" /><span className="hidden md:inline">→</span> 
                <span className="text-[var(--green)] ml-1">probability score</span>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, rotateY: 180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: 'spring', damping: 20, stiffness: 100 }}
            className="flex-1 flex flex-col items-center relative z-10 w-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <RiskBadge risk={result.risk} />
            
            <GaugeChart probability={result.probability} risk={result.risk} />
            
            <div className="w-full mb-8">
              <div className="flex justify-between text-xs font-mono font-bold tracking-wider mb-3">
                <span className="text-[var(--text-muted)] uppercase">Risk Level</span>
                <span className="text-[var(--text)]">{result.probability.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[var(--surface)] rounded-full h-3 overflow-hidden border border-[var(--border)] shadow-inner relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${result.probability}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  className="absolute left-0 top-0 bottom-0 rounded-r-full shadow-[0_0_15px_currentColor]"
                  style={{
                    backgroundColor: result.risk === 'HIGH' ? 'var(--red)' : 
                                     result.risk === 'MEDIUM' ? 'var(--yellow)' : 'var(--green)',
                    color: result.risk === 'HIGH' ? 'var(--red-glow)' : 
                           result.risk === 'MEDIUM' ? 'var(--yellow-glow)' : 'var(--green-glow)'
                  }}
                />
              </div>
            </div>

            <Recommendation risk={result.risk} />

            <FactorsPanel formData={formData} />

            <div className="mt-10 w-full border-t border-[var(--border)] pt-5 text-center space-y-2">
              <p className="text-[11px] font-mono text-[var(--text-dim)]">Prediction by <span className="text-[var(--text-muted)]">dropout_binary_model.pkl</span></p>
              <p className="text-[11px] font-mono text-[var(--text-dim)]">Input normalized by <span className="text-[var(--text-muted)]">dropout_binary_scaler.pkl</span></p>
              <p className="text-[11px] font-mono text-[var(--text-dim)]">Confidence based on <span className="text-[var(--text-muted)]">700 XGBoost decision trees</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
