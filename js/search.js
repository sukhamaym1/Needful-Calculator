/* ============================================================
   NEEDFUL CALCULATOR — Search Module
   search.js
   ============================================================ */

'use strict';

var SearchModule = (() => {

  /* ─── Tool Database ─── */
  const TOOLS = [];



  const buildSearchDatabase = () => {
    TOOLS.length = 0;
    
    const categoryLabelMap = {
      finance: 'Finance',
      health: 'Health',
      education: 'Education',
      unit: 'Unit',
      date: 'Date',
      pdf: 'PDF',
      insurance: 'Insurance',
      tax: 'Tax'
    };

    // 1. Index Calculators
    if (window.NC && window.NC.CalculatorRouter && window.NC.CalculatorRouter.configs) {
      const RenderCategoryMap = window.NC.CalculatorRouter.slugToCategoryMap || {};
      for (const [slug, config] of Object.entries(window.NC.CalculatorRouter.configs)) {
        const renderCat = RenderCategoryMap[slug] || 'finance';
        const catName = categoryLabelMap[renderCat] || 'Finance';
        TOOLS.push({
          name: config.title,
          slug: slug,
          category: catName,
          icon: config.icon || '🧮',
          url: `calculator.html?tool=${slug}`,
          desc: config.subtitle || '',
          keywords: config.keywords || []
        });
      }
    }

    // 2. Index Categories
    for (const [catKey, catName] of Object.entries(categoryLabelMap)) {
      TOOLS.push({
        name: catName + ' Calculators',
        slug: catKey,
        category: 'Category',
        icon: '🗂️',
        url: `category.html#${catKey}`,
        desc: `Browse all ${catName} calculators and online tools.`,
        keywords: [catKey, catName.toLowerCase(), 'category', 'tools', 'calculators']
      });
    }

    // 3. Index Blog Posts
    if (window.NC && window.NC.BLOG_POSTS) {
      for (const post of window.NC.BLOG_POSTS) {
        TOOLS.push({
          name: post.title,
          slug: post.slug,
          category: 'Blog',
          icon: '📰',
          url: `blog-post.html?post=${post.slug}`,
          desc: post.excerpt || '',
          keywords: post.keywords || [],
          tags: post.tags || []
        });
      }
    }
  };

  /* ─── Helpers ─── */
  const escapeRegex = (str) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const highlight = (text, query) => {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex,
      '<mark style="background:transparent;color:var(--clr-primary);font-weight:700">$1</mark>'
    );
  };

  const renderResultItem = (tool, query) => `
    <a class="search-result-item" href="${tool.url}" role="option"
       aria-label="${tool.name} — ${tool.category}">
      <div class="search-result-icon" aria-hidden="true">${tool.icon}</div>
      <div class="search-result-body">
        <div class="search-result-text">${highlight(tool.name, query)}</div>
        <div class="search-result-cat">${tool.category} · ${tool.desc}</div>
      </div>
      <svg class="search-result-arrow" width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  `;

  const renderNoResults = (query) => `
    <div class="search-no-results">
      <span aria-hidden="true">🔍</span>
      <span>No results for "<strong>${query}</strong>"</span>
    </div>
  `;

  /* ─── Search Logic ─── */
  const search = (query) => {
    query = query.trim();
    if (!query) return [];

    const q = query.toLowerCase();
    return TOOLS
      .map(tool => {
        let score = 0;
        const name = tool.name.toLowerCase();
        const cat  = tool.category.toLowerCase();
        const desc = tool.desc.toLowerCase();
        
        let kwMatch = false;
        if (tool.keywords) {
          kwMatch = tool.keywords.some(kw => kw.toLowerCase().includes(q));
        }
        
        let tagMatch = false;
        if (tool.tags) {
          tagMatch = tool.tags.some(tag => tag.toLowerCase().includes(q));
        }

        if (name === q)                       score += 100;
        else if (name.startsWith(q))          score += 60;
        else if (name.includes(q))            score += 30;
        if (cat.includes(q))                  score += 15;
        if (desc.includes(q))                 score += 10;
        if (kwMatch)                          score += 25;
        if (tagMatch)                         score += 20;

        return { ...tool, score };
      })
      .filter(t => t.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7);
  };

  /* ─── Instance factory ─── */
  const createSearchInstance = (inputEl, dropdownEl) => {
    if (!inputEl || !dropdownEl) return;

    let debounceTimer;
    let activeIdx = -1;
    let results = [];

    const show = () => dropdownEl.classList.add('show');
    const hide = () => { dropdownEl.classList.remove('show'); activeIdx = -1; }

    const setActive = (idx) => {
      const items = dropdownEl.querySelectorAll('.search-result-item');
      items.forEach((el, i) => el.classList.toggle('is-active', i === idx));
      activeIdx = idx;
    };

    const render = (query) => {
      results = search(query);
      if (!results.length) {
        dropdownEl.innerHTML = renderNoResults(query);
      } else {
        dropdownEl.innerHTML = results.map(t => renderResultItem(t, query)).join('');
      }
      show();
    };

    /* Input event */
    inputEl.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const q = inputEl.value.trim();
      if (!q) { hide(); return; }
      debounceTimer = setTimeout(() => render(q), 180);
    });

    /* Focus — re-show if has value */
    inputEl.addEventListener('focus', () => {
      if (inputEl.value.trim()) render(inputEl.value.trim());
    });

    /* Keyboard navigation */
    inputEl.addEventListener('keydown', (e) => {
      const items = dropdownEl.querySelectorAll('.search-result-item');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(Math.min(activeIdx + 1, items.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(Math.max(activeIdx - 1, 0));
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0 && items[activeIdx]) {
          e.preventDefault();
          items[activeIdx].click();
        }
      } else if (e.key === 'Escape') {
        hide();
        inputEl.blur();
      }
    });

    /* Form submit → navigate to first result */
    const form = inputEl.closest('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (results.length) window.location.href = results[0].url;
      });
    }

    /* Close on outside click */
    document.addEventListener('click', (e) => {
      const wrapper = inputEl.closest('[class*="search"]') || inputEl.parentElement;
      if (!wrapper?.contains(e.target)) hide();
    });

    return { show, hide };
  };

  const loadBlogData = async () => {
    if (!window.NC.BLOG_POSTS) {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'js/blog.js';
        script.defer = true;
        script.onload = resolve;
        script.onerror = resolve;
        document.head.appendChild(script);
      });
    }
  };

  /* ─── Init all search instances on page ─── */
  const init = () => {
    const runSetup = async () => {
      await loadBlogData();
      buildSearchDatabase();
      
      /* Header search */
      createSearchInstance(
        document.getElementById('header-search-input'),
        document.querySelector('.header-search .search-results')
      );

      /* Hero search */
      createSearchInstance(
        document.getElementById('hero-search'),
        document.querySelector('.hero-search .search-results')
      );

      /* Sidebar search */
      createSearchInstance(
        document.getElementById('sidebar-search-input'),
        document.querySelector('.sidebar-search .search-results')
      );

      /* Mobile nav search */
      createSearchInstance(
        document.getElementById('mobile-search-input'),
        document.getElementById('mobile-search-results')
      );

      /* Tools page search bar */
      const toolsBar = document.getElementById('tools-search');
      if (toolsBar) {
        let searchDebounce;
        toolsBar.addEventListener('input', () => {
          clearTimeout(searchDebounce);
          searchDebounce = setTimeout(() => {
            filterToolCards(toolsBar.value);
          }, 150);
        });
      }
    };

    if (window.NC && window.NC.calculatorsLoaded) {
      window.NC.calculatorsLoaded.then(runSetup).catch(err => {
        console.error('Failed to load calculators for search:', err);
        runSetup();
      });
    } else {
      runSetup();
    }
  };

  /* ─── Inline Tool Card Filter (category page) ─── */
  const filterToolCards = (query) => {
    query = query.toLowerCase().trim();
    const cards = document.querySelectorAll('.tool-card[id]');

    cards.forEach(card => {
      const name = card.querySelector('.tool-card-name')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.tool-card-desc')?.textContent.toLowerCase() || '';
      const match = !query || name.includes(query) || desc.includes(query);
      card.style.display = match ? '' : 'none';
    });

    /* Hide empty category sections or handle empty message */
    document.querySelectorAll('.category-section').forEach(section => {
      const hasCards = section.querySelectorAll('.tool-card').length > 0;
      if (hasCards) {
        const visible = [...section.querySelectorAll('.tool-card')].some(
          c => c.style.display !== 'none'
        );
        section.style.display = visible ? '' : 'none';
      } else {
        // Categories with 0 calculators originally (e.g. Insurance)
        // Show only on empty search
        section.style.display = query === '' ? '' : 'none';
      }
    });

    // Recalculate dynamic counts
    const currentCounts = { finance: 0, health: 0, education: 0, unit: 0, date: 0, pdf: 0, insurance: 0, tax: 0, total: 0 };
    document.querySelectorAll('.category-section').forEach(section => {
      const catId = section.id;
      if (section.style.display !== 'none') {
        const visibleCardsCount = Array.from(section.querySelectorAll('.tool-card')).filter(
          c => c.style.display !== 'none'
        ).length;
        currentCounts[catId] = visibleCardsCount;
        currentCounts.total += visibleCardsCount;
      }
    });

    // Update sidebar counts
    if (window.NC && typeof window.NC.updateSidebarCounts === 'function') {
      window.NC.updateSidebarCounts(currentCounts);
    }
  };

  return { init, search, TOOLS, filterToolCards, buildSearchDatabase };

})();

/* ─── Expose tools globally ─── */
window.NC = window.NC || {};
window.NC.TOOLS = SearchModule.TOOLS;
window.NC.searchModule = SearchModule;

/* ─── Auto-init ─── */
document.addEventListener('DOMContentLoaded', () => SearchModule.init());
