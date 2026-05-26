// TopNav.jsx — navy top navigation

function TopNav({ active, onNavigate, progress, role }) {
  const items = role === 'admin'
    ? [{ id: 'admin', label: 'Overview' }, { id: 'modules', label: 'All Modules' }]
    : [{ id: 'dashboard', label: 'Dashboard' }, { id: 'equipment', label: 'Equipment' }, { id: 'contact', label: 'Ahmed' }];

  const completedModules = Math.round((progress / 100) * 7);

  return (
    <nav className="cs-topnav">
      <a className="cs-topnav__brand" onClick={() => onNavigate(role === 'admin' ? 'admin' : 'dashboard')}>
        <img src="../../assets/logo/clearside-full-transparent.png" alt="ClearSide"/>
      </a>
      <div className="cs-topnav__nav">
        {items.map(it => (
          <button
            key={it.id}
            className={`cs-topnav__nav-item ${active === it.id ? 'is-active' : ''}`}
            onClick={() => onNavigate(it.id)}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div className="cs-topnav__spacer"/>
      {role === 'worker' ? (
        <div className="cs-topnav__progress">
          <div className="cs-topnav__progress-pips">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`cs-topnav__pip ${i < completedModules ? 'is-done' : i === completedModules ? 'is-current' : ''}`}
                title={`Module ${i + 1}`}
              />
            ))}
          </div>
          <span className="cs-topnav__progress-label">{completedModules}<span style={{opacity:.5}}>/7</span></span>
        </div>
      ) : null}
      <div className="cs-topnav__user">
        <div className="cs-topnav__avatar">{role === 'admin' ? 'AA' : 'MR'}</div>
        <div className="cs-topnav__user-info">
          <div className="cs-topnav__user-name">{role === 'admin' ? 'Ahmed A.' : 'Marco R.'}</div>
          <div className="cs-topnav__user-role">{role === 'admin' ? 'Owner / Admin' : 'Tech · Route 4'}</div>
        </div>
      </div>
    </nav>
  );
}

window.TopNav = TopNav;
