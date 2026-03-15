async function predict() {
  const btn = document.getElementById('predictBtn');
  const errBox = document.getElementById('errorBox');

  // Gather form values
  const data = {
    cu1_enrolled:     val('cu1_enrolled'),
    cu1_approved:     val('cu1_approved'),
    cu1_grade:        val('cu1_grade'),
    cu1_evaluations:  val('cu1_evaluations'),
    cu1_credited:     val('cu1_credited'),
    cu1_without_eval: val('cu1_without_eval'),
    cu2_enrolled:     val('cu2_enrolled'),
    cu2_approved:     val('cu2_approved'),
    cu2_grade:        val('cu2_grade'),
    cu2_evaluations:  val('cu2_evaluations'),
    cu2_credited:     val('cu2_credited'),
    cu2_without_eval: val('cu2_without_eval'),
    tuition_up_to_date: radio('tuition'),
    debtor:           radio('debtor'),
    scholarship:      radio('scholarship'),
    displaced:        radio('displaced'),
    age:              val('age'),
    gender:           val('gender'),
    admission_grade:  val('admission_grade'),
    prev_qual_grade:  val('prev_qual_grade'),
    marital_status:   val('marital_status'),
    intl:             radio('intl'),
    unemployment:     val('unemployment'),
    inflation:        val('inflation'),
    gdp:              val('gdp'),
  };

  // Loading state
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Analyzing...';
  errBox.style.display = 'none';

  try {
    const res  = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();

    if (!json.success) throw new Error(json.error);

    showResult(json, data);

  } catch (e) {
    errBox.textContent = '❌ Error: ' + e.message;
    errBox.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Predict Dropout Risk';
  }
}

function showResult(json, data) {
  const { probability, risk, emoji, message } = json;

  document.getElementById('placeholder').style.display  = 'none';
  const rc = document.getElementById('resultContent');
  rc.classList.add('show');

  // Badge
  const badge = document.getElementById('riskBadge');
  badge.className = `risk-badge ${risk}`;
  badge.innerHTML = `${emoji} ${risk} RISK`;

  // Number
  const num = document.getElementById('probNumber');
  num.className = `prob-number ${risk}`;
  num.textContent = probability + '%';

  // Bar (animate after paint)
  const bar = document.getElementById('probBar');
  bar.className = `prob-bar ${risk}`;
  setTimeout(() => bar.style.width = probability + '%', 50);

  // Message
  const msg = document.getElementById('resultMessage');
  msg.className = `result-message ${risk}`;
  msg.textContent = message;

  // Key factors summary
  const pass1 = data.cu1_enrolled > 0
    ? ((data.cu1_approved / data.cu1_enrolled) * 100).toFixed(0) + '%'
    : 'N/A';
  const pass2 = data.cu2_enrolled > 0
    ? ((data.cu2_approved / data.cu2_enrolled) * 100).toFixed(0) + '%'
    : 'N/A';
  const finRisk = (data.tuition_up_to_date == 0 ? 1 : 0) + parseInt(data.debtor);

  document.getElementById('factorsBox').innerHTML = `
    <div class="factors-title">Key Factors Used</div>
    <div class="factor-item">
      <span>1st Sem Pass Rate</span>
      <span class="factor-val">${pass1}</span>
    </div>
    <div class="factor-item">
      <span>2nd Sem Pass Rate</span>
      <span class="factor-val">${pass2}</span>
    </div>
    <div class="factor-item">
      <span>Financial Risk Score</span>
      <span class="factor-val">${finRisk} / 2</span>
    </div>
    <div class="factor-item">
      <span>Grade Trend</span>
      <span class="factor-val">${data.cu2_grade >= data.cu1_grade ? '📈 Improving' : '📉 Declining'}</span>
    </div>
    <div class="factor-item">
      <span>Tuition Status</span>
      <span class="factor-val">${data.tuition_up_to_date == 1 ? '✅ Paid' : '❌ Overdue'}</span>
    </div>
  `;
}

function val(id)   { return document.getElementById(id).value; }
function radio(nm) { return document.querySelector(`input[name="${nm}"]:checked`)?.value ?? 0; }