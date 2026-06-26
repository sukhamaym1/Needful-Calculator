'use strict';

window.NC = window.NC || {};
window.NC.CalculatorRouter = window.NC.CalculatorRouter || {};
window.NC.CalculatorRouter.configs = window.NC.CalculatorRouter.configs || {};

Object.assign(window.NC.CalculatorRouter.configs, {
  'word-counter': {
      title: 'Word Counter',
      icon: '📝',
      subtitle: 'Check reading metrics for document textual content',
      inputs: [
        { id: 'text', label: 'Enter/Paste Content Here', type: 'textarea', default: 'This is a sample sentence to test the word counter functionality.' }
      ],
      hasChart: false,
      hasTable: false,
      calculate(state) {
        const text = state.text || '';
        
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s+/g, '').length;
        
        const wordsArr = text.trim().split(/\s+/).filter(w => w.length > 0);
        const words = wordsArr.length;

        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;

        const readTime = Math.ceil(words / 200);
        const speakTime = Math.ceil(words / 130);

        return {
          results: [
            { label: 'Words count', value: words, highlight: true, raw: true },
            { label: 'Characters (with spaces)', value: chars, raw: true },
            { label: 'Characters (no spaces)', value: charsNoSpaces, raw: true },
            { label: 'Sentence count', value: sentences, raw: true },
            { label: 'Paragraph count', value: paragraphs, raw: true },
            { label: 'Reading Speed Estimate', value: `${readTime} min(s)`, raw: true },
            { label: 'Speaking Speed Estimate', value: `${speakTime} min(s)`, raw: true }
          ]
        };
      },
      article: `
        <h2>Word Count Tool</h2>
        <p>Understand details of your written content quickly for blogs and articles.</p>
      `
    },
  'education-loan': {
      title: 'Education Loan EMI Calculator',
      icon: '🎓',
      subtitle: 'Calculate EMI after course and grace (moratorium) periods',
      inputs: [
        { id: 'principal', label: 'Loan Amount (₹)', type: 'range', min: 1000, max: 15000000, step: 1000, default: 1000000, format: 'currency' },
        { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'range', min: 0.1, max: 20, step: 0.1, default: 10.0, format: 'percent' },
        { id: 'tenure', label: 'Repayment Tenure (Years)', type: 'range', min: 1, max: 15, step: 1, default: 5, format: 'years' },
        { id: 'moratorium', label: 'Moratorium Period (Years)', type: 'range', min: 0, max: 7, step: 0.5, default: 2, format: 'years' }
      ],
      hasChart: true,
      hasTable: true,
      calculate(state) {
        const P = state.principal;
        const R = state.rate;
        const tenure = state.tenure;
        const mor = state.moratorium;

        const monthlyRate = R / 12 / 100;
        const moratoriumMonths = Math.round(mor * 12);
        const repaymentMonths = tenure * 12;

        const adjustedPrincipal = P * Math.pow(1 + monthlyRate, moratoriumMonths);
        
        let emi = 0;
        if (monthlyRate === 0) {
          emi = adjustedPrincipal / repaymentMonths;
        } else {
          const factor = Math.pow(1 + monthlyRate, repaymentMonths);
          emi = (adjustedPrincipal * monthlyRate * factor) / (factor - 1);
        }

        const totalAmount = emi * repaymentMonths;
        const totalInterest = totalAmount - P;

        const tableRows = [];
        let balance = adjustedPrincipal;
        for (let i = 1; i <= Math.min(repaymentMonths, 12); i++) {
          const interestPart = balance * monthlyRate;
          const principalPart = emi - interestPart;
          balance -= principalPart;
          tableRows.push({
            col1: `Month ${i}`,
            col2: emi,
            col3: principalPart,
            col4: interestPart,
            col5: Math.max(0, balance)
          });
        }

        return {
          results: [
            { label: 'Monthly EMI (Post-Moratorium)', value: emi, highlight: true, format: 'currency' },
            { label: 'Adjusted Principal (after Moratorium)', value: adjustedPrincipal, format: 'currency' },
            { label: 'Total Interest Payable', value: totalInterest, format: 'currency' },
            { label: 'Total Amount Payable', value: totalAmount, format: 'currency' }
          ],
          chartData: {
            labels: ['Principal Amount', 'Total Interest'],
            data: [P, totalInterest]
          },
          tableHeader: ['Month', 'EMI (₹)', 'Principal (₹)', 'Interest (₹)', 'Balance (₹)'],
          tableRows: tableRows,
          tableFooterText: repaymentMonths > 12 ? `... ${repaymentMonths - 12} more months projected ...` : null
        };
      }
    },
  'percentage-calculator': {
    title: 'Percentage Calculator',
    icon: '🔢',
    subtitle: 'Solve various percentage-based mathematical equations',
    inputs: [
      { id: 'part', label: 'Find what is', type: 'number', default: 10 },
      { id: 'total', label: 'percent of', type: 'number', default: 250 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const part = parseFloat(state.part);
      const total = parseFloat(state.total);
      if (isNaN(part) || isNaN(total)) return { error: 'Please enter valid numbers.' };
      const val = (part / 100) * total;
      return {
        results: [
          { label: 'Result Value', value: val.toFixed(2), highlight: true, raw: true }
        ]
      };
    }
  },
  'marks-percentage-calculator': {
    title: 'Marks Percentage Calculator',
    icon: '📝',
    subtitle: 'Calculate your academic test or exam percentage',
    inputs: [
      { id: 'obtained', label: 'Marks Obtained', type: 'number', default: 420 },
      { id: 'total', label: 'Total Marks possible', type: 'number', default: 500 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const obtained = parseFloat(state.obtained);
      const total = parseFloat(state.total);
      if (isNaN(obtained) || isNaN(total) || total <= 0) {
        return { error: 'Please enter valid marks.' };
      }
      if (obtained > total) {
        return { error: 'Marks obtained cannot exceed total marks.' };
      }
      const pct = (obtained / total) * 100;
      let grade = 'F';
      if (pct >= 90) grade = 'A+';
      else if (pct >= 80) grade = 'A';
      else if (pct >= 70) grade = 'B';
      else if (pct >= 60) grade = 'C';
      else if (pct >= 50) grade = 'D';
      else if (pct >= 40) grade = 'E';
      return {
        results: [
          { label: 'Percentage', value: pct.toFixed(2) + '%', highlight: true, raw: true },
          { label: 'Grade Estimate', value: grade, raw: true }
        ]
      };
    }
  },
  'gpa-calculator': {
    title: 'GPA Calculator',
    icon: '🎓',
    subtitle: 'Calculate semester Grade Point Average based on grades & credits',
    inputs: [
      { id: 'g1', label: 'Subject 1 Grade', type: 'select', options: [
        { label: 'A (4.0)', value: 4.0 }, { label: 'B (3.0)', value: 3.0 },
        { label: 'C (2.0)', value: 2.0 }, { label: 'D (1.0)', value: 1.0 },
        { label: 'F (0.0)', value: 0.0 }
      ], default: 4.0 },
      { id: 'c1', label: 'Subject 1 Credits', type: 'number', default: 3 },
      { id: 'g2', label: 'Subject 2 Grade', type: 'select', options: [
        { label: 'A (4.0)', value: 4.0 }, { label: 'B (3.0)', value: 3.0 },
        { label: 'C (2.0)', value: 2.0 }, { label: 'D (1.0)', value: 1.0 },
        { label: 'F (0.0)', value: 0.0 }
      ], default: 3.0 },
      { id: 'c2', label: 'Subject 2 Credits', type: 'number', default: 3 },
      { id: 'g3', label: 'Subject 3 Grade', type: 'select', options: [
        { label: 'A (4.0)', value: 4.0 }, { label: 'B (3.0)', value: 3.0 },
        { label: 'C (2.0)', value: 2.0 }, { label: 'D (1.0)', value: 1.0 },
        { label: 'F (0.0)', value: 0.0 }
      ], default: 3.0 },
      { id: 'c3', label: 'Subject 3 Credits', type: 'number', default: 4 },
      { id: 'g4', label: 'Subject 4 Grade', type: 'select', options: [
        { label: 'A (4.0)', value: 4.0 }, { label: 'B (3.0)', value: 3.0 },
        { label: 'C (2.0)', value: 2.0 }, { label: 'D (1.0)', value: 1.0 },
        { label: 'F (0.0)', value: 0.0 }
      ], default: 2.0 },
      { id: 'c4', label: 'Subject 4 Credits', type: 'number', default: 3 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      let totalPoints = 0;
      let totalCredits = 0;
      for (let i = 1; i <= 4; i++) {
        const grade = parseFloat(state[`g${i}`]);
        const credits = parseFloat(state[`c${i}`]);
        if (!isNaN(grade) && !isNaN(credits) && credits > 0) {
          totalPoints += grade * credits;
          totalCredits += credits;
        }
      }
      if (totalCredits === 0) return { error: 'Please enter valid credits.' };
      const gpa = totalPoints / totalCredits;
      return {
        results: [
          { label: 'Semester GPA', value: gpa.toFixed(2), highlight: true, raw: true },
          { label: 'Total Credits', value: totalCredits, raw: true }
        ]
      };
    }
  },
  'cgpa-calculator': {
    title: 'CGPA Calculator',
    icon: '🏫',
    subtitle: 'Calculate Cumulative Grade Point Average of semesters',
    inputs: [
      { id: 'sem1', label: 'Semester 1 GPA', type: 'number', default: 8.5 },
      { id: 'sem2', label: 'Semester 2 GPA', type: 'number', default: 8.0 },
      { id: 'sem3', label: 'Semester 3 GPA', type: 'number', default: 9.0 },
      { id: 'sem4', label: 'Semester 4 GPA', type: 'number', default: 8.7 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      let sum = 0;
      let count = 0;
      for (let i = 1; i <= 4; i++) {
        const gpa = parseFloat(state[`sem${i}`]);
        if (!isNaN(gpa) && gpa > 0) {
          sum += gpa;
          count++;
        }
      }
      if (count === 0) return { error: 'Please enter at least one GPA.' };
      const cgpa = sum / count;
      return {
        results: [
          { label: 'CGPA Score', value: cgpa.toFixed(2), highlight: true, raw: true },
          { label: 'Semesters Evaluated', value: count, raw: true }
        ]
      };
    }
  },
  'cgpa-to-percentage': {
    title: 'CGPA to Percentage Converter',
    icon: '📈',
    subtitle: 'Convert CGPA grade to equivalent percentage',
    inputs: [
      { id: 'cgpa', label: 'Enter CGPA (Scale of 10)', type: 'number', default: 8.5 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const cgpa = parseFloat(state.cgpa);
      if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) return { error: 'Please enter a CGPA between 0 and 10.' };
      const pct = cgpa * 9.5;
      return {
        results: [
          { label: 'Equivalent Percentage', value: pct.toFixed(1) + '%', highlight: true, raw: true }
        ]
      };
    }
  },
  'percentage-to-cgpa': {
    title: 'Percentage to CGPA Converter',
    icon: '📉',
    subtitle: 'Convert class percentage to CGPA',
    inputs: [
      { id: 'pct', label: 'Enter Percentage (%)', type: 'number', default: 80 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const pct = parseFloat(state.pct);
      if (isNaN(pct) || pct < 0 || pct > 100) return { error: 'Please enter a percentage between 0 and 100.' };
      const cgpa = pct / 9.5;
      return {
        results: [
          { label: 'Equivalent CGPA (Out of 10)', value: cgpa.toFixed(2), highlight: true, raw: true }
        ]
      };
    }
  },
  'average-calculator': {
    title: 'Average Calculator',
    icon: '📊',
    subtitle: 'Calculate mathematical mean of up to 5 numbers',
    inputs: [
      { id: 'v1', label: 'Value 1', type: 'number', default: 10 },
      { id: 'v2', label: 'Value 2', type: 'number', default: 20 },
      { id: 'v3', label: 'Value 3', type: 'number', default: 30 },
      { id: 'v4', label: 'Value 4', type: 'number', default: 40 },
      { id: 'v5', label: 'Value 5', type: 'number', default: 50 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      let sum = 0;
      let count = 0;
      for (let i = 1; i <= 5; i++) {
        const val = parseFloat(state[`v${i}`]);
        if (!isNaN(val)) {
          sum += val;
          count++;
        }
      }
      if (count === 0) return { error: 'Please enter at least one number.' };
      const avg = sum / count;
      return {
        results: [
          { label: 'Average (Mean)', value: avg.toFixed(2), highlight: true, raw: true },
          { label: 'Sum of Values', value: sum, raw: true }
        ]
      };
    }
  },
  'grade-calculator': {
    title: 'Grade Calculator',
    icon: '📝',
    subtitle: 'Calculate the grade needed on final exam to reach target grade',
    inputs: [
      { id: 'current', label: 'Current Class Grade (%)', type: 'number', default: 85 },
      { id: 'target', label: 'Target Class Grade (%)', type: 'number', default: 90 },
      { id: 'weight', label: 'Final Exam Weight (%)', type: 'number', default: 20 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const current = parseFloat(state.current);
      const target = parseFloat(state.target);
      const weight = parseFloat(state.weight) / 100;
      if (isNaN(current) || isNaN(target) || isNaN(weight) || weight <= 0 || weight > 1) {
        return { error: 'Please enter valid parameters.' };
      }
      const req = (target - current * (1 - weight)) / weight;
      return {
        results: [
          { label: 'Required Final Exam Grade', value: req.toFixed(1) + '%', highlight: true, raw: true }
        ]
      };
    }
  },
  'attendance-calculator': {
    title: 'Attendance Calculator',
    icon: '📅',
    subtitle: 'Find current attendance percentage and plan classes to attend/skip',
    inputs: [
      { id: 'attended', label: 'Classes Attended', type: 'number', default: 15 },
      { id: 'total', label: 'Total Classes Held', type: 'number', default: 20 },
      { id: 'target', label: 'Minimum Attendance Target (%)', type: 'number', default: 75 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const attended = parseInt(state.attended);
      const total = parseInt(state.total);
      const target = parseFloat(state.target);
      if (isNaN(attended) || isNaN(total) || isNaN(target) || total <= 0 || target < 0 || target > 100) {
        return { error: 'Please enter valid parameters.' };
      }
      if (attended > total) return { error: 'Attended classes cannot exceed total classes.' };
      const currentPct = (attended / total) * 100;
      let status = '';
      if (currentPct >= target) {
        const canSkip = Math.floor((attended - (target / 100) * total) / (target / 100));
        status = canSkip > 0 ? `You can afford to skip the next ${canSkip} classes.` : 'You are exactly on target.';
      } else {
        const reqClasses = Math.ceil(((target / 100) * total - attended) / (1 - target / 100));
        status = reqClasses > 0 ? `You need to attend the next ${reqClasses} classes consecutively.` : '';
      }
      return {
        results: [
          { label: 'Current Attendance Rate', value: currentPct.toFixed(1) + '%', highlight: true, raw: true },
          { label: 'Action Recommendation', value: status, raw: true }
        ]
      };
    }
  },
  'study-time-calculator': {
    title: 'Study Time Calculator',
    icon: '⏳',
    subtitle: 'Plan total preparation hours and schedule weekly sessions',
    inputs: [
      { id: 'hours', label: 'Daily Study Hours', type: 'number', default: 4 },
      { id: 'days', label: 'Study Days per Week', type: 'number', default: 5 },
      { id: 'weeks', label: 'Weeks Remaining for Prep', type: 'number', default: 12 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const hours = parseFloat(state.hours);
      const days = parseFloat(state.days);
      const weeks = parseFloat(state.weeks);
      if (isNaN(hours) || isNaN(days) || isNaN(weeks) || hours < 0 || days < 0 || weeks < 0 || days > 7) {
        return { error: 'Please enter valid study variables.' };
      }
      const totalHours = hours * days * weeks;
      const hoursPerWeek = hours * days;
      return {
        results: [
          { label: 'Cumulative Prep Time', value: totalHours + ' Hours', highlight: true, raw: true },
          { label: 'Weekly Study Allocation', value: hoursPerWeek + ' Hours', raw: true }
        ]
      };
    }
  }
});
