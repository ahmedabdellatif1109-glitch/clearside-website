// Certified.jsx — certification screen with honesty attestation

function Certified({ workerName, onSign, onBack }) {
  const [att1, setAtt1] = React.useState(false);
  const [att2, setAtt2] = React.useState(false);
  const [att3, setAtt3] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [signedAt, setSignedAt] = React.useState(null);

  const allChecked = att1 && att2 && att3;
  const displayName = workerName || 'Tech';

  const nameUpper = displayName.toUpperCase();

  function handleSign() {
    const now = new Date();
    setSignedAt(now);
    setSigned(true);
    if (onSign) onSign();
  }

  function formatDateTime(d) {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
      + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
  }

  function certId() {
    const now = signedAt || new Date();
    return `CERT-CSE-${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
  }

  if (signed) {
    return (
      <div className="cs-page cs-page--narrow">
        <div className="cs-cert">
          <div className="cs-cert__seal"><ModuleIcon name="award" size={64}/></div>
          <div className="cs-cert__eyebrow">Certification Complete</div>
          <h1 className="cs-cert__title">You're certified.</h1>
          <p className="cs-cert__sub">
            Welcome to the route. Ahmed gets a notification when you finish — expect a text about your first shift within 24 hours.
          </p>
          <div className="cs-cert__meta">
            {certId()} · {nameUpper} · SIGNED {formatDateTime(signedAt || new Date())}
          </div>
          <div style={{ display: 'inline-flex', gap: 10, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="secondary" icon="arrow-left" onClick={onBack}>Back to dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cs-page cs-page--narrow">
      <div className="cs-cert" style={{ paddingBottom: 30 }}>
        <div className="cs-cert__seal" style={{ background: 'var(--go)', boxShadow: '0 6px 18px rgba(46,139,90,.35)' }}>
          <ModuleIcon name="check" size={56}/>
        </div>
        <div className="cs-cert__eyebrow">Exam passed · final step</div>
        <h1 className="cs-cert__title">Sign the attestation.</h1>
        <p className="cs-cert__sub">
          One more thing before we activate your tech ID. Confirm the following — these are legal acknowledgments and they are kept on file.
        </p>
      </div>

      <div className="cs-attest">
        <div className="cs-attest__title">Honesty &amp; conduct attestation</div>
        <div className={`cs-attest__row ${att1 ? 'is-checked' : ''}`} onClick={() => setAtt1(!att1)}>
          <span className="cs-attest__box">{att1 ? <ModuleIcon name="check" size={14}/> : null}</span>
          <span className="cs-attest__text">
            I completed this training <strong>on my own</strong>, without outside help, looking up answers, or sharing answers with anyone. I'm ready to work a route.
          </span>
        </div>
        <div className={`cs-attest__row ${att2 ? 'is-checked' : ''}`} onClick={() => setAtt2(!att2)}>
          <span className="cs-attest__box">{att2 ? <ModuleIcon name="check" size={14}/> : null}</span>
          <span className="cs-attest__text">
            I understand that a failed customer outcome (broken screen, damaged frame, customer complaint about workmanship) can be grounds for re-training or termination at ClearSide's discretion.
          </span>
        </div>
        <div className={`cs-attest__row ${att3 ? 'is-checked' : ''}`} onClick={() => setAtt3(!att3)}>
          <span className="cs-attest__box">{att3 ? <ModuleIcon name="check" size={14}/> : null}</span>
          <span className="cs-attest__text">
            I will follow the procedures in this training as written, including TDS checks, customer confirmations before hard-water upcharges, and the screen-labeling protocol — even when no one is watching.
          </span>
        </div>
        <div className="cs-attest__sig">
          By signing, I, {nameUpper}, acknowledge the above. IP and timestamp are recorded with this signature.
        </div>
      </div>

      <div className="cs-modfoot">
        <Button variant="secondary" icon="arrow-left" onClick={onBack}>Back to dashboard</Button>
        <Button variant="primary" size="lg" iconRight="arrow-right" disabled={!allChecked} onClick={handleSign}>
          {allChecked ? 'Sign and certify' : 'Check all three to continue'}
        </Button>
      </div>
    </div>
  );
}

window.Certified = Certified;
