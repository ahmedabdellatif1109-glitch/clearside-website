// Atoms.jsx — Button, Chip, ModuleIcon, ProgressBar, Callout
// All shared primitives for the Trainee kit.

function Button({ variant = 'primary', size, icon, iconRight, children, onClick, disabled, type = 'button' }) {
  const cls = [
    'cs-btn',
    `cs-btn--${variant}`,
    size === 'lg' ? 'cs-btn--lg' : '',
  ].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {icon ? <ModuleIcon name={icon} size={16}/> : null}
      <span>{children}</span>
      {iconRight ? <ModuleIcon name={iconRight} size={16}/> : null}
    </button>
  );
}

function Chip({ kind = 'ready', dot = true, children }) {
  return (
    <span className={`cs-chip cs-chip--${kind}`}>
      {dot ? <span className="cs-chip__dot"/> : null}
      {children}
    </span>
  );
}

function ProgressBar({ value, color = 'salmon' }) {
  return (
    <div style={{ height: 8, background: 'var(--paper-2)', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{
        width: `${value}%`,
        height: '100%',
        background: color === 'sky' ? 'var(--sky)' : 'var(--salmon)',
        borderRadius: 99,
        transition: 'width 320ms cubic-bezier(.2,.7,.2,1)',
      }}/>
    </div>
  );
}

function Callout({ kind = 'tip', label, children }) {
  const defaults = { tip: 'Tip', caution: 'Caution', stop: 'Stop' };
  return (
    <div className={`cs-callout cs-callout--${kind}`}>
      <div className="cs-callout__label">{label || defaults[kind]}</div>
      <div className="cs-callout__body">{children}</div>
    </div>
  );
}

// Inline-SVG icons — compile-safe (no data: URIs).
// Path data taken from Lucide-style 24×24 strokes.
function ModuleIcon({ name, size = 24, color = 'currentColor' }) {
  const stroke = { width: 1.75, linecap: 'round', linejoin: 'round', fill: 'none', stroke: color };
  const paths = {
    wrench:        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
    droplets:      <g><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25C3 14.47 4.8 16.3 7 16.3z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></g>,
    'triangle-alert': <g><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><path d="M12 9v4"/><path d="M12 17h.01"/></g>,
    frame:         <g><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></g>,
    paintbrush:    <g><path d="M18.37 2.63 14 7l3 3 4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/></g>,
    'list-checks': <g><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></g>,
    handshake:     <g><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5 5 0 0 1 7.06 0l1.5 1.5a3 3 0 0 0 4.24 0"/><path d="m4 6 4.94 4.94a3 3 0 0 1 0 4.24L7.5 16.62a1 1 0 0 1-1.41 0L2 12.55"/></g>,
    award:         <g><circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/></g>,
    'arrow-right': <g><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></g>,
    'arrow-left':  <g><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></g>,
    check:         <path d="M20 6 9 17l-5-5"/>,
    x:             <g><path d="M18 6 6 18"/><path d="M6 6l12 12"/></g>,
    lock:          <g><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></g>,
    'lock-open':   <g><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></g>,
    clock:         <g><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></g>,
    phone:         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    user:          <g><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g>,
    settings:      <g><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></g>,
    home:          <g><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></g>,
    sun:           <g><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></g>,
    'chevron-up':   <path d="m18 15-6-6-6 6"/>,
    'chevron-down': <path d="m6 9 6 6 6-6"/>,
    'chevron-right':<path d="m9 18 6-6-6-6"/>,
    'chevron-left': <path d="m15 18-6-6 6-6"/>,
    'book-open':    <g><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></g>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth={stroke.width} strokeLinecap={stroke.linecap} strokeLinejoin={stroke.linejoin}>
      {paths[name] || null}
    </svg>
  );
}

Object.assign(window, { Button, Chip, ProgressBar, Callout, ModuleIcon });
