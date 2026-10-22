"""Business facts, services and towns used by tools/build_pages.py.

Edit this file, then run `python3 tools/build_pages.py` to regenerate the
service pages, town pages, FAQ page, sitemap and the shared header/footer.
"""

SITE_URL = 'https://clearsideexteriors.com'
PHONE_DISPLAY = '(224) 985-9327'
PHONE_E164 = '+12249859327'
EMAIL = 'clearsidexteriors@gmail.com'
GOOGLE_PROFILE = 'https://share.google/kghBrJvmS0UEbrGW1'
FACEBOOK_PROFILE = 'https://www.facebook.com/ClearSideExteriorsLLC/'
# Leave empty until there is a real account; the footer hides the icon when blank.
INSTAGRAM_PROFILE = ''
YEARS_IN_BUSINESS = '4+'
HOMES_SERVICED = '600+'

# Starting prices come from the ClearSide price book in Flyra.
SERVICES = [
    {
        'slug': 'window-cleaning',
        'name': 'Window Cleaning',
        'short': 'Streak-free interior and exterior window cleaning with pure deionized water.',
        'icon': 'fa-house',
        'photo': 'commercial-windows-exterior',
        'photo_alt': 'Exterior window cleaning with a water-fed pole on a North Shore home',
        'photo2': 'interior-window-cleaning',
        'photo2_alt': 'Interior window cleaning with a professional squeegee',
        'from': 150,
        'prices': [('Exterior window cleaning', 'from $150'), ('Interior window cleaning', 'from $200'),
                   ('Screen cleaning', 'added to any window cleaning')],
        'intro': ('We clean the outside of your windows with a water-fed pole system and deionized (pure) water, '
                  'scrubbing glass, frames and sills with nylon and boar-hair brushes. Pure water has no minerals, '
                  'so it dries spot-free with no soap left behind. Inside, we use professional squeegees and '
                  'solution, then wipe down the frames and sills.'),
        'included': ['All accessible exterior glass, frames and sills scrubbed',
                     'Deionized water rinse that dries spot-free',
                     'Interior glass squeegeed edge to edge',
                     'Interior sills and frames wiped down',
                     'Shoe covers worn inside your home',
                     'Streak-free guarantee: if you see a streak, we come back'],
        'faqs': [
            ('How do you get windows streak-free without soap?',
             'Outside, we use deionized water, which has had all its minerals removed. Spots and streaks are minerals '
             'left behind when normal water dries, so pure water dries clean. Inside, we use a professional squeegee '
             'and solution.'),
            ('How much does window cleaning cost?',
             'Exterior window cleaning starts at $150 and interior at $200. Your exact price depends on how many '
             'windows you have, how many stories, and access. We give you a free, exact quote before any work starts.'),
            ('How often should I have my windows cleaned?',
             'Most North Shore homeowners do twice a year, in spring and fall. Homes near busy roads, trees or '
             'construction often do three or four visits a year. We offer recurring plans for all of these.'),
        ],
    },
    {
        'slug': 'screen-cleaning',
        'name': 'Screen Cleaning',
        'short': 'Every screen removed, hand-scrubbed, rinsed and reinstalled.',
        'icon': 'fa-wind',
        'photo': 'screen-cleaning',
        'photo_alt': 'Window screens being hand-scrubbed and rinsed',
        'photo2': 'interior-squeegee-cleaning',
        'photo2_alt': 'Screen and window detailing',
        'from': None,
        'prices': [('Screen cleaning', 'added to any window cleaning, priced by screen count')],
        'intro': ('Screens hold more dust and pollen than almost any surface on your home, and dirty screens make '
                  'freshly cleaned windows look dull. We remove every screen, hand-scrub it with a soft brush and '
                  'solution, detail the frame, rinse it, and put it back once it is dry.'),
        'included': ['Every screen removed carefully',
                     'Hand-scrubbed with a soft brush and solution',
                     'Frames brushed and wiped',
                     'Rinsed and dried before reinstalling',
                     'Torn or damaged screens pointed out to you'],
        'faqs': [
            ('Can I get screen cleaning on its own?',
             'Screen cleaning is added to a window cleaning visit, since we are already removing the screens to '
             'clean the glass. Ask for it when you request your quote.'),
            ('Do you repair torn screens?',
             'We do not rescreen, but we will point out any torn or bent screens we find so you can get them fixed.'),
        ],
    },
    {
        'slug': 'pressure-washing',
        'name': 'Pressure Washing',
        'short': 'Driveways, patios, decks, walkways and house siding deep cleaned.',
        'icon': 'fa-spray-can-sparkles',
        'photo': 'driveway-before-after',
        'photo_alt': 'Driveway before and after pressure washing',
        'photo2': 'deck-pressure-washing',
        'photo2_alt': 'Deck pressure washing in progress',
        'from': 150,
        'prices': [('Patio pressure washing', 'from $150'), ('Driveway pressure washing', 'from $200'),
                   ('House soft wash (siding)', 'from $300'), ('Decks and tennis courts', 'quoted on site')],
        'intro': ('Pressure washing strips years of dirt, algae, mold, mildew and oil stains off hard surfaces. '
                  'On driveways we pre-treat, surface clean and post-treat with an eco-friendly solution so the '
                  'concrete stays cleaner for longer. On siding we soft wash at low pressure, which cleans without '
                  'damaging the surface.'),
        'included': ['Driveways and parking pads',
                     'Patios, walkways and steps',
                     'Decks (prepped for sealing or staining)',
                     'Low-pressure soft wash for house siding',
                     'Pressure and technique matched to each surface'],
        'faqs': [
            ('Will pressure washing damage my surfaces?',
             'Not when it is done right. We adjust pressure and technique for every surface, and we soft wash '
             'siding at low pressure instead of blasting it.'),
            ('How much does pressure washing cost?',
             'Patios start at $150, driveways at $200 and a house soft wash at $300. Decks and larger surfaces are '
             'quoted on site. Every quote is free.'),
            ('Is the cleaning solution safe for my lawn and pets?',
             'We use an eco-friendly solution and rinse thoroughly. We are happy to walk you through what we use '
             'before we start.'),
        ],
    },
    {
        'slug': 'gutter-cleaning',
        'name': 'Gutter Cleaning',
        'short': 'Debris removed by hand, gutters flushed and downspouts checked.',
        'icon': 'fa-leaf',
        'photo': 'gutter-guard',
        'photo_alt': 'Clean gutters and roofline on a residential home',
        'photo2': 'stone-house-residential',
        'photo2_alt': 'Stone house exterior after gutter and window service',
        'from': 100,
        'prices': [('Gutter cleaning (inside the gutters)', 'from $200'),
                   ('Exterior gutter scrub (outside face)', 'from $100')],
        'intro': ('Clogged gutters overflow, and that water ends up in your foundation, fascia and landscaping. '
                  'We remove all debris by hand, flush the gutters with water, and make sure every downspout is '
                  'flowing. We can also scrub the outside face of the gutters to remove the black streaks.'),
        'included': ['All debris removed by hand and bagged',
                     'Gutters flushed with water',
                     'Every downspout checked for clogs',
                     'Optional exterior gutter scrub for black streaks',
                     'Any damage we find reported to you'],
        'faqs': [
            ('How often should gutters be cleaned?',
             'At least once a year, and twice if you have trees near the house. Late fall, after the leaves come '
             'down, is the most important visit.'),
            ('What is an exterior gutter scrub?',
             'It cleans the outside face of the gutter, where the black "tiger stripe" streaks form. It starts at '
             '$100 and pairs well with window cleaning.'),
        ],
    },
    {
        'slug': 'commercial-window-cleaning',
        'name': 'Commercial Window Cleaning',
        'short': 'Storefronts and low-rise commercial buildings on a schedule that suits you.',
        'icon': 'fa-building',
        'photo': 'hero-pole-cleaning',
        'photo_alt': 'Water-fed pole window cleaning on a building',
        'photo2': 'diamond-window-cleaning',
        'photo2_alt': 'Detailed window cleaning on divided-light windows',
        'from': None,
        'prices': [('Commercial window cleaning', 'quoted per building, free walkthrough')],
        'intro': ('Clean glass is the first thing customers see. We clean storefronts, offices and low-rise '
                  'commercial buildings with the same pure-water system we use on homes, and we can set you up '
                  'on a weekly, monthly or quarterly route so you never have to think about it.'),
        'included': ['Storefront and entrance glass',
                     'Low-rise office and retail buildings',
                     'Pure-water exterior cleaning, no residue',
                     'Recurring schedules: weekly, monthly or quarterly',
                     'Early or after-hours visits on request'],
        'faqs': [
            ('Can you clean before we open?',
             'Yes. Ask about early-morning visits when you request your quote and we will work around your hours.'),
            ('How is commercial pricing set?',
             'Commercial work is quoted per building after a free walkthrough, based on glass count, height and '
             'how often you want service.'),
        ],
    },
]

TOWNS = [
    {'name': 'Glenview', 'county': 'Cook County', 'zips': '60025 and 60026',
     'near': ['Northbrook', 'Wilmette', 'Northfield', 'Morton Grove', 'Niles'],
     'blurb': 'Glenview is home base for ClearSide. We started here, most of our customers are here, and we are '
              'never more than a few minutes away.'},
    {'name': 'Wilmette', 'county': 'Cook County', 'zips': '60091',
     'near': ['Evanston', 'Glenview', 'Northfield', 'Skokie'],
     'blurb': 'Wilmette is right next door to our Glenview base, and we clean homes here every week of the season.'},
    {'name': 'Northfield', 'county': 'Cook County', 'zips': '60093',
     'near': ['Glenview', 'Northbrook', 'Wilmette', 'Glencoe'],
     'blurb': 'Northfield borders Glenview, so getting on our schedule is quick and easy.'},
    {'name': 'Niles', 'county': 'Cook County', 'zips': '60714',
     'near': ['Morton Grove', 'Park Ridge', 'Skokie', 'Des Plaines', 'Glenview'],
     'blurb': 'Niles sits just south of Glenview and is a regular stop on our routes.'},
    {'name': 'Arlington Heights', 'county': 'Cook County', 'zips': '60004 and 60005',
     'near': ['Mt. Prospect', 'Des Plaines', 'Park Ridge'],
     'blurb': 'We serve homes and businesses across Arlington Heights, from the neighborhoods around downtown to '
              'the north side.'},
    {'name': 'Mt. Prospect', 'county': 'Cook County', 'zips': '60056',
     'near': ['Arlington Heights', 'Des Plaines', 'Park Ridge'],
     'blurb': 'Mount Prospect homeowners get the same pure-water, streak-free service we bring to every North '
              'Shore home.'},
    {'name': 'Des Plaines', 'county': 'Cook County', 'zips': '60016 and 60018',
     'near': ['Park Ridge', 'Mt. Prospect', 'Niles', 'Glenview'],
     'blurb': 'Des Plaines is a short drive from our Glenview base, and we clean homes and storefronts here '
              'throughout the season.'},
    {'name': 'Northbrook', 'county': 'Cook County', 'zips': '60062',
     'near': ['Glenview', 'Northfield', 'Deerfield', 'Glencoe'],
     'blurb': 'Northbrook is right next to Glenview and one of the towns we serve most.'},
    {'name': 'Skokie', 'county': 'Cook County', 'zips': '60076 and 60077',
     'near': ['Evanston', 'Morton Grove', 'Niles', 'Wilmette'],
     'blurb': 'From single-family homes to small businesses, we keep Skokie windows and driveways clean.'},
    {'name': 'Morton Grove', 'county': 'Cook County', 'zips': '60053',
     'near': ['Niles', 'Skokie', 'Glenview'],
     'blurb': 'Morton Grove borders Glenview, so we are always close by.'},
    {'name': 'Park Ridge', 'county': 'Cook County', 'zips': '60068',
     'near': ['Niles', 'Des Plaines', 'Morton Grove'],
     'blurb': 'Park Ridge homeowners trust us for streak-free windows and spotless driveways.'},
    {'name': 'Deerfield', 'county': 'Lake and Cook Counties', 'zips': '60015',
     'near': ['Northbrook', 'Glencoe', 'Northfield'],
     'blurb': 'Deerfield is just north of Northbrook and a regular part of our North Shore routes.'},
    {'name': 'Glencoe', 'county': 'Cook County', 'zips': '60022',
     'near': ['Northfield', 'Northbrook', 'Deerfield', 'Wilmette'],
     'blurb': 'We bring careful, detail-first window and exterior cleaning to Glencoe homes.'},
    {'name': 'Evanston', 'county': 'Cook County', 'zips': '60201, 60202 and 60203',
     'near': ['Wilmette', 'Skokie'],
     'blurb': 'We clean homes, two-flats and storefronts across Evanston.'},
]

GENERAL_FAQS = [
    ('Are you licensed and insured?',
     'Yes. ClearSide Exteriors, LLC is licensed and insured, so you are covered on every job.'),
    ('Are estimates really free?',
     'Yes, always. We give you a clear, exact price before any work starts, with no pressure and no hidden fees.'),
    ('How fast will you get back to me?',
     'Usually within a few hours. The fastest way to reach us is to call or text ' + PHONE_DISPLAY + '.'),
    ('What areas do you serve?',
     'We are based in Glenview and serve the North Shore and northwest suburbs, including Wilmette, Northbrook, '
     'Northfield, Skokie, Evanston, Glencoe, Deerfield, Niles, Morton Grove, Park Ridge, Des Plaines, Mt. Prospect '
     'and Arlington Heights. If you do not see your town, just ask.'),
    ('What does it cost?',
     'Exterior window cleaning starts at $150, interior window cleaning at $200, gutter cleaning at $200, patio '
     'washing at $150 and driveway washing at $200. Your exact price depends on the size of the job, and we always '
     'quote it before we start.'),
    ('Do you offer a discount for new customers?',
     'Yes. New customers get 10% off their first cleaning. Sign up from the offer on our homepage, or just mention '
     'it when you ask for a quote.'),
    ('What is your satisfaction guarantee?',
     'If you see a streak or anything we missed, tell us and we will come back and fix it at no charge.'),
    ('Do you offer recurring service?',
     'Yes. We offer once-a-year, twice-a-year, three-times-a-year and quarterly plans. Most customers choose spring '
     'and fall.'),
]
