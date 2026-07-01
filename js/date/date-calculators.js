'use strict';

window.NC = window.NC || {};
window.NC.CalculatorRouter = window.NC.CalculatorRouter || {};
window.NC.CalculatorRouter.configs =
  window.NC.CalculatorRouter.configs || {};

/* =====================================================
   DATE HELPERS
===================================================== */

// Parse YYYY-MM-DD safely
const parseDate = (str) => {
  if (!str) return null;

  const parts = str.split('-');

  const date = new Date(
    parseInt(parts[0]),
    parseInt(parts[1]) - 1,
    parseInt(parts[2])
  );

  date.setHours(0, 0, 0, 0);

  return date;
};

// Today's date without time
const getToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

// Day difference helper
const getDayDifference = (date1, date2) => {
  return Math.round(
    (date2.getTime() - date1.getTime()) /
      86400000
  );
};

// Leap year checker
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0) ||
    year % 400 === 0
  );
};

// Day number in year
const getDayOfYear = (date) => {
  const start = new Date(
    date.getFullYear(),
    0,
    0
  );

  const diff = date - start;

  return Math.round(diff / 86400000);
};

// Exact age calculator
const calculateAge = (dob, target) => {
  let years =
    target.getFullYear() -
    dob.getFullYear();

  let months =
    target.getMonth() -
    dob.getMonth();

  let days =
    target.getDate() -
    dob.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      target.getFullYear(),
      target.getMonth(),
      0
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days
  };
};

// Next birthday calculator
const getNextBirthday = (
  dob,
  today = getToday()
) => {

  let nextBirthday = new Date(
    today.getFullYear(),
    dob.getMonth(),
    dob.getDate()
  );

  nextBirthday.setHours(
    0,
    0,
    0,
    0
  );

  if (
    nextBirthday.getTime() <
    today.getTime()
  ) {
    nextBirthday.setFullYear(
      nextBirthday.getFullYear() + 1
    );
  }

  const totalDays = getDayDifference(
    today,
    nextBirthday
  );

  return {
    nextBirthday,
    totalDays
  };
};

Object.assign(
  window.NC.CalculatorRouter.configs,
  {

    /* =====================================
       AGE CALCULATOR
    ===================================== */

    'age-calculator': {
      title: 'Age Calculator',
      icon: '🎂',
      subtitle:
        'Calculate exact years, months, days, and next birthday',

      inputs: [
        {
          id: 'dob',
          label: 'Date of Birth',
          type: 'date',
          default: '1995-01-01'
        },
        {
          id: 'target',
          label: 'Calculate Age at Date',
          type: 'date',
          default: () =>
            new Date()
              .toISOString()
              .split('T')[0]
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (
          !state.dob ||
          !state.target
        ) {
          return {
            error:
              'Please choose birth and calculation dates'
          };
        }

        const dob =
          parseDate(state.dob);

        const target =
          parseDate(state.target);

        if (target < dob) {
          return {
            error:
              'Target date cannot be before Date of Birth'
          };
        }

        const age =
          calculateAge(
            dob,
            target
          );

        const birthday =
          getNextBirthday(
            dob,
            target
          );

        const bdayMonths =
          Math.floor(
            birthday.totalDays /
              30.43
          );

        const bdayDays =
          Math.round(
            birthday.totalDays %
              30.43
          );

        return {

          results: [

            {
              label:
                'Exact Age',
              value:
                `${age.years} Years, ${age.months} Months, ${age.days} Days`,
              highlight: true,
              raw: true
            },

            {
              label:
                'Next Birthday In',
              value:
                `${bdayMonths} Months, ${bdayDays} Days (${birthday.totalDays} days total)`,
              raw: true
            },

            {
              label:
                'Total Equivalent Months',
              value:
                `${age.years * 12 + age.months} Months`,
              raw: true
            },

            {
              label:
                'Total Equivalent Days',
              value:
                `${getDayDifference(dob, target)} Days`,
              raw: true
            }

          ]
        };
      }
    },
    /* =====================================
       AGE DIFFERENCE CALCULATOR
    ===================================== */

    'age-difference': {
      title: 'Age Difference Calculator',
      icon: '👥',
      subtitle: 'Find the age difference between two people',

      inputs: [
        {
          id: 'dob1',
          label: 'Person 1 Date of Birth',
          type: 'date',
          default: '1990-01-01'
        },
        {
          id: 'dob2',
          label: 'Person 2 Date of Birth',
          type: 'date',
          default: '1995-01-01'
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (!state.dob1 || !state.dob2) {
          return {
            error:
              'Please enter both dates of birth.'
          };
        }

        const d1 = parseDate(state.dob1);
        const d2 = parseDate(state.dob2);

        const older =
          d1 < d2 ? d1 : d2;

        const younger =
          d1 < d2 ? d2 : d1;

        const olderPerson =
          d1 < d2
            ? 'Person 1'
            : 'Person 2';

        const age =
          calculateAge(
            older,
            younger
          );

        const diffDays =
          getDayDifference(
            older,
            younger
          );

        return {

          results: [

            {
              label:
                'Older Person',
              value:
                olderPerson,
              highlight: true,
              raw: true
            },

            {
              label:
                'Age Difference',
              value:
                `${age.years} Years, ${age.months} Months, ${age.days} Days`,
              raw: true
            },

            {
              label:
                'Difference in Days',
              value:
                `${diffDays} Days`,
              raw: true
            }

          ]
        };
      }
    },

    /* =====================================
       BIRTHDAY CALCULATOR
    ===================================== */

    'birthday-calculator': {

      title:
        'Birthday Calculator',

      icon: '🎈',

      subtitle:
        'Find day of week of birth, zodiac, and life milestones',

      inputs: [
        {
          id: 'dob',
          label:
            'Date of Birth',
          type: 'date',
          default:
            '1995-01-01'
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (!state.dob) {
          return {
            error:
              'Please choose birth date'
          };
        }

        const dob =
          parseDate(
            state.dob
          );

        const today =
          getToday();

        const days = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];

        const weekday =
          days[
            dob.getDay()
          ];

        const month =
          dob.getMonth() + 1;

        const day =
          dob.getDate();

        let zodiac = '';

        if (
          (month === 3 && day >= 21) ||
          (month === 4 && day <= 19)
        ) {
          zodiac = 'Aries ♈';
        }
        else if (
          (month === 4 && day >= 20) ||
          (month === 5 && day <= 20)
        ) {
          zodiac = 'Taurus ♉';
        }
        else if (
          (month === 5 && day >= 21) ||
          (month === 6 && day <= 20)
        ) {
          zodiac = 'Gemini ♊';
        }
        else if (
          (month === 6 && day >= 21) ||
          (month === 7 && day <= 22)
        ) {
          zodiac = 'Cancer ♋';
        }
        else if (
          (month === 7 && day >= 23) ||
          (month === 8 && day <= 22)
        ) {
          zodiac = 'Leo ♌';
        }
        else if (
          (month === 8 && day >= 23) ||
          (month === 9 && day <= 22)
        ) {
          zodiac = 'Virgo ♍';
        }
        else if (
          (month === 9 && day >= 23) ||
          (month === 10 && day <= 22)
        ) {
          zodiac = 'Libra ♎';
        }
        else if (
          (month === 10 && day >= 23) ||
          (month === 11 && day <= 21)
        ) {
          zodiac = 'Scorpio ♏';
        }
        else if (
          (month === 11 && day >= 22) ||
          (month === 12 && day <= 21)
        ) {
          zodiac =
            'Sagittarius ♐';
        }
        else if (
          (month === 12 && day >= 22) ||
          (month === 1 && day <= 19)
        ) {
          zodiac =
            'Capricorn ♑';
        }
        else if (
          (month === 1 && day >= 20) ||
          (month === 2 && day <= 18)
        ) {
          zodiac =
            'Aquarius ♒';
        }
        else {
          zodiac =
            'Pisces ♓';
        }

        const animals = [
          'Rat',
          'Ox',
          'Tiger',
          'Rabbit',
          'Dragon',
          'Snake',
          'Horse',
          'Goat',
          'Monkey',
          'Rooster',
          'Dog',
          'Pig'
        ];

        const yearIndex =
          (
            dob.getFullYear() -
            1900
          ) % 12;

        const chineseAnimal =
          animals[
            yearIndex >= 0
              ? yearIndex
              : yearIndex + 12
          ];

        const totalDays =
          getDayDifference(
            dob,
            today
          );

        const totalHours =
          totalDays * 24;

        const heartbeats =
          totalDays *
          24 *
          60 *
          80;

        return {

          results: [

            {
              label:
                'Day You Were Born',
              value:
                weekday,
              highlight: true,
              raw: true
            },

            {
              label:
                'Astrological Zodiac',
              value:
                zodiac,
              raw: true
            },

            {
              label:
                'Chinese Year Animal',
              value:
                chineseAnimal,
              raw: true
            },

            {
              label:
                'Total Hours Lived',
              value:
                totalHours.toLocaleString() +
                ' Hours',
              raw: true
            },

            {
              label:
                'Estimated Heartbeats',
              value:
                heartbeats.toLocaleString(),
              raw: true
            }

          ]
        };
      }
    },

    /* =====================================
       NEXT BIRTHDAY CALCULATOR
    ===================================== */

    'next-birthday': {

      title:
        'Next Birthday Calculator',

      icon: '🎁',

      subtitle:
        'Track exact countdown time to your next birthday',

      inputs: [
        {
          id: 'dob',
          label:
            'Date of Birth',
          type: 'date',
          default:
            '1995-01-01'
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (!state.dob) {
          return {
            error:
              'Please choose birth date'
          };
        }

        const dob =
          parseDate(
            state.dob
          );

        const today =
          getToday();

        const birthday =
          getNextBirthday(
            dob,
            today
          );

        const nextDate =
          birthday.nextBirthday;

        const diffMs =
          nextDate -
          today;

        const hours =
          Math.floor(
            (
              diffMs %
              86400000
            ) /
            3600000
          );

        const minutes =
          Math.floor(
            (
              diffMs %
              3600000
            ) /
            60000
          );

        return {

          results: [

            {
              label:
                'Days Remaining',
              value:
                `${birthday.totalDays} Days`,
              highlight: true,
              raw: true
            },

            {
              label:
                'Detailed Breakdown',
              value:
                `${birthday.totalDays} Days, ${hours} Hours, ${minutes} Minutes`,
              raw: true
            },

            {
              label:
                'Next Birthday Date',
              value:
                nextDate.toDateString(),
              raw: true
            }

          ]
        };
      }
    },
    /* =====================================
       DATE DIFFERENCE CALCULATOR
    ===================================== */

    'date-difference': {

      title: 'Date Difference Calculator',
      icon: '📅',
      subtitle:
        'Calculate chronological span between two dates',

      inputs: [
        {
          id: 'start',
          label: 'Start Date',
          type: 'date',
          default: '2025-01-01'
        },
        {
          id: 'end',
          label: 'End Date',
          type: 'date',
          default: () =>
            new Date()
              .toISOString()
              .split('T')[0]
        },
        {
          id: 'include',
          label:
            'Include end date (+1 day)',
          type: 'select',
          options: [
            {
              label: 'No',
              value: 'no'
            },
            {
              label: 'Yes',
              value: 'yes'
            }
          ],
          default: 'no'
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (
          !state.start ||
          !state.end
        ) {
          return {
            error:
              'Please choose two valid dates'
          };
        }

        let d1 =
          parseDate(
            state.start
          );

        let d2 =
          parseDate(
            state.end
          );

        let reverse = false;

        if (d2 < d1) {
          reverse = true;
          [d1, d2] = [d2, d1];
        }

        let diffDays =
          getDayDifference(
            d1,
            d2
          );

        if (
          state.include ===
          'yes'
        ) {
          diffDays++;
        }

        const weeks =
          Math.floor(
            diffDays / 7
          );

        const remDays =
          diffDays % 7;

        const age =
          calculateAge(
            d1,
            d2
          );

        return {

          results: [

            {
              label:
                'Difference in Days',
              value:
                reverse
                  ? `-${diffDays} Days`
                  : `${diffDays} Days`,
              highlight: true,
              raw: true
            },

            {
              label:
                'Weeks & Days Breakdown',
              value:
                `${weeks} Weeks, ${remDays} Days`,
              raw: true
            },

            {
              label:
                'Calendar Breakdown',
              value:
                `${age.years} Years, ${age.months} Months, ${age.days} Days`,
              raw: true
            }

          ]
        };
      }
    },

    /* =====================================
       DAYS BETWEEN DATES
    ===================================== */

    'days-between-dates': {

      title:
        'Days Between Dates Calculator',

      icon: '🗓️',

      subtitle:
        'Direct count of calendar days between two dates',

      inputs: [
        {
          id: 'start',
          label:
            'Start Date',
          type: 'date',
          default:
            '2025-01-01'
        },
        {
          id: 'end',
          label:
            'End Date',
          type: 'date',
          default: () =>
            new Date()
              .toISOString()
              .split('T')[0]
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (
          !state.start ||
          !state.end
        ) {
          return {
            error:
              'Please enter both dates.'
          };
        }

        const d1 =
          parseDate(
            state.start
          );

        const d2 =
          parseDate(
            state.end
          );

        const diffDays =
          getDayDifference(
            d1,
            d2
          );

        return {

          results: [

            {
              label:
                'Total Calendar Days',
              value:
                `${diffDays} Days`,
              highlight: true,
              raw: true
            },

            {
              label:
                'Equivalent Weeks',
              value:
                `${(
                  diffDays / 7
                ).toFixed(1)} Weeks`,
              raw: true
            }

          ]
        };
      }
    },

    /* =====================================
       TIME DURATION CALCULATOR
    ===================================== */

    'time-duration': {

      title:
        'Time Duration Calculator',

      icon: '⏱️',

      subtitle:
        'Calculate exact time duration between dates and times',

      inputs: [
        {
          id: 'startDate',
          label: 'Start Date',
          type: 'date',
          default: () =>
            new Date()
              .toISOString()
              .split('T')[0]
        },
        {
          id: 'startTime',
          label: 'Start Time',
          type: 'time',
          default: '09:00'
        },
        {
          id: 'endDate',
          label: 'End Date',
          type: 'date',
          default: () =>
            new Date()
              .toISOString()
              .split('T')[0]
        },
        {
          id: 'endTime',
          label: 'End Time',
          type: 'time',
          default: '17:00'
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (
          !state.startDate ||
          !state.startTime ||
          !state.endDate ||
          !state.endTime
        ) {
          return {
            error:
              'Please fill all fields.'
          };
        }

        const d1 =
          parseDate(
            state.startDate
          );

        const t1 =
          state.startTime.split(
            ':'
          );

        d1.setHours(
          parseInt(t1[0]),
          parseInt(t1[1]),
          0,
          0
        );

        const d2 =
          parseDate(
            state.endDate
          );

        const t2 =
          state.endTime.split(
            ':'
          );

        d2.setHours(
          parseInt(t2[0]),
          parseInt(t2[1]),
          0,
          0
        );

        const diffMs =
          d2 - d1;

        if (
          diffMs < 0
        ) {
          return {
            error:
              'End date/time cannot be before start date/time.'
          };
        }

        const totalMinutes =
          Math.floor(
            diffMs /
            60000
          );

        const totalHours =
          Math.floor(
            diffMs /
            3600000
          );

        const days =
          Math.floor(
            totalHours / 24
          );

        const hours =
          totalHours % 24;

        const minutes =
          totalMinutes % 60;

        let text = '';

        if (days > 0) {
          text =
            `${days} Days, ${hours} Hours, ${minutes} Minutes`;
        } else {
          text =
            `${hours} Hours, ${minutes} Minutes`;
        }

        return {

          results: [

            {
              label:
                'Time Duration',
              value:
                text,
              highlight: true,
              raw: true
            },

            {
              label:
                'Total in Hours',
              value:
                `${totalHours} Hours`,
              raw: true
            },

            {
              label:
                'Total in Minutes',
              value:
                `${totalMinutes} Minutes`,
              raw: true
            }

          ]
        };
      }
    },

    /* =====================================
       TIME ZONE CONVERTER
    ===================================== */

    'time-zone-converter': {

      title:
        'Time Zone Converter',

      icon: '🌐',

      subtitle:
        'Convert local time between world time zones',

      inputs: [
        {
          id: 'date',
          label: 'Date',
          type: 'date',
          default: () =>
            new Date()
              .toISOString()
              .split('T')[0]
        },
        {
          id: 'time',
          label: 'Time',
          type: 'time',
          default: '12:00'
        },
        {
          id: 'fromZone',
          label:
            'From Zone Offset',
          type: 'select',
          options: [
            {
              label:
                'UTC (0)',
              value: 0
            },
            {
              label:
                'IST (+5.5)',
              value: 5.5
            },
            {
              label:
                'EST (-5)',
              value: -5
            },
            {
              label:
                'PST (-8)',
              value: -8
            },
            {
              label:
                'JST (+9)',
              value: 9
            }
          ],
          default: 5.5
        },
        {
          id: 'toZone',
          label:
            'To Zone Offset',
          type: 'select',
          options: [
            {
              label:
                'UTC (0)',
              value: 0
            },
            {
              label:
                'IST (+5.5)',
              value: 5.5
            },
            {
              label:
                'EST (-5)',
              value: -5
            },
            {
              label:
                'PST (-8)',
              value: -8
            },
            {
              label:
                'JST (+9)',
              value: 9
            }
          ],
          default: 0
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (
          !state.date ||
          !state.time
        ) {
          return {
            error:
              'Please choose date and time.'
          };
        }

        const d =
          parseDate(
            state.date
          );

        const t =
          state.time.split(
            ':'
          );

        d.setHours(
          parseInt(t[0]),
          parseInt(t[1]),
          0,
          0
        );

        const fromOffset =
          parseFloat(
            state.fromZone
          );

        const toOffset =
          parseFloat(
            state.toZone
          );

        const utc =
          d.getTime() -
          (
            fromOffset *
            3600000
          );

        const target =
          new Date(
            utc +
            (
              toOffset *
              3600000
            )
          );

        return {

          results: [

            {
              label:
                'Converted Time',
              value:
                target.toLocaleString(),
              highlight: true,
              raw: true
            },

            {
              label:
                'Time Difference',
              value:
                `${(
                  toOffset -
                  fromOffset
                ).toFixed(1)} Hours`,
              raw: true
            }

          ]
        };
      }
    },
    /* =====================================
       WORKING DAYS CALCULATOR
    ===================================== */

    'working-days': {
      title: 'Working Days Calculator',
      icon: '💼',
      subtitle: 'Count working days between two dates',

      inputs: [
        {
          id: 'start',
          label: 'Start Date',
          type: 'date',
          default: '2025-01-01'
        },
        {
          id: 'end',
          label: 'End Date',
          type: 'date',
          default: () =>
            new Date()
              .toISOString()
              .split('T')[0]
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (!state.start || !state.end) {
          return {
            error:
              'Please enter both dates.'
          };
        }

        const d1 = parseDate(state.start);
        const d2 = parseDate(state.end);

        if (d2 < d1) {
          return {
            error:
              'End date cannot be before start date.'
          };
        }

        let count = 0;

        const cur = new Date(d1);

        while (cur <= d2) {

          const day = cur.getDay();

          if (day !== 0 && day !== 6) {
            count++;
          }

          cur.setDate(
            cur.getDate() + 1
          );
        }

        const totalDays =
          getDayDifference(d1, d2) + 1;

        return {

          results: [

            {
              label:
                'Working Days Count',
              value:
                `${count} Days`,
              highlight: true,
              raw: true
            },

            {
              label:
                'Total Calendar Days',
              value:
                `${totalDays} Days`,
              raw: true
            },

            {
              label:
                'Weekend Days Excluded',
              value:
                `${totalDays - count} Days`,
              raw: true
            }

          ]
        };
      }
    },

    /* =====================================
       BUSINESS DAYS CALCULATOR
    ===================================== */

    'business-days': {

      title:
        'Business Days Calculator',

      icon: '👔',

      subtitle:
        'Calculate business days excluding weekends and holidays',

      inputs: [
        {
          id: 'start',
          label: 'Start Date',
          type: 'date',
          default: '2025-01-01'
        },
        {
          id: 'end',
          label: 'End Date',
          type: 'date',
          default: () =>
            new Date()
              .toISOString()
              .split('T')[0]
        },
        {
          id: 'holidays',
          label:
            'Holiday Count',
          type: 'number',
          default: 0
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (!state.start || !state.end) {
          return {
            error:
              'Please enter dates.'
          };
        }

        const d1 = parseDate(state.start);
        const d2 = parseDate(state.end);

        const holidays =
          parseInt(
            state.holidays
          ) || 0;

        if (d2 < d1) {
          return {
            error:
              'End date cannot be before start date.'
          };
        }

        let workDays = 0;

        const cur =
          new Date(d1);

        while (cur <= d2) {

          const day =
            cur.getDay();

          if (
            day !== 0 &&
            day !== 6
          ) {
            workDays++;
          }

          cur.setDate(
            cur.getDate() + 1
          );
        }

        const finalDays =
          Math.max(
            0,
            workDays - holidays
          );

        const totalDays =
          getDayDifference(
            d1,
            d2
          ) + 1;

        return {

          results: [

            {
              label:
                'Business Days Count',
              value:
                `${finalDays} Days`,
              highlight: true,
              raw: true
            },

            {
              label:
                'Exclusions',
              value:
                `${totalDays - finalDays} Days`,
              raw: true
            }

          ]
        };
      }
    },

    /* =====================================
       COUNTDOWN CALCULATOR
    ===================================== */

    'countdown-calculator': {

      title:
        'Countdown Calculator',

      icon: '⏳',

      subtitle:
        'Find time remaining until target date',

      inputs: [
        {
          id: 'date',
          label: 'Target Date',
          type: 'date',
          default: '2026-12-31'
        },
        {
          id: 'time',
          label: 'Target Time',
          type: 'time',
          default: '00:00'
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (!state.date || !state.time) {
          return {
            error:
              'Please select date and time.'
          };
        }

        const target =
          parseDate(state.date);

        const t =
          state.time.split(':');

        target.setHours(
          parseInt(t[0]),
          parseInt(t[1]),
          0,
          0
        );

        const now =
          new Date();

        const diffMs =
          target - now;

        if (diffMs < 0) {
          return {
            error:
              'Target time already passed.'
          };
        }

        const diffDays =
          Math.floor(
            diffMs / 86400000
          );

        const hours =
          Math.floor(
            (diffMs % 86400000) /
            3600000
          );

        const minutes =
          Math.floor(
            (diffMs % 3600000) /
            60000
          );

        return {

          results: [

            {
              label:
                'Time Remaining',
              value:
                `${diffDays} Days, ${hours} Hours, ${minutes} Minutes`,
              highlight: true,
              raw: true
            },

            {
              label:
                'Total Hours',
              value:
                `${Math.floor(diffMs / 3600000)} Hours`,
              raw: true
            }

          ]
        };
      }
    },

    /* =====================================
       EVENT COUNTDOWN
    ===================================== */

    'event-countdown': {

      title:
        'Event Countdown Calculator',

      icon: '📣',

      subtitle:
        'Countdown to events',

      inputs: [
        {
          id: 'event',
          label: 'Event',
          type: 'select',
          options: [
            {
              label:
                'New Year (Jan 1)',
              value: 'newyear'
            },
            {
              label:
                'Christmas',
              value: 'christmas'
            },
            {
              label:
                'Halloween',
              value: 'halloween'
            },
            {
              label:
                'Custom Goal',
              value: 'custom'
            }
          ],
          default: 'newyear'
        },
        {
          id: 'customDate',
          label:
            'Custom Date',
          type: 'date',
          default: () =>
            new Date()
              .toISOString()
              .split('T')[0]
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        const today =
          getToday();

        let target;

        if (state.event === 'newyear') {

          target =
            new Date(
              today.getFullYear() + 1,
              0,
              1
            );

        } else if (
          state.event === 'christmas'
        ) {

          target =
            new Date(
              today.getFullYear(),
              11,
              25
            );

          if (target < today) {
            target.setFullYear(
              target.getFullYear() + 1
            );
          }

        } else if (
          state.event === 'halloween'
        ) {

          target =
            new Date(
              today.getFullYear(),
              9,
              31
            );

          if (target < today) {
            target.setFullYear(
              target.getFullYear() + 1
            );
          }

        } else {

          if (!state.customDate) {
            return {
              error:
                'Please select custom date.'
            };
          }

          target =
            parseDate(
              state.customDate
            );

          if (target < today) {
            return {
              error:
                'Date must be in future.'
            };
          }
        }

        const diffDays =
          getDayDifference(
            today,
            target
          );

        return {

          results: [

            {
              label:
                'Days Remaining',
              value:
                `${diffDays} Days`,
              highlight: true,
              raw: true
            },

            {
              label:
                'Target Date',
              value:
                target.toDateString(),
              raw: true
            }

          ]
        };
      }
    },

    /* =====================================
       DAY OF WEEK CALCULATOR
    ===================================== */

    'day-of-week': {

      title:
        'Day of Week Calculator',

      icon: '🗓️',

      subtitle:
        'Find the day for any date',

      inputs: [
        {
          id: 'date',
          label: 'Date',
          type: 'date',
          default: () =>
            new Date()
              .toISOString()
              .split('T')[0]
        }
      ],

      hasChart: false,
      hasTable: false,

      calculate(state) {

        if (!state.date) {
          return {
            error:
              'Please select date.'
          };
        }

        const d =
          parseDate(
            state.date
          );

        const days = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];

        const leap =
          isLeapYear(
            d.getFullYear()
          );

        const dayNumber =
          getDayOfYear(d);

        return {

          results: [

            {
              label:
                'Day of Week',
              value:
                days[d.getDay()],
              highlight: true,
              raw: true
            },

            {
              label:
                'Year Status',
              value:
                leap
                  ? 'Leap Year'
                  : 'Regular Year',
              raw: true
            },

            {
              label:
                'Day Number',
              value:
                `${dayNumber} / ${leap ? 366 : 365}`,
              raw: true
            }

          ]
        };
      }
    }

  }

);