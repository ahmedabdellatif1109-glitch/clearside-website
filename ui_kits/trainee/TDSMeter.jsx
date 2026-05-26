// TDSMeter.jsx — interactive TDS readout
// Bands:
//   0        → perfect — pure water, no minerals
//   1 – 9    → good    — completely fine to clean
//   10       → caution — rinse thoroughly, notify Ahmed
//   11+      → warn    — light spots possible, extra rinsing handles it

function TDSMeter({ onSawFailure }) {
  const MIN = 0;
  const MAX = 20;

  const [value, setValue] = React.useState(5);
  const [hasSeenWarn, setHasSeenWarn] = React.useState(false);

  const band =
    value === 0  ? 'perfect' :
    value <= 9   ? 'good'    :
    value === 10 ? 'caution' :
                   'warn';

  React.useEffect(() => {
    if (value >= 11 && !hasSeenWarn) {
      setHasSeenWarn(true);
      if (typeof onSawFailure === 'function') onSawFailure();
    }
  }, [value, hasSeenWarn, onSawFailure]);

  const inc = () => setValue(v => Math.min(MAX, v + 1));
  const dec = () => setValue(v => Math.max(MIN, v - 1));

  const holdRef = React.useRef(null);
  const startHold = (fn) => {
    fn();
    holdRef.current = setTimeout(function tick() {
      fn();
      holdRef.current = setTimeout(tick, 80);
    }, 320);
  };
  const stopHold = () => { if (holdRef.current) { clearTimeout(holdRef.current); holdRef.current = null; } };

  // LCD display color per band — uses company palette
  const lcdColor   = { perfect: '#8ADAF5', good: '#B8F5C8', caution: '#F5C09A', warn: '#FF9B8C' }[band];
  const lcdShadow  = {
    perfect: '0 0 16px rgba(91,184,232,0.6)',
    good:    '0 0 12px rgba(184,245,200,0.5)',
    caution: '0 0 16px rgba(232,150,122,0.55)',
    warn:    '0 0 16px rgba(255,155,140,0.55)',
  }[band];

  const copy = {
    perfect: {
      pill:  'PERFECT',
      title: 'Zero PPM — no minerals at all.',
      body:  'Pure water. Every dissolved solid has been stripped out by the resin. Glass will dry completely clear with no effort.',
    },
    good: {
      pill:  'PERFECTLY FINE',
      title: '1–9 PPM — completely safe to clean.',
      body:  'Trace minerals this low will never leave a visible spot when the water dries. This is your normal working range. Start the job.',
    },
    caution: {
      pill:  'RINSE THOROUGHLY',
      title: '10 PPM — give each window an extra rinse pass.',
      body:  <>At 10 PPM, the water will still dry clean if you rinse thoroughly — <strong>extra top-down passes on each pane</strong>. Text Ahmed or your tech manager your TDS reading so we can track how fast the tank is dropping.</>,
    },
    warn: {
      pill:  'HIGH — EXTRA RINSING',
      title: 'Above 10 PPM — manageable with thorough rinsing.',
      body:  <>Light spots are possible if you rush the rinse. <strong>Rinse each pane extra thoroughly — at least two full top-down passes.</strong> This is a field situation, not a stop-work order. DI tanks take about a week to ship, so thorough rinsing is your tool here. Let Ahmed know your reading.</>,
    },
  };

  const c = copy[band];
  const pct = (value / MAX) * 100;

  const bandLabel = {
    perfect: 'pure water',
    good:    'in spec',
    caution: 'rinse well',
    warn:    '⚠ extra rinse',
  }[band];

  return (
    <div className={`cs-tdsmeter cs-tdsmeter--${band}`}>
      <div className="cs-tdsmeter__device">
        <button
          className="cs-tdsmeter__arrow cs-tdsmeter__arrow--up"
          onClick={inc}
          onMouseDown={() => startHold(inc)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={(e) => { e.preventDefault(); startHold(inc); }}
          onTouchEnd={stopHold}
          aria-label="Increase PPM"
          disabled={value >= MAX}
        >
          <ModuleIcon name="chevron-up" size={22}/>
        </button>

        <div className="cs-tdsmeter__screen">
          <div className="cs-tdsmeter__brand">TDS · ppm</div>
          <div className="cs-tdsmeter__value" style={{ color: lcdColor, textShadow: lcdShadow }}>
            {String(value).padStart(3, '0')}
          </div>
          <div className="cs-tdsmeter__band" style={{ color: lcdColor, opacity: 0.8 }}>
            {bandLabel}
          </div>
        </div>

        <button
          className="cs-tdsmeter__arrow cs-tdsmeter__arrow--down"
          onClick={dec}
          onMouseDown={() => startHold(dec)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={(e) => { e.preventDefault(); startHold(dec); }}
          onTouchEnd={stopHold}
          aria-label="Decrease PPM"
          disabled={value <= MIN}
        >
          <ModuleIcon name="chevron-down" size={22}/>
        </button>
      </div>

      <div className="cs-tdsmeter__body">
        <div className={`cs-tdsmeter__pill cs-tdsmeter__pill--${band}`}>{c.pill}</div>
        <div className="cs-tdsmeter__title">{c.title}</div>
        <div className="cs-tdsmeter__text">{c.body}</div>

        <div className="cs-tdsmeter__scale">
          <div className="cs-tdsmeter__scale-bar">
            <div className="cs-tdsmeter__scale-fill" style={{ width: `${pct}%` }}/>
            <div className="cs-tdsmeter__scale-mark" style={{ left: '5%' }}/>
            <div className="cs-tdsmeter__scale-mark" style={{ left: '49%' }}/>
            <div className="cs-tdsmeter__scale-mark" style={{ left: '55%' }}/>
          </div>
          <div className="cs-tdsmeter__scale-labels">
            <span>0 pure</span>
            <span>1–9 fine</span>
            <span>10 rinse+</span>
            <span>11+ notify</span>
          </div>
        </div>

        {!hasSeenWarn ? (
          <div className="cs-tdsmeter__hint">
            <ModuleIcon name="chevron-up" size={14}/>
            <span>Push past 10 to see what a high reading looks like. The next section unlocks when you do.</span>
          </div>
        ) : (
          <div className="cs-tdsmeter__hint cs-tdsmeter__hint--ok">
            <ModuleIcon name="check" size={14}/>
            <span>Good — you know what to do. Scroll back to a normal reading and continue.</span>
          </div>
        )}
      </div>
    </div>
  );
}

window.TDSMeter = TDSMeter;
