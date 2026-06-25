'use strict';

window.NC_ARTICLES = window.NC_ARTICLES || {};

Object.assign(window.NC_ARTICLES, {
  'bmi-calculator': `
    <h2>Introduction to Body Mass Index (BMI)</h2>
    <p>Body Mass Index (BMI) is a simple numerical measure of a person's weight relative to their height. It is a widely accepted screening tool used by healthcare providers to classify individuals into underweight, normal weight, overweight, and obese categories.</p>
    
    <h3>The BMI Formula</h3>
    <div class="formula-box">BMI = Weight (kg) / [Height (m)]²</div>
    
    <h3>Example Calculation</h3>
    <p>For a weight of 70 kg and a height of 170 cm (1.70 meters):
    <br><strong>Height squared:</strong> 1.70 × 1.70 = 2.89 m²
    <br><strong>BMI calculation:</strong> 70 / 2.89 = 24.22 kg/m² (Normal Weight)</p>
    
    <h3>BMI Classification Table</h3>
    <ul>
      <li><strong>Underweight:</strong> BMI less than 18.5</li>
      <li><strong>Normal Weight:</strong> BMI between 18.5 and 24.9</li>
      <li><strong>Overweight:</strong> BMI between 25.0 and 29.9</li>
      <li><strong>Obese:</strong> BMI of 30.0 or higher</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Is BMI the same for men and women?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes, the standard BMI formula is calculated the same way for adult men and women. However, women tend to have more body fat than men at the same BMI.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Are there limitations to BMI measurements?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes. BMI is a general indicator and does not distinguish between muscle mass and fat. Bodybuilders or highly active individuals may have a high BMI despite low body fat levels.
          </div>
        </div>
      </div>
    </div>
  `,

  'bmr-calculator': `
    <h2>Understanding Basal Metabolic Rate (BMR)</h2>
    <p>Basal Metabolic Rate (BMR) represents the minimum number of calories your body needs to maintain basic life-sustaining functions (such as breathing, blood circulation, and cellular repair) when at complete rest.</p>
    
    <h3>The BMR Formula (Mifflin-St Jeor)</h3>
    <div class="formula-box">
      Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5<br>
      Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    </div>
    
    <h3>Example Calculation</h3>
    <p>For a 25-year-old male who weighs 70 kg and is 170 cm tall:
    <br><strong>BMR:</strong> (10 × 70) + (6.25 × 170) - (5 × 25) + 5 = 700 + 1062.5 - 125 + 5 = 1,642.5 kcal/day.</p>
    
    <h3>Factors Influencing BMR</h3>
    <ul>
      <li><strong>Muscle Mass:</strong> More muscle tissue increases BMR because muscle burns more calories than fat at rest.</li>
      <li><strong>Age:</strong> BMR generally declines as you get older due to loss of muscle tissue.</li>
      <li><strong>Genetics & Hormones:</strong> Thyroid function and other genetic variables play a large role in metabolic speed.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How does BMR differ from TDEE?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            BMR is the caloric baseline needed just to survive at rest. TDEE (Total Daily Energy Expenditure) adds physical activity levels on top of your BMR to show your actual daily maintenance calories.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I increase my BMR?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes, the most effective way to increase BMR is by building lean muscle mass through strength and resistance training, as muscle is more metabolically active than fat.
          </div>
        </div>
      </div>
    </div>
  `,

  'tdee-calculator': `
    <h2>What is Total Daily Energy Expenditure (TDEE)?</h2>
    <p>Total Daily Energy Expenditure (TDEE) is an estimation of the total number of calories your body burns in a single day, taking into account both your Basal Metabolic Rate (BMR) and physical activity levels.</p>
    
    <h3>The TDEE Formula</h3>
    <div class="formula-box">TDEE = BMR × Activity Multiplier</div>
    
    <h3>Activity Multipliers</h3>
    <ul>
      <li><strong>Sedentary (desk job, little/no exercise):</strong> 1.2</li>
      <li><strong>Lightly Active (light exercise 1-3 days/week):</strong> 1.375</li>
      <li><strong>Moderately Active (moderate exercise 3-5 days/week):</strong> 1.55</li>
      <li><strong>Very Active (heavy exercise 6-7 days/week):</strong> 1.725</li>
      <li><strong>Athlete (extremely heavy workouts twice daily):</strong> 1.9</li>
    </ul>
    
    <h3>Example Calculation</h3>
    <p>If your BMR is 1,642.5 kcal/day and you are moderately active:
    <br><strong>TDEE:</strong> 1,642.5 × 1.55 = 2,546 kcal/day to maintain weight.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How do I use TDEE for weight loss?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            To lose weight, you should eat fewer calories than your TDEE (usually a deficit of 300 to 500 kcal/day). This forces your body to use stored fat for energy.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How often should I recalculate my TDEE?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            It is recommended to recalculate your TDEE every time you lose or gain 4-5 kg of body weight, as your metabolic baseline changes with body composition.
          </div>
        </div>
      </div>
    </div>
  `,

  'body-fat-calculator': `
    <h2>Understanding Body Fat Percentage</h2>
    <p>Body fat percentage represents the proportion of your body weight that is fat tissue compared to lean mass (muscles, bones, organs, water). It is a better indicator of body composition and physical fitness than scale weight alone.</p>
    
    <h3>The US Navy Circumference Formula</h3>
    <p>The US Navy formula estimates body fat percentage using key circumference measurements:</p>
    <div class="formula-box">
      Men: BF (%) = 495 / [1.0324 - 0.19077 × log10(Waist - Neck) + 0.15456 × log10(Height)] - 450<br>
      Women: BF (%) = 495 / [1.29579 - 0.35004 × log10(Waist + Hip - Neck) + 0.22100 × log10(Height)] - 450
    </div>
    
    <h3>Clinical Guidelines</h3>
    <ul>
      <li><strong>Essential Fat:</strong> 2-5% (Men) | 10-13% (Women)</li>
      <li><strong>Athletes / Fit Range:</strong> 6-17% (Men) | 14-24% (Women)</li>
      <li><strong>Average / Acceptable:</strong> 18-24% (Men) | 25-31% (Women)</li>
      <li><strong>Obese Bracket:</strong> 25%+ (Men) | 32%+ (Women)</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How accurate is the US Navy body fat method?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            While not as precise as a DEXA scan or hydrostatic weighing, the US Navy method is highly reliable for most individuals, usually staying within a 3-4% margin of error.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why do women need higher body fat than men?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Women require higher essential body fat for reproductive, hormonal, and physiological health. Essential fat supports childbearing and hormone synthesis.
          </div>
        </div>
      </div>
    </div>
  `,

  'lean-body-mass': `
    <h2>What is Lean Body Mass (LBM)?</h2>
    <p>Lean Body Mass (LBM) is the amount of weight you carry on your body that is not fat tissue. It represents the weight of your muscles, bones, organs, skin, and body water.</p>
    
    <h3>The Boer Formula for LBM</h3>
    <div class="formula-box">
      Men: LBM = 0.407 × Weight (kg) + 0.267 × Height (cm) - 19.2<br>
      Women: LBM = 0.252 × Weight (kg) + 0.473 × Height (cm) - 48.3
    </div>
    
    <h3>Example Calculation</h3>
    <p>For a male who weighs 70 kg and is 170 cm tall:
    <br><strong>LBM Boer:</strong> (0.407 × 70) + (0.267 × 170) - 19.2 = 28.49 + 45.39 - 19.2 = 54.68 kg.
    <br><strong>Fat Mass:</strong> 70 kg - 54.68 kg = 15.32 kg.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why is tracking Lean Body Mass important?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            When losing weight, tracking LBM helps ensure you are losing actual fat rather than burning metabolically active muscle tissue.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How do I increase my LBM ratio?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Engage in regular strength training or hypertrophy exercise combined with adequate dietary protein to build muscle tissue.
          </div>
        </div>
      </div>
    </div>
  `,

  'ideal-weight': `
    <h2>Understanding Ideal Body Weight (IBW)</h2>
    <p>Ideal Body Weight estimates suggest health-focused target weights based on clinical height and biological sex. It is commonly used in pharmacology for drug dosage calculations.</p>
    
    <h3>The Devine Formula (1974)</h3>
    <div class="formula-box">
      Men: IBW = 50.0 + 2.3 kg per inch over 5 feet (60 inches)<br>
      Women: IBW = 45.5 + 2.3 kg per inch over 5 feet (60 inches)
    </div>
    
    <h3>Example Calculation</h3>
    <p>For a male who is 170 cm tall (66.9 inches, or 6.9 inches over 5 feet):
    <br><strong>Ideal Weight:</strong> 50.0 + 2.3 × 6.9 = 65.87 kg.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Does the ideal weight formula account for muscle mass?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No. The classic formulas do not account for muscle mass, body frame thickness, or bone density. It is a general guideline.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why are there different ideal weight formulas?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Different researchers (Devine, Robinson, Miller, Hamwi) developed models based on varying clinical datasets to refine standard weight guidelines.
          </div>
        </div>
      </div>
    </div>
  `,

  'weight-loss': `
    <h2>How to Plan for Weight Loss</h2>
    <p>Safe and sustainable weight loss involves maintaining a controlled calorie deficit. This forces the body to burn stored fat for daily metabolic energy.</p>
    
    <h3>The Weight Loss Equation</h3>
    <div class="formula-box">Daily Calorie Budget = TDEE - Daily Deficit</div>
    <p>Note: One kilogram of fat contains approximately 7,700 calories of metabolic energy. A weekly deficit of 3,850 kcal helps lose 0.5 kg of body fat.</p>
    
    <h3>Example Calculation</h3>
    <p>If your TDEE is 2,200 calories and you wish to lose 0.5 kg/week:
    <br><strong>Daily Deficit:</strong> 550 kcal (0.5 × 1,100 kcal)
    <br><strong>Recommended Calorie Intake:</strong> 2,200 - 550 = 1,650 kcal/day.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the minimum safe daily calorie intake?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            For general safety, it is recommended that adult men consume at least 1,500 kcal/day and women consume at least 1,200 kcal/day to prevent nutritional deficiency unless under medical supervision.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why is rapid weight loss discouraged?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Rapid weight loss (more than 1 kg per week) often leads to significant muscle loss, metabolic slowing, and nutritional deficiencies.
          </div>
        </div>
      </div>
    </div>
  `,

  'weight-gain': `
    <h2>Healthy Weight Gain Principles</h2>
    <p>Gaining weight in a healthy way involves maintaining a structured caloric surplus, prioritizing nutrient-dense foods, and engaging in resistance training to build muscle mass rather than excess fat.</p>
    
    <h3>The Weight Gain Equation</h3>
    <div class="formula-box">Daily Calorie Budget = TDEE + Daily Surplus</div>
    
    <h3>Example Calculation</h3>
    <p>If your TDEE is 2,000 calories and you want to gain 0.25 kg/week:
    <br><strong>Daily Surplus:</strong> 275 kcal (0.25 × 1,100 kcal)
    <br><strong>Recommended Calorie Intake:</strong> 2,000 + 275 = 2,275 kcal/day.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How do I gain clean muscle instead of fat?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Keep your calorie surplus small (200-300 kcal/day), consume high protein (1.6-2g per kg), and perform progressive strength training workouts.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What foods are best for healthy weight gain?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Focus on energy-dense, nutritious foods such as nuts, seeds, nut butters, whole grains, avocados, eggs, cheese, and lean meats.
          </div>
        </div>
      </div>
    </div>
  `,

  'calorie-calculator': `
    <h2>How to Calculate Your Calorie Requirements</h2>
    <p>Your daily calorie requirement is the amount of energy your body needs to fuel its daily activity. Balancing energy intake with expenditures controls weight stability.</p>
    
    <h3>The Calorie Calculation Model</h3>
    <div class="formula-box">Calorie Target = BMR × Activity Factor + Goal Offset</div>
    
    <h3>Goal Offsets</h3>
    <ul>
      <li><strong>Weight Maintenance:</strong> Offset = 0</li>
      <li><strong>Standard Weight Loss:</strong> Offset = -500 kcal</li>
      <li><strong>Extreme Weight Loss:</strong> Offset = -1,000 kcal</li>
      <li><strong>Weight Gain:</strong> Offset = +500 kcal</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Are all calories created equal?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            While weight management is governed by calories in vs calories out, the source of calories (macronutrients) affects satiety, hormone health, and metabolic function.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How do I track calories accurately?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Use digital food journals or tracking apps, weigh food ingredients with a digital kitchen scale, and read nutrition labels for serving size indications.
          </div>
        </div>
      </div>
    </div>
  `,

  'water-intake': `
    <h2>Hydration and Daily Water Needs</h2>
    <p>Water is essential for every metabolic process in the human body, including temperature regulation, cellular respiration, digestion, and cognitive health.</p>
    
    <h3>The Hydration Target Formula</h3>
    <div class="formula-box">Water Intake (L) = (Weight in kg × 35 mL/kg) / 1000 + Activity Offset + Climate Offset</div>
    
    <h3>Adjustments</h3>
    <ul>
      <li><strong>Physical Activity:</strong> Add 0.5 Liters for active workouts, 1.0 Liter for heavy training.</li>
      <li><strong>Climate Condition:</strong> Add 0.5 Liters for hot summer climates.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Do tea, coffee, and fruits count as fluid intake?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes. Around 20% of your daily water intake comes from moisture in solid foods, and herbal tea, decaf coffee, and water-rich foods (like watermelon) also contribute to hydration.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How do I recognize signs of dehydration?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Common symptoms include dry mouth, fatigue, headaches, dizziness, and dark yellow urine. Properly hydrated urine should be pale yellow.
          </div>
        </div>
      </div>
    </div>
  `,

  'protein-intake': `
    <h2>How Much Protein Do You Need Daily?</h2>
    <p>Protein is the primary structural building block for muscle repair, enzyme synthesis, hair, skin, and immune cells. Adequate intake is key for recovery.</p>
    
    <h3>Daily Protein Target Formula</h3>
    <div class="formula-box">Daily Protein (g) = Weight (kg) × (Workout Intensity Multiplier + Goal Offset)</div>
    
    <h3>Intensity Coefficients</h3>
    <ul>
      <li><strong>Sedentary Lifestyle:</strong> 0.8g per kg</li>
      <li><strong>Light/Cardio Workouts:</strong> 1.2g per kg</li>
      <li><strong>Strength Training:</strong> 1.6g per kg</li>
      <li><strong>Heavy Athlete:</strong> 2.0g per kg</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can you consume too much protein?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            For healthy adults, higher protein intake (up to 2.2g per kg) is safe. The body metabolizes excess protein for energy or excretes it. Consult a doctor if you have chronic kidney disease.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What are excellent plant-based protein sources?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Great vegan protein sources include lentils, chickpeas, tofu, tempeh, edamame, seitan, quinoa, chia seeds, hemp seeds, and plant-based protein powders.
          </div>
        </div>
      </div>
    </div>
  `,

  'macro-calculator': `
    <h2>Understanding Macronutrients (Macros)</h2>
    <p>Macronutrients are the energy-supplying molecules your body needs in large quantities: Carbohydrates, Proteins, and Fats. Distributing these affects athletic performance and body composition.</p>
    
    <h3>Macro Energy Densities</h3>
    <div class="formula-box">
      Carbohydrates = 4 kcal/gram | Protein = 4 kcal/gram | Dietary Fats = 9 kcal/gram
    </div>
    
    <h3>Example Split Calculation</h3>
    <p>For a 2,000 calorie daily diet using a Balanced ratio (40% Carbs, 30% Protein, 30% Fat):
    <br><strong>Carbohydrates:</strong> 800 kcal / 4 = 200 grams/day.
    <br><strong>Protein:</strong> 600 kcal / 4 = 150 grams/day.
    <br><strong>Dietary Fats:</strong> 600 kcal / 9 = 66.7 grams/day.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What macro ratio is best for fat loss?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            While fat loss requires a calorie deficit, a higher protein ratio (35-45% of calories) helps preserve muscle tissue and increase feelings of fullness.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Do macro ratios override calorie rules?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No. Energy balance is primary. A perfect macro split will not cause weight loss if you are consuming a caloric surplus.
          </div>
        </div>
      </div>
    </div>
  `,

  'meal-calorie-calculator': `
    <h2>Meal Calorie Distribution</h2>
    <p>Dividing your daily calories across breakfast, lunch, dinner, and snacks can prevent overeating, maintain stable insulin levels, and support energy levels.</p>
    
    <h3>Standard Meal Calorie Allocations</h3>
    <div class="formula-box">
      3 Meals Plan: Breakfast (30%) | Lunch (40%) | Dinner (30%)<br>
      4 Meals Plan: Breakfast (25%) | Lunch (35%) | Snack (15%) | Dinner (25%)
    </div>
    
    <h3>Example Allocation</h3>
    <p>For a 2,000 calorie diet on a 3-meal plan:
    <br><strong>Breakfast:</strong> 600 kcal.
    <br><strong>Lunch:</strong> 800 kcal.
    <br><strong>Dinner:</strong> 600 kcal.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Is skipping breakfast bad for my health?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Not necessarily. Intermittent fasting (skipping breakfast and eating in a restricted window) is a safe and effective strategy for many people, provided total daily nutrients are met.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Should dinner be my smallest meal?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Eating a heavy meal right before sleep can disrupt sleep quality and digestion. Distributing a moderate portion of calories to dinner (25-30%) is generally optimal.
          </div>
        </div>
      </div>
    </div>
  `,

  'heart-rate': `
    <h2>Maximum Heart Rate Estimation</h2>
    <p>Knowing your maximum heart rate (HRmax) helps identify exercise thresholds and design cardio training routines that match your physical conditioning level.</p>
    
    <h3>The Maximum Heart Rate Formula (Fox)</h3>
    <div class="formula-box">HRmax = 220 - Age</div>
    
    <h3>Example Calculation</h3>
    <p>For a 30-year-old individual:
    <br><strong>HRmax:</strong> 220 - 30 = 190 beats per minute (bpm).</p>
    
    <h3>Alternate Formulas</h3>
    <ul>
      <li><strong>Tanaka Equation:</strong> HRmax = 208 - (0.7 × Age) (Preferred for active, middle-aged adults)</li>
      <li><strong>Gellish Equation:</strong> HRmax = 207 - (0.7 × Age) (Validated in clinical cohorts)</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How accurate is the 220 - Age formula?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            The Fox formula has a standard deviation of about 10-12 bpm. It is a general screening benchmark. Elite athletes often have lower resting rates but similar peaks.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why is maximum heart rate useful?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            It allows you to target specific training zones, such as the fat-burn zone (60-70% intensity) or the aerobic fitness zone (70-80% intensity).
          </div>
        </div>
      </div>
    </div>
  `,

  'target-heart-rate': `
    <h2>Target Heart Rate Training Zones</h2>
    <p>Training in specific heart rate zones helps optimize metabolic adaptations, focusing on fat mobilization, cardiovascular endurance, or anaerobic threshold capacity.</p>
    
    <h3>The Karvonen Formula</h3>
    <p>The Karvonen method calculates target heart rate zones by incorporating your Heart Rate Reserve (HRR):</p>
    <div class="formula-box">
      HRR = HRmax - HRrest<br>
      Target HR = (HRR × Intensity %) + HRrest
    </div>
    
    <h3>Example Calculation</h3>
    <p>For a 30-year-old (HRmax = 190) with a resting heart rate of 70 bpm, training at 60% intensity (Fat Burn):
    <br><strong>HRR:</strong> 190 - 70 = 120 bpm
    <br><strong>Target Heart Rate:</strong> (120 × 0.60) + 70 = 72 + 70 = 142 bpm.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What are the main target heart rate zones?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Standard zones include Warmup (50-60%), Fat Burn (60-70%), Aerobic (70-80%), Anaerobic (80-90%), and Red Line peak effort (90-100%).
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How do I measure my resting heart rate (HRrest)?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Measure your pulse at the wrist or neck for 60 seconds immediately after waking up in the morning, before getting out of bed.
          </div>
        </div>
      </div>
    </div>
  `,

  'blood-pressure': `
    <h2>Blood Pressure Assessment</h2>
    <p>Blood pressure measures the force that circulating blood exerts on the walls of your arteries. It is recorded using two numbers: Systolic (top) and Diastolic (bottom) pressure.</p>
    
    <h3>AHA Blood Pressure Categories</h3>
    <ul>
      <li><strong>Normal:</strong> Systolic under 120 AND Diastolic under 80 mmHg</li>
      <li><strong>Elevated:</strong> Systolic 120-129 AND Diastolic under 80 mmHg</li>
      <li><strong>Hypertension Stage 1:</strong> Systolic 130-139 OR Diastolic 80-89 mmHg</li>
      <li><strong>Hypertension Stage 2:</strong> Systolic 140+ OR Diastolic 90+ mmHg</li>
      <li><strong>Hypertensive Crisis:</strong> Systolic over 180 and/or Diastolic over 120 mmHg (emergency medical help needed)</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the difference between Systolic and Diastolic?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Systolic pressure (the top number) measures the force on artery walls during heart contractions. Diastolic pressure (the bottom number) measures pressure when the heart rests between beats.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How can I naturally reduce high blood pressure?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            A heart-healthy diet low in sodium (salt), regular moderate cardiovascular exercise, stress management, maintaining a healthy weight, and avoiding smoking and excessive alcohol can help lower blood pressure.
          </div>
        </div>
      </div>
    </div>
  `,

  'blood-sugar-converter': `
    <h2>Understanding Blood Sugar Metrics</h2>
    <p>Blood sugar (glucose) concentration is measured in two common units: mg/dL (milligrams per deciliter) used primarily in the US and Germany, and mmol/L (millimoles per liter) used in the UK, Canada, and clinical papers.</p>
    
    <h3>The Glucose Conversion Formula</h3>
    <div class="formula-box">
      mmol/L = mg/dL / 18.0182<br>
      mg/dL = mmol/L × 18.0182
    </div>
    
    <h3>Fasting Glucose Brackets</h3>
    <ul>
      <li><strong>Normal Fasting:</strong> 70 to 99 mg/dL (3.9 to 5.5 mmol/L)</li>
      <li><strong>Prediabetes:</strong> 100 to 125 mg/dL (5.6 to 6.9 mmol/L)</li>
      <li><strong>Diabetes:</strong> 126 mg/dL or higher (7.0 mmol/L or higher)</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is fasting blood sugar?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Fasting blood sugar is measured after an overnight fast of at least 8 hours. It is a key indicator used to diagnose insulin resistance and diabetes.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What does HbA1c measure?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            HbA1c measures your average blood sugar level over the past 2 to 3 months by calculating the percentage of hemoglobin coated with sugar.
          </div>
        </div>
      </div>
    </div>
  `,

  'sleep-calculator': `
    <h2>The Science of Sleep Cycles</h2>
    <p>Sleep is structured in biological cycles of approximately 90 minutes. Waking up at the end of a cycle, rather than in the middle of deep sleep, helps you feel refreshed and alert.</p>
    
    <h3>The Sleep Cycle Calculation</h3>
    <p>A standard human sleep cycle consists of Non-REM and REM phases lasting 90 minutes. The calculator factors in sleep latency (the time it takes to fall asleep, averaging 14-15 minutes).</p>
    <div class="formula-box">Wakeup time = Bedtime + (Cycles × 90 minutes) + 15 minutes sleep latency</div>
    
    <h3>Example Calculation</h3>
    <p>To wake up refreshed at 7:00 AM, counting backwards for 5 cycles (7.5 hours of sleep):
    <br><strong>Sleep duration:</strong> 5 × 90 minutes = 450 minutes (7.5 hours)
    <br><strong>Bedtime target:</strong> 7:00 AM - 7.5 hours - 15 minutes = 11:15 PM.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is sleep inertia?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Sleep inertia is the feeling of grogginess and disorientation experienced when waking up suddenly in the middle of a deep sleep stage. Waking up at the end of a 90-minute cycle avoids this.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How many sleep cycles do adults need?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Most healthy adults require 5 to 6 sleep cycles per night, which equates to 7.5 to 9 hours of total sleep.
          </div>
        </div>
      </div>
    </div>
  `,

  'sleep-cycle': `
    <h2>Plan Your Sleep Cycles</h2>
    <p>Structuring your bedtime around 90-minute sleep cycles ensures that your brain transitions to light sleep stages when your alarm sounds, maximizing sleep quality.</p>
    
    <h3>The Sleep Cycle Calculation</h3>
    <div class="formula-box">Wakeup Target = Bedtime + (Cycles × 90 minutes) + 14 minutes latency</div>
    
    <h3>Example Calculation</h3>
    <p>If you plan to fall asleep at 10:00 PM and target 5 sleep cycles:
    <br><strong>Active sleep duration:</strong> 5 × 90 = 450 minutes (7.5 hours)
    <br><strong>Wake up target:</strong> 10:00 PM + 7.5 hours + 14 mins latency = 5:44 AM.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is sleep latency?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Sleep latency is the time it takes you to transition from full wakefulness to light sleep. The clinical average is 10 to 20 minutes.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I catch up on sleep over the weekend?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Sleeping in on weekends can temporarily reduce fatigue but disrupts your body's circadian rhythm (internal clock), making it harder to fall asleep on Sunday night.
          </div>
        </div>
      </div>
    </div>
  `,

  'pregnancy-due-date': `
    <h2>How to Calculate Your Expected Due Date (EDD)</h2>
    <p>A typical human pregnancy lasts approximately 280 days (40 weeks) from the first day of your last menstrual period (LMP). The due date is an estimate of when labor will occur.</p>
    
    <h3>The Calculation Method (Naegele's Rule)</h3>
    <div class="formula-box">EDD = First day of LMP + 280 Days + (Menstrual Cycle - 28 Days)</div>
    
    <h3>Example Calculation</h3>
    <p>If your LMP was October 1, 2025, and you have a 30-day cycle:
    <br><strong>Baseline term (280 days):</strong> July 8, 2026
    <br><strong>Cycle adjustment (+2 days):</strong> Expected Due Date is July 10, 2026.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How accurate is the estimated due date?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Only about 4% of babies are born on their exact due date. Most babies are born within 10 days before or after their estimated due date.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What are the three trimesters of pregnancy?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            First Trimester: Weeks 1 to 12. Second Trimester: Weeks 13 to 26. Third Trimester: Weeks 27 to 40+.
          </div>
        </div>
      </div>
    </div>
  `,

  'ovulation-calculator': `
    <h2>Understanding the Ovulation Cycle</h2>
    <p>Ovulation is the release of a mature egg from the ovary. Determining when ovulation occurs is key to identifying your fertile window (the days when conception is most likely).</p>
    
    <h3>The Fertile Window Calculation</h3>
    <p>Ovulation typically occurs 14 days before your next period begins. Because sperm can survive in the female body for up to 5 days and the egg survives for 12-24 hours:</p>
    <div class="formula-box">
      Ovulation Day = LMP Start Date + Cycle Length - 14 Days<br>
      Fertile Window = 5 Days before Ovulation through 1 Day after Ovulation
    </div>
    
    <h3>Example Timeline</h3>
    <p>For a 28-day cycle starting on October 1:
    <br><strong>Ovulation Day:</strong> October 15
    <br><strong>Fertile Window opens:</strong> October 10
    <br><strong>Fertile Window closes:</strong> October 16.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What are signs that ovulation is occurring?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Common symptoms include changes in cervical mucus (becoming thin, clear, and stretchy, like raw egg whites), a slight rise in basal body temperature, and mild lower abdominal cramping.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I track ovulation if my cycles are irregular?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Calculators are less accurate for highly irregular cycles. In such cases, using ovulation predictor kits (OPKs), monitoring basal body temperature, or consulting an obstetrician is recommended.
          </div>
        </div>
      </div>
    </div>
  `,

  'pregnancy-weight-gain': `
    <h2>Pregnancy Weight Gain Guidelines</h2>
    <p>Gaining weight during pregnancy is a natural and necessary response to gestational changes, supporting baby growth, amniotic fluid expansion, blood volume increases, and placenta development.</p>
    
    <h3>Weight Gain Target Ranges (Pre-pregnancy BMI-based)</h3>
    <div class="formula-box">
      Underweight (BMI < 18.5): 12.5 to 18.0 kg<br>
      Normal Weight (BMI 18.5 - 24.9): 11.5 to 16.0 kg<br>
      Overweight (BMI 25.0 - 29.9): 7.0 to 11.5 kg<br>
      Obese (BMI ≥ 30.0): 5.0 to 9.0 kg
    </div>
    
    <h3>Fetal Development weight breakdown</h3>
    <ul>
      <li><strong>Baby weight:</strong> ~3.4 kg</li>
      <li><strong>Placenta:</strong> ~0.7 kg</li>
      <li><strong>Amniotic Fluid:</strong> ~0.9 kg</li>
      <li><strong>Uterus & Breast Growth:</strong> ~1.8 kg</li>
      <li><strong>Maternal Fluids & blood volume:</strong> ~3.6 kg</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How fast should I gain weight during pregnancy?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Weight gain is minimal during the first trimester (typically 0.5 to 2.0 kg total). During the second and third trimesters, a steady gain of 0.3 to 0.5 kg per week is recommended.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Is it safe to go on a weight loss diet during pregnancy?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No, dieting to lose weight during pregnancy is generally unsafe, as it can restrict crucial nutrients your baby needs to develop. Consult your OB/GYN for personalized dietary guidelines.
          </div>
        </div>
      </div>
    </div>
  `
});
