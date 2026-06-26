/* ============================================================
   NEEDFUL CALCULATOR — Core Application
   main.js  (core only — search in search.js, animations in animations.js)
   ============================================================ */

'use strict';

/* ════════════════════════════════════════════
   0. ANALYTICS HOOKS
════════════════════════════════════════════ */
window.NC = window.NC || {};
window.NC.trackCategoryView = (categoryName) => {
  console.log(`[Analytics] Category Viewed: ${categoryName}`);
};
window.NC.trackCalculatorOpen = (calculatorSlug, calculatorTitle) => {
  console.log(`[Analytics] Calculator Opened: ${calculatorSlug} (${calculatorTitle})`);
};


/* ════════════════════════════════════════════
   1. DARK MODE MANAGER
════════════════════════════════════════════ */
const ThemeManager = (() => {
  const KEY = 'nc-theme';

  const ICONS = {
    dark: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <circle cx="12" cy="12" r="5"/>
             <line x1="12" y1="1" x2="12" y2="3"/>
             <line x1="12" y1="21" x2="12" y2="23"/>
             <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
             <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
             <line x1="1" y1="12" x2="3" y2="12"/>
             <line x1="21" y1="12" x2="23" y2="12"/>
             <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
             <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
           </svg>`,
    light: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>`,
  };

  const apply = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = theme === 'dark' ? ICONS.dark : ICONS.light;
      btn.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });

    /* Update meta theme-color for mobile browsers */
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = theme === 'dark' ? '#0F172A' : '#F8FAFC';
    }
  };

  const toggle = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(KEY, next);
    apply(next);
  };

  const init = () => {
    const saved        = localStorage.getItem(KEY);
    const prefersDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme        = saved || (prefersDark ? 'dark' : 'light');
    apply(theme);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggle);
    });

    /* Sync across tabs */
    window.addEventListener('storage', (e) => {
      if (e.key === KEY && e.newValue) apply(e.newValue);
    });

    /* Respect OS preference changes if no manual choice */
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(KEY)) apply(e.matches ? 'dark' : 'light');
    });
  };

  return { init, toggle, apply };
})();

/* ════════════════════════════════════════════
   2. MOBILE NAVIGATION
════════════════════════════════════════════ */
const MobileNav = (() => {

  let hamburger, mobileNav, overlay;

  const open = () => {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileNav.querySelector('a')?.focus();
  };

  const close = () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const init = () => {
    hamburger = document.getElementById('hamburger');
    mobileNav = document.getElementById('mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('open') ? close() : open();
    });

    /* Close on link clicks */
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', close);
    });

    /* Trap focus inside mobile nav when open */
    mobileNav.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    /* Swipe left to close */
    let startX = 0;
    mobileNav.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    mobileNav.addEventListener('touchend',   (e) => {
      if (e.changedTouches[0].clientX - startX < -60) close();
    }, { passive: true });
  };

  return { init, open, close };
})();

/* ════════════════════════════════════════════
   3. STICKY HEADER
════════════════════════════════════════════ */
const StickyHeader = (() => {

  const init = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const compact = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.1)';
      } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = '';
      }
    };

    window.addEventListener('scroll', compact, { passive: true });
    compact();
  };

  return { init };
})();

/* ════════════════════════════════════════════
   4. FAQ ACCORDION
════════════════════════════════════════════ */
const FAQ = (() => {

  const init = () => {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item   = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        /* Close siblings */
        const siblings = item.closest('.faq-list')?.querySelectorAll('.faq-item.open');
        siblings?.forEach(s => {
          s.classList.remove('open');
          s.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });

        /* Toggle current */
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  };

  return { init };
})();

/* ════════════════════════════════════════════
   5. NEWSLETTER FORM
════════════════════════════════════════════ */
const Newsletter = (() => {

  const bindForm = (form) => {
    if (!form) return;

    const input  = form.querySelector('input[type="email"]');
    const button = form.querySelector('button[type="submit"]');
    if (!input || !button) return;

    const originalText = button.textContent;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!valid) {
        input.style.borderColor = '#EF4444';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        setTimeout(() => {
          input.style.borderColor = '';
          input.removeAttribute('aria-invalid');
        }, 2500);
        return;
      }

      /* Success state */
      button.disabled  = true;
      button.textContent = '✓ Subscribed!';
      button.style.background = 'rgba(255,255,255,0.9)';
      button.style.color = '#166534';
      input.value = '';

      setTimeout(() => {
        button.disabled  = false;
        button.textContent = originalText;
        button.style.background = '';
        button.style.color = '';
      }, 4000);
    });
  };

  const init = () => {
    document.querySelectorAll('.newsletter-form, #newsletter-form, #sidebar-newsletter')
      .forEach(bindForm);
  };

  return { init };
})();

/* ════════════════════════════════════════════
   6. ACTIVE NAV LINK
════════════════════════════════════════════ */
const ActiveNav = (() => {

  const init = () => {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-links a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const page = href.split('/').pop();
      if (page === current || (current === '' && page === 'index.html')) {
        link.classList.add('active');
      }
    });
  };

  return { init };
})();

/* ════════════════════════════════════════════
   7. COPY TO CLIPBOARD UTILITY
════════════════════════════════════════════ */
const Clipboard = (() => {

  const copy = async (text, btn) => {
    try {
      await navigator.clipboard.writeText(text);
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      }
      return true;
    } catch {
      return false;
    }
  };

  const init = () => {
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        copy(text, btn);
      });
    });
  };

  return { init, copy };
})();

/* ════════════════════════════════════════════
   8. BACK TO TOP BUTTON
════════════════════════════════════════════ */
const BackToTop = (() => {

  const init = () => {
    /* Create button dynamically */
    const btn = document.createElement('button');
    btn.id            = 'back-to-top';
    btn.className     = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>`;

    btn.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--gradient-brand);
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(37,99,235,0.35);
      opacity: 0;
      visibility: hidden;
      transform: translateY(12px);
      transition: all 0.3s ease;
      z-index: 500;
    `;

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.style.opacity      = '1';
        btn.style.visibility   = 'visible';
        btn.style.transform    = 'translateY(0)';
      } else {
        btn.style.opacity      = '0';
        btn.style.visibility   = 'hidden';
        btn.style.transform    = 'translateY(12px)';
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return { init };
})();

/* ════════════════════════════════════════════
   9. LINK AUTO FIXER
   Auto-links placeholder links across all pages
════════════════════════════════════════════ */
const LinkAutoFixer = (() => {
  const MAP = {
    'emi calculator': 'calculator.html?tool=emi-calculator',
    'loan eligibility calculator': 'calculator.html?tool=loan-eligibility',
    'home loan emi calculator': 'calculator.html?tool=home-loan',
    'car loan emi calculator': 'calculator.html?tool=car-loan',
    'education loan emi calculator': 'calculator.html?tool=education-loan',
    'education loan calculator': 'calculator.html?tool=education-loan',
    'lumpsum calculator': 'calculator.html?tool=lumpsum',
    'goal sip calculator': 'calculator.html?tool=goal-sip',
    'retirement calculator': 'calculator.html?tool=retirement',
    'swp calculator': 'calculator.html?tool=swp',
    'nps calculator': 'calculator.html?tool=nps',
    'cagr calculator': 'calculator.html?tool=cagr',
    'inflation calculator': 'calculator.html?tool=inflation',
    'personal loan emi calculator': 'calculator.html?tool=personal-loan',
    'sip calculator': 'calculator.html?tool=sip-calculator',
    'sip returns calculator': 'calculator.html?tool=sip-calculator',
    'fd calculator': 'calculator.html?tool=fd-calculator',
    'fd maturity calculator': 'calculator.html?tool=fd-calculator',
    'ppf calculator': 'calculator.html?tool=ppf-calculator',
    'income tax calculator': 'calculator.html?tool=income-tax-calculator',
    'income tax 2024': 'calculator.html?tool=income-tax-calculator',
    'tax calculator': 'calculator.html?tool=income-tax-calculator',
    'gst calculator': 'calculator.html?tool=gst-calculator',
    'compound interest': 'calculator.html?tool=compound-interest',
    'currency converter': 'calculator.html?tool=currency-converter',
    'bmi calculator': 'calculator.html?tool=bmi-calculator',
    'calorie calculator': 'calculator.html?tool=calorie-calculator',
    'ideal weight calculator': 'calculator.html?tool=ideal-weight',
    'water intake calculator': 'calculator.html?tool=water-intake',
    'pregnancy due date': 'calculator.html?tool=pregnancy-due-date',
    'sleep calculator': 'calculator.html?tool=sleep-calculator',
    'age calculator': 'calculator.html?tool=age-calculator',
    'date difference': 'calculator.html?tool=date-difference',
    'day of week calculator': 'calculator.html?tool=day-of-week',
    'length converter': 'calculator.html?tool=length-converter',
    'weight converter': 'calculator.html?tool=weight-converter',
    'temperature converter': 'calculator.html?tool=temperature-converter',
    'word counter': 'calculator.html?tool=word-counter',
    'merge pdf': 'calculator.html?tool=pdf-merge',
    'split pdf': 'calculator.html?tool=pdf-split',
    'pdf preview': 'calculator.html?tool=pdf-preview',

    // Category mapping
    'finance tools': 'category.html#finance',
    'health calculators': 'category.html#health',
    'education tools': 'category.html#education',
    'unit converters': 'category.html#unit',
    'date calculators': 'category.html#date',
    'pdf tools': 'category.html#pdf',
    'tax tools': 'category.html#tax'
  };

  const init = () => {
    document.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === '#' || href === 'calculator.html' || href === 'calculator.html?tool=emi-calculator' || href === 'calculator.html?tool=retirement-calculator' || !href) {
        const card = a.closest('.tool-card, .trending-card, .category-card');
        const heading = card ? (card.querySelector('.tool-card-name, .trending-name, .category-name')?.textContent || '') : '';
        const text = (a.textContent + ' ' + heading).trim().toLowerCase();
        
        for (const [key, value] of Object.entries(MAP)) {
          if (text === key || text.includes(key)) {
            a.setAttribute('href', value);
            break;
          }
        }
      }
    });
  };

  return { init };
})();

/* ════════════════════════════════════════════
   10. RECENTLY VIEWED MANAGER
════════════════════════════════════════════ */
const RecentlyViewed = (() => {
  const KEY = 'nc-recent-calculators';

  const get = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  };

  const add = (slug, title, icon) => {
    if (!slug || !title) return;
    let list = get();
    // Remove if already exists to move it to top
    list = list.filter(item => item.slug !== slug);
    list.unshift({ slug, title, icon: icon || '🧮' });
    // Limit to 5 items
    if (list.length > 5) list.pop();
    localStorage.setItem(KEY, JSON.stringify(list));
  };

  const render = () => {
    const list = get();
    if (list.length === 0) return;

    // 1. Calculator page sidebar injection
    const mainSidebar = document.querySelector('aside.sidebar');
    if (mainSidebar && !document.getElementById('recently-viewed-widget')) {
      const widget = document.createElement('div');
      widget.className = 'sidebar-widget';
      widget.id = 'recently-viewed-widget';
      widget.innerHTML = `
        <div class="sidebar-widget-header">🕒 Recently Viewed</div>
        <div class="sidebar-widget-body">
          <div class="sidebar-tool-list">
            ${list.map(item => `
              <a href="calculator.html?tool=${item.slug}" class="sidebar-tool-item">
                <div class="sidebar-tool-icon" aria-hidden="true">${item.icon}</div>
                <div>
                  <div class="sidebar-tool-name">${item.title}</div>
                  <div class="sidebar-tool-meta">Recently Viewed</div>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
      const searchWidget = mainSidebar.querySelector('.sidebar-widget');
      if (searchWidget && searchWidget.nextElementSibling) {
        mainSidebar.insertBefore(widget, searchWidget.nextElementSibling);
      } else {
        mainSidebar.appendChild(widget);
      }
    }

    // 2. Category page sidebar injection
    const catSidebar = document.querySelector('.cat-sidebar');
    if (catSidebar && !document.getElementById('recently-viewed-list-cat')) {
      const wrap = document.createElement('div');
      wrap.id = 'recently-viewed-list-cat';
      wrap.innerHTML = `
        <div class="cat-sidebar-header" style="background:var(--bg-muted);color:var(--txt-secondary);border-top:1px solid var(--border-color);font-size:var(--text-xs);padding:var(--space-3) var(--space-5);">🕒 Recent</div>
        <nav class="cat-sidebar-list" style="padding:var(--space-2) var(--space-3);">
          ${list.map(item => `
            <a href="calculator.html?tool=${item.slug}" class="cat-sidebar-item" style="padding:var(--space-2) var(--space-3);margin-bottom:2px;font-size:var(--text-xs);">
              <span>${item.icon} ${item.title}</span>
            </a>
          `).join('')}
        </nav>
      `;
      catSidebar.appendChild(wrap);
    }
  };

  const init = () => {
    if (window.location.pathname.includes('calculator.html')) {
      render();
    }
  };

  return { get, add, render, init };
})();

/* ════════════════════════════════════════════
   11. SCROLL SPY & HASH NAVIGATOR
════════════════════════════════════════════ */
const ScrollSpy = (() => {
  let isScrolling = false;
  let activeSections = new Map();
  let observer = null;
  let lastTrackedCategory = null;

  const getVisibleSections = () => {
    return Array.from(document.querySelectorAll('.category-section'))
      .filter(s => s.style.display !== 'none');
  };

  const highlight = (id) => {
    const items = document.querySelectorAll('.cat-sidebar-item');
    let activeItem = null;
    items.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#${id}`) {
        item.classList.add('active');
        activeItem = item;
      } else {
        item.classList.remove('active');
      }
    });

    const activeLabelSpan = document.getElementById('active-cat-name');
    if (activeLabelSpan && activeItem) {
      const text = activeItem.querySelector('span:first-child')?.textContent || '';
      activeLabelSpan.textContent = text;
    }

    if (id !== lastTrackedCategory) {
      lastTrackedCategory = id;
      if (window.NC && typeof window.NC.trackCategoryView === 'function') {
        window.NC.trackCategoryView(id);
      }
    }
  };

  const handleScroll = () => {
    updateScrollProgress();

    if (isScrolling) return;

    const sections = getVisibleSections();
    if (sections.length === 0) {
      highlight('all');
      return;
    }

    const scrollPos = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 70;
    const threshold = headerHeight + 150;

    let activeId = 'all';

    if (scrollPos + viewportHeight >= totalHeight - 50) {
      activeId = sections[sections.length - 1].id;
    } else if (scrollPos < 150) {
      activeId = 'all';
    } else {
      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        if (scrollPos >= sec.offsetTop - threshold) {
          activeId = sec.id;
        }
      }
    }

    highlight(activeId);
  };

  const updateScrollProgress = () => {
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress';
      progressBar.className = 'scroll-progress-bar';
      document.body.appendChild(progressBar);
    }

    const scrollPos = window.scrollY || window.pageYOffset;
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = totalScrollable > 0 ? (scrollPos / totalScrollable) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  };

  const scrollToSection = (id, smooth = true) => {
    const targetSection = id === 'all' ? null : document.getElementById(id);
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 70;
    
    let offset = 0;
    if (targetSection) {
      offset = targetSection.offsetTop - headerHeight - 20;
    }

    isScrolling = true;
    highlight(id);

    window.scrollTo({
      top: offset,
      behavior: smooth ? 'smooth' : 'auto'
    });

    if (smooth) {
      setTimeout(() => {
        isScrolling = false;
        handleScroll();
      }, 800);
    } else {
      isScrolling = false;
    }
  };

  const init = () => {
    const isCategoryPage = window.location.pathname.includes('category.html');
    if (!isCategoryPage) return;

    const searchWrap = document.querySelector('.tools-search-wrap');
    if (searchWrap && !document.getElementById('active-category-label')) {
      const activeLabel = document.createElement('div');
      activeLabel.id = 'active-category-label';
      activeLabel.className = 'active-category-label reveal';
      activeLabel.style.cssText = 'font-size: var(--text-sm); font-weight: 600; color: var(--clr-primary); margin-top: calc(-1 * var(--space-4)); margin-bottom: var(--space-6); display: flex; align-items: center; gap: var(--space-2);';
      activeLabel.innerHTML = `
        <span style="color: var(--txt-muted);">Viewing:</span>
        <span id="active-cat-name" style="background: var(--clr-primary-light); padding: 4px 12px; border-radius: var(--radius-full); transition: all 0.3s ease;">All Tools</span>
      `;
      searchWrap.parentNode.insertBefore(activeLabel, searchWrap.nextSibling);
    }

    updateScrollProgress();

    document.querySelectorAll('.cat-sidebar-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const id = href.substring(1);
          
          history.pushState(null, null, href);
          scrollToSection(id, true);
        }
      });
    });

    const sections = document.querySelectorAll('.category-section');
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 70;

    if (sections.length > 0 && typeof IntersectionObserver !== 'undefined') {
      const options = {
        root: null,
        rootMargin: `-${headerHeight + 20}px 0px -60% 0px`,
        threshold: [0, 0.1, 0.2]
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          activeSections.set(entry.target.id, entry.isIntersecting);
        });

        if (isScrolling) return;

        let activeId = 'all';
        const ordered = Array.from(sections);
        const visible = ordered.filter(s => activeSections.get(s.id) && s.style.display !== 'none');

        if (visible.length > 0) {
          activeId = visible[0].id;
        } else if (window.scrollY < 150) {
          activeId = 'all';
        } else {
          const scrollPos = window.scrollY;
          for (let i = ordered.length - 1; i >= 0; i--) {
            const sec = ordered[i];
            if (sec.style.display !== 'none' && scrollPos >= sec.offsetTop - headerHeight - 150) {
              activeId = sec.id;
              break;
            }
          }
        }
        highlight(activeId);
      }, options);

      sections.forEach(s => observer.observe(s));
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Footer Overlap Guard ──
    // Dynamically reduce sidebar max-height when footer enters viewport
    const sidebar = document.querySelector('.cat-sidebar');
    const footer  = document.querySelector('.site-footer');
    if (sidebar && footer && window.innerWidth >= 992) {
      const footerGuard = () => {
        const footerRect  = footer.getBoundingClientRect();
        const headerH     = document.querySelector('.site-header')?.offsetHeight || 70;
        const sidebarTop  = headerH + 20;
        const viewH       = window.innerHeight;

        if (footerRect.top < viewH) {
          // Footer is entering viewport — shrink sidebar to stop before it
          const remaining = footerRect.top - sidebarTop - 20;
          sidebar.style.maxHeight = Math.max(100, remaining) + 'px';
        } else {
          // Footer below viewport — full available height
          sidebar.style.maxHeight = `calc(100vh - ${sidebarTop + 20}px)`;
        }
      };

      window.addEventListener('scroll', footerGuard, { passive: true });
      window.addEventListener('resize', footerGuard, { passive: true });
      footerGuard(); // Run once on init
    }

    // ── Mobile: Scroll active chip into view ──
    // Ensures the highlighted chip is always visible in the horizontal scroll
    const scrollChipIntoView = (id) => {
      if (window.innerWidth >= 992) return;
      const chip = document.querySelector(`.cat-sidebar-item[href="#${id}"]`);
      if (chip) {
        const container = chip.parentElement;
        if (container) {
          const containerWidth = container.offsetWidth;
          const chipOffsetLeft = chip.offsetLeft;
          const chipWidth = chip.offsetWidth;
          const leftOffset = chipOffsetLeft - container.offsetLeft;
          container.scrollTo({
            left: leftOffset - (containerWidth / 2) + (chipWidth / 2),
            behavior: 'smooth'
          });
        }
      }
    };

    // Patch highlight to also scroll chip on mobile
    const originalHighlight = highlight;
    const patchedHighlight = (id) => {
      originalHighlight(id);
      scrollChipIntoView(id);
    };
    // Replace scroll handler with patched version
    window.removeEventListener('scroll', handleScroll);
    const patchedHandleScroll = () => {
      updateScrollProgress();
      if (isScrolling) return;
      const sections = getVisibleSections();
      if (sections.length === 0) { patchedHighlight('all'); return; }
      const scrollPos = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const header = document.querySelector('.site-header');
      const hH = header ? header.offsetHeight : 70;
      const threshold = hH + 150;
      let activeId = 'all';
      if (scrollPos + viewportHeight >= totalHeight - 50) {
        activeId = sections[sections.length - 1].id;
      } else if (scrollPos < 150) {
        activeId = 'all';
      } else {
        for (let i = 0; i < sections.length; i++) {
          const sec = sections[i];
          if (scrollPos >= sec.offsetTop - threshold) { activeId = sec.id; }
        }
      }
      patchedHighlight(activeId);
    };
    window.addEventListener('scroll', patchedHandleScroll, { passive: true });

    const initialHash = window.location.hash;
    if (initialHash) {
      const targetId = initialHash.substring(1);
      setTimeout(() => {
        scrollToSection(targetId, false);
      }, 150);
    }
  };

  return { init, handleScroll, scrollToSection };
})();

/* ════════════════════════════════════════════
   INIT ALL
════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  MobileNav.init();
  StickyHeader.init();
  FAQ.init();
  Newsletter.init();
  ActiveNav.init();
  Clipboard.init();
  BackToTop.init();
  LinkAutoFixer.init();
  RecentlyViewed.init();
  ScrollSpy.init();
});

/* Global exports */
window.NC = window.NC || {};
Object.assign(window.NC, { ThemeManager, MobileNav, FAQ, Clipboard, LinkAutoFixer, RecentlyViewed, ScrollSpy });
