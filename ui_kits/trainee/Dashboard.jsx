// Dashboard.jsx — worker dashboard

function Dashboard({ progress, completedIds, currentId, onOpenModule, onOpenFinal }) {
  const completedCount = completedIds.size;
  const currentModule = MODULES.find(m => m.id === currentId);
  const allDone = completedCount === MODULES.length;

  return (
    <div className="cs-page">
      {/* Hero */}
      <div className="cs-hero">
        <div>
          <div className="cs-hero__eyebrow">Welcome back, Marco</div>
          <h1 className="cs-hero__title">
            {allDone
              ? <>One step left. Take the final exam and you're certified.</>
              : <>{currentModule ? <>Next up: <em style={{fontStyle: 'italic', color: 'var(--salmon)'}}>{currentModule.title.toLowerCase()}.</em></> : <>Let's get started.</>}</>}
          </h1>
          <p className="cs-hero__sub">
            Work through the modules in order. Each one ends with a 3-question check. Pass all seven and the final exam unlocks.
          </p>
          <div className="cs-hero__cta">
            <Button variant="primary" size="lg" onClick={() => onOpenModule(currentModule?.id || MODULES[0].id)} iconRight="arrow-right">
              {currentModule ? `Continue ${currentModule.title}` : 'Start Module 1'}
            </Button>
            <Button variant="ghost" size="lg" onClick={() => document.getElementById('cs-modlist')?.scrollIntoView({behavior: 'smooth'})}>
              See all modules
            </Button>
          </div>
        </div>
        <div className="cs-hero__art" aria-hidden>
          <div/><div/><div/><div/>
        </div>
      </div>

      {/* Stats */}
      <div className="cs-stats">
        <div className="cs-stat">
          <div className="cs-stat__label">Modules</div>
          <div className="cs-stat__value">{completedCount}<span style={{ color: 'var(--ink-4)' }}> / {MODULES.length}</span></div>
          <div className="cs-stat__meta">{progress}% complete</div>
        </div>
        <div className="cs-stat cs-stat--accent">
          <div className="cs-stat__label">Quiz score</div>
          <div className="cs-stat__value">94%</div>
          <div className="cs-stat__meta">over {completedCount * 3} questions</div>
        </div>
        <div className="cs-stat">
          <div className="cs-stat__label">Time spent</div>
          <div className="cs-stat__value">52m</div>
          <div className="cs-stat__meta">last session 12m ago</div>
        </div>
        <div className="cs-stat">
          <div className="cs-stat__label">Status</div>
          <div className="cs-stat__value" style={{ fontSize: 22, marginTop: 14 }}>
            {allDone ? 'Ready for exam' : 'In progress'}
          </div>
          <div className="cs-stat__meta">since May 14</div>
        </div>
      </div>

      {/* Module grid */}
      <div className="cs-section" id="cs-modlist">
        <div className="cs-section__head">
          <h2 className="cs-section__title">Training modules</h2>
          <div className="cs-section__link">Sequential · unlocks in order</div>
        </div>
        <div className="cs-modgrid">
          {MODULES.map((m, i) => {
            const isDone = completedIds.has(m.id);
            const prevDone = i === 0 || completedIds.has(MODULES[i - 1].id);
            const isLocked = !isDone && !prevDone;
            const isCurrent = !isDone && prevDone;
            return (
              <ModuleCard
                key={m.id}
                mod={m}
                state={isDone ? 'done' : isLocked ? 'locked' : isCurrent ? 'current' : 'ready'}
                onOpen={() => !isLocked && onOpenModule(m.id)}
              />
            );
          })}

          {/* Final Exam */}
          <button
            className={`cs-modcard cs-modcard--final ${!allDone ? 'is-locked' : ''}`}
            disabled={!allDone}
            onClick={() => allDone && onOpenFinal()}
            style={{ '--accent': 'var(--salmon)' }}
          >
            <div className="cs-modcard__icon">
              <ModuleIcon name={allDone ? 'award' : 'lock'} size={22}/>
            </div>
            <div className="cs-modcard__body">
              <div className="cs-modcard__num">FINAL EXAM · 35 QUESTIONS</div>
              <div className="cs-modcard__title">Certification</div>
              <div className="cs-modcard__desc">
                100% required. Scenario questions covering every module. Pass and you're certified to work a route.
              </div>
              <div className="cs-modcard__foot">
                <Chip kind={allDone ? 'ready' : 'locked'}>{allDone ? 'READY' : 'COMPLETE ALL MODULES'}</Chip>
                <span className="cs-modcard__meta">~25 min · timed</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Contact card */}
      <div className="cs-section">
        <div className="cs-contact">
          <div className="cs-contact__avatar">A</div>
          <div>
            <div className="cs-contact__title">Stuck? Ask the owner</div>
            <div className="cs-contact__name">Ahmed Abdellatif</div>
            <div className="cs-contact__phone">(224) 504-4650 · text first, call if urgent</div>
          </div>
          <div className="cs-contact__cta">
            <Button variant="secondary" icon="phone">Call</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ mod, state, onOpen }) {
  const colors = ACCENT_COLORS[mod.accent];
  const stateChip = {
    done:    { kind: 'done',       label: 'COMPLETE' },
    current: { kind: 'inprogress', label: 'CONTINUE' },
    ready:   { kind: 'ready',      label: 'READY' },
    locked:  { kind: 'locked',     label: 'LOCKED' },
  }[state];

  return (
    <button
      className={`cs-modcard ${state === 'locked' ? 'is-locked' : ''}`}
      onClick={onOpen}
      disabled={state === 'locked'}
      style={{ '--accent': colors.raw, '--accent-bg': colors.bg }}
    >
      <div className="cs-modcard__icon" style={{ background: colors.bg, color: colors.raw }}>
        <ModuleIcon name={state === 'locked' ? 'lock' : mod.icon} size={22}/>
      </div>
      <div className="cs-modcard__body">
        <div className="cs-modcard__num" style={{ color: colors.raw }}>{mod.eyebrow.toUpperCase()}</div>
        <div className="cs-modcard__title">{mod.title}</div>
        <div className="cs-modcard__desc">{mod.desc}</div>
        <div className="cs-modcard__foot">
          <Chip kind={stateChip.kind}>{stateChip.label}</Chip>
          <span className="cs-modcard__meta">{mod.steps} steps · ~{mod.minutes} min</span>
        </div>
      </div>
    </button>
  );
}

window.Dashboard = Dashboard;
window.ModuleCard = ModuleCard;
