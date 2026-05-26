// FinalExam.jsx — 35 (here: 8 representative) scenario questions, 100% to pass

function FinalExam({ onBack, onCertified }) {
  const [answers, setAnswers] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  function pick(qi, ai) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [qi]: ai }));
  }

  function submit() {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const allAnswered = Object.keys(answers).length === FINAL_EXAM.length;
  const correct = FINAL_EXAM.filter((q, i) => answers[i] === q.correct).length;
  const passed = correct === FINAL_EXAM.length;

  return (
    <div className="cs-page cs-page--narrow">
      <div className="cs-modtop">
        <div className="cs-modtop__crumbs"><a onClick={onBack}>Dashboard</a><span>›</span><span style={{ color: 'var(--paper)' }}>Final Exam</span></div>
        <div className="cs-modtop__num">Certification · {FINAL_EXAM.length} questions</div>
        <h1 className="cs-modtop__title">Final Exam.</h1>
        <p className="cs-modtop__sub">Scenario questions across every module. 100% to certify. You can re-take after a 24-hour cool-down.</p>
        <div className="cs-modtop__meta">
          <span><ModuleIcon name="clock" size={14}/> ~25 min · timed</span>
          <span><ModuleIcon name="award" size={14}/> 100% to pass</span>
        </div>
      </div>

      {submitted ? (
        <div className={`cs-quiz__feedback ${passed ? 'cs-quiz__feedback--right' : 'cs-quiz__feedback--wrong'}`} style={{ marginTop: 0, marginBottom: 24 }}>
          <div className="cs-quiz__feedback-label">
            {passed ? `Passed · ${correct}/${FINAL_EXAM.length}` : `Not yet · ${correct}/${FINAL_EXAM.length}`}
          </div>
          <div className="cs-quiz__feedback-body">
            {passed
              ? "Right on every question. Sign the attestation to finish certification."
              : "100% required. Review the questions marked wrong below, brush up on the modules, then re-take after 24 hours."}
          </div>
          {passed ? (
            <div className="cs-quiz__feedback-actions">
              <Button variant="primary" iconRight="arrow-right" onClick={onCertified}>Continue to certification</Button>
            </div>
          ) : null}
        </div>
      ) : null}

      {FINAL_EXAM.map((q, qi) => (
        <div key={qi} className="cs-quiz" style={{ marginBottom: 16 }}>
          <div className="cs-quiz__eyebrow">Question {qi + 1} of {FINAL_EXAM.length}</div>
          <div className="cs-quiz__q">{q.q}</div>
          <div className="cs-quiz__opts">
            {q.opts.map((opt, ai) => {
              let state = '';
              if (submitted) {
                if (ai === q.correct) state = 'is-correct';
                else if (ai === answers[qi]) state = 'is-wrong';
              } else if (ai === answers[qi]) state = 'is-selected';
              return (
                <button
                  key={ai}
                  className={`cs-quiz__opt ${state}`}
                  onClick={() => pick(qi, ai)}
                  disabled={submitted}
                >
                  <span className="cs-quiz__letter">{String.fromCharCode(65 + ai)}</span>
                  <span className="cs-quiz__text">{opt}</span>
                  {submitted && ai === q.correct ? <ModuleIcon name="check" size={20}/> : null}
                  {submitted && ai === answers[qi] && ai !== q.correct ? <ModuleIcon name="x" size={20}/> : null}
                </button>
              );
            })}
          </div>
          {submitted && answers[qi] !== q.correct ? (
            <div className="cs-quiz__feedback cs-quiz__feedback--wrong" style={{ marginTop: 14 }}>
              <div className="cs-quiz__feedback-label">Remediation</div>
              <div className="cs-quiz__feedback-body">{q.remediation}</div>
            </div>
          ) : null}
        </div>
      ))}

      {!submitted ? (
        <div className="cs-modfoot">
          <Button variant="secondary" icon="arrow-left" onClick={onBack}>Back</Button>
          <Button variant="primary" size="lg" disabled={!allAnswered} iconRight="arrow-right" onClick={submit}>
            {allAnswered ? 'Submit exam' : `Answer all ${FINAL_EXAM.length} questions to submit`}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

window.FinalExam = FinalExam;
