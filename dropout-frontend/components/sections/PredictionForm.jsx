'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AccordionSection from '../form/AccordionSection';
import TogglePill from '../form/TogglePill';
import ResultPanel from '../result/ResultPanel';
import { predictDropout } from '@/lib/predict';

const initialForm = {
  // Academic 1st Sem
  cu1_enrolled: 6, cu1_approved: 6, cu1_grade: 13.0, cu1_evaluations: 6, cu1_credited: 0, cu1_without_eval: 0,
  // Academic 2nd Sem
  cu2_enrolled: 6, cu2_approved: 6, cu2_grade: 13.0, cu2_evaluations: 6, cu2_credited: 0, cu2_without_eval: 0,
  // Financial
  tuition_up_to_date: 1, debtor: 0, scholarship: 0, displaced: 0,
  // Personal
  age: 20, gender: 1, admission_grade: 130, prev_qual_grade: 130, marital_status: 1, intl: 0,
  // Economic
  unemployment: 10.8, inflation: 1.4, gdp: 1.74
};

export default function PredictionForm({ onResult }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [lastSubmittedForm, setLastSubmittedForm] = useState(initialForm);
  const [currentResult, setCurrentResult] = useState(null);

  const update = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await predictDropout(form);
      setLastSubmittedForm(form);
      setCurrentResult(res);
      if(onResult) onResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred during prediction.');
    } finally {
      setLoading(false);
    }
  };

  const InputRow = ({ label, id, val, min, max, step="1" }) => (
    <div className="flex flex-col gap-2 relative group">
      <label htmlFor={id} className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider group-focus-within:text-[var(--accent-light)] transition-colors">{label}</label>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] opacity-0 group-focus-within:opacity-100 transition-opacity rounded-l-lg"></div>
        <input
          id={id}
          type="number"
          value={val}
          min={min}
          max={max}
          step={step}
          onChange={(e) => update(id, parseFloat(e.target.value) || 0)}
          className="w-full input-field rounded-lg px-4 py-2.5 font-mono text-sm pl-4"
        />
      </div>
    </div>
  );

  return (
    <section id="prediction-form" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full relative z-20">
      
      <div className="mb-12">
        <h2 className="font-display text-4xl text-[var(--text)] mb-4 flex items-center gap-4">
          <span className="w-1.5 h-8 bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent-glow)]"></span>
          Student Risk Analysis
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-lg leading-relaxed ml-6 border-l pl-4 border-[var(--border)]">
          Enter student data below. The model analyzes 47 features including 
          engineered ratios to predict dropout probability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT — Form */}
        <div className="space-y-4">
          
          <AccordionSection title="Academic Performance" icon="📚" defaultOpen={true}>
            <div className="space-y-8">
              <div>
                <h4 className="text-[var(--accent-light)] text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-light)]"></span> 1st Semester
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <InputRow label="Units Enrolled" id="cu1_enrolled" val={form.cu1_enrolled} min="0" max="26" />
                  <InputRow label="Units Approved" id="cu1_approved" val={form.cu1_approved} min="0" max="26" />
                  <InputRow label="Grade (0-20)" id="cu1_grade" val={form.cu1_grade} min="0" max="20" step="0.1" />
                  <InputRow label="Evaluations" id="cu1_evaluations" val={form.cu1_evaluations} min="0" max="45" />
                  <InputRow label="Credited Units" id="cu1_credited" val={form.cu1_credited} min="0" max="20" />
                  <InputRow label="Without Evals" id="cu1_without_eval" val={form.cu1_without_eval} min="0" max="12" />
                </div>
              </div>
              
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
              
              <div>
                <h4 className="text-[var(--accent-light)] text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-light)]"></span> 2nd Semester
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <InputRow label="Units Enrolled" id="cu2_enrolled" val={form.cu2_enrolled} min="0" max="23" />
                  <InputRow label="Units Approved" id="cu2_approved" val={form.cu2_approved} min="0" max="20" />
                  <InputRow label="Grade (0-20)" id="cu2_grade" val={form.cu2_grade} min="0" max="20" step="0.1" />
                  <InputRow label="Evaluations" id="cu2_evaluations" val={form.cu2_evaluations} min="0" max="33" />
                  <InputRow label="Credited Units" id="cu2_credited" val={form.cu2_credited} min="0" max="19" />
                  <InputRow label="Without Evals" id="cu2_without_eval" val={form.cu2_without_eval} min="0" max="12" />
                </div>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="Financial Status" icon="💳" defaultOpen={false}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TogglePill label="Tuition Fees Up To Date" name="tuition_up_to_date" value={form.tuition_up_to_date} onChange={update} />
              <TogglePill label="Has Outstanding Debt" name="debtor" value={form.debtor} onChange={update} />
              <TogglePill label="Scholarship Holder" name="scholarship" value={form.scholarship} onChange={update} />
              <TogglePill label="Displaced Student" name="displaced" value={form.displaced} onChange={update} />
            </div>
          </AccordionSection>

          <AccordionSection title="Personal Information" icon="👤" defaultOpen={false}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputRow label="Age at Enrollment" id="age" val={form.age} min="17" max="70" />
              
              <div className="flex flex-col gap-2 relative group">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider group-focus-within:text-[var(--accent-light)] transition-colors">Gender</label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] opacity-0 group-focus-within:opacity-100 transition-opacity rounded-l-lg z-10"></div>
                  <select
                    value={form.gender}
                    onChange={(e) => update('gender', parseInt(e.target.value))}
                    className="w-full input-field rounded-lg px-4 py-2.5 text-sm appearance-none font-medium"
                  >
                    <option value={1}>Male</option>
                    <option value={0}>Female</option>
                  </select>
                  <span className="absolute right-3 top-3 text-[var(--text-muted)] pointer-events-none text-xs">▼</span>
                </div>
              </div>

              <InputRow label="Admission Grade (0-200)" id="admission_grade" val={form.admission_grade} min="0" max="200" step="0.1" />
              <InputRow label="Prev. Qualification Grade" id="prev_qual_grade" val={form.prev_qual_grade} min="0" max="200" step="0.1" />
              
              <div className="flex flex-col gap-2 relative group">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider group-focus-within:text-[var(--accent-light)] transition-colors">Marital Status</label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] opacity-0 group-focus-within:opacity-100 transition-opacity rounded-l-lg z-10"></div>
                  <select
                    value={form.marital_status}
                    onChange={(e) => update('marital_status', parseInt(e.target.value))}
                    className="w-full input-field rounded-lg px-4 py-2.5 text-sm appearance-none font-medium"
                  >
                    <option value={1}>Single</option>
                    <option value={2}>Married</option>
                    <option value={3}>Widower</option>
                    <option value={4}>Divorced</option>
                    <option value={5}>Facto Union</option>
                    <option value={6}>Legally Separated</option>
                  </select>
                  <span className="absolute right-3 top-3 text-[var(--text-muted)] pointer-events-none text-xs">▼</span>
                </div>
              </div>
              
              <TogglePill label="International Student" name="intl" value={form.intl} onChange={update} />
            </div>
          </AccordionSection>

          <AccordionSection title="Economic Context" icon="📈" defaultOpen={false}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <InputRow label="Unemployment Rate %" id="unemployment" val={form.unemployment} min="0" max="100" step="0.1" />
              <InputRow label="Inflation Rate %" id="inflation" val={form.inflation} min="-10" max="50" step="0.1" />
              <InputRow label="GDP" id="gdp" val={form.gdp} min="-10" max="10" step="0.01" />
            </div>
          </AccordionSection>

          <div className="mt-8">
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px var(--accent-glow)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePredict}
              disabled={loading}
              className={`w-full py-5 rounded-xl font-bold tracking-wide text-lg flex items-center justify-center gap-3 transition-all ${
                loading 
                  ? 'bg-[var(--surface)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border)]' 
                  : 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-white shadow-[0_0_20px_var(--accent-glow)] outline-none focus:ring-4 focus:ring-[var(--accent-glow)]'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-[var(--text-muted)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing 47 features...
                </>
              ) : (
                <>
                  <span className="text-xl">🧠</span> Run Risk Analysis
                </>
              )}
            </motion.button>
            {error && (
              <p className="mt-4 text-center text-[var(--red)] text-sm font-medium bg-[var(--red)]/10 py-3 rounded-lg border border-[var(--red)]/20 shadow-[0_0_10px_var(--red-glow)]">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT — ResultPanel sticky container */}
        <div className="relative h-full w-full">
          <ResultPanel result={currentResult} formData={lastSubmittedForm} />
        </div>
      </div>
    </section>
  );
}
