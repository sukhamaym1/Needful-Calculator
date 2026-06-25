'use strict';

window.NC = window.NC || {};
window.NC.CalculatorRouter = window.NC.CalculatorRouter || {};
window.NC.CalculatorRouter.configs = window.NC.CalculatorRouter.configs || {};

Object.assign(window.NC.CalculatorRouter.configs, {
  'life-insurance': {
    title: 'Life Insurance Calculator',
    icon: '🛡️',
    subtitle: 'Estimate the ideal life insurance coverage you need',
    inputs: [
      { id: 'age', label: 'Current Age', type: 'range', min: 18, max: 65, step: 1, default: 30 },
      { id: 'retirement', label: 'Retirement Age', type: 'range', min: 50, max: 75, step: 1, default: 60 },
      { id: 'expenses', label: 'Monthly Expenses', type: 'range', min: 10000, max: 1000000, step: 5000, default: 50000, format: 'currency' },
      { id: 'liabilities', label: 'Total Outstanding Liabilities', type: 'range', min: 0, max: 50000000, step: 100000, default: 2000000, format: 'currency' },
      { id: 'assets', label: 'Existing Assets & Investments', type: 'range', min: 0, max: 50000000, step: 100000, default: 500000, format: 'currency' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const workingYears = Math.max(1, state.retirement - state.age);
      const expensePart = state.expenses * 12 * workingYears;
      const totalRequired = expensePart + state.liabilities;
      const netCoverNeeded = Math.max(0, totalRequired - state.assets);

      const tableRows = [];
      let annualExpenses = state.expenses * 12;
      for (let y = 1; y <= Math.min(workingYears, 10); y++) {
        tableRows.push({
          col1: `Year ${y}`,
          col2: annualExpenses * y,
          col3: state.liabilities,
          col4: state.assets,
          col5: Math.max(0, (annualExpenses * y) + state.liabilities - state.assets)
        });
      }

      return {
        results: [
          { label: 'Recommended Life Cover', value: netCoverNeeded, highlight: true, format: 'currency' },
          { label: 'Income Protection Cover (for working years)', value: expensePart, format: 'currency' },
          { label: 'Liability Protection Cover', value: state.liabilities, format: 'currency' },
          { label: 'Asset Offset Value', value: state.assets, format: 'currency' }
        ],
        chartData: {
          labels: ['Income Protection', 'Debt Coverage', 'Asset Offsets'],
          data: [expensePart, state.liabilities, state.assets]
        },
        tableHeader: ['Year', 'Income Replacement Need (₹)', 'Debt Need (₹)', 'Asset Values (₹)', 'Net Coverage Need (₹)'],
        tableRows: tableRows,
        tableFooterText: workingYears > 10 ? `... projection spans ${workingYears} working years ...` : null
      };
    }
  },

  'human-life-value': {
    title: 'Human Life Value Calculator',
    icon: '👨',
    subtitle: 'Calculate your economic HLV based on current income and future earnings',
    inputs: [
      { id: 'income', label: 'Annual Income', type: 'range', min: 100000, max: 20000000, step: 50000, default: 1200000, format: 'currency' },
      { id: 'personal', label: 'Personal Expenses (%)', type: 'range', min: 10, max: 90, step: 5, default: 30, format: 'percent' },
      { id: 'tenure', label: 'Years to Retirement', type: 'range', min: 5, max: 45, step: 1, default: 25, format: 'years' },
      { id: 'return', label: 'Expected Safe Return Rate (%)', type: 'range', min: 4, max: 15, step: 0.5, default: 8, format: 'percent' },
      { id: 'inflation', label: 'Expected Inflation Rate (%)', type: 'range', min: 1, max: 12, step: 0.5, default: 6, format: 'percent' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const netAnnualContribution = state.income * (1 - state.personal / 100);
      const r = (state.return - state.inflation) / 100;
      
      let hlv = 0;
      if (r === 0) {
        hlv = netAnnualContribution * state.tenure;
      } else {
        hlv = netAnnualContribution * ((1 - Math.pow(1 + r, -state.tenure)) / r);
      }

      const tableRows = [];
      let runningHlv = hlv;
      for (let y = 1; y <= Math.min(state.tenure, 10); y++) {
        const netContributionInflation = netAnnualContribution * Math.pow(1 + state.inflation / 100, y);
        tableRows.push({
          col1: `Year ${y}`,
          col2: state.income * Math.pow(1 + state.inflation / 100, y),
          col3: netContributionInflation,
          col4: runningHlv
        });
        runningHlv = Math.max(0, runningHlv - netContributionInflation);
      }

      return {
        results: [
          { label: 'Your Human Life Value (HLV)', value: hlv, highlight: true, format: 'currency' },
          { label: 'Annual Economic Surplus Created', value: netAnnualContribution, format: 'currency' },
          { label: 'Total Earnings Till Retirement', value: state.income * state.tenure, format: 'currency' }
        ],
        chartData: {
          labels: ['Human Life Value (Net Present Value)', 'Personal Expenditures', 'Inflation Gaps'],
          data: [hlv, state.income * (state.personal / 100) * state.tenure, Math.max(0, state.income * state.tenure - hlv)]
        },
        tableHeader: ['Year', 'Est. Gross Income (₹)', 'Est. Family Contribution (₹)', 'Remaining HLV Cover (₹)'],
        tableRows: tableRows
      };
    }
  },

  'term-insurance': {
    title: 'Term Insurance Calculator',
    icon: '⏳',
    subtitle: 'Estimate your term insurance policy premium rates',
    inputs: [
      { id: 'cover', label: 'Desired Sum Assured (Cover)', type: 'range', min: 1000000, max: 100000000, step: 1000000, default: 10000000, format: 'currency' },
      { id: 'term', label: 'Policy Tenure (Years)', type: 'range', min: 5, max: 40, step: 1, default: 30, format: 'years' },
      { id: 'age', label: 'Age', type: 'range', min: 18, max: 65, step: 1, default: 30 },
      { id: 'tobacco', label: 'Tobacco/Smoking Status', type: 'select', options: [
        { label: 'Non-Tobacco User', value: 1.0 },
        { label: 'Tobacco User', value: 1.6 }
      ], default: 1.0 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const baseRate = 0.00065; // ₹650 per 1,000,000 cover
      const ageMultiplier = 1 + Math.max(0, state.age - 18) * 0.045;
      const termMultiplier = 1 + Math.max(0, state.term - 10) * 0.015;
      const tobaccoFactor = parseFloat(state.tobacco);

      const annualPremium = (state.cover * baseRate) * ageMultiplier * termMultiplier * tobaccoFactor;
      const monthlyPremium = (annualPremium * 0.086); // monthly payment loading rate

      const tableRows = [];
      let totalPremiumsPaid = 0;
      for (let y = 5; y <= state.term; y += 5) {
        totalPremiumsPaid = annualPremium * y;
        tableRows.push({
          col1: `Year ${y}`,
          col2: annualPremium,
          col3: totalPremiumsPaid,
          col4: state.cover
        });
      }

      return {
        results: [
          { label: 'Est. Annual Premium', value: annualPremium, highlight: true, format: 'currency' },
          { label: 'Est. Monthly Premium', value: monthlyPremium, format: 'currency' },
          { label: 'Total Cover (Sum Assured)', value: state.cover, format: 'currency' }
        ],
        chartData: {
          labels: ['Est. Lifetime Premiums', 'Unused Cover Protection Buffer'],
          data: [annualPremium * state.term, state.cover]
        },
        tableHeader: ['Milestone', 'Annual Premium (₹)', 'Cumulative Premiums (₹)', 'Death Benefit Cover (₹)'],
        tableRows: tableRows
      };
    }
  },

  'risk-cover': {
    title: 'Risk Cover Calculator',
    icon: '🎯',
    subtitle: 'Determine financial gap and optimal coverage level',
    inputs: [
      { id: 'income', label: 'Annual Income', type: 'range', min: 100000, max: 20000000, step: 50000, default: 1000000, format: 'currency' },
      { id: 'liabilities', label: 'Active Debts & Liabilities', type: 'range', min: 0, max: 50000000, step: 100000, default: 1500000, format: 'currency' },
      { id: 'existingCover', label: 'Existing Life Insurance Cover', type: 'range', min: 0, max: 50000000, step: 100000, default: 1000000, format: 'currency' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const idealCover = (state.income * 12) + state.liabilities; // 12x annual income + liabilities
      const gap = Math.max(0, idealCover - state.existingCover);

      const tableRows = [
        { col1: 'Income Cover (12x Salary)', col2: state.income * 12, col3: state.existingCover * 0.7, col4: Math.max(0, state.income * 12 - state.existingCover * 0.7) },
        { col1: 'Outstanding Debts Coverage', col2: state.liabilities, col3: state.existingCover * 0.3, col4: Math.max(0, state.liabilities - state.existingCover * 0.3) }
      ];

      return {
        results: [
          { label: 'Recommended Risk Cover', value: idealCover, highlight: true, format: 'currency' },
          { label: 'Coverage Protection Gap', value: gap, format: 'currency' },
          { label: 'Current Coverage Level', value: state.existingCover, format: 'currency' }
        ],
        chartData: {
          labels: ['Current Coverage', 'Risk Coverage Gap'],
          data: [state.existingCover, gap]
        },
        tableHeader: ['Protection Layer', 'Target Need (₹)', 'Allocated Cover (₹)', 'Uncovered Gap (₹)'],
        tableRows: tableRows
      };
    }
  },

  'family-protection': {
    title: 'Family Protection Calculator',
    icon: '🏡',
    subtitle: 'Ensure your family has enough monthly income protection',
    inputs: [
      { id: 'familyExpenses', label: 'Monthly Household Expenses', type: 'range', min: 10000, max: 500000, step: 5000, default: 50000, format: 'currency' },
      { id: 'inflation', label: 'Expected Inflation Rate (%)', type: 'range', min: 2, max: 15, step: 0.5, default: 6, format: 'percent' },
      { id: 'supportYears', label: 'Years of Financial Support Needed', type: 'range', min: 5, max: 40, step: 1, default: 20, format: 'years' },
      { id: 'expectedReturn', label: 'Rate of return on safe assets (%)', type: 'range', min: 4, max: 15, step: 0.5, default: 7.5, format: 'percent' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const annualExpenses = state.familyExpenses * 12;
      const netRate = (state.expectedReturn - state.inflation) / 100;
      
      let corpusNeeded = 0;
      if (netRate === 0) {
        corpusNeeded = annualExpenses * state.supportYears;
      } else {
        corpusNeeded = annualExpenses * ((1 - Math.pow(1 + netRate, -state.supportYears)) / netRate);
      }

      const tableRows = [];
      let runningCorpus = corpusNeeded;
      for (let y = 1; y <= Math.min(state.supportYears, 10); y++) {
        const costThatYear = annualExpenses * Math.pow(1 + state.inflation / 100, y);
        tableRows.push({
          col1: `Year ${y}`,
          col2: costThatYear,
          col3: runningCorpus * (state.expectedReturn / 100),
          col4: Math.max(0, runningCorpus - costThatYear)
        });
        runningCorpus = Math.max(0, runningCorpus * (1 + state.expectedReturn / 100) - costThatYear);
      }

      return {
        results: [
          { label: 'Required Family Protection Corpus', value: corpusNeeded, highlight: true, format: 'currency' },
          { label: 'Year 1 Expense Outflow', value: annualExpenses, format: 'currency' },
          { label: 'Real Discount Rate (Inflation Adjusted)', value: netRate * 100, format: 'percent' }
        ],
        chartData: {
          labels: ['Required Protection Corpus', 'Total Projected Inflation Loss'],
          data: [corpusNeeded, Math.max(0, (annualExpenses * state.supportYears) - corpusNeeded)]
        },
        tableHeader: ['Year', 'Projected Annual Cost (₹)', 'Est. Investment Yield (₹)', 'Year-End Safety Corpus (₹)'],
        tableRows: tableRows
      };
    }
  },

  'child-education': {
    title: 'Child Education Planner',
    icon: '🎓',
    subtitle: 'Plan and secure funds for child\'s higher education costs',
    inputs: [
      { id: 'cost', label: 'Current Cost of Education (Admission + Living)', type: 'range', min: 100000, max: 10000000, step: 50000, default: 1500000, format: 'currency' },
      { id: 'years', label: 'Years left to start college', type: 'range', min: 1, max: 21, step: 1, default: 10, format: 'years' },
      { id: 'inflation', label: 'Education Inflation Rate (% p.a.)', type: 'range', min: 4, max: 15, step: 0.5, default: 9, format: 'percent' },
      { id: 'returns', label: 'Expected returns on investment (% p.a.)', type: 'range', min: 5, max: 20, step: 0.5, default: 12, format: 'percent' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const futureCost = state.cost * Math.pow(1 + state.inflation / 100, state.years);
      
      const r = state.returns / 12 / 100;
      const n = state.years * 12;
      
      let monthlySip = 0;
      if (r === 0) {
        monthlySip = futureCost / n;
      } else {
        monthlySip = futureCost / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      }

      const tableRows = [];
      for (let y = 1; y <= state.years; y++) {
        const collegeCostAtYear = state.cost * Math.pow(1 + state.inflation / 100, y);
        const investedAmount = monthlySip * 12 * y;
        const totalValue = (monthlySip * 12) * ((Math.pow(1 + state.returns/100, y) - 1) / (state.returns/100));
        tableRows.push({
          col1: `Year ${y}`,
          col2: collegeCostAtYear,
          col3: investedAmount,
          col4: totalValue
        });
      }

      return {
        results: [
          { label: 'Required Monthly SIP Saving', value: monthlySip, highlight: true, format: 'currency' },
          { label: 'Projected Inflation Cost of College', value: futureCost, format: 'currency' },
          { label: 'Current Base Price', value: state.cost, format: 'currency' }
        ],
        chartData: {
          labels: ['Total Principal Savings', 'Est. Compound Interest Gain'],
          data: [monthlySip * n, Math.max(0, futureCost - (monthlySip * n))]
        },
        tableHeader: ['Year', 'Adjusted College Cost (₹)', 'Cumulative Savings (₹)', 'Est. Portfolio Value (₹)'],
        tableRows: tableRows
      };
    }
  },

  'retirement-corpus': {
    title: 'Retirement Corpus Calculator',
    icon: '👴',
    subtitle: 'Determine the insurance corpus required for post-retirement safety',
    inputs: [
      { id: 'expenses', label: 'Current Monthly Expenses', type: 'range', min: 10000, max: 1000000, step: 5000, default: 60000, format: 'currency' },
      { id: 'yearsToRetire', label: 'Years to Retirement', type: 'range', min: 1, max: 45, step: 1, default: 25, format: 'years' },
      { id: 'expectancy', label: 'Expected Life Expectancy', type: 'range', min: 65, max: 100, step: 1, default: 85 },
      { id: 'inflation', label: 'Pre-Retirement Inflation Rate (%)', type: 'range', min: 2, max: 12, step: 0.5, default: 6, format: 'percent' },
      { id: 'returns', label: 'Post-Retirement Return Rate (%)', type: 'range', min: 4, max: 15, step: 0.5, default: 7.5, format: 'percent' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const postRetirementYears = Math.max(1, state.expectancy - 60);
      const inflatedMonthlyExpenses = state.expenses * Math.pow(1 + state.inflation / 100, state.yearsToRetire);
      const postRetirementInflation = 5.0; // Fixed retirement period inflation factor
      
      const realYield = (state.returns - postRetirementInflation) / 100;
      let corpusRequired = 0;
      const annualExpenditure = inflatedMonthlyExpenses * 12;

      if (realYield === 0) {
        corpusRequired = annualExpenditure * postRetirementYears;
      } else {
        corpusRequired = annualExpenditure * ((1 - Math.pow(1 + realYield, -postRetirementYears)) / realYield);
      }

      const tableRows = [];
      let runningRetCorpus = corpusRequired;
      for (let y = 1; y <= Math.min(postRetirementYears, 10); y++) {
        const annualOutflow = annualExpenditure * Math.pow(1 + postRetirementInflation/100, y);
        tableRows.push({
          col1: `Year ${y}`,
          col2: annualOutflow,
          col3: runningRetCorpus * (state.returns/100),
          col4: Math.max(0, runningRetCorpus - annualOutflow)
        });
        runningCorpus = Math.max(0, (runningRetCorpus * (1 + state.returns/100)) - annualOutflow);
      }

      return {
        results: [
          { label: 'Required Retirement Safety Corpus', value: corpusRequired, highlight: true, format: 'currency' },
          { label: 'Inflation-Adjusted Monthly Expense', value: inflatedMonthlyExpenses, format: 'currency' },
          { label: 'Pension Capital Yield (Post-Retirement)', value: state.returns, format: 'percent' }
        ],
        chartData: {
          labels: ['Protection Capital Requirement', 'Loss to Pre-Retirement Inflation'],
          data: [corpusRequired, Math.max(0, (state.expenses * 12 * state.yearsToRetire) - corpusRequired)]
        },
        tableHeader: ['Year', 'Adjusted Pension Payout (₹)', 'Est. Capital Yield (₹)', 'Remaining Corpus (₹)'],
        tableRows: tableRows
      };
    }
  },

  'income-replacement': {
    title: 'Income Replacement Calculator',
    icon: '💼',
    subtitle: 'Determine coverage to fully replace salary earnings',
    inputs: [
      { id: 'salary', label: 'Current Annual Salary', type: 'range', min: 100000, max: 20000000, step: 50000, default: 800000, format: 'currency' },
      { id: 'growth', label: 'Expected Salary Growth Rate (%)', type: 'range', min: 2, max: 20, step: 0.5, default: 8, format: 'percent' },
      { id: 'years', label: 'Years of Income Replacement Needed', type: 'range', min: 5, max: 40, step: 1, default: 15, format: 'years' },
      { id: 'expectedYield', label: 'Expected Investment Yield (%)', type: 'range', min: 3, max: 15, step: 0.5, default: 7.5, format: 'percent' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      let cumulativeEarnings = 0;
      let presentValueCover = 0;

      const tableRows = [];
      for (let y = 1; y <= state.years; y++) {
        const yearSalary = state.salary * Math.pow(1 + state.growth / 100, y - 1);
        cumulativeEarnings += yearSalary;
        
        // PV of this year salary replaced
        const pvSalary = yearSalary / Math.pow(1 + state.expectedYield / 100, y);
        presentValueCover += pvSalary;

        if (y <= 10) {
          tableRows.push({
            col1: `Year ${y}`,
            col2: yearSalary,
            col3: cumulativeEarnings,
            col4: presentValueCover
          });
        }
      }

      return {
        results: [
          { label: 'Required Life Coverage Sum', value: presentValueCover, highlight: true, format: 'currency' },
          { label: 'Cumulative Nominal Income Replaced', value: cumulativeEarnings, format: 'currency' },
          { label: 'Net Discount Saving Value', value: Math.max(0, cumulativeEarnings - presentValueCover), format: 'currency' }
        ],
        chartData: {
          labels: ['Discounted Present Value Needed', 'Interest Offset Savings'],
          data: [presentValueCover, Math.max(0, cumulativeEarnings - presentValueCover)]
        },
        tableHeader: ['Year', 'Projected Salary Replaced (₹)', 'Nominal Cumulative (₹)', 'Est. Coverage Fund Need (₹)'],
        tableRows: tableRows
      };
    }
  },

  'premium-affordability': {
    title: 'Premium Affordability Calculator',
    icon: '💵',
    subtitle: 'Determine premium limits based on financial buffers',
    inputs: [
      { id: 'income', label: 'Net Monthly Take-home Pay', type: 'range', min: 10000, max: 1000000, step: 5000, default: 80000, format: 'currency' },
      { id: 'bills', label: 'Mandatory Bills & Current EMIs', type: 'range', min: 0, max: 800000, step: 5000, default: 35000, format: 'currency' },
      { id: 'existingPremiums', label: 'Existing Active Insurance Premiums', type: 'range', min: 0, max: 100000, step: 1000, default: 3000, format: 'currency' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const surplus = Math.max(0, state.income - state.bills);
      const idealMonthlyPremium = state.income * 0.08; // 8% of monthly income rule
      const maxMonthlyPremium = surplus * 0.15; // 15% of surplus rule

      const recommendedIncrementalMonthly = Math.max(0, idealMonthlyPremium - state.existingPremiums);
      const annualAffordableTotal = maxMonthlyPremium * 12;

      const tableRows = [
        { col1: 'Conservative Plan (6% of Income)', col2: state.income * 0.06, col3: state.income * 0.06 * 12, col4: 'Lower Risk Cover, high affordability safety' },
        { col1: 'Balanced Protection (8% of Income)', col2: idealMonthlyPremium, col3: idealMonthlyPremium * 12, col4: 'Recommended coverage target' },
        { col1: 'Aggressive Safety Cover (12% of Income)', col2: state.income * 0.12, col3: state.income * 0.12 * 12, col4: 'Maximum protection coverage' }
      ];

      return {
        results: [
          { label: 'Recommended Addl. Monthly Premium', value: recommendedIncrementalMonthly, highlight: true, format: 'currency' },
          { label: 'Total Recommended Monthly Premiums', value: idealMonthlyPremium, format: 'currency' },
          { label: 'Disposable Income Surplus', value: surplus, format: 'currency' }
        ],
        chartData: {
          labels: ['Mandatory Cost & Debts', 'Recommended Premiums', 'Household Net Cash Savings'],
          data: [state.bills, idealMonthlyPremium, Math.max(0, surplus - idealMonthlyPremium)]
        },
        tableHeader: ['Premium Target Layer', 'Affordable Monthly (₹)', 'Affordable Annual (₹)', 'Coverage Trade-off Description'],
        tableRows: tableRows
      };
    }
  },

  'goal-protection': {
    title: 'Goal Protection Calculator',
    icon: '🏆',
    subtitle: 'Determine life cover to safeguard financial goals',
    inputs: [
      { id: 'target', label: 'Financial Goal Target Cost', type: 'range', min: 100000, max: 100000000, step: 100000, default: 5000000, format: 'currency' },
      { id: 'years', label: 'Years remaining to reach goal', type: 'range', min: 1, max: 30, step: 1, default: 10, format: 'years' },
      { id: 'saved', label: 'Accumulated Savings for this goal', type: 'range', min: 0, max: 50000000, step: 50000, default: 1000000, format: 'currency' },
      { id: 'inflation', label: 'Goal Cost Inflation Rate (%)', type: 'range', min: 2, max: 15, step: 0.5, default: 6, format: 'percent' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const inflationAdjustedGoal = state.target * Math.pow(1 + state.inflation / 100, state.years);
      const coverageGap = Math.max(0, inflationAdjustedGoal - state.saved);

      const tableRows = [];
      for (let y = 1; y <= state.years; y++) {
        const goalValueAtYear = state.target * Math.pow(1 + state.inflation / 100, y);
        const estSavingsValue = state.saved * Math.pow(1.08, y); // assume basic 8% portfolio compounding
        tableRows.push({
          col1: `Year ${y}`,
          col2: goalValueAtYear,
          col3: estSavingsValue,
          col4: Math.max(0, goalValueAtYear - estSavingsValue)
        });
      }

      return {
        results: [
          { label: 'Goal Protection Life Cover Needed', value: coverageGap, highlight: true, format: 'currency' },
          { label: 'Inflation Adjusted Goal Cost', value: inflationAdjustedGoal, format: 'currency' },
          { label: 'Total Protected Goal Gap', value: Math.max(0, inflationAdjustedGoal - state.saved), format: 'currency' }
        ],
        chartData: {
          labels: ['Current Savings Assets', 'Goal Coverage Protection Gap'],
          data: [state.saved, coverageGap]
        },
        tableHeader: ['Year', 'Adjusted Goal Target (₹)', 'Est. Portfolio Value (₹)', 'Coverage Protection Need (₹)'],
        tableRows: tableRows
      };
    }
  }
});
