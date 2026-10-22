/* ═══════════════════════════════════════════════
   FORM ENDPOINTS — Formspree
   ─────────────────────────────────────────────
   1. Go to formspree.io → create TWO forms:
      • "ClearSide Contact Form" → use clearsidexteriors@gmail.com
      • "ClearSide Popup / Email Capture" → same email
   2. For each, copy the form ID (e.g. xpzgkwqr)
   3. Replace the placeholders below
   4. Leads also go to Flyra through /api/lead (Netlify Function),
      which needs FLYRA_API_KEY set in Netlify environment variables
═══════════════════════════════════════════════ */
const CONTACT_ENDPOINT = 'https://formspree.io/f/xwvzwovg';
const POPUP_ENDPOINT   = 'https://formspree.io/f/xwvzwovg';
// Netlify Function that creates the lead in Flyra (netlify/functions/lead.mjs)
const FLYRA_LEAD_ENDPOINT = '/api/lead';

// Best effort: a Flyra failure never blocks the Formspree submission.
function sendLeadToFlyra(form) {
  return fetch(FLYRA_LEAD_ENDPOINT, {
    method: 'POST',
    body: new FormData(form),
    keepalive: true,
  }).catch(err => console.error('Flyra lead failed', err));
}

/* ═══════════════════════════════════════════════
   ANALYTICS — Google Analytics 4
   Paste the GA4 Measurement ID (looks like G-XXXXXXXXXX) below.
   Until it is set, nothing is loaded. Phone taps, text taps and form
   submissions are sent as events either way once it is set.
═══════════════════════════════════════════════ */
const GA_MEASUREMENT_ID = '';

// New-customer discount shown in the popup. Keep in sync with
// DISCOUNT_CODE in netlify/functions/lead.mjs (the email copy).
const DISCOUNT_CODE = 'CLEARSIDE10';

const ATTRIBUTION_KEY = 'cs_attribution';

function loadAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);
}

function track(event, params) {
  if (window.gtag) gtag('event', event, params || {});
}

// Remembers where the visitor first came from (ad, Google, Facebook, etc.)
// so it can be attached to their lead in Flyra and the Formspree email.
function getAttribution() {
  let stored = null;
  try { stored = localStorage.getItem(ATTRIBUTION_KEY); } catch {}
  if (stored) return stored;

  const params = new URLSearchParams(window.location.search);
  const parts = [];
  ['utm_source', 'utm_medium', 'utm_campaign'].forEach(k => {
    if (params.get(k)) parts.push(`${k.replace('utm_', '')}=${params.get(k)}`);
  });
  if (params.get('gclid')) parts.push('google ads click');
  if (params.get('fbclid')) parts.push('facebook click');
  if (!parts.length) {
    let ref = '';
    try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch {}
    parts.push(ref && ref !== window.location.hostname ? `referrer=${ref}` : 'direct');
  }
  parts.push(`landing=${window.location.pathname}`);
  const value = parts.join(', ');
  try { localStorage.setItem(ATTRIBUTION_KEY, value); } catch {}
  return value;
}

const POPUP_STORAGE_KEY  = 'cs_popup_seen';
const POPUP_COOLDOWN_MS  = 7 * 24 * 60 * 60 * 1000; // 7 days

loadAnalytics();
const attribution = getAttribution();

document.addEventListener('DOMContentLoaded', () => {

  /* ── Lead source on every form ── */
  document.querySelectorAll('form').forEach(form => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'attribution';
    input.value = attribution;
    form.appendChild(input);
  });

  /* ── Call / text tap tracking ── */
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="tel:"], a[href^="sms:"]');
    if (!link) return;
    track(link.href.startsWith('tel:') ? 'phone_call_click' : 'text_click', { link_location: window.location.pathname });
  });

  /* ── Footer year ── */
  document.querySelectorAll('.js-year').forEach(el => { el.textContent = new Date().getFullYear(); });

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

  /* ── Expandable service cards (services page) ── */
  document.querySelectorAll('.ec').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      card.classList.toggle('open');
    });
  });

  /* ── Expandable service cards (homepage) ── */
  document.querySelectorAll('.svc-card').forEach(card => {
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
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
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

  /* ── Before/after photo transition ── */
  initBeforeAfter();

  /* ── Popup logic ── */
  initPopup();

  /* ── Contact form ── */
  initContactForm();

});

/* ═══════════════ BEFORE/AFTER ═══════════════ */
function initBeforeAfter() {
  var container = document.querySelector('.why-photo');
  var before    = document.querySelector('.ba-before');
  var badge     = document.getElementById('baBadge');
  if (!container || !before || !badge) return;

  var timer = null;

  function reset() {
    clearTimeout(timer);
    before.classList.remove('faded');
    badge.textContent = 'BEFORE';
  }

  function play() {
    reset();
    timer = setTimeout(function() {
      before.classList.add('faded');
      badge.textContent = 'AFTER';
    }, 2000);
  }

  new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        play();
      } else {
        reset();
      }
    });
  }, { threshold: 0.1 }).observe(container);
}

/* ═══════════════ POPUP ═══════════════ */
function initPopup() {
  const overlay = document.getElementById('popupOverlay');
  if (!overlay) return;

  // Check cooldown
  let lastSeen = null;
  try { lastSeen = localStorage.getItem(POPUP_STORAGE_KEY); } catch {}
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
    try { localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString()); } catch {}
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

  // Popup form submit: the code is revealed on screen as soon as the lead
  // is saved (Flyra or Formspree), and /api/lead also emails a copy.
  const popupForm = document.getElementById('popupForm');
  if (popupForm) {
    const errorEl = document.getElementById('popupError');
    const btnLabel = '<i class="fas fa-tag"></i> Claim My 10% Off';

    function showPopupError(msg) {
      errorEl.textContent = msg;
      errorEl.hidden = false;
    }

    popupForm.addEventListener('submit', async e => {
      e.preventDefault();
      errorEl.hidden = true;
      const emailInput = popupForm.querySelector('input[name="email"]');
      if (!emailInput.value.trim() || !emailInput.checkValidity()) {
        showPopupError('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      const btn = popupForm.querySelector('.popup-submit');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending…';
      btn.disabled = true;

      const post = url => fetch(url, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(popupForm),
      }).then(res => { if (!res.ok) throw new Error(`${url} ${res.status}`); return res; });

      const results = await Promise.allSettled([post(FLYRA_LEAD_ENDPOINT), post(POPUP_ENDPOINT)]);
      results.filter(r => r.status === 'rejected').forEach(r => console.error('Popup submission failed', r.reason));

      if (results.some(r => r.status === 'fulfilled')) {
        document.getElementById('popupCode').textContent = DISCOUNT_CODE;
        popupForm.style.display = 'none';
        document.getElementById('popupSkip').style.display = 'none';
        document.getElementById('popupSuccess').style.display = 'block';
        try { localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString()); } catch {}
        track('generate_lead', { form: 'popup' });
      } else {
        btn.innerHTML = btnLabel;
        btn.disabled = false;
        showPopupError("Sorry, that didn't go through. Please try again, or text (224) 985-9327 and we'll send your code.");
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
      sendLeadToFlyra(form);
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        track('generate_lead', { form: 'contact' });
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
