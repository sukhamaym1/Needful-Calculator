'use strict';

window.NC_ARTICLES = window.NC_ARTICLES || {};

Object.assign(window.NC_ARTICLES, {
  'income-tax-calculator': `
    <h2>Introduction to Income Tax Slabs</h2>
    <p>Income tax in India is calculated based on slab rates that vary depending on the chosen regime. The Union Budget 2024 introduced revised tax slabs under the default New Tax Regime for FY 2024-25, alongside an increased standard deduction of ₹75,000 for salaried employees. Taxpayers have the option to stick to the Old Tax Regime, which retains higher rates but allows exemptions like Section 80C, 80D, HRA, and home loan interest.</p>
    
    <h3>The Tax Slabs Schedular (FY 2024-25 / AY 2025-26)</h3>
    <div class="formula-box">
      <strong>New Tax Regime Slabs:</strong><br>
      • Up to ₹3,00,000: Nil<br>
      • ₹3,00,001 to ₹6,00,000: 5%<br>
      • ₹6,00,001 to ₹9,00,000: 10%<br>
      • ₹9,00,001 to ₹12,00,000: 15%<br>
      • ₹12,00,001 to ₹15,00,000: 20%<br>
      • Above ₹15,00,000: 30%<br><br>
      <strong>Old Tax Regime Slabs:</strong><br>
      • Up to ₹2,50,000: Nil<br>
      • ₹2,50,001 to ₹5,00,000: 5%<br>
      • ₹5,00,001 to ₹10,00,000: 20%<br>
      • Above ₹10,00,000: 30%
    </div>
    
    <h3>Step-by-Step Example Calculation</h3>
    <p>Let's calculate tax for a salaried individual with a Gross Income of <strong>₹12,00,000</strong> claiming <strong>₹1,50,000</strong> u/s 80C under the Old Regime:
    <br><strong>1. New Tax Regime:</strong>
    <br>• Gross Income: ₹12,00,000
    <br>• Less Standard Deduction: ₹75,000
    <br>• Taxable Income: ₹11,25,000
    <br>• Tax calculation: 5% of (6L-3L) + 10% of (9L-6L) + 15% of (11.25L-9L) = ₹15,000 + ₹30,000 + ₹33,750 = ₹78,750
    <br>• Health & Education Cess (4%): ₹3,150
    <br>• Total Tax Payable: <strong>₹81,900</strong>
    <br><strong>2. Old Tax Regime:</strong>
    <br>• Gross Income: ₹12,00,000
    <br>• Less Standard Deduction: ₹50,000
    <br>• Less Section 80C: ₹1,50,000
    <br>• Taxable Income: ₹10,00,000
    <br>• Tax calculation: 5% of (5L-2.5L) + 20% of (10L-5L) = ₹12,500 + ₹1,00,000 = ₹1,12,500
    <br>• Health & Education Cess (4%): ₹4,500
    <br>• Total Tax Payable: <strong>₹1,17,000</strong>
    <br>In this case, the New Regime saves ₹35,100.</p>

    <h3>Use Cases</h3>
    <ul>
      <li><strong>Annual Tax Filing:</strong> Selecting the optimal tax regime before filing your Income Tax Return (ITR).</li>
      <li><strong>Investment Planning:</strong> Deciding whether locking funds in tax-saving instruments is beneficial compared to the lower rates of the New Regime.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the standard deduction for salaried individuals?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Under the New Tax Regime for FY 2024-25, the standard deduction is ₹75,000. Under the Old Tax Regime, the standard deduction remains ₹50,000.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is Section 87A rebate?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Section 87A provides a tax rebate to individuals. Under the New Regime, if your taxable income is up to ₹7,00,000, you pay zero tax. Under the Old Regime, the rebate is available for taxable incomes up to ₹5,00,000.
          </div>
        </div>
      </div>
    </div>
  `,

  'tds-calculator': `
    <h2>Introduction to Tax Deducted at Source (TDS)</h2>
    <p>TDS is a mechanism introduced by the Income Tax Department where a person responsible for making payments is required to deduct tax at source and deposit it to the government. TDS prevents tax evasion and ensures steady revenue collection throughout the fiscal year.</p>
    
    <h3>TDS Calculation Formula</h3>
    <div class="formula-box">
      TDS Amount = Payment Amount × (TDS Rate / 100)<br>
      Net Payable Amount = Payment Amount - TDS Amount
    </div>
    
    <h3>Example Calculation</h3>
    <p>Consider professional fees of <strong>₹1,00,000</strong> payable to an architect under Section 194J:
    <br><strong>PAN Supplied:</strong> TDS rate is 10%. TDS = ₹10,000, Net Payable = ₹90,000.
    <br><strong>No PAN Supplied:</strong> Under Section 206AA, if a payee fails to furnish their PAN, tax is deducted at a flat rate of 20%. TDS = ₹20,000, Net Payable = ₹80,000.</p>
    
    <h3>Common Section Rates</h3>
    <ul>
      <li><strong>Section 194J:</strong> Professional/Technical Fees (10% or 2% for technical/call centers).</li>
      <li><strong>Section 194C:</strong> Payments to Contractors (1% for Individuals/HUF, 2% for HUF/Companies).</li>
      <li><strong>Section 194I:</strong> Rental income (10% on Land/Building, 2% on Plant & Machinery).</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How can I check if my TDS has been deposited?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            You can verify all TDS credits by downloading Form 26AS from the Income Tax e-filing portal, or checking your Annual Information Statement (AIS).
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What happens if TDS is deducted but I have no taxable income?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            If your total annual taxable income falls below the exemption limit, you can claim a full refund of the TDS deducted by filing your annual ITR.
          </div>
        </div>
      </div>
    </div>
  `,

  'tax-saving-calculator': `
    <h2>Understanding Old Regime Tax Savings</h2>
    <p>Under the Old Tax Regime, taxpayers can significantly reduce their tax liabilities by investing in statutory savings products. The Tax Saving Calculator estimates how much tax you can save by fully utilizing exemptions under Section 80C and Section 80D.</p>
    
    <h3>The Tax Savings Formula</h3>
    <div class="formula-box">
      Tax Savings = Tax Liability (Without Planned Investments) - Tax Liability (With Planned Investments)
    </div>
    
    <h3>Example Calculation</h3>
    <p>A taxpayer has a gross annual income of ₹10,00,000. Currently, they have only ₹50,000 in Section 80C (EPF).
    <br><strong>Without additional savings:</strong> Total taxable income is ₹10L - ₹50,000 (std deduction) - ₹50,000 (EPF) = ₹9,00,000. Old Regime tax is ₹96,200.
    <br><strong>With ₹1,00,000 additional Section 80C investments:</strong> Taxable income becomes ₹8,00,000. Old Regime tax is ₹75,400.
    <br><strong>Total Savings:</strong> ₹96,200 - ₹75,400 = <strong>₹20,800 saved</strong>.</p>
    
    <h3>Practical Use Cases</h3>
    <ul>
      <li><strong>Year-End Tax Planning:</strong> Assessing how much to invest in ELSS, PPF, or Insurance before the March 31 deadline.</li>
      <li><strong>Salary Structuring:</strong> Deciding on voluntary PF contributions.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the maximum investment limit for Section 80C?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            The maximum combined deduction allowed under Section 80C, 80CCC, and 80CCD(1) is ₹1,50,000 per financial year.
          </div>
        </div>
      </div>
    </div>
  `,

  'hra-calculator': `
    <h2>House Rent Allowance Exemption u/s 10(13A)</h2>
    <p>Salaried individuals who live in rented accommodation can claim tax exemption on their House Rent Allowance (HRA). The HRA Calculator computes the exact exempt and taxable portions based on your salary components and rent payments.</p>
    
    <h3>HRA Exemption Rules</h3>
    <p>The exempt HRA amount is the <strong>minimum</strong> of the following three conditions:</p>
    <div class="formula-box">
      1. Actual HRA received from the employer.<br>
      2. Actual rent paid minus 10% of Salary (Basic + DA).<br>
      3. 50% of Salary if living in a Metro city, or 40% of Salary for Non-Metro cities.
    </div>
    
    <h3>Example Calculation</h3>
    <p>An employee in Mumbai has a monthly Basic Salary of ₹50,000, receives ₹22,000 HRA, and pays ₹18,000 rent:
    <br>• Monthly HRA received: <strong>₹22,000</strong>
    <br>• Rent - 10% of Basic: ₹18,000 - ₹5,000 = <strong>₹13,000</strong>
    <br>• 50% of Basic (Metro): <strong>₹25,000</strong>
    <br>The HRA exemption is the minimum, which is <strong>₹13,000 per month</strong>. The remaining ₹9,000 is taxable.</p>
    
    <h3>Important Documents Required</h3>
    <ul>
      <li><strong>Rent Receipts:</strong> Receipts signed by the landlord.</li>
      <li><strong>Rent Agreement:</strong> Valid registered or notarized lease agreement.</li>
      <li><strong>Landlord's PAN:</strong> Mandatory if total annual rent paid exceeds ₹1,00,000.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I claim HRA if I live in my own house?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No. To claim HRA exemption, you must actually pay rent for the residential accommodation you occupy. Living in your own property makes the entire HRA allowance taxable.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I claim HRA and Home Loan deductions simultaneously?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes. If you own a house (claiming interest and principal deductions) but reside in a rented house in another city or area due to employment/business, you can claim both HRA and home loan benefits.
          </div>
        </div>
      </div>
    </div>
  `,

  'gratuity-calculator': `
    <h2>Retirement Benefits: Payment of Gratuity</h2>
    <p>Gratuity is a lump sum payment made by an employer as a token of appreciation for services rendered by an employee. Under the Payment of Gratuity Act 1972, employees are entitled to gratuity after completing 5 years of continuous service.</p>
    
    <h3>Gratuity Payout Formulas</h3>
    <div class="formula-box">
      <strong>For Covered Employees:</strong><br>
      Gratuity = (15 × Last Drawn Salary × Service Years) / 26<br><br>
      <strong>For Non-Covered Employees:</strong><br>
      Gratuity = (15 × Last Drawn Salary × Service Years) / 30
    </div>
    <p>Note: Salary includes Basic + Dearness Allowance (DA). "26" represents working days in a month, and "30" represents calendar days.</p>
    
    <h3>Example Calculation</h3>
    <p>An employee covered under the Act retires after 8 years of service with a final monthly Basic + DA of ₹80,000:
    <br><code>Gratuity = (15 × ₹80,000 × 8) / 26 = ₹3,69,230</code>
    <br>This entire amount is tax-free since it falls below the statutory exemption threshold of ₹20,00,000.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li><strong>Retirement Projections:</strong> Planning post-retirement funds.</li>
      <li><strong>Resignation/Switching Jobs:</strong> Estimating gratuity collection if leaving after 5+ years of tenure.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Is gratuity taxable in India?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Gratuity is tax-exempt under Section 10(10) of the Income Tax Act up to a maximum lifetime statutory limit of ₹20,00,000. Gratuity received in excess of this limit is taxable.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Does a fraction of a year count?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes. For employees covered under the Act, service periods of 6 months or more are rounded up to the next full year. For example, 5 years and 7 months is calculated as 6 years.
          </div>
        </div>
      </div>
    </div>
  `,

  'professional-tax-calculator': `
    <h2>Understanding State Professional Tax Slabs</h2>
    <p>Professional tax is a direct tax levied by state governments on individuals earning income through employment, trade, or professional practices. The maximum annual levy is constitutionally capped at ₹2,500.</p>
    
    <h3>State-Wise Calculations</h3>
    <p>Rates and exemptions vary by state. The Professional Tax Calculator automatically applies rules for major states:</p>
    <div class="formula-box">
      • <strong>Karnataka:</strong> ₹200/month for salary above ₹15,000. Exempt below that.<br>
      • <strong>Maharashtra:</strong> ₹200/month (₹300 in Feb) for salary above ₹10,000 for males. Females are exempt up to ₹25,000.<br>
      • <strong>West Bengal:</strong> Slabs range from ₹110 to ₹200/month based on earnings.
    </div>
    
    <h3>Example Calculation</h3>
    <p>A male employee in Pune, Maharashtra earning ₹35,000 monthly:
    <br>• Since monthly salary exceeds ₹10,000, Professional Tax is ₹200 per month.
    <br>• In February, the charge is adjusted to ₹300.
    <br>• Total Annual Liability: ₹2,500.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Who deducts and deposits Professional Tax?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            For salaried employees, the employer is responsible for deducting Professional Tax from monthly wages and filing returns. Self-employed professionals must register and pay it directly to the state department.
          </div>
        </div>
      </div>
    </div>
  `,

  'gst-calculator': `
    <h2>Indian Goods and Services Tax (GST) Guide</h2>
    <p>GST is a comprehensive, multi-stage, destination-based indirect tax levied on the sale of goods and services in India. CGST represents Central tax, SGST represents State tax, and IGST is levied on interstate transfers.</p>
    
    <h3>GST Calculation Formulas</h3>
    <div class="formula-box">
      <strong>Add GST (Exclusive Price):</strong><br>
      GST Amount = Net Price × (Rate / 100)<br>
      Total Price = Net Price + GST Amount<br><br>
      <strong>Remove GST (Inclusive Price):</strong><br>
      Net Price = Total Price / (1 + Rate/100)<br>
      GST Amount = Total Price - Net Price
    </div>
    
    <h3>Example Calculation</h3>
    <p>Adding 18% GST to services worth ₹10,000:
    <br>• Net Price: ₹10,000
    <br>• GST Amount: ₹10,000 × 0.18 = ₹1,800 (split as ₹900 CGST and ₹900 SGST)
    <br>• Total Gross Amount: ₹11,800.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the difference between CGST, SGST, and IGST?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            CGST (Central GST) and SGST (State GST) are levied on transactions within a single state, and the tax revenue is shared equally. IGST (Integrated GST) is applied to interstate transactions and goes directly to the Central Government.
          </div>
        </div>
      </div>
    </div>
  `,

  'reverse-gst-calculator': `
    <h2>Back-Calculating GST Inclusive Slabs</h2>
    <p>When purchasing retail items, prices are often displayed including GST. The Reverse GST Calculator helps businesses and consumers extract the base pre-tax value and exact tax paid from the final retail price.</p>
    
    <h3>Reverse GST Mathematical Formula</h3>
    <div class="formula-box">
      Original Pre-Tax Price = GST Inclusive Price / (1 + Rate / 100)<br>
      Total GST Tax = GST Inclusive Price - Original Pre-Tax Price
    </div>
    
    <h3>Example Calculation</h3>
    <p>A laptop bought for ₹59,000 inclusive of 18% GST:
    <br>• Base Pre-Tax Price = ₹59,000 / 1.18 = <strong>₹50,000</strong>
    <br>• Total GST Paid = ₹59,000 - ₹50,000 = <strong>₹9,000</strong>
    <br>• CGST: ₹4,500, SGST: ₹4,500.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why is reverse GST calculation important for businesses?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Businesses need to extract the base net price to record expenses accurately and claim Input Tax Credit (ITC) on the GST amount paid for commercial inputs.
          </div>
        </div>
      </div>
    </div>
  `,

  'section-80c-calculator': `
    <h2>Section 80C Tax Planning Guide</h2>
    <p>Section 80C of the Income Tax Act is the most popular tax-saving provision in India. It allows individual taxpayers to claim deductions up to ₹1,50,000 per financial year by investing in designated government and financial instruments under the Old Regime.</p>
    
    <h3>Eligible Investments Include:</h3>
    <ul>
      <li><strong>Public Provident Fund (PPF):</strong> Sovereign-backed 15-year savings scheme.</li>
      <li><strong>Employee Provident Fund (EPF):</strong> Monthly retirement contributions deducted from salary.</li>
      <li><strong>ELSS Mutual Funds:</strong> Equity-linked mutual funds with a short 3-year lock-in period.</li>
      <li><strong>Home Loan Principal:</strong> Principal repayments on housing loans.</li>
      <li><strong>School Tuition Fees:</strong> Tuition fees paid for up to 2 children.</li>
    </ul>

    <h3>Calculation Rule</h3>
    <div class="formula-box">
      Total Deductible = Minimum of (Total Invested, ₹1,50,000)
    </div>

    <h3>Example Calculation</h3>
    <p>A taxpayer invests ₹50,000 in PPF, ₹30,000 in ELSS, and pays ₹80,000 home loan principal:
    <br>• Total Investments: ₹1,60,000
    <br>• Eligible Deduction: ₹1,50,000 (capped u/s 80C limit)
    <br>• Excess Amount: ₹10,000 (cannot be claimed as tax deduction).</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Are ELSS dividend options eligible for tax saving?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes. The investment principal in ELSS qualifies for Section 80C deduction regardless of whether you select growth or dividend income payout options.
          </div>
        </div>
      </div>
    </div>
  `,

  'section-80d-calculator': `
    <h2>Section 80D: Health Insurance Tax Deductions</h2>
    <p>Section 80D provides deduction on premium paid towards health insurance policies for self, family, and parents. This is in addition to the deductions available under Section 80C.</p>
    
    <h3>Section 80D Exemption Limits</h3>
    <div class="formula-box">
      • <strong>Self, Spouse, and Children:</strong> Max ₹25,000 (Increases to ₹50,000 if self/spouse are senior citizens).<br>
      • <strong>Parents:</strong> Max ₹25,000 (Increases to ₹50,000 if parents are senior citizens).<br>
      • <strong>Preventive Health Checkup:</strong> Max ₹5,000 cumulative across self/parents (included within the limits above).
    </div>
    
    <h3>Example Calculation</h3>
    <p>A taxpayer pays ₹18,000 premium for self, and ₹35,000 premium for senior citizen parents:
    <br>• Self/Family eligible premium: ₹18,000 (under ₹25,000 cap).
    <br>• Parents eligible premium: ₹35,000 (under ₹50,000 cap for seniors).
    <br>• Total Section 80D Deduction: ₹53,000.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Is premium paid in cash eligible for Section 80D deduction?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No. Premiums paid in cash are not eligible for tax benefits. Payments must be made via digital modes, cards, net banking, or cheques. However, payments for preventive health checkups are eligible even if paid in cash.
          </div>
        </div>
      </div>
    </div>
  `,

  'capital-gain-calculator': `
    <h2>Capital Gains Tax u/s 111A and 112A</h2>
    <p>Profits made from selling capital assets like equity shares, mutual funds, or house properties are classified as Capital Gains. They are divided into Short-Term (STCG) and Long-Term (LTCG) based on the asset class holding period.</p>
    
    <h3>Holding Period Rules & Slabs (Union Budget 2024 revised)</h3>
    <p>Following the Budget 2024 revisions:</p>
    <div class="formula-box">
      • <strong>Equity Shares / Mutual Funds:</strong><br>
        - Long-Term if held for &gt; 12 months. Tax rate: 12.5% (Exemption threshold increased to ₹1.25 Lakhs u/s 112A).<br>
        - Short-Term if held for &le; 12 months. Tax rate: 20% flat u/s 111A.<br><br>
      • <strong>Real Estate / House Property:</strong><br>
        - Long-Term if held for &gt; 24 months. Tax rate: 12.5% without indexation.<br>
        - Short-Term if held for &le; 24 months. Taxed at individual slab rates.
    </div>
    
    <h3>Example Calculation</h3>
    <p>Selling listed shares for ₹3,50,000 which were purchased 18 months ago for ₹2,00,000, incurring ₹5,000 broker expenses:
    <br>• Hold Period: 1.5 Years (Long-Term).
    <br>• Net Capital Gain: ₹3,50,000 - ₹2,00,000 - ₹5,000 = <strong>₹1,45,000</strong>
    <br>• Less Exemption: ₹1,25,000
    <br>• Taxable LTCG Amount: ₹20,000
    <br>• Estimated LTCG Tax: ₹20,000 × 12.5% = ₹2,500 (+ 4% Cess = ₹2,600).</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the grandfathering clause for LTCG on equity?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            For shares/mutual funds acquired before January 31, 2018, gains accrued up to that date are grandfathered (exempt from tax) u/s 112A, and the acquisition cost is adjusted to the fair market value as of Jan 31, 2018.
          </div>
        </div>
      </div>
    </div>
  `
});
