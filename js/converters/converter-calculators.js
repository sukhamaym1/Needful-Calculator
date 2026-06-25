'use strict';

window.NC = window.NC || {};
window.NC.CalculatorRouter = window.NC.CalculatorRouter || {};
window.NC.CalculatorRouter.configs = window.NC.CalculatorRouter.configs || {};

Object.assign(window.NC.CalculatorRouter.configs, {
  'length-converter': {
    title: 'Length Converter',
    icon: '📏',
    subtitle: 'Convert between standard metric and imperial length units',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Meters (m)', value: 'm' },
          { label: 'Kilometers (km)', value: 'km' },
          { label: 'Centimeters (cm)', value: 'cm' },
          { label: 'Millimeters (mm)', value: 'mm' },
          { label: 'Miles (mi)', value: 'mi' },
          { label: 'Yards (yd)', value: 'yd' },
          { label: 'Feet (ft)', value: 'ft' },
          { label: 'Inches (in)', value: 'in' }
        ],
        default: 'm'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Feet (ft)', value: 'ft' },
          { label: 'Meters (m)', value: 'm' },
          { label: 'Kilometers (km)', value: 'km' },
          { label: 'Centimeters (cm)', value: 'cm' },
          { label: 'Millimeters (mm)', value: 'mm' },
          { label: 'Miles (mi)', value: 'mi' },
          { label: 'Yards (yd)', value: 'yd' },
          { label: 'Inches (in)', value: 'in' }
        ],
        default: 'ft'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Length cannot be negative.' };

      const units = {
        m: 1.0,
        km: 1000.0,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.344,
        yd: 0.9144,
        ft: 0.3048,
        in: 0.0254
      };

      const meters = val * units[from];
      const res = meters / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString(); // removes trailing zeros

      return {
        results: [
          { label: 'Converted Value', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'distance-converter': {
    title: 'Distance Converter',
    icon: '🛣️',
    subtitle: 'Convert between long-range distance units',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Kilometers (km)', value: 'km' },
          { label: 'Miles (mi)', value: 'mi' },
          { label: 'Meters (m)', value: 'm' },
          { label: 'Nautical Miles (nmi)', value: 'nmi' }
        ],
        default: 'km'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Miles (mi)', value: 'mi' },
          { label: 'Kilometers (km)', value: 'km' },
          { label: 'Meters (m)', value: 'm' },
          { label: 'Nautical Miles (nmi)', value: 'nmi' }
        ],
        default: 'mi'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Distance cannot be negative.' };

      const units = {
        m: 1.0,
        km: 1000.0,
        mi: 1609.344,
        nmi: 1852.0
      };

      const meters = val * units[from];
      const res = meters / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Distance', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'height-converter': {
    title: 'Height Converter',
    icon: '📏',
    subtitle: 'Convert height measurements between metric and imperial units',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 170 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Centimeters (cm)', value: 'cm' },
          { label: 'Meters (m)', value: 'm' },
          { label: 'Feet (ft)', value: 'ft' },
          { label: 'Inches (in)', value: 'in' }
        ],
        default: 'cm'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Feet (ft)', value: 'ft' },
          { label: 'Centimeters (cm)', value: 'cm' },
          { label: 'Meters (m)', value: 'm' },
          { label: 'Inches (in)', value: 'in' }
        ],
        default: 'ft'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Height cannot be negative.' };

      const units = {
        cm: 1.0,
        m: 100.0,
        ft: 30.48,
        in: 2.54
      };

      const cm = val * units[from];
      const res = cm / units[to];

      let displayValue = '';
      if (to === 'ft') {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        displayValue = `${feet} ft ${inches} in (${parseFloat(res.toFixed(2))} ft)`;
      } else {
        displayValue = `${parseFloat(res.toFixed(4))} ${to}`;
      }

      return {
        results: [
          { label: 'Converted Height', value: displayValue, highlight: true, raw: true }
        ]
      };
    }
  },

  'weight-converter': {
    title: 'Weight Converter',
    icon: '⚖️',
    subtitle: 'Convert between popular weight and mass units',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Kilograms (kg)', value: 'kg' },
          { label: 'Grams (g)', value: 'g' },
          { label: 'Pounds (lb)', value: 'lb' },
          { label: 'Ounces (oz)', value: 'oz' },
          { label: 'Tons (t)', value: 't' }
        ],
        default: 'kg'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Pounds (lb)', value: 'lb' },
          { label: 'Kilograms (kg)', value: 'kg' },
          { label: 'Grams (g)', value: 'g' },
          { label: 'Ounces (oz)', value: 'oz' },
          { label: 'Tons (t)', value: 't' }
        ],
        default: 'lb'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Weight cannot be negative.' };

      const units = {
        kg: 1.0,
        g: 0.001,
        lb: 0.45359237,
        oz: 0.028349523,
        t: 1000.0
      };

      const kg = val * units[from];
      const res = kg / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Weight', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'mass-converter': {
    title: 'Mass Converter',
    icon: '⚖️',
    subtitle: 'Convert between scientific mass metrics',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Kilograms (kg)', value: 'kg' },
          { label: 'Grams (g)', value: 'g' },
          { label: 'Milligrams (mg)', value: 'mg' },
          { label: 'Pounds (lb)', value: 'lb' },
          { label: 'Ounces (oz)', value: 'oz' },
          { label: 'Stones (st)', value: 'st' }
        ],
        default: 'kg'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Grams (g)', value: 'g' },
          { label: 'Kilograms (kg)', value: 'kg' },
          { label: 'Milligrams (mg)', value: 'mg' },
          { label: 'Pounds (lb)', value: 'lb' },
          { label: 'Ounces (oz)', value: 'oz' },
          { label: 'Stones (st)', value: 'st' }
        ],
        default: 'g'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Mass cannot be negative.' };

      const units = {
        kg: 1.0,
        g: 0.001,
        mg: 0.000001,
        lb: 0.45359237,
        oz: 0.028349523,
        st: 6.35029318
      };

      const kg = val * units[from];
      const res = kg / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Mass', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'temperature-converter': {
    title: 'Temperature Converter',
    icon: '🌡️',
    subtitle: 'Convert values between Celsius, Fahrenheit, and Kelvin scales',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 0 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Celsius (°C)', value: 'C' },
          { label: 'Fahrenheit (°F)', value: 'F' },
          { label: 'Kelvin (K)', value: 'K' }
        ],
        default: 'C'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Fahrenheit (°F)', value: 'F' },
          { label: 'Celsius (°C)', value: 'C' },
          { label: 'Kelvin (K)', value: 'K' }
        ],
        default: 'F'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };

      // Absolute Zero Validation
      if (from === 'C' && val < -273.15) return { error: 'Temperature cannot be below Absolute Zero (-273.15 °C).' };
      if (from === 'F' && val < -459.67) return { error: 'Temperature cannot be below Absolute Zero (-459.67 °F).' };
      if (from === 'K' && val < 0) return { error: 'Temperature cannot be below Absolute Zero (0 K).' };

      let celsius = 0;
      if (from === 'C') celsius = val;
      else if (from === 'F') celsius = (val - 32) * 5/9;
      else if (from === 'K') celsius = val - 273.15;

      let res = 0;
      if (to === 'C') res = celsius;
      else if (to === 'F') res = (celsius * 9/5) + 32;
      else if (to === 'K') res = celsius + 273.15;

      return {
        results: [
          { label: 'Temperature Result', value: `${parseFloat(res.toFixed(3))} °${to === 'K' ? 'K' : to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'area-converter': {
    title: 'Area Converter',
    icon: '📐',
    subtitle: 'Convert between different surface and land area dimensions',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Square Meters (sq m)', value: 'sqm' },
          { label: 'Square Kilometers (sq km)', value: 'sqkm' },
          { label: 'Square Feet (sq ft)', value: 'sqft' },
          { label: 'Square Yards (sq yd)', value: 'sqyd' },
          { label: 'Acres (ac)', value: 'ac' },
          { label: 'Hectares (ha)', value: 'ha' }
        ],
        default: 'sqm'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Square Feet (sq ft)', value: 'sqft' },
          { label: 'Square Meters (sq m)', value: 'sqm' },
          { label: 'Square Kilometers (sq km)', value: 'sqkm' },
          { label: 'Square Yards (sq yd)', value: 'sqyd' },
          { label: 'Acres (ac)', value: 'ac' },
          { label: 'Hectares (ha)', value: 'ha' }
        ],
        default: 'sqft'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Area cannot be negative.' };

      const units = {
        sqm: 1.0,
        sqkm: 1000000.0,
        sqft: 0.09290304,
        sqyd: 0.83612736,
        ac: 4046.8564224,
        ha: 10000.0
      };

      const sqm = val * units[from];
      const res = sqm / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Area', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'volume-converter': {
    title: 'Volume Converter',
    icon: '🥛',
    subtitle: 'Convert physical volumes and capacities',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Cubic Meters (m³)', value: 'cbm' },
          { label: 'Liters (L)', value: 'L' },
          { label: 'Milliliters (mL)', value: 'mL' },
          { label: 'Gallons US (gal)', value: 'gal' },
          { label: 'Quarts US (qt)', value: 'qt' },
          { label: 'Pints US (pt)', value: 'pt' },
          { label: 'Cups US (cup)', value: 'cup' }
        ],
        default: 'L'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Gallons US (gal)', value: 'gal' },
          { label: 'Cubic Meters (m³)', value: 'cbm' },
          { label: 'Liters (L)', value: 'L' },
          { label: 'Milliliters (mL)', value: 'mL' },
          { label: 'Quarts US (qt)', value: 'qt' },
          { label: 'Pints US (pt)', value: 'pt' },
          { label: 'Cups US (cup)', value: 'cup' }
        ],
        default: 'gal'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Volume cannot be negative.' };

      const units = {
        L: 1.0,
        cbm: 1000.0,
        mL: 0.001,
        gal: 3.785411784,
        qt: 0.946352946,
        pt: 0.473176473,
        cup: 0.236588236
      };

      const liters = val * units[from];
      const res = liters / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Volume', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'energy-converter': {
    title: 'Energy Converter',
    icon: '⚡',
    subtitle: 'Convert between different forms of energy and work units',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Joules (J)', value: 'J' },
          { label: 'Kilojoules (kJ)', value: 'kJ' },
          { label: 'Calories (cal)', value: 'cal' },
          { label: 'Kilocalories (kcal)', value: 'kcal' },
          { label: 'Watt-hours (Wh)', value: 'Wh' },
          { label: 'Kilowatt-hours (kWh)', value: 'kWh' }
        ],
        default: 'kJ'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Kilocalories (kcal)', value: 'kcal' },
          { label: 'Joules (J)', value: 'J' },
          { label: 'Kilojoules (kJ)', value: 'kJ' },
          { label: 'Calories (cal)', value: 'cal' },
          { label: 'Watt-hours (Wh)', value: 'Wh' },
          { label: 'Kilowatt-hours (kWh)', value: 'kWh' }
        ],
        default: 'kcal'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Energy cannot be negative.' };

      const units = {
        J: 1.0,
        kJ: 1000.0,
        cal: 4.184,
        kcal: 4184.0,
        Wh: 3600.0,
        kWh: 3600000.0
      };

      const joules = val * units[from];
      const res = joules / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Energy', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'power-converter': {
    title: 'Power Converter',
    icon: '🔌',
    subtitle: 'Convert between different power and heat flow metrics',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Watts (W)', value: 'W' },
          { label: 'Kilowatts (kW)', value: 'kW' },
          { label: 'Megawatts (MW)', value: 'MW' },
          { label: 'Horsepower (hp)', value: 'hp' }
        ],
        default: 'kW'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Horsepower (hp)', value: 'hp' },
          { label: 'Watts (W)', value: 'W' },
          { label: 'Kilowatts (kW)', value: 'kW' },
          { label: 'Megawatts (MW)', value: 'MW' }
        ],
        default: 'hp'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Power cannot be negative.' };

      const units = {
        W: 1.0,
        kW: 1000.0,
        MW: 1000000.0,
        hp: 745.699872
      };

      const watts = val * units[from];
      const res = watts / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Power', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'fuel-consumption-converter': {
    title: 'Fuel Consumption Converter',
    icon: '⛽',
    subtitle: 'Convert between mileage efficiency indicators',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 8 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Liters per 100 km (L/100km)', value: 'L100' },
          { label: 'Miles per Gallon US (mpg)', value: 'mpg' },
          { label: 'Kilometers per Liter (km/L)', value: 'kmL' }
        ],
        default: 'L100'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Miles per Gallon US (mpg)', value: 'mpg' },
          { label: 'Liters per 100 km (L/100km)', value: 'L100' },
          { label: 'Kilometers per Liter (km/L)', value: 'kmL' }
        ],
        default: 'mpg'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val <= 0) return { error: 'Fuel value must be greater than zero.' };

      // Convert to L/100km as baseline
      let l100 = 0;
      if (from === 'L100') l100 = val;
      else if (from === 'mpg') l100 = 235.215 / val;
      else if (from === 'kmL') l100 = 100 / val;

      // Convert from L/100km base to target
      let res = 0;
      if (to === 'L100') res = l100;
      else if (to === 'mpg') res = 235.215 / l100;
      else if (to === 'kmL') res = 100 / l100;

      const formattedRes = parseFloat(res.toFixed(4)).toString();

      return {
        results: [
          { label: 'Efficiency Result', value: `${formattedRes} ${to === 'L100' ? 'L/100km' : to === 'kmL' ? 'km/L' : 'mpg'}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'liquid-volume-converter': {
    title: 'Liquid Volume Converter',
    icon: '💧',
    subtitle: 'Convert between liquid volume units',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Liters (L)', value: 'L' },
          { label: 'Milliliters (mL)', value: 'mL' },
          { label: 'Gallons US (gal)', value: 'gal' },
          { label: 'Fluid Ounces US (fl oz)', value: 'floz' },
          { label: 'Tablespoons US (tbsp)', value: 'tbsp' },
          { label: 'Teaspoons US (tsp)', value: 'tsp' }
        ],
        default: 'L'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Fluid Ounces US (fl oz)', value: 'floz' },
          { label: 'Liters (L)', value: 'L' },
          { label: 'Milliliters (mL)', value: 'mL' },
          { label: 'Gallons US (gal)', value: 'gal' },
          { label: 'Tablespoons US (tbsp)', value: 'tbsp' },
          { label: 'Teaspoons US (tsp)', value: 'tsp' }
        ],
        default: 'floz'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Liquid volume cannot be negative.' };

      const units = {
        L: 1.0,
        mL: 0.001,
        gal: 3.785411784,
        floz: 0.0295735295625,
        tbsp: 0.01478676478125,
        tsp: 0.00492892159375
      };

      const liters = val * units[from];
      const res = liters / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Liquids', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'speed-converter': {
    title: 'Speed Converter',
    icon: '🚗',
    subtitle: 'Convert between different travel and motion speeds',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 60 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Kilometers per Hour (km/h)', value: 'kmh' },
          { label: 'Miles per Hour (mph)', value: 'mph' },
          { label: 'Meters per Second (m/s)', value: 'ms' },
          { label: 'Knots (kt)', value: 'kt' }
        ],
        default: 'kmh'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Miles per Hour (mph)', value: 'mph' },
          { label: 'Kilometers per Hour (km/h)', value: 'kmh' },
          { label: 'Meters per Second (m/s)', value: 'ms' },
          { label: 'Knots (kt)', value: 'kt' }
        ],
        default: 'mph'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Speed cannot be negative.' };

      const units = {
        ms: 1.0,
        kmh: 0.277777777777778, // 1 / 3.6
        mph: 0.44704,
        kt: 0.514444444444444
      };

      const ms = val * units[from];
      const res = ms / units[to];
      const formattedRes = parseFloat(res.toFixed(4)).toString();

      return {
        results: [
          { label: 'Converted Speed', value: `${formattedRes} ${to === 'kmh' ? 'km/h' : to === 'ms' ? 'm/s' : to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'data-storage-converter': {
    title: 'Data Storage Converter',
    icon: '💻',
    subtitle: 'Convert between computer memory and data storage metrics',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Bits (b)', value: 'b' },
          { label: 'Bytes (B)', value: 'B' },
          { label: 'Kilobytes (KB)', value: 'KB' },
          { label: 'Megabytes (MB)', value: 'MB' },
          { label: 'Gigabytes (GB)', value: 'GB' },
          { label: 'Terabytes (TB)', value: 'TB' }
        ],
        default: 'GB'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Megabytes (MB)', value: 'MB' },
          { label: 'Bits (b)', value: 'b' },
          { label: 'Bytes (B)', value: 'B' },
          { label: 'Kilobytes (KB)', value: 'KB' },
          { label: 'Gigabytes (GB)', value: 'GB' },
          { label: 'Terabytes (TB)', value: 'TB' }
        ],
        default: 'MB'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Data size cannot be negative.' };

      const units = {
        b: 0.125,
        B: 1.0,
        KB: 1024.0,
        MB: 1048576.0,
        GB: 1073741824.0,
        TB: 1099511627776.0
      };

      const bytes = val * units[from];
      const res = bytes / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Capacity', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'internet-speed-converter': {
    title: 'Internet Speed Converter',
    icon: '📶',
    subtitle: 'Convert between network transfer rates',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 100 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Kilobits per second (Kbps)', value: 'Kbps' },
          { label: 'Megabits per second (Mbps)', value: 'Mbps' },
          { label: 'Gigabits per second (Gbps)', value: 'Gbps' },
          { label: 'Kilobytes per second (KB/s)', value: 'KBs' },
          { label: 'Megabytes per second (MB/s)', value: 'MBs' }
        ],
        default: 'Mbps'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Megabytes per second (MB/s)', value: 'MBs' },
          { label: 'Kilobits per second (Kbps)', value: 'Kbps' },
          { label: 'Megabits per second (Mbps)', value: 'Mbps' },
          { label: 'Gigabits per second (Gbps)', value: 'Gbps' },
          { label: 'Kilobytes per second (KB/s)', value: 'KBs' }
        ],
        default: 'MBs'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Speed cannot be negative.' };

      const units = {
        Kbps: 1.0,
        Mbps: 1000.0,
        Gbps: 1000000.0,
        KBs: 8.0,
        MBs: 8000.0
      };

      const kbps = val * units[from];
      const res = kbps / units[to];
      const formattedRes = parseFloat(res.toFixed(4)).toString();

      return {
        results: [
          { label: 'Converted Transfer Rate', value: `${formattedRes} ${to === 'KBs' ? 'KB/s' : to === 'MBs' ? 'MB/s' : to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'time-converter': {
    title: 'Time Converter',
    icon: '⏰',
    subtitle: 'Convert between standard units of time',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Seconds (s)', value: 's' },
          { label: 'Minutes (min)', value: 'min' },
          { label: 'Hours (h)', value: 'h' },
          { label: 'Days (d)', value: 'd' },
          { label: 'Weeks (wk)', value: 'wk' },
          { label: 'Years (yr)', value: 'yr' }
        ],
        default: 'h'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Minutes (min)', value: 'min' },
          { label: 'Seconds (s)', value: 's' },
          { label: 'Hours (h)', value: 'h' },
          { label: 'Days (d)', value: 'd' },
          { label: 'Weeks (wk)', value: 'wk' },
          { label: 'Years (yr)', value: 'yr' }
        ],
        default: 'min'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Time cannot be negative.' };

      const units = {
        s: 1.0,
        min: 60.0,
        h: 3600.0,
        d: 86400.0,
        wk: 604800.0,
        yr: 31536000.0
      };

      const seconds = val * units[from];
      const res = seconds / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Time', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'pressure-converter': {
    title: 'Pressure Converter',
    icon: '🌡️',
    subtitle: 'Convert between different atmospheric and engineering pressure metrics',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Pascals (Pa)', value: 'Pa' },
          { label: 'Kilopascals (kPa)', value: 'kPa' },
          { label: 'Bar (bar)', value: 'bar' },
          { label: 'Atmosphere (atm)', value: 'atm' },
          { label: 'Pounds per Square Inch (psi)', value: 'psi' }
        ],
        default: 'bar'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Pounds per Square Inch (psi)', value: 'psi' },
          { label: 'Pascals (Pa)', value: 'Pa' },
          { label: 'Kilopascals (kPa)', value: 'kPa' },
          { label: 'Bar (bar)', value: 'bar' },
          { label: 'Atmosphere (atm)', value: 'atm' }
        ],
        default: 'psi'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Pressure cannot be negative.' };

      const units = {
        Pa: 1.0,
        kPa: 1000.0,
        bar: 100000.0,
        atm: 101325.0,
        psi: 6894.757293168
      };

      const pascals = val * units[from];
      const res = pascals / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Pressure', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'force-converter': {
    title: 'Force Converter',
    icon: '🏋️',
    subtitle: 'Convert between physical force units',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Newtons (N)', value: 'N' },
          { label: 'Kilonewtons (kN)', value: 'kN' },
          { label: 'Pound-force (lbf)', value: 'lbf' },
          { label: 'Dyne (dyn)', value: 'dyn' }
        ],
        default: 'N'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Pound-force (lbf)', value: 'lbf' },
          { label: 'Newtons (N)', value: 'N' },
          { label: 'Kilonewtons (kN)', value: 'kN' },
          { label: 'Dyne (dyn)', value: 'dyn' }
        ],
        default: 'lbf'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Force cannot be negative.' };

      const units = {
        N: 1.0,
        kN: 1000.0,
        lbf: 4.4482216152605,
        dyn: 0.00001
      };

      const newtons = val * units[from];
      const res = newtons / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Force', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'angle-converter': {
    title: 'Angle Converter',
    icon: '📐',
    subtitle: 'Convert angles between degrees, radians, and gradians',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 180 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Degrees (deg)', value: 'deg' },
          { label: 'Radians (rad)', value: 'rad' },
          { label: 'Gradians (grad)', value: 'grad' }
        ],
        default: 'deg'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Radians (rad)', value: 'rad' },
          { label: 'Degrees (deg)', value: 'deg' },
          { label: 'Gradians (grad)', value: 'grad' }
        ],
        default: 'rad'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };

      // Convert to degrees as base
      let deg = 0;
      if (from === 'deg') deg = val;
      else if (from === 'rad') deg = val * (180 / Math.PI);
      else if (from === 'grad') deg = val * 0.9;

      // Convert from degrees to target
      let res = 0;
      if (to === 'deg') res = deg;
      else if (to === 'rad') res = deg * (Math.PI / 180);
      else if (to === 'grad') res = deg / 0.9;

      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Angle', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'frequency-converter': {
    title: 'Frequency Converter',
    icon: '⚡',
    subtitle: 'Convert between Hertz frequencies',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', default: 1000 },
      {
        id: 'from',
        label: 'From Unit',
        type: 'select',
        options: [
          { label: 'Hertz (Hz)', value: 'Hz' },
          { label: 'Kilohertz (kHz)', value: 'kHz' },
          { label: 'Megahertz (MHz)', value: 'MHz' },
          { label: 'Gigahertz (GHz)', value: 'GHz' }
        ],
        default: 'kHz'
      },
      {
        id: 'to',
        label: 'To Unit',
        type: 'select',
        options: [
          { label: 'Hertz (Hz)', value: 'Hz' },
          { label: 'Kilohertz (kHz)', value: 'kHz' },
          { label: 'Megahertz (MHz)', value: 'MHz' },
          { label: 'Gigahertz (GHz)', value: 'GHz' }
        ],
        default: 'Hz'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid number.' };
      if (val < 0) return { error: 'Frequency cannot be negative.' };

      const units = {
        Hz: 1.0,
        kHz: 1000.0,
        MHz: 1000000.0,
        GHz: 1000000000.0
      };

      const hertz = val * units[from];
      const res = hertz / units[to];
      const formattedRes = parseFloat(res.toFixed(6)).toString();

      return {
        results: [
          { label: 'Converted Frequency', value: `${formattedRes} ${to}`, highlight: true, raw: true }
        ]
      };
    }
  },

  'currency-converter': {
    title: 'Currency Converter',
    icon: '💱',
    subtitle: 'Convert between popular world currencies instantly',
    inputs: [
      { id: 'val', label: 'Amount', type: 'number', default: 100 },
      {
        id: 'from',
        label: 'From Currency',
        type: 'select',
        options: [
          { label: 'USD (US Dollar)', value: 'USD' },
          { label: 'INR (Indian Rupee)', value: 'INR' },
          { label: 'EUR (Euro)', value: 'EUR' },
          { label: 'GBP (British Pound)', value: 'GBP' },
          { label: 'AED (UAE Dirham)', value: 'AED' },
          { label: 'CAD (Canadian Dollar)', value: 'CAD' },
          { label: 'AUD (Australian Dollar)', value: 'AUD' },
          { label: 'SGD (Singapore Dollar)', value: 'SGD' },
          { label: 'CNY (Chinese Yuan)', value: 'CNY' },
          { label: 'JPY (Japanese Yen)', value: 'JPY' }
        ],
        default: 'USD'
      },
      {
        id: 'to',
        label: 'To Currency',
        type: 'select',
        options: [
          { label: 'INR (Indian Rupee)', value: 'INR' },
          { label: 'USD (US Dollar)', value: 'USD' },
          { label: 'EUR (Euro)', value: 'EUR' },
          { label: 'GBP (British Pound)', value: 'GBP' },
          { label: 'AED (UAE Dirham)', value: 'AED' },
          { label: 'CAD (Canadian Dollar)', value: 'CAD' },
          { label: 'AUD (Australian Dollar)', value: 'AUD' },
          { label: 'SGD (Singapore Dollar)', value: 'SGD' },
          { label: 'CNY (Chinese Yuan)', value: 'CNY' },
          { label: 'JPY (Japanese Yen)', value: 'JPY' }
        ],
        default: 'INR'
      }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const val = parseFloat(state.val);
      const from = state.from;
      const to = state.to;

      if (isNaN(val)) return { error: 'Please enter a valid amount.' };
      if (val < 0) return { error: 'Amount cannot be negative.' };

      // Reference rates relative to INR
      const rates = {
        INR: 1.0,
        USD: 83.5,
        EUR: 89.5,
        GBP: 105.8,
        AED: 22.7,
        CAD: 61.2,
        AUD: 55.4,
        SGD: 61.8,
        CNY: 11.5,
        JPY: 0.52
      };

      const inrAmt = val * rates[from];
      const converted = inrAmt / rates[to];
      const rateFactor = rates[from] / rates[to];

      return {
        results: [
          { label: 'Converted Amount', value: `${converted.toFixed(2)} ${to}`, highlight: true, raw: true },
          { label: 'Exchange Rate', value: `1 ${from} = ${rateFactor.toFixed(4)} ${to}`, raw: true }
        ]
      };
    }
  },


});
