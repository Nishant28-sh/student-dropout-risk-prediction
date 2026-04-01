async function predict() {
  const btn    = document.getElementById('predictBtn');
  const errBar = document.getElementById('errorBar');
  const errMsg = document.getElementById('errorMsg');

  const data = {
    cu1_enrolled:       val('cu1_enrolled'),
    cu1_approved:       val('cu1_approved'),
    cu1_grade:          val('cu1_grade'),
    cu1_evaluations:    val('cu1_evaluations'),
    cu1_credited:       val('cu1_credited'),
    cu1_without_eval:   val('cu1_without_eval'),
    cu2_enrolled:       val('cu2_enrolled'),
    cu2_approved:       val('cu2_approved'),
    cu2_grade:          val('cu2_grade'),
    cu2_evaluations:    val('cu2_evaluations'),
    cu2_credited:       val('cu2_credited'),
    cu2_without_eval:   val('cu2_without_eval'),
    tuition_up_to_date: radio('tuition'),
    debtor:             radio('debtor'),
    scholarship:        radio('scholarship'),
    displaced:          radio('displaced'),
    age:                val('age'),
    gender:             val('gender'),
    admission_grade:    val('admission_grade'),
    prev_qual_grade:    val('prev_qual_grade'),
    marital_status:     val('marital_status'),
    intl:               radio('intl'),
    prev_qual:          val('prev_qual'),
    mother_qual:        val('mother_qual'),
    father_qual:        val('father_qual'),
    special_needs:      radio('special_needs'),
    unemployment:       val('unemployment'),
    inflation:          val('inflation'),
    gdp:                val('gdp'),
  };

  // Loading state
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Analysing...';
  errBar.style.display = 'none';

  try {
    const res  = await fetch('/predict', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });
    const json = await res.json();

    if (!json.success) throw new Error(json.error || 'Prediction failed');
    showResult(json, data);

  } catch (e) {
    errMsg.textContent = e.message;
    errBar.style.display = 'flex';
  } finally {
    btn.disabled = false;
    btn.innerHTML = `
      <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
        <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
        <path d="M10 7v3l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      Analyse Dropout Risk`;
  }
}

function showResult(json, data) {
  const { probability, risk, emoji, message } = json;

  // ── Show result panel, hide placeholder ──
  document.getElementById('placeholder').style.display    = 'none';
  document.getElementById('resultDisplay').style.display  = 'block';
  document.getElementById('guidanceCard').style.display   = 'block';

  // Activate status dot
  document.getElementById('statusDot').classList.add('active');

  // ── Risk header ──
  const riskHeader = document.getElementById('riskHeader');
  riskHeader.className = `risk-header ${risk}`;

  document.getElementById('riskEmoji').textContent = emoji || (risk === 'HIGH' ? '🔴' : risk === 'MEDIUM' ? '🟡' : '🟢');

  const riskLevel = document.getElementById('riskLevel');
  riskLevel.className = `risk-level ${risk}`;
  riskLevel.textContent = `${risk} RISK`;

  const subtitles = { HIGH: 'Immediate attention required', MEDIUM: 'Monitor closely', LOW: 'On track' };
  document.getElementById('riskSub').textContent = subtitles[risk] || '';

  // ── Probability ring ──
  const pct = Math.round(parseFloat(probability));
  const ring = document.getElementById('ringFill');
  const circumference = 314;
  const offset = circumference - (pct / 100) * circumference;

  const ringColors = { HIGH: '#f04f4f', MEDIUM: '#f0a832', LOW: '#2ecc8a' };
  ring.style.stroke = ringColors[risk] || '#4f7ef7';
  setTimeout(() => { ring.style.strokeDashoffset = offset; }, 60);

  const probNum = document.getElementById('probNum');
  probNum.className = `prob-num ${risk}`;
  probNum.textContent = pct + '%';

  // ── Probability bar ──
  const bar = document.getElementById('probBarFill');
  bar.className = `prob-bar-fill ${risk}`;
  setTimeout(() => { bar.style.width = pct + '%'; }, 60);

  // ── Message ──
  const msg = document.getElementById('riskMessage');
  msg.className = `risk-message ${risk}`;
  msg.textContent = message || '';

  // ── Key factors table ──
  const pass1 = data.cu1_enrolled > 0
    ? Math.round((data.cu1_approved / data.cu1_enrolled) * 100) + '%'
    : 'N/A';
  const pass2 = data.cu2_enrolled > 0
    ? Math.round((data.cu2_approved / data.cu2_enrolled) * 100) + '%'
    : 'N/A';
  const finRisk = (parseInt(data.tuition_up_to_date) === 0 ? 1 : 0) + parseInt(data.debtor);
  const gradeTrend = parseFloat(data.cu2_grade) >= parseFloat(data.cu1_grade) ? '↑ Improving' : '↓ Declining';

  const factors = [
    { label: '1st Sem pass rate',  val: pass1 },
    { label: '2nd Sem pass rate',  val: pass2 },
    { label: 'Financial risk',     val: `${finRisk} / 2` },
    { label: 'Grade trend',        val: gradeTrend },
    { label: 'Tuition status',     val: parseInt(data.tuition_up_to_date) === 1 ? 'Paid' : 'Overdue' },
    { label: 'Scholarship',        val: parseInt(data.scholarship) === 1 ? 'Yes' : 'No' },
  ];

  document.getElementById('factorsTable').innerHTML = factors.map(f => `
    <div class="factor-row">
      <span class="factor-label">${f.label}</span>
      <span class="factor-val">${f.val}</span>
    </div>
  `).join('');

  // ── Intervention guidance ──
  const guidance = getGuidance(risk, data);
  document.getElementById('guidanceBody').innerHTML = guidance.map(g => `
    <div class="guidance-item">
      <div class="guidance-dot ${risk}"></div>
      <span>${g}</span>
    </div>
  `).join('');
}

function getGuidance(risk, data) {
  const base = {
    HIGH: [
      'Schedule an immediate one-on-one meeting with the student.',
      'Review financial aid options — student may have unresolved tuition debt.',
      'Connect with academic advisor to create a recovery plan.',
      'Check attendance records and flag any patterns of absence.',
      'Consider referring to counselling services if personal factors are at play.',
    ],
    MEDIUM: [
      'Reach out to the student proactively before issues escalate.',
      'Review 2nd semester performance relative to 1st semester.',
      'Confirm tuition status and remind of scholarship deadlines.',
      'Encourage participation in peer tutoring or study groups.',
    ],
    LOW: [
      'Student appears to be on a stable track — continue monitoring.',
      'Acknowledge academic progress to reinforce positive behaviour.',
      'Remind student of available support resources for future semesters.',
    ],
  };

  const tips = [...(base[risk] || base.LOW)];

  if (parseInt(data.debtor) === 1)               tips.unshift('⚠ Student is flagged as a debtor — prioritise financial support discussion.');
  if (parseInt(data.tuition_up_to_date) === 0)   tips.unshift('⚠ Tuition is not up to date — verify payment plan or hardship assistance.');
  if (parseFloat(data.cu2_grade) < parseFloat(data.cu1_grade)) tips.push('Grade decline detected — check for 2nd semester workload stress.');

  return tips;
}

// ── Helpers ──
function val(id)   { return document.getElementById(id)?.value ?? ''; }
function radio(nm) { return document.querySelector(`input[name="${nm}"]:checked`)?.value ?? '0'; }
