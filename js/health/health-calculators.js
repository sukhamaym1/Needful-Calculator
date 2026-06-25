'use strict';

window.NC = window.NC || {};
window.NC.CalculatorRouter = window.NC.CalculatorRouter || {};
window.NC.CalculatorRouter.configs = window.NC.CalculatorRouter.configs || {};

Object.assign(window.NC.CalculatorRouter.configs, {
  'bmi-calculator': {
    title: 'BMI Calculator',
    icon: '⚖️',
    subtitle: 'Calculate Body Mass Index and healthy weight range',
    inputs: [
      { id: 'weight', label: 'Weight (kg)', type: 'range', min: 10, max: 250, step: 1, default: 70, format: 'kg' },
      { id: 'height', label: 'Height (cm)', type: 'range', min: 50, max: 250, step: 1, default: 170, format: 'cm' },
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }], default: 'male' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const w = state.weight;
      const h = state.height / 100;
      const bmi = w / (h * h);

      let cat = '';
      let color = '#10B981';
      if (bmi < 18.5) { cat = 'Underweight'; color = '#3B82F6'; }
      else if (bmi < 24.9) { cat = 'Normal Weight'; color = '#10B981'; }
      else if (bmi < 29.9) { cat = 'Overweight'; color = '#F59E0B'; }
      else { cat = 'Obese'; color = '#EF4444'; }

      const minIdeal = 18.5 * h * h;
      const maxIdeal = 24.9 * h * h;

      const tableRows = [
        { col1: 'Underweight', col2: '< 18.5', col3: `< ${minIdeal.toFixed(1)} kg`, col4: 'Risk of nutrient deficiency' },
        { col1: 'Normal Weight', col2: '18.5 - 24.9', col3: `${minIdeal.toFixed(1)} - ${maxIdeal.toFixed(1)} kg`, col4: 'Optimal health range' },
        { col1: 'Overweight', col2: '25.0 - 29.9', col3: `${maxIdeal.toFixed(1)} - ${(29.9 * h * h).toFixed(1)} kg`, col4: 'Increased risk of chronic issues' },
        { col1: 'Obese', col2: '≥ 30.0', col3: `> ${(29.9 * h * h).toFixed(1)} kg`, col4: 'High risk of metabolic syndrome' }
      ];

      return {
        results: [
          { label: 'Your BMI Score', value: bmi.toFixed(1), highlight: true, raw: true },
          { label: 'Weight Category', value: cat, raw: true },
          { label: 'Healthy Weight Range', value: `${minIdeal.toFixed(1)} - ${maxIdeal.toFixed(1)} kg`, raw: true }
        ],
        chartData: {
          labels: ['Underweight limit', 'Normal limit', 'Your Weight', 'Overweight limit'],
          data: [Math.round(minIdeal), Math.round(maxIdeal), Math.round(w), Math.round(29.9 * h * h)]
        },
        tableHeader: ['Category', 'BMI Range', 'Weight Target', 'Health Note'],
        tableRows: tableRows
      };
    }
  },

  'bmr-calculator': {
    title: 'BMR Calculator',
    icon: '🔥',
    subtitle: 'Calculate your Basal Metabolic Rate (calories burned at rest)',
    inputs: [
      { id: 'age', label: 'Age (years)', type: 'range', min: 10, max: 100, step: 1, default: 25 },
      { id: 'weight', label: 'Weight (kg)', type: 'range', min: 10, max: 250, step: 1, default: 70, format: 'kg' },
      { id: 'height', label: 'Height (cm)', type: 'range', min: 50, max: 250, step: 1, default: 170, format: 'cm' },
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }], default: 'male' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const age = state.age;
      const w = state.weight;
      const h = state.height;
      const gender = state.gender;

      // Mifflin-St Jeor
      let bmrMifflin = 0;
      if (gender === 'male') {
        bmrMifflin = (10 * w) + (6.25 * h) - (5 * age) + 5;
      } else {
        bmrMifflin = (10 * w) + (6.25 * h) - (5 * age) - 161;
      }

      // Revised Harris-Benedict
      let bmrHB = 0;
      if (gender === 'male') {
        bmrHB = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * age);
      } else {
        bmrHB = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * age);
      }

      const tableRows = [
        { col1: 'Mifflin-St Jeor (Standard)', col2: Math.round(bmrMifflin), col3: 'Recommended default standard' },
        { col1: 'Harris-Benedict (Original)', col2: Math.round(bmrHB), col3: 'Tends to overestimate slightly' },
        { col1: 'Katch-McArdle (Est.)', col2: Math.round(370 + 21.6 * (w * 0.85)), col3: 'Assumes standard 15% body fat level' }
      ];

      return {
        results: [
          { label: 'Basal Metabolic Rate (BMR)', value: `${Math.round(bmrMifflin)} kcal/day`, highlight: true, raw: true },
          { label: 'Annual Rest Expenditure', value: Math.round(bmrMifflin * 365), format: 'currency' },
          { label: 'Hourly Metabolism Rate', value: `${Math.round(bmrMifflin / 24)} kcal/hour`, raw: true }
        ],
        chartData: {
          labels: ['Mifflin-St Jeor', 'Harris-Benedict', 'Katch-McArdle (Est)'],
          data: [Math.round(bmrMifflin), Math.round(bmrHB), Math.round(370 + 21.6 * (w * 0.85))]
        },
        tableHeader: ['Formula Used', 'BMR Budget (kcal)', 'Note'],
        tableRows: tableRows
      };
    }
  },

  'tdee-calculator': {
    title: 'TDEE Calculator',
    icon: '⚡',
    subtitle: 'Determine your Total Daily Energy Expenditure based on activity',
    inputs: [
      { id: 'age', label: 'Age (years)', type: 'range', min: 10, max: 100, step: 1, default: 25 },
      { id: 'weight', label: 'Weight (kg)', type: 'range', min: 10, max: 250, step: 1, default: 70, format: 'kg' },
      { id: 'height', label: 'Height (cm)', type: 'range', min: 50, max: 250, step: 1, default: 170, format: 'cm' },
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }], default: 'male' },
      { id: 'activity', label: 'Activity Level', type: 'select', options: [
        { label: 'Sedentary (desk work, no exercise)', value: 1.2 },
        { label: 'Lightly Active (exercise 1-3 days/wk)', value: 1.375 },
        { label: 'Moderately Active (exercise 3-5 days/wk)', value: 1.55 },
        { label: 'Very Active (heavy exercise 6-7 days/wk)', value: 1.725 },
        { label: 'Athlete/Extreme (twice daily heavy work)', value: 1.9 }
      ], default: 1.375 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const age = state.age;
      const w = state.weight;
      const h = state.height;
      const gender = state.gender;
      const mult = parseFloat(state.activity);

      let bmr = 0;
      if (gender === 'male') {
        bmr = (10 * w) + (6.25 * h) - (5 * age) + 5;
      } else {
        bmr = (10 * w) + (6.25 * h) - (5 * age) - 161;
      }

      const tdee = bmr * mult;

      const tableRows = [
        { col1: 'Sedentary (1.2x)', col2: Math.round(bmr * 1.2), col3: Math.round(bmr * 1.2 - 500), col4: Math.round(bmr * 1.2 + 300) },
        { col1: 'Light Active (1.375x)', col2: Math.round(bmr * 1.375), col3: Math.round(bmr * 1.375 - 500), col4: Math.round(bmr * 1.375 + 300) },
        { col1: 'Moderate Active (1.55x)', col2: Math.round(bmr * 1.55), col3: Math.round(bmr * 1.55 - 500), col4: Math.round(bmr * 1.55 + 300) },
        { col1: 'Very Active (1.725x)', col2: Math.round(bmr * 1.725), col3: Math.round(bmr * 1.725 - 500), col4: Math.round(bmr * 1.725 + 300) },
        { col1: 'Athlete (1.9x)', col2: Math.round(bmr * 1.9), col3: Math.round(bmr * 1.9 - 500), col4: Math.round(bmr * 1.9 + 300) }
      ];

      return {
        results: [
          { label: 'Your Daily TDEE Target', value: `${Math.round(tdee)} kcal/day`, highlight: true, raw: true },
          { label: 'Basal Metabolic Rate (BMR)', value: `${Math.round(bmr)} kcal/day`, raw: true },
          { label: 'Fat Loss Target (Deficit)', value: `${Math.round(tdee - 500)} kcal/day`, raw: true }
        ],
        chartData: {
          labels: ['Basal Metabolism', 'Physical Activity Contribution', 'Total Maintenance Budget'],
          data: [Math.round(bmr), Math.round(tdee - bmr), Math.round(tdee)]
        },
        tableHeader: ['Activity Level', 'Maintenance (kcal)', 'Weight Loss (kcal)', 'Muscle Gain (kcal)'],
        tableRows: tableRows
      };
    }
  },

  'body-fat-calculator': {
    title: 'Body Fat Calculator',
    icon: '📊',
    subtitle: 'Estimate body fat percentage using US Navy circumference method',
    inputs: [
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }], default: 'male' },
      { id: 'height', label: 'Height (cm)', type: 'range', min: 100, max: 250, step: 1, default: 170, format: 'cm' },
      { id: 'neck', label: 'Neck Circumference (cm)', type: 'range', min: 20, max: 60, step: 0.5, default: 38, format: 'cm' },
      { id: 'waist', label: 'Waist Circumference (cm)', type: 'range', min: 40, max: 180, step: 0.5, default: 85, format: 'cm' },
      { id: 'hip', label: 'Hip Circumference (cm, female only)', type: 'range', min: 40, max: 180, step: 0.5, default: 90, format: 'cm' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const g = state.gender;
      const h = state.height;
      const n = state.neck;
      const w = state.waist;
      const hp = state.hip;

      let bf = 0;
      if (g === 'male') {
        if (w <= n) return { error: 'Waist must be larger than neck circumference.' };
        bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      } else {
        if (w + hp <= n) return { error: 'Waist + Hip must be larger than neck circumference.' };
        bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
      }

      if (bf < 2) bf = 2; // Limit fat values to physiological minimums
      const fatMass = (bf / 100) * 75; // assume standard reference weight 75kg if actual not in form
      const leanMass = 75 - fatMass;

      const tableRows = [
        { col1: 'Essential Fat', col2: '2 - 5%', col3: '10 - 13%', col4: 'Minimum physiological fat' },
        { col1: 'Athletes', col2: '6 - 13%', col3: '14 - 20%', col4: 'Optimal athletic structure' },
        { col1: 'Fitness', col2: '14 - 17%', col3: '21 - 24%', col4: 'Good cardiovascular indicators' },
        { col1: 'Acceptable', col2: '18 - 24%', col3: '25 - 31%', col4: 'Average body composition' },
        { col1: 'Obese', col2: '≥ 25%', col3: '≥ 32%', col4: 'High risk of insulin issues' }
      ];

      return {
        results: [
          { label: 'Your Body Fat (%)', value: `${bf.toFixed(1)}%`, highlight: true, raw: true },
          { label: 'Fat Classification', value: g === 'male' ? (bf < 14 ? 'Athletic/Lean' : bf < 25 ? 'Average' : 'High Fat') : (bf < 21 ? 'Athletic/Lean' : bf < 32 ? 'Average' : 'High Fat'), raw: true },
          { label: 'Lean Mass Ratio (est.)', value: `${(100 - bf).toFixed(1)}%`, raw: true }
        ],
        chartData: {
          labels: ['Lean Tissue Mass', 'Fat Tissue Mass'],
          data: [Math.round(100 - bf), Math.round(bf)]
        },
        tableHeader: ['Classification', 'Male Range', 'Female Range', 'Health Description'],
        tableRows: tableRows
      };
    }
  },

  'lean-body-mass': {
    title: 'Lean Body Mass Calculator',
    icon: '💪',
    subtitle: 'Calculate lean body mass (fat-free body weight)',
    inputs: [
      { id: 'weight', label: 'Weight (kg)', type: 'range', min: 10, max: 250, step: 1, default: 70, format: 'kg' },
      { id: 'height', label: 'Height (cm)', type: 'range', min: 50, max: 250, step: 1, default: 170, format: 'cm' },
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }], default: 'male' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const w = state.weight;
      const h = state.height;
      const g = state.gender;

      let lbmBoer = 0;
      let lbmJames = 0;

      if (g === 'male') {
        lbmBoer = (0.407 * w) + (0.267 * h) - 19.2;
        lbmJames = (1.1 * w) - 128 * (w * w / (h * h));
      } else {
        lbmBoer = (0.252 * w) + (0.473 * h) - 48.3;
        lbmJames = (1.07 * w) - 148 * (w * w / (h * h));
      }

      if (lbmBoer < 0) lbmBoer = 0;
      if (lbmJames < 0) lbmJames = 0;

      const fatMass = w - lbmBoer;

      const tableRows = [
        { col1: 'Boer Formula (LBM)', col2: `${lbmBoer.toFixed(1)} kg`, col3: `${((lbmBoer / w) * 100).toFixed(1)}%` },
        { col1: 'James Formula (LBM)', col2: `${lbmJames.toFixed(1)} kg`, col3: `${((lbmJames / w) * 100).toFixed(1)}%` },
        { col1: 'Estimated Fat Mass', col2: `${fatMass.toFixed(1)} kg`, col3: `${((fatMass / w) * 100).toFixed(1)}%` }
      ];

      return {
        results: [
          { label: 'Lean Body Mass (Boer)', value: `${lbmBoer.toFixed(1)} kg`, highlight: true, raw: true },
          { label: 'Lean Mass Percentage', value: `${((lbmBoer / w) * 100).toFixed(1)}%`, raw: true },
          { label: 'Fat Mass (Boer)', value: `${fatMass.toFixed(1)} kg`, raw: true }
        ],
        chartData: {
          labels: ['Lean Mass', 'Fat Mass'],
          data: [Math.round(lbmBoer), Math.round(fatMass)]
        },
        tableHeader: ['Component Metric', 'Weight (kg)', 'Percent of Body Weight'],
        tableRows: tableRows
      };
    }
  },

  'ideal-weight': {
    title: 'Ideal Weight Calculator',
    icon: '🏃',
    subtitle: 'Find ideal body weight using validated equations',
    inputs: [
      { id: 'height', label: 'Height (cm)', type: 'range', min: 100, max: 250, step: 1, default: 170, format: 'cm' },
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }], default: 'male' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const hCm = state.height;
      const gender = state.gender;

      const inches = hCm / 2.54;
      const inchesOver60 = Math.max(0, inches - 60);

      let devine = 0;
      let robinson = 0;
      let miller = 0;
      let hamwi = 0;

      if (gender === 'male') {
        devine = 50.0 + (2.3 * inchesOver60);
        robinson = 52.0 + (1.9 * inchesOver60);
        miller = 56.2 + (1.41 * inchesOver60);
        hamwi = 48.0 + (2.7 * inchesOver60);
      } else {
        devine = 45.5 + (2.3 * inchesOver60);
        robinson = 49.0 + (1.7 * inchesOver60);
        miller = 53.1 + (1.36 * inchesOver60);
        hamwi = 45.5 + (2.2 * inchesOver60);
      }

      const tableRows = [
        { col1: 'Devine Formula (Standard)', col2: `${devine.toFixed(1)} kg`, col3: 'Most widely used in pharmaceuticals' },
        { col1: 'Robinson Formula', col2: `${robinson.toFixed(1)} kg`, col3: 'Modified Devine for better accuracy' },
        { col1: 'Miller Formula', col2: `${miller.toFixed(1)} kg`, col3: 'Weights height slightly less aggressively' },
        { col1: 'Hamwi Formula', col2: `${hamwi.toFixed(1)} kg`, col3: 'Classic insurance baseline target' }
      ];

      return {
        results: [
          { label: 'Devine Formula Target', value: `${devine.toFixed(1)} kg`, highlight: true, raw: true },
          { label: 'Robinson Target', value: `${robinson.toFixed(1)} kg`, raw: true },
          { label: 'Average Ideal Target', value: `${((devine + robinson + miller + hamwi) / 4).toFixed(1)} kg`, raw: true }
        ],
        chartData: {
          labels: ['Devine', 'Robinson', 'Miller', 'Hamwi'],
          data: [Math.round(devine), Math.round(robinson), Math.round(miller), Math.round(hamwi)]
        },
        tableHeader: ['Formula Model', 'Target Weight Target', 'Usage Context'],
        tableRows: tableRows
      };
    }
  },

  'weight-loss': {
    title: 'Weight Loss Calculator',
    icon: '📉',
    subtitle: 'Plan your weight loss progress timeline and daily deficit targets',
    inputs: [
      { id: 'weight', label: 'Current Weight (kg)', type: 'range', min: 40, max: 200, step: 1, default: 85, format: 'kg' },
      { id: 'target', label: 'Target Weight (kg)', type: 'range', min: 35, max: 150, step: 1, default: 70, format: 'kg' },
      { id: 'pace', label: 'Weekly Deficit Pace', type: 'select', options: [
        { label: '0.25 kg / week (Mild)', value: 0.25 },
        { label: '0.50 kg / week (Moderate)', value: 0.50 },
        { label: '0.75 kg / week (Intense)', value: 0.75 },
        { label: '1.00 kg / week (Aggressive)', value: 1.00 }
      ], default: 0.50 },
      { id: 'tdee', label: 'Your Daily TDEE (kcal)', type: 'range', min: 1000, max: 5000, step: 50, default: 2200 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const cur = state.weight;
      const tar = state.target;
      const pace = parseFloat(state.pace);
      const maintenance = state.tdee;

      if (tar >= cur) return { error: 'Target weight must be less than current weight for weight loss.' };

      const diff = cur - tar;
      const weeksNeeded = diff / pace;
      const daysNeeded = Math.round(weeksNeeded * 7);

      // 1kg of fat ≈ 7700 kcal deficit
      const dailyDeficit = pace * 1100; // 0.5kg = 550kcal deficit
      const targetCalorieBudget = Math.max(1200, maintenance - dailyDeficit); // 1200kcal floor for nutritional safety

      const tableRows = [];
      for (let w = 4; w <= Math.min(weeksNeeded, 24); w += 4) {
        tableRows.push({
          col1: `Week ${w}`,
          col2: (cur - pace * w).toFixed(1) + ' kg',
          col3: Math.round(dailyDeficit * 7 * w) + ' kcal',
          col4: `${Math.round(weeksNeeded - w)} Weeks`
        });
      }

      return {
        results: [
          { label: 'Recommended Daily Intake', value: `${Math.round(targetCalorieBudget)} kcal/day`, highlight: true, raw: true },
          { label: 'Time Needed to Goal', value: `${weeksNeeded.toFixed(1)} Weeks (${daysNeeded} Days)`, raw: true },
          { label: 'Daily Deficit Applied', value: `${Math.round(dailyDeficit)} kcal/day`, raw: true }
        ],
        chartData: {
          labels: ['Daily Calorie Budget', 'Required Daily Deficit', 'Daily TDEE Maintenance'],
          data: [Math.round(targetCalorieBudget), Math.round(dailyDeficit), Math.round(maintenance)]
        },
        tableHeader: ['Timeline Milestone', 'Weight Projection', 'Cumulative Deficit Required', 'Remaining Duration'],
        tableRows: tableRows
      };
    }
  },

  'weight-gain': {
    title: 'Weight Gain Calculator',
    icon: '📈',
    subtitle: 'Plan healthy weight gain timeline and surplus targets',
    inputs: [
      { id: 'weight', label: 'Current Weight (kg)', type: 'range', min: 30, max: 150, step: 1, default: 55, format: 'kg' },
      { id: 'target', label: 'Target Weight (kg)', type: 'range', min: 40, max: 200, step: 1, default: 65, format: 'kg' },
      { id: 'pace', label: 'Weekly Surplus Pace', type: 'select', options: [
        { label: '0.25 kg / week (Slow & Clean)', value: 0.25 },
        { label: '0.50 kg / week (Moderate)', value: 0.50 }
      ], default: 0.25 },
      { id: 'tdee', label: 'Your Daily TDEE (kcal)', type: 'range', min: 1000, max: 5000, step: 50, default: 2000 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const cur = state.weight;
      const tar = state.target;
      const pace = parseFloat(state.pace);
      const maintenance = state.tdee;

      if (tar <= cur) return { error: 'Target weight must be greater than current weight for weight gain.' };

      const diff = tar - cur;
      const weeksNeeded = diff / pace;
      const daysNeeded = Math.round(weeksNeeded * 7);

      const dailySurplus = pace * 1100;
      const targetCalorieBudget = maintenance + dailySurplus;

      const tableRows = [];
      for (let w = 4; w <= Math.min(weeksNeeded, 24); w += 4) {
        tableRows.push({
          col1: `Week ${w}`,
          col2: (cur + pace * w).toFixed(1) + ' kg',
          col3: Math.round(dailySurplus * 7 * w) + ' kcal',
          col4: `${Math.round(weeksNeeded - w)} Weeks`
        });
      }

      return {
        results: [
          { label: 'Recommended Daily Intake', value: `${Math.round(targetCalorieBudget)} kcal/day`, highlight: true, raw: true },
          { label: 'Time Needed to Goal', value: `${weeksNeeded.toFixed(1)} Weeks (${daysNeeded} Days)`, raw: true },
          { label: 'Daily Surplus Applied', value: `${Math.round(dailySurplus)} kcal/day`, raw: true }
        ],
        chartData: {
          labels: ['Daily TDEE Maintenance', 'Required Daily Surplus', 'Total Target Intake'],
          data: [Math.round(maintenance), Math.round(dailySurplus), Math.round(targetCalorieBudget)]
        },
        tableHeader: ['Timeline Milestone', 'Weight Projection', 'Cumulative Surplus Required', 'Remaining Duration'],
        tableRows: tableRows
      };
    }
  },

  'calorie-calculator': {
    title: 'Calorie Calculator',
    icon: '🥗',
    subtitle: 'Calculate daily metabolic calorie expenditure target',
    inputs: [
      { id: 'age', label: 'Age (years)', type: 'range', min: 10, max: 100, step: 1, default: 25 },
      { id: 'weight', label: 'Weight (kg)', type: 'range', min: 10, max: 250, step: 1, default: 70, format: 'kg' },
      { id: 'height', label: 'Height (cm)', type: 'range', min: 50, max: 250, step: 1, default: 170, format: 'cm' },
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }], default: 'male' },
      { id: 'activity', label: 'Activity Level', type: 'select', options: [
        { label: 'Sedentary (No Exercise)', value: 1.2 },
        { label: 'Lightly Active (1-3 days/wk)', value: 1.375 },
        { label: 'Moderately Active (3-5 days/wk)', value: 1.55 },
        { label: 'Very Active (6-7 days/wk)', value: 1.725 }
      ], default: 1.375 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const age = state.age;
      const w = state.weight;
      const h = state.height;
      const gender = state.gender;
      const mult = parseFloat(state.activity);

      let bmr = 0;
      if (gender === 'male') {
        bmr = (10 * w) + (6.25 * h) - (5 * age) + 5;
      } else {
        bmr = (10 * w) + (6.25 * h) - (5 * age) - 161;
      }

      const maintain = bmr * mult;

      const tableRows = [
        { col1: 'Extreme Weight Loss (1kg/wk)', col2: `${Math.round(maintain - 1000)} kcal/day`, col3: 'Requires medical monitoring' },
        { col1: 'Standard Weight Loss (0.5kg/wk)', col2: `${Math.round(maintain - 500)} kcal/day`, col3: 'Highly recommended sustainable pace' },
        { col1: 'Maintenance Level', col2: `${Math.round(maintain)} kcal/day`, col3: 'To keep current baseline weight' },
        { col1: 'Weight Gain (0.5kg/wk)', col2: `${Math.round(maintain + 500)} kcal/day`, col3: 'Ideal for muscle bulk targets' }
      ];

      return {
        results: [
          { label: 'Maintenance Calories', value: `${Math.round(maintain)} kcal/day`, highlight: true, raw: true },
          { label: 'Weight Loss Target', value: `${Math.round(maintain - 500)} kcal/day`, raw: true },
          { label: 'Weight Gain Target', value: `${Math.round(maintain + 500)} kcal/day`, raw: true }
        ],
        chartData: {
          labels: ['Maintenance Target', 'Weight Loss Target', 'Weight Gain Target'],
          data: [Math.round(maintain), Math.round(maintain - 500), Math.round(maintain + 500)]
        },
        tableHeader: ['Goal Classification', 'Daily Target Calories', 'Safety Guideline'],
        tableRows: tableRows
      };
    }
  },

  'water-intake': {
    title: 'Water Intake Calculator',
    icon: '💧',
    subtitle: 'Calculate daily fluid hydration targets',
    inputs: [
      { id: 'weight', label: 'Weight (kg)', type: 'range', min: 10, max: 200, step: 1, default: 70, format: 'kg' },
      { id: 'activity', label: 'Physical Activity', type: 'select', options: [
        { label: 'Sedentary', value: 0 },
        { label: 'Active (+0.5L)', value: 0.5 },
        { label: 'Very Active (+1.0L)', value: 1.0 }
      ], default: 0 },
      { id: 'climate', label: 'Climate Weather', type: 'select', options: [
        { label: 'Normal / Cold', value: 0 },
        { label: 'Hot / Summer (+0.5L)', value: 0.5 }
      ], default: 0 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const w = state.weight;
      const act = parseFloat(state.activity);
      const cli = parseFloat(state.climate);

      let intakeL = (w * 35) / 1000;
      intakeL += act + cli;

      const glasses = intakeL / 0.25;

      const tableRows = [
        { col1: 'Water / Fluids', col2: `${(intakeL * 0.8).toFixed(1)} Liters`, col3: `${Math.round(glasses * 0.8)} Glasses` },
        { col1: 'Metabolic Food Moisture', col2: `${(intakeL * 0.2).toFixed(1)} Liters`, col3: 'Obtained via standard dietary solid foods' }
      ];

      return {
        results: [
          { label: 'Hydration Target', value: `${intakeL.toFixed(2)} Liters/day`, highlight: true, raw: true },
          { label: 'Serving Size Equiv.', value: `${Math.round(glasses)} Glasses (250ml each)`, raw: true },
          { label: 'Baseline Target (Weight-based)', value: `${((w * 35) / 1000).toFixed(2)} Liters`, raw: true }
        ],
        chartData: {
          labels: ['Baseline Water Needs', 'Exercise Contribution', 'Weather Adjustment'],
          data: [Math.round((w * 35) / 10), Math.round(act * 100), Math.round(cli * 100)]
        },
        tableHeader: ['Fluid Source', 'Amount Target', 'Guideline Details'],
        tableRows: tableRows
      };
    }
  },

  'protein-intake': {
    title: 'Protein Intake Calculator',
    icon: '🍗',
    subtitle: 'Determine daily nutritional protein requirements based on lifestyle',
    inputs: [
      { id: 'weight', label: 'Weight (kg)', type: 'range', min: 10, max: 200, step: 1, default: 70, format: 'kg' },
      { id: 'activity', label: 'Workout Intensity', type: 'select', options: [
        { label: 'Sedentary (No sports)', value: 0.8 },
        { label: 'Light exercise (cardio/yoga)', value: 1.2 },
        { label: 'Strength training (hypertrophy)', value: 1.6 },
        { label: 'Heavy/Athlete (intense daily load)', value: 2.0 }
      ], default: 1.2 },
      { id: 'goal', label: 'Fitness Goal', type: 'select', options: [
        { label: 'Maintain status quo', value: 0 },
        { label: 'Fat Loss (preserve muscle)', value: 0.2 },
        { label: 'Muscle Build (bulking surplus)', value: 0.4 }
      ], default: 0 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const w = state.weight;
      const baseMult = parseFloat(state.activity);
      const goalOffset = parseFloat(state.goal);

      const targetMultiplier = baseMult + goalOffset;
      const proteinGrams = w * targetMultiplier;

      const tableRows = [
        { col1: 'Sedentary Baseline (0.8g/kg)', col2: Math.round(w * 0.8) + 'g', col3: 'Prevents structural deficiency' },
        { col1: 'Active Lifestyle (1.2g - 1.6g/kg)', col2: `${Math.round(w * 1.2)}g - ${Math.round(w * 1.6)}g`, col3: 'Supports average muscle tissue repair' },
        { col1: 'Muscle Hypertrophy (1.8g - 2.2g/kg)', col2: `${Math.round(w * 1.8)}g - ${Math.round(w * 2.2)}g`, col3: 'Optimal for heavy strength training' }
      ];

      return {
        results: [
          { label: 'Daily Protein Target', value: `${Math.round(proteinGrams)} grams/day`, highlight: true, raw: true },
          { label: 'Yielding Ratio', value: `${targetMultiplier.toFixed(1)} g / kg body weight`, raw: true },
          { label: 'Total Protein Calories', value: `${Math.round(proteinGrams * 4)} kcal`, raw: true }
        ],
        chartData: {
          labels: ['Daily Protein Target (g)', 'Your Body Weight (kg)'],
          data: [Math.round(proteinGrams), Math.round(w)]
        },
        tableHeader: ['Fitness Category', 'Recommended Protein Target', 'Clinical Objective'],
        tableRows: tableRows
      };
    }
  },

  'macro-calculator': {
    title: 'Macro Calculator',
    icon: '🥩',
    subtitle: 'Divide daily calories into Protein, Carbs, and Fats',
    inputs: [
      { id: 'calories', label: 'Daily Calorie Target (kcal)', type: 'range', min: 1000, max: 5000, step: 50, default: 2000 },
      { id: 'split', label: 'Macronutrient Split Ratio', type: 'select', options: [
        { label: 'Balanced (40% Carbs, 30% Protein, 30% Fat)', value: 'balanced' },
        { label: 'Low Carb/Keto (10% Carbs, 30% Protein, 60% Fat)', value: 'lowcarb' },
        { label: 'High Protein (35% Carbs, 45% Protein, 20% Fat)', value: 'highprotein' }
      ], default: 'balanced' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const kcal = state.calories;
      const split = state.split;

      let cPct = 0.4, pPct = 0.3, fPct = 0.3;
      if (split === 'lowcarb') {
        cPct = 0.1; pPct = 0.3; fPct = 0.6;
      } else if (split === 'highprotein') {
        cPct = 0.35; pPct = 0.45; fPct = 0.2;
      }

      const carbKcal = kcal * cPct;
      const protKcal = kcal * pPct;
      const fatKcal = kcal * fPct;

      const carbG = carbKcal / 4;
      const protG = protKcal / 4;
      const fatG = fatKcal / 9;

      const tableRows = [
        { col1: 'Carbohydrates', col2: `${Math.round(cPct * 100)}%`, col3: `${Math.round(carbKcal)} kcal`, col4: `${Math.round(carbG)} g` },
        { col1: 'Protein', col2: `${Math.round(pPct * 100)}%`, col3: `${Math.round(protKcal)} kcal`, col4: `${Math.round(protG)} g` },
        { col1: 'Fats', col2: `${Math.round(fPct * 100)}%`, col3: `${Math.round(fatKcal)} kcal`, col4: `${Math.round(fatG)} g` }
      ];

      return {
        results: [
          { label: 'Carbohydrates Target', value: `${Math.round(carbG)} grams/day`, highlight: true, raw: true },
          { label: 'Protein Target', value: `${Math.round(protG)} grams/day`, raw: true },
          { label: 'Dietary Fats Target', value: `${Math.round(fatG)} grams/day`, raw: true }
        ],
        chartData: {
          labels: ['Carb Calories', 'Protein Calories', 'Fat Calories'],
          data: [Math.round(carbKcal), Math.round(protKcal), Math.round(fatKcal)]
        },
        tableHeader: ['Macronutrient', 'Percentage Split', 'Calorie Value', 'Grams Target'],
        tableRows: tableRows
      };
    }
  },

  'meal-calorie-calculator': {
    title: 'Meal Calorie Calculator',
    icon: '🍽️',
    subtitle: 'Distribute daily target calories across meals',
    inputs: [
      { id: 'calories', label: 'Daily Calorie Target (kcal)', type: 'range', min: 1000, max: 5000, step: 50, default: 2000 },
      { id: 'meals', label: 'Number of Meals Per Day', type: 'select', options: [
        { label: '3 Meals (Standard)', value: 3 },
        { label: '4 Meals (3 Meals + 1 Snack)', value: 4 },
        { label: '5 Meals (Frequent small meals)', value: 5 }
      ], default: 3 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const kcal = state.calories;
      const count = parseInt(state.meals);

      let distribution = [];
      if (count === 3) {
        distribution = [
          { name: 'Breakfast (30%)', val: kcal * 0.3 },
          { name: 'Lunch (40%)', val: kcal * 0.4 },
          { name: 'Dinner (30%)', val: kcal * 0.3 }
        ];
      } else if (count === 4) {
        distribution = [
          { name: 'Breakfast (25%)', val: kcal * 0.25 },
          { name: 'Lunch (35%)', val: kcal * 0.35 },
          { name: 'Evening Snack (15%)', val: kcal * 0.15 },
          { name: 'Dinner (25%)', val: kcal * 0.25 }
        ];
      } else {
        distribution = [
          { name: 'Breakfast (20%)', val: kcal * 0.2 },
          { name: 'Mid-Morning Snack (10%)', val: kcal * 0.1 },
          { name: 'Lunch (30%)', val: kcal * 0.3 },
          { name: 'Evening Snack (10%)', val: kcal * 0.1 },
          { name: 'Dinner (30%)', val: kcal * 0.3 }
        ];
      }

      const tableRows = distribution.map(d => ({
        col1: d.name.split(' (')[0],
        col2: d.name.split('(')[1].replace(')', ''),
        col3: `${Math.round(d.val)} kcal`
      }));

      return {
        results: [
          { label: 'Breakfast Target', value: `${Math.round(distribution[0].val)} kcal`, highlight: true, raw: true },
          { label: 'Lunch Target', value: `${Math.round(distribution[count === 3 ? 1 : 2].val)} kcal`, raw: true },
          { label: 'Dinner Target', value: `${Math.round(distribution[distribution.length - 1].val)} kcal`, raw: true }
        ],
        chartData: {
          labels: distribution.map(d => d.name),
          data: distribution.map(d => Math.round(d.val))
        },
        tableHeader: ['Meal Target', 'Recommended Distribution', 'Calorie Budget'],
        tableRows: tableRows
      };
    }
  },

  'heart-rate': {
    title: 'Heart Rate Calculator',
    icon: '💓',
    subtitle: 'Determine estimated maximum heart rate ranges',
    inputs: [
      { id: 'age', label: 'Age (years)', type: 'range', min: 5, max: 100, step: 1, default: 30 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const age = state.age;

      // Gellish formula: HRmax = 207 - (0.7 * age)
      const maxHrGellish = 207 - (0.7 * age);
      // Tanaka formula: HRmax = 208 - (0.7 * age)
      const maxHrTanaka = 208 - (0.7 * age);
      // Fox formula (standard): HRmax = 220 - age
      const maxHrFox = 220 - age;

      const tableRows = [
        { col1: 'Fox Formula (Standard)', col2: `${maxHrFox} bpm`, col3: 'Most widely used generic formula' },
        { col1: 'Tanaka Formula (Accurate)', col2: `${Math.round(maxHrTanaka)} bpm`, col3: 'Best for middle-aged active adults' },
        { col1: 'Gellish Formula', col2: `${Math.round(maxHrGellish)} bpm`, col3: 'Highly accurate in clinical studies' }
      ];

      return {
        results: [
          { label: 'Estimated Max Heart Rate', value: `${maxHrFox} bpm`, highlight: true, raw: true },
          { label: 'Tanaka Equation Target', value: `${Math.round(maxHrTanaka)} bpm`, raw: true },
          { label: 'Cardio Risk Threshold', value: `${Math.round(maxHrFox * 0.9)} bpm`, raw: true }
        ],
        chartData: {
          labels: ['Fox HRMax', 'Tanaka HRMax', 'Gellish HRMax'],
          data: [maxHrFox, Math.round(maxHrTanaka), Math.round(maxHrGellish)]
        },
        tableHeader: ['Formula Used', 'Max HR Limit', 'Clinical Description'],
        tableRows: tableRows
      };
    }
  },

  'target-heart-rate': {
    title: 'Target Heart Rate Calculator',
    icon: '🎯',
    subtitle: 'Determine optimal training heart rate zones using Karvonen formula',
    inputs: [
      { id: 'age', label: 'Age (years)', type: 'range', min: 10, max: 100, step: 1, default: 30 },
      { id: 'resting', label: 'Resting Heart Rate (bpm)', type: 'range', min: 30, max: 120, step: 1, default: 70 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const age = state.age;
      const rhr = state.resting;

      const maxHr = 220 - age;
      const hrReserve = maxHr - rhr; // Heart Rate Reserve (HRR)

      const zones = [
        { name: 'Warm up (50-60%)', l: 0.5, h: 0.6 },
        { name: 'Fat Burn (60-70%)', l: 0.6, h: 0.7 },
        { name: 'Aerobic / Fitness (70-80%)', l: 0.7, h: 0.8 },
        { name: 'Anaerobic Threshold (80-90%)', l: 0.8, h: 0.9 },
        { name: 'Red Line (90-100%)', l: 0.9, h: 1.0 }
      ];

      const tableRows = zones.map(z => {
        const targetLow = Math.round(hrReserve * z.l + rhr);
        const targetHigh = Math.round(hrReserve * z.h + rhr);
        return {
          col1: z.name,
          col2: `${z.l * 100}% - ${z.h * 100}%`,
          col3: `${targetLow} - ${targetHigh} bpm`,
          col4: z.l === 0.6 ? 'Recommended for calorie loss' : z.l === 0.7 ? 'Aerobic capacity improvement' : 'Short intensity work'
        };
      });

      const fatBurnMin = Math.round(hrReserve * 0.6 + rhr);
      const fatBurnMax = Math.round(hrReserve * 0.7 + rhr);

      return {
        results: [
          { label: 'Fat Burn Training Zone', value: `${fatBurnMin} - ${fatBurnMax} bpm`, highlight: true, raw: true },
          { label: 'Maximum Heart Rate Limit', value: `${maxHr} bpm`, raw: true },
          { label: 'Aerobic Zone Target', value: `${Math.round(hrReserve * 0.7 + rhr)} - ${Math.round(hrReserve * 0.8 + rhr)} bpm`, raw: true }
        ],
        chartData: {
          labels: ['Resting HR', 'Warmup limit', 'Fat Burn limit', 'Max HR'],
          data: [rhr, Math.round(hrReserve * 0.5 + rhr), Math.round(hrReserve * 0.7 + rhr), maxHr]
        },
        tableHeader: ['Zone Level', 'Intensity Range', 'Target Heart Rate', 'Performance Objective'],
        tableRows: tableRows
      };
    }
  },

  'blood-pressure': {
    title: 'Blood Pressure Calculator',
    icon: '🩺',
    subtitle: 'Assess blood pressure readings according to AHA standards',
    inputs: [
      { id: 'sys', label: 'Systolic Pressure (mmHg - top number)', type: 'range', min: 70, max: 220, step: 1, default: 120 },
      { id: 'dia', label: 'Diastolic Pressure (mmHg - bottom number)', type: 'range', min: 40, max: 140, step: 1, default: 80 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const sys = state.sys;
      const dia = state.dia;

      let cat = '';
      let advice = '';

      if (sys < 120 && dia < 80) {
        cat = 'Normal';
        advice = 'Healthy ranges! Maintain active nutrition checks.';
      } else if (sys >= 120 && sys <= 129 && dia < 80) {
        cat = 'Elevated';
        advice = 'Slightly high. Focus on lifestyle adjustments and cardio exercise.';
      } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
        cat = 'Hypertension Stage 1';
        advice = 'Requires clinical monitoring. Consider scheduling checkups.';
      } else if (sys >= 180 || dia >= 120) {
        cat = 'Hypertensive Crisis';
        advice = '⚠️ Emergency warning! Consult a medical professional immediately.';
      } else {
        cat = 'Hypertension Stage 2';
        advice = 'Consistently high blood pressure. Medical consultation is recommended.';
      }

      const tableRows = [
        { col1: 'Normal', col2: '< 120', col3: '< 80', col4: 'Keep healthy lifestyle' },
        { col1: 'Elevated', col2: '120 - 129', col3: '< 80', col4: 'Monitor readings' },
        { col1: 'Hypertension Stage 1', col2: '130 - 139', col3: '80 - 89', col4: 'Consult medical doctor' },
        { col1: 'Hypertension Stage 2', col2: '140 - 179', col3: '90 - 119', col4: 'Active treatment indicated' },
        { col1: 'Hypertensive Crisis', col2: '≥ 180', col3: '≥ 120', col4: 'Requires immediate emergency help' }
      ];

      return {
        results: [
          { label: 'BP Status Category', value: cat, highlight: true, raw: true },
          { label: 'Reading Checked', value: `${sys} / ${dia} mmHg`, raw: true },
          { label: 'Clinical Recommendation', value: advice, raw: true }
        ],
        chartData: {
          labels: ['Systolic pressure', 'Diastolic pressure', 'Systolic limit (Normal)', 'Diastolic limit (Normal)'],
          data: [sys, dia, 120, 80]
        },
        tableHeader: ['BP Category', 'Systolic (top)', 'Diastolic (bottom)', 'Guideline'],
        tableRows: tableRows
      };
    }
  },

  'blood-sugar-converter': {
    title: 'Blood Sugar Converter',
    icon: '🩸',
    subtitle: 'Convert glucose values between mg/dL and mmol/L units',
    inputs: [
      { id: 'val', label: 'Glucose Value', type: 'number', default: 100 },
      { id: 'unit', label: 'Conversion Type', type: 'select', options: [
        { label: 'mg/dL to mmol/L', value: 'toMmol' },
        { label: 'mmol/L to mg/dL', value: 'toMg' }
      ], default: 'toMmol' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const val = parseFloat(state.val);
      const unit = state.unit;

      if (isNaN(val) || val <= 0) return { error: 'Please enter a valid positive number.' };

      let converted = 0;
      let fromUnit = '', toUnit = '';

      if (unit === 'toMmol') {
        converted = val / 18.0182;
        fromUnit = 'mg/dL';
        toUnit = 'mmol/L';
      } else {
        converted = val * 18.0182;
        fromUnit = 'mmol/L';
        toUnit = 'mg/dL';
      }

      const tableRows = [
        { col1: 'Normal Fasting Range', col2: '70 - 99 mg/dL', col3: '3.9 - 5.5 mmol/L' },
        { col1: 'Prediabetes Range', col2: '100 - 125 mg/dL', col3: '5.6 - 6.9 mmol/L' },
        { col1: 'Diabetic Range', col2: '≥ 126 mg/dL', col3: '≥ 7.0 mmol/L' }
      ];

      return {
        results: [
          { label: 'Converted Reading', value: `${converted.toFixed(2)} ${toUnit}`, highlight: true, raw: true },
          { label: 'Original Value', value: `${val} ${fromUnit}`, raw: true },
          { label: 'Clinical Fasting Bracket', value: unit === 'toMmol' ? (val < 100 ? 'Normal Fasting' : val < 126 ? 'Prediabetes' : 'Diabetic Bracket') : (converted < 100 ? 'Normal Fasting' : converted < 126 ? 'Prediabetes' : 'Diabetic Bracket'), raw: true }
        ],
        chartData: {
          labels: ['Fasting Normal Limit (mg/dL)', 'Prediabetes Limit (mg/dL)', 'Current Reading (mg/dL)'],
          data: [99, 125, Math.round(unit === 'toMmol' ? val : converted)]
        },
        tableHeader: ['Fasting Glucose Bracket', 'Value in mg/dL', 'Value in mmol/L'],
        tableRows: tableRows
      };
    }
  },

  'sleep-calculator': {
    title: 'Sleep Calculator',
    icon: '😴',
    subtitle: 'Determine sleep windows using 90-minute biological sleep cycles',
    inputs: [
      { id: 'mode', label: 'Calculate Mode', type: 'select', options: [
        { label: 'Wake up at (choose time)', value: 'wakeup' },
        { label: 'Go to bed now', value: 'bedtime' }
      ], default: 'wakeup' },
      { id: 'time', label: 'Target Time (for Wake up)', type: 'time', default: '07:00' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const mode = state.mode;
      const today = new Date();

      const formatTime = (d) => {
        let hrs = d.getHours();
        const mins = d.getMinutes().toString().padStart(2, '0');
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12;
        return `${hrs}:${mins} ${ampm}`;
      };

      const results = [];
      const tableRows = [];
      if (mode === 'wakeup') {
        const tParts = state.time.split(':');
        const target = new Date();
        target.setHours(parseInt(tParts[0]), parseInt(tParts[1]), 0);

        const cycles = [6, 5, 4, 3];
        cycles.forEach((c, idx) => {
          const bed = new Date(target.getTime());
          bed.setMinutes(bed.getMinutes() - (c * 90) - 15); // subtract 15 mins to fall asleep
          results.push({ label: `Sleep time (${c} cycles)`, value: formatTime(bed), raw: true });
          tableRows.push({
            col1: `${c} Cycles`,
            col2: `${c * 1.5} Hours`,
            col3: formatTime(bed),
            col4: idx === 1 ? 'Optimal sleep duration' : 'Acceptable window'
          });
        });
      } else {
        const cycles = [3, 4, 5, 6];
        cycles.forEach((c, idx) => {
          const wake = new Date(today.getTime());
          wake.setMinutes(wake.getMinutes() + (c * 90) + 15);
          results.push({ label: `Wake up time (${c} cycles)`, value: formatTime(wake), raw: true });
          tableRows.push({
            col1: `${c} Cycles`,
            col2: `${c * 1.5} Hours`,
            col3: formatTime(wake),
            col4: idx === 2 ? 'Optimal sleep duration' : 'Acceptable window'
          });
        });
      }

      if (results.length > 0) results[0].highlight = true;

      return {
        results: results,
        chartData: {
          labels: ['3 Cycles (4.5h)', '4 Cycles (6.0h)', '5 Cycles (7.5h)', '6 Cycles (9.0h)'],
          data: [270, 360, 450, 540]
        },
        tableHeader: ['Sleep Target', 'Duration Hours', 'Calculated Time Window', 'Quality Assessment'],
        tableRows: tableRows
      };
    }
  },

  'sleep-cycle': {
    title: 'Sleep Cycle Calculator',
    icon: '💤',
    subtitle: 'Find wake up schedules for different numbers of sleep cycles',
    inputs: [
      { id: 'bedtime', label: 'Planned Bedtime', type: 'time', default: '22:00' },
      { id: 'cycles', label: 'Desired Sleep Cycles', type: 'range', min: 3, max: 8, step: 1, default: 5 }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const parts = state.bedtime.split(':');
      const cycles = state.cycles;

      const d = new Date();
      d.setHours(parseInt(parts[0]), parseInt(parts[1]), 0);
      d.setMinutes(d.getMinutes() + (cycles * 90) + 14); // 14 mins average sleep latency

      const formatTime = (timeObj) => {
        let hrs = timeObj.getHours();
        const mins = timeObj.getMinutes().toString().padStart(2, '0');
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12;
        return `${hrs}:${mins} ${ampm}`;
      };

      const tableRows = [];
      for (let c = 3; c <= 8; c++) {
        const tempD = new Date(d.getTime() - (cycles * 90 * 60000) + (c * 90 * 60000));
        tableRows.push({
          col1: `${c} Cycles`,
          col2: `${c * 1.5} Hours`,
          col3: formatTime(tempD)
        });
      }

      return {
        results: [
          { label: 'Estimated Wake Up Time', value: formatTime(d), highlight: true, raw: true },
          { label: 'Sleep Duration', value: `${cycles * 1.5} Hours`, raw: true },
          { label: 'Biological Sleep Cycles', value: cycles, raw: true }
        ],
        chartData: {
          labels: ['Total Minutes Slept', 'Estimated Awake Minutes'],
          data: [cycles * 90, 14]
        },
        tableHeader: ['Cycles Count', 'Total Rest Duration', 'Target Wake Up Time Window'],
        tableRows: tableRows
      };
    }
  },

  'pregnancy-due-date': {
    title: 'Pregnancy Due Date Calculator',
    icon: '🤱',
    subtitle: 'Estimate gestational progress and child birth due date',
    inputs: [
      { id: 'lmp', label: 'Last Period Start Date', type: 'date', default: () => {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        return d.toISOString().split('T')[0];
      }},
      { id: 'cycle', label: 'Menstrual Cycle Length (Days)', type: 'range', min: 22, max: 45, step: 1, default: 28, format: 'days' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      if (!state.lmp) return { error: 'Please enter a valid date' };
      const lmpDate = new Date(state.lmp);
      const cycle = state.cycle;

      const diffFrom28 = cycle - 28;
      const dueDate = new Date(lmpDate.getTime());
      dueDate.setDate(dueDate.getDate() + 280 + diffFrom28);

      const today = new Date();
      const diffMs = today - lmpDate;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0 || diffDays > 300) {
        return { error: 'First day of last period must be within the last 10 months.' };
      }

      const weeks = Math.floor(diffDays / 7);
      const remDays = diffDays % 7;
      const daysToDelivery = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

      let trimester = '';
      if (weeks < 13) trimester = 'First Trimester';
      else if (weeks < 26) trimester = 'Second Trimester';
      else trimester = 'Third Trimester';

      const tableRows = [
        { col1: 'First Trimester', col2: 'Weeks 1 - 12', col3: weeks < 13 ? 'Current Phase' : 'Completed' },
        { col1: 'Second Trimester', col2: 'Weeks 13 - 26', col3: weeks >= 13 && weeks < 26 ? 'Current Phase' : weeks >= 26 ? 'Completed' : 'Upcoming' },
        { col1: 'Third Trimester', col2: 'Weeks 27 - 40', col3: weeks >= 26 ? 'Current Phase' : 'Upcoming' }
      ];

      return {
        results: [
          { label: 'Estimated Due Date', value: dueDate.toDateString(), highlight: true, raw: true },
          { label: 'Gestational Progress', value: `${weeks} Weeks, ${remDays} Days`, raw: true },
          { label: 'Trimester State', value: trimester, raw: true },
          { label: 'Time Remaining', value: daysToDelivery > 0 ? `${daysToDelivery} Days to birth` : 'Due date reached/passed', raw: true }
        ],
        chartData: {
          labels: ['Gestational Days Completed', 'Days to Delivery'],
          data: [diffDays, Math.max(0, daysToDelivery)]
        },
        tableHeader: ['Pregnancy Milestones', 'Gestational Bracket', 'Status Indicator'],
        tableRows: tableRows
      };
    }
  },

  'ovulation-calculator': {
    title: 'Ovulation Calculator',
    icon: '🥚',
    subtitle: 'Estimate fertile windows and peak ovulation calendar dates',
    inputs: [
      { id: 'lmp', label: 'Last Period Start Date', type: 'date', default: () => {
        const d = new Date();
        d.setDate(d.getDate() - 14);
        return d.toISOString().split('T')[0];
      }},
      { id: 'cycle', label: 'Average Cycle Length (Days)', type: 'range', min: 22, max: 45, step: 1, default: 28, format: 'days' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      if (!state.lmp) return { error: 'Please select Last Period Start Date' };
      const lmp = new Date(state.lmp);
      const cycle = state.cycle;

      // Ovulation occurs approximately (cycle - 14) days after LMP
      const ovulationOffset = cycle - 14;
      const ovulationDate = new Date(lmp.getTime());
      ovulationDate.setDate(ovulationDate.getDate() + ovulationOffset);

      const fertileStart = new Date(ovulationDate.getTime());
      fertileStart.setDate(fertileStart.getDate() - 5); // 5 days before ovulation

      const fertileEnd = new Date(ovulationDate.getTime());
      fertileEnd.setDate(fertileEnd.getDate() + 1); // 1 day after ovulation

      const formatDate = (dateObj) => dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      const tableRows = [
        { col1: 'Beginning of Cycle', col2: formatDate(lmp), col3: 'Cycle day 1' },
        { col1: 'Fertile Window Opens', col2: formatDate(fertileStart), col3: 'Peak sperm survivability period' },
        { col1: 'Estimated Ovulation Day', col2: formatDate(ovulationDate), col3: 'Egg is released (optimal conception window)' },
        { col1: 'Fertile Window Closes', col2: formatDate(fertileEnd), col3: 'Conception probability drops' }
      ];

      return {
        results: [
          { label: 'Fertile Window Range', value: `${formatDate(fertileStart)} - ${formatDate(fertileEnd)}`, highlight: true, raw: true },
          { label: 'Peak Ovulation Day', value: formatDate(ovulationDate), raw: true },
          { label: 'Next Cycle Start Date', value: formatDate(new Date(lmp.getTime() + (cycle * 24 * 60 * 60 * 1000))), raw: true }
        ],
        chartData: {
          labels: ['Days pre-fertile', 'Fertile window days', 'Remaining cycle days'],
          data: [Math.max(0, ovulationOffset - 5), 6, Math.max(0, cycle - ovulationOffset - 1)]
        },
        tableHeader: ['Cycle Benchmark', 'Calendar Date Window', 'Physiological Details'],
        tableRows: tableRows
      };
    }
  },

  'pregnancy-weight-gain': {
    title: 'Pregnancy Weight Gain Calculator',
    icon: '🤰',
    subtitle: 'Determine recommended gestation weight gain bounds based on pre-pregnancy BMI',
    inputs: [
      { id: 'preWeight', label: 'Pre-pregnancy Weight (kg)', type: 'range', min: 30, max: 200, step: 1, default: 60, format: 'kg' },
      { id: 'height', label: 'Height (cm)', type: 'range', min: 100, max: 250, step: 1, default: 165, format: 'cm' },
      { id: 'weeks', label: 'Week of Pregnancy', type: 'range', min: 1, max: 40, step: 1, default: 20, format: 'weeks' }
    ],
    hasChart: true,
    hasTable: true,
    calculate(state) {
      const w = state.preWeight;
      const h = state.height / 100;
      const weeks = state.weeks;

      const bmi = w / (h * h);
      let classType = '';
      let targetMin = 11.5, targetMax = 16; // Normal BMI guidelines: 11.5-16kg

      if (bmi < 18.5) {
        classType = 'Underweight (BMI < 18.5)';
        targetMin = 12.5; targetMax = 18;
      } else if (bmi < 25) {
        classType = 'Normal Weight (BMI 18.5 - 24.9)';
        targetMin = 11.5; targetMax = 16;
      } else if (bmi < 30) {
        classType = 'Overweight (BMI 25 - 29.9)';
        targetMin = 7; targetMax = 11.5;
      } else {
        classType = 'Obese (BMI ≥ 30)';
        targetMin = 5; targetMax = 9;
      }

      // Trimester 1: minimal weight gain (~0.5 - 2kg total)
      // Trimester 2 & 3: steady gain of ~0.3 - 0.5kg/week
      let currentRecMin = 0.5;
      let currentRecMax = 2.0;

      if (weeks > 12) {
        const rateMin = bmi < 25 ? 0.4 : bmi < 30 ? 0.3 : 0.2;
        const rateMax = bmi < 18.5 ? 0.5 : bmi < 25 ? 0.45 : bmi < 30 ? 0.35 : 0.25;

        currentRecMin = 1.5 + (weeks - 12) * rateMin;
        currentRecMax = 2.0 + (weeks - 12) * rateMax;
      }

      // Clamp to total limits
      currentRecMin = Math.min(targetMin, currentRecMin);
      currentRecMax = Math.min(targetMax, currentRecMax);

      const tableRows = [
        { col1: 'Underweight', col2: '18.5', col3: '12.5 - 18.0 kg', col4: '0.45 - 0.58 kg/wk' },
        { col1: 'Normal Weight', col2: '18.5 - 24.9', col3: '11.5 - 16.0 kg', col4: '0.35 - 0.45 kg/wk' },
        { col1: 'Overweight', col2: '25.0 - 29.9', col3: '7.0 - 11.5 kg', col4: '0.27 - 0.35 kg/wk' },
        { col1: 'Obese', col2: '≥ 30.0', col3: '5.0 - 9.0 kg', col4: '0.22 - 0.27 kg/wk' }
      ];

      return {
        results: [
          { label: 'Recommended Gain (Current Week)', value: `${currentRecMin.toFixed(1)} - ${currentRecMax.toFixed(1)} kg`, highlight: true, raw: true },
          { label: 'Pre-pregnancy BMI Status', value: classType, raw: true },
          { label: 'Recommended Total Term Gain', value: `${targetMin} - ${targetMax} kg`, raw: true }
        ],
        chartData: {
          labels: ['Current Recommended Min Gain', 'Current Recommended Max Gain', 'Term Max Gain Limit'],
          data: [Math.round(currentRecMin), Math.round(currentRecMax), Math.round(targetMax)]
        },
        tableHeader: ['BMI Classification', 'Pre-Pregnancy BMI', 'Total Recommended Term Gain', 'Rate (Trimester 2 & 3)'],
        tableRows: tableRows
      };
    }
  }
});
