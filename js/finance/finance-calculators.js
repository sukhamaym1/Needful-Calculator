'use strict';

window.NC = window.NC || {};
window.NC.CalculatorRouter = window.NC.CalculatorRouter || {};
window.NC.CalculatorRouter.configs = window.NC.CalculatorRouter.configs || {};

Object.assign(window.NC.CalculatorRouter.configs, {
  'emi-calculator': {
    title: 'EMI Calculator',
    icon: '🏦',
    subtitle: 'Calculate monthly loan instalment instantly',
    inputs: [
      { id: 'principal', label: 'Loan Amount', type: 'range', min: 100000, max: 10000000, step: 100000, default: 2000000, format: 'currency' },
      { id: 'rate', label: 'Annual Interest Rate', type: 'range', min: 1, max: 24, step: 0.1, default: 8.5, format: 'percent' },
      { id: 'tenure', label: 'Loan Tenure', type: 'range', min: 1, max: 30, step: 1, default: 20, format: 'years' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const principal = state.principal;
      const rate = state.rate;
      const tenure = state.tenure;

      const monthlyRate = rate / 12 / 100;
      const months = tenure * 12;
      let emi = 0;
      if (monthlyRate === 0) {
        emi = principal / months;
      } else {
        const factor = Math.pow(1 + monthlyRate, months);
        emi = (principal * monthlyRate * factor) / (factor - 1);
      }

      const totalAmount = emi * months;
      const totalInterest = totalAmount - principal;

      // Table schedule
      const tableRows = [];
      let balance = principal;
      for (let i = 1; i <= Math.min(months, 12); i++) {
        const interestPart = balance * monthlyRate;
        const principalPart = emi - interestPart;
        balance -= principalPart;
        tableRows.push({
          col1: i,
          col2: emi,
          col3: principalPart,
          col4: interestPart,
          col5: Math.max(0, balance)
        });
      }

      return {
        results: [
          { label: 'Monthly EMI', value: emi, highlight: true, format: 'currency' },
          { label: 'Principal Amount', value: principal, format: 'currency' },
          { label: 'Total Interest', value: totalInterest, format: 'currency' },
          { label: 'Total Amount Payable', value: totalAmount, format: 'currency' }
        ],
        chartData: {
          labels: ['Principal Amount', 'Total Interest'],
          data: [principal, totalInterest]
        },
        tableHeader: ['Month', 'EMI (₹)', 'Principal (₹)', 'Interest (₹)', 'Balance (₹)'],
        tableRows: tableRows,
        tableFooterText: months > 12 ? `... ${months - 12} more months projected ...` : null
      };
    },
    article: `
        <h2>What is EMI? How is it Calculated?</h2>
        <p>An <strong>Equated Monthly Instalment (EMI)</strong> is the fixed amount you pay to your lender every month until your loan is fully repaid. It consists of the principal amount and the interest charged on the outstanding balance.</p>
        <div class="formula-box">EMI = P × r × (1+r)ⁿ / [(1+r)ⁿ – 1]</div>
        <p>Where <strong>P</strong> = Principal loan amount, <strong>r</strong> = Monthly interest rate, and <strong>n</strong> = Total number of monthly instalments.</p>
        <h3>Frequently Asked Questions</h3>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question">Does EMI change if interest rate changes?</button>
            <div class="faq-answer">For floating rate loans, yes. For fixed rate loans, it remains constant.</div>
          </div>
          <div class="faq-item">
            <button class="faq-question">What is the ideal EMI-to-income ratio?</button>
            <div class="faq-answer">Total EMIs should ideally not exceed 40-50% of your net monthly income.</div>
          </div>
        </div>
      `
  },

  'sip-calculator': {
    title: 'SIP Calculator',
    icon: '📈',
    subtitle: 'Plan mutual fund SIP investments and compound wealth',
    inputs: [
      { id: 'monthly', label: 'Monthly Investment', type: 'range', min: 500, max: 1000000, step: 500, default: 5000, format: 'currency' },
      { id: 'rate', label: 'Expected Return Rate (p.a.)', type: 'range', min: 1, max: 30, step: 0.5, default: 12, format: 'percent' },
      { id: 'tenure', label: 'Time Period', type: 'range', min: 1, max: 40, step: 1, default: 10, format: 'years' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const P = state.monthly;
      const R = state.rate;
      const years = state.tenure;
      const i = R / 12 / 100;
      const n = years * 12;

      const maturity = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const invested = P * n;
      const returns = maturity - invested;

      const tableRows = [];
      let balance = 0;
      for (let y = 1; y <= years; y++) {
        const yearMonths = y * 12;
        const yMaturity = P * ((Math.pow(1 + i, yearMonths) - 1) / i) * (1 + i);
        const yInvested = P * yearMonths;
        const yReturns = yMaturity - yInvested;
        tableRows.push({
          col1: `Year ${y}`,
          col2: yInvested,
          col3: yReturns,
          col4: yMaturity,
          col5: ''
        });
      }

      return {
        results: [
          { label: 'Maturity Amount', value: maturity, highlight: true, format: 'currency' },
          { label: 'Invested Amount', value: invested, format: 'currency' },
          { label: 'Est. Returns', value: returns, format: 'currency' }
        ],
        chartData: {
          labels: ['Invested Amount', 'Est. Returns'],
          data: [invested, returns]
        },
        tableHeader: ['Year', 'Invested Amount (₹)', 'Est. Returns (₹)', 'Total Value (₹)', ''],
        tableRows: tableRows
      };
    },
    article: `
        <h2>How does a SIP Calculator work?</h2>
        <p>A <strong>Systematic Investment Plan (SIP)</strong> allows you to invest a fixed amount regularly in mutual funds. Compounding makes your money grow exponentially over time.</p>
        <div class="formula-box">M = P × [ ( (1 + i)ⁿ - 1 ) / i ] × (1 + i)</div>
        <p>Where <strong>M</strong> = Maturity amount, <strong>P</strong> = Monthly investment, <strong>i</strong> = Monthly expected return rate, and <strong>n</strong> = Number of monthly investments.</p>
      `
  },

  'fd-calculator': {
    title: 'FD Calculator',
    icon: '💰',
    subtitle: 'Calculate Fixed Deposit maturity amount and interest earned',
    inputs: [
      { id: 'principal', label: 'Total Investment', type: 'range', min: 1000, max: 10000000, step: 1000, default: 100000, format: 'currency' },
      { id: 'rate', label: 'Rate of Interest (p.a.)', type: 'range', min: 1, max: 20, step: 0.1, default: 6.5, format: 'percent' },
      { id: 'tenure', label: 'Tenure (Years)', type: 'range', min: 1, max: 25, step: 1, default: 5, format: 'years' },
      {
        id: 'compounding',
        label: 'Compounding Frequency',
        type: 'select',
        options: [
          { label: 'Monthly', value: 12 },
          { label: 'Quarterly', value: 4 },
          { label: 'Half-yearly', value: 2 },
          { label: 'Yearly', value: 1 }
        ],
        default: 4
      }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const P = state.principal;
      const R = state.rate;
      const t = state.tenure;
      const n = parseFloat(state.compounding);

      const r = R / 100;
      const maturity = P * Math.pow(1 + r / n, n * t);
      const interest = maturity - P;

      const tableRows = [];
      for (let y = 1; y <= t; y++) {
        const yMaturity = P * Math.pow(1 + r / n, n * y);
        const yInterest = yMaturity - P;
        tableRows.push({
          col1: `Year ${y}`,
          col2: P,
          col3: yInterest,
          col4: yMaturity,
          col5: ''
        });
      }

      return {
        results: [
          { label: 'Maturity Value', value: maturity, highlight: true, format: 'currency' },
          { label: 'Invested Amount', value: P, format: 'currency' },
          { label: 'Est. Interest', value: interest, format: 'currency' }
        ],
        chartData: {
          labels: ['Principal Amount', 'Interest Earned'],
          data: [P, interest]
        },
        tableHeader: ['Year', 'Principal (₹)', 'Accumulated Interest (₹)', 'Maturity Amount (₹)', ''],
        tableRows: tableRows
      };
    },
    article: `
        <h2>What is a Fixed Deposit?</h2>
        <p>A Fixed Deposit is a secure financial instrument offered by banks which offers a higher rate of interest than a regular savings account until a given maturity date.</p>
        <div class="formula-box">A = P × (1 + r/n)ⁿᵗ</div>
      `
  },

  'ppf-calculator': {
    title: 'PPF Calculator',
    icon: '🏛️',
    subtitle: 'Calculate Public Provident Fund maturity with 7.1% interest',
    inputs: [
      { id: 'annual', label: 'Yearly Investment', type: 'range', min: 500, max: 150000, step: 500, default: 50000, format: 'currency' },
      { id: 'tenure', label: 'Tenure (Years)', type: 'range', min: 15, max: 50, step: 5, default: 15, format: 'years' },
      { id: 'rate', label: 'PPF Interest Rate (%)', type: 'number', default: 7.1, readonly: true }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const P = state.annual;
      const R = 7.1;
      const years = state.tenure;
      const r = R / 100;

      let totalInvested = 0;
      let totalMaturity = 0;
      const tableRows = [];

      for (let y = 1; y <= years; y++) {
        totalInvested += P;
        const interest = (totalMaturity + P) * r;
        totalMaturity = totalMaturity + P + interest;

        tableRows.push({
          col1: `Year ${y}`,
          col2: totalInvested,
          col3: totalMaturity - totalInvested,
          col4: totalMaturity,
          col5: ''
        });
      }

      const returns = totalMaturity - totalInvested;

      return {
        results: [
          { label: 'Maturity Amount', value: totalMaturity, highlight: true, format: 'currency' },
          { label: 'Total Investment', value: totalInvested, format: 'currency' },
          { label: 'Total Interest Earned', value: returns, format: 'currency' }
        ],
        chartData: {
          labels: ['Total Invested', 'Total Interest'],
          data: [totalInvested, returns]
        },
        tableHeader: ['Year', 'Total Invested (₹)', 'Total Interest (₹)', 'Maturity Balance (₹)', ''],
        tableRows: tableRows
      };
    },
    article: `
        <h2>What is PPF?</h2>
        <p>Public Provident Fund (PPF) is a popular long-term savings-cum-tax-saving scheme backed by the Government of India. It has a mandatory lock-in period of 15 years.</p>
      `
  },



  'compound-interest': {
    title: 'Compound Interest Calculator',
    icon: '📊',
    subtitle: 'Analyze the exponential growth of savings',
    inputs: [
      { id: 'principal', label: 'Principal Amount', type: 'range', min: 100, max: 10000000, step: 100, default: 50000, format: 'currency' },
      { id: 'rate', label: 'Interest Rate (%)', type: 'range', min: 0.1, max: 100, step: 0.1, default: 10, format: 'percent' },
      { id: 'tenure', label: 'Tenure (Years)', type: 'range', min: 1, max: 50, step: 1, default: 10, format: 'years' },
      {
        id: 'frequency',
        label: 'Compounding Interval',
        type: 'select',
        options: [
          { label: 'Daily', value: 365 },
          { label: 'Monthly', value: 12 },
          { label: 'Quarterly', value: 4 },
          { label: 'Yearly', value: 1 }
        ],
        default: 12
      }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const P = state.principal;
      const r = state.rate / 100;
      const t = state.tenure;
      const n = parseFloat(state.frequency);

      const A = P * Math.pow(1 + r / n, n * t);
      const interest = A - P;

      const tableRows = [];
      for (let y = 1; y <= t; y++) {
        const yA = P * Math.pow(1 + r / n, n * y);
        const yInterest = yA - P;
        tableRows.push({
          col1: `Year ${y}`,
          col2: P,
          col3: yInterest,
          col4: yA,
          col5: ''
        });
      }

      return {
        results: [
          { label: 'Maturity Amount', value: A, highlight: true, format: 'currency' },
          { label: 'Principal Amount', value: P, format: 'currency' },
          { label: 'Total Interest', value: interest, format: 'currency' }
        ],
        chartData: {
          labels: ['Principal', 'Interest'],
          data: [P, interest]
        },
        tableHeader: ['Year', 'Principal (₹)', 'Est. Interest (₹)', 'Total Balance (₹)', ''],
        tableRows: tableRows
      };
    },
    article: `
        <h2>The Power of Compounding</h2>
        <p>Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods.</p>
      `
  },



  'retirement-calculator': {
    title: 'Retirement Calculator',
    icon: '👴',
    subtitle: 'Plan retirement corpus and monthly savings required',
    inputs: [
      { id: 'currAge', label: 'Current Age', type: 'range', min: 18, max: 60, step: 1, default: 30, format: 'years' },
      { id: 'retAge', label: 'Retirement Age', type: 'range', min: 40, max: 70, step: 1, default: 60, format: 'years' },
      { id: 'lifeExp', label: 'Life Expectancy', type: 'range', min: 60, max: 100, step: 1, default: 85, format: 'years' },
      { id: 'expenses', label: 'Monthly Expenses (Current)', type: 'range', min: 5000, max: 500000, step: 5000, default: 50000, format: 'currency' },
      { id: 'inflation', label: 'Expected Inflation Rate (%)', type: 'range', min: 0, max: 15, step: 0.5, default: 6, format: 'percent' },
      { id: 'preRate', label: 'Pre-Retirement Returns Rate (%)', type: 'range', min: 1, max: 25, step: 0.5, default: 12, format: 'percent' },
      { id: 'postRate', label: 'Post-Retirement Returns Rate (%)', type: 'range', min: 1, max: 25, step: 0.5, default: 8, format: 'percent' }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const cur = state.currAge;
      const ret = state.retAge;
      const exp = state.lifeExp;
      const expMonthly = state.expenses;
      const infl = state.inflation / 100;
      const preR = state.preRate / 100;
      const postR = state.postRate / 100;

      if (ret <= cur) {
        return { error: 'Retirement age must be greater than current age' };
      }
      if (exp <= ret) {
        return { error: 'Life expectancy must be greater than retirement age' };
      }

      const yearsToRet = ret - cur;
      const yearsInRet = exp - ret;

      const futureExpMonthly = expMonthly * Math.pow(1 + infl, yearsToRet);
      const futureExpAnnual = futureExpMonthly * 12;

      const rAdj = ((1 + postR) / (1 + infl)) - 1;

      let corpus = 0;
      if (rAdj === 0) {
        corpus = futureExpAnnual * yearsInRet;
      } else {
        corpus = futureExpAnnual * ((1 - Math.pow(1 + rAdj, -yearsInRet)) / rAdj) * (1 + rAdj);
      }

      const nAccum = yearsToRet * 12;
      const rAccum = preR / 12;
      let monthlySavings = 0;
      if (rAccum === 0) {
        monthlySavings = corpus / nAccum;
      } else {
        monthlySavings = corpus * (rAccum / (Math.pow(1 + rAccum, nAccum) - 1)) / (1 + rAccum);
      }

      return {
        results: [
          { label: 'Retirement Corpus Needed', value: corpus, highlight: true, format: 'currency' },
          { label: 'Monthly Expense after Retirement', value: futureExpMonthly, format: 'currency' },
          { label: 'Required Monthly Savings Now', value: monthlySavings, format: 'currency' }
        ]
      };
    },
    article: `
        <h2>Retirement Financial Planning</h2>
        <p>Planning for retirement ensures that you can sustain your lifestyle without earned income during retirement years.</p>
      `
  },

  'loan-calculator': {
    title: 'Loan Calculator',
    icon: '💳',
    subtitle: 'Calculate loan installments and interest details',
    inputs: [
      { id: 'principal', label: 'Loan Principal', type: 'range', min: 10000, max: 10000000, step: 10000, default: 500000, format: 'currency' },
      { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'range', min: 1, max: 24, step: 0.1, default: 10, format: 'percent' },
      { id: 'tenure', label: 'Loan Tenure (Years)', type: 'range', min: 1, max: 30, step: 1, default: 5, format: 'years' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      return CalculatorRouter.configs['emi-calculator'].calculate(state);
    },
    article: `
        <h2>Loan Repayment Analysis</h2>
        <p>Calculate amortization details, total interest, and monthly payments easily.</p>
      `
  },

  'loan-eligibility': {
    title: 'Loan Eligibility Calculator',
    icon: '🏦',
    subtitle: 'Calculate your eligible loan amount based on income & liabilities',
    inputs: [
      { id: 'income', label: 'Gross Monthly Income (₹)', type: 'range', min: 10000, max: 1000000, step: 5000, default: 100000, format: 'currency' },
      { id: 'emis', label: 'Existing Monthly EMIs (₹)', type: 'range', min: 0, max: 500000, step: 2000, default: 15000, format: 'currency' },
      { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'range', min: 5, max: 20, step: 0.1, default: 9.0, format: 'percent' },
      { id: 'tenure', label: 'Loan Tenure (Years)', type: 'range', min: 1, max: 30, step: 1, default: 20, format: 'years' },
      { id: 'foir', label: 'Max FOIR (%)', type: 'range', min: 10, max: 100, step: 5, default: 50, format: 'percent' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const income = state.income;
      const emis = state.emis;
      const rate = state.rate;
      const tenure = state.tenure;
      const foir = state.foir;

      const maxEmi = (income * (foir / 100)) - emis;
      const monthlyRate = rate / 12 / 100;
      const months = tenure * 12;

      let eligibleLoan = 0;
      if (maxEmi > 0) {
        if (monthlyRate === 0) {
          eligibleLoan = maxEmi * months;
        } else {
          const factor = Math.pow(1 + monthlyRate, months);
          eligibleLoan = maxEmi * (factor - 1) / (monthlyRate * factor);
        }
      }

      const totalEmiPaid = maxEmi > 0 ? maxEmi * months : 0;
      const totalInterest = Math.max(0, totalEmiPaid - eligibleLoan);

      const tableRows = [];
      let balance = eligibleLoan;
      for (let i = 1; i <= Math.min(months, 12); i++) {
        const interestPart = balance * monthlyRate;
        const principalPart = maxEmi - interestPart;
        balance -= principalPart;
        tableRows.push({
          col1: i,
          col2: maxEmi > 0 ? maxEmi : 0,
          col3: Math.max(0, principalPart),
          col4: Math.max(0, interestPart),
          col5: Math.max(0, balance)
        });
      }

      return {
        results: [
          { label: 'Eligible Loan Amount', value: eligibleLoan, highlight: true, format: 'currency' },
          { label: 'Max Affordable Monthly EMI', value: Math.max(0, maxEmi), format: 'currency' },
          { label: 'Total Interest Payable', value: totalInterest, format: 'currency' },
          { label: 'Total Repayment Amount', value: totalEmiPaid, format: 'currency' }
        ],
        chartData: {
          labels: ['Eligible Loan Principal', 'Total Interest'],
          data: [eligibleLoan, totalInterest]
        },
        tableHeader: ['Month', 'EMI (₹)', 'Principal (₹)', 'Interest (₹)', 'Balance (₹)'],
        tableRows: tableRows,
        tableFooterText: months > 12 ? `... ${months - 12} more months projected ...` : null
      };
    }
  },

  'home-loan': {
    title: 'Home Loan EMI Calculator',
    icon: '🏠',
    subtitle: 'Calculate monthly EMI and total interest for home loans',
    inputs: [
      { id: 'principal', label: 'Loan Amount (₹)', type: 'range', min: 100000, max: 50000000, step: 100000, default: 5000000, format: 'currency' },
      { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'range', min: 5, max: 20, step: 0.1, default: 8.5, format: 'percent' },
      { id: 'tenure', label: 'Loan Tenure (Years)', type: 'range', min: 1, max: 30, step: 1, default: 20, format: 'years' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      return CalculatorRouter.configs['emi-calculator'].calculate(state);
    }
  },

  'car-loan': {
    title: 'Car Loan EMI Calculator',
    icon: '🚗',
    subtitle: 'Calculate monthly EMI and total interest for auto loans',
    inputs: [
      { id: 'principal', label: 'Loan Amount (₹)', type: 'range', min: 100000, max: 10000000, step: 50000, default: 800000, format: 'currency' },
      { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'range', min: 5, max: 25, step: 0.1, default: 9.5, format: 'percent' },
      { id: 'tenure', label: 'Loan Tenure (Years)', type: 'range', min: 1, max: 7, step: 1, default: 5, format: 'years' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      return CalculatorRouter.configs['emi-calculator'].calculate(state);
    }
  },

  'personal-loan': {
    title: 'Personal Loan EMI Calculator',
    icon: '💳',
    subtitle: 'Calculate monthly EMI and total interest for personal loans',
    inputs: [
      { id: 'principal', label: 'Loan Amount (₹)', type: 'range', min: 10000, max: 5000000, step: 10000, default: 500000, format: 'currency' },
      { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'range', min: 5, max: 35, step: 0.1, default: 12.5, format: 'percent' },
      { id: 'tenure', label: 'Loan Tenure (Years)', type: 'range', min: 1, max: 5, step: 1, default: 3, format: 'years' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      return CalculatorRouter.configs['emi-calculator'].calculate(state);
    }
  },

  'lumpsum': {
    title: 'Lumpsum Calculator',
    icon: '💰',
    subtitle: 'Calculate expected returns for one-time lumpsum investments',
    inputs: [
      { id: 'principal', label: 'Total Investment (₹)', type: 'range', min: 500, max: 10000000, step: 500, default: 100000, format: 'currency' },
      { id: 'rate', label: 'Expected Return Rate (% p.a.)', type: 'range', min: 1, max: 30, step: 0.5, default: 12.0, format: 'percent' },
      { id: 'tenure', label: 'Time Period (Years)', type: 'range', min: 1, max: 40, step: 1, default: 10, format: 'years' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const P = state.principal;
      const R = state.rate;
      const t = state.tenure;

      const r = R / 100;
      const maturity = P * Math.pow(1 + r, t);
      const returns = maturity - P;

      const tableRows = [];
      for (let y = 1; y <= t; y++) {
        const yMaturity = P * Math.pow(1 + r, y);
        const yReturns = yMaturity - P;
        tableRows.push({
          col1: `Year ${y}`,
          col2: P,
          col3: yReturns,
          col4: yMaturity,
          col5: ''
        });
      }

      return {
        results: [
          { label: 'Maturity Value', value: maturity, highlight: true, format: 'currency' },
          { label: 'Invested Amount', value: P, format: 'currency' },
          { label: 'Est. Returns', value: returns, format: 'currency' }
        ],
        chartData: {
          labels: ['Invested Amount', 'Est. Returns'],
          data: [P, returns]
        },
        tableHeader: ['Year', 'Invested Amount (₹)', 'Est. Returns (₹)', 'Maturity Value (₹)', ''],
        tableRows: tableRows
      };
    }
  },

  'goal-sip': {
    title: 'Goal SIP Calculator',
    icon: '🎯',
    subtitle: 'Calculate monthly SIP investment needed to reach a target goal',
    inputs: [
      { id: 'goal', label: 'Target Goal Amount (₹)', type: 'range', min: 10000, max: 100000000, step: 50000, default: 10000000, format: 'currency' },
      { id: 'rate', label: 'Expected Return Rate (% p.a.)', type: 'range', min: 1, max: 30, step: 0.5, default: 12.0, format: 'percent' },
      { id: 'tenure', label: 'Time Period (Years)', type: 'range', min: 1, max: 40, step: 1, default: 10, format: 'years' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const goal = state.goal;
      const R = state.rate;
      const years = state.tenure;

      const i = R / 12 / 100;
      const n = years * 12;

      let monthlySip = 0;
      if (i === 0) {
        monthlySip = goal / n;
      } else {
        monthlySip = goal / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
      }

      const invested = monthlySip * n;
      const returns = goal - invested;

      const tableRows = [];
      for (let y = 1; y <= years; y++) {
        const yMonths = y * 12;
        const yInvested = monthlySip * yMonths;
        const yMaturity = monthlySip * ((Math.pow(1 + i, yMonths) - 1) / i) * (1 + i);
        const yReturns = yMaturity - yInvested;
        tableRows.push({
          col1: `Year ${y}`,
          col2: yInvested,
          col3: yReturns,
          col4: yMaturity,
          col5: ''
        });
      }

      return {
        results: [
          { label: 'Required Monthly SIP', value: monthlySip, highlight: true, format: 'currency' },
          { label: 'Total Invested Amount', value: invested, format: 'currency' },
          { label: 'Est. Earnings/Returns', value: returns, format: 'currency' },
          { label: 'Target Goal Value', value: goal, format: 'currency' }
        ],
        chartData: {
          labels: ['Total Invested', 'Est. Returns'],
          data: [invested, returns]
        },
        tableHeader: ['Year', 'Invested Amount (₹)', 'Est. Returns (₹)', 'Total Value (₹)', ''],
        tableRows: tableRows
      };
    }
  },

  'retirement': {
    title: 'Retirement Calculator',
    icon: '👴',
    subtitle: 'Plan retirement corpus and monthly savings needed to retire comfortably',
    inputs: [
      { id: 'currAge', label: 'Current Age', type: 'range', min: 18, max: 60, step: 1, default: 30, format: 'years' },
      { id: 'retAge', label: 'Retirement Age', type: 'range', min: 40, max: 70, step: 1, default: 60, format: 'years' },
      { id: 'lifeExp', label: 'Life Expectancy', type: 'range', min: 60, max: 100, step: 1, default: 85, format: 'years' },
      { id: 'expenses', label: 'Monthly Expenses (Current) (₹)', type: 'range', min: 5000, max: 500000, step: 5000, default: 50000, format: 'currency' },
      { id: 'inflation', label: 'Expected Inflation Rate (%)', type: 'range', min: 0, max: 15, step: 0.5, default: 6, format: 'percent' },
      { id: 'preRate', label: 'Pre-Retirement Returns Rate (%)', type: 'range', min: 1, max: 25, step: 0.5, default: 12, format: 'percent' },
      { id: 'postRate', label: 'Post-Retirement Returns Rate (%)', type: 'range', min: 1, max: 25, step: 0.5, default: 8, format: 'percent' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const cur = state.currAge;
      const ret = state.retAge;
      const exp = state.lifeExp;
      const expMonthly = state.expenses;
      const infl = state.inflation / 100;
      const preR = state.preRate / 100;
      const postR = state.postRate / 100;

      if (ret <= cur) {
        return { error: 'Retirement age must be greater than current age' };
      }
      if (exp <= ret) {
        return { error: 'Life expectancy must be greater than retirement age' };
      }

      const yearsToRet = ret - cur;
      const yearsInRet = exp - ret;

      const futureExpMonthly = expMonthly * Math.pow(1 + infl, yearsToRet);
      const futureExpAnnual = futureExpMonthly * 12;

      const rAdj = ((1 + postR) / (1 + infl)) - 1;

      let corpus = 0;
      if (rAdj === 0) {
        corpus = futureExpAnnual * yearsInRet;
      } else {
        corpus = futureExpAnnual * ((1 - Math.pow(1 + rAdj, -yearsInRet)) / rAdj) * (1 + rAdj);
      }

      const nAccum = yearsToRet * 12;
      const rAccum = preR / 12;
      let monthlySavings = 0;
      if (rAccum === 0) {
        monthlySavings = corpus / nAccum;
      } else {
        monthlySavings = corpus * (rAccum / (Math.pow(1 + rAccum, nAccum) - 1)) / (1 + rAccum);
      }

      const totalSaved = monthlySavings * nAccum;
      const returns = corpus - totalSaved;

      const tableRows = [];
      for (let y = 1; y <= yearsToRet; y++) {
        const yAccumMonths = y * 12;
        const yInvested = monthlySavings * yAccumMonths;
        const yCorpus = monthlySavings * ((Math.pow(1 + rAccum, yAccumMonths) - 1) / rAccum) * (1 + rAccum);
        tableRows.push({
          col1: `Year ${y} (Age ${cur + y})`,
          col2: yInvested,
          col3: yCorpus - yInvested,
          col4: yCorpus,
          col5: ''
        });
      }

      return {
        results: [
          { label: 'Retirement Corpus Needed', value: corpus, highlight: true, format: 'currency' },
          { label: 'Monthly Expense after Retirement', value: futureExpMonthly, format: 'currency' },
          { label: 'Required Monthly Savings Now', value: monthlySavings, format: 'currency' }
        ],
        chartData: {
          labels: ['Total Savings Principal', 'Est. Investment Growth'],
          data: [totalSaved, returns]
        },
        tableHeader: ['Year', 'Total Invested (₹)', 'Est. Returns (₹)', 'Accumulated Corpus (₹)', ''],
        tableRows: tableRows
      };
    }
  },

  'swp': {
    title: 'SWP Calculator',
    icon: '🔄',
    subtitle: 'Calculate systematic withdrawal schedules and balance maturity',
    inputs: [
      { id: 'principal', label: 'Initial Investment (₹)', type: 'range', min: 10000, max: 50000000, step: 50000, default: 1000000, format: 'currency' },
      { id: 'withdrawal', label: 'Monthly Withdrawal (₹)', type: 'range', min: 500, max: 500000, step: 500, default: 10000, format: 'currency' },
      { id: 'rate', label: 'Expected Return Rate (% p.a.)', type: 'range', min: 1, max: 30, step: 0.5, default: 10.0, format: 'percent' },
      { id: 'tenure', label: 'Time Period (Years)', type: 'range', min: 1, max: 40, step: 1, default: 10, format: 'years' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const principal = state.principal;
      const withdrawal = state.withdrawal;
      const rate = state.rate;
      const tenure = state.tenure;

      const monthlyRate = rate / 12 / 100;
      const months = tenure * 12;

      let balance = principal;
      let totalWithdrawals = 0;
      const tableRows = [];

      for (let y = 1; y <= tenure; y++) {
        let yearWithdrawals = 0;
        for (let m = 1; m <= 12; m++) {
          if (balance > 0) {
            const interest = balance * monthlyRate;
            balance = balance + interest - withdrawal;
            totalWithdrawals += withdrawal;
          }
        }
        tableRows.push({
          col1: `Year ${y}`,
          col2: principal,
          col3: totalWithdrawals,
          col4: Math.max(0, balance),
          col5: ''
        });
      }

      const estReturns = Math.max(0, balance + totalWithdrawals - principal);

      return {
        results: [
          { label: 'Final Maturity Value', value: Math.max(0, balance), highlight: true, format: 'currency' },
          { label: 'Total Invested Value', value: principal, format: 'currency' },
          { label: 'Total Withdrawals', value: totalWithdrawals, format: 'currency' },
          { label: 'Total Interest Earned', value: estReturns, format: 'currency' }
        ],
        chartData: {
          labels: ['Final Maturity Value', 'Total Withdrawals'],
          data: [Math.max(0, balance), totalWithdrawals]
        },
        tableHeader: ['Year', 'Initial Principal (₹)', 'Total Withdrawals (₹)', 'Maturity Balance (₹)', ''],
        tableRows: tableRows
      };
    }
  },

  'nps': {
    title: 'NPS Calculator',
    icon: '👴',
    subtitle: 'Calculate NPS corpus, lumpsum cashout, and monthly pension',
    inputs: [
      { id: 'monthly', label: 'Monthly Contribution (₹)', type: 'range', min: 500, max: 150000, step: 500, default: 10000, format: 'currency' },
      { id: 'rate', label: 'Expected Return Rate (% p.a.)', type: 'range', min: 5, max: 15, step: 0.5, default: 10.0, format: 'percent' },
      { id: 'age', label: 'Current Age (Years)', type: 'range', min: 18, max: 60, step: 1, default: 30, format: 'years' },
      { id: 'annuityPct', label: 'Annuity Purchase (%)', type: 'range', min: 40, max: 100, step: 5, default: 40, format: 'percent' },
      { id: 'annuityRate', label: 'Expected Annuity Rate (% p.a.)', type: 'range', min: 3, max: 15, step: 0.5, default: 6.0, format: 'percent' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const monthly = state.monthly;
      const rate = state.rate;
      const age = state.age;
      const annuityPct = state.annuityPct;
      const annuityRate = state.annuityRate;

      const tenure = 60 - age;
      const r = rate / 12 / 100;
      const months = tenure > 0 ? tenure * 12 : 0;

      let totalCorpus = 0;
      if (months > 0) {
        if (r === 0) {
          totalCorpus = monthly * months;
        } else {
          totalCorpus = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
        }
      }

      const invested = monthly * months;
      const returns = Math.max(0, totalCorpus - invested);

      const annuityCorpus = totalCorpus * (annuityPct / 100);
      const lumpsumCashout = totalCorpus - annuityCorpus;
      const monthlyPension = (annuityCorpus * (annuityRate / 100)) / 12;

      const tableRows = [];
      for (let y = 1; y <= tenure; y++) {
        const yMonths = y * 12;
        const yInvested = monthly * yMonths;
        const yCorpus = monthly * ((Math.pow(1 + r, yMonths) - 1) / r) * (1 + r);
        tableRows.push({
          col1: `Year ${y} (Age ${age + y})`,
          col2: yInvested,
          col3: yCorpus - yInvested,
          col4: yCorpus,
          col5: ''
        });
      }

      return {
        results: [
          { label: 'Total NPS Corpus', value: totalCorpus, highlight: true, format: 'currency' },
          { label: 'Monthly Pension Expected', value: monthlyPension, format: 'currency' },
          { label: 'Lumpsum Tax-Free Cashout', value: lumpsumCashout, format: 'currency' },
          { label: 'Annuity Reinvested Corpus', value: annuityCorpus, format: 'currency' }
        ],
        chartData: {
          labels: ['Lumpsum Cashout', 'Annuity Reinvested'],
          data: [lumpsumCashout, annuityCorpus]
        },
        tableHeader: ['Year', 'NPS Investment (₹)', 'Est. Returns (₹)', 'Pension Corpus (₹)', ''],
        tableRows: tableRows
      };
    }
  },

  'cagr': {
    title: 'CAGR Calculator',
    icon: '📈',
    subtitle: 'Calculate the Compound Annual Growth Rate of your investments',
    inputs: [
      { id: 'initial', label: 'Initial Investment (₹)', type: 'range', min: 100, max: 10000000, step: 500, default: 10000, format: 'currency' },
      { id: 'final', label: 'Final Value (₹)', type: 'range', min: 100, max: 100000000, step: 1000, default: 30000, format: 'currency' },
      { id: 'tenure', label: 'Time Period (Years)', type: 'range', min: 0.5, max: 40, step: 0.5, default: 5, format: 'years' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const initial = state.initial;
      const final = state.final;
      const tenure = state.tenure;

      let cagr = 0;
      if (initial > 0 && final > 0 && tenure > 0) {
        cagr = Math.pow(final / initial, 1 / tenure) - 1;
      }

      const gain = Math.max(0, final - initial);
      const cagrPercent = cagr * 100;

      const tableRows = [];
      const steps = Math.ceil(tenure);
      for (let y = 1; y <= steps; y++) {
        const t = Math.min(y, tenure);
        const yVal = initial * Math.pow(1 + cagr, t);
        tableRows.push({
          col1: `Year ${t}`,
          col2: initial,
          col3: yVal - initial,
          col4: yVal,
          col5: ''
        });
      }

      return {
        results: [
          { label: 'CAGR (Growth Rate)', value: cagrPercent.toFixed(2) + '%', highlight: true, raw: true },
          { label: 'Total Investment Gain', value: gain, format: 'currency' },
          { label: 'Initial Investment', value: initial, format: 'currency' },
          { label: 'Final Value maturity', value: final, format: 'currency' }
        ],
        chartData: {
          labels: ['Initial Investment', 'Total Gain'],
          data: [initial, gain]
        },
        tableHeader: ['Year', 'Principal (₹)', 'Accumulated Gain (₹)', 'Ending Balance (₹)', ''],
        tableRows: tableRows
      };
    }
  },

  'inflation': {
    title: 'Inflation Calculator',
    icon: '💸',
    subtitle: 'Calculate future purchasing power or cost adjusted for inflation',
    inputs: [
      { id: 'amount', label: 'Principal Amount (₹)', type: 'range', min: 100, max: 10000000, step: 500, default: 50000, format: 'currency' },
      { id: 'rate', label: 'Inflation Rate (% p.a.)', type: 'range', min: 1, max: 20, step: 0.5, default: 6.0, format: 'percent' },
      { id: 'tenure', label: 'Time Period (Years)', type: 'range', min: 1, max: 40, step: 1, default: 10, format: 'years' },
      {
        id: 'mode',
        label: 'Inflation Impact Mode',
        type: 'select',
        options: [
          { label: 'Future Cost (Effect of Inflation)', value: 'future' },
          { label: 'Purchasing Power (Value of Money)', value: 'power' }
        ],
        default: 'future'
      }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const amount = state.amount;
      const rate = state.rate;
      const tenure = state.tenure;
      const mode = state.mode;

      const r = rate / 100;
      let resultValue = 0;
      let chartLabel = '';
      let difference = 0;

      if (mode === 'future') {
        resultValue = amount * Math.pow(1 + r, tenure);
        difference = resultValue - amount;
        chartLabel = 'Future Cost Increase';
      } else {
        resultValue = amount / Math.pow(1 + r, tenure);
        difference = amount - resultValue;
        chartLabel = 'Lost Purchasing Power';
      }

      const tableRows = [];
      for (let y = 1; y <= tenure; y++) {
        let yVal = 0;
        if (mode === 'future') {
          yVal = amount * Math.pow(1 + r, y);
        } else {
          yVal = amount / Math.pow(1 + r, y);
        }
        tableRows.push({
          col1: `Year ${y}`,
          col2: amount,
          col3: Math.abs(yVal - amount),
          col4: yVal,
          col5: ''
        });
      }

      return {
        results: [
          { label: mode === 'future' ? 'Future Adjusted Cost' : 'Future Purchasing Power', value: resultValue, highlight: true, format: 'currency' },
          { label: mode === 'future' ? 'Estimated Cost Difference' : 'Lost Money Value', value: difference, format: 'currency' },
          { label: 'Original Principal Amount', value: amount, format: 'currency' }
        ],
        chartData: {
          labels: ['Original Amount Value', chartLabel],
          data: [mode === 'future' ? amount : resultValue, difference]
        },
        tableHeader: ['Year', 'Original Value (₹)', 'Difference (₹)', 'Adjusted Value (₹)', ''],
        tableRows: tableRows
      };
    }
  }
});
