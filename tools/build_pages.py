"""Generates the service pages, town pages, FAQ page and sitemap, and keeps the
shared head links, header and footer identical on every page.

Run from anywhere:  python3 tools/build_pages.py
Content lives in tools/site_data.py. Hand-written pages (index, services, about,
contact) only have the blocks between <!-- shared:... --> markers rewritten.
"""
import html
import json
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

SHARED_HEAD = f'''  <meta name="theme-color" content="#40B0F8">
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
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="assets/logo/clearside-full-white-sm.png" alt="ClearSide Exteriors logo" width="300" height="113">
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
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
    town_links = '\n'.join(f'          <li><a href="{town_slug(t["name"])}">{t["name"]}</a></li>' for t in D.TOWNS)
    return f'''<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/logo/clearside-full-white-sm.png" alt="ClearSide Exteriors" width="300" height="113" loading="lazy">
        <p>Professional exterior cleaning for Glenview and greater Cook County. Student-owned, community-driven, streak-free results.</p>
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
    return f'''<section class="bg-white">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">What Customers Say</span>
      <h2>Trusted by North Shore Homeowners</h2>
    </div>
    <div class="reviews-grid">
{cards}
    </div>
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


# ── Service pages ─────────────────────────────────────────────

def build_service(svc):
    path = service_file(svc)
    price_rows = '\n'.join(f'          <li><span>{esc(n)}</span><strong>{esc(p)}</strong></li>' for n, p in svc['prices'])
    included = '\n'.join(f'          <li><i class="fas fa-circle-check"></i> {esc(i)}</li>' for i in svc['included'])
    towns = '\n'.join(f'      <a class="area-tag" href="{town_service_file(t["name"], svc)}">{t["name"]}</a>' for t in D.TOWNS)
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
    <p>{esc(svc['short'])} Licensed, insured and streak-free guaranteed.</p>
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

{cta_banner()}'''
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
         f"{svc['name']} Glenview IL & North Shore | ClearSide Exteriors",
         f"{svc['short']} Serving Glenview, Wilmette, Northbrook, Evanston and the North Shore. "
         f"Licensed & insured. Free estimates: {D.PHONE_DISPLAY}.",
         [service_schema, faq_schema(svc['faqs']),
          breadcrumb_schema([('Home', ''), ('Services', 'services.html'), (svc['name'], path)])],
         body)
    return path


# ── Town pages ────────────────────────────────────────────────

def build_town(town):
    path = town_slug(town['name'])
    by_name = {t['name']: t for t in D.TOWNS}
    near = [by_name[n] for n in town['near'] if n in by_name]
    near_links = ', '.join(f'<a href="{town_slug(t["name"])}">{t["name"]}</a>' for t in near)
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
      <a href="index.html#areas">Service Areas</a>
      <i class="fas fa-chevron-right"></i>
      <span>{name}</span>
    </div>
    <h1>{name} Exterior Cleaning: Windows, Pressure Washing &amp; Gutters</h1>
    <p>{esc(town['blurb'])}</p>
{hero_buttons()}
  </div>
</section>

<section class="bg-white">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Services in {name}</span>
      <h2>Everything Your {name} Home Needs</h2>
      <p>Looking for window cleaning in {name}? We serve {name} ({town['zips']}) in {town['county']} with streak-free windows, spotless driveways and clear gutters. Free estimates, always.</p>
    </div>
    <div class="svc-link-grid">
{cards}
    </div>
  </div>
</section>

<section class="bg-paper">
  <div class="container">
    <div class="why-grid">
      <div class="why-content">
        <span class="eyebrow">Why {name} Chooses ClearSide</span>
        <h2>Your Neighbor, Not a Franchise</h2>
        <div class="why-features">
          <div class="feature-row">
            <div class="feat-icon"><i class="fas fa-shield-halved"></i></div>
            <div class="feat-text"><h4>Licensed &amp; Insured</h4><p>ClearSide Exteriors, LLC is fully licensed and insured, so you are covered on every job.</p></div>
          </div>
          <div class="feature-row">
            <div class="feat-icon"><i class="fas fa-circle-check"></i></div>
            <div class="feat-text"><h4>Streak-Free Guarantee</h4><p>If you see a streak or anything we missed, we come back and fix it at no charge.</p></div>
          </div>
          <div class="feature-row">
            <div class="feat-icon"><i class="fas fa-graduation-cap"></i></div>
            <div class="feat-text"><h4>Student-Founded &amp; Local</h4><p>Based in Glenview and serving the North Shore for {D.YEARS_IN_BUSINESS} years, with {D.HOMES_SERVICED} homes serviced.</p></div>
          </div>
        </div>
      </div>
      <div class="town-card">
        <h3><i class="fas fa-map-marker-alt"></i> {name}, IL</h3>
        <ul>
          <li><span>County</span><strong>{town['county']}</strong></li>
          <li><span>ZIP codes</span><strong>{town['zips']}</strong></li>
          <li><span>Response time</span><strong>Usually within a few hours</strong></li>
          <li><span>Estimates</span><strong>Always free</strong></li>
        </ul>
        <p>We also serve nearby {near_links}.</p>
        <a href="{QUOTE}" class="btn btn-primary btn-sm">Get a {name} Quote <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
</section>

{reviews_section()}

{cta_banner(f'Get Your Free {name} Estimate')}'''
    page(path,
         f'{name} IL Exterior Cleaning | Windows, Pressure Washing & Gutters | ClearSide',
         f'Window cleaning, pressure washing and gutter cleaning in {name}, IL. Local, licensed & insured, '
         f'streak-free guaranteed. Free estimates: {D.PHONE_DISPLAY}.',
         [{'@context': 'https://schema.org', '@type': 'Service', 'name': f'Window Cleaning in {name}, IL',
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
    by_name = {t['name']: t for t in D.TOWNS}
    near = [by_name[n] for n in town['near'] if n in by_name]
    near_links = ', '.join(f'<a href="{town_service_file(t["name"], svc)}">{t["name"]} {svc["name"].lower()}</a>'
                           for t in near)
    price_rows = '\n'.join(f'          <li><span>{esc(n)}</span><strong>{esc(p)}</strong></li>' for n, p in svc['prices'])
    included = '\n'.join(f'          <li><i class="fas fa-circle-check"></i> {esc(i)}</li>' for i in svc['included'])
    others = '\n'.join(f'      <a class="svc-mini" href="{town_service_file(name, s) if is_local(s) else service_file(s)}">'
                       f'<i class="fas {s["icon"]}"></i> {(name + " ") if is_local(s) else ""}{s["name"]}</a>'
                       for s in D.SERVICES if s is not svc)
    faqs = [(f"Do you offer {svc['name'].lower()} in {name}?",
             f"Yes. We serve all of {name} ({town['zips']}) in {town['county']}. {town['blurb']} "
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
    <p>{esc(svc['short'])} Serving {name} homes in {town['zips']}. Licensed, insured and streak-free guaranteed.</p>
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

<section class="bg-paper">
  <div class="container">
    <div class="why-grid">
      <div class="why-content">
        <span class="eyebrow">Local &amp; Trusted</span>
        <h2>Why {name} Homeowners Choose ClearSide</h2>
        <div class="why-features">
          <div class="feature-row">
            <div class="feat-icon"><i class="fas fa-shield-halved"></i></div>
            <div class="feat-text"><h4>Licensed &amp; Insured</h4><p>ClearSide Exteriors, LLC is fully licensed and insured, so you are covered on every job.</p></div>
          </div>
          <div class="feature-row">
            <div class="feat-icon"><i class="fas fa-circle-check"></i></div>
            <div class="feat-text"><h4>Satisfaction Guarantee</h4><p>If you see a streak or anything we missed, we come back and fix it at no charge.</p></div>
          </div>
          <div class="feature-row">
            <div class="feat-icon"><i class="fas fa-graduation-cap"></i></div>
            <div class="feat-text"><h4>Student-Founded &amp; Local</h4><p>Based in Glenview and serving the North Shore for {D.YEARS_IN_BUSINESS} years, with {D.HOMES_SERVICED} homes serviced.</p></div>
          </div>
        </div>
      </div>
      <div class="town-card">
        <h3><i class="fas fa-map-marker-alt"></i> {name}, IL</h3>
        <ul>
          <li><span>County</span><strong>{town['county']}</strong></li>
          <li><span>ZIP codes</span><strong>{town['zips']}</strong></li>
          <li><span>Response time</span><strong>Usually within a few hours</strong></li>
          <li><span>Estimates</span><strong>Always free</strong></li>
        </ul>
        <p>Also serving nearby: {near_links}.</p>
        <a href="{town_slug(name)}" class="ec-more" style="margin-left:0;">All services in {name} <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
</section>

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

{cta_banner(f'Get Your Free {name} Estimate')}'''
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
         f'{title} IL | ClearSide Exteriors',
         f"{name}, IL {svc['name'].lower()} by a local, licensed & insured team.{from_text} "
         f"Free estimates: {D.PHONE_DISPLAY}.",
         [service_schema, faq_schema(faqs),
          breadcrumb_schema([('Home', ''), (name, town_slug(name)), (svc['name'], path)])],
         body)
    return path


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
    page('faq.html', 'FAQ | Window Cleaning Pricing & Questions | ClearSide Exteriors',
         'Answers about window cleaning, pressure washing and gutter cleaning prices, scheduling, insurance and our '
         'streak-free guarantee. ClearSide Exteriors, Glenview IL.',
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
                 + [build_faq()])
    pages = HAND_PAGES + generated
    for p in pages:
        fill_shared(p)
    build_sitemap(pages)
    print(f'Built {len(generated)} pages and updated {len(pages)} pages + sitemap.xml')


if __name__ == '__main__':
    main()
