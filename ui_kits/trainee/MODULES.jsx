// MODULES.jsx — canonical training data
// The 7 modules + key content used by the kit. Mirrors the real app.

const MODULES = [
  {
    id: 'equipment',
    num: 1,
    title: 'Equipment & Setup',
    eyebrow: 'Module 01',
    desc: 'Every tool you carry, how the system connects, TDS check, hose-burst repair.',
    accent: 'sky',
    icon: 'wrench',
    minutes: 14,
    steps: 6,
  },
  {
    id: 'wfp',
    num: 2,
    title: 'Water-Fed Pole Cleaning',
    eyebrow: 'Module 02',
    desc: 'The order is the order. Frames → Sills → Glass → Rinse.',
    accent: 'sky',
    icon: 'droplets',
    minutes: 12,
    steps: 5,
  },
  {
    id: 'special',
    num: 3,
    title: 'Special Cases',
    eyebrow: 'Module 03',
    desc: 'Hard water (acidic solution) and frame oxidation — when normal cleaning isn\'t enough.',
    accent: 'gold',
    icon: 'triangle-alert',
    minutes: 10,
    steps: 4,
  },
  {
    id: 'screens',
    num: 4,
    title: 'Screen Removal & Cleaning',
    eyebrow: 'Module 04',
    desc: 'Labeling, removal order, scrub-and-rinse method.',
    accent: 'salmon',
    icon: 'frame',
    minutes: 11,
    steps: 5,
  },
  {
    id: 'traditional',
    num: 5,
    title: 'Traditional Cleaning',
    eyebrow: 'Module 05',
    desc: 'Interior work — mop, squeegee fanning method, walnut pad, scraper.',
    accent: 'brown',
    icon: 'paintbrush',
    minutes: 9,
    steps: 5,
  },
  {
    id: 'order',
    num: 6,
    title: 'Order of Operations',
    eyebrow: 'Module 06',
    desc: 'Solo vs. two-tech sequencing across the property.',
    accent: 'sky',
    icon: 'list-checks',
    minutes: 8,
    steps: 4,
  },
  {
    id: 'customer',
    num: 7,
    title: 'Customer Care & Sales',
    eyebrow: 'Module 07',
    desc: 'Knock script, walk-around, subscription pitch.',
    accent: 'salmon',
    icon: 'handshake',
    minutes: 9,
    steps: 4,
  },
];

const ACCENT_COLORS = {
  sky:    { bg: 'var(--sky-100)',    fg: 'var(--sky-700)',    raw: '#5BB8E8' },
  salmon: { bg: 'var(--salmon-100)', fg: 'var(--salmon-700)', raw: '#E8967A' },
  gold:   { bg: 'var(--caution-bg)', fg: 'var(--salmon-700)', raw: '#E8B23A' },
  brown:  { bg: '#EFE6D8',           fg: '#7A5E3F',           raw: '#9B7C5A' },
};

window.MODULES = MODULES;
window.ACCENT_COLORS = ACCENT_COLORS;
