// =========================================================
//  practice.js — Game logic for practice.html
//  Handles difficulty levels + fraction / mixed-number input
//  v2
// =========================================================

const params   = new URLSearchParams(window.location.search);
const skillKey = params.get('skill') || 'multiply2x2';
const skill    = SKILLS[skillKey];

if (!skill) {
  alert('Unknown skill. Returning home.');
  window.location.href = 'index.html';
}

// ── DOM refs ──────────────────────────────────────────────
const problemBox       = document.getElementById('problem-box');
const problemText      = document.getElementById('problem-text');
const answerInput      = document.getElementById('answer-input');
const submitBtn        = document.getElementById('submit-btn');
const submitBtnFrac    = document.getElementById('submit-btn-frac');
const fracWhole        = document.getElementById('frac-whole');
const fracNum          = document.getElementById('frac-num');
const fracDen          = document.getElementById('frac-den');
const fracHint         = document.getElementById('fraction-hint');
const rowStandard      = document.getElementById('answer-row-standard');
const rowFraction      = document.getElementById('answer-row-fraction');
const timerBar         = document.getElementById('timer-bar');
const timerText        = document.getElementById('timer-text');
const explanationPanel = document.getElementById('explanation-panel');
const explanationTitle = document.getElementById('explanation-title');
const explanationBody  = document.getElementById('explanation-body');
const nextBtn          = document.getElementById('next-btn');
const statCorrect      = document.getElementById('stat-correct');
const statWrong        = document.getElementById('stat-wrong');
const statAvg          = document.getElementById('stat-avg');
const liveDots         = [0,1,2].map(i=>document.getElementById(`life-${i}`));
const skillLabel       = document.getElementById('skill-label');
const diffPills        = document.querySelectorAll('.diff-pill');

// ── State ─────────────────────────────────────────────────
let currentProblem  = null;
let difficulty      = 'medium';
let wrongThisQ      = 0;
let totalCorrect    = 0;
let totalWrong      = 0;
let times           = [];
let questionStartMs = null;
let timerInterval   = null;
let frozen          = false;

// ── Init ──────────────────────────────────────────────────
skillLabel.textContent = skill.label;

// Hide difficulty pills if skill has no difficulty range
if (typeof skill.timeLimit === 'number') {
  document.querySelector('.diff-pills').style.display = 'none';
}

nextQuestion();

// ── Difficulty pill switching ─────────────────────────────
diffPills.forEach(pill => {
  pill.addEventListener('click', () => {
    diffPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    difficulty = pill.dataset.diff;
    nextQuestion();
  });
});

// ── Core: load a new question ─────────────────────────────
function nextQuestion() {
  frozen     = false;
  wrongThisQ = 0;
  currentProblem = skill.generate(difficulty);

  problemText.textContent = currentProblem.text;
  problemBox.classList.remove('correct','wrong');
  explanationPanel.style.display = 'none';
  liveDots.forEach(d => d.classList.remove('used'));

  setupInputUI();
  startTimer();
}

// ── Set up the correct input UI based on answerType ───────
function setupInputUI() {
  const type = currentProblem.answerType || 'integer';
  const isFrac = type === 'fraction' || type === 'mixed';

  rowStandard.style.display = isFrac ? 'none' : 'flex';
  rowFraction.style.display = isFrac ? 'flex' : 'none';

  if (isFrac) {
    fracWhole.value    = '';
    fracNum.value      = '';
    fracDen.value      = '';
    fracWhole.disabled = false;
    fracNum.disabled   = false;
    fracDen.disabled   = false;
    submitBtnFrac.disabled = false;
    if (type === 'fraction') {
      fracWhole.style.display = 'none';
      fracHint.textContent = 'Enter your answer as a fraction (numerator / denominator):';
    } else {
      fracWhole.style.display = '';
      fracHint.textContent = 'Enter your answer as a mixed number:';
    }
    // Focus first relevant field
    setTimeout(() => (type === 'fraction' ? fracNum : fracWhole).focus(), 50);
  } else {
    answerInput.value       = '';
    answerInput.disabled    = false;
    submitBtn.disabled      = false;
    answerInput.placeholder = type === 'decimal' ? 'Enter decimal (e.g. 3.5)' : 'Your answer';
    setTimeout(() => answerInput.focus(), 50);
  }
}

// ── Timer ─────────────────────────────────────────────────
function getTimeLimit() {
  const tl = skill.timeLimit;
  return typeof tl === 'object' ? tl[difficulty] : tl;
}

function startTimer() {
  clearInterval(timerInterval);
  questionStartMs = Date.now();
  timerBar.style.width      = '100%';
  timerBar.style.background = 'var(--accent)';

  timerInterval = setInterval(() => {
    const elapsed = (Date.now() - questionStartMs) / 1000;
    const ratio   = Math.max(0, 1 - elapsed / getTimeLimit());
    timerBar.style.width      = (ratio * 100) + '%';
    timerText.textContent     = elapsed.toFixed(1) + 's';
    timerBar.style.background = ratio > 0.5 ? 'var(--accent)' : ratio > 0.25 ? '#f0a030' : 'var(--wrong)';
  }, 100);
}

function stopTimer() { clearInterval(timerInterval); }

// ── Check answer ──────────────────────────────────────────
function checkAnswer() {
  if (frozen) return;

  const type = currentProblem.answerType || 'integer';
  let correct = false;

  if (type === 'fraction' || type === 'mixed') {
    correct = checkFractionAnswer(type);
  } else {
    const raw = answerInput.value.trim();
    if (raw === '') return;
    const guess = parseFloat(raw);
    correct = type === 'decimal'
      ? Math.abs(guess - currentProblem.answer) < 0.01
      : guess === currentProblem.answer;
  }

  correct ? handleCorrect() : handleWrong();
}

function checkFractionAnswer(type) {
  const wRaw = fracWhole.value.trim();
  const nRaw = fracNum.value.trim();
  const dRaw = fracDen.value.trim();

  // Allow whole-number-only answer
  if (wRaw !== '' && nRaw === '' && dRaw === '') {
    const w = parseFloat(wRaw);
    return Math.abs(w - currentProblem.answer) < 0.001;
  }

  // Need at least num and den
  if (nRaw === '' || dRaw === '') return false;
  const den = parseFloat(dRaw);
  if (den === 0) return false;
  const num = parseFloat(nRaw);
  const whole = wRaw !== '' ? parseFloat(wRaw) : 0;
  const value = whole + num / den;
  return Math.abs(value - currentProblem.answer) < 0.001;
}

function saveToStorage(correct) {
  const key = `ns_skill_${skillKey}_${difficulty}`;
  let d = {};
  try { d = JSON.parse(localStorage.getItem(key)) || {}; } catch(e) {}
  d.correct  = (d.correct  || 0) + (correct ? 1 : 0);
  d.wrong    = (d.wrong    || 0) + (correct ? 0 : 1);
  d.times    = d.times || [];
  if (correct) d.times.push(parseFloat(((Date.now()-questionStartMs)/1000).toFixed(2)));
  localStorage.setItem(key, JSON.stringify(d));
}

function handleCorrect() {
  stopTimer();
  frozen = true;
  times.push((Date.now() - questionStartMs) / 1000);
  totalCorrect++;
  updateStats();
  saveToStorage(true);
  problemBox.classList.add('correct');
  disableInputs();
  setTimeout(nextQuestion, 900);
}

function handleWrong() {
  wrongThisQ++;
  totalWrong++;
  saveToStorage(false);
  updateStats();

  const dot = wrongThisQ - 1;
  if (dot < liveDots.length) liveDots[dot].classList.add('used');

  problemBox.classList.add('wrong');
  shakeActiveInput();
  clearActiveInput();

  setTimeout(() => problemBox.classList.remove('wrong'), 500);

  if (wrongThisQ >= skill.maxWrong) {
    showExplanation();
  } else {
    refocusActiveInput();
  }
}

function shakeActiveInput() {
  const el = rowFraction.style.display !== 'none' ? fracNum : answerInput;
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = 'shake .3s';
}

function clearActiveInput() {
  if (rowFraction.style.display !== 'none') {
    fracWhole.value = fracNum.value = fracDen.value = '';
  } else {
    answerInput.value = '';
  }
}

function refocusActiveInput() {
  const type = currentProblem.answerType || 'integer';
  if (type === 'fraction' || type === 'mixed') {
    (type === 'fraction' ? fracNum : fracWhole).focus();
  } else {
    answerInput.focus();
  }
}

function disableInputs() {
  answerInput.disabled = submitBtn.disabled = true;
  fracWhole.disabled = fracNum.disabled = fracDen.disabled = submitBtnFrac.disabled = true;
}

function showExplanation() {
  frozen = true;
  stopTimer();
  disableInputs();

  // Build a readable answer string
  const type = currentProblem.answerType || 'integer';
  let ansStr = '';
  if (type === 'mixed' && currentProblem.answerMixed) {
    const {w,n,d} = currentProblem.answerMixed;
    ansStr = n === 0 ? `${w}` : `${w} and ${n}/${d}`;
  } else if (type === 'fraction' && currentProblem.answerFrac) {
    ansStr = `${currentProblem.answerFrac.n}/${currentProblem.answerFrac.d}`;
  } else if (type === 'decimal') {
    ansStr = currentProblem.answer.toFixed(4);
  } else {
    ansStr = String(currentProblem.answer);
  }

  explanationTitle.textContent = `The answer is ${ansStr}.`;
  explanationBody.textContent  = currentProblem.explanation;
  explanationPanel.style.display = 'flex';
}

// ── Stats ─────────────────────────────────────────────────
function updateStats() {
  statCorrect.textContent = totalCorrect;
  statWrong.textContent   = totalWrong;
  statAvg.textContent     = times.length
    ? (times.reduce((a,b)=>a+b,0)/times.length).toFixed(1)+'s'
    : '—';
}

// ── Events ────────────────────────────────────────────────
submitBtn.addEventListener('click', checkAnswer);
submitBtnFrac.addEventListener('click', checkAnswer);

answerInput.addEventListener('keydown', e => { if (e.key==='Enter') checkAnswer(); });
[fracWhole, fracNum, fracDen].forEach(el => {
  el.addEventListener('keydown', e => { if (e.key==='Enter') checkAnswer(); });
});

nextBtn.addEventListener('click', nextQuestion);

// Tab through fraction fields: whole → num → den → check
fracWhole.addEventListener('keydown', e => { if (e.key==='Tab') { e.preventDefault(); fracNum.focus(); }});
fracNum.addEventListener('keydown',   e => { if (e.key==='Tab') { e.preventDefault(); fracDen.focus(); }});
fracDen.addEventListener('keydown',   e => { if (e.key==='Tab') { e.preventDefault(); submitBtnFrac.focus(); }});

// ── Shake keyframe ────────────────────────────────────────
const s = document.createElement('style');
s.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`;
document.head.appendChild(s);
