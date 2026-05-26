// Quiz.jsx — 3-question check with auto-return on wrong + retry format on second attempt

function Quiz({ questions, isRetry, onDone, onBackToBody }) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [revealed, setRevealed] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [countdown, setCountdown] = React.useState(null);

  // Use alt question format on retry if available
  const raw = questions[i];
  const q = isRetry && raw.alt
    ? { ...raw, q: raw.alt.q, opts: raw.alt.opts, correct: raw.alt.correct }
    : raw;

  function pick(idx) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === q.correct) setScore(s => s + 1);
  }

  function next() {
    if (i + 1 >= questions.length) {
      onDone(score + (selected === q.correct ? 1 : 0), questions.length);
      return;
    }
    setI(i + 1);
    setSelected(null);
    setRevealed(false);
    setCountdown(null);
  }

  // Auto-navigate back to reading on wrong answer after countdown
  React.useEffect(() => {
    if (!revealed || selected === q.correct) { setCountdown(null); return; }
    setCountdown(3);
    const iv = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(iv); onBackToBody(); return null; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [revealed]);

  return (
    <div className="cs-quiz">
      {isRetry && (
        <div className="cs-quiz__retry-banner">
          <ModuleIcon name="book-open" size={14}/>
          <span>Retry — questions in a different format this time</span>
        </div>
      )}

      <div className="cs-quiz__progress">
        {questions.map((_, idx) => (
          <div key={idx} className={idx < i ? 'is-done' : idx === i ? 'is-active' : ''}/>
        ))}
      </div>

      <div className="cs-quiz__eyebrow">Knowledge Check · Q{i + 1} of {questions.length}</div>
      <div className="cs-quiz__q">{q.q}</div>

      <div className="cs-quiz__opts">
        {q.opts.map((opt, idx) => {
          let state = '';
          if (revealed) {
            if (idx === q.correct) state = 'is-correct';
            else if (idx === selected) state = 'is-wrong';
          } else if (idx === selected) state = 'is-selected';
          return (
            <button
              key={idx}
              className={`cs-quiz__opt ${state}`}
              onClick={() => pick(idx)}
              disabled={revealed}
            >
              <span className="cs-quiz__letter">{String.fromCharCode(65 + idx)}</span>
              <span className="cs-quiz__text">{opt}</span>
              {revealed && idx === q.correct ? <ModuleIcon name="check" size={20}/> : null}
              {revealed && idx === selected && idx !== q.correct ? <ModuleIcon name="x" size={20}/> : null}
            </button>
          );
        })}
      </div>

      {revealed ? (
        <div className={`cs-quiz__feedback ${selected === q.correct ? 'cs-quiz__feedback--right' : 'cs-quiz__feedback--wrong'}`}>
          <div className="cs-quiz__feedback-label">
            {selected === q.correct ? 'Right.' : 'Not quite.'}
          </div>
          <div className="cs-quiz__feedback-body">{raw.remediation}</div>
          {selected !== q.correct ? (
            <div className="cs-quiz__back-notice">
              <div className="cs-quiz__back-countdown" style={{ width: `${(countdown / 3) * 100}%` }}/>
              <span>
                Taking you back to review in {countdown}s —{' '}
                <button className="cs-quiz__back-now" onClick={() => { setCountdown(null); onBackToBody(); }}>
                  go now
                </button>
              </span>
            </div>
          ) : (
            <div className="cs-quiz__feedback-actions">
              <Button variant="primary" iconRight="arrow-right" onClick={next}>
                {i + 1 >= questions.length ? 'Finish check' : 'Next question'}
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

window.Quiz = Quiz;
