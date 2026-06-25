'use strict';

window.NC = window.NC || {};
window.NC.CalculatorRouter = window.NC.CalculatorRouter || {};
window.NC.CalculatorRouter.configs = window.NC.CalculatorRouter.configs || {};

// Helper to parse date string without timezone shifts
const parseDate = (str) => {
  if (!str) return null;
  const parts = str.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
};

Object.assign(window.NC.CalculatorRouter.configs, {
  'age-calculator': {
    title: 'Age Calculator',
    icon: '🎂',
    subtitle: 'Calculate exact years, months, days, and next birthday',
    inputs: [
      { id: 'dob', label: 'Date of Birth', type: 'date', default: '1995-01-01' },
      { id: 'target', label: 'Calculate Age at Date', type: 'date', default: () => new Date().toISOString().split('T')[0] }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.dob || !state.target) return { error: 'Please choose birth and calculation dates' };
      
      const dob = parseDate(state.dob);
      const target = parseDate(state.target);

      if (target < dob) return { error: 'Target date cannot be before Date of Birth' };

      let years = target.getFullYear() - dob.getFullYear();
      let months = target.getMonth() - dob.getMonth();
      let days = target.getDate() - dob.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const nextBday = new Date(target.getFullYear(), dob.getMonth(), dob.getDate());
      if (nextBday < target) {
        nextBday.setFullYear(nextBday.getFullYear() + 1);
      }
      const diffMs = nextBday - target;
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const bdayMonths = Math.floor(diffDays / 30.43);
      const bdayDays = Math.ceil(diffDays % 30.43);

      return {
        results: [
          { label: 'Exact Age', value: `${years} Years, ${months} Months, ${days} Days`, highlight: true, raw: true },
          { label: 'Next Birthday In', value: `${bdayMonths} Months, ${bdayDays} Days (${diffDays} days total)`, raw: true },
          { label: 'Total Equivalent Months', value: `${(years * 12 + months)} Months`, raw: true },
          { label: 'Total Equivalent Days', value: `${Math.floor((target - dob) / (1000*60*60*24))} Days`, raw: true }
        ]
      };
    }
  },

  'age-difference': {
    title: 'Age Difference Calculator',
    icon: '👥',
    subtitle: 'Find the age difference between two people',
    inputs: [
      { id: 'dob1', label: 'Person 1 Date of Birth', type: 'date', default: '1990-01-01' },
      { id: 'dob2', label: 'Person 2 Date of Birth', type: 'date', default: '1995-01-01' }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.dob1 || !state.dob2) return { error: 'Please enter both dates of birth.' };
      
      const d1 = parseDate(state.dob1);
      const d2 = parseDate(state.dob2);

      let older = d1 < d2 ? d1 : d2;
      let younger = d1 < d2 ? d2 : d1;
      const personLabel = d1 < d2 ? 'Person 1' : 'Person 2';

      let years = younger.getFullYear() - older.getFullYear();
      let months = younger.getMonth() - older.getMonth();
      let days = younger.getDate() - older.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(younger.getFullYear(), younger.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const diffDays = Math.floor((younger - older) / (1000 * 60 * 60 * 24));

      return {
        results: [
          { label: 'Older Person', value: personLabel === 'Person 1' ? 'Person 1' : 'Person 2', highlight: true, raw: true },
          { label: 'Age Difference', value: `${years} Years, ${months} Months, ${days} Days`, raw: true },
          { label: 'Difference in Days', value: `${diffDays} Days`, raw: true }
        ]
      };
    }
  },

  'birthday-calculator': {
    title: 'Birthday Calculator',
    icon: '🎈',
    subtitle: 'Find day of week of birth, zodiac, and life milestones',
    inputs: [
      { id: 'dob', label: 'Date of Birth', type: 'date', default: '1995-01-01' }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.dob) return { error: 'Please choose birth date' };
      const dob = parseDate(state.dob);
      const today = new Date();

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const weekday = days[dob.getDay()];

      // Zodiac logic
      const month = dob.getMonth() + 1;
      const day = dob.getDate();
      let zodiac = '';
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiac = 'Aries ♈';
      else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiac = 'Taurus ♉';
      else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiac = 'Gemini ♊';
      else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiac = 'Cancer ♋';
      else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiac = 'Leo ♌';
      else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiac = 'Virgo ♍';
      else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiac = 'Libra ♎';
      else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiac = 'Scorpio ♏';
      else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiac = 'Sagittarius ♐';
      else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiac = 'Capricorn ♑';
      else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiac = 'Aquarius ♒';
      else zodiac = 'Pisces ♓';

      // Chinese zodiac animals
      const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
      const cycleStartYear = 1900; // 1900 is Rat year
      const yearIndex = (dob.getFullYear() - cycleStartYear) % 12;
      const chineseAnimal = animals[yearIndex >= 0 ? yearIndex : (12 + yearIndex)];

      const totalDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
      const totalHours = totalDays * 24;
      const heartbeats = totalDays * 24 * 60 * 80; // est 80 bpm

      return {
        results: [
          { label: 'Day You Were Born', value: weekday, highlight: true, raw: true },
          { label: 'Astrological Zodiac', value: zodiac, raw: true },
          { label: 'Chinese Year Animal', value: chineseAnimal, raw: true },
          { label: 'Total Hours Lived', value: totalHours.toLocaleString() + ' Hours', raw: true },
          { label: 'Estimated Heartbeats', value: heartbeats.toLocaleString(), raw: true }
        ]
      };
    }
  },

  'next-birthday': {
    title: 'Next Birthday Calculator',
    icon: '🎁',
    subtitle: 'Track exact countdown time to your next birthday',
    inputs: [
      { id: 'dob', label: 'Date of Birth', type: 'date', default: '1995-01-01' }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.dob) return { error: 'Please choose birth date' };
      const dob = parseDate(state.dob);
      const today = new Date();

      const nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
      if (nextBday < today) {
        nextBday.setFullYear(nextBday.getFullYear() + 1);
      }

      const diffMs = nextBday - today;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      return {
        results: [
          { label: 'Days Remaining', value: `${diffDays} Days`, highlight: true, raw: true },
          { label: 'Detailed Breakdown', value: `${diffDays} Days, ${hours} Hours, ${minutes} Minutes`, raw: true },
          { label: 'Next Birthday Date', value: nextBday.toDateString(), raw: true }
        ]
      };
    }
  },

  'date-difference': {
    title: 'Date Difference Calculator',
    icon: '📅',
    subtitle: 'Calculate chronological span between two dates',
    inputs: [
      { id: 'start', label: 'Start Date', type: 'date', default: '2025-01-01' },
      { id: 'end', label: 'End Date', type: 'date', default: () => new Date().toISOString().split('T')[0] },
      { id: 'include', label: 'Include end date (+1 day)', type: 'select', options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ], default: 'no' }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.start || !state.end) return { error: 'Please choose two valid dates' };
      const d1 = parseDate(state.start);
      const d2 = parseDate(state.end);
      
      let diffMs = d2 - d1;
      if (state.include === 'yes') {
        diffMs += (1000 * 60 * 60 * 24);
      }

      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const absDays = Math.abs(diffDays);

      const weeks = Math.floor(absDays / 7);
      const remDays = absDays % 7;

      let years = d2.getFullYear() - d1.getFullYear();
      let months = d2.getMonth() - d1.getMonth();
      let days = d2.getDate() - d1.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      return {
        results: [
          { label: 'Difference in Days', value: `${diffDays} Days`, highlight: true, raw: true },
          { label: 'Weeks & Days Breakdown', value: `${weeks} Weeks, ${remDays} Days`, raw: true },
          { label: 'Calendar Breakdown', value: `${years} Years, ${months} Months, ${days} Days`, raw: true }
        ]
      };
    }
  },

  'days-between-dates': {
    title: 'Days Between Dates Calculator',
    icon: '🗓️',
    subtitle: 'Direct count of calendar days between two dates',
    inputs: [
      { id: 'start', label: 'Start Date', type: 'date', default: '2025-01-01' },
      { id: 'end', label: 'End Date', type: 'date', default: () => new Date().toISOString().split('T')[0] }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.start || !state.end) return { error: 'Please enter both dates.' };
      const d1 = parseDate(state.start);
      const d2 = parseDate(state.end);

      const diffMs = d2 - d1;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      return {
        results: [
          { label: 'Total Calendar Days', value: `${diffDays} Days`, highlight: true, raw: true },
          { label: 'Equivalent Weeks', value: `${(diffDays / 7).toFixed(1)} Weeks`, raw: true }
        ]
      };
    }
  },

  'time-duration': {
    title: 'Time Duration Calculator',
    icon: '⏱️',
    subtitle: 'Calculate exact time duration between dates and times',
    inputs: [
      { id: 'startDate', label: 'Start Date', type: 'date', default: () => new Date().toISOString().split('T')[0] },
      { id: 'startTime', label: 'Start Time', type: 'time', default: '09:00' },
      { id: 'endDate', label: 'End Date', type: 'date', default: () => new Date().toISOString().split('T')[0] },
      { id: 'endTime', label: 'End Time', type: 'time', default: '17:00' }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.startDate || !state.startTime || !state.endDate || !state.endTime) {
        return { error: 'Please fill out all start and end date/time fields.' };
      }

      const d1 = parseDate(state.startDate);
      const t1 = state.startTime.split(':');
      d1.setHours(parseInt(t1[0]), parseInt(t1[1]), 0, 0);

      const d2 = parseDate(state.endDate);
      const t2 = state.endTime.split(':');
      d2.setHours(parseInt(t2[0]), parseInt(t2[1]), 0, 0);

      const diffMs = d2 - d1;
      if (diffMs < 0) return { error: 'End date/time cannot be before start date/time.' };

      const totalHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const totalMins = Math.floor(diffMs / (1000 * 60));
      
      const days = Math.floor(totalHrs / 24);
      const hours = totalHrs % 24;
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      let spanText = '';
      if (days > 0) {
        spanText = `${days} Days, ${hours} Hours, ${minutes} Minutes`;
      } else {
        spanText = `${hours} Hours, ${minutes} Minutes`;
      }

      return {
        results: [
          { label: 'Time Duration', value: spanText, highlight: true, raw: true },
          { label: 'Total in Hours', value: `${totalHrs} Hours`, raw: true },
          { label: 'Total in Minutes', value: `${totalMins} Minutes`, raw: true }
        ]
      };
    }
  },

  'time-zone-converter': {
    title: 'Time Zone Converter',
    icon: '🌐',
    subtitle: 'Convert a local time to different global time zones',
    inputs: [
      { id: 'date', label: 'Date', type: 'date', default: () => new Date().toISOString().split('T')[0] },
      { id: 'time', label: 'Time', type: 'time', default: '12:00' },
      { id: 'fromZone', label: 'From Zone Offset (Hours from UTC)', type: 'select', options: [
        { label: 'UTC / GMT (0)', value: 0 },
        { label: 'EST / New York (-5)', value: -5 },
        { label: 'PST / Los Angeles (-8)', value: -8 },
        { label: 'GMT / London (0)', value: 0 },
        { label: 'CET / Paris (+1)', value: 1 },
        { label: 'IST / India (+5.5)', value: 5.5 },
        { label: 'JST / Tokyo (+9)', value: 9 },
        { label: 'AEDT / Sydney (+11)', value: 11 }
      ], default: 5.5 },
      { id: 'toZone', label: 'To Zone Offset (Hours from UTC)', type: 'select', options: [
        { label: 'UTC / GMT (0)', value: 0 },
        { label: 'EST / New York (-5)', value: -5 },
        { label: 'PST / Los Angeles (-8)', value: -8 },
        { label: 'GMT / London (0)', value: 0 },
        { label: 'CET / Paris (+1)', value: 1 },
        { label: 'IST / India (+5.5)', value: 5.5 },
        { label: 'JST / Tokyo (+9)', value: 9 },
        { label: 'AEDT / Sydney (+11)', value: 11 }
      ], default: 0 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.date || !state.time) return { error: 'Please choose date and time.' };

      const d = parseDate(state.date);
      const t = state.time.split(':');
      d.setHours(parseInt(t[0]), parseInt(t[1]), 0, 0);

      const fromOffset = parseFloat(state.fromZone);
      const toOffset = parseFloat(state.toZone);

      // Convert to UTC first
      const utcMs = d.getTime() - (fromOffset * 60 * 60 * 1000);
      // Convert to target zone
      const targetDate = new Date(utcMs + (toOffset * 60 * 60 * 1000));

      const formatTime = (dateObj) => {
        let hrs = dateObj.getHours();
        const mins = dateObj.getMinutes().toString().padStart(2, '0');
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12;
        return `${hrs}:${mins} ${ampm}`;
      };

      return {
        results: [
          { label: 'Converted Time', value: `${formatTime(targetDate)} (${targetDate.toLocaleDateString()})`, highlight: true, raw: true },
          { label: 'Time Difference', value: `${(toOffset - fromOffset).toFixed(1)} Hours`, raw: true }
        ]
      };
    }
  },

  'working-days': {
    title: 'Working Days Calculator',
    icon: '💼',
    subtitle: 'Count the number of working days between two dates',
    inputs: [
      { id: 'start', label: 'Start Date', type: 'date', default: '2025-01-01' },
      { id: 'end', label: 'End Date', type: 'date', default: () => new Date().toISOString().split('T')[0] }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.start || !state.end) return { error: 'Please enter both dates.' };

      const d1 = parseDate(state.start);
      const d2 = parseDate(state.end);

      if (d2 < d1) return { error: 'End date cannot be before start date.' };

      let count = 0;
      const cur = new Date(d1.getTime());
      while (cur <= d2) {
        const day = cur.getDay();
        if (day !== 0 && day !== 6) { // exclude Sat & Sun
          count++;
        }
        cur.setDate(cur.getDate() + 1);
      }

      const totalDays = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;

      return {
        results: [
          { label: 'Working Days Count', value: `${count} Days`, highlight: true, raw: true },
          { label: 'Total Calendar Days', value: `${totalDays} Days`, raw: true },
          { label: 'Weekend Days Excluded', value: `${totalDays - count} Days`, raw: true }
        ]
      };
    }
  },

  'business-days': {
    title: 'Business Days Calculator',
    icon: '👔',
    subtitle: 'Calculate business days excluding weekends and custom holidays',
    inputs: [
      { id: 'start', label: 'Start Date', type: 'date', default: '2025-01-01' },
      { id: 'end', label: 'End Date', type: 'date', default: () => new Date().toISOString().split('T')[0] },
      { id: 'holidays', label: 'Holidays Count (to exclude)', type: 'number', default: 0 }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.start || !state.end) return { error: 'Please enter start and end dates.' };
      const d1 = parseDate(state.start);
      const d2 = parseDate(state.end);
      const hCount = parseInt(state.holidays) || 0;

      if (d2 < d1) return { error: 'End date cannot be before start date.' };
      if (hCount < 0) return { error: 'Holidays cannot be negative.' };

      let workDays = 0;
      const cur = new Date(d1.getTime());
      while (cur <= d2) {
        const day = cur.getDay();
        if (day !== 0 && day !== 6) {
          workDays++;
        }
        cur.setDate(cur.getDate() + 1);
      }

      const finalBusinessDays = Math.max(0, workDays - hCount);
      const totalDays = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;

      return {
        results: [
          { label: 'Business Days Count', value: `${finalBusinessDays} Days`, highlight: true, raw: true },
          { label: 'Exclusions (Weekends + Holidays)', value: `${totalDays - finalBusinessDays} Days`, raw: true }
        ]
      };
    }
  },

  'countdown-calculator': {
    title: 'Countdown Calculator',
    icon: '⏳',
    subtitle: 'Find time remaining until a target date-time',
    inputs: [
      { id: 'date', label: 'Target Date', type: 'date', default: '2026-12-31' },
      { id: 'time', label: 'Target Time', type: 'time', default: '00:00' }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.date || !state.time) return { error: 'Please select target date and time.' };

      const target = parseDate(state.date);
      const t = state.time.split(':');
      target.setHours(parseInt(t[0]), parseInt(t[1]), 0, 0);

      const now = new Date();
      const diffMs = target - now;

      if (diffMs < 0) return { error: 'Target time has already passed!' };

      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      return {
        results: [
          { label: 'Time Remaining', value: `${diffDays} Days, ${hours} Hours, ${minutes} Minutes`, highlight: true, raw: true },
          { label: 'Total Equivalent Hours', value: `${Math.floor(diffMs / (1000*60*60))} Hours`, raw: true }
        ]
      };
    }
  },

  'event-countdown': {
    title: 'Event Countdown Calculator',
    icon: '📣',
    subtitle: 'Find exact days remaining to popular annual events or custom goals',
    inputs: [
      { id: 'event', label: 'Choose Event', type: 'select', options: [
        { label: 'New Year (Jan 1)', value: 'newyear' },
        { label: 'Christmas (Dec 25)', value: 'christmas' },
        { label: 'Halloween (Oct 31)', value: 'halloween' },
        { label: 'Custom Goal Date', value: 'custom' }
      ], default: 'newyear' },
      { id: 'customDate', label: 'Custom Date (Only for Custom Goal option)', type: 'date', default: () => new Date().toISOString().split('T')[0] }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      const event = state.event;
      const today = new Date();
      let target = null;

      if (event === 'newyear') {
        target = new Date(today.getFullYear() + 1, 0, 1);
      } else if (event === 'christmas') {
        target = new Date(today.getFullYear(), 11, 25);
        if (target < today) target.setFullYear(target.getFullYear() + 1);
      } else if (event === 'halloween') {
        target = new Date(today.getFullYear(), 9, 31);
        if (target < today) target.setFullYear(target.getFullYear() + 1);
      } else {
        if (!state.customDate) return { error: 'Please choose a custom target date.' };
        target = parseDate(state.customDate);
        if (target < today) return { error: 'Custom target date must be in the future.' };
      }

      const diffMs = target - today;
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      return {
        results: [
          { label: 'Days Remaining', value: `${diffDays} Days`, highlight: true, raw: true },
          { label: 'Event Target Date', value: target.toDateString(), raw: true }
        ]
      };
    }
  },

  'day-of-week': {
    title: 'Day of Week Calculator',
    icon: '🗓️',
    subtitle: 'Find out the day of the week for any target date',
    inputs: [
      { id: 'date', label: 'Target Date', type: 'date', default: () => new Date().toISOString().split('T')[0] }
    ],
    hasChart: false,
    hasTable: false,
    calculate(state) {
      if (!state.date) return { error: 'Please select a date' };
      const d = parseDate(state.date);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      const yr = d.getFullYear();
      const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || (yr % 400 === 0);

      const start = new Date(d.getFullYear(), 0, 0);
      const diff = d - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayNo = Math.floor(diff / oneDay);

      return {
        results: [
          { label: 'Day of the Week', value: days[d.getDay()], highlight: true, raw: true },
          { label: 'Year leap status', value: isLeap ? 'Leap Year' : 'Regular Year', raw: true },
          { label: 'Day number of year', value: `${dayNo} / 365`, raw: true }
        ]
      };
    }
  }
});
