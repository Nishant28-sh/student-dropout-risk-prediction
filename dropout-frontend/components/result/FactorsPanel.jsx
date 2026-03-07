'use client';

import { motion } from 'framer-motion';

export default function FactorsPanel({ formData }) {
  const passRate1 = formData.cu1_enrolled > 0 
    ? ((formData.cu1_approved / formData.cu1_enrolled) * 100).toFixed(0) 
    : 0;
  const passRate2 = formData.cu2_enrolled > 0 
    ? ((formData.cu2_approved / formData.cu2_enrolled) * 100).toFixed(0) 
    : 0;

  const finRisk = (formData.tuition_up_to_date === 0 ? 1 : 0) + formData.debtor;
  
  const gradeTrend = formData.cu2_grade >= formData.cu1_grade ? "📈 Improving" : "📉 Declining";
  const tuitionStatus = formData.tuition_up_to_date === 1 ? "✅ Paid" : "❌ Overdue";

  const rows = [
    { label: "1st Sem Pass Rate", value: `${passRate1}%`, highlight: passRate1 < 50 },
    { label: "2nd Sem Pass Rate", value: `${passRate2}%`, highlight: passRate2 < 50 },
    { label: "Financial Risk Score", value: `${finRisk} / 2`, highlight: finRisk > 0 },
    { label: "Grade Trend", value: gradeTrend, highlight: formData.cu2_grade < formData.cu1_grade },
    { label: "Tuition Status", value: tuitionStatus, highlight: formData.tuition_up_to_date === 0 },
  ];

  return (
    <div className="mt-8 space-y-3 w-full">
      <h4 className="text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-4 text-center">
        Key Risk Factors Analyzed
      </h4>
      <div className="bg-[var(--surface)]/50 rounded-xl border border-[var(--border)] overflow-hidden">
        {rows.map((row, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
            className={`flex justify-between items-center p-3.5 px-5 ${i !== rows.length - 1 ? 'border-b border-[var(--border)]' : ''} hover:bg-[var(--surface)] transition-colors`}
          >
            <span className="text-sm font-medium text-[var(--text-muted)]">{row.label}</span>
            <span className={`text-sm font-mono font-medium ${row.highlight ? 'text-[var(--yellow)]' : 'text-[var(--text)]'}`}>
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
