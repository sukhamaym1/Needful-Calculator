'use strict';

window.NC = window.NC || {};
window.NC.CalculatorRouter = window.NC.CalculatorRouter || {};
window.NC.CalculatorRouter.configs = window.NC.CalculatorRouter.configs || {};

Object.assign(window.NC.CalculatorRouter.configs, {
  'income-tax-calculator': {
    title: 'Income Tax Calculator',
    icon: '🧾',
    subtitle: 'Compare Old vs New Tax Regime for FY 2024-25',
    inputs: [
      { id: 'income', label: 'Gross Annual Income', type: 'range', min: 0, max: 10000000, step: 50000, default: 1200000, format: 'currency' },
      { id: 'deductions', label: 'Other Deductions (Sec 80C etc.)', type: 'range', min: 0, max: 500000, step: 5000, default: 150000, format: 'currency' }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const gross = parseFloat(state.income) || 0;
      const deductions = parseFloat(state.deductions) || 0;

      if (gross < 0 || deductions < 0) {
        return { error: 'Inputs cannot be negative.' };
      }
      if (deductions > gross) {
        return { error: 'Deductions cannot exceed Gross Annual Income.' };
      }

      // NEW REGIME CALCULATIONS (FY 2024-25 / AY 2025-26 revised slabs)
      const stdDeductionNew = gross > 75000 ? 75000 : gross;
      const taxableNew = Math.max(0, gross - stdDeductionNew);
      let taxNew = 0;

      if (taxableNew <= 700000) {
        taxNew = 0; // Rebate under Section 87A covers tax completely up to 7 Lakhs (taxable)
      } else {
        let remaining = taxableNew;
        if (remaining > 1500000) {
          taxNew += (remaining - 1500000) * 0.30;
          remaining = 1500000;
        }
        if (remaining > 1200000) {
          taxNew += (remaining - 1200000) * 0.20;
          remaining = 1200000;
        }
        if (remaining > 900000) {
          taxNew += (remaining - 900000) * 0.15;
          remaining = 900000;
        }
        if (remaining > 600000) {
          taxNew += (remaining - 600000) * 0.10;
          remaining = 600000;
        }
        if (remaining > 300000) {
          taxNew += (remaining - 300000) * 0.05;
        }
      }
      const cessNew = taxNew * 0.04;
      const totalNew = taxNew + cessNew;

      // OLD REGIME CALCULATIONS
      const stdDeductionOld = gross > 50000 ? 50000 : gross;
      const taxableOld = Math.max(0, gross - stdDeductionOld - deductions);
      let taxOld = 0;

      if (taxableOld <= 500000) {
        taxOld = 0; // Rebate u/s 87A covers tax up to 5 Lakhs
      } else {
        let remaining = taxableOld;
        if (remaining > 1000000) {
          taxOld += (remaining - 1000000) * 0.30;
          remaining = 1000000;
        }
        if (remaining > 500000) {
          taxOld += (remaining - 500000) * 0.20;
          remaining = 500000;
        }
        if (remaining > 250000) {
          taxOld += (remaining - 250000) * 0.05;
        }
      }
      const cessOld = taxOld * 0.04;
      const totalOld = taxOld + cessOld;

      const bestRegime = totalNew < totalOld ? 'New Regime' : 'Old Regime';
      const savings = Math.abs(totalOld - totalNew);

      return {
        results: [
          { label: 'Tax under New Regime', value: totalNew, highlight: totalNew < totalOld, format: 'currency' },
          { label: 'Tax under Old Regime', value: totalOld, highlight: totalOld <= totalNew, format: 'currency' },
          { label: 'Recommended Option', value: bestRegime + (savings > 0 ? ` (Saves ₹${Math.round(savings).toLocaleString('en-IN')})` : ' (Equal Tax)'), highlight: true, raw: true }
        ]
      };
    }
  },

  'tds-calculator': {
    title: 'TDS Calculator',
    icon: '🧾',
    subtitle: 'Calculate Tax Deducted at Source for different payment sections',
    inputs: [
      { id: 'amount', label: 'Payment / Transaction Amount', type: 'number', default: 100000 },
      {
        id: 'section',
        label: 'Select Payment Category / Section',
        type: 'select',
        options: [
          { label: 'Interest on Securities (Sec 193) - 10%', value: '193_10' },
          { label: 'Dividend Income (Sec 194) - 10%', value: '194_10' },
          { label: 'Contractors: Individual/HUF (Sec 194C) - 1%', value: '194C_1' },
          { label: 'Contractors: Others/Companies (Sec 194C) - 2%', value: '194C_2' },
          { label: 'Commission or Brokerage (Sec 194H) - 5%', value: '194H_5' },
          { label: 'Rent on Land & Building (Sec 194I) - 10%', value: '194I_10' },
          { label: 'Rent on Plant & Machinery (Sec 194I) - 2%', value: '194I_2' },
          { label: 'Professional / Technical Fees (Sec 194J) - 10%', value: '194J_10' },
          { label: 'Transfer of Immovable Property (Sec 194IA) - 1%', value: '194IA_1' }
        ],
        default: '194J_10'
      },
      {
        id: 'pan',
        label: 'Do you have a valid PAN?',
        type: 'select',
        options: [
          { label: 'Yes (Standard Rate)', value: 'yes' },
          { label: 'No (Higher rate u/s 206AA - typically 20%)', value: 'no' }
        ],
        default: 'yes'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const amt = parseFloat(state.amount) || 0;
      if (amt < 0) return { error: 'Amount cannot be negative.' };

      const sectionParts = state.section.split('_');
      let baseRate = parseFloat(sectionParts[1]) || 0;
      const isPan = state.pan === 'yes';

      let effectiveRate = baseRate;
      if (!isPan) {
        effectiveRate = 20.0; // Section 206AA specifies 20% if no PAN is supplied
      }

      const tdsAmount = amt * (effectiveRate / 100);
      const netPayable = amt - tdsAmount;

      return {
        results: [
          { label: 'Effective TDS Rate', value: effectiveRate + '%', highlight: true, raw: true },
          { label: 'TDS Deducted Amount', value: tdsAmount, format: 'currency' },
          { label: 'Net Payable Amount', value: netPayable, format: 'currency' }
        ]
      };
    }
  },

  'tax-saving-calculator': {
    title: 'Tax Saving Calculator',
    icon: '💰',
    subtitle: 'Determine potential tax savings under the Old Regime',
    inputs: [
      { id: 'income', label: 'Gross Annual Income', type: 'number', default: 1000000 },
      { id: 'existing80C', label: 'Existing Sec 80C Investments', type: 'number', default: 50000 },
      { id: 'existing80D', label: 'Existing Sec 80D Insurance', type: 'number', default: 10000 },
      { id: 'additional80C', label: 'Planned Additional Sec 80C', type: 'number', default: 100000 },
      { id: 'additional80D', label: 'Planned Additional Sec 80D', type: 'number', default: 15000 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const gross = parseFloat(state.income) || 0;
      const extC = parseFloat(state.existing80C) || 0;
      const extD = parseFloat(state.existing80D) || 0;
      const addC = parseFloat(state.additional80C) || 0;
      const addD = parseFloat(state.additional80D) || 0;

      if (gross < 0 || extC < 0 || extD < 0 || addC < 0 || addD < 0) {
        return { error: 'Inputs cannot be negative.' };
      }

      const stdDeduction = gross > 50000 ? 50000 : gross;

      // Helper to compute tax under Old Regime
      const computeOldTax = (deductions80C, deductions80D) => {
        const cDeduction = Math.min(150000, deductions80C);
        const dDeduction = Math.min(75000, deductions80D);
        const taxable = Math.max(0, gross - stdDeduction - cDeduction - dDeduction);

        let tax = 0;
        if (taxable <= 500000) {
          tax = 0;
        } else {
          let rem = taxable;
          if (rem > 1000000) {
            tax += (rem - 1000000) * 0.30;
            rem = 1000000;
          }
          if (rem > 500000) {
            tax += (rem - 500000) * 0.20;
            rem = 500000;
          }
          if (rem > 250000) {
            tax += (rem - 250000) * 0.05;
          }
        }
        return tax + (tax * 0.04);
      };

      const taxBefore = computeOldTax(extC, extD);
      const taxAfter = computeOldTax(extC + addC, extD + addD);
      const savings = Math.max(0, taxBefore - taxAfter);

      return {
        results: [
          { label: 'Tax Before Additional Investments', value: taxBefore, format: 'currency' },
          { label: 'Tax After Additional Investments', value: taxAfter, format: 'currency' },
          { label: 'Total Tax Saved', value: savings, highlight: true, format: 'currency' }
        ]
      };
    }
  },

  'hra-calculator': {
    title: 'HRA Calculator',
    icon: '🏠',
    subtitle: 'Calculate your House Rent Allowance tax exemption u/s 10(13A)',
    inputs: [
      { id: 'basic', label: 'Basic Salary', type: 'number', default: 50000 },
      { id: 'da', label: 'Dearness Allowance (DA)', type: 'number', default: 5000 },
      { id: 'hra', label: 'HRA Received', type: 'number', default: 22000 },
      { id: 'rent', label: 'Actual Rent Paid', type: 'number', default: 18000 },
      {
        id: 'metro',
        label: 'Do you live in a Metro City?',
        type: 'select',
        options: [
          { label: 'Yes (Delhi, Mumbai, Kolkata, Chennai) - 50% Slab', value: 'yes' },
          { label: 'No (Other Cities) - 40% Slab', value: 'no' }
        ],
        default: 'yes'
      },
      {
        id: 'freq',
        label: 'Income / Rent Period',
        type: 'select',
        options: [
          { label: 'Monthly', value: 'monthly' },
          { label: 'Annual', value: 'annual' }
        ],
        default: 'monthly'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const basic = parseFloat(state.basic) || 0;
      const da = parseFloat(state.da) || 0;
      const hra = parseFloat(state.hra) || 0;
      const rent = parseFloat(state.rent) || 0;

      if (basic < 0 || da < 0 || hra < 0 || rent < 0) {
        return { error: 'Salary and Rent inputs must be positive.' };
      }

      const mult = state.freq === 'monthly' ? 12 : 1;
      const annualBasic = basic * mult;
      const annualDa = da * mult;
      const annualHra = hra * mult;
      const annualRent = rent * mult;

      const salaryForHra = annualBasic + annualDa;
      const metroFactor = state.metro === 'yes' ? 0.50 : 0.40;

      const cond1 = annualHra;
      const cond2 = Math.max(0, annualRent - (0.10 * salaryForHra));
      const cond3 = salaryForHra * metroFactor;

      const annualExempt = Math.min(cond1, cond2, cond3);
      const annualTaxable = Math.max(0, annualHra - annualExempt);

      return {
        results: [
          { label: `Exempt HRA (${state.freq === 'monthly' ? 'Monthly' : 'Annual'})`, value: annualExempt / mult, highlight: true, format: 'currency' },
          { label: `Taxable HRA (${state.freq === 'monthly' ? 'Monthly' : 'Annual'})`, value: annualTaxable / mult, format: 'currency' },
          { label: 'Annual Total Exempt HRA', value: annualExempt, format: 'currency' }
        ]
      };
    }
  },

  'gratuity-calculator': {
    title: 'Gratuity Calculator',
    icon: '👔',
    subtitle: 'Estimate retirement gratuity amount u/s 10(10)',
    inputs: [
      { id: 'salary', label: 'Last Drawn Basic Salary + DA (Monthly)', type: 'number', default: 80000 },
      { id: 'years', label: 'Completed Years of Service', type: 'number', default: 8 },
      {
        id: 'covered',
        label: 'Covered under Payment of Gratuity Act 1972?',
        type: 'select',
        options: [
          { label: 'Yes (15/26 Formula)', value: 'yes' },
          { label: 'No (15/30 Formula)', value: 'no' }
        ],
        default: 'yes'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const salary = parseFloat(state.salary) || 0;
      const years = parseInt(state.years) || 0;

      if (salary < 0 || years < 0) return { error: 'Salary and Years must be positive.' };
      if (years === 0) return { error: 'Service years must be at least 1.' };

      let gratuity = 0;
      if (state.covered === 'yes') {
        gratuity = (15 * salary * years) / 26;
      } else {
        gratuity = (15 * salary * years) / 30;
      }

      const exemptLimit = 2000000; // Statutory max tax-free limit is ₹20 Lakhs
      const taxablePortion = Math.max(0, gratuity - exemptLimit);

      return {
        results: [
          { label: 'Total Estimated Gratuity', value: gratuity, highlight: true, format: 'currency' },
          { label: 'Tax-Free Exempt Portion (Max ₹20L)', value: Math.min(gratuity, exemptLimit), format: 'currency' },
          { label: 'Taxable Gratuity Portion', value: taxablePortion, format: 'currency' }
        ]
      };
    }
  },

  'professional-tax-calculator': {
    title: 'Professional Tax Calculator',
    icon: '👔',
    subtitle: 'Estimate monthly professional tax obligations across Indian states',
    inputs: [
      {
        id: 'state',
        label: 'Select State',
        type: 'select',
        options: [
          { label: 'Maharashtra', value: 'maharashtra' },
          { label: 'Karnataka', value: 'karnataka' },
          { label: 'West Bengal', value: 'west_bengal' },
          { label: 'Tamil Nadu', value: 'tamil_nadu' },
          { label: 'Telangana', value: 'telangana' },
          { label: 'Gujarat', value: 'gujarat' }
        ],
        default: 'maharashtra'
      },
      { id: 'income', label: 'Gross Monthly Income', type: 'number', default: 35000 },
      {
        id: 'gender',
        label: 'Gender (Applicable for Maharashtra only)',
        type: 'select',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ],
        default: 'male'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const income = parseFloat(state.income) || 0;
      if (income < 0) return { error: 'Income cannot be negative.' };

      let monthlyPT = 0;
      let note = '';

      switch (state.state) {
        case 'maharashtra':
          if (state.gender === 'female') {
            if (income <= 25000) {
              monthlyPT = 0;
              note = 'Females with salary up to ₹25,000 are exempt.';
            } else {
              monthlyPT = 200;
            }
          } else {
            if (income <= 7500) {
              monthlyPT = 0;
            } else if (income <= 10000) {
              monthlyPT = 175;
            } else {
              monthlyPT = 200;
              note = 'Note: ₹300 is charged in the month of February.';
            }
          }
          break;
        case 'karnataka':
          if (income <= 15000) {
            monthlyPT = 0;
          } else {
            monthlyPT = 200;
          }
          break;
        case 'west_bengal':
          if (income <= 10000) {
            monthlyPT = 0;
          } else if (income <= 15000) {
            monthlyPT = 110;
          } else if (income <= 25000) {
            monthlyPT = 130;
          } else if (income <= 40000) {
            monthlyPT = 150;
          } else {
            monthlyPT = 200;
          }
          break;
        case 'tamil_nadu':
          if (income <= 3500) {
            monthlyPT = 0;
          } else if (income <= 5000) {
            monthlyPT = 22.5;
          } else if (income <= 7500) {
            monthlyPT = 52.5;
          } else if (income <= 10000) {
            monthlyPT = 115;
          } else if (income <= 12500) {
            monthlyPT = 170.83;
          } else {
            monthlyPT = 208.33;
          }
          note = 'Calculated as monthly equivalent of half-yearly rates.';
          break;
        case 'telangana':
          if (income <= 15000) {
            monthlyPT = 0;
          } else if (income <= 20000) {
            monthlyPT = 150;
          } else {
            monthlyPT = 200;
          }
          break;
        case 'gujarat':
          if (income <= 6000) {
            monthlyPT = 0;
          } else if (income <= 9000) {
            monthlyPT = 80;
          } else if (income <= 12000) {
            monthlyPT = 150;
          } else {
            monthlyPT = 200;
          }
          break;
        default:
          monthlyPT = 200;
      }

      let annualPT = monthlyPT * 12;
      if (state.state === 'maharashtra' && monthlyPT === 200) {
        annualPT = 2500;
      }

      return {
        results: [
          { label: 'Monthly Professional Tax', value: monthlyPT, highlight: true, format: 'currency' },
          { label: 'Annual Total Liability', value: annualPT, format: 'currency' },
          { label: 'Applicable Clause / Info', value: note || 'Standard state schedule applies.', raw: true }
        ]
      };
    }
  },

  'gst-calculator': {
    title: 'GST Calculator',
    icon: '🧮',
    subtitle: 'Calculate GST inclusive and exclusive tax amounts',
    inputs: [
      { id: 'amount', label: 'Amount (₹)', type: 'number', default: 10000 },
      {
        id: 'rate',
        label: 'GST Rate',
        type: 'select',
        options: [
          { label: '5%', value: 5 },
          { label: '12%', value: 12 },
          { label: '18%', value: 18 },
          { label: '28%', value: 28 }
        ],
        default: 18
      },
      {
        id: 'type',
        label: 'Calculation Type',
        type: 'select',
        options: [
          { label: 'Add GST (Exclusive)', value: 'add' },
          { label: 'Remove GST (Inclusive)', value: 'remove' }
        ],
        default: 'add'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const amt = parseFloat(state.amount) || 0;
      const rate = parseFloat(state.rate) || 18;
      const type = state.type;

      if (amt < 0) return { error: 'Amount cannot be negative.' };

      let netAmount, gstAmount, totalAmount;
      if (type === 'add') {
        netAmount = amt;
        gstAmount = amt * (rate / 100);
        totalAmount = amt + gstAmount;
      } else {
        totalAmount = amt;
        netAmount = amt / (1 + rate / 100);
        gstAmount = amt - netAmount;
      }

      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;

      return {
        results: [
          { label: 'Total Amount (Gross)', value: totalAmount, highlight: true, format: 'currency' },
          { label: 'Net Amount (Pre-Tax)', value: netAmount, format: 'currency' },
          { label: 'CGST (Central Tax)', value: cgst, format: 'currency' },
          { label: 'SGST (State Tax)', value: sgst, format: 'currency' },
          { label: 'Total Tax Amount (GST)', value: gstAmount, format: 'currency' }
        ]
      };
    }
  },

  'reverse-gst-calculator': {
    title: 'Reverse GST Calculator',
    icon: '🔄',
    subtitle: 'Back-calculate pre-tax price from GST-inclusive amount',
    inputs: [
      { id: 'amount', label: 'GST Inclusive Amount (₹)', type: 'number', default: 11800 },
      {
        id: 'rate',
        label: 'GST Rate',
        type: 'select',
        options: [
          { label: '5%', value: 5 },
          { label: '12%', value: 12 },
          { label: '18%', value: 18 },
          { label: '28%', value: 28 }
        ],
        default: 18
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const amt = parseFloat(state.amount) || 0;
      const rate = parseFloat(state.rate) || 18;

      if (amt < 0) return { error: 'Amount cannot be negative.' };

      const netAmount = amt / (1 + rate / 100);
      const gstAmount = amt - netAmount;
      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;

      return {
        results: [
          { label: 'Net Original Price', value: netAmount, highlight: true, format: 'currency' },
          { label: 'Total GST Subtracted', value: gstAmount, format: 'currency' },
          { label: 'CGST Portion (Half)', value: cgst, format: 'currency' },
          { label: 'SGST Portion (Half)', value: sgst, format: 'currency' }
        ]
      };
    }
  },

  'section-80c-calculator': {
    title: 'Section 80C Calculator',
    icon: '🛡️',
    subtitle: 'Estimate eligible deductions u/s 80C (Limit ₹1.5L)',
    inputs: [
      { id: 'epf', label: 'Employee Provident Fund (EPF)', type: 'number', default: 24000 },
      { id: 'ppf', label: 'Public Provident Fund (PPF)', type: 'number', default: 50000 },
      { id: 'elss', label: 'ELSS Mutual Funds', type: 'number', default: 30000 },
      { id: 'lic', label: 'Life Insurance Premiums', type: 'number', default: 15000 },
      { id: 'homeloan', label: 'Home Loan Principal Repayment', type: 'number', default: 20000 },
      { id: 'tuition', label: 'Children\'s Tuition Fees (Max 2 kids)', type: 'number', default: 12000 },
      { id: 'nsc', label: 'National Savings Certificates (NSC)', type: 'number', default: 0 },
      { id: 'other', label: 'SSY / Tax Saving FD / Other eligible', type: 'number', default: 0 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const epf = parseFloat(state.epf) || 0;
      const ppf = parseFloat(state.ppf) || 0;
      const elss = parseFloat(state.elss) || 0;
      const lic = parseFloat(state.lic) || 0;
      const homeloan = parseFloat(state.homeloan) || 0;
      const tuition = parseFloat(state.tuition) || 0;
      const nsc = parseFloat(state.nsc) || 0;
      const other = parseFloat(state.other) || 0;

      if (epf < 0 || ppf < 0 || elss < 0 || lic < 0 || homeloan < 0 || tuition < 0 || nsc < 0 || other < 0) {
        return { error: 'Investments cannot be negative.' };
      }

      const totalInvested = epf + ppf + elss + lic + homeloan + tuition + nsc + other;
      const eligibleLimit = 150000;
      const finalExemption = Math.min(eligibleLimit, totalInvested);
      const nonEligible = Math.max(0, totalInvested - eligibleLimit);

      return {
        results: [
          { label: 'Total Invested Amount', value: totalInvested, format: 'currency' },
          { label: 'Eligible Deduction (u/s 80C)', value: finalExemption, highlight: true, format: 'currency' },
          { label: 'Excess Amount (Non-Deductible)', value: nonEligible, format: 'currency' }
        ]
      };
    }
  },

  'section-80d-calculator': {
    title: 'Section 80D Calculator',
    icon: '🏥',
    subtitle: 'Calculate health insurance deductions u/s 80D',
    inputs: [
      { id: 'premiumSelf', label: 'Premium for Self/Spouse/Children', type: 'number', default: 18000 },
      { id: 'checkupSelf', label: 'Preventive Health Checkup (Self)', type: 'number', default: 3000 },
      { id: 'premiumParents', label: 'Premium for Parents', type: 'number', default: 35000 },
      { id: 'checkupParents', label: 'Preventive Health Checkup (Parents)', type: 'number', default: 2000 },
      {
        id: 'seniorParents',
        label: 'Are parents senior citizens (Age 60+)?',
        type: 'select',
        options: [
          { label: 'Yes (Limit ₹50,000)', value: 'yes' },
          { label: 'No (Limit ₹25,000)', value: 'no' }
        ],
        default: 'yes'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const pSelf = parseFloat(state.premiumSelf) || 0;
      const cSelf = parseFloat(state.checkupSelf) || 0;
      const pParents = parseFloat(state.premiumParents) || 0;
      const cParents = parseFloat(state.checkupParents) || 0;

      if (pSelf < 0 || cSelf < 0 || pParents < 0 || cParents < 0) {
        return { error: 'Premiums and checkups cannot be negative.' };
      }

      const maxCombinedCheckup = 5000;
      const eligibleCheckupSelf = Math.min(maxCombinedCheckup, cSelf);
      const remainingCheckupQuota = Math.max(0, maxCombinedCheckup - eligibleCheckupSelf);
      const eligibleCheckupParents = Math.min(remainingCheckupQuota, cParents);

      const limitSelf = 25000;
      const totalSelf = pSelf + eligibleCheckupSelf;
      const deductionSelf = Math.min(limitSelf, totalSelf);

      const limitParents = state.seniorParents === 'yes' ? 50000 : 25000;
      const totalParents = pParents + eligibleCheckupParents;
      const deductionParents = Math.min(limitParents, totalParents);

      const totalDeduction = deductionSelf + deductionParents;

      return {
        results: [
          { label: 'Self / Family Eligible Deduction', value: deductionSelf, format: 'currency' },
          { label: 'Parents Eligible Deduction', value: deductionParents, format: 'currency' },
          { label: 'Total Section 80D Deduction', value: totalDeduction, highlight: true, format: 'currency' }
        ]
      };
    }
  },

  'capital-gain-calculator': {
    title: 'Capital Gain Calculator',
    icon: '📈',
    subtitle: 'Compute capital gains and tax liabilities u/s 111A and 112A',
    inputs: [
      {
        id: 'asset',
        label: 'Asset Class / Category',
        type: 'select',
        options: [
          { label: 'Equity Mutual Funds / Listed Shares', value: 'equity' },
          { label: 'Real Estate / Property', value: 'real_estate' }
        ],
        default: 'equity'
      },
      { id: 'buyPrice', label: 'Purchase Price (Cost of Acquisition)', type: 'number', default: 200000 },
      { id: 'sellPrice', label: 'Selling Price (Full Consideration)', type: 'number', default: 350000 },
      { id: 'buyYear', label: 'Year of Purchase (YYYY)', type: 'number', default: 2023 },
      { id: 'sellYear', label: 'Year of Sale (YYYY)', type: 'number', default: 2025 },
      { id: 'expenses', label: 'Transfer / Sale Expenses', type: 'number', default: 5000 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const buyPrice = parseFloat(state.buyPrice) || 0;
      const sellPrice = parseFloat(state.sellPrice) || 0;
      const buyYear = parseInt(state.buyYear) || 0;
      const sellYear = parseInt(state.sellYear) || 0;
      const expenses = parseFloat(state.expenses) || 0;

      if (buyPrice < 0 || sellPrice < 0 || expenses < 0) {
        return { error: 'Financial values must be non-negative.' };
      }
      if (buyYear < 1900 || sellYear < 1900) {
        return { error: 'Please enter valid 4-digit years.' };
      }
      if (buyYear > sellYear) {
        return { error: 'Purchase Year cannot be after Year of Sale.' };
      }

      const holdPeriodYears = sellYear - buyYear;
      const netGain = sellPrice - buyPrice - expenses;

      let gainType = '';
      let taxRate = 0;
      let estimatedTax = 0;
      let detailStr = '';

      if (state.asset === 'equity') {
        const isLongTerm = holdPeriodYears >= 1;
        if (isLongTerm) {
          gainType = 'Long-Term Capital Gain (LTCG)';
          taxRate = 12.5; 
          const exemption = 125000; 
          const taxableGain = Math.max(0, netGain - exemption);
          estimatedTax = taxableGain * (taxRate / 100);
          detailStr = `Taxed at 12.5% with ₹1.25 Lakh threshold exemption.`;
        } else {
          gainType = 'Short-Term Capital Gain (STCG)';
          taxRate = 20.0; 
          estimatedTax = Math.max(0, netGain) * (taxRate / 100);
          detailStr = `Taxed at flat 20% for listed holdings u/s 111A.`;
        }
      } else {
        const isLongTerm = holdPeriodYears >= 2;
        if (isLongTerm) {
          gainType = 'Long-Term Capital Gain (LTCG)';
          taxRate = 12.5; 
          estimatedTax = Math.max(0, netGain) * (taxRate / 100);
          detailStr = `Taxed at 12.5% without indexation (Budget 2024 amendment).`;
        } else {
          gainType = 'Short-Term Capital Gain (STCG)';
          estimatedTax = 0; 
          detailStr = `Taxed at slab rates corresponding to individual income tax brackets.`;
        }
      }

      const totalTax = estimatedTax + (estimatedTax * 0.04);

      return {
        results: [
          { label: 'Holding Span (Est. Years)', value: holdPeriodYears + (holdPeriodYears === 1 ? ' Year' : ' Years'), raw: true },
          { label: 'Gain Classification', value: gainType, raw: true },
          { label: 'Net Capital Gains Value', value: netGain, highlight: true, format: 'currency' },
          { label: 'Estimated Tax Liability (with Cess)', value: totalTax, format: 'currency' },
          { label: 'Applicable Surcharge/Indexation Info', value: detailStr, raw: true }
        ]
      };
    }
  }
});
