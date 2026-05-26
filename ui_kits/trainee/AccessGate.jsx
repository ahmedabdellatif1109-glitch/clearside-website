// AccessGate.jsx — code-entry screen

function AccessGate({ onEnter }) {
  const [step, setStep] = React.useState('code'); // 'code' | 'name'
  const [code, setCode] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function submitCode(e) {
    e?.preventDefault();
    const c = code.trim().toUpperCase();
    if (!c) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (c === 'CSEWINDOWS') { setError(''); setStep('name'); }
      else if (c === 'CSEADMIN') { setError(''); onEnter('admin', ''); }
      else setError("That code doesn't match. Ask Ahmed (224) 504-4650 if you've lost yours.");
    }, 480);
  }

  function submitName(e) {
    e?.preventDefault();
    const n = name.trim();
    if (!n) { setError('Enter your name to continue.'); return; }
    onEnter('worker', n);
  }

  if (step === 'name') {
    return (
      <div className="cs-gate">
        <form className="cs-gate__card cs-gate__card--animate" onSubmit={submitName}>
          <div className="cs-gate__brand">
            <img src="../../assets/logo/clearside-full-transparent.png" alt="ClearSide Exteriors"/>
          </div>
          <div className="cs-gate__title">What's your name?</div>
          <div className="cs-gate__sub">Your name will appear on your certification when you finish.</div>

          <div style={{ marginTop: 28 }}>
            <div className="cs-gate__label">Full Name</div>
            <input
              className={`cs-gate__input ${error ? 'cs-gate__input--error' : ''}`}
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="First Last"
              autoFocus
            />
            {error ? <div className="cs-gate__error cs-gate__error--animate">{error}</div> : null}
          </div>

          <Button variant="primary" size="lg" onClick={submitName} type="submit">
            <span style={{ width: '100%', textAlign: 'center' }}>Start Training</span>
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="cs-gate">
      <form className="cs-gate__card cs-gate__card--animate" onSubmit={submitCode}>
        <div className="cs-gate__brand">
          <img src="../../assets/logo/clearside-full-transparent.png" alt="ClearSide Exteriors"/>
        </div>
        <div className="cs-gate__title">Technician Onboarding</div>
        <div className="cs-gate__sub">Enter your access code to start training.</div>

        <div style={{ marginTop: 28 }}>
          <div className="cs-gate__label">Access Code</div>
          <input
            className={`cs-gate__input ${error ? 'cs-gate__input--error' : ''}`}
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            placeholder="••••••••••"
            autoFocus
          />
          {error ? <div className="cs-gate__error cs-gate__error--animate">{error}</div> : null}
        </div>

        <Button variant="primary" size="lg" onClick={submitCode} type="submit" disabled={loading}>
          <span style={{ width: '100%', textAlign: 'center' }}>
            {loading ? 'Verifying…' : 'Continue'}
          </span>
        </Button>
      </form>
    </div>
  );
}

window.AccessGate = AccessGate;
