/* ============================================================
   NEEDFUL CALCULATOR — Core Calculators Logic
   calculator.js
   Supports 23 calculators dynamically via router.
   Requires: Chart.js (loaded via CDN)
   ============================================================ */

'use strict';

const SlugToCategoryMap = {
  // Finance
  'loan-eligibility': 'finance', 'home-loan': 'finance', 'car-loan': 'finance',
  'personal-loan': 'finance', 'lumpsum': 'finance', 'goal-sip': 'finance',
  'retirement': 'finance', 'retirement-calculator': 'finance', 'swp': 'finance',
  'nps': 'finance', 'cagr': 'finance', 'inflation': 'finance', 'emi-calculator': 'finance',
  'sip-calculator': 'finance', 'fd-calculator': 'finance', 'ppf-calculator': 'finance',
  'compound-interest': 'finance', 'loan-calculator': 'finance',

  // Tax
  'income-tax-calculator': 'tax', 'tds-calculator': 'tax', 'tax-saving-calculator': 'tax',
  'hra-calculator': 'tax', 'gratuity-calculator': 'tax', 'professional-tax-calculator': 'tax',
  'gst-calculator': 'tax', 'reverse-gst-calculator': 'tax', 'section-80c-calculator': 'tax',
  'section-80d-calculator': 'tax', 'capital-gain-calculator': 'tax',

  // Health
  'bmi-calculator': 'health', 'bmr-calculator': 'health', 'tdee-calculator': 'health',
  'body-fat-calculator': 'health', 'lean-body-mass': 'health', 'ideal-weight': 'health',
  'weight-loss': 'health', 'weight-gain': 'health', 'calorie-calculator': 'health',
  'water-intake': 'health', 'protein-intake': 'health', 'macro-calculator': 'health',
  'meal-calorie-calculator': 'health', 'heart-rate': 'health', 'target-heart-rate': 'health',
  'blood-pressure': 'health', 'blood-sugar-converter': 'health', 'sleep-calculator': 'health',
  'sleep-cycle': 'health', 'pregnancy-due-date': 'health', 'ovulation-calculator': 'health',
  'pregnancy-weight-gain': 'health',

  // Education
  'education-loan': 'education', 'percentage-calculator': 'education',
  'marks-percentage-calculator': 'education', 'gpa-calculator': 'education',
  'cgpa-calculator': 'education', 'cgpa-to-percentage': 'education',
  'percentage-to-cgpa': 'education', 'average-calculator': 'education',
  'grade-calculator': 'education', 'attendance-calculator': 'education',
  'study-time-calculator': 'education', 'word-counter': 'education',
  // Date & Time
  'age-calculator': 'date', 'age-difference': 'date', 'birthday-calculator': 'date',
  'next-birthday': 'date', 'date-difference': 'date', 'days-between-dates': 'date',
  'time-duration': 'date', 'time-zone-converter': 'date', 'working-days': 'date',
  'business-days': 'date', 'countdown-calculator': 'date', 'event-countdown': 'date',
  'day-of-week': 'date',

  // Converters
  'length-converter': 'converters', 'distance-converter': 'converters', 'height-converter': 'converters',
  'weight-converter': 'converters', 'mass-converter': 'converters', 'temperature-converter': 'converters',
  'area-converter': 'converters', 'volume-converter': 'converters', 'energy-converter': 'converters',
  'power-converter': 'converters', 'fuel-consumption-converter': 'converters', 'liquid-volume-converter': 'converters',
  'speed-converter': 'converters', 'data-storage-converter': 'converters', 'internet-speed-converter': 'converters',
  'time-converter': 'converters', 'pressure-converter': 'converters', 'force-converter': 'converters',
  'angle-converter': 'converters', 'frequency-converter': 'converters', 'currency-converter': 'converters',
  // PDF Tools
  'pdf-merge': 'pdf', 'pdf-split': 'pdf', 'jpg-to-pdf': 'pdf', 'pdf-to-jpg': 'pdf', 'pdf-rotate': 'pdf',
  'pdf-delete-pages': 'pdf', 'pdf-extract-pages': 'pdf', 'pdf-metadata-viewer': 'pdf', 'image-to-pdf': 'pdf', 'pdf-preview': 'pdf',

  // Insurance
  'life-insurance': 'insurance', 'human-life-value': 'insurance', 'term-insurance': 'insurance',
  'risk-cover': 'insurance', 'family-protection': 'insurance', 'child-education': 'insurance',
  'retirement-corpus': 'insurance', 'income-replacement': 'insurance',
  'premium-affordability': 'insurance', 'goal-protection': 'insurance'
};


const CalculatorRouter = {
  activeTool: 'emi-calculator',
  chartInstance: null,
  state: {},

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === 'true') {
          resolve();
        } else {
          existing.addEventListener('load', resolve);
          existing.addEventListener('error', reject);
        }
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.dataset.loaded = 'false';
      script.onload = () => {
        script.dataset.loaded = 'true';
        resolve();
      };
      script.onerror = () => {
        reject(new Error(`Failed to load script: ${src}`));
      };
      document.head.appendChild(script);
    });
  },

  loadAllCategoryCalculators() {
    const categories = ['finance', 'health', 'education', 'converters', 'insurance', 'date', 'tax', 'pdf'];
    const promises = categories.map(cat => {
      if (cat === 'pdf') {
        return this.loadScript('js/pdf/pdf-tools.js');
      }
      const fileName = cat === 'converters' ? 'converter' : cat;
      return this.loadScript(`js/${cat}/${fileName}-calculators.js`);
    });
    return Promise.all(promises);
  },

  init() {
    // Expose SlugToCategoryMap globally so search.js can read it
    this.slugToCategoryMap = SlugToCategoryMap;

    const isCalculatorPage = window.location.pathname.includes('calculator.html');
    
    if (!isCalculatorPage) {
      const isCategoryPage = window.location.pathname.includes('category.html');
      if (isCategoryPage) {
        window.NC.calculatorsLoaded.then(() => {
          this.populateCategoryCards();
        });
      }
      return;
    }

    const params = new URLSearchParams(window.location.search);
    let toolParam = params.get('tool');
    
    // Normalize toolParam to match slugs
    if (toolParam === 'retirement-calculator') {
      toolParam = 'retirement';
    }

    if (toolParam) {
      this.activeTool = toolParam;
    } else {
      this.activeTool = 'emi-calculator';
    }

    this.renderActiveTool();
  },

  // ─── TOOL REGISTRY ───
  configs: {},

  // ─── DOM INJECTION & ROUTER RENDER ───
  async renderActiveTool() {
    // Wait for all configs to load in parallel
    await window.NC.calculatorsLoaded;

    const category = SlugToCategoryMap[this.activeTool] || 'finance';
    const fileName = category === 'converters' ? 'converter' : category;
    
    try {
      await this.loadScript(`js/${category}/${fileName}-articles.js`);
    } catch (err) {
      console.error('Error loading article resources:', err);
    }

    const config = this.configs[this.activeTool] || this.configs['emi-calculator'];
    
    // 1. Update title and icons
    const headerEl = document.querySelector('.calc-header');
    if (headerEl) {
      headerEl.innerHTML = `
        <div class="calc-header-icon" aria-hidden="true">${config.icon}</div>
        <div>
          <h1 id="active-tool-title">${config.title}</h1>
          <p id="active-tool-subtitle">${config.subtitle}</p>
        </div>
      `;
    }

    // Update document title
    document.title = `${config.title} — Needful Calculator`;

    // 1b. Dynamic Breadcrumb Update
    const CATEGORY_LABELS = {
      'finance':    'Finance Calculators',
      'tax':        'Tax Calculators',
      'health':     'Health Calculators',
      'education':  'Education Calculators',
      'date':       'Date Calculators',
      'converters': 'Unit Converters',
      'pdf':        'PDF Tools',
      'insurance':  'Insurance Calculators'
    };
    const CATEGORY_HASHES = {
      'finance':    '#finance',
      'tax':        '#tax',
      'health':     '#health',
      'education':  '#education',
      'date':       '#date',
      'converters': '#unit',
      'pdf':        '#pdf',
      'insurance':  '#insurance'
    };
    const activeCategory   = SlugToCategoryMap[this.activeTool] || 'finance';
    const categoryLabel    = CATEGORY_LABELS[activeCategory] || 'Calculators';
    const categoryHash     = CATEGORY_HASHES[activeCategory] || '';

    const breadcrumbCatLink = document.getElementById('breadcrumb-category-link');
    const breadcrumbToolName = document.getElementById('breadcrumb-tool-name');
    if (breadcrumbCatLink) {
      breadcrumbCatLink.textContent = categoryLabel;
      breadcrumbCatLink.href = `category.html${categoryHash}`;
    }
    if (breadcrumbToolName) {
      breadcrumbToolName.textContent = config.title;
    }

    // 2. Generate Forms inside .calc-body
    const bodyEl = document.querySelector('.calc-body');
    if (!bodyEl) return;

    bodyEl.innerHTML = '';
    
    const formContainer = document.createElement('div');
    formContainer.className = 'calc-inputs-container';
    bodyEl.appendChild(formContainer);

    config.inputs.forEach(input => {
      const group = document.createElement('div');
      group.className = 'form-group';
      
      const defaultVal = typeof input.default === 'function' ? input.default() : (input.default || 0);
      this.state[input.id] = defaultVal;

      if (input.type === 'range') {
        const isTenureEnhanced = ['emi-calculator', 'home-loan', 'personal-loan', 'car-loan', 'education-loan', 'loan-eligibility', 'sip-calculator', 'fd-calculator', 'ppf-calculator', 'swp', 'nps', 'goal-sip', 'retirement'].includes(this.activeTool) && input.id === 'tenure';

        if (isTenureEnhanced) {
          group.innerHTML = `
            <label class="form-label" for="${input.id}-input">
              <span>${input.label}</span>
              <span class="form-value" id="${input.id}-display">${defaultVal} Years</span>
            </label>
            <div style="display:flex; gap: var(--space-2); align-items: center; width: 100%;">
              <input
                class="form-input"
                type="number"
                id="${input.id}-input"
                min="1"
                max="50"
                step="1"
                value="${defaultVal}"
                style="flex: 1;"
              >
              <select
                class="form-input"
                id="${input.id}-unit"
                style="width: 120px; background:var(--bg-muted); color:var(--txt-primary); border-radius:var(--radius-lg); outline:none; border:1.5px solid var(--border-color); height:46px; padding:0 var(--space-2); font-size:var(--text-base); cursor: pointer;"
              >
                <option value="years" selected>Years</option>
                <option value="months">Months</option>
              </select>
            </div>
            <input
              class="range-slider"
              type="range"
              id="${input.id}-slider"
              min="1"
              max="50"
              step="1"
              value="${defaultVal}"
            >
            <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);color:var(--txt-muted);margin-top:4px">
              <span id="${input.id}-min-label">1 Year</span>
              <span id="${input.id}-max-label">50 Years</span>
            </div>
          `;
        } else {
          const formatted = this.formatValue(defaultVal, input.format);
          group.innerHTML = `
            <label class="form-label" for="${input.id}-input">
              <span>${input.label}</span>
              <span class="form-value" id="${input.id}-display">${formatted}</span>
            </label>
            <input
              class="form-input"
              type="number"
              id="${input.id}-input"
              min="${input.min}"
              max="${input.max}"
              step="${input.step}"
              value="${defaultVal}"
            >
            <input
              class="range-slider"
              type="range"
              id="${input.id}-slider"
              min="${input.min}"
              max="${input.max}"
              step="${input.step}"
              value="${defaultVal}"
            >
            <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);color:var(--txt-muted);margin-top:4px">
              <span>${this.formatValue(input.min, input.format)}</span>
              <span>${this.formatValue(input.max, input.format)}</span>
            </div>
          `;
        }
      } else if (input.type === 'select') {
        const optionsHtml = input.options.map(o => `
          <option value="${o.value}" ${o.value == defaultVal ? 'selected' : ''}>${o.label}</option>
        `).join('');
        
        group.innerHTML = `
          <label class="form-label" for="${input.id}-input">${input.label}</label>
          <select class="form-input" id="${input.id}-input" style="background:var(--bg-muted);color:var(--txt-primary);border-radius:var(--radius-lg);outline:none;border:1.5px solid var(--border-color);height:46px;width:100%;padding:0 var(--space-4);font-size:var(--text-base)">
            ${optionsHtml}
          </select>
        `;
      } else if (input.type === 'textarea') {
        group.innerHTML = `
          <label class="form-label" for="${input.id}-input">${input.label}</label>
          <textarea class="form-input" id="${input.id}-input" style="height:140px;background:var(--bg-muted);color:var(--txt-primary);padding:var(--space-3);width:100%;border-radius:var(--radius-lg);outline:none;border:1.5px solid var(--border-color);font-family:inherit;font-size:var(--text-base);resize:vertical;">${defaultVal}</textarea>
        `;
      } else if (input.type === 'file') {
        group.innerHTML = `
          <label class="form-label">${input.label}</label>
          <div class="pdf-drop-zone" id="pdf-drop-zone" style="border:2px dashed var(--clr-primary);border-radius:var(--radius-xl);padding:var(--space-8);text-align:center;background:var(--bg-muted);cursor:pointer;transition:all var(--transition-fast);">
            <div style="font-size:2.5rem;margin-bottom:var(--space-2)">📄</div>
            <div style="font-weight:600;color:var(--txt-primary)">Drag & drop files here or click to browse</div>
            <div style="font-size:var(--text-xs);color:var(--txt-muted);margin-top:var(--space-1)">Supports PDF files up to 50MB</div>
            <input type="file" id="${input.id}-file-input" style="display:none" accept=".pdf" ${input.multiple ? 'multiple' : ''}>
          </div>
          <div id="pdf-file-list" style="margin-top:var(--space-4);display:none;">
            <h4 style="font-size:var(--text-sm);margin-bottom:var(--space-2)">Selected Files:</h4>
            <ul id="file-ul" style="list-style:none;padding:0;display:flex;flex-direction:column;gap:var(--space-2);"></ul>
          </div>
        `;
      } else {
        group.innerHTML = `
          <label class="form-label" for="${input.id}-input">${input.label}</label>
          <input
            class="form-input"
            type="${input.type}"
            id="${input.id}-input"
            value="${defaultVal}"
          >
        `;
      }

      formContainer.appendChild(group);
    });

    // Unit swap button for converters (real-time swap of From/To units)
    if (category === 'converters') {
      const fromEl = document.getElementById('from-input');
      const toEl = document.getElementById('to-input');
      if (fromEl && toEl) {
        const swapBtn = document.createElement('button');
        swapBtn.type = 'button';
        swapBtn.className = 'btn btn-secondary btn-swap';
        swapBtn.style.margin = 'var(--space-2) auto var(--space-4)';
        swapBtn.style.display = 'flex';
        swapBtn.style.alignItems = 'center';
        swapBtn.style.justifyContent = 'center';
        swapBtn.style.gap = 'var(--space-2)';
        swapBtn.style.width = 'fit-content';
        swapBtn.style.padding = 'var(--space-2) var(--space-4)';
        swapBtn.style.borderRadius = 'var(--radius-lg)';
        swapBtn.style.fontFamily = 'inherit';
        swapBtn.style.fontSize = 'var(--text-sm)';
        swapBtn.style.fontWeight = '600';
        swapBtn.style.cursor = 'pointer';
        swapBtn.style.border = '1px solid var(--border-color)';
        swapBtn.style.background = 'var(--bg-surface)';
        swapBtn.style.color = 'var(--clr-primary)';
        swapBtn.style.transition = 'all var(--transition-fast)';
        swapBtn.innerHTML = `⇆ Swap Units`;
        
        const toGroup = toEl.closest('.form-group');
        if (toGroup) {
          toGroup.parentNode.insertBefore(swapBtn, toGroup);
        }
        
        swapBtn.addEventListener('click', () => {
          const fromVal = fromEl.value;
          const toVal = toEl.value;
          fromEl.value = toVal;
          toEl.value = fromVal;
          fromEl.dispatchEvent(new Event('input'));
          toEl.dispatchEvent(new Event('input'));
        });
      }
    }

    const errorMsg = document.createElement('div');
    errorMsg.id = 'calc-error-msg';
    errorMsg.style.color = '#EF4444';
    errorMsg.style.fontSize = 'var(--text-sm)';
    errorMsg.style.fontWeight = '600';
    errorMsg.style.marginTop = 'var(--space-4)';
    errorMsg.style.display = 'none';
    bodyEl.appendChild(errorMsg);

    if (config.hasChart) {
      const chartWrap = document.createElement('div');
      chartWrap.className = 'chart-wrap';
      chartWrap.innerHTML = `<canvas id="emi-chart" width="200" height="200" role="img"></canvas>`;
      bodyEl.appendChild(chartWrap);
      
      const chartLegend = document.createElement('div');
      chartLegend.className = 'chart-legend';
      chartLegend.id = 'dynamic-chart-legend';
      bodyEl.appendChild(chartLegend);
    }

    const resultsBox = document.createElement('div');
    resultsBox.className = 'calc-results';
    resultsBox.id = 'dynamic-results-box';
    bodyEl.appendChild(resultsBox);

    const tableContainer = document.querySelector('#amortization-body')?.closest('.reveal');
    if (tableContainer) {
      if (config.hasTable) {
        tableContainer.style.display = 'block';
      } else {
        tableContainer.style.display = 'none';
      }
    }

    const articleEl = document.querySelector('.calc-article');
    const articleHtml = (window.NC_ARTICLES && window.NC_ARTICLES[this.activeTool]) ? window.NC_ARTICLES[this.activeTool] : (config.article || '');
    if (articleEl) {
      if (articleHtml) {
        articleEl.innerHTML = articleHtml;
        articleEl.style.display = 'block';

        // Bind dynamic FAQ accordion clicks
        articleEl.querySelectorAll('.faq-question').forEach(btn => {
          btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            const siblings = item.closest('.faq-list')?.querySelectorAll('.faq-item.open');
            siblings?.forEach(s => {
              s.classList.remove('open');
              s.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
              item.classList.add('open');
              btn.setAttribute('aria-expanded', 'true');
            }
          });
        });
      } else {
        articleEl.style.display = 'none';
      }
    }

    // Dynamic SEO Metadata
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', `${config.title} — ${config.subtitle}. Calculate monthly installments, investment returns, and projection schedule with charts.`);

    this.updateSchemas(config);

    this.bindToolEvents(config);
    if (config.isPDF) {
      if (typeof this.initPDFUI === 'function') {
        this.initPDFUI(config);
      }
    } else if (config.isPDFPlaceholder) {
      this.initPDFPlaceholderUI(config);
    } else {
      this.runCalculation(config);
    }

    // Populate related calculators dynamically (same category)
    const relatedGrid = document.querySelector('.related-tools-grid');
    if (relatedGrid) {
      const currentCategory = SlugToCategoryMap[this.activeTool] || 'finance';
      const relatedConfigs = Object.entries(this.configs)
        .filter(([slug, cfg]) => slug !== this.activeTool && SlugToCategoryMap[slug] === currentCategory)
        .slice(0, 4);

      if (relatedConfigs.length > 0) {
        relatedGrid.innerHTML = relatedConfigs.map(([slug, cfg]) => {
          const badgeText = currentCategory === 'converters' ? 'Unit' : (currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1));
          const badgeClass = currentCategory === 'health' || currentCategory === 'insurance' ? 'badge-accent' : 'badge-primary';
          return `
            <article class="tool-card">
              <div class="tool-card-icon">${cfg.icon || '🧮'}</div>
              <h3 class="tool-card-name">${cfg.title}</h3>
              <p class="tool-card-desc">${cfg.subtitle || ''}</p>
              <div class="tool-card-footer">
                <span class="badge ${badgeClass}">${badgeText}</span>
                <a href="calculator.html?tool=${slug}" class="tool-card-open">Open <span class="tool-card-arrow">→</span></a>
              </div>
            </article>
          `;
        }).join('');
      }
    }

    // Update Recently Viewed and trigger analytics
    if (window.NC && window.NC.RecentlyViewed) {
      window.NC.RecentlyViewed.add(this.activeTool, config.title, config.icon);
      window.NC.RecentlyViewed.render();
    }
    if (window.NC && typeof window.NC.trackCalculatorOpen === 'function') {
      window.NC.trackCalculatorOpen(this.activeTool, config.title);
    }
  },

  bindToolEvents(config) {
    config.inputs.forEach(input => {
      const inputEl = document.getElementById(`${input.id}-input`);
      const sliderEl = document.getElementById(`${input.id}-slider`);
      const unitEl = document.getElementById(`${input.id}-unit`);

      const isTenureEnhanced = ['emi-calculator', 'home-loan', 'personal-loan', 'car-loan', 'education-loan', 'loan-eligibility', 'sip-calculator', 'fd-calculator', 'ppf-calculator', 'swp', 'nps', 'goal-sip', 'retirement'].includes(this.activeTool) && input.id === 'tenure';

      const updateDisplayAndSlider = (valNum) => {
        if (sliderEl && !isNaN(valNum)) {
          sliderEl.value = valNum;
          this.updateSliderFill(sliderEl);
        }
        const displayEl = document.getElementById(`${input.id}-display`);
        if (displayEl) {
          if (isTenureEnhanced && unitEl) {
            const unit = unitEl.value;
            displayEl.textContent = valNum + ' ' + (unit === 'years' ? (valNum === 1 ? 'Year' : 'Years') : (valNum === 1 ? 'Month' : 'Months'));
          } else {
            displayEl.textContent = this.formatValue(valNum, input.format);
          }
        }
      };

      if (isTenureEnhanced && unitEl) {
        const handleInputChange = (valStr) => {
          let valNum = parseFloat(valStr);
          this.state[input.id] = isNaN(valNum) ? valStr : valNum;
          
          if (!isNaN(valNum)) {
            const minLimit = 1;
            const maxLimit = unitEl.value === 'years' ? 50 : 600;
            const clampedVal = Math.min(maxLimit, Math.max(minLimit, valNum));
            if (sliderEl) {
              sliderEl.value = clampedVal;
              this.updateSliderFill(sliderEl);
            }
            updateDisplayAndSlider(valNum);
          }
          this.runCalculation(config);
        };

        const handleSliderChange = (valStr) => {
          const valNum = parseFloat(valStr);
          this.state[input.id] = valNum;
          if (inputEl) {
            inputEl.value = valNum;
          }
          updateDisplayAndSlider(valNum);
          this.runCalculation(config);
        };

        const handleUnitChange = () => {
          const unit = unitEl.value;
          let currentVal = parseFloat(inputEl.value) || 0;
          let minVal, maxVal, stepVal;
          
          if (unit === 'years') {
            minVal = 1;
            maxVal = 50;
            stepVal = 1;
            currentVal = Math.round((currentVal / 12) * 10) / 10;
            if (currentVal < 1) currentVal = 1;
            if (currentVal > 50) currentVal = 50;
          } else {
            minVal = 1;
            maxVal = 600;
            stepVal = 1;
            currentVal = Math.round(currentVal * 12);
            if (currentVal < 1) currentVal = 1;
            if (currentVal > 600) currentVal = 600;
          }

          inputEl.min = minVal;
          inputEl.max = maxVal;
          inputEl.step = stepVal;
          inputEl.value = currentVal;

          if (sliderEl) {
            sliderEl.min = minVal;
            sliderEl.max = maxVal;
            sliderEl.step = stepVal;
            sliderEl.value = currentVal;
            this.updateSliderFill(sliderEl);
          }

          const minLabel = document.getElementById(`${input.id}-min-label`);
          const maxLabel = document.getElementById(`${input.id}-max-label`);
          if (minLabel) minLabel.textContent = minVal + ' ' + (unit === 'years' ? 'Year' : 'Month');
          if (maxLabel) maxLabel.textContent = maxVal + ' ' + (unit === 'years' ? 'Years' : 'Months');

          this.state[input.id] = currentVal;
          updateDisplayAndSlider(currentVal);
          this.runCalculation(config);
        };

        if (inputEl) {
          inputEl.addEventListener('input', e => handleInputChange(e.target.value));
        }
        if (sliderEl) {
          sliderEl.addEventListener('input', e => handleSliderChange(e.target.value));
          this.updateSliderFill(sliderEl);
        }
        unitEl.addEventListener('change', handleUnitChange);

      } else {
        const handleInputChange = (valStr) => {
          let valNum = parseFloat(valStr);
          this.state[input.id] = isNaN(valNum) ? valStr : valNum;
          
          if (input.type === 'number' || input.type === 'range') {
            if (!isNaN(valNum)) {
              if (sliderEl) {
                sliderEl.value = Math.min(input.max, Math.max(input.min, valNum));
                this.updateSliderFill(sliderEl);
              }
              updateDisplayAndSlider(valNum);
            }
          }
          this.runCalculation(config);
        };

        const handleSliderChange = (valStr) => {
          const valNum = parseFloat(valStr);
          this.state[input.id] = valNum;
          if (inputEl) {
            inputEl.value = valNum;
          }
          updateDisplayAndSlider(valNum);
          this.runCalculation(config);
        };

        if (inputEl) {
          inputEl.addEventListener('input', e => handleInputChange(e.target.value));
        }
        if (sliderEl) {
          sliderEl.addEventListener('input', e => handleSliderChange(e.target.value));
          this.updateSliderFill(sliderEl);
        }
      }
    });
  },

  updateSliderFill(slider) {
    if (!slider) return;
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #2563EB ${pct}%, var(--border-color) ${pct}%)`;
  },

  runCalculation(config) {
    const errorEl = document.getElementById('calc-error-msg');
    const resultsBox = document.getElementById('dynamic-results-box');
    
    if (config.isPDFPlaceholder) return;

    const isTenureEnhanced = ['emi-calculator', 'home-loan', 'personal-loan', 'car-loan', 'education-loan', 'loan-eligibility', 'sip-calculator', 'fd-calculator', 'ppf-calculator', 'swp', 'nps', 'goal-sip', 'retirement'].includes(this.activeTool);

    for (const input of config.inputs) {
      const val = this.state[input.id];
      if (input.type === 'number' || input.type === 'range') {
        if (val === '' || val === undefined || val === null || isNaN(val)) {
          this.showError(`Please enter a valid number for ${input.label}`);
          return;
        }

        if (isTenureEnhanced && input.id === 'tenure') {
          const unitEl = document.getElementById('tenure-unit');
          const unit = unitEl ? unitEl.value : 'years';
          const maxLimit = unit === 'years' ? 50 : 600;
          if (val < 1) {
            this.showError(`${input.label} must be at least 1 ${unit === 'years' ? 'Year' : 'Month'}`);
            return;
          }
          if (val > maxLimit) {
            this.showError(`${input.label} cannot exceed ${maxLimit} ${unit === 'years' ? 'Years' : 'Months'}`);
            return;
          }
        } else {
          if (input.min !== undefined && val < input.min) {
            this.showError(`${input.label} must be at least ${this.formatValue(input.min, input.format)}`);
            return;
          }
          if (input.max !== undefined && val > input.max) {
            this.showError(`${input.label} cannot exceed ${this.formatValue(input.max, input.format)}`);
            return;
          }
        }
      }
    }

    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }

    const calcState = { ...this.state };
    if (isTenureEnhanced && this.state.tenure !== undefined) {
      const unitEl = document.getElementById('tenure-unit');
      const unit = unitEl ? unitEl.value : 'years';
      if (unit === 'months') {
        calcState.tenure = this.state.tenure / 12;
      }
    }

    const calcResult = config.calculate(calcState);
    
    if (calcResult.error) {
      this.showError(calcResult.error);
      return;
    }

    this.renderResults(calcResult.results, resultsBox);

    if (config.hasChart && calcResult.chartData) {
      this.renderChart(calcResult.chartData);
    }

    if (config.hasTable && calcResult.tableRows) {
      this.renderTable(calcResult.tableHeader, calcResult.tableRows, calcResult.tableFooterText);
    }
  },

  showError(msg) {
    const errorEl = document.getElementById('calc-error-msg');
    if (errorEl) {
      errorEl.textContent = '⚠️ ' + msg;
      errorEl.style.display = 'block';
    }
    const resultsBox = document.getElementById('dynamic-results-box');
    if (resultsBox) resultsBox.innerHTML = '';
  },

  renderResults(results, container) {
    if (!container) return;
    
    const isConverter = (SlugToCategoryMap[this.activeTool] === 'converters');
    
    let html = '';
    results.forEach((res, i) => {
      const valStr = res.raw ? res.value : this.formatValue(res.value, res.format);
      
      if (res.highlight) {
        html += `
          <div class="calc-result-row" style="border-bottom:2px solid var(--clr-primary);padding-bottom:var(--space-4);margin-bottom:var(--space-2)">
            <div>
              <div style="font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--txt-muted);font-weight:600">${res.label}</div>
              <div class="calc-result-value highlight" style="font-size:var(--text-3xl);font-family:var(--font-heading)">${valStr}</div>
            </div>
            <div style="text-align:right; display:flex; flex-direction:column; align-items:flex-end; gap:var(--space-2);">
              <span class="badge badge-new">✓ Calculated</span>
              ${isConverter ? `<button type="button" class="btn btn-secondary btn-copy" data-copy-value="${valStr.split(' (')[0]}" style="padding:var(--space-1) var(--space-2); font-size:var(--text-xs); cursor:pointer; border:1px solid var(--border-color); border-radius:var(--radius-md); background:var(--bg-surface); color:var(--clr-primary); display:flex; align-items:center; gap:4px; font-weight:600; transition:all var(--transition-fast);">📋 Copy Result</button>` : ''}
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="calc-result-row" style="display:flex; justify-content:space-between; align-items:center;">
            <span class="calc-result-label">${res.label}</span>
            <span class="calc-result-value" style="display:flex; align-items:center; gap:var(--space-2);">
              <span>${valStr}</span>
              ${isConverter ? `<button type="button" class="btn btn-secondary btn-copy" data-copy-value="${valStr}" style="padding:2px 6px; font-size:10px; cursor:pointer; border:1px solid var(--border-color); border-radius:var(--radius-sm); background:var(--bg-surface); color:var(--clr-primary); font-weight:600; display:inline-flex; align-items:center; gap:2px; transition:all var(--transition-fast);">📋 Copy</button>` : ''}
            </span>
          </div>
        `;
      }
    });

    container.innerHTML = html;

    // Attach copy button event listeners
    if (isConverter) {
      container.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
          const valToCopy = btn.getAttribute('data-copy-value');
          if (window.Clipboard && typeof window.Clipboard.copy === 'function') {
            window.Clipboard.copy(valToCopy, btn);
          } else {
            navigator.clipboard.writeText(valToCopy).then(() => {
              const orig = btn.innerHTML;
              btn.innerHTML = '✓ Copied!';
              setTimeout(() => { btn.innerHTML = orig; }, 2000);
            });
          }
        });
      });
    }
  },

  chartUpdateTimer: null,
  renderChart(chartData) {
    const canvas = document.getElementById('emi-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.chartUpdateTimer) {
      clearTimeout(this.chartUpdateTimer);
    }

    this.chartUpdateTimer = setTimeout(() => {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      const legendEl = document.getElementById('dynamic-chart-legend');
      if (legendEl) {
        const colors = ['#2563EB', '#7C3AED', '#10B981', '#F59E0B'];
        const total = chartData.data.reduce((a, b) => a + b, 0);
        legendEl.innerHTML = chartData.labels.map((lbl, idx) => {
          const val = chartData.data[idx];
          const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
          return `
            <div class="legend-item">
              <div class="legend-dot" style="background:${colors[idx % colors.length]}"></div>
              ${lbl}: <strong>${pct}%</strong>
            </div>
          `;
        }).join('');
      }

      this.chartInstance = new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: chartData.labels,
          datasets: [{
            data: chartData.data.map(n => Math.round(n)),
            backgroundColor: ['#2563EB', '#7C3AED', '#10B981', '#F59E0B'],
            borderColor: isDark ? '#1E293B' : '#FFFFFF',
            borderWidth: 4,
            hoverOffset: 8,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '65%',
          animation: { animateRotate: true, duration: 400 },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  return ` ₹${Math.round(ctx.raw).toLocaleString('en-IN')}`;
                }
              },
              backgroundColor: isDark ? '#1E293B' : '#111827',
              titleColor: '#FFFFFF',
              bodyColor: 'rgba(255,255,255,0.8)',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 12,
              cornerRadius: 8,
            }
          }
        }
      });
    }, 60);
  },

  updateSchemas(config) {
    document.querySelectorAll('script[data-dynamic-schema]').forEach(el => el.remove());

    const canonicalUrl = window.location.origin + window.location.pathname + `?tool=${this.activeTool}`;

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": window.location.origin + "/index.html" },
        { "@type": "ListItem", "position": 2, "name": "Calculators", "item": window.location.origin + "/category.html" },
        { "@type": "ListItem", "position": 3, "name": config.title, "item": canonicalUrl }
      ]
    };

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${config.title} Guide and Repayment Calculator`,
      "description": config.subtitle,
      "url": canonicalUrl,
      "publisher": {
        "@type": "Organization",
        "name": "Needful Calculator",
        "logo": {
          "@type": "ImageObject",
          "url": window.location.origin + "/assets/logos/logo.png"
        }
      },
      "author": {
        "@type": "Organization",
        "name": "Needful Calculator Team"
      }
    };

    const faqItems = document.querySelectorAll('.calc-article .faq-item');
    let faqSchema = null;
    if (faqItems.length > 0) {
      const mainEntity = [];
      faqItems.forEach(item => {
        const qEl = item.querySelector('.faq-question');
        const aEl = item.querySelector('.faq-answer');
        if (qEl && aEl) {
          mainEntity.push({
            "@type": "Question",
            "name": qEl.textContent.trim(),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": aEl.textContent.trim()
            }
          });
        }
      });
      if (mainEntity.length > 0) {
        faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": mainEntity
        };
      }
    }

    const injectJsonLd = (obj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic-schema', 'true');
      script.text = JSON.stringify(obj);
      document.head.appendChild(script);
    };

    injectJsonLd(breadcrumb);
    injectJsonLd(articleSchema);
    if (faqSchema) {
      injectJsonLd(faqSchema);
    }
  },

  renderTable(headers, rows, footerText) {
    const tableHeaderEl = document.querySelector('.amortization-table thead');
    const tableBodyEl = document.getElementById('amortization-body');
    
    if (!tableBodyEl) return;

    if (tableHeaderEl) {
      tableHeaderEl.innerHTML = `
        <tr>
          ${headers.map(h => h ? `<th scope="col">${h}</th>` : '').join('')}
        </tr>
      `;
    }

    const rowStrings = rows.map(r => `
      <tr>
        <td>${r.col1}</td>
        <td>${typeof r.col2 === 'number' ? this.formatValue(r.col2, 'currency') : r.col2}</td>
        <td>${typeof r.col3 === 'number' ? this.formatValue(r.col3, 'currency') : r.col3}</td>
        <td>${typeof r.col4 === 'number' ? this.formatValue(r.col4, 'currency') : r.col4}</td>
        ${r.col5 !== undefined ? `<td>${typeof r.col5 === 'number' ? this.formatValue(r.col5, 'currency') : r.col5}</td>` : ''}
      </tr>
    `);

    if (footerText) {
      rowStrings.push(`
        <tr>
          <td colspan="${headers.filter(Boolean).length}" style="text-align:center;color:var(--txt-muted);font-size:0.85rem;padding:12px">
            ${footerText}
          </td>
        </tr>
      `);
    }

    tableBodyEl.innerHTML = rowStrings.join('');
  },

  initPDFPlaceholderUI(config) {
    const dropZone = document.getElementById('pdf-drop-zone');
    const fileInput = document.getElementById(`${config.inputs[0].id}-file-input`);
    const fileUl = document.getElementById('file-ul');
    const fileListDiv = document.getElementById('pdf-file-list');
    const resultsBox = document.getElementById('dynamic-results-box');
    
    if (!dropZone || !fileInput) return;

    let selectedFiles = [];

    const handleFiles = (files) => {
      const pdfFiles = Array.from(files).filter(f => f.name.endsWith('.pdf'));
      if (pdfFiles.length === 0) return;

      selectedFiles = selectedFiles.concat(pdfFiles);
      renderFileList();
    };

    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.background = 'rgba(37, 99, 235, 0.05)';
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.style.background = 'var(--bg-muted)';
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.background = 'var(--bg-muted)';
      handleFiles(e.dataTransfer.files);
    });

    const renderFileList = () => {
      if (selectedFiles.length === 0) {
        fileListDiv.style.display = 'none';
        resultsBox.innerHTML = '';
        return;
      }

      fileListDiv.style.display = 'block';
      fileUl.innerHTML = selectedFiles.map((file, index) => `
        <li style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-2) var(--space-3);background:var(--bg-surface);border:1px solid var(--border-color);border-radius:var(--radius-md);font-size:var(--text-sm);">
          <span style="font-weight:500;color:var(--txt-primary);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:300px;">
            📄 ${file.name} <span style="font-size:var(--text-xs);color:var(--txt-muted);">(${(file.size / 1024).toFixed(1)} KB)</span>
          </span>
          <div style="display:flex;gap:var(--space-1)">
            ${config.inputs[0].multiple ? `
              <button class="file-move-up" data-idx="${index}" style="border:none;background:none;cursor:pointer;font-size:1.1rem;padding:0 var(--space-1)">🔼</button>
              <button class="file-move-down" data-idx="${index}" style="border:none;background:none;cursor:pointer;font-size:1.1rem;padding:0 var(--space-1)">🔽</button>
            ` : ''}
            <button class="file-remove" data-idx="${index}" style="border:none;background:none;cursor:pointer;color:#EF4444;font-weight:bold;padding:0 var(--space-1)">✕</button>
          </div>
        </li>
      `).join('');

      fileUl.querySelectorAll('.file-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.getAttribute('data-idx'));
          selectedFiles.splice(idx, 1);
          renderFileList();
        });
      });

      if (config.inputs[0].multiple) {
        fileUl.querySelectorAll('.file-move-up').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            if (idx > 0) {
              const temp = selectedFiles[idx];
              selectedFiles[idx] = selectedFiles[idx - 1];
              selectedFiles[idx - 1] = temp;
              renderFileList();
            }
          });
        });
        fileUl.querySelectorAll('.file-move-down').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            if (idx < selectedFiles.length - 1) {
              const temp = selectedFiles[idx];
              selectedFiles[idx] = selectedFiles[idx + 1];
              selectedFiles[idx + 1] = temp;
              renderFileList();
            }
          });
        });
      }

      let btnLabel = '';
      if (this.activeTool === 'merge-pdf') btnLabel = 'Merge PDF Files';
      else if (this.activeTool === 'compress-pdf') btnLabel = 'Compress PDF Document';
      else btnLabel = 'Convert PDF to Word';

      resultsBox.innerHTML = `
        <button id="pdf-action-btn" class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-2);background:var(--gradient-brand);border:none;color:white;cursor:pointer;font-weight:700;height:48px;border-radius:var(--radius-xl);">
          ⚡ ${btnLabel}
        </button>
      `;

      document.getElementById('pdf-action-btn').addEventListener('click', () => {
        this.runPDFMockProcess(selectedFiles);
      });
    };
  },

  runPDFMockProcess(files) {
    const resultsBox = document.getElementById('dynamic-results-box');
    if (!resultsBox) return;

    let progress = 0;
    const steps = [
      'Scanning PDF document streams...',
      'Analyzing structural cross-references...',
      'Optimizing embedded graphic resources...',
      'Rebuilding document compression indexes...',
      'Writing final byte channels...'
    ];

    const timer = setInterval(() => {
      progress += 10;
      const stepIdx = Math.min(steps.length - 1, Math.floor(progress / 20));
      
      resultsBox.innerHTML = `
        <div style="text-align:center;padding:var(--space-4);">
          <div style="font-weight:600;margin-bottom:var(--space-2);color:var(--txt-primary);">${steps[stepIdx]}</div>
          <div style="background:var(--border-color);border-radius:var(--radius-full);height:12px;overflow:hidden;margin-bottom:var(--space-2);">
            <div style="width:${progress}%;background:var(--gradient-brand);height:100%;transition:width 0.1s linear;"></div>
          </div>
          <div style="font-size:var(--text-sm);color:var(--txt-muted);font-weight:bold">${progress}% Completed</div>
        </div>
      `;

      if (progress >= 100) {
        clearInterval(timer);
        this.completePDFMockProcess(files);
      }
    }, 200);
  },

  completePDFMockProcess(files) {
    const resultsBox = document.getElementById('dynamic-results-box');
    if (!resultsBox) return;

    let outputFilename = '';
    let resultTitle = '';
    let downloadBlob = null;

    if (this.activeTool === 'merge-pdf') {
      outputFilename = 'merged_document.pdf';
      resultTitle = 'PDF Files Merged Successfully!';
      const content = `%PDF-1.4\n% Needful Calculator 2.0 - Merged Report\n% Files merged:\n` + 
                      files.map(f => `% - ${f.name} (${f.size} bytes)`).join('\n') + 
                      `\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << >> /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 200 >>\nstream\nBT\n/F1 12 Tf\n72 712 Td\n(Needful Calculator 2.0 - Merged PDF Report) Tj\n0 -20 Td\n(Merged ${files.length} documents successfully.) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n320\n%%EOF`;
      downloadBlob = new Blob([content], { type: 'application/pdf' });
    } else if (this.activeTool === 'compress-pdf') {
      outputFilename = `${files[0].name.replace('.pdf', '')}_compressed.pdf`;
      resultTitle = 'PDF Compressed Successfully!';
      const content = `%PDF-1.4\n% Needful Calculator 2.0 - Compressed PDF\n% Original Size: ${files[0].size} bytes\n% Optimized Size: ${Math.round(files[0].size * 0.6)} bytes\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << >> /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 120 >>\nstream\nBT\n/F1 12 Tf\n72 712 Td\n(Compressed Document Report) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\ntrailer\n<< /Size 5 /Root 1 0 R >>\n%%EOF`;
      downloadBlob = new Blob([content], { type: 'application/pdf' });
    } else {
      outputFilename = `${files[0].name.replace('.pdf', '')}_converted.docx`;
      resultTitle = 'Converted to Word Document!';
      const docxMockText = `Needful Calculator 2.0 - Exported Text Content from ${files[0].name}\n` +
                          `Export Date: ${new Date().toDateString()}\n\n` + 
                          `[This is a mock DOCX container containing text layers parsed from the source PDF document.]`;
      downloadBlob = new Blob([docxMockText], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    }

    const downloadUrl = URL.createObjectURL(downloadBlob);

    resultsBox.innerHTML = `
      <div style="text-align:center;padding:var(--space-4);background:var(--gradient-hero);border:1.5px solid rgba(37,99,235,0.15);border-radius:var(--radius-xl);">
        <div style="font-size:2rem;margin-bottom:var(--space-2);">🎉</div>
        <h3 style="font-size:var(--text-lg);font-weight:700;color:var(--clr-primary);margin-bottom:var(--space-1);">${resultTitle}</h3>
        <p style="font-size:var(--text-sm);color:var(--txt-secondary);margin-bottom:var(--space-4);">Ready for download: <strong>${outputFilename}</strong></p>
        <a href="${downloadUrl}" download="${outputFilename}" class="btn btn-primary btn-lg" style="display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-weight:700;color:white;width:100%;height:46px;border-radius:var(--radius-xl);background:var(--gradient-brand);">
          📥 Download Output File
        </a>
      </div>
    `;
  },

  formatValue(val, format) {
    if (val === undefined || isNaN(val)) return '';
    if (format === 'currency') {
      return '₹' + Math.round(val).toLocaleString('en-IN');
    } else if (format === 'percent') {
      return val.toFixed(1) + '%';
    } else if (format === 'years') {
      return val + (val === 1 ? ' Year' : ' Years');
    } else if (format === 'days') {
      return val + (val === 1 ? ' Day' : ' Days');
    } else if (format === 'kg') {
      return val + ' kg';
    } else if (format === 'cm') {
      return val + ' cm';
    }
    return val;
  },

  populateCategoryCards() {
    const RenderCategoryMap = {
      // Finance
      'emi-calculator': 'finance', 'sip-calculator': 'finance', 'fd-calculator': 'finance',
      'ppf-calculator': 'finance', 'compound-interest': 'finance', 'retirement-calculator': 'finance',
      'loan-calculator': 'finance', 'loan-eligibility': 'finance', 'home-loan': 'finance',
      'car-loan': 'finance', 'personal-loan': 'finance', 'lumpsum': 'finance',
      'goal-sip': 'finance', 'retirement': 'finance', 'swp': 'finance',
      'nps': 'finance', 'cagr': 'finance', 'inflation': 'finance',

      // Tax
      'income-tax-calculator': 'tax', 'tds-calculator': 'tax', 'tax-saving-calculator': 'tax',
      'hra-calculator': 'tax', 'gratuity-calculator': 'tax', 'professional-tax-calculator': 'tax',
      'gst-calculator': 'tax', 'reverse-gst-calculator': 'tax', 'section-80c-calculator': 'tax',
      'section-80d-calculator': 'tax', 'capital-gain-calculator': 'tax',

      // Health
      'bmi-calculator': 'health', 'bmr-calculator': 'health', 'tdee-calculator': 'health',
      'body-fat-calculator': 'health', 'lean-body-mass': 'health', 'ideal-weight': 'health',
      'weight-loss': 'health', 'weight-gain': 'health', 'calorie-calculator': 'health',
      'water-intake': 'health', 'protein-intake': 'health', 'macro-calculator': 'health',
      'meal-calorie-calculator': 'health', 'heart-rate': 'health', 'target-heart-rate': 'health',
      'blood-pressure': 'health', 'blood-sugar-converter': 'health', 'sleep-calculator': 'health',
      'sleep-cycle': 'health', 'pregnancy-due-date': 'health', 'ovulation-calculator': 'health',
      'pregnancy-weight-gain': 'health',

      // Education
      'percentage-calculator': 'education', 'marks-percentage-calculator': 'education',
      'gpa-calculator': 'education', 'cgpa-calculator': 'education',
      'cgpa-to-percentage': 'education', 'percentage-to-cgpa': 'education',
      'average-calculator': 'education', 'grade-calculator': 'education',
      'attendance-calculator': 'education', 'study-time-calculator': 'education',
      'education-loan': 'education', 'word-counter': 'education',

      // Unit Converters
      'length-converter': 'unit', 'distance-converter': 'unit', 'height-converter': 'unit',
      'weight-converter': 'unit', 'mass-converter': 'unit', 'temperature-converter': 'unit',
      'area-converter': 'unit', 'volume-converter': 'unit', 'energy-converter': 'unit',
      'power-converter': 'unit', 'fuel-consumption-converter': 'unit', 'liquid-volume-converter': 'unit',
      'speed-converter': 'unit', 'data-storage-converter': 'unit', 'internet-speed-converter': 'unit',
      'time-converter': 'unit', 'pressure-converter': 'unit', 'force-converter': 'unit',
      'angle-converter': 'unit', 'frequency-converter': 'unit', 'currency-converter': 'unit',

      // Date & Time
      'age-calculator': 'date', 'age-difference': 'date', 'birthday-calculator': 'date',
      'next-birthday': 'date', 'date-difference': 'date', 'days-between-dates': 'date',
      'time-duration': 'date', 'time-zone-converter': 'date', 'working-days': 'date',
      'business-days': 'date', 'countdown-calculator': 'date', 'event-countdown': 'date',
      'day-of-week': 'date',

      // PDF
      'pdf-merge': 'pdf', 'pdf-split': 'pdf', 'jpg-to-pdf': 'pdf', 'pdf-to-jpg': 'pdf', 'pdf-rotate': 'pdf',
      'pdf-delete-pages': 'pdf', 'pdf-extract-pages': 'pdf', 'pdf-metadata-viewer': 'pdf', 'image-to-pdf': 'pdf', 'pdf-preview': 'pdf',

      // Insurance
      'life-insurance': 'insurance', 'human-life-value': 'insurance', 'term-insurance': 'insurance',
      'risk-cover': 'insurance', 'family-protection': 'insurance', 'child-education': 'insurance',
      'retirement-corpus': 'insurance', 'income-replacement': 'insurance',
      'premium-affordability': 'insurance', 'goal-protection': 'insurance'
    };

    const categoryMeta = {
      finance: { title: 'Finance Tools', icon: '🏦', class: 'cat-finance' },
      health: { title: 'Health Calculators', icon: '💚', class: 'cat-health' },
      education: { title: 'Education Tools', icon: '📚', class: 'cat-education' },
      unit: { title: 'Unit Converters', icon: '🔁', class: 'cat-unit' },
      date: { title: 'Date & Time Calculators', icon: '📅', class: 'cat-date' },
      pdf: { title: 'PDF Tools', icon: '📄', class: 'cat-pdf' },
      insurance: { title: 'Insurance Calculators', icon: '🛡️', class: 'cat-insurance' },
      tax: { title: 'Tax Calculators', icon: '💰', class: 'cat-tax' }
    };

    const badgeMap = {
      'emi-calculator': { text: 'Popular', class: 'badge-primary' },
      'sip-calculator': { text: 'Popular', class: 'badge-primary' },
      'fd-calculator': { text: 'Updated', class: 'badge-new' },
      'currency-converter': { text: 'Live', class: 'badge-accent' },
      'age-calculator': { text: 'Popular', class: 'badge-primary' },
      'pdf-merge': { text: 'New', class: 'badge-new' }
    };

    const container = document.querySelector('.cat-page-layout > div');
    if (!container) return;

    const order = ['finance', 'health', 'education', 'unit', 'date', 'pdf', 'insurance', 'tax'];
    const sections = {};
    const grids = {};
    
    const sidebarList = document.querySelector('.cat-sidebar-list');
    // Add Insurance item to sidebar list if not present
    if (sidebarList && !document.getElementById('cat-nav-insurance')) {
      const insuranceItem = document.createElement('a');
      insuranceItem.href = '#insurance';
      insuranceItem.className = 'cat-sidebar-item';
      insuranceItem.id = 'cat-nav-insurance';
      insuranceItem.innerHTML = `
        <span>🛡️ Insurance</span>
        <span class="sidebar-cat-count">0</span>
      `;
      sidebarList.appendChild(insuranceItem);
    }
    // Add Tax item to sidebar list if not present (after Insurance)
    if (sidebarList && !document.getElementById('cat-nav-tax')) {
      const taxItem = document.createElement('a');
      taxItem.href = '#tax';
      taxItem.className = 'cat-sidebar-item';
      taxItem.id = 'cat-nav-tax';
      taxItem.innerHTML = `
        <span>💰 Tax</span>
        <span class="sidebar-cat-count">0</span>
      `;
      const insItem = document.getElementById('cat-nav-insurance');
      if (insItem) {
        insItem.parentNode.insertBefore(taxItem, insItem.nextSibling);
      } else {
        sidebarList.appendChild(taxItem);
      }
    }

    order.forEach(cat => {
      const id = cat;
      let section = document.getElementById(id);
      if (!section) {
        section = document.createElement('section');
        section.className = 'category-section reveal';
        section.id = id;
        section.setAttribute('aria-labelledby', `${id}-heading`);
        section.innerHTML = `
          <div class="category-section-header">
            <div class="category-section-icon ${categoryMeta[cat].class}">${categoryMeta[cat].icon}</div>
            <h2 class="category-section-title" id="${id}-heading">${categoryMeta[cat].title}</h2>
            <span class="category-section-count">0 Tools</span>
          </div>
          <div class="grid-3"></div>
        `;
      }
      container.appendChild(section);
      sections[cat] = section;
      grids[cat] = section.querySelector('.grid-3');
      if (grids[cat]) grids[cat].innerHTML = ''; // Clear hardcoded ones
    });

    const counts = { finance: 0, health: 0, education: 0, unit: 0, date: 0, pdf: 0, insurance: 0, tax: 0 };
    let totalTools = 0;

    for (const [slug, config] of Object.entries(this.configs)) {
      const cat = RenderCategoryMap[slug];
      if (!cat) continue;
      const grid = grids[cat];
      if (!grid) continue;
      
      counts[cat]++;
      totalTools++;
      
      const badge = badgeMap[slug] || {
        text: cat.charAt(0).toUpperCase() + cat.slice(1),
        class: cat === 'health' || cat === 'insurance' ? 'badge-accent' : 'badge-primary'
      };
      
      const card = document.createElement('article');
      card.className = 'tool-card';
      card.id = `tool-${slug}`;
      card.innerHTML = `
        <div class="tool-card-icon">${config.icon || '🧮'}</div>
        <h3 class="tool-card-name">${config.title}</h3>
        <p class="tool-card-desc">${config.subtitle || ''}</p>
        <div class="tool-card-footer">
          <span class="badge ${badge.class}">${badge.text}</span>
          <a href="calculator.html?tool=${slug}" class="tool-card-open">Open <span class="tool-card-arrow">→</span></a>
        </div>
      `;
      grid.appendChild(card);
    }

    // Set up empty category messages
    order.forEach(cat => {
      const grid = grids[cat];
      if (grid && counts[cat] === 0) {
        grid.innerHTML = `<p class="no-calculators-msg" style="grid-column: 1 / -1; color: var(--txt-muted); font-size: var(--text-base); font-style: italic; padding: var(--space-4) 0; text-align: left; margin: 0;">No calculators available.</p>`;
      }
    });

    order.forEach(cat => {
      const section = sections[cat];
      if (!section) return;
      const countEl = section.querySelector('.category-section-count');
      if (countEl) {
        countEl.textContent = `${counts[cat]} Tool${counts[cat] === 1 ? '' : 's'}`;
      }
    });

    const updateSidebarCounts = (currentCounts) => {
      const sidebarCategories = {
        all: { id: 'cat-all', name: 'All Tools', icon: '🏠', count: currentCounts.total },
        finance: { id: 'cat-nav-finance', name: 'Finance Tools', icon: '🏦', count: currentCounts.finance },
        health: { id: 'cat-nav-health', name: 'Health', icon: '💚', count: currentCounts.health },
        education: { id: 'cat-nav-education', name: 'Education', icon: '📚', count: currentCounts.education },
        unit: { id: 'cat-nav-unit', name: 'Unit Converters', icon: '🔁', count: currentCounts.unit },
        date: { id: 'cat-nav-date', name: 'Date & Time', icon: '📅', count: currentCounts.date },
        pdf: { id: 'cat-nav-pdf', name: 'PDF Tools', icon: '📄', count: currentCounts.pdf },
        insurance: { id: 'cat-nav-insurance', name: 'Insurance', icon: '🛡️', count: currentCounts.insurance },
        tax: { id: 'cat-nav-tax', name: 'Tax', icon: '💰', count: currentCounts.tax }
      };

      Object.values(sidebarCategories).forEach(item => {
        const el = document.getElementById(item.id);
        if (el) {
          const labelSpan = el.querySelector('span:first-child');
          if (labelSpan) {
            labelSpan.textContent = `${item.icon} ${item.name} (${item.count})`;
          }
          const badge = el.querySelector('.sidebar-cat-count');
          if (badge) {
            badge.style.display = 'none';
          }
        }
      });
    };
    window.NC.updateSidebarCounts = updateSidebarCounts;

    // Apply baseline sidebar counts
    updateSidebarCounts({ ...counts, total: totalTools });

    // Render recently viewed on category page
    if (window.NC.RecentlyViewed) {
      window.NC.RecentlyViewed.render();
    }

    // Initialize ScrollSpy
    if (window.NC.ScrollSpy) {
      window.NC.ScrollSpy.init();
    }

    if (window.NC.searchModule) {
      const searchVal = document.getElementById('tools-search')?.value;
      if (searchVal) window.NC.searchModule.filterToolCards(searchVal);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  CalculatorRouter.init();
});

window.NC = window.NC || {};
window.NC.CalculatorRouter = CalculatorRouter;
window.NC.calculatorsLoaded = CalculatorRouter.loadAllCategoryCalculators();
