// app.jsx — root state machine

// ── localStorage helpers ─────────────────────────────────────────────────────

function loadTrainees() {
  try { return JSON.parse(localStorage.getItem('cse_trainees') || '[]'); } catch { return []; }
}

function persistTrainee(record) {
  try {
    const list = loadTrainees();
    const idx = list.findIndex(t => t.id === record.id);
    if (idx >= 0) list[idx] = record; else list.push(record);
    localStorage.setItem('cse_trainees', JSON.stringify(list));
  } catch {}
}

// ── App ──────────────────────────────────────────────────────────────────────

function App() {
  const qp = new URLSearchParams(window.location.search);
  const startParam = qp.get('start');
  const startMod   = qp.get('m');
  const initialRole   = startParam === 'admin' ? 'admin' : (startParam ? 'worker' : null);
  const initialScreen = startParam === 'admin'     ? 'admin'
                      : startParam === 'module'    ? 'module'
                      : startParam === 'final'     ? 'final'
                      : startParam === 'certified' ? 'certified'
                      : startParam === 'worker'    ? 'dashboard'
                      : 'gate';
  const initialDone = (startParam === 'final' || startParam === 'certified')
    ? new Set(MODULES.map(m => m.id)) : new Set();

  const [role, setRole]         = React.useState(initialRole);
  const [screen, setScreen]     = React.useState(initialScreen);
  const [moduleId, setModuleId] = React.useState(startMod || null);
  const [completed, setCompleted] = React.useState(initialDone);
  const [quizStats, setQuizStats] = React.useState({ answered: 0, correct: 0 });
  const [workerName, setWorkerName] = React.useState('');
  const sessionIdRef = React.useRef(null);

  const progress  = Math.round((completed.size / MODULES.length) * 100);
  const currentId = MODULES.find(m => !completed.has(m.id))?.id;

  function enter(r, name) {
    setRole(r);
    setScreen(r === 'admin' ? 'admin' : 'dashboard');
    if (r === 'worker' && name) {
      setWorkerName(name);
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
      sessionIdRef.current = id;
      persistTrainee({
        id,
        name,
        startedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        completedModules: 0,
        totalModules: MODULES.length,
        quizAnswered: 0,
        quizCorrect: 0,
        certified: false,
        certifiedAt: null,
      });
    }
  }

  function openModule(id) {
    setModuleId(id);
    setScreen('module');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function completeModule(id, quizResult) {
    const newAnswered = quizStats.answered + (quizResult?.total || 0);
    const newCorrect  = quizStats.correct  + (quizResult?.correct || 0);

    setCompleted(prev => {
      const next = new Set([...prev, id]);
      if (sessionIdRef.current) {
        const existing = loadTrainees().find(t => t.id === sessionIdRef.current) || {};
        persistTrainee({
          ...existing,
          id: sessionIdRef.current,
          name: workerName,
          lastActiveAt: new Date().toISOString(),
          completedModules: next.size,
          totalModules: MODULES.length,
          quizAnswered: newAnswered,
          quizCorrect: newCorrect,
          certified: false,
          certifiedAt: null,
        });
      }
      return next;
    });

    if (quizResult) {
      setQuizStats(s => ({
        answered: s.answered + quizResult.total,
        correct:  s.correct  + quizResult.correct,
      }));
    }
  }

  function certify() {
    if (sessionIdRef.current) {
      const now = new Date();
      const existing = loadTrainees().find(t => t.id === sessionIdRef.current) || {};
      persistTrainee({
        ...existing,
        id: sessionIdRef.current,
        name: workerName,
        lastActiveAt: now.toISOString(),
        completedModules: MODULES.length,
        quizAnswered: quizStats.answered,
        quizCorrect: quizStats.correct,
        certified: true,
        certifiedAt: now.toISOString(),
      });
    }
    setScreen('certified');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function backToDash() {
    setScreen('dashboard');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  if (screen === 'gate' || role === null) {
    return <AccessGate onEnter={enter}/>;
  }

  return (
    <>
      <TopNav
        role={role}
        active={screen === 'admin' ? 'admin' : screen}
        progress={progress}
        onNavigate={(id) => {
          if (id === 'dashboard' || id === 'admin') {
            setScreen(id);
          } else if (id === 'equipment' || id === 'modules') {
            setScreen('dashboard');
            setTimeout(() => document.getElementById('cs-modlist')?.scrollIntoView({ behavior: 'smooth' }), 50);
          } else if (id === 'contact') {
            backToDash();
            setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 60);
          }
        }}
      />

      {role === 'admin' && <AdminPortal liveCompleted={completed} liveStats={quizStats} liveName={workerName}/>}

      {role === 'worker' && screen === 'dashboard' && (
        <Dashboard
          progress={progress}
          completedIds={completed}
          currentId={currentId}
          workerName={workerName}
          quizStats={quizStats}
          onOpenModule={openModule}
          onOpenFinal={() => { setScreen('final'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
        />
      )}

      {role === 'worker' && screen === 'module' && (
        <ModuleView
          moduleId={moduleId}
          onBack={backToDash}
          onComplete={(id, result) => { completeModule(id, result); }}
        />
      )}

      {role === 'worker' && screen === 'final' && (
        <FinalExam
          onBack={backToDash}
          onCertified={() => { setScreen('certified'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
        />
      )}

      {role === 'worker' && screen === 'certified' && (
        <Certified workerName={workerName} onSign={certify} onBack={backToDash}/>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
