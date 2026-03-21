// =========================================================
//  memSkills.js — Memorization practice skills
//  Based on Bryant Heath's Number Sense Tricks Manual §2
//  generate() → { prompt, answer, explanation, acceptDecimal? }
// =========================================================

function randInt(lo, hi) { return Math.floor(Math.random()*(hi-lo+1))+lo; }
function pick(arr) { return arr[randInt(0, arr.length-1)]; }

// ─────────────────────────────────────────────────────────
const MEM_SKILLS = {

  // ══════════════════════════════════════════════════════
  // §2.1.1  PERFECT SQUARES  (11²–50²)
  // ══════════════════════════════════════════════════════
  squares: {
    label: 'Perfect Squares (11–50)',
    category: 'Numbers',
    timeLimit: 8,
    maxWrong: 3,
    generate() {
      const n = randInt(11, 50);
      const answer = n * n;
      // Show the trick that matches best
      let trick = '';
      if (n % 10 === 5) {
        const t = Math.floor(n/10);
        trick = `Ends-in-5 trick: ${t}×${t+1} | 25  →  ${t*(t+1)}25`;
      } else if (n >= 41 && n <= 59) {
        const d = n - 50;
        trick = `From-50 trick: (25${d>=0?'+':''}${d}) | ${d}²  →  ${25+d}${String(d*d).padStart(2,'0')}`;
      } else {
        const a = Math.floor(n/10)*10, b = n%10;
        trick = `(${a}+${b})² = ${a*a} + ${2*a*b} + ${b*b} = ${answer}`;
      }
      return {
        prompt: `${n}² = ?`,
        answer,
        explanation: `${n}² = ${answer}\n\n${trick}\n\nMemorize all squares 11–50 for instant recall.`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.1.2  PERFECT CUBES  (5³–20³)
  // ══════════════════════════════════════════════════════
  cubes: {
    label: 'Perfect Cubes (5–20)',
    category: 'Numbers',
    timeLimit: 10,
    maxWrong: 3,
    generate() {
      const n = randInt(5, 20);
      const answer = n * n * n;
      const cubeTable = {5:125,6:216,7:343,8:512,9:729,10:1000,
                         11:1331,12:1728,13:2197,14:2744,15:3375,
                         16:4096,17:4913,18:5832,19:6859,20:8000};
      return {
        prompt: `${n}³ = ?`,
        answer,
        explanation:
          `${n}³ = ${answer}\n\n` +
          `Cube table to memorize (5–20):\n` +
          `  5³=125   6³=216   7³=343   8³=512   9³=729\n` +
          ` 10³=1000 11³=1331 12³=1728 13³=2197 14³=2744\n` +
          ` 15³=3375 16³=4096 17³=4913 18³=5832 19³=6859\n` +
          ` 20³=8000`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.1.3  POWERS OF 2 (2³–2¹⁰)
  // ══════════════════════════════════════════════════════
  powersOf2: {
    label: 'Powers of 2 (2³–2¹⁰)',
    category: 'Numbers',
    timeLimit: 8,
    maxWrong: 3,
    generate() {
      const exp = randInt(3, 10);
      const answer = Math.pow(2, exp);
      return {
        prompt: `2^${exp} = ?`,
        answer,
        explanation:
          `2^${exp} = ${answer}\n\n` +
          `Powers of 2 to memorize:\n` +
          `  2³=8   2⁴=16  2⁵=32  2⁶=64\n` +
          `  2⁷=128 2⁸=256 2⁹=512 2¹⁰=1024\n\n` +
          `Each value is double the previous one.`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.1.3  POWERS OF 3 (3³–3⁷)
  // ══════════════════════════════════════════════════════
  powersOf3: {
    label: 'Powers of 3 (3³–3⁷)',
    category: 'Numbers',
    timeLimit: 8,
    maxWrong: 3,
    generate() {
      const exp = randInt(3, 7);
      const answer = Math.pow(3, exp);
      return {
        prompt: `3^${exp} = ?`,
        answer,
        explanation:
          `3^${exp} = ${answer}\n\n` +
          `Powers of 3 to memorize:\n` +
          `  3³=27  3⁴=81  3⁵=243  3⁶=729  3⁷=2187\n\n` +
          `Pattern: each multiplies the previous by 3.`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.1.3  POWERS OF 5 (5³–5⁵)
  // ══════════════════════════════════════════════════════
  powersOf5: {
    label: 'Powers of 5 (5³–5⁵)',
    category: 'Numbers',
    timeLimit: 8,
    maxWrong: 3,
    generate() {
      const exp = randInt(3, 5);
      const answer = Math.pow(5, exp);
      return {
        prompt: `5^${exp} = ?`,
        answer,
        explanation:
          `5^${exp} = ${answer}\n\n` +
          `Powers of 5 to memorize:\n` +
          `  5³=125  5⁴=625  5⁵=3125\n\n` +
          `Shortcut: 5^n = 10^n / 2^n. For example,\n` +
          `  5⁴ = 10000 / 16 = 625.`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.1.4  FRACTION → DECIMAL / PERCENT
  // ══════════════════════════════════════════════════════
  fractionToDecimal: {
    label: 'Fraction ↔ Decimal/Percent',
    category: 'Fractions',
    timeLimit: 10,
    maxWrong: 3,
    generate() {
      // Key fractions from the manual
      const fracs = [
        {n:1,d:6,  dec:0.16667, pct:'16⅔%'},
        {n:5,d:6,  dec:0.83333, pct:'83⅓%'},
        {n:1,d:7,  dec:0.14286, pct:'14²⁄₇%'},
        {n:2,d:7,  dec:0.28571, pct:'28⁴⁄₇%'},
        {n:3,d:7,  dec:0.42857, pct:'42⁶⁄₇%'},
        {n:4,d:7,  dec:0.57143, pct:'57¹⁄₇%'},
        {n:5,d:7,  dec:0.71429, pct:'71³⁄₇%'},
        {n:6,d:7,  dec:0.85714, pct:'85⁵⁄₇%'},
        {n:1,d:8,  dec:0.125,   pct:'12.5%'},
        {n:3,d:8,  dec:0.375,   pct:'37.5%'},
        {n:5,d:8,  dec:0.625,   pct:'62.5%'},
        {n:7,d:8,  dec:0.875,   pct:'87.5%'},
        {n:1,d:9,  dec:0.11111, pct:'11⅑%'},
        {n:2,d:9,  dec:0.22222, pct:'22²⁄₉%'},
        {n:4,d:9,  dec:0.44444, pct:'44⁴⁄₉%'},
        {n:7,d:9,  dec:0.77778, pct:'77⁷⁄₉%'},
        {n:8,d:9,  dec:0.88889, pct:'88⁸⁄₉%'},
        {n:1,d:11, dec:0.09091, pct:'9¹⁄₁₁%'},
        {n:2,d:11, dec:0.18182, pct:'18²⁄₁₁%'},
        {n:3,d:11, dec:0.27273, pct:'27³⁄₁₁%'},
        {n:5,d:11, dec:0.45455, pct:'45⁵⁄₁₁%'},
        {n:9,d:11, dec:0.81818, pct:'81⁹⁄₁₁%'},
        {n:1,d:12, dec:0.08333, pct:'8⅓%'},
        {n:5,d:12, dec:0.41667, pct:'41⅔%'},
        {n:7,d:12, dec:0.58333, pct:'58⅓%'},
        {n:11,d:12,dec:0.91667, pct:'91⅔%'},
        {n:1,d:16, dec:0.0625,  pct:'6.25%'},
        {n:3,d:16, dec:0.1875,  pct:'18.75%'},
        {n:7,d:16, dec:0.4375,  pct:'43.75%'},
        {n:9,d:16, dec:0.5625,  pct:'56.25%'},
        {n:13,d:16,dec:0.8125,  pct:'81.25%'},
        {n:1,d:14, dec:0.07143, pct:'7¹⁄₇%'},
        {n:3,d:14, dec:0.21429, pct:'21³⁄₇%'},
        {n:9,d:14, dec:0.64286, pct:'64²⁄₇%'},
        {n:11,d:14,dec:0.78571, pct:'78⁴⁄₇%'},
      ];
      const f    = pick(fracs);
      const mode = pick(['dec','pct','fracFromDec']);
      if (mode === 'dec') {
        return {
          prompt: `${f.n}/${f.d} as a decimal (4 places)?`,
          answer: f.dec,
          acceptDecimal: true,
          explanation:
            `${f.n}/${f.d} = ${f.dec.toFixed(5)}…\n\n` +
            `As a percent: ${f.pct}\n\n` +
            `Tip: memorize these key fractions cold —\n` +
            `they appear constantly in the first column.`,
        };
      } else if (mode === 'pct') {
        // ask as "what % is n/d" — integer or nearest tenth
        const pctNum = Math.round(f.n/f.d*10000)/100;
        return {
          prompt: `${f.n}/${f.d} as a % (nearest tenth)?`,
          answer: pctNum,
          acceptDecimal: true,
          explanation:
            `${f.n}/${f.d} = ${f.dec.toFixed(5)}… = ${f.pct}\n\n` +
            `≈ ${pctNum}%\n\n` +
            `These repeating decimals recur in disguised form —\n` +
            `e.g. 0.0909… = 1/11, so ×11 undoes the division.`,
        };
      } else {
        // give decimal, ask for fraction denominator
        return {
          prompt: `0.${String(Math.round(f.dec*10000)).padStart(4,'0')}… — what is the denominator?`,
          answer: f.d,
          explanation:
            `0.${String(Math.round(f.dec*10000)).padStart(4,'0')}… = ${f.n}/${f.d}\n\n` +
            `Denominator = ${f.d}\n\n` +
            `Recognizing these decimals on sight is key\n` +
            `to flying through the early columns.`,
        };
      }
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.1.5  SPECIAL INTEGERS (999, 1001, etc.)
  // ══════════════════════════════════════════════════════
  specialIntegers: {
    label: 'Special Integer Tricks (999, 1001…)',
    category: 'Numbers',
    timeLimit: 30,
    maxWrong: 3,
    generate() {
      const problems = [
        // 1001 = 7×11×13; 77 = 7×11; 143 = 11×13; 91 = 7×13
        { prompt: '385 × 13 =',   answer: 5005,
          explanation: '385 × 13 = 77×5×13 = (1001/13)×5×13 = 1001×5 = 5005\n\n1001 = 7×11×13\n77 = 1001/13  |  143 = 1001/7  |  91 = 1001/11\nSplitting through 1001 turns hard products into easy ones.' },
        { prompt: '143 × 35 =',   answer: 5005,
          explanation: '143 × 35 = 143×5×7 = (1001/7)×5×7 = 1001×5 = 5005\n\n1001 = 7×11×13. Spotting a factor of 7, 11, or 13 and the complementary pair instantly gives 1001.' },
        { prompt: '1001 × 7 =',   answer: 7007,
          explanation: '1001 × 7 = 7007\n\n1001 = 7×11×13, so ×7 = ×7²×11×13 = 7007.\nPattern: 1001 × n pastes n twice with "00" in the middle: 1001×7=7007, 1001×5=5005, 1001×12=12012.' },
        { prompt: '715 × 28 =',   answer: 20020,
          explanation: '715 × 28 = 715×4×7 = (1001×10/1.4)×… \nFaster: 715 = 5×143 = 5×11×13\n715×28 = 5×11×13×4×7 = 5×4×(7×11×13) = 20×1001 = 20020\n\nSpot the 1001 factor: 7×11×13 = 1001.' },
        { prompt: '429 × 21 =',   answer: 9009,
          explanation: '429 × 21 = 3×143×21 = 3×11×13×3×7 = 9×(7×11×13) = 9×1001 = 9009\n\n9009 is a palindrome — a fun check!\n1001 trick: factor out 7, 11, or 13 to find a 1001 hiding inside.' },
        { prompt: '999 × 27 =',   answer: 26973,
          explanation: '999 × 27 = 27000 − 27 = 26973\n\n999 trick: n×999 = n×1000 − n. Much faster than multiplying directly!\nAlso: 999 = 27×37.' },
        { prompt: '999 × 45 =',   answer: 44955,
          explanation: '999 × 45 = 45000 − 45 = 44955\n\n999 trick: n×999 = n×1000 − n.' },
        { prompt: '3367 × 21 =',  answer: 70707,
          explanation: '3367 × 21 = 3367×3×7 = (10101/3)×3×7 = 10101×7 = 70707\n\n10101 = 3×7×13×37\n3367 = 10101/3. Spot the 10101 family!' },
        { prompt: '1443 × 7 =',   answer: 10101,
          explanation: '1443 × 7 = 10101\n\n10101 = 3×7×481 = 3×7×13×37 = 1443×7\nAlso = 10101. Pattern: 1443 = 10101/7.' },
      ];
      return pick(problems);
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.2.1  SUM OF SERIES
  // ══════════════════════════════════════════════════════
  sumOfSeries: {
    label: 'Sum of Series Formulas',
    category: 'Formulas',
    timeLimit: 25,
    maxWrong: 3,
    generate() {
      const type = randInt(0, 4);
      if (type === 0) {
        // Sum of first m integers: m(m+1)/2
        const m = randInt(5, 25);
        const answer = m*(m+1)/2;
        return {
          prompt: `1 + 2 + 3 + … + ${m} = ?`,
          answer,
          explanation: `Sum of first ${m} integers:\nFormula: m(m+1)/2\n= ${m}×${m+1}/2 = ${m*(m+1)}/2 = ${answer}\n\nMemorize: Σn = m(m+1)/2`,
        };
      } else if (type === 1) {
        // Sum of first m odd integers: m²
        const m = randInt(3, 12);
        const last = 2*m-1;
        const answer = m*m;
        return {
          prompt: `1 + 3 + 5 + … + ${last} = ?`,
          answer,
          explanation: `Sum of first ${m} odd integers = m²\n\nCount the terms: (${last}+1)/2 = ${m}\nAnswer: ${m}² = ${answer}\n\nMemorize: sum of first m odds = m²`,
        };
      } else if (type === 2) {
        // Sum of first m even integers: m(m+1)
        const m = randInt(3, 12);
        const last = 2*m;
        const answer = m*(m+1);
        return {
          prompt: `2 + 4 + 6 + … + ${last} = ?`,
          answer,
          explanation: `Sum of first ${m} even integers = m(m+1)\n\nLast term = ${last}, so m = ${last}/2 = ${m}\nAnswer: ${m}×${m+1} = ${answer}\n\nMemorize: Σ(2n) = m(m+1)`,
        };
      } else if (type === 3) {
        // General arithmetic series
        const a1 = randInt(2,8)*randInt(1,3);
        const d  = randInt(2,8);
        const m  = randInt(4,10);
        const am = a1 + (m-1)*d;
        const answer = (a1+am)*m/2;
        return {
          prompt: `${a1} + ${a1+d} + ${a1+2*d} + … + ${am} = ?`,
          answer,
          explanation: `Arithmetic series: (first + last) × terms / 2\n\nFirst = ${a1}, Last = ${am}\nTerms = (${am}−${a1})/${d} + 1 = ${m}\nAnswer = (${a1}+${am})×${m}/2 = ${a1+am}×${m}/2 = ${answer}\n\nFormula: (a₁+aₘ)×m/2`,
        };
      } else {
        // Sum of first m cubes: [m(m+1)/2]²
        const m = randInt(3, 8);
        const tri = m*(m+1)/2;
        const answer = tri*tri;
        return {
          prompt: `1³ + 2³ + 3³ + … + ${m}³ = ?`,
          answer,
          explanation: `Sum of first ${m} cubes = [m(m+1)/2]²\n\n= [${m}×${m+1}/2]² = ${tri}² = ${answer}\n\nNote: this equals the square of the ${m}th triangular number!\nMemorize: Σn³ = [m(m+1)/2]²`,
        };
      }
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.2.3  INTEGRAL DIVISORS
  // ══════════════════════════════════════════════════════
  integralDivisors: {
    label: 'Integral Divisors',
    category: 'Formulas',
    timeLimit: 30,
    maxWrong: 3,
    generate() {
      // Generate n = p^a × q^b × ...
      const bases   = [2,3,5,7,11];
      const numBase = randInt(1,3);
      const chosen  = bases.slice().sort(()=>Math.random()-0.5).slice(0,numBase);
      const exps    = chosen.map(()=>randInt(1,4));
      const n       = chosen.reduce((acc,b,i)=>acc*Math.pow(b,exps[i]),1);
      const type    = pick(['count','sum']);

      if (n > 5000) return MEM_SKILLS.integralDivisors.generate(); // keep manageable

      // Count divisors: product of (e+1)
      const countDiv = exps.reduce((a,e)=>a*(e+1),1);

      // Sum divisors: product of (p^(e+1)-1)/(p-1)
      function sumDiv(p,e) {
        let s=0; for(let i=0;i<=e;i++) s+=Math.pow(p,i); return s;
      }
      const totalSum = chosen.reduce((a,b,i)=>a*sumDiv(b,exps[i]),1);

      const factorStr = chosen.map((b,i)=>exps[i]>1?`${b}^${exps[i]}`:`${b}`).join(' × ');

      if (type === 'count') {
        return {
          prompt: `How many positive divisors does ${n} have?`,
          answer: countDiv,
          explanation:
            `${n} = ${factorStr}\n\n` +
            `Formula: multiply (exponent + 1) for each prime factor.\n` +
            `  ${exps.map((e,i)=>`(${e}+1)`).join(' × ')} = ${countDiv}\n\n` +
            `So ${n} has ${countDiv} positive divisors.\n\n` +
            `Quick check: perfect squares always have an odd number of divisors.`,
        };
      } else {
        return {
          prompt: `Sum of all positive divisors of ${n}?`,
          answer: totalSum,
          explanation:
            `${n} = ${factorStr}\n\n` +
            `Formula: for each prime factor p^e, compute (p^(e+1)−1)/(p−1),\n` +
            `then multiply those together.\n\n` +
            chosen.map((b,i)=>`  (${b}^${exps[i]+1}−1)/(${b}−1) = ${sumDiv(b,exps[i])}`).join('\n') + '\n\n' +
            `Product = ${totalSum}`,
        };
      }
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.2.4 / 2.2.5  POLYGON DIAGONALS & ANGLES
  // ══════════════════════════════════════════════════════
  polygons: {
    label: 'Polygon Diagonals & Angles',
    category: 'Formulas',
    timeLimit: 20,
    maxWrong: 3,
    generate() {
      const names = ['triangle','quadrilateral','pentagon','hexagon','heptagon','octagon','nonagon','decagon'];
      const n     = randInt(3, 10);
      const name  = names[n-3];
      const type  = pick(['diagonals','sumInterior','interiorAngle','exterior']);

      if (type === 'diagonals') {
        const answer = n*(n-3)/2;
        return {
          prompt: `How many diagonals does a ${name} have?`,
          answer,
          explanation:
            `Diagonals formula: n(n−3)/2\n\n` +
            `  ${n}×(${n}−3)/2 = ${n}×${n-3}/2 = ${answer}\n\n` +
            `Why: from each of ${n} vertices draw ${n-3} diagonals,\n` +
            `giving ${n*(n-3)} total, but each is counted twice → ÷2.`,
        };
      } else if (type === 'sumInterior') {
        const answer = 180*(n-2);
        return {
          prompt: `Sum of interior angles of a regular ${name}?`,
          answer,
          explanation:
            `Sum of interior angles = 180(n−2)°\n\n` +
            `  180×(${n}−2) = 180×${n-2} = ${answer}°\n\n` +
            `Comes from splitting the polygon into (n−2) triangles.`,
        };
      } else if (type === 'interiorAngle') {
        const answer = Math.round(180*(n-2)/n*100)/100;
        return {
          prompt: `Interior angle of a regular ${name}?`,
          answer,
          acceptDecimal: true,
          explanation:
            `Interior angle = 180(n−2)/n\n\n` +
            `  180×${n-2}/${n} = ${180*(n-2)}/${n} = ${answer}°\n\n` +
            `Or: 180° − (360°/${n}) = 180 − ${Math.round(360/n*100)/100} = ${answer}°`,
        };
      } else {
        const answer = Math.round(360/n*100)/100;
        return {
          prompt: `Exterior angle of a regular ${name}?`,
          answer,
          acceptDecimal: true,
          explanation:
            `Exterior angle = 360°/n\n\n` +
            `  360/${n} = ${answer}°\n\n` +
            `Key fact: sum of ALL exterior angles of ANY polygon = 360°.\n` +
            `This is the one formula to memorize cold.`,
        };
      }
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.2.6  POLYGONAL NUMBERS  (triangular, pentagonal, etc.)
  // ══════════════════════════════════════════════════════
  polygonalNumbers: {
    label: 'Polygonal Numbers (Triangular, Pentagonal…)',
    category: 'Formulas',
    timeLimit: 20,
    maxWrong: 3,
    generate() {
      const types = [
        { name:'triangular', M:3, formula: n=>n*(n+1)/2 },
        { name:'square',     M:4, formula: n=>n*n },
        { name:'pentagonal', M:5, formula: n=>n*(3*n-1)/2 },
        { name:'hexagonal',  M:6, formula: n=>n*(4*n-2)/2 },
        { name:'heptagonal', M:7, formula: n=>n*(5*n-3)/2 },
        { name:'octagonal',  M:8, formula: n=>n*(6*n-4)/2 },
      ];
      const t   = pick(types);
      const n   = randInt(3, 12);
      const answer = t.formula(n);
      const mGonal = `n[(M−2)n − (M−4)]/2`;
      return {
        prompt: `The ${n}${['st','nd','rd'][n-1]||'th'} ${t.name} number?`,
        answer,
        explanation:
          `${t.name.charAt(0).toUpperCase()+t.name.slice(1)} number formula (M=${t.M}):\n` +
          `  n[(M−2)n − (M−4)] / 2\n\n` +
          `  n=${n}, M=${t.M}:\n` +
          `  ${n}[(${t.M}−2)×${n} − (${t.M}−4)] / 2\n` +
          `  = ${n}[${t.M-2}×${n} − ${t.M-4}] / 2\n` +
          `  = ${n}[${(t.M-2)*n} − ${t.M-4}] / 2\n` +
          `  = ${n}×${(t.M-2)*n-(t.M-4)} / 2\n` +
          `  = ${answer}\n\n` +
          `Master formula: Mₙ = n[(M−2)n − (M−4)] / 2`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.2.10  COMBINATIONS & PERMUTATIONS
  // ══════════════════════════════════════════════════════
  combsPerm: {
    label: 'Combinations & Permutations',
    category: 'Formulas',
    timeLimit: 25,
    maxWrong: 3,
    generate() {
      const n = randInt(4, 9), r = randInt(2, n-1);
      const type = pick(['P','C']);
      function fact(x) { let f=1; for(let i=2;i<=x;i++) f*=i; return f; }
      if (type === 'P') {
        const answer = fact(n)/fact(n-r);
        return {
          prompt: `${n}P${r} = ?`,
          answer,
          explanation:
            `Permutations: ₙPᵣ = n! / (n−r)!\n\n` +
            `  ${n}P${r} = ${n}! / ${n-r}!\n` +
            `  = ${n}×${n-1}×…×${n-r+1}\n` +
            `  = ${answer}\n\n` +
            `Use when ORDER matters (arrangements).`,
        };
      } else {
        const answer = fact(n)/(fact(r)*fact(n-r));
        return {
          prompt: `${n}C${r} = ?`,
          answer,
          explanation:
            `Combinations: ₙCᵣ = n! / (r!(n−r)!)\n\n` +
            `  ${n}C${r} = ${n}! / (${r}! × ${n-r}!)\n` +
            `  = ${n}P${r} / ${r}!\n` +
            `  = ${fact(n)/fact(n-r)} / ${fact(r)}\n` +
            `  = ${answer}\n\n` +
            `Use when ORDER does NOT matter (selections).\n` +
            `Shortcut: ₙCᵣ = ₙPᵣ / r!`,
        };
      }
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.2.11  TRIG VALUES AT SPECIAL ANGLES
  // ══════════════════════════════════════════════════════
  trigValues: {
    label: 'Trig Values at Special Angles',
    category: 'Formulas',
    timeLimit: 15,
    maxWrong: 3,
    generate() {
      // All special angle values
      const exact = [
        {fn:'sin', deg:0,   val:0,           disp:'0'},
        {fn:'sin', deg:30,  val:0.5,         disp:'1/2'},
        {fn:'sin', deg:45,  val:Math.SQRT2/2,disp:'√2/2'},
        {fn:'sin', deg:60,  val:Math.sqrt(3)/2,disp:'√3/2'},
        {fn:'sin', deg:90,  val:1,           disp:'1'},
        {fn:'cos', deg:0,   val:1,           disp:'1'},
        {fn:'cos', deg:30,  val:Math.sqrt(3)/2,disp:'√3/2'},
        {fn:'cos', deg:45,  val:Math.SQRT2/2,disp:'√2/2'},
        {fn:'cos', deg:60,  val:0.5,         disp:'1/2'},
        {fn:'cos', deg:90,  val:0,           disp:'0'},
        {fn:'tan', deg:0,   val:0,           disp:'0'},
        {fn:'tan', deg:30,  val:1/Math.sqrt(3),disp:'√3/3'},
        {fn:'tan', deg:45,  val:1,           disp:'1'},
        {fn:'tan', deg:60,  val:Math.sqrt(3),disp:'√3'},
      ];
      const e = pick(exact);
      return {
        prompt: `${e.fn}(${e.deg}°) = ?  (enter decimal, 4 places)`,
        answer: Math.round(e.val*10000)/10000,
        acceptDecimal: true,
        explanation:
          `${e.fn}(${e.deg}°) = ${e.disp} ≈ ${e.val.toFixed(4)}\n\n` +
          `Key table (Q1 special angles):\n\n` +
          `  θ     sin      cos      tan\n` +
          `  0°    0        1        0\n` +
          `  30°   1/2      √3/2     √3/3\n` +
          `  45°   √2/2     √2/2     1\n` +
          `  60°   √3/2     1/2      √3\n` +
          `  90°   1        0        undef\n\n` +
          `Mnemonic: sin goes 0, 1/2, √2/2, √3/2, 1 (0→90°)\n` +
          `cos is sin read backwards.`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.2.11  TRIG IN ALL QUADRANTS  (ASTC)
  // ══════════════════════════════════════════════════════
  trigQuadrants: {
    label: 'Trig in All Quadrants (ASTC)',
    category: 'Formulas',
    timeLimit: 20,
    maxWrong: 3,
    generate() {
      const refAngles = [30, 45, 60];
      const quadrants = [2, 3, 4];
      const fns = ['sin','cos','tan'];
      const ref = pick(refAngles);
      const q   = pick(quadrants);
      const fn  = pick(fns);

      // Compute reference values
      const refVals = {
        sin: { 30:0.5, 45:Math.SQRT2/2, 60:Math.sqrt(3)/2 },
        cos: { 30:Math.sqrt(3)/2, 45:Math.SQRT2/2, 60:0.5 },
        tan: { 30:1/Math.sqrt(3), 45:1, 60:Math.sqrt(3) },
      };
      const refVal = refVals[fn][ref];

      // Sign by quadrant: All(1), Sin(2), Tan(3), Cos(4)
      const signs = { sin:{1:1,2:1,3:-1,4:-1}, cos:{1:1,2:-1,3:-1,4:1}, tan:{1:1,2:-1,3:1,4:-1} };
      const sign  = signs[fn][q];

      let deg;
      if (q===2)      deg = 180 - ref;
      else if (q===3) deg = 180 + ref;
      else            deg = 360 - ref;

      const answer = Math.round(sign * refVal * 10000) / 10000;
      const dispVals = { sin:{30:'1/2',45:'√2/2',60:'√3/2'}, cos:{30:'√3/2',45:'√2/2',60:'1/2'}, tan:{30:'√3/3',45:'1',60:'√3'} };

      return {
        prompt: `${fn}(${deg}°) = ?  (decimal, 4 places)`,
        answer,
        acceptDecimal: true,
        explanation:
          `${fn}(${deg}°):\n\n` +
          `  1. Quadrant ${q} → ${fn} is ${sign>0?'positive':'negative'} there\n` +
          `     (ASTC: All Students Take Calculus → Q1:All, Q2:Sin, Q3:Tan, Q4:Cos)\n\n` +
          `  2. Reference angle = ${ref}°\n` +
          `     ${fn}(${ref}°) = ${dispVals[fn][ref]} ≈ ${refVal.toFixed(4)}\n\n` +
          `  3. Apply sign: ${sign>0?'+':'−'}${refVal.toFixed(4)} = ${answer}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.1.11  FLUID & WEIGHT CONVERSIONS
  // ══════════════════════════════════════════════════════
  conversionsFluid: {
    label: 'Fluid & Weight Conversions',
    category: 'Conversions',
    timeLimit: 15,
    maxWrong: 3,
    generate() {
      const facts = [
        { q:'1 gallon = ? quarts',  a:4,   exp:'1 gallon = 4 quarts = 8 pints = 16 cups = 128 oz' },
        { q:'1 quart = ? pints',    a:2,   exp:'1 quart = 2 pints = 4 cups = 32 oz' },
        { q:'1 pint = ? cups',      a:2,   exp:'1 pint = 2 cups = 16 oz' },
        { q:'1 gallon = ? cups',    a:16,  exp:'1 gallon = 16 cups (4 qt × 2 pt × 2 cups)' },
        { q:'1 gallon = ? ounces',  a:128, exp:'1 gallon = 128 oz = 16 cups × 8 oz/cup' },
        { q:'1 cup = ? ounces',     a:8,   exp:'1 cup = 8 oz' },
        { q:'1 gallon = ? cubic inches', a:231, exp:'1 gallon = 231 in³  (memorize this directly!)' },
        { q:'1 pound = ? ounces',   a:16,  exp:'1 pound = 16 oz' },
        { q:'1 ton = ? pounds',     a:2000,exp:'1 ton = 2000 lbs' },
        { q:'1 quart = ? ounces',   a:32,  exp:'1 quart = 32 oz (2 pints × 16 oz/pint)' },
        { q:'3 pints = ? ounces',   a:48,  exp:'3 pints × 16 oz/pint = 48 oz' },
        { q:'1 tablespoon = ? oz',  a:0.5, exp:'1 tbsp = 0.5 oz', acceptDecimal:true },
        { q:'2 quarts = ? cups',    a:8,   exp:'2 quarts = 4 pints = 8 cups' },
        { q:'4 gallons = ? quarts', a:16,  exp:'4 × 4 = 16 quarts' },
      ];
      const f = pick(facts);
      return { prompt: f.q, answer: f.a, explanation: `Answer: ${f.a}\n\nKey conversions to memorize:\n  1 gal = 4 qt = 8 pt = 16 cups = 128 oz\n  1 cup = 8 oz\n  1 gal = 231 in³\n  1 lb = 16 oz\n  1 ton = 2000 lbs\n\n${f.exp}`, acceptDecimal: f.acceptDecimal };
    },
  },

  // ══════════════════════════════════════════════════════
  // §2.1.12  CELSIUS ↔ FAHRENHEIT
  // ══════════════════════════════════════════════════════
  tempConversion: {
    label: 'Celsius ↔ Fahrenheit',
    category: 'Conversions',
    timeLimit: 20,
    maxWrong: 3,
    generate() {
      const dir = pick(['CtoF','FtoC']);
      if (dir === 'CtoF') {
        const C = pick([0, 5, 10, 15, 20, 25, 30, 35, 37, 40, 100, -40]);
        const F = C * 9/5 + 32;
        return {
          prompt: `${C}°C = ?°F`,
          answer: F,
          acceptDecimal: true,
          explanation:
            `F = (9/5)×C + 32\n\n` +
            `  = (9/5)×${C} + 32\n` +
            `  = ${9*C/5} + 32\n` +
            `  = ${F}°F\n\n` +
            `Quick trick: double C, subtract 10% of that, add 32.\n` +
            `  ${C}×2 = ${C*2}  →  −${C*2*0.1} = ${C*2*0.9}  →  +32 = ${C*2*0.9+32}\n\n` +
            `Key benchmarks: 0°C=32°F, 100°C=212°F, −40°C=−40°F`,
        };
      } else {
        const F = pick([32, 41, 50, 68, 77, 98.6, 104, 212, -40]);
        const C = Math.round((F-32)*5/9 * 100)/100;
        return {
          prompt: `${F}°F = ?°C`,
          answer: C,
          acceptDecimal: true,
          explanation:
            `C = (5/9)×(F−32)\n\n` +
            `  = (5/9)×(${F}−32)\n` +
            `  = (5/9)×${F-32}\n` +
            `  = ${C}°C\n\n` +
            `Key benchmarks: 32°F=0°C, 212°F=100°C, −40°F=−40°C, 98.6°F=37°C`,
        };
      }
    },
  },

  // ══════════════════════════════════════════════════════
  // §3.1.1  GCD & LCM
  // ══════════════════════════════════════════════════════
  gcdLcm: {
    label: 'GCD & LCM',
    category: 'Formulas',
    timeLimit: 25,
    maxWrong: 3,
    generate() {
      function gcd(a,b){return b===0?a:gcd(b,a%b);}
      const a = randInt(4, 24);
      const b = randInt(4, 24);
      const g = gcd(a, b);
      const l = a*b/g;
      const type = pick(['gcd','lcm']);
      if (type === 'gcd') {
        return {
          prompt: `GCD(${a}, ${b}) = ?`,
          answer: g,
          explanation:
            `Use the Euclidean algorithm:\n\n` +
            `  ${a} = ${Math.floor(a/b)}×${b} + ${a%b}\n` +
            (a%b > 0 ? `  ${b} = ${Math.floor(b/(a%b))}×${a%b} + ${b%(a%b)}\n` : '') +
            `\n  GCD(${a}, ${b}) = ${g}\n\n` +
            `Formula: GCD × LCM = a × b\n  So LCM(${a},${b}) = ${a}×${b}/${g} = ${l}`,
        };
      } else {
        return {
          prompt: `LCM(${a}, ${b}) = ?`,
          answer: l,
          explanation:
            `LCM = a × b / GCD\n\n` +
            `  GCD(${a}, ${b}) = ${g}\n` +
            `  LCM = ${a} × ${b} / ${g} = ${a*b} / ${g} = ${l}\n\n` +
            `Key relationship: GCD(a,b) × LCM(a,b) = a × b\n` +
            `Always find GCD first, then divide into a×b.`,
        };
      }
    },
  },

};

// Category list for grouping on memorize.html home
MEM_SKILLS._categories = ['Numbers','Fractions','Formulas','Conversions'];
