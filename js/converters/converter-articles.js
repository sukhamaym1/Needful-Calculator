'use strict';

window.NC_ARTICLES = window.NC_ARTICLES || {};

Object.assign(window.NC_ARTICLES, {
  'length-converter': `
    <h2>Introduction to Length Conversion</h2>
    <p>Length is the measurement of something from end to end. Converting between metric (meters, centimeters, millimeters) and imperial (inches, feet, yards) systems is necessary across construction, manufacturing, and daily planning tasks.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Feet (ft) = Meters (m) × 3.28084<br>
      Inches (in) = Centimeters (cm) × 0.393701
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>5 meters to feet:</strong> 5 × 3.28084 = 16.4 feet.</li>
      <li><strong>10 inches to centimeters:</strong> 10 / 0.393701 = 25.4 cm.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Meter (m):</strong> The SI base unit of length.</li>
      <li><strong>Centimeter (cm):</strong> Standard metric unit for small objects.</li>
      <li><strong>Foot (ft):</strong> Standard imperial unit (12 inches).</li>
      <li><strong>Inch (in):</strong> Smallest common imperial unit.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the exact ratio of an inch to a centimeter?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            By international agreement, exactly 1 inch is defined as 2.54 centimeters.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How many yards are in a meter?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            One meter is approximately 1.09361 yards, which makes a meter slightly longer than a yard.
          </div>
        </div>
      </div>
    </div>
  `,

  'distance-converter': `
    <h2>Understanding Distance Metrics</h2>
    <p>Distance converters handle long-range geographical dimensions. It allows travelers, cartographers, and navigators to convert between kilometers, miles, and maritime nautical miles.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Miles (mi) = Kilometers (km) × 0.621371<br>
      Nautical Miles (nmi) = Kilometers (km) × 0.539957
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>100 kilometers to miles:</strong> 100 × 0.621371 = 62.14 miles.</li>
      <li><strong>50 miles to kilometers:</strong> 50 / 0.621371 = 80.47 km.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Kilometer (km):</strong> Metric unit of 1,000 meters.</li>
      <li><strong>Mile (mi):</strong> Imperial unit equivalent to 5,280 feet.</li>
      <li><strong>Nautical Mile (nmi):</strong> Unit used in air and sea navigation based on one minute of arc of latitude.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why is a nautical mile different from a land mile?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            A land mile (statute mile) is a fixed historical measurement (5,280 feet). A nautical mile is based on the Earth's circumference, matching one minute of latitude (approx. 6,076 feet).
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How many meters are in a mile?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            There are exactly 1,609.344 meters in one international mile.
          </div>
        </div>
      </div>
    </div>
  `,

  'height-converter': `
    <h2>Height Conversion Guide</h2>
    <p>Height measurements are usually described in feet and inches in some countries and centimeters or meters in others. This tool helps you bridge these standards.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Total Inches (in) = Centimeters (cm) / 2.54<br>
      Feet (ft) = Total Inches / 12 (remainder represents inches)
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>180 cm to feet/inches:</strong> 180 / 2.54 = 70.86 inches. 70.86 / 12 = 5 feet with 10.86 inches left (approx. 5 feet 11 inches).</li>
      <li><strong>6 feet 0 inches to cm:</strong> 72 inches × 2.54 = 182.88 cm.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Centimeter (cm):</strong> Standard healthcare/identification height unit.</li>
      <li><strong>Foot & Inch (ft / in):</strong> The typical system of expressing height in English-speaking nations.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the average height for men and women worldwide?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Globally, the average height is approximately 175 cm (5 ft 9 in) for adult men, and 162 cm (5 ft 4 in) for adult women.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How do I convert fractional feet to inches?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Multiply the decimal part of the feet by 12. For example, 5.75 feet = 5 feet + (0.75 × 12) inches = 5 feet 9 inches.
          </div>
        </div>
      </div>
    </div>
  `,

  'weight-converter': `
    <h2>Introduction to Weight Units</h2>
    <p>Weight measurements quantify the force of gravity acting on mass. Converting between metric (kilograms, grams) and avoirdupois (pounds, ounces) weight is vital for trade, postage, and cooking.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Pounds (lb) = Kilograms (kg) × 2.20462<br>
      Ounces (oz) = Grams (g) × 0.035274
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>50 kg to pounds:</strong> 50 × 2.20462 = 110.23 lbs.</li>
      <li><strong>1 pound to grams:</strong> 1 / 0.00220462 = 453.59 grams.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Kilogram (kg):</strong> Base SI unit of mass.</li>
      <li><strong>Pound (lb):</strong> Common imperial unit (16 ounces).</li>
      <li><strong>Gram (g):</strong> Metric unit for smaller weights.</li>
      <li><strong>Ounce (oz):</strong> Small unit of weight.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the difference between mass and weight?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Mass is the amount of matter in an object and is constant. Weight is the gravitational force acting on that matter and varies depending on gravity (e.g. your weight on the Moon is less, but mass is identical).
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How many grams are in an ounce?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            One ounce is approximately 28.3495 grams.
          </div>
        </div>
      </div>
    </div>
  `,

  'mass-converter': `
    <h2>Mass Metric Conversions</h2>
    <p>Mass quantifies the fundamental inertia of physical matter. Scientists, pharmacists, and cargo companies use mass converters to shift between milligrams, kilograms, stones, and pounds.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Kilograms (kg) = Pounds (lb) × 0.45359237<br>
      Stones (st) = Pounds (lb) / 14
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>10 stones to pounds:</strong> 10 × 14 = 140 lbs.</li>
      <li><strong>500 grams to ounces:</strong> 500 × 0.035274 = 17.64 oz.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Milligram (mg):</strong> Standard pharmaceutical mass unit.</li>
      <li><strong>Stone (st):</strong> Weight indicator used primarily in the UK (1 stone = 14 lbs).</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is a metric ton?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            A metric ton (tonne) is equivalent to 1,000 kilograms (approximately 2,204.6 pounds).
          </div>
        </div>
      </div>
    </div>
  `,

  'temperature-converter': `
    <h2>Thermal Conversion Principles</h2>
    <p>Temperature defines hotness or coldness. The three primary scales are Celsius (used globally), Fahrenheit (used in the US), and Kelvin (used in science and absolute physics).</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Celsius to Fahrenheit: °F = (°C × 9/5) + 32<br>
      Fahrenheit to Celsius: °C = (°F - 32) × 5/9<br>
      Celsius to Kelvin: K = °C + 273.15
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>100 °C (boiling point) to °F:</strong> (100 × 9/5) + 32 = 180 + 32 = 212 °F.</li>
      <li><strong>0 K (Absolute Zero) to °C:</strong> 0 - 273.15 = -273.15 °C.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Celsius (°C):</strong> The metric standard based on water freezing at 0° and boiling at 100°.</li>
      <li><strong>Fahrenheit (°F):</strong> Scale where water freezes at 32° and boils at 212°.</li>
      <li><strong>Kelvin (K):</strong> Thermodynamic scale starting at absolute thermodynamic zero.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Where are Celsius and Fahrenheit temperatures equal?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Celsius and Fahrenheit scales cross and output the exact same number at -40 degrees (-40 °C = -40 °F).
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is Absolute Zero?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Absolute Zero (0 Kelvin, or -273.15 °C) is the theoretical lowest temperature possible, where all atomic molecular motion completely stops.
          </div>
        </div>
      </div>
    </div>
  `,

  'area-converter': `
    <h2>Surface Area Calculations</h2>
    <p>Area measures two-dimensional bounds. This converter translates measurements for properties, floor plans, and farmland across acres, square feet, and hectares.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Square Feet (sq ft) = Square Meters (sq m) × 10.7639<br>
      Acres (ac) = Hectares (ha) × 2.47105
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>10 square meters to square feet:</strong> 10 × 10.7639 = 107.64 sq ft.</li>
      <li><strong>5 hectares to acres:</strong> 5 × 2.47105 = 12.36 acres.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Square Meter (sq m):</strong> Standard scientific unit of area.</li>
      <li><strong>Acre (ac):</strong> Common land area unit in the US and UK (43,560 sq ft).</li>
      <li><strong>Hectare (ha):</strong> Metric unit of land area (10,000 square meters).</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How big is an acre in terms of square yards?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            One acre is equivalent to exactly 4,840 square yards.
          </div>
        </div>
      </div>
    </div>
  `,

  'volume-converter': `
    <h2>Volume Metric Converter</h2>
    <p>Volume measures three-dimensional capacity. In science and logistics, converting between liters, cubic meters, and gallons helps calculate container loads and fluid levels.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Gallons US (gal) = Liters (L) × 0.264172<br>
      Liters (L) = Cubic Meters (m³) × 1000
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>20 Liters to Gallons US:</strong> 20 × 0.264172 = 5.28 Gallons.</li>
      <li><strong>1.5 cubic meters to liters:</strong> 1.5 × 1,000 = 1,500 Liters.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Liter (L):</strong> Primary metric unit for liquid volume.</li>
      <li><strong>Cubic Meter (m³):</strong> Metric unit representing a cube with 1-meter edges.</li>
      <li><strong>Gallon (gal):</strong> Standard US unit equal to 4 quarts or 3.785 liters.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Are US Gallons and UK Gallons the same?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No. A US Gallon is 3.785 Liters, while a UK/Imperial Gallon is larger, equivalent to approximately 4.546 Liters.
          </div>
        </div>
      </div>
    </div>
  `,

  'energy-converter': `
    <h2>Energy and Work Conversion</h2>
    <p>Energy is the capacity to do work. Shifting units between Joules, calories (nutrition energy), and kilowatt-hours (electricity usage) is standard in physics and engineering.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Kilocalories (kcal) = Kilojoules (kJ) × 0.239006<br>
      Kilowatt-hours (kWh) = Megajoules (MJ) / 3.6
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>100 kJ to kcal (dietary calories):</strong> 100 × 0.239006 = 23.9 kcal.</li>
      <li><strong>1 kWh to Joules:</strong> 1 × 3,600,000 = 3.6 Megajoules.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Joule (J):</strong> SI unit of energy equivalent to one Newton-meter of work.</li>
      <li><strong>Kilocalorie (kcal / Cal):</strong> Nutritional unit indicating food energy.</li>
      <li><strong>Kilowatt-hour (kWh):</strong> Power consumption unit billed on electric utility meters.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the link between calories and Joules?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            One thermochemical calorie (cal) is defined as exactly 4.184 Joules (J).
          </div>
        </div>
      </div>
    </div>
  `,

  'power-converter': {
    title: 'Power Converter',
    icon: '🔌',
    subtitle: 'Convert between different power and heat flow metrics',
    article: `
      <h2>Power Unit Conversions</h2>
      <p>Power measures the rate of energy consumption or transfer over time. This tool converts between electrical Watts, mechanical Horsepower, and thermal metrics.</p>
      
      <h3>The Conversion Formula</h3>
      <div class="formula-box">
        Horsepower (hp) = Kilowatts (kW) × 1.34102<br>
        Watts (W) = Horsepower (hp) × 745.6998
      </div>
      
      <h3>Common Examples</h3>
      <ul>
        <li><strong>100 kW engine to Horsepower:</strong> 100 × 1.34102 = 134.1 hp.</li>
        <li><strong>2 hp motor to Watts:</strong> 2 × 745.6998 = 1,491.4 W.</li>
      </ul>

      <h3>Frequently Used Units</h3>
      <ul>
        <li><strong>Watt (W):</strong> SI unit of power representing one Joule per second.</li>
        <li><strong>Kilowatt (kW):</strong> Standard automotive and power indicator (1,000 W).</li>
        <li><strong>Horsepower (hp):</strong> Mechanical unit based on the power output of a draft horse.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>Are metric hp and mechanical hp different?</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              Yes. One mechanical (Imperial) horsepower is approximately 745.7 Watts, whereas one metric horsepower (PS) is approximately 735.5 Watts.
            </div>
          </div>
        </div>
      </div>
    `
  },

  'fuel-consumption-converter': `
    <h2>Fuel Efficiency Conversions</h2>
    <p>Fuel consumption describes the volume of fuel burned over a distance. Conversions between European style (L/100km) and Anglo-American style (mpg) require reciprocal formulas.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      mpg (US) = 235.215 / (L/100km)<br>
      km/L = 100 / (L/100km)
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>8 L/100km to mpg:</strong> 235.215 / 8 = 29.4 mpg.</li>
      <li><strong>30 mpg to L/100km:</strong> 235.215 / 30 = 7.84 L/100km.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Liters per 100 km (L/100km):</strong> Volume of fuel burned per 100 km. Lower values indicate better efficiency.</li>
      <li><strong>Miles per Gallon (mpg):</strong> Distance traveled per gallon of fuel. Higher values indicate better efficiency.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why is fuel consumption conversion not linear?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            L/100km measures fuel volume per distance, while mpg measures distance per fuel volume. Because these metrics are inverted, their conversion uses division rather than multiplication.
          </div>
        </div>
      </div>
    </div>
  `,

  'liquid-volume-converter': `
    <h2>Liquid Measures Guide</h2>
    <p>Liquid volume converters are key for cooking, medical measurements, and chemistry calculations. Translate fluid ounces, teaspoons, and tablespoons into metric liters or milliliters.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Fluid Ounces (fl oz) = Liters (L) × 33.814<br>
      Tablespoons (tbsp) = Fluid Ounces (fl oz) × 2
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>1 Liter to Fluid Ounces:</strong> 1 × 33.814 = 33.8 fl oz.</li>
      <li><strong>8 fl oz to tablespoons:</strong> 8 × 2 = 16 tbsp.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Fluid Ounce (fl oz):</strong> Liquid capacity indicator equal to 1/128th of a gallon.</li>
      <li><strong>Tablespoon (tbsp):</strong> Culinary measure equal to 3 teaspoons or 14.8 mL.</li>
      <li><strong>Teaspoon (tsp):</strong> Small culinary unit equal to 4.93 mL.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Is a fluid ounce the same as a weight ounce?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No. A weight ounce measures gravitational mass, whereas a fluid ounce measures three-dimensional liquid volume capacity.
          </div>
        </div>
      </div>
    </div>
  `,

  'speed-converter': `
    <h2>Speed and Velocity Conversion</h2>
    <p>Speed is the rate at which an object changes position. Speed converters translate indicators for vehicles, wind speed, and aircraft between km/h, mph, and knots.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      mph = km/h × 0.621371<br>
      Knots (kt) = km/h × 0.539957
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>100 km/h to mph:</strong> 100 × 0.621371 = 62.14 mph.</li>
      <li><strong>20 knots to km/h:</strong> 20 / 0.539957 = 37.04 km/h.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Kilometers per Hour (km/h):</strong> Standard vehicle speed metric in most of the world.</li>
      <li><strong>Miles per Hour (mph):</strong> Speed metric in the US and UK.</li>
      <li><strong>Knot (kt):</strong> Speed unit equal to one nautical mile per hour, used in marine and aviation sectors.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is Mach speed?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Mach 1 is the speed of sound, which is approximately 1,225 km/h (761 mph) in standard sea-level atmospheric conditions.
          </div>
        </div>
      </div>
    </div>
  `,

  'data-storage-converter': `
    <h2>Digital Data Storage Units</h2>
    <p>Computer data is stored in electronic bit configurations. Converting between Kilobytes, Megabytes, Gigabytes, and Terabytes is helpful when upgrading hard drives or managing file sizes.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      1 Byte (B) = 8 Bits (b)<br>
      1 Gigabyte (GB) = 1,024 Megabytes (MB)<br>
      1 Terabyte (TB) = 1,024 Gigabytes (GB)
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>4 GB movie file to Megabytes:</strong> 4 × 1,024 = 4,096 MB.</li>
      <li><strong>1 TB hard disk to GB:</strong> 1 × 1,024 = 1,024 GB.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Byte (B):</strong> Base digital unit (8 bits), representing a single text character.</li>
      <li><strong>Megabyte (MB):</strong> Equivalent to ~1 million bytes. Used for photos and music.</li>
      <li><strong>Gigabyte (GB):</strong> Equivalent to ~1 billion bytes. Standard index for memory and storage capacities.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is the difference between decimal and binary gigabytes?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Operating systems use binary calculations (1 GB = 1,024 MB = 1,073,741,824 bytes). Storage manufacturers often define sizes in decimal bases (1 GB = 1,000,000,000 bytes), which is why a 500GB hard drive shows up as ~465GB in Windows.
          </div>
        </div>
      </div>
    </div>
  `,

  'internet-speed-converter': `
    <h2>Network Transfer Speeds</h2>
    <p>Internet connection bandwidth is advertised in megabits (Mbps), whereas actual download speeds in browsers are shown in Megabytes (MB/s). Converting these values clarifies true speeds.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Megabytes per Second (MB/s) = Megabits per Second (Mbps) / 8<br>
      Megabits per Second (Mbps) = Megabytes per Second (MB/s) × 8
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>100 Mbps connection:</strong> 100 / 8 = 12.5 MB/s maximum download speed.</li>
      <li><strong>A download transferring at 5 MB/s:</strong> 5 × 8 = 40 Mbps bandwidth required.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Mbps:</strong> Megabits per second. Standard telecommunications speed index.</li>
      <li><strong>MB/s:</strong> Megabytes per second. Real-world file transfer rate.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why is a Megabit smaller than a Megabyte?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            A bit is a single binary digit (0 or 1), while a byte is a group of 8 bits. Therefore, 1 Megabyte (MB) is exactly 8 times larger than 1 Megabit (Mb).
          </div>
        </div>
      </div>
    </div>
  `,

  'time-converter': `
    <h2>Time Unit Conversions</h2>
    <p>Time represents the duration of occurrences. Shifting between minutes, hours, days, weeks, and calendar years is a daily organizing task.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Hours (h) = Seconds (s) / 3600<br>
      Days (d) = Hours (h) / 24<br>
      Weeks (wk) = Days (d) / 7
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>10,000 seconds to hours:</strong> 10,000 / 3,600 = 2.78 hours.</li>
      <li><strong>5 weeks to hours:</strong> 5 × 7 × 24 = 840 hours.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Second (s):</strong> SI base unit of time.</li>
      <li><strong>Hour (h):</strong> Standard unit of 60 minutes.</li>
      <li><strong>Year (yr):</strong> The time it takes the Earth to orbit the Sun (365 or 366 days).</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How many seconds are in a calendar year?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            A standard 365-day year contains exactly 31,536,000 seconds.
          </div>
        </div>
      </div>
    </div>
  `,

  'pressure-converter': `
    <h2>Pressure and Stress Metrics</h2>
    <p>Pressure is force applied perpendicular to a surface per unit area. In tires, mechanics, and weather forecasts, converting bar, kilopascals (kPa), and PSI is standard practice.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      PSI = bar × 14.5038<br>
      kPa = bar × 100
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>2.2 bar tire pressure to PSI:</strong> 2.2 × 14.5038 = 31.9 PSI.</li>
      <li><strong>300 kPa to bar:</strong> 300 / 100 = 3.0 bar.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Pascal (Pa):</strong> SI pressure unit equal to one Newton per square meter.</li>
      <li><strong>PSI:</strong> Pounds per square inch. Standard automotive pressure indicator in the US.</li>
      <li><strong>Atmosphere (atm):</strong> Standard reference pressure at sea level (101.325 kPa).</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>How much tire pressure is recommended for standard cars?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Most passenger vehicles recommend tire pressures between 30 and 35 PSI (approximately 2.0 to 2.4 bar). Refer to the sticker on your driver-side door jamb.
          </div>
        </div>
      </div>
    </div>
  `,

  'force-converter': `
    <h2>Force and Tension Conversion</h2>
    <p>Force is any interaction that tends to change the motion of an object. Engineers and architects convert force metrics between Newtons (N), kilonewtons (kN), and pound-force (lbf).</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Newtons (N) = Pound-force (lbf) × 4.44822<br>
      Kilonewtons (kN) = Newtons (N) / 1000
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>100 lbf to Newtons:</strong> 100 × 4.44822 = 444.82 N.</li>
      <li><strong>5 kilonewtons to lbf:</strong> (5000 N) / 4.44822 = 1,124.04 lbf.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Newton (N):</strong> SI unit of force required to accelerate 1 kg of mass at 1 m/s².</li>
      <li><strong>Pound-force (lbf):</strong> Force unit in the English Engineering system.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is a Newton in everyday terms?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            One Newton (1 N) is approximately equivalent to the downward force of gravity acting on a medium-sized apple (about 100 grams of mass).
          </div>
        </div>
      </div>
    </div>
  `,

  'angle-converter': `
    <h2>Angular Metrics Guide</h2>
    <p>Angles quantify rotation. In mathematics and geometry, radians (rad) are preferred for calculus, while degrees (deg) are common in geography and engineering.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      Radians (rad) = Degrees (deg) × (π / 180)<br>
      Degrees (deg) = Radians (rad) × (180 / π)
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>90 degrees to radians:</strong> 90 × (π / 180) = π / 2 = 1.5708 rad.</li>
      <li><strong>1 Radian to degrees:</strong> 1 × (180 / 3.14159) = 57.3 degrees.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Degree (deg):</strong> Rotation unit based on 360 degrees for a full circle.</li>
      <li><strong>Radian (rad):</strong> Angular unit where a full circle is equal to 2π radians.</li>
      <li><strong>Gradian (grad):</strong> Unit of rotation equal to 1/400th of a full circle.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why are radians preferred in mathematics?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Radians are based on the natural geometric properties of circles (arc length divided by radius), which simplifies equations in calculus and trigonometric derivatives.
          </div>
        </div>
      </div>
    </div>
  `,

  'frequency-converter': `
    <h2>Frequency Conversion</h2>
    <p>Frequency counts recurring periodic events per second. Electronics, signal telecommunications, and physics use frequency converters to scale Hertz to kilohertz, megahertz, and gigahertz.</p>
    
    <h3>The Conversion Formula</h3>
    <div class="formula-box">
      1 Kilohertz (kHz) = 1,000 Hertz (Hz)<br>
      1 Megahertz (MHz) = 1,000,000 Hertz (Hz)
    </div>
    
    <h3>Common Examples</h3>
    <ul>
      <li><strong>2.4 Gigahertz (Wi-Fi band) to Megahertz:</strong> 2.4 × 1,000 = 2,400 MHz.</li>
      <li><strong>100.7 Megahertz (FM Radio) to Hertz:</strong> 100.7 × 1,000,000 = 100,700,000 Hz.</li>
    </ul>

    <h3>Frequently Used Units</h3>
    <ul>
      <li><strong>Hertz (Hz):</strong> One cycle per second.</li>
      <li><strong>Kilohertz (kHz):</strong> One thousand cycles per second.</li>
      <li><strong>Gigahertz (GHz):</strong> One billion cycles per second. Used for computer processors.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What frequencies can the human ear detect?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            A young human ear can detect acoustic sound wave frequencies between approximately 20 Hz and 20,000 Hz (20 kHz).
          </div>
        </div>
      </div>
    </div>
  `,

  'currency-converter': `
    <h2>Currency Conversion & Forex Exchange</h2>
    <p>Currency converters calculate equivalent values between national economies. Foreign exchange rates fluctuate constantly based on international interest rates, trade balances, and market trends.</p>
    
    <h3>The Exchange Rate Formula</h3>
    <div class="formula-box">Converted Amount = Input Amount × Exchange Rate</div>
    
    <h3>Example Calculation</h3>
    <p>For a conversion of 100 USD to INR, if 1 USD = 83.50 INR:
    <br><strong>Result:</strong> 100 × 83.50 = 8,350 INR.</p>

    <h3>Frequently Used Currencies</h3>
    <ul>
      <li><strong>USD (US Dollar):</strong> Primary global reserve currency.</li>
      <li><strong>EUR (Euro):</strong> Joint currency of the European Union.</li>
      <li><strong>INR (Indian Rupee):</strong> Official currency of the Republic of India.</li>
      <li><strong>GBP (British Pound):</strong> Official currency of the United Kingdom.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Why do currency exchange rates change daily?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Foreign exchange is traded on global markets (Forex). Rates float in real-time based on supply, demand, inflation differentials, economic health indicators, and central bank monetary policies.
          </div>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>What is currency spread?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            The spread is the difference between the buying price (bid) and selling price (ask) of currencies offered by a bank or broker to generate transactional profit.
          </div>
        </div>
      </div>
    </div>
  `
});
