// AdminPortal.jsx — admin view (CSEADMIN code)

function AdminPortal({ liveCompleted, liveStats, liveName }) {
  const [trainees, setTrainees] = React.useState([]);

  React.useEffect(() => {
    function refresh() {
      try {
        const list = JSON.parse(localStorage.getItem('cse_trainees') || '[]');
        list.sort((a, b) => new Date(b.lastActiveAt) - new Date(a.lastActiveAt));
        setTrainees(list);
      } catch {}
    }
    refresh();
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, []);

  function formatDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function statusOf(t) {
    if (t.certified) return 'Certified';
    if (t.completedModules > 0) return 'In Progress';
    return 'Not Started';
  }

  function quizScoreOf(t) {
    if (!t.quizAnswered) return '—';
    return Math.round((t.quizCorrect / t.quizAnswered) * 100) + '%';
  }

  const certified   = trainees.filter(t => t.certified).length;
  const inProgress  = trainees.filter(t => !t.certified && t.completedModules > 0).length;
  const notStarted  = trainees.filter(t => t.completedModules === 0 && !t.certified).length;
  const certRate    = trainees.length ? Math.round((certified / trainees.length) * 100) : 0;

  return (
    <div className="cs-page">
      <div className="cs-hero">
        <div>
          <div className="cs-hero__eyebrow">Admin Portal</div>
          <h1 className="cs-hero__title">Crew certification.</h1>
          <p className="cs-hero__sub">
            {trainees.length === 0
              ? 'No trainees yet — records appear here once someone logs in.'
              : `${certified} of ${trainees.length} tech${trainees.length !== 1 ? 's' : ''} certified · ${certRate}% completion rate.`}
          </p>
        </div>
        <div className="cs-hero__art" aria-hidden>
          <div/><div/><div/><div/>
        </div>
      </div>

      <div className="cs-stats">
        <div className="cs-stat">
          <div className="cs-stat__label">Total Trainees</div>
          <div className="cs-stat__value">{trainees.length}</div>
          <div className="cs-stat__meta">ever logged in</div>
        </div>
        <div className="cs-stat cs-stat--accent">
          <div className="cs-stat__label">Certified</div>
          <div className="cs-stat__value">{certified}</div>
          <div className="cs-stat__meta">{trainees.length ? certRate + '% of crew' : 'none yet'}</div>
        </div>
        <div className="cs-stat">
          <div className="cs-stat__label">In Progress</div>
          <div className="cs-stat__value">{inProgress}</div>
          <div className="cs-stat__meta">started, not done</div>
        </div>
        <div className="cs-stat">
          <div className="cs-stat__label">Not Started</div>
          <div className="cs-stat__value">{notStarted}</div>
          <div className="cs-stat__meta">logged in, no modules</div>
        </div>
      </div>

      <div className="cs-section">
        <div className="cs-section__head">
          <h2 className="cs-section__title">All trainees</h2>
        </div>

        {trainees.length === 0 ? (
          <div style={{
            padding: '40px 24px',
            textAlign: 'center',
            color: 'var(--ink-3)',
            font: '15px/1.5 var(--font-body)',
            background: 'var(--paper-2)',
            borderRadius: 'var(--r-lg)',
            border: '1px dashed var(--border-1)',
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
            <div style={{ fontWeight: 600, color: 'var(--ink-1)', marginBottom: 6 }}>No trainees yet</div>
            <div>Records appear here once a technician logs in with the worker access code.</div>
          </div>
        ) : (
          <div className="cs-admin-table">
            <div className="cs-admin-row cs-admin-row--header">
              <div>Tech</div><div>Started</div><div>Progress</div><div>Status</div><div>Quiz score</div><div>Certified on</div>
            </div>
            {trainees.map((t) => {
              const status = statusOf(t);
              const pct = Math.round((t.completedModules / (t.totalModules || MODULES.length)) * 100);
              return (
                <div key={t.id} className="cs-admin-row">
                  <div>
                    <span style={{ font: '600 14px/1.2 var(--font-body)' }}>{t.name}</span>
                  </div>
                  <div style={{ color: 'var(--ink-3)', font: '500 13px/1 var(--font-mono)' }}>
                    {formatDate(t.startedAt)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ flex: 1, maxWidth: 80, height: 4, borderRadius: 99, background: 'var(--paper-3)', overflow: 'hidden' }}>
                        <div style={{
                          width: `${pct}%`, height: '100%', borderRadius: 99,
                          background: pct === 100 ? 'var(--go)' : pct > 0 ? 'var(--salmon)' : 'var(--ink-5)',
                          transition: 'width 700ms var(--ease)',
                        }}/>
                      </div>
                      <span style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--ink-3)', letterSpacing: '.04em' }}>
                        {t.completedModules}/{t.totalModules || MODULES.length}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Chip kind={status === 'Certified' ? 'done' : status === 'In Progress' ? 'inprogress' : 'locked'}>
                      {status.toUpperCase()}
                    </Chip>
                  </div>
                  <div style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--ink-3)' }}>
                    {quizScoreOf(t)}
                  </div>
                  <div style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--ink-3)' }}>
                    {formatDate(t.certifiedAt)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

window.AdminPortal = AdminPortal;
