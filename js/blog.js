/* ============================================================
   NEEDFUL CALCULATOR — Blog Module
   blog.js
   Supports filtering, tags, pagination, and dynamic post loading.
   ============================================================ */

'use strict';

window.NC = window.NC || {};

const BLOG_POSTS = [
  {
    slug: 'how-to-calculate-home-loan-emi',
    title: 'How to Calculate Home Loan EMI: A Complete Guide for 2025',
    category: 'Finance',
    date: 'June 20, 2025',
    readTime: '5 min read',
    views: '45K views',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    excerpt: 'Understanding your monthly EMI before taking a home loan can save you lakhs. Learn the exact formula, factors that affect your EMI, and tips to reduce your burden.',
    tags: ['Home Loan', 'EMI', 'Finance', 'Loan Calculator', 'Interest Rate'],
    keywords: ['home loan emi calculation', 'emi formula', 'how to calculate emi', 'reduce home loan emi', 'emi calculator guide']
  },
  {
    slug: 'sip-vs-fd',
    title: 'SIP vs FD: Which Investment is Better for You in 2025?',
    category: 'Investing',
    date: 'June 15, 2025',
    readTime: '7 min read',
    views: '38K views',
    icon: '📈',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    excerpt: 'A detailed comparison of Systematic Investment Plans and Fixed Deposits — returns, risk, liquidity, and tax implications explained simply for Indian investors.',
    tags: ['SIP', 'Fixed Deposit', 'Investing', 'Mutual Funds', 'Retirement'],
    keywords: ['sip vs fd', 'sip calculator', 'fd calculator', 'mutual fund returns', 'fixed deposit maturity'],
    content: `
      <p>Deciding where to invest your hard-earned money is one of the most critical steps in building wealth. Two of the most popular investment paths in India are <strong>Systematic Investment Plans (SIPs)</strong> in mutual funds and bank <strong>Fixed Deposits (FDs)</strong>.</p>
      <p>While both are excellent savings tools, they cater to entirely different financial goals, risk tolerances, and time horizons. In this guide, we'll break down the key differences between SIP and FD to help you make an informed decision for 2025.</p>

      <a href="calculator.html?tool=sip-calculator" class="inline-tool-card">
        <span class="inline-tool-icon">📈</span>
        <div class="inline-tool-text">
          <strong>Try Our Free SIP Calculator →</strong>
          <span>Calculate wealth generated and maturity value of your monthly SIPs</span>
        </div>
      </a>

      <h2 id="what-is-sip">What is a Systematic Investment Plan (SIP)?</h2>
      <p>A <strong>Systematic Investment Plan (SIP)</strong> is a method of investing a fixed amount of money regularly (monthly, quarterly, or weekly) into mutual funds. Instead of investing a lump sum, a SIP allows you to invest small amounts over time, benefits from <strong>rupee cost averaging</strong>, and harnesses the power of compounding.</p>
      <ul>
        <li><strong>Market-linked returns:</strong> SIPs invest in equity or debt markets, meaning returns are not guaranteed but have historical potential to beat inflation.</li>
        <li><strong>Rupee Cost Averaging:</strong> You buy more units when markets are low and fewer units when markets are high, averaging out your cost over time.</li>
      </ul>

      <h2 id="what-is-fd">What is a Fixed Deposit (FD)?</h2>
      <p>A <strong>Fixed Deposit (FD)</strong> is a traditional financial instrument offered by banks and post offices. You deposit a lump sum amount for a fixed tenure (ranging from 7 days to 10 years) at a guaranteed rate of interest.</p>
      <ul>
        <li><strong>Guaranteed Returns:</strong> The interest rate remains locked throughout the tenure, regardless of market fluctuations.</li>
        <li><strong>High Safety:</strong> Bank FDs are extremely safe. Under the DICGC rules, deposits up to ₹5 lakh per bank are fully insured by the Government of India.</li>
      </ul>

      <h2 id="comparison">SIP vs FD: Key Differences</h2>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Systematic Investment Plan (SIP)</th>
            <th>Fixed Deposit (FD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Returns</strong></td>
            <td>Market-linked (10% to 15% historically for equity SIPs)</td>
            <td>Fixed & Guaranteed (6% to 7.5% per annum currently)</td>
          </tr>
          <tr>
            <td><strong>Risk Level</strong></td>
            <td>Moderate to High (subject to market volatility)</td>
            <td>Extremely Low (Capital is fully secure)</td>
          </tr>
          <tr>
            <td><strong>Investment Mode</strong></td>
            <td>Regular monthly/weekly installments</td>
            <td>Lump sum amount upfront</td>
          </tr>
          <tr>
            <td><strong>Liquidity</strong></td>
            <td>High (Can redeem anytime, lock-in only for ELSS)</td>
            <td>Moderate (Premature withdrawal allowed with small penalty)</td>
          </tr>
          <tr>
            <td><strong>Inflation Protection</strong></td>
            <td>High (Returns generally outpace inflation in long-term)</td>
            <td>Low (Returns might not fully beat inflation after taxes)</td>
          </tr>
        </tbody>
      </table>

      <h2 id="returns-example">Return Comparison Example</h2>
      <p>Let's compare the potential maturity value of a ₹5,000 monthly investment in SIP vs saving equivalent lump sums in FDs over 10 years:</p>
      <ul>
        <li><strong>Fixed Deposit (6.5% p.a. average return):</strong> Total investment of ₹6,00,000 matures to approximately <strong>₹8,45,000</strong>.</li>
        <li><strong>Equity SIP (12% p.a. historical average):</strong> Total investment of ₹6,00,000 matures to approximately <strong>₹11,61,000</strong>.</li>
      </ul>
      <div class="callout callout-info">
        <strong>💡 Summary:</strong> The compounding effect and equity exposure in a long-term SIP can generate nearly ₹3.16 lakh more wealth than a traditional Fixed Deposit.
      </div>

      <h2 id="risk-tax">Risk and Tax Implications</h2>
      <h3>Taxation on FDs</h3>
      <p>The interest earned on Fixed Deposits is fully taxable according to your income tax slab rates. If your annual FD interest exceeds ₹40,000 (₹50,000 for senior citizens), the bank deducts a 10% TDS (Tax Deducted at Source).</p>
      <h3>Taxation on Mutual Fund SIPs</h3>
      <p>For Equity Mutual Funds, returns are taxed as Capital Gains:
        <ul>
          <li><strong>Short-Term Capital Gains (STCG):</strong> 20% if redeemed within 1 year.</li>
          <li><strong>Long-Term Capital Gains (LTCG):</strong> 12.5% if redeemed after 1 year (Gains up to ₹1.25 lakh per year are tax-free).</li>
        </ul>
      </p>

      <h2 id="faq-section">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>Can I lose money in a SIP?</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              Yes, in the short term, since mutual funds are market-linked. However, historically, equity SIPs run for more than 5 to 7 years have rarely yielded negative returns, and generally outperform fixed-income assets.
            </div>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>Is it possible to start a SIP with ₹500?</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              Yes! Most mutual fund houses allow investors to start a SIP with as little as ₹500 (or even ₹100 for select funds) per month.
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    slug: 'new-tax-regime-vs-old',
    title: 'New Tax Regime vs Old: Which Should You Choose for FY 2024-25?',
    category: 'Tax',
    date: 'June 10, 2025',
    readTime: '8 min read',
    views: '32K views',
    icon: '🧾',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    excerpt: 'Budget 2025 changed income tax significantly. We break down which tax regime saves you more money with real-world examples and our calculator.',
    tags: ['Tax Saving', 'Income Tax', 'Budget 2025', 'Section 80C', 'Deductions'],
    keywords: ['new tax regime vs old', 'income tax calculator', 'tax saving', 'slab rates 2024-25'],
    content: `
      <p>The Union Budget brought significant modifications to the Income Tax structures in India. As a taxpayer, you have a crucial choice to make: file under the <strong>Old Tax Regime</strong> or go with the default <strong>New Tax Regime</strong> for the Financial Year 2024-25 (Assessment Year 2025-26).</p>
      <p>Choosing the right tax regime is not a one-size-fits-all decision. It depends heavily on your salary level, the investments you make, and the deductions you claim. Let's compare them step by step.</p>

      <a href="calculator.html?tool=income-tax-calculator" class="inline-tool-card">
        <span class="inline-tool-icon">💰</span>
        <div class="inline-tool-text">
          <strong>Compare with Income Tax Calculator →</strong>
          <span>Compare tax liability side-by-side under old and new regimes instantly</span>
        </div>
      </a>

      <h2 id="new-regime-slabs">New Tax Regime Slabs (FY 2024-25)</h2>
      <p>Under the New Tax Regime, tax slabs are simplified, and tax rates are lower, but almost all deductions are removed. Standard deduction has been increased to <strong>₹75,000</strong>.</p>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Income Slabs</th>
            <th>Tax Rate (New Regime)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Up to ₹3,000,000</td><td>Nil (0%)</td></tr>
          <tr><td>₹300,001 to ₹700,000</td><td>5% (Rebate under Sec 87A up to 7L)</td></tr>
          <tr><td>₹700,001 to ₹1,000,000</td><td>10%</td></tr>
          <tr><td>₹1,000,001 to ₹1,200,000</td><td>15%</td></tr>
          <tr><td>₹1,200,001 to ₹1,500,000</td><td>20%</td></tr>
          <tr><td>Above ₹1,500,000</td><td>30%</td></tr>
        </tbody>
      </table>

      <h2 id="old-regime-slabs">Old Tax Regime Slabs (FY 2024-25)</h2>
      <p>The Old Tax Regime has higher tax rates but allows a wide range of deductions (Section 80C, 80D, HRA, home loan interest, etc.). Standard deduction is <strong>₹50,000</strong>.</p>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Income Slabs</th>
            <th>Tax Rate (Old Regime)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Up to ₹250,000</td><td>Nil (0%)</td></tr>
          <tr><td>₹250,001 to ₹500,000</td><td>5% (Rebate under Sec 87A up to 5L)</td></tr>
          <tr><td>₹500,001 to ₹1,000,000</td><td>20%</td></tr>
          <tr><td>Above ₹1,000,000</td><td>30%</td></tr>
        </tbody>
      </table>

      <h2 id="deductions">Deductions Comparison</h2>
      <ul>
        <li><strong>Old Tax Regime:</strong> Section 80C (up to ₹1.5L in PPF, ELSS, EPF, LIC), Section 80D (health insurance up to ₹25K/₹50K), HRA (rent paid), Section 24b (Home Loan Interest up to ₹2L), and LTA.</li>
        <li><strong>New Tax Regime:</strong> Only Standard Deduction (₹75,000 for salaried employees) and Section 80CCD(2) (employer's contribution to NPS) are allowed.</li>
      </ul>

      <h2 id="faq-section">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>What is the default tax regime?</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              Starting from FY 2023-24 onwards, the New Tax Regime is the default tax regime. If you wish to file under the Old Tax Regime, you must actively opt for it when filing your ITR.
            </div>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>Which regime is better if I have no investments?</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              If you do not claim deductions (like HRA, 80C, or 80D), the New Tax Regime is almost always better because of its lower tax slabs and higher initial exemption limit.
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    slug: 'ppf-vs-nps',
    title: 'PPF vs NPS: Which is Better for Long-Term Retirement Savings?',
    category: 'Finance',
    date: 'June 5, 2025',
    readTime: '6 min read',
    views: '22K views',
    icon: '🛡️',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    excerpt: 'Compare Public Provident Fund and National Pension System on returns, tax benefits, lock-in period, and flexibility to choose the right one.',
    tags: ['PPF', 'NPS', 'Retirement', 'Tax Saving', 'Finance'],
    keywords: ['ppf vs nps', 'ppf calculator', 'nps calculator', 'retirement savings', 'tax benefits'],
    content: `
      <p>Saving for retirement is a long-term commitment. Two of the most popular government-backed long-term saving schemes in India are the <strong>Public Provident Fund (PPF)</strong> and the <strong>National Pension System (NPS)</strong>.</p>
      <p>Both schemes offer tax benefits and encourage regular savings, but their underlying structures, return profiles, lock-in periods, and withdrawal rules are completely different. Let's compare them to see which fits your retirement portfolio.</p>

      <a href="calculator.html?tool=ppf-calculator" class="inline-tool-card">
        <span class="inline-tool-icon">🏦</span>
        <div class="inline-tool-text">
          <strong>Calculate Returns with PPF Calculator →</strong>
          <span>See maturity value and interest earned on your yearly PPF investments</span>
        </div>
      </a>

      <h2 id="what-is-ppf">Public Provident Fund (PPF)</h2>
      <p>The <strong>Public Provident Fund (PPF)</strong> is a fixed-income savings scheme backed by the Government of India. The interest rate is reviewed quarterly (currently at <strong>7.1% per annum</strong>). It has a lock-in period of 15 years.</p>
      <ul>
        <li><strong>EEE Tax Status:</strong> PPF enjoys Exempt-Exempt-Exempt tax status. The investment amount, the interest earned, and the maturity amount are all fully tax-free.</li>
        <li><strong>Guaranteed & Risk-Free:</strong> Returns are fully guaranteed by the government, making it safe from inflation and market crashes.</li>
      </ul>

      <h2 id="what-is-nps">National Pension System (NPS)</h2>
      <p>The <strong>National Pension System (NPS)</strong> is a market-linked retirement contribution scheme. Your investments are managed by professional pension fund managers across equity (E), corporate debt (C), government securities (G), and alternative assets (A).</p>
      <ul>
        <li><strong>Market-Linked Returns:</strong> Historically, active equity/debt allocations have yielded 9% to 12% returns in the long run.</li>
        <li><strong>Lock-in until 60:</strong> NPS capital is locked until you reach age 60. At retirement, you must use at least 40% of the corpus to buy an annuity (pension), and you can withdraw the remaining 60% as tax-free lump sum.</li>
      </ul>

      <h2 id="comparison">PPF vs NPS: Main Comparison</h2>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Parameters</th>
            <th>Public Provident Fund (PPF)</th>
            <th>National Pension System (NPS)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Interest Rate</strong></td>
            <td>Fixed (7.1% p.a. currently)</td>
            <td>Market-linked (approx. 9% to 11% p.a. average)</td>
          </tr>
          <tr>
            <td><strong>Lock-in Period</strong></td>
            <td>15 Years</td>
            <td>Till Age 60</td>
          </tr>
          <tr>
            <td><strong>Max Investment</strong></td>
            <td>₹1.5 Lakh per Financial Year</td>
            <td>No maximum limit</td>
          </tr>
          <tr>
            <td><strong>Tax Benefit</strong></td>
            <td>Up to ₹1.5L under Sec 80C</td>
            <td>80C (up to 1.5L) + Extra 50K under Sec 80CCD(1B)</td>
          </tr>
        </tbody>
      </table>

      <h2 id="faq-section">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>Can I invest in both PPF and NPS?</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              Yes, absolutely! Investing in both PPF (for risk-free debt exposure) and NPS (for market-linked equity exposure) is a widely recommended asset-allocation strategy for retirement.
            </div>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>What happens to my NPS if I withdraw before 60?</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              Premature withdrawals are permitted only under specific emergencies (education, illness) up to 25% of self-contributions. If you exit the scheme early, you must purchase an annuity with 80% of your corpus, and only 20% is paid out.
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    slug: 'what-is-bmi',
    title: 'What is BMI? How to Calculate and Interpret Your Body Mass Index',
    category: 'Health',
    date: 'May 28, 2025',
    readTime: '4 min read',
    views: '15K views',
    icon: '💚',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=80',
    excerpt: 'BMI is a simple screening tool. Learn what it measures, its limitations, and what your number means for your health and fitness goals.',
    tags: ['BMI', 'Health', 'Fitness', 'Weight Loss', 'Ideal Weight'],
    keywords: ['what is bmi', 'bmi calculator', 'body mass index', 'calculate bmi', 'ideal weight'],
    content: `
      <p>Staying healthy starts with understanding your body metrics. One of the most common and globally recognized metrics is the <strong>Body Mass Index (BMI)</strong>.</p>
      <p>BMI is a quick, inexpensive, and simple screening parameter used to determine if a person is underweight, normal weight, overweight, or obese. In this article, we explain the mathematics behind BMI, how to calculate it, and how to read your score.</p>

      <a href="calculator.html?tool=bmi-calculator" class="inline-tool-card">
        <span class="inline-tool-icon">💚</span>
        <div class="inline-tool-text">
          <strong>Try Our Free BMI Calculator →</strong>
          <span>Calculate your Body Mass Index and check weight categories instantly</span>
        </div>
      </a>

      <h2 id="what-is-bmi">What is Body Mass Index (BMI)?</h2>
      <p><strong>Body Mass Index (BMI)</strong> is a value derived from the mass (weight) and height of an individual. It serves as an indirect measure of body fatness and is highly correlated with metabolic and disease risks.</p>

      <h2 id="bmi-formula">The BMI Formula</h2>
      <p>BMI is calculated using weight in kilograms (kg) and height in meters (m). The formula is:</p>
      <div style="background:var(--gradient-hero);border:1px solid rgba(37,99,235,0.15);border-radius:var(--radius-xl);padding:var(--space-6);text-align:center;margin-block:var(--space-6)">
        <p style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:var(--clr-primary);margin-bottom:var(--space-2)">BMI = Weight (kg) / [Height (m)]²</p>
      </div>

      <h2 id="bmi-categories">BMI Classification Slabs (WHO Standards)</h2>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>BMI Range</th>
            <th>Weight Category</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Below 18.5</td><td>Underweight</td></tr>
          <tr><td>18.5 to 24.9</td><td>Normal / Healthy Weight</td></tr>
          <tr><td>25.0 to 29.9</td><td>Overweight</td></tr>
          <tr><td>30.0 and Above</td><td>Obese</td></tr>
        </tbody>
      </table>

      <h2 id="limitations">Limitations of BMI</h2>
      <p>While BMI is useful for general populations, it has major limitations:
        <ul>
          <li><strong>Does not differentiate muscle from fat:</strong> Athletes and bodybuilders may have high BMIs but extremely low body fat percentages.</li>
          <li><strong>Does not show fat distribution:</strong> It doesn't capture visceral fat (dangerous fat stored around internal organs) vs subcutaneous fat.</li>
        </ul>
      </p>

      <h2 id="faq-section">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>What is a healthy BMI for Indian adults?</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              For Indian populations, health guidelines recommend a slightly lower BMI range: 18.5 to 22.9 is considered normal, 23.0 to 24.9 is overweight, and 25.0+ is obese, due to higher risk of cardiovascular diseases.
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    slug: 'power-of-compound-interest',
    title: 'The Power of Compound Interest: Why Starting Early Matters',
    category: 'Finance',
    date: 'May 20, 2025',
    readTime: '5 min read',
    views: '28K views',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80',
    excerpt: 'Albert Einstein called it the eighth wonder of the world. See how ₹5,000/month invested at 25 can turn into ₹3.5 crore by retirement.',
    tags: ['Compound Interest', 'Investing', 'Wealth Creation', 'Financial Freedom', 'SIP'],
    keywords: ['power of compound interest', 'compound interest calculator', 'start early investing', 'compounding'],
    content: `
      <p>Compound interest is the foundation of modern wealth building. Often referred to as the "eighth wonder of the world," compounding has the unique ability to turn small, consistent contributions into massive sums of money over time.</p>
      <p>But the secret weapon of compounding isn't interest rates or the amount you save — it's <strong>Time</strong>. In this article, we'll demonstrate how compound interest works and why starting just a few years early can make a multi-crore difference.</p>

      <a href="calculator.html?tool=compound-interest" class="inline-tool-card">
        <span class="inline-tool-icon">⚡</span>
        <div class="inline-tool-text">
          <strong>Try Compound Interest Calculator →</strong>
          <span>See the compounding effect and project maturity values dynamically</span>
        </div>
      </a>

      <h2 id="what-is-compounding">What is Compound Interest?</h2>
      <p>Unlike simple interest, which is calculated solely on your initial principal, <strong>Compound Interest</strong> is interest calculated on the initial principal plus the accumulated interest from previous periods. In simple terms, it is <strong>"interest on interest."</strong></p>

      <h2 id="delay-example">The Cost of Delaying: A Comparison</h2>
      <p>Let's look at three individuals who invest ₹10,000 monthly at a 12% average annual return until they retire at age 60:</p>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Investor</th>
            <th>Start Age</th>
            <th>Years Investing</th>
            <th>Total Invested</th>
            <th>Maturity Value at 60</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Aman (Starts early)</td><td>25</td><td>35 Years</td><td>₹42,00,000</td><td><strong>₹6,49,00,000</strong></td></tr>
          <tr><td>Rahul (Waits 10 yrs)</td><td>35</td><td>25 Years</td><td>₹30,00,000</td><td><strong>₹1,89,00,000</strong></td></tr>
          <tr><td>Vikram (Waits 20 yrs)</td><td>45</td><td>15 Years</td><td>₹18,00,000</td><td><strong>₹50,40,000</strong></td></tr>
        </tbody>
      </table>
      <div class="callout callout-warning">
        <strong>⚠️ Important:</strong>AMAN invested only ₹12 lakh more than RAHUL, but retired with ₹4.60 crore more! This demonstrates that *when* you start is much more critical than how much you invest.
      </div>

      <h2 id="faq-section">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>What is the rule of 72?</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              The Rule of 72 is a quick formula to estimate when your money will double. Divide 72 by your annual interest rate. For example, at a 12% rate, your investment doubles in approximately 6 years (72 ÷ 12 = 6).
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    slug: 'gst-calculator-guide',
    title: 'GST Calculator Guide: How to Calculate GST in India (2025)',
    category: 'Tax',
    date: 'May 15, 2025',
    readTime: '6 min read',
    views: '28K views',
    icon: '💰',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    excerpt: 'Learn how GST works, the different slabs (5%, 12%, 18%, 28%), how to calculate inclusive and exclusive GST, and use our free GST calculator.',
    tags: ['GST', 'Tax', 'Finance', 'GST Calculator', 'Small Business'],
    keywords: ['gst calculation guide', 'gst calculator', 'inclusive gst', 'calculate gst india', 'exclusive gst'],
    content: `
      <p>The Goods and Services Tax (GST) is a unified, indirect tax structure implemented in India. Whether you are a business owner buying materials, a freelancer invoicing clients, or a consumer checking a bill, understanding GST calculations is vital.</p>
      <p>Calculating GST manually can be confusing due to different slabs and formulas for inclusive and exclusive calculations. In this guide, we break down the math and show you how to use our free GST tool.</p>

      <a href="calculator.html?tool=gst-calculator" class="inline-tool-card">
        <span class="inline-tool-icon">💰</span>
        <div class="inline-tool-text">
          <strong>Try Our Free GST Calculator →</strong>
          <span>Calculate CGST, SGST, IGST, and inclusive/exclusive amounts instantly</span>
        </div>
      </a>

      <h2 id="gst-slabs">GST Slabs in India</h2>
      <p>Goods and services are categorized under five tax rate slabs in India:
        <ul>
          <li><strong>0% (Exempt):</strong> Essential goods like fresh vegetables, milk, eggs, books.</li>
          <li><strong>5%:</strong> Household essentials, packaged food, life-saving drugs.</li>
          <li><strong>12%:</strong> Computers, processed foods, business class air tickets.</li>
          <li><strong>18%:</strong> Most electronics, telecom services, restaurants, software.</li>
          <li><strong>28%:</strong> Luxury goods, automobiles, cement, tobacco.</li>
        </ul>
      </p>

      <h2 id="gst-formulas">Formulas for GST Calculations</h2>
      <h3>1. GST Exclusive (Add GST to Base Price)</h3>
      <p>Formula to add tax to an item:</p>
      <div style="background:var(--bg-muted);padding:var(--space-4);border-left:4px solid var(--clr-primary);font-family:monospace;margin-bottom:var(--space-4)">
        GST Amount = (Base Price * GST%) / 100<br>
        Total Price = Base Price + GST Amount
      </div>

      <h3>2. GST Inclusive (Find Base Price from Total Price)</h3>
      <p>Formula to subtract tax or find tax already added in a total price:</p>
      <div style="background:var(--bg-muted);padding:var(--space-4);border-left:4px solid var(--clr-primary);font-family:monospace;margin-bottom:var(--space-4)">
        Base Price = Total Price / (1 + GST% / 100)<br>
        GST Amount = Total Price - Base Price
      </div>

      <h2 id="calculation-example">GST Calculation Example</h2>
      <p>If a software service is priced at ₹10,000 (excluding 18% GST):</p>
      <ul>
        <li><strong>Base Amount:</strong> ₹10,000</li>
        <li><strong>GST Amount:</strong> (₹10,000 * 18) / 100 = <strong>₹1,800</strong></li>
        <li><strong>Total Invoiced Amount:</strong> ₹10,000 + ₹1,800 = <strong>₹11,800</strong></li>
        <li>For domestic interstate sale, CGST is ₹900 (9%) and SGST is ₹900 (9%).</li>
      </ul>

      <h2 id="faq-section">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>What is the difference between CGST, SGST, and IGST?</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              CGST (Central GST) and SGST (State GST) are levied on transactions within a single state (intrastate). IGST (Integrated GST) is levied on interstate transactions and shared between the central and state governments.
            </div>
          </div>
        </div>
      </div>
    `
  }
];

window.NC.BLOG_POSTS = BLOG_POSTS;

const BlogRenderer = (() => {

  const renderFeaturedCard = (post) => {
    return `
      <a href="blog-post.html?post=${post.slug}" class="featured-post reveal" id="featured-article" aria-label="Featured: ${post.title}">
        <div style="overflow:hidden">
          <img src="${post.image}" alt="${post.title}" class="featured-post-img" loading="eager" width="800" height="533">
        </div>
        <div class="featured-post-body">
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            <span class="badge badge-primary">${post.category}</span>
            <span class="badge badge-new">Featured</span>
          </div>
          <h2 style="font-size:var(--text-2xl);color:var(--txt-primary);line-height:1.3">${post.title}</h2>
          <p style="color:var(--txt-muted);font-size:var(--text-sm);line-height:1.7">${post.excerpt}</p>
          <div style="display:flex;align-items:center;gap:var(--space-4);font-size:var(--text-xs);color:var(--txt-muted)">
            <span>📅 ${post.date}</span>
            <span>⏱️ ${post.readTime}</span>
            <span>👁️ ${post.views}</span>
          </div>
          <span class="read-more" style="margin-top:var(--space-2)">Read Full Article →</span>
        </div>
      </a>
    `;
  };

  const renderBlogCard = (post) => {
    let badgeClass = 'badge-primary';
    if (post.category === 'Tax') badgeClass = 'badge-trending';
    if (post.category === 'Health') badgeClass = 'badge-accent';

    return `
      <article class="blog-card" id="blog-${post.slug}">
        <div class="blog-card-img-wrap">
          <a href="blog-post.html?post=${post.slug}">
            <img src="${post.image}" alt="${post.title}" class="blog-card-image" loading="lazy" width="600" height="338">
          </a>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span class="badge ${badgeClass}">${post.category}</span>
            <span>${post.date}</span>
            <span>${post.readTime}</span>
          </div>
          <h2 class="blog-card-title">
            <a href="blog-post.html?post=${post.slug}" style="text-decoration:none;color:inherit;">${post.title}</a>
          </h2>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <div class="blog-card-footer">
            <span style="font-size:var(--text-xs);color:var(--txt-muted)">Needful Team</span>
            <a href="blog-post.html?post=${post.slug}" class="read-more">Read More →</a>
          </div>
        </div>
      </article>
    `;
  };

  const updateCategoryCounts = () => {
    const counts = { Finance: 0, Investing: 0, Tax: 0, Health: 0, 'How To': 0 };
    BLOG_POSTS.forEach(post => {
      if (counts[post.category] !== undefined) {
        counts[post.category]++;
      }
    });

    const sidebarCats = document.querySelectorAll('.sidebar-cat-item');
    sidebarCats.forEach(item => {
      const text = item.querySelector('span:first-child')?.textContent || '';
      let badge = item.querySelector('.sidebar-cat-count');
      if (!badge) return;

      if (text.includes('Finance')) badge.textContent = counts.Finance;
      if (text.includes('Investing')) badge.textContent = counts.Investing;
      if (text.includes('Tax')) badge.textContent = counts.Tax;
      if (text.includes('Health')) badge.textContent = counts.Health;
      if (text.includes('How-To') || text.includes('How To')) badge.textContent = counts['How To'];
    });
  };

  const initBlogPage = () => {
    const filtersContainer = document.querySelector('.blog-filters');
    const featuredContainer = document.getElementById('featured-article')?.parentNode;
    const gridContainer = document.querySelector('.blog-grid, .grid-2');
    const paginationContainer = document.querySelector('.pagination');

    if (!gridContainer) return;

    let currentCategory = 'all';
    let currentPage = 1;
    const itemsPerPage = 6;

    const render = () => {
      // Filter posts
      let filtered = BLOG_POSTS;
      if (currentCategory !== 'all') {
        const catMap = {
          finance: 'Finance',
          investing: 'Investing',
          tax: 'Tax',
          health: 'Health',
          howto: 'How To'
        };
        const targetCat = catMap[currentCategory];
        filtered = BLOG_POSTS.filter(post => post.category === targetCat);
      }

      // If Category is 'all', show featured post separately and exclude it from the grid
      let featuredPost = null;
      let gridPosts = filtered;

      if (currentCategory === 'all' && filtered.length > 0) {
        featuredPost = filtered[0];
        gridPosts = filtered.slice(1);
      }

      // Render Featured Post
      const featuredEl = document.getElementById('featured-article');
      if (featuredEl) {
        if (featuredPost) {
          featuredEl.outerHTML = renderFeaturedCard(featuredPost);
        } else {
          // Hide featured container if not showing
          const curFeatured = document.getElementById('featured-article');
          if (curFeatured) curFeatured.style.display = 'none';
        }
      }

      // Pagination calculation
      const totalItems = gridPosts.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
      currentPage = Math.min(currentPage, totalPages);
      
      const startIdx = (currentPage - 1) * itemsPerPage;
      const paginatedPosts = gridPosts.slice(startIdx, startIdx + itemsPerPage);

      // Render Grid
      gridContainer.innerHTML = paginatedPosts.map(renderBlogCard).join('');

      // Render Pagination Buttons
      if (paginationContainer) {
        if (totalPages <= 1) {
          paginationContainer.innerHTML = '';
        } else {
          let html = '';
          for (let i = 1; i <= totalPages; i++) {
            html += `<a href="#" class="page-btn ${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</a>`;
          }
          if (currentPage < totalPages) {
            html += `<a href="#" class="page-btn" data-page="${currentPage + 1}">→</a>`;
          }
          paginationContainer.innerHTML = html;

          // Wire up pagination clicks
          paginationContainer.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              currentPage = parseInt(btn.getAttribute('data-page'));
              render();
              window.scrollTo({ top: filtersContainer.offsetTop - 100, behavior: 'smooth' });
            });
          });
        }
      }
    };

    // Wire up filter tags click listeners
    if (filtersContainer) {
      filtersContainer.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
          e.preventDefault();
          filtersContainer.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
          tag.classList.add('active');

          const id = tag.id.replace('filter-', '');
          currentCategory = id;
          currentPage = 1;
          render();
        });
      });
    }

    // Sidebar Category list clicks also filter the tags
    document.querySelectorAll('.sidebar-cat-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const text = item.querySelector('span')?.textContent || '';
        let targetId = 'filter-all';
        if (text.includes('Finance')) targetId = 'filter-finance';
        if (text.includes('Investing')) targetId = 'filter-investing';
        if (text.includes('Tax')) targetId = 'filter-tax';
        if (text.includes('Health')) targetId = 'filter-health';
        if (text.includes('How-To') || text.includes('How To')) targetId = 'filter-howto';

        const targetBtn = document.getElementById(targetId);
        if (targetBtn) targetBtn.click();
      });
    });

    updateCategoryCounts();
    render();
  };

  const initBlogPostPage = () => {
    const isPostPage = window.location.pathname.includes('blog-post.html');
    if (!isPostPage) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('post') || 'how-to-calculate-home-loan-emi';

    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (!post) return;

    // 1. Update Title and metadata
    document.title = `${post.title} | Needful Calculator`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt);

    // 2. Breadcrumbs
    const currentBreadcrumb = document.querySelector('.breadcrumb-current');
    if (currentBreadcrumb) {
      currentBreadcrumb.textContent = post.title;
    }

    // 3. Render Post Header elements
    const headerDiv = document.querySelector('main header');
    if (headerDiv) {
      let badgeClass = 'badge-primary';
      if (post.category === 'Tax') badgeClass = 'badge-trending';
      if (post.category === 'Health') badgeClass = 'badge-accent';

      headerDiv.innerHTML = `
        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-4)">
          <span class="badge ${badgeClass}">${post.category}</span>
          <span class="badge badge-new">Updated</span>
        </div>

        <h1 style="font-size:clamp(var(--text-2xl),4vw,var(--text-4xl));line-height:1.2;margin-bottom:var(--space-5)">
          ${post.title}
        </h1>

        <div style="display:flex;align-items:center;gap:var(--space-5);flex-wrap:wrap;font-size:var(--text-sm);color:var(--txt-muted);padding-bottom:var(--space-5);border-bottom:1px solid var(--border-color)">
          <span>📅 ${post.date}</span>
          <span>⏱️ ${post.readTime}</span>
          <span>👁️ ${post.views}</span>
          <span>📝 By Needful Calculator Team</span>
        </div>

        <!-- Featured Image -->
        <img
          src="${post.image}"
          alt="${post.title}"
          style="width:100%;border-radius:var(--radius-xl);margin-top:var(--space-6);aspect-ratio:16/7;object-fit:cover"
          loading="eager"
          width="900" height="394"
        >
      `;
    }

    // 4. Render Article Body Content (if dynamic)
    const contentDiv = document.querySelector('.article-content');
    if (contentDiv && post.content) {
      // Prepend metadata tags for SEO Schema markup
      contentDiv.innerHTML = `
        <meta itemprop="datePublished" content="2025-06-15">
        <meta itemprop="author" content="Needful Calculator Team">
        ${post.content}
        
        <!-- Author Card -->
        <div class="author-card">
          <div class="author-avatar" aria-hidden="true">👨‍💼</div>
          <div>
            <div class="author-name">Needful Calculator Team</div>
            <div class="author-bio">Our team of certified financial analysts creates guides verified against RBI, SEBI, and Income Tax department standards. Every article is reviewed for accuracy before publishing.</div>
          </div>
        </div>
      `;
    }

    // 5. Update Tags
    const tagsDiv = document.querySelector('article + div');
    if (tagsDiv && tagsDiv.querySelector('.tag')) {
      tagsDiv.innerHTML = `
        <span style="font-size:var(--text-sm);color:var(--txt-muted);font-weight:600">Tags:</span>
        ${post.tags.map(t => `<a href="blog.html" class="tag">${t}</a>`).join('')}
      `;
    }

    // 6. Generate dynamic Table of Contents
    const tocList = document.querySelector('.toc-list');
    if (tocList) {
      const headings = document.querySelectorAll('.article-content h2, .article-content h3');
      if (headings.length === 0) {
        tocList.parentNode.style.display = 'none';
      } else {
        tocList.innerHTML = Array.from(headings).map(h => {
          const text = h.textContent.trim().replace('↳', '').trim();
          let id = h.id;
          if (!id) {
            id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            h.id = id;
          }
          const isH3 = h.tagName.toLowerCase() === 'h3';
          return `<a href="#${id}" class="toc-item ${isH3 ? 'h3' : ''}">${isH3 ? '↳ ' : ''}${text}</a>`;
        }).join('');

        // Wire up scroll highlight for TOC
        if (window.NC.TOCHighlight) {
          window.NC.TOCHighlight.init();
        }
      }
    }

    // 7. Render Related Articles (2 same category or alternative)
    const relatedGrid = document.querySelector('.grid-2');
    if (relatedGrid && relatedGrid.parentNode.querySelector('h2')?.textContent.includes('Related Articles')) {
      const related = BLOG_POSTS.filter(p => p.slug !== post.slug && (p.category === post.category || p.category === 'Finance')).slice(0, 2);
      relatedGrid.innerHTML = related.map(p => {
        let badgeClass = 'badge-primary';
        if (p.category === 'Tax') badgeClass = 'badge-trending';
        if (p.category === 'Health') badgeClass = 'badge-accent';

        return `
          <article class="blog-card">
            <div class="blog-card-img-wrap">
              <a href="blog-post.html?post=${p.slug}">
                <img src="${p.image}" alt="${p.title}" class="blog-card-image" loading="lazy" width="600" height="338">
              </a>
            </div>
            <div class="blog-card-body">
              <div class="blog-card-meta">
                <span class="badge ${badgeClass}">${p.category}</span>
                <span>${p.readTime}</span>
              </div>
              <h3 class="blog-card-title">
                <a href="blog-post.html?post=${p.slug}" style="text-decoration:none;color:inherit;">${p.title}</a>
              </h3>
              <div class="blog-card-footer">
                <span></span>
                <a href="blog-post.html?post=${p.slug}" class="read-more">Read More →</a>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    // 8. Previous / Next Posts
    const postIdx = BLOG_POSTS.findIndex(p => p.slug === post.slug);
    const prevPost = postIdx > 0 ? BLOG_POSTS[postIdx - 1] : BLOG_POSTS[BLOG_POSTS.length - 1];
    const nextPost = postIdx < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIdx + 1] : BLOG_POSTS[0];

    // Find tags parent node to insert previous / next buttons cleanly
    const parentNode = tagsDiv?.parentNode;
    if (parentNode) {
      let navDiv = document.querySelector('.post-nav');
      if (!navDiv) {
        navDiv = document.createElement('div');
        navDiv.className = 'post-nav';
        navDiv.style.cssText = 'display:flex;justify-content:space-between;margin-top:var(--space-8);padding-top:var(--space-6);border-top:1px solid var(--border-color);gap:var(--space-4);flex-wrap:wrap';
        // Insert after tagsDiv
        parentNode.insertBefore(navDiv, tagsDiv.nextSibling);
      }
      
      navDiv.innerHTML = `
        <a href="blog-post.html?post=${prevPost.slug}" class="post-nav-btn prev" style="display:flex;flex-direction:column;text-decoration:none;flex:1;min-width:200px">
          <span style="font-size:var(--text-xs);color:var(--txt-muted);font-weight:600">← PREVIOUS POST</span>
          <span style="font-size:var(--text-sm);font-weight:700;color:var(--clr-primary)">${prevPost.title}</span>
        </a>
        <a href="blog-post.html?post=${nextPost.slug}" class="post-nav-btn next" style="display:flex;flex-direction:column;text-align:right;text-decoration:none;flex:1;min-width:200px">
          <span style="font-size:var(--text-xs);color:var(--txt-muted);font-weight:600">NEXT POST →</span>
          <span style="font-size:var(--text-sm);font-weight:700;color:var(--clr-primary)">${nextPost.title}</span>
        </a>
      `;
    }

    // 9. Related Calculators Sidebar Widget
    const relatedToolsList = document.querySelector('.sidebar-tool-list');
    if (relatedToolsList) {
      // Map category to tools configs
      const catMap = {
        Finance: ['emi-calculator', 'sip-calculator', 'fd-calculator', 'ppf-calculator'],
        Investing: ['sip-calculator', 'fd-calculator', 'lumpsum', 'cagr'],
        Tax: ['income-tax-calculator', 'tds-calculator', 'gst-calculator', 'hra-calculator'],
        Health: ['bmi-calculator', 'bmr-calculator', 'calorie-calculator', 'water-intake']
      };
      
      const slugs = catMap[post.category] || ['emi-calculator', 'sip-calculator', 'fd-calculator'];
      if (window.NC.CalculatorRouter && window.NC.CalculatorRouter.configs) {
        relatedToolsList.innerHTML = slugs.map(s => {
          const cfg = window.NC.CalculatorRouter.configs[s];
          if (!cfg) return '';
          return `
            <a href="calculator.html?tool=${s}" class="sidebar-tool-item">
              <div class="sidebar-tool-icon">${cfg.icon || '🧮'}</div>
              <div>
                <div class="sidebar-tool-name">${cfg.title}</div>
                <div class="sidebar-tool-meta">${cfg.subtitle || ''}</div>
              </div>
            </a>
          `;
        }).join('');
      }
    }
  };

  const init = () => {
    initBlogPage();
    // Wait for calculators loaded if router details are needed
    if (window.NC.calculatorsLoaded) {
      window.NC.calculatorsLoaded.then(initBlogPostPage).catch(() => initBlogPostPage());
    } else {
      initBlogPostPage();
    }
  };

  return { init, BLOG_POSTS };

})();

window.NC.BlogRenderer = BlogRenderer;
window.NC.BLOG_POSTS = BlogRenderer.BLOG_POSTS;

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  BlogRenderer.init();
} else {
  document.addEventListener('DOMContentLoaded', () => BlogRenderer.init());
}
