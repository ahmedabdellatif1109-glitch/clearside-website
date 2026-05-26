// ModuleView.jsx — module body + quiz
// Each module renders custom content; the quiz pattern is shared.

function ModuleView({ moduleId, onBack, onComplete }) {
  const mod = MODULES.find(m => m.id === moduleId);
  const colors = ACCENT_COLORS[mod.accent];
  const [stage, setStage] = React.useState('body'); // 'body' | 'quiz' | 'done'
  const [quizAttempt, setQuizAttempt] = React.useState(0);
  const titleColorClass = mod.accent === 'sky' ? 'cs-h2--sky' : mod.accent === 'salmon' || mod.accent === 'gold' ? 'cs-h2--salmon' : 'cs-h2--navy';

  const Body = MODULE_BODIES[moduleId] || (() => <p className="cs-body">Module content placeholder.</p>);
  const quiz = QUIZZES[moduleId] || [];

  function handleBackToBody() {
    setQuizAttempt(a => a + 1);
    setStage('body');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleQuizDone(correct, total) {
    onComplete(moduleId, { correct, total });
    setStage('done');
  }

  return (
    <div className="cs-page cs-page--narrow">
      <div className="cs-modtop" style={{ background: stage === 'done' ? colors.raw : 'var(--navy)' }}>
        <div className="cs-modtop__crumbs">
          <a onClick={onBack}>Dashboard</a>
          <span>›</span>
          <span style={{ color: 'var(--paper)' }}>{mod.title}</span>
        </div>
        <div className="cs-modtop__num">{mod.eyebrow}</div>
        <h1 className="cs-modtop__title">{mod.title}</h1>
        <p className="cs-modtop__sub">{mod.desc}</p>
        <div className="cs-modtop__meta">
          <span><ModuleIcon name="clock" size={14}/> ~{mod.minutes} min</span>
          <span><ModuleIcon name="list-checks" size={14}/> {mod.steps} steps</span>
          <span><ModuleIcon name="triangle-alert" size={14}/> 3-question check</span>
        </div>
      </div>

      {stage === 'body' && (
        <>
          {quizAttempt > 0 && (
            <div className="cs-modview__retry-notice">
              <ModuleIcon name="arrow-left" size={14}/>
              <span>Sent back to review — read through and try again when ready.</span>
            </div>
          )}
          <Body titleColorClass={titleColorClass}/>
          <div className="cs-modfoot">
            <Button variant="secondary" icon="arrow-left" onClick={onBack}>Back to dashboard</Button>
            <Button variant="primary" iconRight="arrow-right" onClick={() => setStage('quiz')}>
              {quizAttempt > 0 ? 'Retry the check' : 'Take the 3-question check'}
            </Button>
          </div>
        </>
      )}

      {stage === 'quiz' && (
        <Quiz
          questions={quiz}
          isRetry={quizAttempt > 0}
          onDone={handleQuizDone}
          onBackToBody={handleBackToBody}
        />
      )}

      {stage === 'done' && (
        <div style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 99,
            background: 'var(--go-bg)', color: 'var(--go)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 18,
          }}>
            <ModuleIcon name="check" size={40}/>
          </div>
          <h2 style={{ font: '400 32px/1.1 var(--font-display)', color: 'var(--ink-1)', margin: '0 0 8px' }}>
            Module complete.
          </h2>
          <p style={{ font: '400 16px/1.5 var(--font-body)', color: 'var(--ink-3)', maxWidth: 480, margin: '0 auto 24px' }}>
            Logged. The next module is unlocked.
          </p>
          <div style={{ display: 'inline-flex', gap: 10 }}>
            <Button variant="secondary" icon="arrow-left" onClick={onBack}>Back to dashboard</Button>
            <Button variant="primary" iconRight="arrow-right" onClick={onBack}>Continue training</Button>
          </div>
        </div>
      )}
    </div>
  );
}

window.ModuleView = ModuleView;

// ============================================================
// Module bodies — actual content per module
// ============================================================

const MODULE_BODIES = {
  equipment: ({ titleColorClass }) => {
    const [tdsUnlocked, setTdsUnlocked] = React.useState(false);

    return (
      <div>
        <h2 className={`cs-h2 ${titleColorClass}`}>What you carry, end to end.</h2>
        <p className="cs-body">
          Every job starts with the same setup. The chain matters — get one link wrong and your TDS reads over 10 PPM, or your hose pops in the customer's driveway.
        </p>

        <EquipmentGrid/>

        <h2 className={`cs-h2 ${titleColorClass}`}>How the water flows.</h2>
        <p className="cs-body">
          Tap water enters the DI tank dirty, comes out pure. The diagram below traces the chain from the home spigot all the way to the brush head on the pole.
        </p>

        <WaterFlowDiagram/>

        <h2 className={`cs-h2 ${titleColorClass}`}>The five connections.</h2>
        <p className="cs-body">
          Female garden-hose end to the home spigot. Male end to the DI tank inlet. Quick-connect from the tank outlet to the WFP hose. WFP hose into the pole. Brush onto the gooseneck. Always in that order.
        </p>

        <Callout kind="tip" label="Tip">
          <strong>First connection always.</strong> Hand-tighten the female end on the spigot before you uncoil anything else. A loose spigot connection sprays you for the rest of the job.
        </Callout>

        <h2 className={`cs-h2 ${titleColorClass}`}>Read the TDS at the outlet.</h2>
        <p className="cs-body">
          TDS means <em>total dissolved solids</em> — how much dissolved mineral is left in the water after the resin filters it. Pure water reads <strong>0 PPM</strong>. Here's what each reading means on the job:
        </p>
        <ul className="cs-tds-bands">
          <li><span className="cs-tds-band cs-tds-band--perfect">0 PPM</span>Pure water. Glass dries perfectly clear — no effort.</li>
          <li><span className="cs-tds-band cs-tds-band--good">1–9 PPM</span>Completely fine. This is your normal working range — start the job.</li>
          <li><span className="cs-tds-band cs-tds-band--caution">10 PPM</span>Give each pane an extra rinse pass. Text Ahmed or your tech manager your reading.</li>
          <li><span className="cs-tds-band cs-tds-band--warn">11+ PPM</span>Rinse every pane with <strong>at least two full top-down passes</strong>. DI tanks take about a week to ship — thorough rinsing is your field tool. Notify Ahmed.</li>
        </ul>
        <p className="cs-body">
          Use the arrows on the meter below to scrub through readings and see what each band means. Push past 10 to see the field guidance — the rest of the lesson unlocks once you do.
        </p>

        <TDSMeter onSawFailure={() => setTdsUnlocked(true)}/>

        <div className={`cs-gated ${tdsUnlocked ? '' : 'is-locked'}`}>
          <h2 className={`cs-h2 ${titleColorClass}`}>If a hose bursts mid-job.</h2>
          <ol style={{ paddingLeft: 24, font: '400 16px/1.55 var(--font-body)', color: 'var(--ink-2)' }}>
            <li>Shut the spigot. Don't try to find the leak with water still running.</li>
            <li>Cut <strong>one inch</strong> on each side of the puncture with the utility knife in your tool bag.</li>
            <li>Rejoin the two clean ends with the <strong>barbed hose coupler</strong> from your tool bag. Push hard until it seats.</li>
            <li>Turn the spigot back on at quarter pressure and check the seam before you bring the line back up.</li>
          </ol>

          <Callout kind="caution">
            Don't try to splice with electrical tape or zip-ties. You'll be back on the ground in five minutes. Always carry two spare couplers.
          </Callout>

          {!tdsUnlocked ? (
            <div className="cs-gated__overlay">
              <div className="cs-gated__msg">
                <div className="cs-gated__msg-title">Section locked</div>
                Scroll the TDS meter past <strong>10 PPM</strong> to see what a failed reading looks like. The next section unlocks when you do.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  },

  wfp: ({ titleColorClass }) => (
    <div>
      <h2 className={`cs-h2 ${titleColorClass}`}>The order is the order.</h2>
      <p className="cs-body">
        Water-fed pole work cleans top-down inside the window's frame. The sequence below isn't a suggestion — work out of order and you'll redeposit dirt onto glass you already cleaned.
      </p>

      <div className="cs-seq">
        <div className="cs-seq__step"><div className="cs-seq__num">01</div><div className="cs-seq__label">Frames</div></div>
        <div className="cs-seq__step"><div className="cs-seq__num">02</div><div className="cs-seq__label">Sills</div></div>
        <div className="cs-seq__step"><div className="cs-seq__num">03</div><div className="cs-seq__label">Glass</div></div>
        <div className="cs-seq__step cs-seq__step--final"><div className="cs-seq__num">04</div><div className="cs-seq__label">Rinse down</div></div>
      </div>

      <h2 className={`cs-h2 ${titleColorClass}`}>How to brush.</h2>
      <p className="cs-body">
        Bristles flat against the surface. Light pressure — the water and the friction of the bristles do the work. Long even strokes, top to bottom, slight overlap on each pass.
      </p>

      <ProductInContext
        photoSrc="../../assets/equipment-photos/wfp-system.jpeg"
        photoLabel="30 ft carbon-fiber pole · hybrid brush"
        eyebrow="Pole &amp; brush"
        title="One brush, one head."
        desc="The brush head is a nylon and boars-hair hybrid — you don't swap it out for different surfaces. Same brush does frames, sills, and glass."
        tags={[{ t: 'HYBRID BRUSH', kind: 'info' }, { t: 'CARBON FIBER 30 FT', kind: 'info' }, { t: 'GOOSENECK', kind: 'accent' }]}
      />

      <h2 className={`cs-h2 ${titleColorClass}`}>Rinse pattern.</h2>
      <p className="cs-body">
        After the glass is scrubbed clean, hold the brush head <strong>2–3 inches off the glass</strong> for the final rinse — close enough that the pure water sheets evenly down the pane, far enough that the bristles don't drag. Top-down across the full width.
      </p>
      <p className="cs-body">
        That's it — once the rinse pass is done, walk away. The DI water dries spot-free on its own.
      </p>

      <Callout kind="stop">
        <strong>Don't squeegee a WFP-cleaned window.</strong> Squeegeeing is for interior or super-dirty traditional jobs. On WFP exteriors the deionized water dries spot-free — a squeegee just adds streaks.
      </Callout>
    </div>
  ),

  special: ({ titleColorClass }) => (
    <div>
      <h2 className={`cs-h2 ${titleColorClass}`}>When water alone won't do it.</h2>
      <p className="cs-body">
        Two scenarios cost extra time and extra product: hard-water mineral build-up, and oxidized frames. Both have a procedure. Both need customer sign-off before you touch them.
      </p>

      <h2 className={`cs-h2 ${titleColorClass}`}>Hard water — acidic-solution procedure.</h2>
      <p className="cs-body">
        Acidic solution comes in a spray bottle, one per tech. Don't discuss the ingredients with the customer — just call it the acidic solution.
      </p>
      <ol style={{ paddingLeft: 24, font: '400 16px/1.55 var(--font-body)', color: 'var(--ink-2)' }}>
        <li>Spray the acidic solution on the hybrid brush — <strong>2 to 3 sprays</strong>, never on the glass directly.</li>
        <li><strong>Scrub the glass only</strong> with the wet brush. Stay off the frame and sill with this solution.</li>
        <li>Let it sit <strong>5–15 seconds</strong>. Closer to <strong>5 seconds in direct sun</strong> (it dries fast), closer to 15 if the window is shaded.</li>
        <li>Rinse the pane fully with deionized water through the WFP.</li>
        <li>Clean the acidic solution out of the brush — work the bristles under the running DI water until the solution is gone. Leaving it in the brush eats the bristles.</li>
        <li>Scrub the window once more and rinse it again with DI water.</li>
      </ol>

      <Callout kind="caution">
        <strong>$3+ per window in upcharges.</strong> Always confirm with the customer before you start. Show them a "before" pane and a "this'll cost more" pane.
      </Callout>

      <h2 className={`cs-h2 ${titleColorClass}`}>Frame oxidation.</h2>
      <p className="cs-body">
        Painted aluminum frames chalk over time. The chalk runs down onto the glass when you wet them. If you rinse oxidized chalk down before it's fully scrubbed off, you'll streak every pane below.
      </p>
      <Callout kind="stop">
        Scrub the frame until the runoff is <strong>completely clear</strong>. Only then move to the glass.
      </Callout>
    </div>
  ),

  screens: ({ titleColorClass }) => (
    <div>
      <h2 className={`cs-h2 ${titleColorClass}`}>Label everything as you pull it.</h2>
      <p className="cs-body">
        Screens come out before any cleaning starts. Screens vary house to house — second-floor screens may be different from first. <strong>Painters tape + Sharpie</strong> as you go: room, window position (L / R / center). Stand them upright against the side of the house, never lay them flat.
      </p>

      <Callout kind="caution">
        <strong>A second-floor screen won't come out.</strong> If the customer is watching, ask them — "do you know the trick for this one?" Most homeowners have pulled their own screens before and know what holds them in. If they don't, note it on the job sheet and move on. Never force it; bent frames are on us.
      </Callout>

      <h2 className={`cs-h2 ${titleColorClass}`}>Clean them once they're all out.</h2>
      <ol style={{ paddingLeft: 24, font: '400 16px/1.55 var(--font-body)', color: 'var(--ink-2)' }}>
        <li>Stage screens in the yard or driveway — never in a flowerbed.</li>
        <li>Fill the bucket with water and <strong>2–3 seconds of Dawn dish soap</strong>. Put one line of soap on each side of the mop and rub it in.</li>
        <li>Scrub every part of the screen with the mop. Don't miss the corners.</li>
        <li>Rinse the screen with the garden hose.</li>
        <li>Detail the frame with the surgical towel from your tool bag.</li>
        <li>Stand it upright in the sun. Reinstall it when you reach that window — the glass doesn't have to be fully dry first.</li>
      </ol>

      <ProductInContext
        photoSrc="../../assets/equipment-photos/tool-bag.jpg"
        photoLabel="Tool bag · screen pry inside"
        eyebrow="Screen pry"
        title="The flat end goes under the corner tab."
        desc="For first-floor screens taken from outside. Never pry against the screen mesh — only against the frame corner. One in each tool bag."
      />
    </div>
  ),

  traditional: ({ titleColorClass }) => (
    <div>
      <h2 className={`cs-h2 ${titleColorClass}`}>When you use traditional, not WFP.</h2>
      <p className="cs-body">
        Mop and squeegee is the <strong>interior</strong> setup. The only time it comes out on an exterior is when a window is so dirty that the WFP alone can't break the grime — then you switch to mop, squeegee, and walnut pad.
      </p>

      <h2 className={`cs-h2 ${titleColorClass}`}>The traditional sequence.</h2>
      <ol style={{ paddingLeft: 24, font: '400 16px/1.55 var(--font-body)', color: 'var(--ink-2)' }}>
        <li>Fill the bucket <strong>one-third with water and soap</strong>. Bring it in with the mop, dish soap, and squeegee.</li>
        <li>Remove excess water from the mop over the bucket.</li>
        <li>Scrub the window with the mop.</li>
        <li>Detail the top, right, and left edges of the glass with the surgical towel.</li>
        <li>Squeegee using the fanning method. Wipe the rubber on the surgical towel after every stroke.</li>
        <li>Detail the bottom of the glass with the surgical towel again.</li>
        <li>Quickly wipe down the sill.</li>
      </ol>

      <h2 className={`cs-h2 ${titleColorClass}`}>The fanning pattern.</h2>
      <p className="cs-body">
        Start the squeegee in the top corner, angle the rubber, sweep across in one continuous arc to the opposite side, lift, restart slightly overlapping the previous stroke. <strong>Wipe the rubber on the surgical towel after every stroke</strong>.
      </p>

      <Callout kind="tip">
        After you finish a window, step back and look at it from an angle in natural light. Streaks only show off-axis.
      </Callout>

      <ProductInContext
        photoSrc="../../assets/equipment-photos/squeegee.jpeg"
        photoLabel="12 in. squeegee"
        eyebrow="Squeegee"
        title="One channel, replaceable rubber."
        desc="Lives in the bucket. A nicked rubber leaves a single hairline streak every stroke — carry a spare in your tool bag."
      />

      <ProductInContext
        photoSrc="../../assets/equipment-photos/mop-applicator.webp"
        photoLabel="Mop applicator + squeegee combo"
        eyebrow="Mop"
        title="Apply, don't soak."
        desc="Dip the sleeve, wring it out over the bucket once, then work the pane top-down. Too much solution drips into the sill before you can squeegee."
      />

      <ProductInContext
        photoSrc="../../assets/equipment-photos/walnut-pad.webp"
        photoLabel="Walnut pad in use"
        eyebrow="Walnut pad"
        title="Only after the mop. Only when it's needed."
        desc="Use the walnut pad after the mop with soap, and only on super-dirty windows or interior windows that the mop alone couldn't fully clean. Light pressure — press hard and you'll mark the pane. If a walnut pad still can't lift it, reach for the paint scraper."
      />

      <ProductInContext
        photoSrc="../../assets/equipment-photos/surgical-towel.jpeg"
        photoLabel="Surgical towel detailing a frame"
        eyebrow="Surgical towel"
        title="Wipe between every stroke."
        desc="Surgical towels are lint-free — the only thing that touches finished glass. Carry at least two; one will soak through by the third window."
      />

      <Callout kind="tip">
        <strong>Paint scraper, wet only.</strong> If a walnut pad still won't get a stubborn speck off, use the paint scraper from your tool bag — in <strong>one direction only</strong>, on a wet window. Never dry, never back-and-forth.
      </Callout>
    </div>
  ),

  order: ({ titleColorClass }) => (
    <div>
      <h2 className={`cs-h2 ${titleColorClass}`}>Most jobs are solo.</h2>
      <p className="cs-body">
        Roughly <strong>90% of routes are one-tech</strong>. You'll be by yourself, running the exterior WFP setup. Only when a job is interior + exterior does it become two-tech — that's about <strong>10%</strong> of what we do.
      </p>

      <h2 className={`cs-h2 ${titleColorClass}`}>Exterior, no screens (the default).</h2>
      <p className="cs-body">
        Connect everything in this order, every time — it's the basis for all exterior work.
      </p>
      <ol style={{ paddingLeft: 24, font: '400 16px/1.55 var(--font-body)', color: 'var(--ink-2)' }}>
        <li>Female end of the garden hose to the home spigot.</li>
        <li>Male end of the garden hose to the DI tank inlet.</li>
        <li>WFP hose into the tank outlet via the quick connect.</li>
        <li>Other end of the WFP hose to the pole + brush.</li>
      </ol>
      <p className="cs-body">
        Then start in the <strong>back</strong>, do the sides, finish at the <strong>front</strong>. Side order is your call — whichever you think will go faster.
      </p>

      <h2 className={`cs-h2 ${titleColorClass}`}>Exterior + screens.</h2>
      <ol style={{ paddingLeft: 24, font: '400 16px/1.55 var(--font-body)', color: 'var(--ink-2)' }}>
        <li>Pull every screen first, labeled as you go.</li>
        <li>Clean the screens.</li>
        <li>Clean the windows with the WFP (back → sides → front).</li>
        <li>Reinstall screens as you finish each window.</li>
      </ol>

      <h2 className={`cs-h2 ${titleColorClass}`}>Two-tech: interior + exterior (the 10%).</h2>
      <ol style={{ paddingLeft: 24, font: '400 16px/1.55 var(--font-body)', color: 'var(--ink-2)' }}>
        <li>Both techs pull every screen, label as you go.</li>
        <li>Both clean screens in the yard.</li>
        <li><strong>Split.</strong> One tech inside (traditional mop &amp; squeegee). One outside (WFP, back → sides → front).</li>
        <li>Reinstall screens at the end.</li>
      </ol>

      <Callout kind="tip">
        <strong>First floor outside, upper floors inside.</strong> Second-floor exteriors are the WFP's whole point — don't waste the setup running interiors only.
      </Callout>
    </div>
  ),

  customer: ({ titleColorClass }) => (
    <div>
      <h2 className={`cs-h2 ${titleColorClass}`}>Before you uncoil anything.</h2>
      <p className="cs-body">
        Ring the bell. Introduce yourself. Restate how we clean — <em>"DI tank on the ground, brush on the water-fed pole, no ladders."</em> Confirm scope, gate codes, dogs, parking. Three minutes here saves a phone call later.
      </p>

      <h2 className={`cs-h2 ${titleColorClass}`}>The walk-around.</h2>
      <p className="cs-body">
        After every job, walk the property with the customer. Make sure it's up to their standard. Walk the property once more on your own to make sure you didn't leave anything behind.
      </p>

      <h2 className={`cs-h2 ${titleColorClass}`}>The subscription pitch.</h2>
      <Callout kind="tip" label="Script">
        "We'll be in the neighborhood twice a year. If we can fit you in next time, we'll take $50 off each visit. Want me to put you on the route?"
      </Callout>

      <h2 className={`cs-h2 ${titleColorClass}`}>What you make.</h2>
      <p className="cs-body">
        <strong>20% commission</strong> on every subscription you sell.
      </p>
      <p className="cs-body">
        <strong>30% commission</strong> on any additional service (pressure-wash, gutter clean, etc.) that you <strong>set up AND close</strong> yourself. Plans we offer: Bi-Yearly 15% off, Yearly 10% off, Quarterly / Tri-annual 20% off.
      </p>
    </div>
  ),
};

window.MODULE_BODIES = MODULE_BODIES;

// Helper component
function ProductInContext({ photoSrc, photoLabel, eyebrow, title, desc, tags }) {
  return (
    <div className="cs-product">
      <div className="cs-product__photo">
        <span className="cs-product__photo-label">{photoLabel}</span>
        <img src={photoSrc} alt=""/>
      </div>
      <div>
        <div className="cs-product__num">{eyebrow}</div>
        <div className="cs-product__title">{title}</div>
        <div className="cs-product__desc">{desc}</div>
        {tags ? (
          <div className="cs-product__tags">
            {tags.map((t, i) => <span key={i} className={`cs-product__tag ${t.kind === 'accent' ? 'cs-product__tag--accent' : ''}`}>{t.t}</span>)}
          </div>
        ) : null}
      </div>
    </div>
  );
}
window.ProductInContext = ProductInContext;
