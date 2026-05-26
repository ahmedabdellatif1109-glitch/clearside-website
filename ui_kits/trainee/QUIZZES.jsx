// QUIZZES.jsx — 3 scenario questions per module + final exam excerpt
// Each question has an `alt` version shown on retry (different format / wording).

const QUIZZES = {
  equipment: [
    {
      q: "Mid-job, the WFP hose pops 40 feet from the spigot. What's the field repair?",
      opts: [
        "Wrap the puncture in electrical tape and finish the job.",
        "Cut one inch on each side and rejoin with the barbed coupler from your tool bag.",
        "Drag the line back and replace the whole hose from the truck.",
      ],
      correct: 1,
      remediation: "Cut 1 inch on each side of the puncture, then rejoin the two clean ends with the barbed coupler from your tool bag.",
      alt: {
        q: "True or false: to fix a burst WFP hose mid-job, you cut 1 inch on each side of the puncture and reconnect with the barbed coupler in your tool bag.",
        opts: ["True — cut and rejoin with the barbed coupler.", "False — replace the whole hose from the truck."],
        correct: 0,
      },
    },
    {
      q: "Your TDS at the tank outlet reads 14 PPM. What do you do?",
      opts: [
        "Don't start — wait for the tank to recharge.",
        "Rinse each pane with at least two full top-down passes and text Ahmed or your tech manager the reading.",
        "Start normally — 14 is close enough to make no difference.",
      ],
      correct: 1,
      remediation: "At 14 PPM you can still work. DI tanks take about a week to ship, so thorough rinsing is your field tool. Rinse every pane with at least two full top-down passes. Text Ahmed or your tech manager your reading so they can track how fast the tank is dropping.",
      alt: {
        q: "Your TDS reads 14 PPM. True or false: you rinse extra thoroughly and notify Ahmed — you don't stop work.",
        opts: ["True — rinse every pane with at least two top-down passes and text Ahmed your reading.", "False — above 10 PPM you must stop work until the tank is replaced."],
        correct: 0,
      },
    },
    {
      q: "Where do you read the TDS?",
      opts: [
        "At the spigot before water enters the tank.",
        "At the DI tank outlet, after the resin.",
        "At the brush head, after the WFP hose.",
      ],
      correct: 1,
      remediation: "TDS reads at the tank outlet — after the resin has done its work. 0–9 PPM: start the job. 10 PPM: extra rinse, text Ahmed. 11+ PPM: two full rinse passes per pane, text Ahmed.",
      alt: {
        q: "True or false: you check the TDS reading at the DI tank outlet — after the resin — not at the spigot.",
        opts: ["True — always at the outlet, after the resin.", "False — you check at the garden hose spigot before the tank."],
        correct: 0,
      },
    },
  ],
  wfp: [
    {
      q: "What's the correct order on a WFP-cleaned window?",
      opts: [
        "Glass → Sills → Frames → Rinse",
        "Frames → Sills → Glass → Rinse",
        "Rinse → Glass → Sills → Frames",
      ],
      correct: 1,
      remediation: "Frames first, then sills, then glass, then a full rinse-down. Cleaning out of order re-deposits dirt on glass you already cleaned.",
      alt: {
        q: "Put the WFP cleaning order in your head. Which sequence is correct?",
        opts: ["Frames → Sills → Glass → Rinse down.", "Glass → Frames → Sills → Rinse down."],
        correct: 0,
      },
    },
    {
      q: "How close should you hold the brush during the final rinse pass?",
      opts: [
        "A foot or two off the glass — the spray does the work.",
        "2–3 inches from the glass.",
        "Touching the glass with bristles flat.",
      ],
      correct: 1,
      remediation: "Rinse 2–3 inches off the glass — close enough that the pure water sheets evenly down the pane, far enough that the bristles don't drag.",
      alt: {
        q: "True or false: during the final rinse pass, hold the brush 2–3 inches from the glass so water sheets evenly without the bristles dragging.",
        opts: ["True.", "False — hold it a foot or two away so the spray spreads."],
        correct: 0,
      },
    },
    {
      q: "After WFP, do you squeegee the exterior glass dry?",
      opts: [
        "Yes — always squeegee after rinsing.",
        "No. Deionized water dries spot-free — leave it. Squeegee is for interior or super-dirty traditional cleans only.",
        "Only in direct sun.",
      ],
      correct: 1,
      remediation: "WFP exteriors don't get squeegeed — the DI water dries spot-free. Squeegee is a traditional-setup tool, interior or super-dirty only.",
      alt: {
        q: "You finish rinsing a WFP exterior window. Do you squeegee it dry?",
        opts: ["No — DI water dries spot-free on its own. Squeegee stays in the bucket.", "Yes — always squeegee after rinsing to avoid streaks."],
        correct: 0,
      },
    },
  ],
  special: [
    {
      q: "How long do you let the acidic solution sit on a hard-water pane in direct sun before rinsing?",
      opts: [
        "Closer to 5 seconds — direct sun dries it fast.",
        "30–60 seconds for full effect.",
        "Doesn't matter — rinse whenever.",
      ],
      correct: 0,
      remediation: "5–15 seconds dwell. Closer to 5 in direct sun (it dries fast); closer to 15 if the window is shaded.",
      alt: {
        q: "True or false: in direct sun, the acidic solution dwell time is closer to 5 seconds because it dries faster.",
        opts: ["True — about 5 seconds in direct sun, up to 15 in shade.", "False — wait at least 30 seconds regardless."],
        correct: 0,
      },
    },
    {
      q: "What's the full hard-water procedure once you've sprayed the brush?",
      opts: [
        "Scrub glass, let sit, rinse, done.",
        "Scrub glass, let sit 5–15 sec, rinse with DI water, clean the brush, scrub the window again, rinse again.",
        "Scrub frame and glass, let sit 60 sec, rinse.",
      ],
      correct: 1,
      remediation: "After the dwell-and-rinse, clean the acidic solution off the brush, scrub the window once more, and rinse again. The second pass takes off the residue the first one loosened.",
      alt: {
        q: "After the first dwell-and-rinse on a hard-water window, are you done?",
        opts: ["No — clean the brush, scrub again, and rinse a second time to remove loosened residue.", "Yes — one dwell-and-rinse is the full procedure."],
        correct: 0,
      },
    },
    {
      q: "Frame is oxidized and chalk is running down. When can you start on the glass?",
      opts: [
        "Right away — the rinse handles it.",
        "Only when the runoff from the frame is completely clear.",
        "After waiting 5 minutes for the chalk to settle.",
      ],
      correct: 1,
      remediation: "Scrub the frame until the runoff is completely clear before you touch the glass. Otherwise every pane below streaks.",
      alt: {
        q: "True or false: on an oxidized frame, you must scrub until the runoff is completely clear before cleaning the glass below.",
        opts: ["True — chalk in the runoff streaks every pane below.", "False — you can start the glass while scrubbing the frame."],
        correct: 0,
      },
    },
  ],
  screens: [
    {
      q: "You can't get a second-floor screen out. The customer is watching. What do you do?",
      opts: [
        "Force it — they're paying for screen cleaning.",
        "Talk to the customer — ask if they know a way to get this one out, note it on the job sheet if not.",
        "Cut the screen mesh to free the frame.",
      ],
      correct: 1,
      remediation: "Never force a stuck screen. If the customer is watching, ask if they know the trick for that window — they often do. Otherwise note it and leave it.",
      alt: {
        q: "A second-floor screen won't come out. What's the right move?",
        opts: ["Ask the customer if they know how — note it and leave it if not. Never force it.", "Force it out carefully — bent frames are a small risk worth taking."],
        correct: 0,
      },
    },
    {
      q: "How do you label screens as you pull them?",
      opts: [
        "Stack them in order — order is enough.",
        "Painters tape + Sharpie. Room, window position (L/R/center).",
        "Photo each one with your phone.",
      ],
      correct: 1,
      remediation: "Painters tape + Sharpie. Room + position. Order alone won't survive a customer interruption.",
      alt: {
        q: "True or false: painters tape + Sharpie with room and window position is the correct way to label screens as you pull them.",
        opts: ["True — order alone won't survive a customer interruption.", "False — stacking them in order is sufficient."],
        correct: 0,
      },
    },
    {
      q: "Where do clean screens dry?",
      opts: [
        "Laid flat in the yard so they don't fall.",
        "Standing upright against the side of the house, in sun if possible.",
        "In a stack on the porch.",
      ],
      correct: 1,
      remediation: "Stand them upright — flat screens collect debris and dry slower. Reinstall when you get to that window; the glass doesn't have to be fully dry first.",
      alt: {
        q: "True or false: clean screens should stand upright against the house to dry — never laid flat.",
        opts: ["True — flat screens collect debris and dry slower.", "False — lay them flat so they don't fall over."],
        correct: 0,
      },
    },
  ],
  traditional: [
    {
      q: "How often do you wipe the squeegee rubber on the surgical towel during fanning?",
      opts: [
        "Once when you start the window.",
        "After every stroke.",
        "Only when you see a streak.",
      ],
      correct: 1,
      remediation: "After every stroke. The rubber picks up dirt with each pass; one missed wipe creates a streak.",
      alt: {
        q: "True or false: you wipe the squeegee rubber on the surgical towel after every single stroke during fanning.",
        opts: ["True — one missed wipe and the rubber deposits dirt on the next pass.", "False — only wipe when you see a streak forming."],
        correct: 0,
      },
    },
    {
      q: "When do you reach for the walnut pad?",
      opts: [
        "On every traditional window, before the mop.",
        "After the mop with soap, on a super-dirty or interior window the mop alone couldn't break.",
        "In place of the squeegee on small panes.",
      ],
      correct: 1,
      remediation: "Walnut pad is a traditional-setup tool, used after the mop with soap, only on super-dirty or interior windows the mop couldn't fully clean. Light pressure.",
      alt: {
        q: "You've mopped a window with soap but stubborn grime remains. What comes next?",
        opts: ["Walnut pad — after the mop, on windows the mop couldn't fully clean. Light pressure.", "Squeegee it off and move on — the soap did its job."],
        correct: 0,
      },
    },
    {
      q: "You finish a window. Customer asks 'are you sure it's clean?' What's your check?",
      opts: [
        "Hold a flashlight straight at the glass.",
        "Step back and look at the pane from an angle in natural light.",
        "Press a finger to it — if it squeaks, it's clean.",
      ],
      correct: 1,
      remediation: "Streaks only show off-axis. Always step back and check from an angle in natural light.",
      alt: {
        q: "True or false: to check a finished window, step back and look at it from an angle in natural light — streaks only show off-axis.",
        opts: ["True.", "False — shine a flashlight directly at the glass."],
        correct: 0,
      },
    },
  ],
  order: [
    {
      q: "Roughly what share of jobs are two-tech?",
      opts: [
        "Almost all of them — we run in pairs by default.",
        "About 10% — only interior + exterior jobs.",
        "None — always solo.",
      ],
      correct: 1,
      remediation: "Most jobs are one-tech. Two-tech is only used on interior + exterior jobs, which is about 10% of routes.",
      alt: {
        q: "True or false: roughly 10% of routes are two-tech jobs — those are the interior + exterior ones.",
        opts: ["True — most routes are solo.", "False — most routes are two-tech."],
        correct: 0,
      },
    },
    {
      q: "Where on the house do you start the exterior WFP work?",
      opts: [
        "Back of the house first, then sides, then front.",
        "Front of the house first — it's what the customer sees.",
        "Whatever side has the most sun.",
      ],
      correct: 0,
      remediation: "Back first, then sides, then front. The customer-facing side gets the freshest tank and the cleanest technique. Side order is your call.",
      alt: {
        q: "True or false: on exterior WFP work, you start at the back of the house and finish at the front.",
        opts: ["True — the customer-facing front gets your freshest tank and cleanest technique.", "False — start at the front so the customer can see you working."],
        correct: 0,
      },
    },
    {
      q: "Two-tech, interior + exterior, screens on the job. What's the sequence?",
      opts: [
        "One tech does interior the whole time, one does exterior, screens last.",
        "Both pull screens → clean screens → split: one interior (traditional), one exterior (WFP) → reinstall screens last.",
        "Whoever finishes first helps the other.",
      ],
      correct: 1,
      remediation: "On a 2-tech interior+exterior job: both techs pull screens together, both clean screens, then split into interior and exterior at the same time. Screens go back at the end.",
      alt: {
        q: "On a 2-tech interior + exterior job, when do screens get reinstalled?",
        opts: ["At the end — after both interior and exterior cleaning is done.", "Right after cleaning each screen, before moving to windows."],
        correct: 0,
      },
    },
  ],
  customer: [
    {
      q: "Customer asks at the door: 'how do you reach my second-floor windows?' Best answer?",
      opts: [
        "We use a ladder against the upper sill.",
        "Carbon-fiber pole from the ground with deionized water through a brush — no streaks, no ladder marks.",
        "Whatever's easiest that day.",
      ],
      correct: 1,
      remediation: "Always explain the WFP method up-front: pole + DI water from the ground. It's also the answer to 'why is it so expensive?'",
      alt: {
        q: "True or false: the correct answer to 'how do you reach second-floor windows?' is: carbon-fiber pole from the ground, DI water through the brush — no ladders.",
        opts: ["True — and it's also the answer to 'why is it expensive?'", "False — we use a ladder against the upper sill."],
        correct: 0,
      },
    },
    {
      q: "Customer hesitates on the subscription. What's the close?",
      opts: [
        "Tell them the price will go up next time if they don't sign now.",
        "Offer $50 off each visit if we can fit them into the next neighborhood route.",
        "Tell them you'll throw in a free pressure wash.",
      ],
      correct: 1,
      remediation: "Standard pitch: \"We'll be in the neighborhood twice a year. If we can fit you in next time, we'll take $50 off each visit.\"",
      alt: {
        q: "True or false: the standard subscription close is offering $50 off each visit if they join the next neighborhood route.",
        opts: ["True — 'We'll be in the neighborhood twice a year. Fit you in next time, $50 off each visit.'", "False — the close is warning them the price goes up if they don't sign."],
        correct: 0,
      },
    },
    {
      q: "What's your commission on a subscription you close vs. an additional service (e.g. pressure wash) you set up AND close?",
      opts: [
        "10% on both.",
        "20% on subscription, 30% on additional service you set up and close.",
        "15% on subscription, 20% on additional.",
      ],
      correct: 1,
      remediation: "20% on the subscription. 30% on any additional service you set up AND close yourself — if you only set it up and a salesman closes, that drops.",
      alt: {
        q: "You set up AND close an additional service (pressure wash). What's your commission?",
        opts: ["30% — because you did both the setup and the close.", "20% — same as the subscription rate."],
        correct: 0,
      },
    },
  ],
};

// Final exam — a representative 8 (real app has 35).
const FINAL_EXAM = [
  ...QUIZZES.equipment.slice(0, 1),
  ...QUIZZES.wfp.slice(0, 1),
  ...QUIZZES.special.slice(0, 2),
  ...QUIZZES.screens.slice(0, 1),
  ...QUIZZES.traditional.slice(0, 1),
  ...QUIZZES.order.slice(0, 1),
  ...QUIZZES.customer.slice(0, 1),
];

window.QUIZZES = QUIZZES;
window.FINAL_EXAM = FINAL_EXAM;
