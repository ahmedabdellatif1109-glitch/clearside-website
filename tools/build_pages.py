"""Generates the service pages, town pages, FAQ page and sitemap, and keeps the
shared head links, header and footer identical on every page.

Run from anywhere:  python3 tools/build_pages.py
Content lives in tools/site_data.py. Hand-written pages (index, services, about,
contact) only have the blocks between <!-- shared:... --> markers rewritten.
"""
import html
import json
import math
import os
import re
from datetime import date

from PIL import Image

import site_data as D

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HAND_PAGES = ['index.html', 'services.html', 'about.html', 'contact.html']
TODAY = date.today().isoformat()
QUOTE = 'contact.html#quote'
SMS = 'sms:' + D.PHONE_E164


def esc(s):
    return html.escape(s, quote=True)


def town_key(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower().replace('mt.', 'mount')).strip('-')


def town_slug(name):
    """The town's hub page, e.g. wilmette-il.html."""
    return town_key(name) + '-il.html'


def nearest_towns(name, n=3):
    """The n closest towns we serve, by distance between town centres."""
    lat, lon = D.TOWN_CENTERS[name]
    def miles(t):
        la, lo = D.TOWN_CENTERS[t['name']]
        return math.hypot((la - lat) * 69.0, (lo - lon) * 69.0 * math.cos(math.radians(lat)))
    return sorted((t for t in D.TOWNS if t['name'] != name), key=miles)[:n]


def sorted_towns():
    """Towns where we've done the most work first, then alphabetical."""
    return sorted(D.TOWNS, key=lambda x: (-D.CUSTOMER_COUNTS.get(x['name'], 0), x['name']))


def service_file(svc):
    return svc['slug'] + '.html'


def is_local(svc):
    return svc['slug'] in D.LOCAL_SERVICES


def town_service_file(town_name, svc):
    """A town + service page such as wilmette-window-cleaning.html, or the
    town hub for services that don't get their own town pages."""
    return f"{town_key(town_name)}-{svc['slug']}.html" if is_local(svc) else town_slug(town_name)


def city(name):
    return name.replace('Mt.', 'Mount') + ', IL'


def photo(name, alt, sizes='(max-width: 768px) 100vw, 50vw', lazy=True, cls=''):
    path = f'assets/photos/{name}.jpg'
    w, h = Image.open(os.path.join(ROOT, path)).size
    return (f'<img src="assets/photos/{name}-sm.jpg" srcset="assets/photos/{name}-sm.jpg 800w, {path} {w}w" '
            f'sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}"'
            + (' loading="lazy"' if lazy else '') + ' decoding="async"' + (f' class="{cls}"' if cls else '') + '>')


# ── Shared blocks ─────────────────────────────────────────────

SHARED_HEAD = f'''  <meta name="theme-color" content="#1A2332">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <meta property="og:site_name" content="ClearSide Exteriors">
  <meta property="og:image" content="{D.SITE_URL}/assets/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="{D.SITE_URL}/assets/og-image.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="colors_and_type.css">
  <link rel="stylesheet" href="site.css">
  <script src="site.js" defer></script>'''

SHARED_NAV = f'''<nav class="site-nav">
  <a class="announce-bar" href="{QUOTE}" aria-label="Get a free quote: fully licensed and insured, rated 5.0 stars on Google, free estimates">
    <span class="announce-msg is-active"><i class="fas fa-shield-halved"></i> Fully Licensed &amp; Insured</span>
    <span class="announce-msg"><i class="fas fa-star"></i> Rated 5.0 Stars on Google</span>
    <span class="announce-msg"><i class="fas fa-tag"></i> Free Estimates</span>
    <span class="announce-cta">Get a quote <i class="fas fa-arrow-right"></i></span>
  </a>
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="assets/logo/clearside-full-transparent-sm.png" alt="ClearSide Exteriors logo" width="300" height="113">
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="areas.html">Areas</a></li>
      <li><a href="services.html#pricing">Pricing</a></li>
      <li><a href="faq.html">FAQ</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-right">
      <a href="tel:{D.PHONE_E164}" class="nav-phone"><i class="fas fa-phone"></i> {D.PHONE_DISPLAY}</a>
      <a href="{QUOTE}" class="btn btn-primary btn-sm nav-cta">Get a Free Quote</a>
    </div>
    <div class="nav-mobile-actions">
      <a href="tel:{D.PHONE_E164}" class="nav-icon-btn" aria-label="Call {D.PHONE_DISPLAY}"><i class="fas fa-phone"></i></a>
      <a href="{SMS}" class="nav-icon-btn" aria-label="Text {D.PHONE_DISPLAY}"><i class="fas fa-comment-sms"></i></a>
      <button class="hamburger" aria-label="Toggle menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</nav>
<div class="mobile-menu">
  <a href="index.html">Home</a>
  <a href="services.html">Services</a>
  <a href="areas.html">Service Areas</a>
  <a href="services.html#pricing">Pricing</a>
  <a href="faq.html">FAQ</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
  <a href="tel:{D.PHONE_E164}"><i class="fas fa-phone"></i> Call {D.PHONE_DISPLAY}</a>
  <a href="{SMS}"><i class="fas fa-comment-sms"></i> Text {D.PHONE_DISPLAY}</a>
  <a href="{QUOTE}" class="btn btn-primary">Get a Free Quote</a>
</div>'''


def shared_footer():
    socials = [(D.GOOGLE_PROFILE, 'Google reviews', 'fa-google'),
               (D.FACEBOOK_PROFILE, 'Facebook', 'fa-facebook-f'),
               (D.INSTAGRAM_PROFILE, 'Instagram', 'fa-instagram')]
    social_html = '\n'.join(
        f'          <a href="{u}" class="social-link" aria-label="{l}" target="_blank" rel="noopener"><i class="fab {i}"></i></a>'
        for u, l, i in socials if u)
    svc_links = '\n'.join(f'          <li><a href="{service_file(s)}">{s["name"]}</a></li>' for s in D.SERVICES)
    footer_towns = sorted_towns()[:D.FOOTER_TOWN_COUNT]
    town_links = '\n'.join(f'          <li><a href="{town_slug(t["name"])}">{t["name"]}</a></li>' for t in footer_towns)
    town_links += f'\n          <li class="footer-all-areas"><a href="areas.html">All {len(D.TOWNS)} areas <i class="fas fa-arrow-right"></i></a></li>'
    return f'''<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/logo/clearside-full-transparent-sm.png" alt="ClearSide Exteriors" width="300" height="113" loading="lazy">
        <p>Professional exterior cleaning for Glenview and greater Cook County. Student-owned, community-driven, spotless results.</p>
        <p class="footer-licensed"><i class="fas fa-shield-halved"></i> Licensed &amp; Insured</p>
        <div class="footer-socials">
{social_html}
        </div>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
{svc_links}
          <li><a href="services.html#pricing">Pricing</a></li>
          <li><a href="faq.html">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Areas We Serve</h4>
        <ul class="footer-areas">
{town_links}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Us</h4>
        <div class="footer-contact-row"><i class="fas fa-phone"></i><a href="tel:{D.PHONE_E164}">Call {D.PHONE_DISPLAY}</a></div>
        <div class="footer-contact-row"><i class="fas fa-comment-sms"></i><a href="{SMS}">Text {D.PHONE_DISPLAY}</a></div>
        <div class="footer-contact-row"><i class="fas fa-envelope"></i><a href="mailto:{D.EMAIL}">{D.EMAIL}</a></div>
        <div class="footer-contact-row"><i class="fas fa-map-marker-alt"></i><span>Glenview, IL &amp; Cook County</span></div>
        <a href="{QUOTE}" class="btn btn-primary btn-sm footer-quote">Get a Free Quote</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span class="js-year">{date.today().year}</span> ClearSide Exteriors, LLC. All rights reserved.</p>
      <p>Student-owned &amp; operated &middot; Licensed &amp; insured &middot; Glenview, IL</p>
    </div>
  </div>
</footer>

<div class="mobile-cta-bar">
  <a href="tel:{D.PHONE_E164}"><i class="fas fa-phone"></i> Call</a>
  <a href="{SMS}"><i class="fas fa-comment-sms"></i> Text</a>
  <a href="{QUOTE}" class="mcb-quote"><i class="fas fa-comments-dollar"></i> Free Quote</a>
</div>'''


def business_schema():
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': D.SITE_URL + '/#business',
        'name': 'ClearSide Exteriors',
        'legalName': 'ClearSide Exteriors, LLC',
        'description': 'Professional window cleaning, pressure washing, screen cleaning, and gutter cleaning '
                       'serving Glenview IL and the North Shore. Licensed and insured.',
        'url': D.SITE_URL + '/',
        'logo': D.SITE_URL + '/assets/logo/clearside-logo.png',
        'image': D.SITE_URL + '/assets/og-image.jpg',
        'telephone': D.PHONE_E164,
        'email': D.EMAIL,
        'priceRange': '$$',
        'address': {'@type': 'PostalAddress', 'addressLocality': 'Glenview', 'addressRegion': 'IL',
                    'postalCode': '60025', 'addressCountry': 'US'},
        'geo': {'@type': 'GeoCoordinates', 'latitude': 42.0797, 'longitude': -87.8028},
        'areaServed': [{'@type': 'City', 'name': t['name'].replace('Mt.', 'Mount') + ', IL'} for t in D.TOWNS],
        'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'opens': '07:00', 'closes': '19:00'},
        'sameAs': [u for u in (D.GOOGLE_PROFILE, D.FACEBOOK_PROFILE, D.INSTAGRAM_PROFILE) if u],
        'makesOffer': [{'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': s['name'],
                                                          'url': D.SITE_URL + '/' + service_file(s)}}
                       for s in D.SERVICES],
    }


def jsonld(obj):
    return ('  <script type="application/ld+json">\n'
            + json.dumps(obj, indent=2, ensure_ascii=False).replace('</', '<\\/')
            + '\n  </script>')


def breadcrumb_schema(items):
    return {'@context': 'https://schema.org', '@type': 'BreadcrumbList',
            'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': D.SITE_URL + '/' + u}
                                for i, (n, u) in enumerate(items)]}


def faq_schema(faqs):
    return {'@context': 'https://schema.org', '@type': 'FAQPage',
            'mainEntity': [{'@type': 'Question', 'name': q,
                            'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in faqs]}


def faq_html(faqs):
    items = '\n'.join(f'''      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">{esc(q)}<i class="fas fa-chevron-down"></i></button>
        <div class="faq-a"><p>{esc(a)}</p></div>
      </div>''' for q, a in faqs)
    return f'    <div class="faq-list">\n{items}\n    </div>'


def hero_buttons():
    return f'''    <div class="hero-btns page-hero-btns">
      <a href="{QUOTE}" class="btn btn-primary"><i class="fas fa-comments-dollar"></i> Get a Free Quote</a>
      <a href="tel:{D.PHONE_E164}" class="btn btn-outline-white"><i class="fas fa-phone"></i> Call</a>
      <a href="{SMS}" class="btn btn-outline-white"><i class="fas fa-comment-sms"></i> Text</a>
    </div>'''


def cta_banner(heading='Get Your Free Estimate Today'):
    return f'''<section class="cta-banner">
  <div class="container">
    <span class="eyebrow" style="color:rgba(255,255,255,.5);">Ready to Get Started?</span>
    <h2>{heading}</h2>
    <p>Call, text, or fill out our form. We'll get back to you fast with a no-obligation quote.</p>
    <div class="cta-btns">
      <a href="{QUOTE}" class="btn btn-primary"><i class="fas fa-comments-dollar"></i> Request a Quote</a>
      <a href="tel:{D.PHONE_E164}" class="btn btn-outline-white"><i class="fas fa-phone"></i> {D.PHONE_DISPLAY}</a>
      <a href="{SMS}" class="btn btn-outline-white"><i class="fas fa-comment-sms"></i> Text Us</a>
    </div>
  </div>
</section>'''


REVIEWS = [('Oliver Valdes', 'They were great. Very professional and efficient! Our windows are spotless.'),
           ('David Petitti', 'These guys came, did a great job, and made it as easy as possible for us.'),
           ('Ryan Hammer', 'Great company to work with. Very informative and professional to deal with.')]


def reviews_section():
    cards = '\n'.join(f'''      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p class="review-text">"{esc(t)}"</p>
        <div class="reviewer">
          <div class="reviewer-avatar">{n[0]}</div>
          <div>
            <div class="reviewer-name">{esc(n)}</div>
            <div class="reviewer-loc">Google Review</div>
          </div>
        </div>
      </div>''' for n, t in REVIEWS)
    # With an Elfsight widget ID set, the live Google reviews replace the fixed cards
    if D.ELFSIGHT_APP_ID:
        reviews = (f'    <div class="elfsight-app-{D.ELFSIGHT_APP_ID} reviews-widget" data-elfsight-app-lazy></div>\n'
                   '    <script src="https://elfsightcdn.com/platform.js" async></script>')
    else:
        reviews = f'    <div class="reviews-grid">\n{cards}\n    </div>'
    return f'''<section class="bg-white">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">What Customers Say</span>
      <h2>Trusted by North Shore Homeowners</h2>
    </div>
{reviews}
    <p class="reviews-more"><a href="{D.GOOGLE_PROFILE}" target="_blank" rel="noopener">Read all our reviews on Google <i class="fas fa-arrow-right"></i></a></p>
  </div>
</section>'''


def page(path, title, desc, schemas, body):
    head_schema = '\n'.join(jsonld(s) for s in schemas)
    doc = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Generated by tools/build_pages.py from tools/site_data.py. Edit those, not this file. -->
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <link rel="canonical" href="{D.SITE_URL}/{path}">
  <meta name="geo.region" content="US-IL">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:url" content="{D.SITE_URL}/{path}">
<!-- shared:head -->
<!-- /shared:head -->
{head_schema}
</head>
<body>

<!-- shared:nav -->
<!-- /shared:nav -->

{body}

<!-- shared:footer -->
<!-- /shared:footer -->
</body>
</html>
'''
    with open(os.path.join(ROOT, path), 'w') as f:
        f.write(doc)


# ── On-page quote form ────────────────────────────────────────

FORM_SERVICE_VALUE = {'window-cleaning': 'res-exterior-windows', 'screen-cleaning': 'res-screen-cleaning',
                      'pressure-washing': 'res-pressure-washing', 'gutter-cleaning': 'res-gutter-cleaning',
                      'commercial-window-cleaning': 'com-window-cleaning'}
FORM_OPTIONS = [('Residential', [('res-exterior-windows', 'Exterior Window Cleaning'),
                                 ('res-interior-windows', 'Interior Window Cleaning'),
                                 ('res-screen-cleaning', 'Screen Cleaning'),
                                 ('res-pressure-washing', 'Pressure Washing'),
                                 ('res-gutter-cleaning', 'Gutter Cleaning')]),
                ('Commercial', [('com-window-cleaning', 'Commercial Window Cleaning'),
                                ('com-pressure-washing', 'Commercial Pressure Washing')]),
                (None, [('service-plan', 'Recurring Service Plan'), ('multiple', 'Multiple Services / Not Sure')])]


def quote_section(town_name=None, svc=None):
    """The contact-page quote form, pre-filled for this page's town and service."""
    chosen = FORM_SERVICE_VALUE.get(svc['slug']) if svc else None
    def opt(v, label):
        return f'<option value="{v}"{" selected" if v == chosen else ""}>{label}</option>'
    groups = []
    for group, opts in FORM_OPTIONS:
        inner = ''.join(opt(v, l) for v, l in opts)
        groups.append(f'<optgroup label="{group}">{inner}</optgroup>' if group else inner)
    placeholder = f'<option value="" disabled{"" if chosen else " selected"}>Select a service…</option>'
    what = (f'{town_name} {svc["name"]}' if town_name and svc else town_name or (svc['name'] if svc else ''))
    heading = f'Get Your Free {town_name} Quote' if town_name else f'Get Your Free {svc["name"]} Quote'
    addr = f'123 Main St, {town_name}, IL' if town_name else '123 Main St, Glenview, IL'
    return f"""<section class="bg-paper quote-section">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <span class="eyebrow">Free Estimate</span>
        <h2>{heading}</h2>
        <p>Tell us a little about your property and we'll text or call you back with an exact price, usually within a few hours. No pressure, no obligation.</p>
        <ul class="check-list">
          <li><i class="fas fa-circle-check"></i> Free, exact quote before any work starts</li>
          <li><i class="fas fa-circle-check"></i> Licensed &amp; insured</li>
          <li><i class="fas fa-circle-check"></i> {guarantee(svc)[2].capitalize()}</li>
          <li><i class="fas fa-circle-check"></i> New customers get 10% off their first cleaning</li>
        </ul>
        <p class="form-sms-note"><i class="fas fa-comment-sms"></i> Prefer your phone? <a href="tel:{D.PHONE_E164}">Call</a> or <a href="{SMS}">text</a> {D.PHONE_DISPLAY}.</p>
      </div>
      <div class="form-card" id="quote">
        <h3>Request Your Quote</h3>
        <p>Fields marked * are required.</p>
        <form id="contactForm" novalidate>
          <input type="hidden" name="_subject" value="New Lead — {esc(what)} page">
          <input type="hidden" name="source" value="page-form">
          <input type="hidden" name="page" value="{esc(what)}">
          <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input type="text" id="firstName" name="firstName" placeholder="Jane" required autocomplete="given-name">
            </div>
            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input type="text" id="lastName" name="lastName" placeholder="Smith" required autocomplete="family-name">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="phone">Phone / Text *</label>
              <input type="tel" id="phone" name="phone" placeholder="(224) 555-0000" required autocomplete="tel">
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="jane@email.com" autocomplete="email">
            </div>
          </div>
          <div class="form-group">
            <label for="service">Service Interested In *</label>
            <select id="service" name="service" required>{placeholder}{''.join(groups)}</select>
          </div>
          <div class="form-group">
            <label for="address">Property Address *</label>
            <input type="text" id="address" name="address" placeholder="{esc(addr)}" required autocomplete="street-address">
          </div>
          <div class="form-group">
            <label for="message">Details / Questions</label>
            <textarea id="message" name="message" placeholder="Number of stories, windows, anything we should know…"></textarea>
          </div>
          <button type="submit" class="btn btn-primary form-submit">
            <i class="fas fa-paper-plane"></i> Send My Request
          </button>
        </form>
        <div id="formSuccess">
          <i class="fas fa-circle-check" style="font-size:3rem;color:#22c55e;display:block;margin:0 auto 1rem;"></i>
          <h3>Request Received!</h3>
          <p>Thanks! We'll get back to you with a quote as soon as possible, usually within a few hours.</p>
          <p style="margin-top:var(--space-4);font-size:var(--fs-15);">Need us sooner? Call or text <a href="tel:{D.PHONE_E164}" style="color:var(--sky-700);font-weight:700;border-bottom:none;">{D.PHONE_DISPLAY}</a>.</p>
        </div>
      </div>
    </div>
  </div>
</section>"""


# ── Service pages ─────────────────────────────────────────────

def build_service(svc):
    path = service_file(svc)
    price_rows = '\n'.join(f'          <li><span>{esc(n)}</span><strong>{esc(p)}</strong></li>' for n, p in svc['prices'])
    included = '\n'.join(f'          <li><i class="fas fa-circle-check"></i> {esc(i)}</li>' for i in svc['included'])
    towns = '\n'.join(f'      <a class="area-tag" href="{town_service_file(t["name"], svc)}">{t["name"]}</a>' for t in sorted_towns())
    others = '\n'.join(f'      <a class="svc-mini" href="{service_file(s)}"><i class="fas {s["icon"]}"></i> {s["name"]}</a>'
                       for s in D.SERVICES if s is not svc)
    body = f'''<section class="page-hero">
  <div class="container">
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <i class="fas fa-chevron-right"></i>
      <a href="services.html">Services</a>
      <i class="fas fa-chevron-right"></i>
      <span>{svc['name']}</span>
    </div>
    <h1>{svc['name']} in Glenview &amp; the North Shore</h1>
    <p>{esc(svc['lede'].format(town='Glenview and the North Shore') if 'lede' in svc else svc['short'])} Licensed, insured and {guarantee(svc)[3]} guaranteed.</p>
{hero_buttons()}
  </div>
</section>

<section class="bg-white">
  <div class="container">
    <div class="detail-grid">
      <div class="detail-content">
        <span class="eyebrow">How We Do It</span>
        <h2>What's Included</h2>
        <p>{esc(svc['intro'])}</p>
        <ul class="check-list">
{included}
        </ul>
        <div class="price-box">
          <h3><i class="fas fa-tag"></i> Pricing</h3>
          <ul>
{price_rows}
          </ul>
          <p>Every home is different, so we always give you an exact, free quote before any work starts. New customers get 10% off their first cleaning.</p>
          <a href="{QUOTE}" class="btn btn-primary btn-sm">Get My Exact Price <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
      <div class="detail-photos">
        {photo(svc['photo'], svc['photo_alt'], lazy=False)}
        {photo(svc['photo2'], svc['photo2_alt'])}
      </div>
    </div>
  </div>
</section>

{service_work_section(svc)}

<section class="bg-paper">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Questions</span>
      <h2>{svc['name']} FAQ</h2>
    </div>
{faq_html(svc['faqs'])}
    <p class="faq-more">More answers on our <a href="faq.html">FAQ page</a>.</p>
  </div>
</section>

<section class="bg-white">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Where We Work</span>
      <h2>{svc['name']} Near You</h2>
      <p>Pick your town to see how we serve it.</p>
    </div>
    <div class="area-grid">
{towns}
    </div>
    <div class="svc-mini-row">
{others}
    </div>
  </div>
</section>

{quote_section(svc=svc)}'''
    service_schema = {
        '@context': 'https://schema.org', '@type': 'Service',
        'name': svc['name'], 'serviceType': svc['name'], 'description': svc['intro'],
        'url': D.SITE_URL + '/' + path,
        'provider': {'@id': D.SITE_URL + '/#business'},
        'areaServed': [{'@type': 'City', 'name': t['name'].replace('Mt.', 'Mount') + ', IL'} for t in D.TOWNS],
    }
    if svc['from']:
        service_schema['offers'] = {'@type': 'Offer', 'priceCurrency': 'USD',
                                    'priceSpecification': {'@type': 'PriceSpecification', 'minPrice': svc['from'],
                                                           'priceCurrency': 'USD'}}
    page(path,
         f"North Shore {svc['name']} | ClearSide Exteriors",
         f"{svc['short']} Glenview & the North Shore. Licensed & insured. Call {D.PHONE_DISPLAY}.",
         [service_schema, faq_schema(svc['faqs']),
          breadcrumb_schema([('Home', ''), ('Services', 'services.html'), (svc['name'], path)])],
         body)
    return path


# ── Real job photos and videos ────────────────────────────────

def job_img(name, alt):
    w, h = Image.open(os.path.join(ROOT, 'assets/jobs', name)).size
    return (f'<img src="assets/jobs/{name}" width="{w}" height="{h}" alt="{esc(alt)}" '
            'loading="lazy" decoding="async">')


def job_card(key):
    j = D.JOBS[key]
    where = j['town']
    if j['kind'] == 'pair':
        media = f'''<div class="ba-pair">
          <div class="ba-half">{job_img(j['before'], j['caption'] + ' before, ' + where)}<span class="ba-tag">Before</span></div>
          <div class="ba-half">{job_img(j['after'], j['caption'] + ' after, ' + where)}<span class="ba-tag ba-tag-after">After</span></div>
        </div>'''
    elif j['kind'] == 'video':
        w, h = Image.open(os.path.join(ROOT, 'assets/jobs', j['poster'])).size
        media = (f'<div class="job-media"><video class="lazy-video" '
                 f'poster="assets/jobs/{j["poster"]}" width="{w}" height="{h}" muted loop playsinline preload="none" '
                 f'aria-label="{esc(j["caption"])} in {esc(where)}">'
                 f'<source data-src="assets/jobs/{j["src"].replace(".mp4", ".webm")}" type="video/webm">'
                 f'<source data-src="assets/jobs/{j["src"]}" type="video/mp4"></video></div>')
    else:
        media = f'<div class="job-media">{job_img(j["src"], j["caption"] + ", " + where)}</div>'
    return f'''      <figure class="job-card">
        {media}
        <figcaption><strong>{esc(j['caption'])}</strong><span><i class="fas fa-map-marker-alt"></i> {esc(where)}</span></figcaption>
      </figure>'''


def _rotation():
    """Two jobs per town without its own, cycling so neighbors differ."""
    pool = list(D.JOBS)
    others = [t['name'] for t in sorted_towns() if t['name'] not in D.TOWN_JOBS]
    return {name: [pool[(2 * i) % len(pool)], pool[(2 * i + 1) % len(pool)]] for i, name in enumerate(others)}


def jobs_for(town_name, svc=None, n=2):
    """Returns (job keys, whether they are the town's own work)."""
    own = D.TOWN_JOBS.get(town_name, [])
    if own:
        return own[:n], True
    keys = []
    if svc:
        match = [k for k, j in D.JOBS.items() if j['service'] == svc['slug']]
        if match:
            start = [t['name'] for t in sorted_towns()].index(town_name)
            keys = [match[(start + i) % len(match)] for i in range(min(n, len(match)))]
    for k in _rotation()[town_name]:
        if len(keys) >= n:
            break
        if k not in keys:
            keys.append(k)
    return keys, False


def work_section(eyebrow, heading, keys, bg='bg-white'):
    cards = '\n'.join(job_card(k) for k in keys)
    return f'''<section class="{bg}">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">{eyebrow}</span>
      <h2>{heading}</h2>
    </div>
    <div class="job-grid">
{cards}
    </div>
  </div>
</section>'''


def town_work_section(name, svc=None):
    keys, own = jobs_for(name, svc)
    return work_section('Real Results', f'Recent Work in {name}' if own else f'Recent Work Near {name}', keys)


def service_work_section(svc):
    keys = [k for k, j in D.JOBS.items() if j['service'] == svc['slug']][:3]
    if not keys:
        return ''
    return work_section('Real Results', f'Recent {svc["name"]} Jobs', keys)


# ── Town pages ────────────────────────────────────────────────

def guarantee(svc=None):
    """Streak-free wording only where windows are the subject."""
    if svc and svc['slug'] == 'window-cleaning':
        return ('Streak-Free Guarantee', 'If you see a streak or anything we missed, we come back and fix it at no charge.',
                'Streak-free satisfaction guarantee', 'streak-free')
    return ('Satisfaction Guarantee', "If anything isn't right, we come back and fix it at no charge.",
            '100% satisfaction guarantee', 'satisfaction')


def town_trust_section(town, eyebrow, heading, near_html, button_html, svc=None):
    """Three trust cards plus a town info panel, shared by town pages."""
    cards = [('fa-shield-halved', 'Licensed &amp; Insured',
              'ClearSide Exteriors, LLC is fully licensed and insured, so you are covered on every job.'),
             ('fa-circle-check', guarantee(svc)[0], guarantee(svc)[1]),
             ('fa-graduation-cap', 'Student-Founded &amp; Local',
              f'Based in Glenview and serving the North Shore for {D.YEARS_IN_BUSINESS} years, '
              f'with {D.HOMES_SERVICED} homes serviced.')]
    card_html = '\n'.join(f'''      <div class="trust-card">
        <div class="trust-card-icon"><i class="fas {i}"></i></div>
        <h3>{h}</h3>
        <p>{p}</p>
      </div>''' for i, h, p in cards)
    name = town['name']
    return f'''<section class="bg-paper">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">{eyebrow}</span>
      <h2>{heading}</h2>
    </div>
    <div class="trust-cards">
{card_html}
    </div>
    <div class="town-panel">
      <div class="town-panel-title">
        <div class="trust-card-icon"><i class="fas fa-map-marker-alt"></i></div>
        <div><h3>{name}, IL</h3><p>{near_html}</p></div>
      </div>
      <dl class="town-facts">
        <div><dt>County</dt><dd>{town['county']}</dd></div>
        <div><dt>Response</dt><dd>Within a few hours</dd></div>
        <div><dt>Estimates</dt><dd>Always free</dd></div>
      </dl>
      {button_html}
    </div>
  </div>
</section>'''


def build_town(town):
    path = town_slug(town['name'])
    near_links = ', '.join(f'<a href="{town_slug(t["name"])}">{t["name"]}</a>' for t in nearest_towns(town['name']))
    near_links += ' <a href="areas.html">and more</a>'
    name = town['name']
    cards = '\n'.join(f'''      <a class="svc-link-card" href="{town_service_file(name, s) if is_local(s) else service_file(s)}">
        <div class="svc-icon"><i class="fas {s['icon']}"></i></div>
        <h3>{(name + ' ') if is_local(s) else ''}{s['name']}</h3>
        <p>{esc(s['short'])}</p>
        <span class="svc-price">{'From $' + str(s['from']) if s['from'] else 'Free quote'}</span>
      </a>''' for s in D.SERVICES)
    body = f'''<section class="page-hero">
  <div class="container">
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <i class="fas fa-chevron-right"></i>
      <a href="areas.html">Service Areas</a>
      <i class="fas fa-chevron-right"></i>
      <span>{name}</span>
    </div>
    <h1>Exterior Cleaning in {name}, IL</h1>
    <p>{esc(town['blurb'])}</p>
    <div class="service-picker">
      <span class="service-picker-label">What do you need in {name}?</span>
      <div class="service-picker-options">
{chr(10).join(f'        <a href="{town_service_file(name, s)}"><i class="fas {s["icon"]}"></i> {s["name"]} <i class="fas fa-arrow-right"></i></a>' for s in D.SERVICES if is_local(s))}
      </div>
    </div>
{hero_buttons()}
  </div>
</section>

<section class="bg-white">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Services in {name}</span>
      <h2>Everything Your {name} Home Needs</h2>
      <p>Looking for window cleaners in {name}? We serve all of {name} in {town['county']} with streak-free windows, spotless driveways and clear gutters. Free estimates, always.</p>
    </div>
    <div class="svc-link-grid">
{cards}
    </div>
  </div>
</section>

{town_work_section(name)}

{town_trust_section(town, f'Why {name} Chooses ClearSide', 'Your Neighbor, Not a Franchise', f'We also serve nearby {near_links}.', f'<a href="{QUOTE}" class="btn btn-primary">Get Your {name} Quote <i class="fas fa-arrow-right"></i></a>')}

{reviews_section()}

{quote_section(town_name=name)}'''
    page(path,
         f'{name}, IL Exterior Cleaning Services | ClearSide',
         f'Window cleaning, pressure washing and gutter cleaning in {name}, IL. Local, licensed & insured. '
         f'Free estimates: {D.PHONE_DISPLAY}.',
         [{'@context': 'https://schema.org', '@type': 'Service', 'name': f'Exterior Cleaning in {name}, IL',
           'serviceType': 'Window cleaning, pressure washing and gutter cleaning',
           'url': D.SITE_URL + '/' + path, 'provider': {'@id': D.SITE_URL + '/#business'},
           'areaServed': {'@type': 'City', 'name': name.replace('Mt.', 'Mount') + ', IL'}},
          breadcrumb_schema([('Home', ''), (name, path)])],
         body)
    return path


# ── Town + service pages ("Wilmette Window Cleaning") ─────────

def build_town_service(town, svc):
    name = town['name']
    path = town_service_file(name, svc)
    title = f"{name} {svc['name']}"
    near_links = ', '.join(f'<a href="{town_service_file(t["name"], svc)}">{t["name"]}</a>'
                           for t in nearest_towns(name))
    near_links += ' <a href="areas.html">and more</a>'
    price_rows = '\n'.join(f'          <li><span>{esc(n)}</span><strong>{esc(p)}</strong></li>' for n, p in svc['prices'])
    included = '\n'.join(f'          <li><i class="fas fa-circle-check"></i> {esc(i)}</li>' for i in svc['included'])
    others = '\n'.join(f'      <a class="svc-mini" href="{town_service_file(name, s) if is_local(s) else service_file(s)}">'
                       f'<i class="fas {s["icon"]}"></i> {(name + " ") if is_local(s) else ""}{s["name"]}</a>'
                       for s in D.SERVICES if s is not svc)
    faqs = [(f"Do you offer {svc['name'].lower()} in {name}?",
             f"Yes. We serve all of {name} in {town['county']}. {town['blurb']} "
             f"Call or text {D.PHONE_DISPLAY} or request a quote online, and we usually reply within a few hours.")] \
        + svc['faqs']
    body = f'''<section class="page-hero">
  <div class="container">
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <i class="fas fa-chevron-right"></i>
      <a href="{town_slug(name)}">{name}</a>
      <i class="fas fa-chevron-right"></i>
      <span>{svc['name']}</span>
    </div>
    <h1>{title}</h1>
    <p>{esc(svc['lede'].format(town=name))} Licensed, insured and {guarantee(svc)[3]} guaranteed.</p>
{hero_buttons()}
  </div>
</section>

<section class="bg-white">
  <div class="container">
    <div class="detail-grid">
      <div class="detail-content">
        <span class="eyebrow">{svc['name']} in {name}, IL</span>
        <h2>What's Included</h2>
        <p>{esc(svc['intro'])}</p>
        <ul class="check-list">
{included}
        </ul>
        <div class="price-box">
          <h3><i class="fas fa-tag"></i> {name} Pricing</h3>
          <ul>
{price_rows}
          </ul>
          <p>Every home is different, so we always give you an exact, free quote before any work starts. New customers get 10% off their first cleaning.</p>
          <a href="{QUOTE}" class="btn btn-primary btn-sm">Get My {name} Quote <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
      <div class="detail-photos">
        {photo(svc['photo'], svc['photo_alt'] + ' near ' + name + ', IL', lazy=False)}
        {photo(svc['photo2'], svc['photo2_alt'])}
      </div>
    </div>
  </div>
</section>

{town_work_section(name, svc)}

{town_trust_section(town, 'Local &amp; Trusted', f'Why {name} Homeowners Choose ClearSide', f'Also serving nearby: {near_links}.', f'<a href="{town_slug(name)}" class="btn btn-primary">All Services in {name} <i class="fas fa-arrow-right"></i></a>', svc)}

<section class="bg-white">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Questions</span>
      <h2>{title} FAQ</h2>
    </div>
{faq_html(faqs)}
    <div class="svc-mini-row">
{others}
    </div>
  </div>
</section>

{reviews_section()}

{quote_section(town_name=name, svc=svc)}'''
    service_schema = {
        '@context': 'https://schema.org', '@type': 'Service',
        'name': title, 'serviceType': svc['name'], 'description': svc['intro'],
        'url': D.SITE_URL + '/' + path,
        'provider': {'@id': D.SITE_URL + '/#business'},
        'areaServed': {'@type': 'City', 'name': city(name)},
    }
    if svc['from']:
        service_schema['offers'] = {'@type': 'Offer', 'priceCurrency': 'USD',
                                    'priceSpecification': {'@type': 'PriceSpecification', 'minPrice': svc['from'],
                                                           'priceCurrency': 'USD'}}
    from_text = f" From ${svc['from']}." if svc['from'] else ''
    page(path,
         f"{svc['name']} in {name}, IL | ClearSide",
         f"Looking for {svc['search']} in {name}, IL? Local, licensed & insured.{from_text} "
         f"Free estimates: {D.PHONE_DISPLAY}.",
         [service_schema, faq_schema(faqs),
          breadcrumb_schema([('Home', ''), (name, town_slug(name)), (svc['name'], path)])],
         body)
    return path


# ── Service areas page ────────────────────────────────────────

def town_map_html():
    """Interactive map of every town; site.js loads Leaflet when it scrolls into view."""
    towns = [{'name': x['name'], 'url': town_slug(x['name']), 'lat': D.TOWN_CENTERS[x['name']][0],
              'lon': D.TOWN_CENTERS[x['name']][1]} for x in sorted_towns()]
    return f'''    <div class="town-map-wrap">
      <div id="town-map" class="town-map" role="region" aria-label="Map of the towns we serve" data-towns="{esc(json.dumps(towns))}"></div>
      <p class="town-map-hint"><i class="fas fa-hand-pointer"></i> Tap a town to see its page</p>
    </div>'''


def build_areas():
    cards = '\n'.join(f'''      <div class="area-card">
        <a class="area-card-head" href="{town_slug(t['name'])}">
          <i class="fas fa-map-marker-alt"></i>
          <span><strong>{t['name']}</strong></span>
          <i class="fas fa-arrow-right area-card-arrow"></i>
        </a>
      </div>''' for t in sorted_towns())
    body = f'''<section class="page-hero">
  <div class="container">
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <i class="fas fa-chevron-right"></i>
      <span>Service Areas</span>
    </div>
    <h1>Window Cleaning &amp; Pressure Washing Service Areas</h1>
    <p>Window cleaning, pressure washing and gutter cleaning across the North Shore. Pick your town to see local services and prices.</p>
{hero_buttons()}
  </div>
</section>

<section class="bg-paper">
  <div class="container">
{town_map_html()}
    <div class="area-cards">
{cards}
    </div>
    <p class="faq-more">Don't see your town? <a href="{QUOTE}">Ask us</a> — we probably cover it.</p>
  </div>
</section>

{cta_banner()}'''
    page('areas.html', 'Service Areas | ClearSide Exteriors, Glenview IL',
         f'Window cleaning, pressure washing and gutter cleaning in {len(D.TOWNS)} North Shore and northwest suburban '
         'towns, from Glenview and Northbrook to Chicago. Find yours.',
         [breadcrumb_schema([('Home', ''), ('Service Areas', 'areas.html')])],
         body)
    return 'areas.html'


# ── FAQ page ──────────────────────────────────────────────────

def build_faq():
    groups = [('General', D.GENERAL_FAQS)] + [(s['name'], s['faqs']) for s in D.SERVICES]
    sections = '\n'.join(f'''    <h2 class="faq-group">{g}</h2>
{faq_html(f)}''' for g, f in groups)
    body = f'''<section class="page-hero">
  <div class="container">
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <i class="fas fa-chevron-right"></i>
      <span>FAQ</span>
    </div>
    <h1>Frequently Asked Questions</h1>
    <p>Pricing, scheduling, what's included and more. Don't see your question? Call or text {D.PHONE_DISPLAY}.</p>
{hero_buttons()}
  </div>
</section>

<section class="bg-paper">
  <div class="container faq-page">
{sections}
  </div>
</section>

{cta_banner()}'''
    all_faqs = [qa for _, f in groups for qa in f]
    page('faq.html', 'FAQ | Pricing & Questions | ClearSide Exteriors',
         'Answers about window cleaning, pressure washing and gutter cleaning prices, scheduling, insurance and our '
         'streak-free guarantee. ClearSide Exteriors, Glenview.',
         [faq_schema(all_faqs), breadcrumb_schema([('Home', ''), ('FAQ', 'faq.html')])],
         body)
    return 'faq.html'


# ── Shared-block injection, sitemap ───────────────────────────

def fill(text, name, content):
    pattern = re.compile(rf'<!-- shared:{name} -->.*?<!-- /shared:{name} -->', re.S)
    if not pattern.search(text):
        raise SystemExit(f'missing <!-- shared:{name} --> markers')
    return pattern.sub(lambda _: f'<!-- shared:{name} -->\n{content}\n<!-- /shared:{name} -->', text)


def fill_shared(path):
    full = os.path.join(ROOT, path)
    with open(full) as f:
        text = f.read()
    text = fill(text, 'head', SHARED_HEAD)
    text = fill(text, 'nav', SHARED_NAV)
    text = fill(text, 'footer', shared_footer())
    # Town buttons on hand-written pages always list every town we serve
    tags = '\n'.join(f'      <a class="area-tag" href="{town_slug(x["name"])}"><i class="fas fa-map-marker-alt"></i> '
                     f'{x["name"]} <i class="fas fa-chevron-right area-tag-arrow"></i></a>' for x in sorted_towns())
    text = re.sub(r'(<div class="area-grid">\n).*?(\n    </div>)', lambda m: m.group(1) + tags + m.group(2), text, flags=re.S)
    if '<!-- shared:townmap -->' in text:
        text = fill(text, 'townmap', town_map_html())
    if '<!-- shared:reviews -->' in text:
        text = fill(text, 'reviews', reviews_section())
    if 'id="quote"' in text:
        text = text.replace('href="contact.html#quote"', 'href="#quote"')
    if path == 'index.html':
        text = re.sub(r'(<script type="application/ld\+json" id="business-schema">\n).*?(\n  </script>)',
                      lambda m: m.group(1) + json.dumps(business_schema(), indent=2, ensure_ascii=False)
                      + m.group(2), text, flags=re.S)
    with open(full, 'w') as f:
        f.write(text)


def build_sitemap(paths):
    priority = {'index.html': '1.0', 'services.html': '0.9', 'contact.html': '0.9'}
    urls = '\n'.join(f'''  <url>
    <loc>{D.SITE_URL}/{'' if p == 'index.html' else p}</loc>
    <lastmod>{TODAY}</lastmod>
    <priority>{priority.get(p, '0.7')}</priority>
  </url>''' for p in paths)
    with open(os.path.join(ROOT, 'sitemap.xml'), 'w') as f:
        f.write(f'<?xml version="1.0" encoding="UTF-8"?>\n'
                f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n')


def main():
    generated = ([build_service(s) for s in D.SERVICES] + [build_town(t) for t in D.TOWNS]
                 + [build_town_service(t, s) for t in D.TOWNS for s in D.SERVICES if is_local(s)]
                 + [build_faq(), build_areas()])
    pages = HAND_PAGES + generated
    for p in pages:
        fill_shared(p)
    build_sitemap(pages)
    print(f'Built {len(generated)} pages and updated {len(pages)} pages + sitemap.xml')


if __name__ == '__main__':
    main()
