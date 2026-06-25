/* ============================================================
   NEEDFUL CALCULATOR — Animations Module
   animations.js
   ============================================================ */

'use strict';

/* ════════════════════════════════════════════
   1. SCROLL REVEAL
════════════════════════════════════════════ */
const ScrollReveal = (() => {

  const SELECTORS = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale', '.stagger-children'];

  const init = () => {
    /* Fallback for browsers without IntersectionObserver */
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(SELECTORS.join(',')).forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold:  0.08,
        rootMargin: '0px 0px -48px 0px',
      }
    );

    document.querySelectorAll(SELECTORS.join(',')).forEach(el => observer.observe(el));
  };

  return { init };
})();

/* ════════════════════════════════════════════
   2. COUNTER ANIMATION
════════════════════════════════════════════ */
const CounterAnimation = (() => {

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target   = parseFloat(el.getAttribute('data-count')) || 0;
    const suffix   = el.getAttribute('data-suffix') || '';
    const prefix   = el.getAttribute('data-prefix') || '';
    const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
    const duration = parseInt(el.getAttribute('data-duration')) || 1500;
    const start    = performance.now();

    const update = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const current  = target * eased;

      el.textContent = prefix + current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      }
    };

    requestAnimationFrame(update);
  };

  const init = () => {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
  };

  return { init };
})();

/* ════════════════════════════════════════════
   3. LAZY IMAGE LOADING (with fade-in)
════════════════════════════════════════════ */
const LazyImages = (() => {

  const init = () => {
    /* Use native lazy loading + fade-in effect */
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(img => {
      /* Set initial invisible state */
      if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.45s ease';

        img.addEventListener('load', () => {
          img.style.opacity = '1';
        }, { once: true });

        img.addEventListener('error', () => {
          /* Replace broken images with placeholder */
          img.style.opacity = '0.4';
          img.style.filter = 'grayscale(1)';
        }, { once: true });
      }
    });
  };

  return { init };
})();

/* ════════════════════════════════════════════
   4. RIPPLE EFFECT ON BUTTONS
════════════════════════════════════════════ */
const RippleEffect = (() => {

  const createRipple = (e) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    const x    = e.clientX - rect.left - size / 2;
    const y    = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;

    /* Clean up after animation */
    btn.classList.add('ripple-container');
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  };

  const init = () => {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
      btn.addEventListener('click', createRipple);
    });
  };

  return { init };
})();

/* ════════════════════════════════════════════
   5. PARALLAX HERO BACKGROUND
════════════════════════════════════════════ */
const ParallaxHero = (() => {

  const init = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrollY * 0.3}px`;
      }
    }, { passive: true });
  };

  return { init };
})();

/* ════════════════════════════════════════════
   6. STICKY TABLE OF CONTENTS HIGHLIGHT
════════════════════════════════════════════ */
const TOCHighlight = (() => {

  const init = () => {
    const tocLinks = document.querySelectorAll('.toc-item[href^="#"]');
    if (!tocLinks.length) return;

    const headings = [...tocLinks].map(link => {
      const id = link.getAttribute('href').slice(1);
      return document.getElementById(id);
    }).filter(Boolean);

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tocLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      {
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0,
      }
    );

    headings.forEach(h => observer.observe(h));
  };

  return { init };
})();

/* ════════════════════════════════════════════
   7. SMOOTH SCROLL FOR ANCHOR LINKS
════════════════════════════════════════════ */
const SmoothScroll = (() => {

  const init = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const id     = anchor.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();

        const headerH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')) || 72;

        const targetY = target.getBoundingClientRect().top
          + window.scrollY
          - headerH
          - 16;

        window.scrollTo({ top: targetY, behavior: 'smooth' });
      });
    });
  };

  return { init };
})();

/* ════════════════════════════════════════════
   8. PAGE TRANSITION
════════════════════════════════════════════ */
const PageTransition = (() => {

  const init = () => {
    /* Fade in on page load */
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.35s ease';

    window.addEventListener('load', () => {
      document.body.style.opacity = '1';
    });

    /* Fade out on navigation */
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') ||
          href.startsWith('mailto') || link.getAttribute('target') === '_blank') return;

      link.addEventListener('click', (e) => {
        if (e.defaultPrevented) return;
        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = href; }, 300);
      });
    });
  };

  return { init };
})();

/* ════════════════════════════════════════════
   INIT ALL
════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  ScrollReveal.init();
  CounterAnimation.init();
  LazyImages.init();
  RippleEffect.init();
  TOCHighlight.init();
  SmoothScroll.init();
  // PageTransition.init(); // Enable if desired
});

/* Export */
window.NC = window.NC || {};
window.NC.animations = { ScrollReveal, CounterAnimation, LazyImages };
