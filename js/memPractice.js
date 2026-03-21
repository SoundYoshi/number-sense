// =========================================================
//  memPractice.js — Game logic for memorize.html
//  Identical flow to practice.js but reads from MEM_SKILLS
// =========================================================

const params   = new URLSearchParams(window.location.search);
const skillKey = params.get('skill');
const skill    = MEM_SKILLS[skillKey];

if (!skill) {
  alert('Unknown memorization skill. Returning home.');
  window.location.href = 'index.html';
}

// ── DOM refs ──────────────────────────────────────────────
const problemBox       = document.getElementById('problem-box');
const problemText      = document.getElementById('problem-text');
const answerInput      = document.getElementById('answer-input');
const submitBtn        = document.getElementById('submit-btn');
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

// ── State ─────────────────────────────────────────────────
let current    = null;
let wrongThisQ = 0;
let totalRight = 0, totalWrong = 0;
let times      = [];
let startMs    = null;
let timerInt   = null;
let frozen     = false;

// ── Init ──────────────────────────────────────────────────
skillLabel.textContent = skill.label;
nextQuestion();

// ─────────────────────────────────────────────────────────
function nextQuestion() {
  frozen     = false;
  wrongThisQ = 0;
  current    = skill.generate();

  problemText.textContent = current.prompt;
  problemBox.classList.remove('correct','wrong');
  answerInput.value       = '';
  answerInput.disabled    = false;
  submitBtn.disabled      = false;
  answerInput.placeholder = current.acceptDecimal ? 'Enter decimal' : 'Your answer';
  answerInput.type        = 'text';
  explanationPanel.style.display = 'none';
  liveDots.forEach(d=>d.classList.remove('used'));

  startTimer();
  answerInput.focus();
}

function startTimer() {
  clearInterval(timerInt);
  startMs = Date.now();
  timerBar.style.width = '100%';
  timerBar.style.background = 'var(--accent)';

  timerInt = setInterval(()=>{
    const elapsed = (Date.now()-startMs)/1000;
    const ratio   = Math.max(0, 1-elapsed/skill.timeLimit);
    timerBar.style.width = (ratio*100)+'%';
    timerText.textContent = elapsed.toFixed(1)+'s';
    if (ratio > 0.5)       timerBar.style.background = 'var(--accent)';
    else if (ratio > 0.25) timerBar.style.background = '#f0a030';
    else                   timerBar.style.background = 'var(--wrong)';
  }, 100);
}

function stopTimer() { clearInterval(timerInt); }

function checkAnswer() {
  if (frozen) return;
  const raw = answerInput.value.trim();
  if (raw === '') return;

  const guess   = parseFloat(raw);
  const correct = current.acceptDecimal
    ? Math.abs(guess - current.answer) < 0.01
    : guess === current.answer;

  correct ? handleCorrect() : handleWrong();
}

function handleCorrect() {
  stopTimer();
  frozen = true;
  times.push((Date.now()-startMs)/1000);
  totalRight++;
  updateStats();
  problemBox.classList.add('correct');
  answerInput.disabled = submitBtn.disabled = true;
  setTimeout(nextQuestion, 900);
}

function handleWrong() {
  wrongThisQ++;
  totalWrong++;
  updateStats();
  const dot = wrongThisQ-1;
  if (dot < liveDots.length) liveDots[dot].classList.add('used');
  problemBox.classList.add('wrong');
  answerInput.value = '';
  answerInput.style.animation = 'none';
  void answerInput.offsetWidth;
  answerInput.style.animation = 'shake .3s';
  setTimeout(()=>problemBox.classList.remove('wrong'), 500);
  if (wrongThisQ >= skill.maxWrong) showExplanation();
  else answerInput.focus();
}

function showExplanation() {
  frozen = true;
  stopTimer();
  answerInput.disabled = submitBtn.disabled = true;
  explanationTitle.textContent = `Answer: ${current.acceptDecimal
    ? Number(current.answer).toFixed(4)
    : current.answer}`;
  explanationBody.textContent  = current.explanation;
  explanationPanel.style.display = 'flex';
}

function updateStats() {
  statCorrect.textContent = totalRight;
  statWrong.textContent   = totalWrong;
  statAvg.textContent     = times.length
    ? (times.reduce((a,b)=>a+b,0)/times.length).toFixed(1)+'s'
    : '—';
}

submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', e=>{ if(e.key==='Enter') checkAnswer(); });
nextBtn.addEventListener('click', nextQuestion);

// Shake keyframe
const s = document.createElement('style');
s.textContent=`@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`;
document.head.appendChild(s);
