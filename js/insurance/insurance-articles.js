'use strict';

window.NC_ARTICLES = window.NC_ARTICLES || {};

Object.assign(window.NC_ARTICLES, {
  'life-insurance': `
    <h2>Introduction to Life Insurance Planning</h2>
    <p>Life insurance is the foundation of a robust financial plan. It protects your family's lifestyle, goals, and outstanding liabilities in the event of your untimely demise.</p>
    
    <h3>The Calculation Formula</h3>
    <div class="formula-box">Ideal Cover = (Annual Household Expenses × Years to Retirement) + Total Liabilities - Existing Assets</div>
    
    <h3>Example Calculation</h3>
    <p>If you are 30 years old, planning to retire at 60 (30 working years left), with monthly expenses of ₹50,000 (₹6 Lakhs annually), ₹20 Lakhs in debts, and ₹5 Lakhs in savings:
    <br><strong>Base Protection:</strong> ₹6,00,000 × 30 = ₹1.8 Crore
    <br><strong>Liabilities added:</strong> ₹1.8 Crore + ₹20 Lakhs = ₹2.0 Crore
    <br><strong>Assets subtracted:</strong> ₹2.0 Crore - ₹5 Lakhs = ₹1.95 Crore recommended cover.</p>
    
    <h3>Key Benefits of Life Cover</h3>
    <ul>
      <li>Replaces lost household income for dependent family members.</li>
      <li>Settles outstanding home or auto loans without troubling your family.</li>
      <li>Secures key future milestones like child's college fees and marriage.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How much life insurance cover is recommended?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            A common thumb rule is to have a life cover equal to at least 10 to 15 times your annual take-home income, plus any outstanding loans/liabilities.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Should I choose term plans or endowment plans?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Term plans are highly recommended because they offer maximum life coverage (high sum assured) at very low, affordable premium rates.
          </div>
        </div>
      </div>
    </div>
  `,

  'human-life-value': `
    <h2>What is Human Life Value (HLV)?</h2>
    <p>Human Life Value measures the net present value of all future surplus income you would earn for your dependents during your remaining working life.</p>
    
    <h3>The HLV Formula</h3>
    <div class="formula-box">HLV = Future Surplus Contributions discounted back to Present Value using Inflation-adjusted rate (r)</div>
    
    <h3>Example Calculation</h3>
    <p>For an annual salary of ₹12 Lakhs with 30% personal expense usage (leaving 70% or ₹8.4 Lakhs for the family) and 25 years to retire:
    <br>Using a real rate of return of 2% (adjusted for inflation), the present value calculation outputs an HLV of approximately ₹1.64 Crore.</p>
    
    <h3>Benefits of knowing HLV</h3>
    <ul>
      <li>Calculates the true economic worth of your income stream.</li>
      <li>Prevents under-insuring your life assets.</li>
      <li>Assists in comprehensive legacy planning.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why is personal expenditure subtracted in HLV?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Personal expenditure represents what you spend on yourself. In your absence, this portion of expenses is saved, so only the surplus contribution is replaced.
          </div>
        </div>
      </div>
    </div>
  `,

  'term-insurance': `
    <h2>Understanding Term Insurance Policies</h2>
    <p>Term insurance pays out the full policy coverage amount (sum assured) to your nominees if you pass away during the active policy tenure.</p>
    
    <h3>The Premium Estimation Model</h3>
    <div class="formula-box">Estimated Annual Premium = Sum Assured × Base Risk Rate × Age Factor × Term Factor × Smoking Status Factor</div>
    
    <h3>Example Premium Case</h3>
    <p>A 30-year-old non-smoker buying ₹1 Crore cover for 30 years pays approximately ₹8,000–₹12,000 per annum depending on additional riders and the insurer.</p>
    
    <h3>Benefits of Term Plans</h3>
    <ul>
      <li>Highest protection cover per rupee of premium paid.</li>
      <li>Tax savings under Section 80C of the Income Tax Act.</li>
      <li>Peace of mind with guaranteed payout safety.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What happens if I survive the policy term?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Standard term plans do not pay any survival benefits. For survival returns, you would need to buy a 'Return of Premium' (TROP) plan which has higher premiums.
          </div>
        </div>
      </div>
    </div>
  `,

  'risk-cover': `
    <h2>Financial Risk Coverage Assessment</h2>
    <p>Risk cover calculation helps map existing assets and coverages against true outstanding risk points like debt, home loans, and children's futures.</p>
    
    <h3>The Risk Cover Formula</h3>
    <div class="formula-box">Ideal Protection Level = 12 × Current Annual Income + Total Liabilities</div>
    
    <h3>Example Gap Assessment</h3>
    <p>For an annual income of ₹10 Lakhs and ₹15 Lakhs in active home loans:
    <br><strong>Ideal Cover:</strong> ₹1.2 Crore + ₹15 Lakhs = ₹1.35 Crore.
    <br>If existing cover is only ₹10 Lakhs, the net risk coverage gap is ₹1.25 Crore.</p>
    
    <h3>Benefits of Risk Gap Calculations</h3>
    <ul>
      <li>Highlights vulnerabilities in your household safety net.</li>
      <li>Allows you to optimize term cover purchase targets.</li>
      <li>Prevents bank liabilities from passing on to dependents.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Are corporate group life policies sufficient?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No, group policies are tied to your employment. If you leave or lose your job, you are instantly left without life coverage. An independent personal term cover is always recommended.
          </div>
        </div>
      </div>
    </div>
  `,

  'family-protection': `
    <h2>Family Household Expenses Protection</h2>
    <p>This planner estimates the investment corpus needed to sustain monthly family household costs, factoring in inflation, over a defined support span.</p>
    
    <h3>Corpus Target Formula</h3>
    <div class="formula-box">Required Corpus = Annualized Living Costs discounted by Net Real Rate of Yield (Returns % - Inflation %)</div>
    
    <h3>Example Estimation</h3>
    <p>If monthly household expenses are ₹40,000, requiring 20 years support:
    <br>Adjusted for 6% inflation, the nominal expense grows to over ₹1.2 Lakhs/month. A protection corpus of ~₹1.05 Crore yields enough to pay this securely.</p>
    
    <h3>Benefits of Income Protection Planning</h3>
    <ul>
      <li>Protects spouse and elders from financial dependencies.</li>
      <li>Accounts for the compounding effect of monthly inflation.</li>
      <li>Preserves household purchasing power over decades.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How does inflation affect my protection corpus?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            At a 6% inflation rate, living expenses double every 12 years. If your protection corpus does not grow or factor this in, your family's savings will deplete much faster than planned.
          </div>
        </div>
      </div>
    </div>
  `,

  'child-education': `
    <h2>Higher Education Planning</h2>
    <p>College and professional tuition fees grow at a high rate. Early planning ensures you build a dedicated corpus to support your child's dreams without liquidating other assets.</p>
    
    <h3>The Planning Formula</h3>
    <div class="formula-box">Future Education Cost = Current College Price × (1 + InflationRate)<sup>YearsToCollege</sup></div>
    
    <h3>Example College Cost Projection</h3>
    <p>If current engineering fees are ₹15 Lakhs:
    <br>In 10 years, with 9% education inflation, the cost grows to ₹35.5 Lakhs. An equity-focused SIP of ₹15,700 per month (at 12% returns) is needed to reach this.</p>
    
    <h3>Benefits of Dedicated Planning</h3>
    <ul>
      <li>Avoids expensive education loan burdens for the student.</li>
      <li>Takes advantage of compounding yield over a long period.</li>
      <li>Ensures funding is fully ring-fenced for the college milestones.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What inflation rate should I assume for college fees?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            While general household inflation is around 5%–6%, academic inflation in India regularly hovers between 8%–10% per annum. Planning at 9%–10% is safer.
          </div>
        </div>
      </div>
    </div>
  `,

  'retirement-corpus': `
    <h2>Retirement Insurance & Pension Planning</h2>
    <p>Retirement planning calculates the capital required at age 60 to pay for monthly living costs throughout your sunset years, ensuring you do not outlive your savings.</p>
    
    <h3>The Retirement Corpus Formula</h3>
    <div class="formula-box">Required Pension Corpus = Inflation-Adjusted Expenses × years of retirement span discounted by safe annuity rates</div>
    
    <h3>Example Cost Projection</h3>
    <p>Current expenses of ₹50,000/month will grow to ₹2.14 Lakhs/month in 25 years (at 6% inflation).
    <br>To sustain a 25-year retired life expectancy, a safety corpus of approximately ₹4.2 Crore is needed at age 60.</p>
    
    <h3>Benefits of Retirement Analysis</h3>
    <ul>
      <li>Finds the exact monthly savings rate needed during your active working years.</li>
      <li>Ensures a self-reliant retirement without dependency on children.</li>
      <li>Helps choose correct allocation mixes between equity, debt, and annuities.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the safest yield to assume post-retirement?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Post-retirement capital should be invested in safe products like Senior Citizens Savings Scheme (SCSS), PMVVY, or long-term debt mutual funds. Assuming a return of 6.5%–7.5% is prudent.
          </div>
        </div>
      </div>
    </div>
  `,

  'income-replacement': `
    <h2>Income Replacement Planning</h2>
    <p>This methodology evaluates the present value of income streams that would have been brought home over the next 10–20 years, adjusting for expected annual salary growth.</p>
    
    <h3>The Replacement Model Formula</h3>
    <div class="formula-box">Total Cover Sum = Sum of Future Annual Salaries discounted by expected returns rate (PV)</div>
    
    <h3>Example Case Study</h3>
    <p>For an annual salary of ₹8 Lakhs growing at 8% annually, needing to support dependents for 15 years:
    <br>Replacing this nominal stream of ₹217 Lakhs requires a term cover sum of ~₹1.35 Crore today, which yields equivalent payouts.</p>
    
    <h3>Benefits of Income Replacement Cover</h3>
    <ul>
      <li>Maintains the growing salary standard of living for dependents.</li>
      <li>Creates a robust buffer for family future investments.</li>
      <li>Simplifies calculate-basis for young earning individuals.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Who should use the income replacement method?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            It is best suited for sole breadwinners, salaried professionals, and self-employed individuals whose families are entirely dependent on their monthly paychecks.
          </div>
        </div>
      </div>
    </div>
  `,

  'premium-affordability': `
    <h2>Premium Affordability Analysis</h2>
    <p>Buying too much insurance can strain your monthly budget, while buying too little leaves you exposed. This calculator helps balance cash flow with protection needs.</p>
    
    <h3>Affordability Standard Rules</h3>
    <div class="formula-box">Recommended Insurance Premium Limit = 8% of Net Monthly Income</div>
    
    <h3>Example Affordability check</h3>
    <p>For a monthly take-home salary of ₹75,000:
    <br><strong>Ideal Monthly Premium:</strong> ₹6,000 (annual ₹72,000 budget).
    <br>If mandatory commitments (Rent + EMIs) consume ₹35,000, the remaining surplus of ₹40,000 comfortably absorbs this.</p>
    
    <h3>Benefits of Affordability Tuning</h3>
    <ul>
      <li>Prevents policy lapses due to non-payment of premiums.</li>
      <li>Aligns cover expansion with your career and salary progress.</li>
      <li>Maintains liquid savings for monthly family emergency pools.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What should I do if the ideal cover premium is unaffordable?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            If a large term cover premium is out of reach, buy a basic, lower sum assured cover today and use "step-up" options to grow your coverage as your salary increases.
          </div>
        </div>
      </div>
    </div>
  `,

  'goal-protection': `
    <h2>Goal Protection Planning</h2>
    <p>When investing for long-term goals (like buying a house or retirement), an unexpected event can stop monthly savings. Goal protection covers the difference.</p>
    
    <h3>Goal Protection Formula</h3>
    <div class="formula-box">Goal Cover Target = Inflation-Adjusted Goal Target Cost - Accumulated Savings Assets</div>
    
    <h3>Example Target Goal</h3>
    <p>If you are planning for a ₹50 Lakh target goal in 10 years, and currently have ₹10 Lakhs saved:
    <br>Adjusted for 6% inflation, the future goal target grows to ₹89.5 Lakhs. The net goal protection cover needed today is ₹79.5 Lakhs.</p>
    
    <h3>Benefits of Goal Protection</h3>
    <ul>
      <li>Guarantees that your financial goals are reached even in your absence.</li>
      <li>Allows dependents to pay off target funds without diluting other investments.</li>
      <li>Secures critical milestones from market volatility.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How does this differ from standard term life cover?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Standard term cover protects general family lifestyle expenses. Goal protection is a targeted cover mapped specifically to secure named long-term asset targets.
          </div>
        </div>
      </div>
    </div>
  `
});
