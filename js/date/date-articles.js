'use strict';

window.NC_ARTICLES = window.NC_ARTICLES || {};

Object.assign(window.NC_ARTICLES, {
  'age-calculator': `
    <h2>Introduction to Age Calculation</h2>
    <p>The Age Calculator determines the exact duration of a person's life from their moment of birth to a target date. It calculates time in years, months, weeks, days, hours, and minutes, helping plan birthdays, legal milestones, or clinical developmental stages.</p>
    
    <h3>The Age Calculation Formula</h3>
    <div class="formula-box">
      Years = Target Year - Birth Year<br>
      Months = Target Month - Birth Month (adjusted for negative days)<br>
      Days = Target Day - Birth Day (adjusted using days in previous month if negative)
    </div>
    
    <h3>Example Calculation</h3>
    <p>For a birth date of January 15, 1995, and a target date of March 10, 2026:
    <br><strong>Base Years:</strong> 2026 - 1995 = 31 Years.
    <br><strong>Base Months:</strong> 2 - 0 = 2 Months (Since March is Month 2 and Jan is Month 0).
    <br><strong>Days adjustment:</strong> 10 - 15 = -5 days. Since days are negative, borrow from February (28 days): Months becomes 1 Month, and Days becomes 28 - 5 = 23 Days.
    <br><strong>Exact Age:</strong> 31 Years, 1 Month, 23 Days.</p>
    
    <h3>Practical Use Cases</h3>
    <ul>
      <li><strong>Legal Milestones:</strong> Determining exact age of majority (18 or 21) for contracts or voting.</li>
      <li><strong>School Admissions:</strong> Verifying children's age qualifications for grade levels.</li>
      <li><strong>Medical Records:</strong> Calculating pediatric age brackets for vaccine schedules.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How does leap years affect age calculations?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Leap years add a 29th day to February every 4 years. The calculator automatically tracks leap years when converting total age to equivalent elapsed days.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What age is calculated for people born on February 29?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            For individuals born on a leap day (Feb 29), their age increases on February 28 or March 1 in non-leap years depending on local legal customs. The calculator uses calendar dates literally.
          </div>
        </div>
      </div>
    </div>
  `,

  'age-difference': `
    <h2>Comparing Ages Between Individuals</h2>
    <p>This calculator determines the age gap between two people based on their birth dates. It is commonly used by couples, siblings, genealogists, or colleagues to see the exact time spacing between births.</p>
    
    <h3>The Age Difference Formula</h3>
    <div class="formula-box">Age Difference = |Birth Date 1 - Birth Date 2|</div>
    
    <h3>Example Calculation</h3>
    <p>If Person 1 was born on June 10, 1990, and Person 2 was born on September 25, 1994:
    <br><strong>Older Person:</strong> Person 1 (June 1990)
    <br><strong>Chronological Gap:</strong> 4 Years, 3 Months, 15 Days (equivalent to 1,568 elapsed calendar days).</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Family Trees:</strong> Finding the exact birth spacing between siblings or parent-child generations.</li>
      <li><strong>School Brackets:</strong> Comparing age differences between children in sports leagues.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Does the order of inputs matter?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No, the calculator takes the absolute difference between the dates, so entering Person 1 or Person 2 first will yield the same duration difference.
          </div>
        </div>
      </div>
    </div>
  `,

  'birthday-calculator': `
    <h2>Zodiac Signs and Birthday Milestones</h2>
    <p>Discover historical, astrological, and numerical facts about your birthday. This calculator reveals the day of the week you were born, your astrological signs, and large milestone counts (like how many hours you have been alive).</p>
    
    <h3>Milestone Formulas</h3>
    <div class="formula-box">
      Total Days Lived = Current Date - Birth Date<br>
      Total Hours Lived = Total Days Lived × 24<br>
      Estimated Heartbeats = Total Minutes Lived × Average Heart Rate (e.g. 80 bpm)
    </div>
    
    <h3>Example Calculation</h3>
    <p>For a birth date of January 1, 2000, checked on June 25, 2026:
    <br><strong>Total Days Lived:</strong> 9,672 Days.
    <br><strong>Total Hours Lived:</strong> 9,672 × 24 = 232,128 Hours.
    <br><strong>Estimated Heartbeats:</strong> 232,128 × 60 × 80 = 1,114,214,400 beats.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Personal Fun Facts:</strong> Discovering your Chinese zodiac animal and astrological sign.</li>
      <li><strong>Biometrics:</strong> Estimating biological indicators (e.g., total breaths or heartbeats over a lifetime).</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What determines the Chinese Zodiac Animal?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            The Chinese Zodiac is based on a 12-year lunar cycle. Each year in the cycle is associated with an animal (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig).
          </div>
        </div>
      </div>
    </div>
  `,

  'next-birthday': `
    <h2>Countdown to Your Next Birthday</h2>
    <p>Calculate the exact time remaining until your next birthday. This tool helps plan celebrations and displays a real-time countdown down to the hour and minute.</p>
    
    <h3>The Birthday Countdown Formula</h3>
    <div class="formula-box">
      Next Birthday = Date(Current Year, Birth Month, Birth Day)<br>
      If Next Birthday is in the past, add 1 to the Current Year.<br>
      Remaining Time = Next Birthday - Current Date-Time
    </div>
    
    <h3>Example Calculation</h3>
    <p>If today is June 25, 2026, and your birthday is August 10:
    <br><strong>Next Birthday:</strong> August 10, 2026.
    <br><strong>Days Remaining:</strong> 46 Days (plus remaining hours/minutes).</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Event Planning:</strong> Planning parties, invitations, and bookings in advance.</li>
      <li><strong>Gift Countdowns:</strong> Creating anticipation and countdown cards for friends.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I check a birthday countdown for future years?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            The calculator defaults to the next immediate birthday relative to today. To check a future countdown, you can track it using general event countdown widgets.
          </div>
        </div>
      </div>
    </div>
  `,

  'date-difference': `
    <h2>Calculating Spans Between Dates</h2>
    <p>The Date Difference Calculator measures the duration between any two dates. It provides outputs in total days, weeks, months, or years, serving project managers, legal workers, and schedule planners.</p>
    
    <h3>The Date Span Formula</h3>
    <div class="formula-box">
      Duration (days) = End Date - Start Date (in milliseconds / 86,400,000)<br>
      Optional Moratorium: Add 1 day if including the end date.
    </div>
    
    <h3>Example Calculation</h3>
    <p>From January 1, 2025, to June 25, 2026 (excluding end date):
    <br><strong>Total Days:</strong> 540 Days.
    <br><strong>Weeks Breakdown:</strong> 540 / 7 = 77 Weeks and 1 Day.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Project Schedules:</strong> Tracking milestones, deadlines, and project duration parameters.</li>
      <li><strong>Lease Tenures:</strong> Checking exact tenancy spans to calculate pro-rated rent bills.</li>
      <li><strong>Financial Accruals:</strong> Computing interest periods for term deposits.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What does including the end date mean?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            By default, date math calculates the duration between dates (End Date - Start Date). Including the end date adds 1 day to represent the full duration of both calendar days (e.g. Mon to Wed is 2 days difference, but 3 days if both are included).
          </div>
        </div>
      </div>
    </div>
  `,

  'days-between-dates': `
    <h2>Count Calendar Days Directly</h2>
    <p>This tool provides a direct, uncomplicated count of the total number of calendar days between any start and end date, without complex sub-breakdowns.</p>
    
    <h3>The Calculation Method</h3>
    <div class="formula-box">Days = (End Date MS - Start Date MS) / 86,400,000</div>
    
    <h3>Example Calculation</h3>
    <p>From March 15 to May 10 in a standard year:
    <br><strong>Days:</strong> 56 Days.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Habit Tracking:</strong> Counting consecutive streaks of daily activities.</li>
      <li><strong>Travel Booking:</strong> Verifying total trip length before purchasing hotel bookings.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Does the calculator account for daylight saving time (DST) shifts?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes. The calculator uses UTC/local day offsets which handle 23-hour and 25-hour days smoothly, maintaining accurate calendar day counts.
          </div>
        </div>
      </div>
    </div>
  `,

  'time-duration': `
    <h2>Calculating Time Durations</h2>
    <p>The Time Duration Calculator computes the exact hours, minutes, and seconds between two timestamps across multiple days. It helps track work shifts, flight lengths, or study sessions.</p>
    
    <h3>The Duration Formula</h3>
    <div class="formula-box">Duration (seconds) = Timestamp 2 - Timestamp 1</div>
    
    <h3>Example Calculation</h3>
    <p>From June 25, 9:00 AM to June 25, 5:30 PM:
    <br><strong>Hours:</strong> 17:30 - 09:00 = 8 Hours and 30 Minutes.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Timesheet Logging:</strong> Calculating employee billable hours.</li>
      <li><strong>Aviation:</strong> Figuring out layovers and total transit time for multi-leg flights.</li>
      <li><strong>Athletics:</strong> Calculating elapsed workout periods.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I calculate time spans spanning across midnight?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes, because this calculator captures both the dates and times for the start and end points, it accurately calculates spans that cover multiple nights or midnight transitions.
          </div>
        </div>
      </div>
    </div>
  `,

  'time-zone-converter': `
    <h2>Global Time Zone Conversion</h2>
    <p>When working or traveling globally, scheduling meetings requires translating local times between time zones. This tool calculates correct destination times, avoiding international scheduling errors.</p>
    
    <h3>The Time Zone Offset Formula</h3>
    <div class="formula-box">Target Time = UTC Time + Target Time Zone Offset</div>
    
    <h3>Example Calculation</h3>
    <p>Convert 12:00 PM IST (India, +5.5 UTC) to EST (New York, -5 UTC):
    <br><strong>UTC Time:</strong> 12:00 - 5.5 hours = 6:30 AM UTC.
    <br><strong>EST Time:</strong> 6:30 AM - 5.0 hours = 1:30 AM EST.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Virtual Meetings:</strong> Aligning remote teams for webinars and business calls.</li>
      <li><strong>Travel Planning:</strong> Confirming hotel check-in times and flight schedules.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is UTC?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            UTC (Coordinated Universal Time) is the primary global standard timezone used to regulate world clocks and time offsets. It is identical to GMT (Greenwich Mean Time) but is defined scientifically.
          </div>
        </div>
      </div>
    </div>
  `,

  'working-days': `
    <h2>Counting Working Days</h2>
    <p>The Working Days Calculator excludes weekends (Saturday and Sunday) to show actual productive days between dates, helping project managers plan deliverables.</p>
    
    <h3>The Working Days Algorithm</h3>
    <div class="formula-box">Working Days = Total Calendar Days - Saturdays - Sundays</div>
    
    <h3>Example Calculation</h3>
    <p>Between Monday, June 1 and Friday, June 12:
    <br><strong>Total Calendar Days:</strong> 12 Days.
    <br><strong>Weekends:</strong> 1 Saturday, 1 Sunday (June 6-7).
    <br><strong>Working Days:</strong> 10 Days.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Project Deadlines:</strong> Figuring out realistic completion timelines for work projects.</li>
      <li><strong>Salary Planning:</strong> Estimating working days in a month to process payroll.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Does the working days calculator exclude national holidays?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No, this calculator only filters out weekends. To exclude custom national or regional holidays, use the Business Days Calculator.
          </div>
        </div>
      </div>
    </div>
  `,

  'business-days': `
    <h2>Calculate Business Days</h2>
    <p>Business Days Calculators determine billing days by excluding both standard weekends and custom public holidays, ensuring exact scheduling projections.</p>
    
    <h3>The Business Days Formula</h3>
    <div class="formula-box">Business Days = Working Days - Public Holidays</div>
    
    <h3>Example Calculation</h3>
    <p>If there are 22 working days in a month, and you input 2 custom national holidays:
    <br><strong>Business Days:</strong> 22 - 2 = 20 Business Days.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Client Billing:</strong> Writing accurate invoices for contractors billed on daily rates.</li>
      <li><strong>Supply Chain:</strong> Projecting shipping delivery times that exclude carrier holidays.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Which days are typically considered weekends?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Most global financial institutions define weekends as Saturday and Sunday. However, some regions (e.g. parts of the Middle East) observe Friday-Saturday weekends.
          </div>
        </div>
      </div>
    </div>
  `,

  'countdown-calculator': `
    <h2>Target Date Countdowns</h2>
    <p>Count down the time remaining to a future date and time. It converts the milliseconds difference into a readable display of days, hours, and minutes.</p>
    
    <h3>The Countdown Formula</h3>
    <div class="formula-box">Time Remaining = Target Date-Time - Current Date-Time</div>
    
    <h3>Example Calculation</h3>
    <p>If target date is New Year's Eve (Dec 31, midnight) and today is December 29, 2:00 PM:
    <br><strong>Countdown:</strong> 2 Days and 10 Hours remaining.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Contract Expiry:</strong> Tracking days left before a service agreement renews or expires.</li>
      <li><strong>Launches:</strong> Counting down to product releases or website launches.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Does the countdown update dynamically?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes, this web application updates results instantly in real-time as you change variables or target dates.
          </div>
        </div>
      </div>
    </div>
  `,

  'event-countdown': `
    <h2>Tracking Holiday Countdowns</h2>
    <p>This specialized countdown tracks popular annual holidays (like New Year, Christmas, and Halloween) or custom dates, keeping you updated on holiday milestones.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Holiday Shopping:</strong> Tracking how many days you have left to purchase gifts before Christmas.</li>
      <li><strong>Personal Goals:</strong> Creating milestones for exams, vacations, or wedding dates.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What happens if the current holiday has passed?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            If an annual event has already passed for the current calendar year, the calculator automatically updates its target to the event in the following calendar year.
          </div>
        </div>
      </div>
    </div>
  `,

  'day-of-week': `
    <h2>Finding the Day of Week</h2>
    <p>Find out what day of the week any calendar date falls on, whether in the deep past or far future. It is widely used by historians, planners, or for personal curiosity.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Birth Days:</strong> Finding out if you were born on a Friday, Sunday, or other weekday.</li>
      <li><strong>Historical Research:</strong> Checking what weekday key historical declarations or treaties occurred.</li>
      <li><strong>Leap Year Check:</strong> Verifying if a year is a leap year (366 days).</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How is a leap year calculated?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            A year is a leap year if it is divisible by 4, except for end-of-century years (ending in 00), which must also be divisible by 400 (e.g. 2000 was a leap year, but 1900 was not).
          </div>
        </div>
      </div>
    </div>
  `
});
