/* ═══════════════════════════════════════════════
   FORM ENDPOINTS — Formspree
   ─────────────────────────────────────────────
   1. Go to formspree.io → create TWO forms:
      • "ClearSide Contact Form" → use clearsidexteriors@gmail.com
      • "ClearSide Popup / Email Capture" → same email
   2. For each, copy the form ID (e.g. xpzgkwqr)
   3. Replace the placeholders below
   4. In Formspree Settings → Integrations → Webhook
      paste your Flyra webhook URL to pipe leads to CRM
═══════════════════════════════════════════════ */
const CONTACT_ENDPOINT = 'https://formspree.io/f/xwvzwovg';
const POPUP_ENDPOINT   = 'https://formspree.io/f/xwvzwovg';

const POPUP_STORAGE_KEY  = 'cs_popup_seen';
const POPUP_COOLDOWN_MS  = 7 * 24 * 60 * 60 * 1000; // 7 days

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky nav ── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Mobile menu ── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  /* ── Active nav link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Expandable service cards ── */
  document.querySelectorAll('.ec').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      card.classList.toggle('open');
    });
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item  = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Stat counter animation ── */
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const tile = e.target;
      tile.classList.add('visible');
      const numEl = tile.querySelector('[data-count]');
      if (!numEl) return;
      const target = parseInt(numEl.dataset.count, 10);
      const suffix = numEl.dataset.suffix || '';
      const dur    = 1400;
      const start  = performance.now();
      const tick = now => {
        const p     = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        numEl.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      statObserver.unobserve(tile);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-tile').forEach(t => statObserver.observe(t));

  /* ── Section heading underline reveal ── */
  const h2Observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.3 });
  document.querySelectorAll('.section-head, .why-content, .cat-header').forEach(el => h2Observer.observe(el));

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      }
    });
  });

  /* ── Popup logic ── */
  initPopup();

  /* ── Contact form ── */
  initContactForm();

});

/* ═══════════════ POPUP ═══════════════ */
function initPopup() {
  const overlay = document.getElementById('popupOverlay');
  if (!overlay) return;

  // Check cooldown
  const lastSeen = localStorage.getItem(POPUP_STORAGE_KEY);
  if (lastSeen && Date.now() - parseInt(lastSeen) < POPUP_COOLDOWN_MS) return;

  let triggered = false;

  function openPopup() {
    if (triggered) return;
    triggered = true;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
  }

  // Trigger: 9s delay
  const timer = setTimeout(openPopup, 9000);

  // Trigger: 50% scroll depth
  const scrollHandler = () => {
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (scrolled >= 0.5) {
      clearTimeout(timer);
      openPopup();
      window.removeEventListener('scroll', scrollHandler);
    }
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  // Close button
  document.getElementById('popupClose')?.addEventListener('click', closePopup);

  // Skip / No thanks
  document.getElementById('popupSkip')?.addEventListener('click', closePopup);

  // Close on overlay click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePopup();
  });

  // Close on Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closePopup();
  });

  // Popup form submit
  const popupForm = document.getElementById('popupForm');
  if (popupForm) {
    popupForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = popupForm.querySelector('.popup-submit');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending…';
      btn.disabled = true;

      try {
        const res = await fetch(POPUP_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(popupForm),
        });
        if (res.ok) {
          popupForm.style.display = 'none';
          document.getElementById('popupSkip').style.display = 'none';
          document.getElementById('popupSuccess').style.display = 'block';
          localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
        } else {
          throw new Error('Submission failed');
        }
      } catch {
        btn.innerHTML = 'Claim My 10% Off';
        btn.disabled = false;
      }
    });
  }
}

/* ═══════════════ CONTACT FORM ═══════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      } else {
        const data = await res.json();
        throw new Error(data?.errors?.map(er => er.message).join(', ') || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      btn.innerHTML = orig;
      btn.disabled = false;
      showFormError('Something went wrong — please call or text (224) 985-9327.');
    }
  });

  function showFormError(msg) {
    let el = form.querySelector('.form-error');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-error';
      el.style.cssText = 'color:#D14B3D;font-size:.875rem;margin-top:.75rem;font-weight:500;';
      form.appendChild(el);
    }
    el.textContent = msg;
  }
}
