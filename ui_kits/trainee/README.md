# Trainee — UI Kit

The learner-facing onboarding web app. Pixel + interaction recreation of the real **ClearSide Training App** state machine:

```
Access Gate → Welcome → Dashboard → Module → Quiz → Final Exam → Certified
```

Open `index.html` and try:
- enter `CSEWINDOWS` at the gate to enter the worker flow (or `CSEADMIN` for the admin portal)
- click a module card to open it
- scroll through the procedure, take the 3-question quiz, get an answer wrong to see "Take me to that section"
- complete all 7 modules to unlock the final exam
- finish certification with the honesty attestation

## Components
- `app.jsx` — root state machine + screen routing
- `AccessGate.jsx` — code entry
- `TopNav.jsx` — navy top nav with progress + tech badge
- `Dashboard.jsx` — hero banner, stats, sequential module grid, locked final exam, owner-contact card
- `ModuleCard.jsx` — sequential card with status / lock
- `ModuleView.jsx` — module body: step list, callouts, product-in-context, water-flow diagram (where relevant)
- `Quiz.jsx` — 3 scenario questions per module + "Take me to that section" on wrong
- `FinalExam.jsx` — 35 questions, 100% required
- `Certified.jsx` — congrats + attestation + downloadable cert stub
- `AdminPortal.jsx` — CSEADMIN view: total / certified / in-progress / not-started counts
- `Atoms.jsx` — Button, Chip, Callout, ProgressBar, ModuleIcon
- `WaterFlowDiagram.jsx` — inline React-element SVG (compile-safe) of the spigot → brush water path

## Conventions
- Components register on `window` (Babel script files don't share scope).
- All SVG is inline React elements — no `data:image/svg+xml;base64,…` (will be stripped by the real app's Babel compile step).
- All copy follows `CONTENT FUNDAMENTALS` voice rules in the root README.
