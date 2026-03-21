// =========================================================
//  skills.js  —  Number Sense Practice
//  Each skill's generate(difficulty) accepts 'easy'|'medium'|'hard'
//  Returns: { text, answer, explanation,
//             answerType?  // 'integer'|'decimal'|'fraction'|'mixed'
//             answerFrac?  // { n, d } for fraction answers
//             answerMixed? // { w, n, d } for mixed number answers
//           }
// =========================================================

function randInt(lo, hi) { return Math.floor(Math.random()*(hi-lo+1))+lo; }
function pick(arr)        { return arr[Math.floor(Math.random()*arr.length)]; }
function gcd(a,b)         { return b===0?a:gcd(b,a%b); }
function simplify(n,d)    { const g=gcd(Math.abs(n),Math.abs(d)); return [n/g,d/g]; }

// Convert improper fraction to mixed number parts
function toMixed(n,d) {
  const [sn,sd] = simplify(n,d);
  const w = Math.floor(sn/sd), rem = sn%sd;
  return { w, n:rem, d:sd };
}

const SKILLS = {

  // ══════════════════════════════════════════════════════
  // 2×2 MULTIPLICATION (FOIL)
  // ══════════════════════════════════════════════════════
  multiply2x2: {
    label: '2-Digit × 2-Digit (FOIL)',
    category: 'Multiplication',
    timeLimit: { easy:90, medium:60, hard:40 },
    maxWrong: 3,
    generate(diff='medium') {
      const ranges = { easy:[11,49], medium:[11,79], hard:[11,99] };
      const [lo,hi] = ranges[diff];
      const a=randInt(lo,hi), b=randInt(lo,hi);
      const aT=Math.floor(a/10)*10, aO=a%10;
      const bT=Math.floor(b/10)*10, bO=b%10;
      const F=aT*bT,O=aT*bO,I=aO*bT,L=aO*bO;
      return {
        text:`${a} × ${b} =`, answer:a*b,
        explanation:
          `FOIL: write ${a}=(${aT}+${aO}), ${b}=(${bT}+${bO})\n\n`+
          `  First: ${aT}×${bT} = ${F}\n`+
          `  Outer: ${aT}×${bO} = ${O}\n`+
          `  Inner: ${aO}×${bT} = ${I}\n`+
          `  Last:  ${aO}×${bO} = ${L}\n\n`+
          `  ${F}+${O}+${I}+${L} = ${a*b}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // MULTIPLY BY 11
  // ══════════════════════════════════════════════════════
  multiplyBy11: {
    label: 'Multiply by 11',
    category: 'Multiplication',
    timeLimit: { easy:25, medium:15, hard:10 },
    maxWrong: 3,
    generate(diff='medium') {
      const n = diff==='easy' ? randInt(12,50) : diff==='medium' ? randInt(12,99) : randInt(100,999);
      const answer = n*11;
      const tens=Math.floor(n/10), ones=n%10, mid=tens+ones;
      let exp = '';
      if (n < 100) {
        if (mid<10) exp=`Digits: ${tens},${ones} → middle=${mid} → ${tens}${mid}${ones}=${answer}`;
        else { const c=Math.floor(mid/10),m=mid%10; exp=`Digits: ${tens},${ones} → sum=${mid}≥10, carry → ${tens+c}${m}${ones}=${answer}`; }
      } else {
        exp=`Move down the line adding consecutive digits:\n  ${n}×11 = ${n*10}+${n} = ${answer}`;
      }
      return { text:`${n} × 11 =`, answer, explanation:`11's Trick:\n\n  ${exp}\n\nCheck: ${n}×10+${n}=${answer}` };
    },
  },

  // ══════════════════════════════════════════════════════
  // MULTIPLY BY 101
  // ══════════════════════════════════════════════════════
  multiplyBy101: {
    label: 'Multiply by 101',
    category: 'Multiplication',
    timeLimit: { easy:30, medium:20, hard:15 },
    maxWrong: 3,
    generate(diff='medium') {
      const n = diff==='easy' ? randInt(11,49) : diff==='medium' ? randInt(11,99) : randInt(100,999);
      return {
        text:`${n} × 101 =`, answer:n*101,
        explanation:`101 trick: 101=${n>=100?'100+1':'100+1'}, so paste ${n} with a gap.\n\n  ${n}×100=${n*100}\n  ${n*100}+${n}=${n*101}\n\nShortcut: for 2-digit, write digits twice: ${n}${n} then fix middle.`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // MULTIPLY BY 25
  // ══════════════════════════════════════════════════════
  multiplyBy25: {
    label: 'Multiply by 25',
    category: 'Multiplication',
    timeLimit: { easy:25, medium:15, hard:10 },
    maxWrong: 3,
    generate(diff='medium') {
      const n = diff==='easy' ? randInt(1,25)*4 : diff==='medium' ? randInt(1,50)*2 : randInt(1,100);
      const answer=n*25;
      return {
        text:`${n} × 25 =`, answer,
        explanation:`25 = 100÷4\n\n  ${n}÷4 = ${n/4}\n  ${n/4}×100 = ${answer}\n\nShortcut: ÷4 then ×100.`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // MULTIPLY BY 75
  // ══════════════════════════════════════════════════════
  multiplyBy75: {
    label: 'Multiply by 75',
    category: 'Multiplication',
    timeLimit: { easy:30, medium:20, hard:15 },
    maxWrong: 3,
    generate(diff='medium') {
      const n = diff==='easy' ? randInt(1,15)*4 : diff==='medium' ? randInt(1,25)*4 : randInt(1,40)*4;
      const answer=n*75;
      return {
        text:`${n} × 75 =`, answer,
        explanation:`75 = (3/4)×100\n\n  ${n}÷4 = ${n/4}\n  ${n/4}×3 = ${n*3/4}\n  ${n*3/4}×100 = ${answer}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // DOUBLE & HALF
  // ══════════════════════════════════════════════════════
  doubleHalf: {
    label: 'Double & Half Trick',
    category: 'Multiplication',
    timeLimit: { easy:35, medium:25, hard:18 },
    maxWrong: 3,
    generate(diff='medium') {
      const ends5 = diff==='easy' ? [15,25,35,45] : diff==='medium' ? [15,25,35,45,55,65,75,85,95] : [15,25,35,45,55,65,75,85,95,13,17,19,35,45];
      const a=pick(ends5);
      const b=(diff==='easy'?randInt(2,6):diff==='medium'?randInt(2,10):randInt(2,15))*2;
      return {
        text:`${a} × ${b} =`, answer:a*b,
        explanation:`Double & Half:\n\n  ${a}×${b} = (${a}×2)×(${b}÷2) = ${a*2}×${b/2} = ${a*b}\n\nDouble the odd/ends-5 number, halve the even one.`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // NUMBERS NEAR 100
  // ══════════════════════════════════════════════════════
  near100: {
    label: 'Multiply Numbers Near 100',
    category: 'Multiplication',
    timeLimit: { easy:40, medium:28, hard:18 },
    maxWrong: 3,
    generate(diff='medium') {
      const maxD = diff==='easy'?5 : diff==='medium'?12 : 20;
      const type = randInt(0,1);
      let a,b,answer,explanation;
      if (type===0) {
        const da=randInt(1,maxD), db=randInt(1,maxD);
        a=100-da; b=100-db; answer=a*b;
        explanation=`Both below 100:\n  Tens/Ones: ${da}×${db}=${da*db}\n  Rest: ${a}-${db}=${a-db}\n  Answer: ${String(a-db).padStart(2,'0')}${String(da*db).padStart(2,'0')} = ${answer}`;
      } else {
        const da=randInt(1,maxD), db=randInt(1,maxD);
        a=100+da; b=100+db; answer=a*b;
        explanation=`Both above 100:\n  Tens/Ones: ${da}×${db}=${da*db}\n  Rest: ${a}+${db}=${a+db}\n  Answer: ${a+db}${String(da*db).padStart(2,'0')} = ${answer}`;
      }
      return { text:`${a} × ${b} =`, answer, explanation };
    },
  },

  // ══════════════════════════════════════════════════════
  // SQUARES ENDING IN 5
  // ══════════════════════════════════════════════════════
  squaresEndIn5: {
    label: 'Squaring Numbers Ending in 5',
    category: 'Multiplication',
    timeLimit: { easy:20, medium:12, hard:8 },
    maxWrong: 3,
    generate(diff='medium') {
      const t = diff==='easy'?randInt(1,5) : diff==='medium'?randInt(1,9) : randInt(1,19);
      const n=t*10+5, answer=n*n;
      return {
        text:`${n}² =`, answer,
        explanation:`Ends-in-5 trick:\n  Last two digits: always 25\n  Rest: ${t}×${t+1} = ${t*(t+1)}\n  Answer: ${t*(t+1)}25 = ${answer}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // SQUARES 41–59
  // ══════════════════════════════════════════════════════
  squares41to59: {
    label: 'Squaring Numbers 41–59',
    category: 'Multiplication',
    timeLimit: { easy:30, medium:20, hard:12 },
    maxWrong: 3,
    generate(diff='medium') {
      const n = diff==='easy'?pick([45,50,55,40,60]) : diff==='medium'?randInt(41,59) : randInt(41,59);
      const d=n-50, answer=n*n;
      return {
        text:`${n}² =`, answer,
        explanation:`From-50 trick:\n  Distance from 50: ${d>=0?'+':''}${d}\n  Hundreds: 25${d>=0?'+':''}${d} = ${25+d}\n  Last two: ${d}² = ${String(d*d).padStart(2,'0')}\n  Answer: ${25+d}${String(d*d).padStart(2,'0')} = ${answer}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // SQUARING 2-DIGIT NUMBERS (GENERAL)
  // ══════════════════════════════════════════════════════
  squaring: {
    label: 'Squaring 2-Digit Numbers',
    category: 'Multiplication',
    timeLimit: { easy:45, medium:30, hard:18 },
    maxWrong: 3,
    generate(diff='medium') {
      const n = diff==='easy'?randInt(11,30) : diff==='medium'?randInt(11,60) : randInt(11,99);
      const answer=n*n;
      const a=Math.floor(n/10)*10, b=n%10;
      const near=Math.round(n/10)*10, d=near-n;
      return {
        text:`${n}² =`, answer,
        explanation:
          `Method 1 — (a+b)²:\n  ${a}²=${a*a}, 2×${a}×${b}=${2*a*b}, ${b}²=${b*b}\n  ${a*a}+${2*a*b}+${b*b} = ${answer}\n\n`+
          `Method 2 — Diff of squares:\n  (${n}+${d})(${n}-${d})+${d}² = ${n+d}×${n-d}+${d*d} = ${(n+d)*(n-d)}+${d*d} = ${answer}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // EQUIDISTANT (DIFFERENCE OF SQUARES)
  // ══════════════════════════════════════════════════════
  equidistant: {
    label: 'Equidistant Multiplication',
    category: 'Multiplication',
    timeLimit: { easy:35, medium:25, hard:15 },
    maxWrong: 3,
    generate(diff='medium') {
      const centers=[25,30,35,40,45,50,55,60,65,70,75,80,85];
      const center=pick(centers);
      const maxD = diff==='easy'?3 : diff==='medium'?7 : 12;
      const d=randInt(1,maxD);
      const a=center-d, b=center+d, answer=a*b;
      return {
        text:`${a} × ${b} =`, answer,
        explanation:`Equidistant from ${center}:\n  (${center}-${d})(${center}+${d}) = ${center}²-${d}²\n  = ${center*center}-${d*d} = ${answer}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // MULTIPLYING REVERSES
  // ══════════════════════════════════════════════════════
  multiplyReverses: {
    label: 'Multiplying Reverse-Digit Numbers',
    category: 'Multiplication',
    timeLimit: { easy:40, medium:28, hard:18 },
    maxWrong: 3,
    generate(diff='medium') {
      const maxD = diff==='easy'?4 : 7;
      let a,b;
      do { a=randInt(1,maxD); b=randInt(1,maxD); } while(a===b);
      const n1=10*a+b, n2=10*b+a, answer=n1*n2;
      const ones=a*b, oD=ones%10, c1=Math.floor(ones/10);
      const tens=a*a+b*b+c1, tD=tens%10, c2=Math.floor(tens/10);
      return {
        text:`${n1} × ${n2} =`, answer,
        explanation:`Reverse digits trick:\n  Ones: ${a}×${b}=${ones} → write ${oD}, carry ${c1}\n  Tens: ${a}²+${b}²+${c1}=${tens} → write ${tD}, carry ${c2}\n  Hundreds: ${a}×${b}+${c2}=${a*b+c2}\n  Answer: ${answer}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // DIFFERENCE OF SQUARES
  // ══════════════════════════════════════════════════════
  differenceOfSquares: {
    label: 'Difference of Squares',
    category: 'Multiplication',
    timeLimit: { easy:35, medium:25, hard:15 },
    maxWrong: 3,
    generate(diff='medium') {
      const a=diff==='easy'?randInt(5,20):randInt(11,50);
      const b=diff==='easy'?randInt(1,5):randInt(2,10);
      const answer=(a+b)*(a+b)-(a-b)*(a-b);
      const n1=a+b,n2=a-b;
      return {
        text:`${n1}² − ${n2}² =`, answer,
        explanation:`a²-b² = (a+b)(a-b)\n  (${n1}+${n2})(${n1}-${n2}) = ${n1+n2}×${n1-n2} = ${answer}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // BOTH NUMBERS END IN 5
  // ══════════════════════════════════════════════════════
  bothEndIn5: {
    label: 'Multiply Two Numbers Ending in 5',
    category: 'Multiplication',
    timeLimit: { easy:25, medium:18, hard:12 },
    maxWrong: 3,
    generate(diff='medium') {
      const maxT=diff==='easy'?5:diff==='medium'?9:15;
      const a=randInt(1,maxT), b=randInt(1,maxT);
      const n1=a*10+5, n2=b*10+5, answer=n1*n2;
      const even=(a+b)%2===0, half=Math.floor((a+b)/2);
      return {
        text:`${n1} × ${n2} =`, answer,
        explanation:`Both-end-in-5 trick:\n  Sum of tens digits: ${a}+${b}=${a+b} (${even?'even':'odd'})\n  Last two digits: ${even?'25':'75'}\n  Rest: ${a}×${b}+⌊${a+b}/2⌋ = ${a*b}+${half} = ${a*b+half}\n  Answer: ${a*b+half}${even?'25':'75'} = ${answer}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // FACTORING NUMERICAL EXPRESSIONS
  // ══════════════════════════════════════════════════════
  factoringNumerical: {
    label: 'Factoring Numerical Expressions',
    category: 'Multiplication',
    timeLimit: { easy:40, medium:28, hard:18 },
    maxWrong: 3,
    generate(diff='medium') {
      const k=diff==='easy'?randInt(2,8):diff==='medium'?randInt(2,15):randInt(2,20);
      const a=randInt(2,20), b=randInt(2,20);
      return {
        text:`${k}×${a} + ${k}×${b} =`, answer:k*(a+b),
        explanation:`Factor out ${k}:\n  ${k}×${a}+${k}×${b} = ${k}×(${a}+${b}) = ${k}×${a+b} = ${k*(a+b)}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // REMAINDER ÷ 4
  // ══════════════════════════════════════════════════════
  remainderBy4: {
    label: 'Remainder Dividing by 4',
    category: 'Division',
    timeLimit: { easy:20, medium:14, hard:10 },
    maxWrong: 3,
    generate(diff='medium') {
      const q=diff==='easy'?randInt(10,99):diff==='medium'?randInt(10,999):randInt(100,9999);
      const rem=randInt(0,3), n=q*4+rem;
      return {
        text:`${n} ÷ 4 remainder =`, answer:rem,
        explanation:`Only the last two digits matter.\n  Last two of ${n}: ${n%100}\n  ${n%100} ÷ 4 = ${Math.floor((n%100)/4)} remainder ${rem}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // REMAINDER ÷ 9
  // ══════════════════════════════════════════════════════
  remainderBy9: {
    label: 'Remainder Dividing by 9',
    category: 'Division',
    timeLimit: { easy:20, medium:14, hard:10 },
    maxWrong: 3,
    generate(diff='medium') {
      const len=diff==='easy'?3:diff==='medium'?4:6;
      const digits=Array.from({length:len},()=>randInt(0,9));
      if(digits.every(d=>d===0))digits[0]=randInt(1,9);
      const n=parseInt(digits.join(''));
      const s=digits.reduce((a,b)=>a+b,0), rem=s%9;
      return {
        text:`${n} ÷ 9 remainder =`, answer:rem,
        explanation:`Digit sum rule:\n  ${digits.join('+')} = ${s}\n  ${s} mod 9 = ${rem}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // REMAINDER ÷ 11
  // ══════════════════════════════════════════════════════
  remainderBy11: {
    label: 'Remainder Dividing by 11',
    category: 'Division',
    timeLimit: { easy:25, medium:18, hard:12 },
    maxWrong: 3,
    generate(diff='medium') {
      const len=diff==='easy'?3:diff==='medium'?4:5;
      const digits=Array.from({length:len},()=>randInt(0,9));
      if(digits.every(d=>d===0))digits[0]=randInt(1,9);
      const n=parseInt(digits.join(''));
      const rev=[...digits].reverse();
      const alt=rev.reduce((acc,d,i)=>acc+(i%2===0?d:-d),0);
      const rem=((alt%11)+11)%11;
      return {
        text:`${n} ÷ 11 remainder =`, answer:rem,
        explanation:`Alternating digit sum (right→left):\n  ${rev.map((d,i)=>(i%2===0?'+':'-')+d).join(' ')} = ${alt}\n  ${alt} mod 11 = ${rem}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // PERCENTAGE OF A NUMBER
  // ══════════════════════════════════════════════════════
  percentage: {
    label: 'Percentage of a Number',
    category: 'Division',
    timeLimit: { easy:30, medium:20, hard:14 },
    maxWrong: 3,
    generate(diff='medium') {
      const easyP=[5,10,20,25,50], medP=[5,10,12,15,20,25,30,40,50,60,75,80], hardP=[5,10,12,15,20,25,30,33,40,50,60,75,80,125];
      const pcts = diff==='easy'?easyP:diff==='medium'?medP:hardP;
      const bases=[20,24,25,40,50,60,75,80,100,120,150,200,250,400,500];
      const pct=pick(pcts), base=pick(bases), answer=Math.round(pct*base/100);
      let steps='';
      if(pct===10) steps=`10% = ${base}÷10 = ${answer}`;
      else if(pct===5) steps=`5% = (10% of ${base})÷2 = ${base/10}÷2 = ${answer}`;
      else if(pct===25) steps=`25%=¼ → ${base}÷4 = ${answer}`;
      else if(pct===50) steps=`50%=½ → ${base}÷2 = ${answer}`;
      else if(pct===75) steps=`75%=¾ → ${base}÷4×3 = ${answer}`;
      else { steps=`10% of ${base} = ${base/10}\n  ${pct}% = ${base/10}×${pct/10} = ${answer}`; }
      return { text:`${pct}% of ${base} =`, answer, explanation:`${pct}% of ${base}:\n\n  ${steps}\n\nAnchor on 10% first, then scale.` };
    },
  },

  // ══════════════════════════════════════════════════════
  // MULTI-NUMBER ADDITION
  // ══════════════════════════════════════════════════════
  additionMulti: {
    label: 'Multi-Number Addition',
    category: 'Addition & Subtraction',
    timeLimit: { easy:35, medium:25, hard:15 },
    maxWrong: 3,
    generate(diff='medium') {
      const count=diff==='hard'?6:4;
      const lo=diff==='easy'?10:10, hi=diff==='easy'?50:99;
      const nums=Array.from({length:count},()=>randInt(lo,hi));
      const answer=nums.reduce((a,b)=>a+b,0);
      const p1=nums[0]+nums[1], p2=nums[2]+nums[3];
      return {
        text:nums.join(' + ')+' =', answer,
        explanation:`Pair to round numbers:\n  ${nums[0]}+${nums[1]}=${p1}\n  ${nums[2]}+${nums[3]}=${p2}${count===6?`\n  ${nums[4]}+${nums[5]}=${nums[4]+nums[5]}`:''}\n  Total = ${answer}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // ORDER OF OPERATIONS
  // ══════════════════════════════════════════════════════
  orderOfOps: {
    label: 'Order of Operations (PEMDAS)',
    category: 'Addition & Subtraction',
    timeLimit: { easy:50, medium:35, hard:22 },
    maxWrong: 3,
    generate(diff='medium') {
      const a=randInt(2,9),b=randInt(2,9),c=randInt(2,9),d=randInt(2,9),e=randInt(1,20);
      return {
        text:`${a}×${b} + ${c}×${d} − ${e} =`, answer:a*b+c*d-e,
        explanation:`PEMDAS — multiply first:\n  ${a}×${b}=${a*b}, ${c}×${d}=${c*d}\n  ${a*b}+${c*d}-${e} = ${a*b+c*d-e}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // SUBTRACTING REVERSES
  // ══════════════════════════════════════════════════════
  subtractReverses: {
    label: 'Subtracting Reverse-Digit Numbers',
    category: 'Addition & Subtraction',
    timeLimit: { easy:25, medium:16, hard:10 },
    maxWrong: 3,
    generate(diff='medium') {
      let a,c,b;
      do { a=randInt(1,9); c=randInt(1,9); } while(a===c);
      b=randInt(0,9);
      const n1=100*a+10*b+c, n2=100*c+10*b+a;
      const big=Math.max(n1,n2), small=Math.min(n1,n2);
      const diff2=Math.abs(a-c);
      return {
        text:`${big} − ${small} =`, answer:big-small,
        explanation:`Reverse trick: middle digit cancels.\n  (${diff2})×99 = ${diff2*100}-${diff2} = ${diff2*99}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // a/b + b/a  — NOW RETURNS FRACTION ANSWER
  // ══════════════════════════════════════════════════════
  fractionPlusFractionInverse: {
    label: 'a/b + b/a Fraction Trick',
    category: 'Addition & Subtraction',
    timeLimit: { easy:40, medium:28, hard:18 },
    maxWrong: 3,
    generate(diff='medium') {
      const max=diff==='easy'?5:diff==='medium'?9:15;
      let a,b;
      do { a=randInt(2,max); b=randInt(2,max); } while(a===b);
      const num=a*a+b*b, den=a*b;
      const [sN,sD]=simplify(num,den);
      const w=Math.floor(sN/sD), rem=sN%sD;
      // Answer is a mixed number e.g. 2 4/35
      return {
        text:`${a}/${b} + ${b}/${a} =`,
        answer: sN/sD,
        answerType: rem===0 ? 'integer' : 'mixed',
        answerMixed: { w, n:rem, d:sD },
        explanation:
          `a/b + b/a = (a²+b²)/(ab)\n\n`+
          `  (${a}²+${b}²)/(${a}×${b}) = ${num}/${den}`+
          (sN!==num?` = ${sN}/${sD}`:'')+
          `\n\n  = ${w}${rem>0?` and ${rem}/${sD}`:''}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // MIXED NUMBER MULTIPLICATION  — FRACTION ANSWER
  // ══════════════════════════════════════════════════════
  mixedNumbers: {
    label: 'Mixed Number Multiplication',
    category: 'Multiplication',
    timeLimit: { easy:70, medium:55, hard:40 },
    maxWrong: 3,
    generate(diff='medium') {
      const denoms=diff==='easy'?[2,4]:diff==='medium'?[2,3,4]:[2,3,4,5,6];
      const wA=randInt(1,5),dA=pick(denoms),nA=randInt(1,dA-1);
      const wB=randInt(1,5),dB=pick(denoms),nB=randInt(1,dB-1);
      const impA=wA*dA+nA, impB=wB*dB+nB;
      const prodN=impA*impB, prodD=dA*dB;
      const [sN,sD]=simplify(prodN,prodD);
      const w=Math.floor(sN/sD), rem=sN%sD;
      const g=gcd(prodN,prodD);
      return {
        text:`${wA} ${nA}/${dA} × ${wB} ${nB}/${dB} =`,
        answer: sN/sD,
        answerType: rem===0?'integer':'mixed',
        answerMixed: { w, n:rem, d:sD },
        explanation:
          `Step 1 — Improper fractions:\n  ${wA} ${nA}/${dA} = ${impA}/${dA}\n  ${wB} ${nB}/${dB} = ${impB}/${dB}\n\n`+
          `Step 2 — Multiply: ${impA}×${impB}/${dA}×${dB} = ${prodN}/${prodD}\n`+
          (g>1?`Step 3 — Simplify ÷${g}: ${sN}/${sD}\n`:'')+
          `Step 4 — Mixed number: ${w}${rem>0?` and ${rem}/${sD}`:''}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // NEW: FRACTION SUBTRACTION (§1.5.2)
  // ══════════════════════════════════════════════════════
  fractionSubtraction: {
    label: 'Mixed Number Subtraction',
    category: 'Addition & Subtraction',
    timeLimit: { easy:50, medium:38, hard:25 },
    maxWrong: 3,
    generate(diff='medium') {
      const denoms=diff==='easy'?[2,4,6]:diff==='medium'?[2,3,4,6,8]:[2,3,4,5,6,7,8];
      const wA=randInt(3,9),dA=pick(denoms),nA=randInt(1,dA-1);
      const wB=randInt(1,wA-1),dB=pick(denoms),nB=randInt(1,dB-1);
      // convert to improper, subtract, simplify
      const impA=wA*dA+nA, impB=wB*dB+nB;
      const lcd=dA*dB/gcd(dA,dB);
      const numA=impA*(lcd/dA), numB=impB*(lcd/dB);
      const diffN=numA-numB;
      const [sN,sD]=simplify(diffN,lcd);
      const w=Math.floor(sN/sD), rem=sN%sD;
      return {
        text:`${wA} ${nA}/${dA} − ${wB} ${nB}/${dB} =`,
        answer: sN/sD,
        answerType: rem===0?'integer':'mixed',
        answerMixed: { w, n:rem, d:sD },
        explanation:
          `Convert to improper fractions:\n`+
          `  ${wA} ${nA}/${dA} = ${impA}/${dA}\n`+
          `  ${wB} ${nB}/${dB} = ${impB}/${dB}\n\n`+
          `LCD = ${lcd}:\n`+
          `  ${numA}/${lcd} − ${numB}/${lcd} = ${diffN}/${lcd}`+
          (gcd(diffN,lcd)>1?` = ${sN}/${sD}`:'')+
          `\n\n  = ${w}${rem>0?` and ${rem}/${sD}`:''}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // NEW: FIBONACCI NUMBERS (§2.2.2)
  // ══════════════════════════════════════════════════════
  fibonacci: {
    label: 'Fibonacci Numbers',
    category: 'Addition & Subtraction',
    timeLimit: { easy:20, medium:14, hard:10 },
    maxWrong: 3,
    generate(diff='medium') {
      const fibs=[1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987];
      const maxIdx=diff==='easy'?9:diff==='medium'?12:15;
      const idx=randInt(2,maxIdx);
      const type=pick(['find','which','sum']);
      if(type==='find') {
        return {
          text:`The ${idx+1}${['st','nd','rd'][idx]||'th'} Fibonacci number?`,
          answer:fibs[idx],
          explanation:`Fibonacci sequence: each term = sum of previous two.\n  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377…\n  Term ${idx+1} = ${fibs[idx]}`,
        };
      } else if(type==='which') {
        return {
          text:`${fibs[idx]} is the ___th Fibonacci number?`,
          answer:idx+1,
          explanation:`Fibonacci sequence:\n  1,1,2,3,5,8,13,21,34,55,89,144,233,377…\n  ${fibs[idx]} is term #${idx+1}`,
        };
      } else {
        // sum of first n fibonacci = F(n+2) - 1
        const n=randInt(3,8);
        const sum=fibs[n+1]-1;
        return {
          text:`Sum of first ${n} Fibonacci numbers?`,
          answer:sum,
          explanation:`Sum of first n Fibonacci numbers = F(n+2) − 1\n  F(${n+2}) − 1 = ${fibs[n+1]} − 1 = ${sum}\n\nFirst ${n}: ${fibs.slice(0,n).join(', ')}`,
        };
      }
    },
  },

  // ══════════════════════════════════════════════════════
  // NEW: INFINITE GEOMETRIC SERIES (§2.2.1)
  // ══════════════════════════════════════════════════════
  geometricSeries: {
    label: 'Infinite Geometric Series',
    category: 'Addition & Subtraction',
    timeLimit: { easy:45, medium:32, hard:22 },
    maxWrong: 3,
    generate(diff='medium') {
      // a1 / (1-r), |r|<1
      const a1=pick([1,2,3,4,6,8,9,12]);
      const rNums=diff==='easy'?[1,1,1]:[1,1,2,3], rDens=diff==='easy'?[2,3,4]:[2,3,4,5];
      const rN=pick(rNums), rD=pick(rDens);
      if(rN>=rD) return SKILLS.geometricSeries.generate(diff);
      // sum = a1 / (1 - rN/rD) = a1*rD/(rD-rN)
      const sumN=a1*rD, sumD=rD-rN;
      const [sN,sD]=simplify(sumN,sumD);
      const w=Math.floor(sN/sD), rem=sN%sD;
      return {
        text:`${a1} + ${a1*rN}/${rD} + ${a1*rN*rN}/${rD*rD} + … =`,
        answer: sN/sD,
        answerType: rem===0?'integer':'mixed',
        answerMixed: { w, n:rem, d:sD },
        explanation:
          `Infinite geometric series: a₁/(1−r)\n\n`+
          `  a₁ = ${a1}, r = ${rN}/${rD}\n`+
          `  1−r = ${rD-rN}/${rD}\n`+
          `  Sum = ${a1} ÷ (${rD-rN}/${rD}) = ${a1}×${rD}/${rD-rN} = ${sumN}/${sumD}`+
          (gcd(sumN,sumD)>1?` = ${sN}/${sD}`:'')+
          `\n  = ${w}${rem>0?` and ${rem}/${sD}`:''}`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // NEW: DISCRIMINANT & ROOTS (§2.2.15)
  // ══════════════════════════════════════════════════════
  discriminant: {
    label: 'Discriminant & Roots of Quadratics',
    category: 'Division',
    timeLimit: { easy:45, medium:32, hard:22 },
    maxWrong: 3,
    generate(diff='medium') {
      // Generate ax²+bx+c = 0 with clean integer roots
      const r1=randInt(-8,8), r2=randInt(-8,8);
      const a=1, b=-(r1+r2), c=r1*r2;
      const disc=b*b-4*a*c;
      const type=pick(['disc','sumRoots','prodRoots','smallerRoot']);
      if(type==='disc') {
        return {
          text:`Discriminant of x²${b>=0?'+':''}${b}x${c>=0?'+':''}${c}=0?`,
          answer:disc,
          explanation:`Discriminant = b²−4ac\n  = (${b})²−4(${a})(${c})\n  = ${b*b}−${4*a*c}\n  = ${disc}\n\n${disc>0?'Two real roots':disc===0?'One repeated root':'No real roots'}`,
        };
      } else if(type==='sumRoots') {
        return {
          text:`Sum of roots of x²${b>=0?'+':''}${b}x${c>=0?'+':''}${c}=0?`,
          answer:r1+r2,
          explanation:`Sum of roots = −b/a = −(${b})/1 = ${r1+r2}\n\nRoots are ${r1} and ${r2}: ${r1}+${r2}=${r1+r2}`,
        };
      } else if(type==='prodRoots') {
        return {
          text:`Product of roots of x²${b>=0?'+':''}${b}x${c>=0?'+':''}${c}=0?`,
          answer:r1*r2,
          explanation:`Product of roots = c/a = ${c}/1 = ${c}\n\nRoots are ${r1} and ${r2}: ${r1}×${r2}=${r1*r2}`,
        };
      } else {
        return {
          text:`Smallest root of x²${b>=0?'+':''}${b}x${c>=0?'+':''}${c}=0?`,
          answer:Math.min(r1,r2),
          explanation:`Factor: (x−${r1})(x−${r2})=0\n  Roots: x=${r1} and x=${r2}\n  Smallest = ${Math.min(r1,r2)}`,
        };
      }
    },
  },

  // ══════════════════════════════════════════════════════
  // NEW: VERTEX OF A PARABOLA (§2.2.14)
  // ══════════════════════════════════════════════════════
  vertexParabola: {
    label: 'Vertex of a Parabola',
    category: 'Division',
    timeLimit: { easy:40, medium:28, hard:18 },
    maxWrong: 3,
    generate(diff='medium') {
      // f(x)=ax²+bx+c, vertex x = -b/(2a)
      const a=diff==='easy'?1:pick([1,1,1,2,3]);
      const b=pick([-6,-4,-2,2,4,6,-3,-5,3,5]);
      const c=randInt(-5,10);
      const vx=-b/(2*a); // may be fraction
      const vy=a*vx*vx+b*vx+c;
      const type=pick(['xcoord','ycoord']);
      if(type==='xcoord') {
        const [vxN,vxD]=simplify(-b,2*a);
        const isInt=vxD===1;
        return {
          text:`Vertex x-coord of ${a===1?'':''+a}x²${b>=0?'+':''}${b}x${c>=0?'+':''}${c}?`,
          answer: vxN/vxD,
          answerType: isInt?'integer':(vxD===1?'integer':'fraction'),
          answerFrac: isInt?null:{ n:vxN, d:vxD },
          explanation:`Vertex x = −b/(2a)\n  = −(${b})/(2×${a})\n  = ${-b}/${2*a}${gcd(Math.abs(-b),2*a)>1?` = ${vxN}/${vxD}`:''}`,
        };
      } else {
        const isInt=Number.isInteger(vy);
        return {
          text:`Vertex y-coord of ${a===1?'':''+a}x²${b>=0?'+':''}${b}x${c>=0?'+':''}${c}?`,
          answer:vy,
          answerType: isInt?'integer':'decimal',
          explanation:`Vertex x = ${vx}\n  y = ${a}(${vx})²+${b}(${vx})+${c}\n  = ${a*vx*vx}+${b*vx}+${c}\n  = ${vy}`,
        };
      }
    },
  },

  // ══════════════════════════════════════════════════════
  // NEW: SUM OF SQUARES (§1.3.3 / §1.3.4)
  // ══════════════════════════════════════════════════════
  sumOfSquares: {
    label: 'Sum of Squares',
    category: 'Addition & Subtraction',
    timeLimit: { easy:40, medium:28, hard:18 },
    maxWrong: 3,
    generate(diff='medium') {
      const a = diff==='easy'?randInt(2,8):diff==='medium'?randInt(2,15):randInt(3,20);
      const k = randInt(2,5);
      const b = a*k;
      const answer = a*a + b*b;
      return {
        text:`${a}² + ${b}² =`, answer,
        explanation:
          `Factor out ${a}²:\n\n`+
          `  ${a}² + ${b}² = ${a}² + (${k}×${a})²\n`+
          `  = ${a}²(1 + ${k}²)\n`+
          `  = ${a*a} × ${1+k*k}\n`+
          `  = ${answer}\n\n`+
          `Spot when one term is a multiple of the other, then factor.`,
      };
    },
  },

  // ══════════════════════════════════════════════════════
  // NEW: CONSECUTIVE INTEGERS (§2.2.1)
  // ══════════════════════════════════════════════════════
  consecIntegers: {
    label: 'Consecutive Integers',
    category: 'Addition & Subtraction',
    timeLimit: { easy:35, medium:25, hard:16 },
    maxWrong: 3,
    generate(diff='medium') {
      const type = pick(['sumToN','oddSum','evenSum','wordProblem']);
      if (type==='sumToN') {
        const m=diff==='easy'?randInt(5,20):diff==='medium'?randInt(10,40):randInt(20,100);
        return {
          text:`1 + 2 + 3 + … + ${m} =`, answer:m*(m+1)/2,
          explanation:`Sum of first ${m} integers = m(m+1)/2\n  = ${m}×${m+1}/2 = ${m*(m+1)/2}`,
        };
      } else if (type==='oddSum') {
        const m=diff==='easy'?randInt(3,8):diff==='medium'?randInt(4,15):randInt(6,25);
        const last=2*m-1;
        return {
          text:`1 + 3 + 5 + … + ${last} =`, answer:m*m,
          explanation:`Sum of first ${m} odd integers = m²\n  Count: (${last}+1)/2 = ${m}\n  Answer: ${m}² = ${m*m}`,
        };
      } else if (type==='evenSum') {
        const m=diff==='easy'?randInt(3,8):diff==='medium'?randInt(4,15):randInt(6,25);
        const last=2*m;
        return {
          text:`2 + 4 + 6 + … + ${last} =`, answer:m*(m+1),
          explanation:`Sum of first ${m} even integers = m(m+1)\n  m=${last}/2=${m}\n  Answer: ${m}×${m+1} = ${m*(m+1)}`,
        };
      } else {
        const count=diff==='easy'?3:pick([3,4,5]);
        const middle=randInt(10,50);
        const start=middle-Math.floor(count/2);
        const nums=Array.from({length:count},(_,i)=>start+i);
        const sum=nums.reduce((a,b)=>a+b,0);
        return {
          text:`Sum of ${count} consecutive integers is ${sum}. Largest?`,
          answer:nums[nums.length-1],
          explanation:`Divide by count to find middle:\n  ${sum}÷${count}=${sum/count}\n  Integers: ${nums.join(', ')}\n  Largest = ${nums[nums.length-1]}`,
        };
      }
    },
  },

};

SKILLS._categories = ['Multiplication','Division','Addition & Subtraction'];
