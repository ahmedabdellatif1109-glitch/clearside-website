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
        "Rinse each pane with at least two full top-down passes and text Ahmed or your manager the reading.",
        "Start normally — 14 is close enough to make no difference.",
      ],
      correct: 1,
      remediation: "At 14 PPM you can still work. DI resin takes about a week to ship, so thorough rinsing is your field tool. Rinse every pane with at least two full top-down passes. Text Ahmed or your manager your reading so they can track how fast the resin is dropping.",
      alt: {
        q: "Your TDS reads 14 PPM. True or false: you rinse extra thoroughly and notify Ahmed — you don't stop work.",
        opts: ["True — rinse every pane with at least two top-down passes and text Ahmed your reading.", "False — above 10 PPM you must stop work until the tank is replaced."],
        correct: 0,
      },
    },
    {
      q: "What's the correct order for connecting the WFP setup before you start a job?",
      opts: [
        "Spigot → garden hose → DI tank inlet → quick-connect to WFP hose → pole",
        "Pole → WFP hose → DI tank → garden hose → spigot",
        "DI tank → garden hose → spigot, then separately attach the WFP hose to the pole",
      ],
      correct: 0,
      remediation: "Always connect from the water source forward: female end of the garden hose to the spigot, male end to the DI tank inlet, quick-connect from the tank outlet to the WFP hose, WFP hose into the pole, brush onto the gooseneck.",
      alt: {
        q: "True or false: when setting up the WFP, you connect from the house spigot forward — garden hose to DI tank, tank to WFP hose, WFP hose into the pole.",
        opts: ["True — always spigot-first, working toward the pole.", "False — start at the pole and connect back toward the house."],
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

// Final exam — 35 scenario questions, harder than module checks.
const FINAL_EXAM = [

  // ── Equipment & Setup ──────────────────────────────────────────────────────
  {
    q: "You check TDS at the tank outlet at the start of a job — 8 PPM. Halfway through the job you check again and it reads 11 PPM. What do you do?",
    opts: [
      "Stop work immediately — 11 PPM means the tank is finished.",
      "Finish normally — 11 is close enough to 10.",
      "Switch to two full top-down rinse passes per pane for the rest of the job and text Ahmed your readings.",
    ],
    correct: 2,
    remediation: "11+ PPM means thorough rinsing — two full passes per pane. The tank isn't dead, it's declining. Text Ahmed both readings so he can track the drop rate and plan a replacement.",
  },
  {
    q: "The WFP hose bursts 55 feet from the truck. You have the tool bag. What's the exact field repair?",
    opts: [
      "Wrap the burst section with painters tape and finish the job.",
      "Cut 1 inch on each side of the burst, then rejoin the two clean ends with the barbed coupler.",
      "Drag the whole hose back to the truck and swap it for a spare.",
    ],
    correct: 1,
    remediation: "Cut 1 inch on each side — removes the weakened section — then rejoin with the barbed coupler. Tape won't hold under water pressure. The barbed coupler is in your tool bag for exactly this situation.",
  },
  {
    q: "A tech says he checks TDS at the garden hose spigot before the water enters the tank. What's wrong with that?",
    opts: [
      "Nothing — any point in the line gives the same reading.",
      "He's measuring unfiltered tap water, not what's coming out of the resin. The only meaningful reading is at the DI tank outlet.",
      "He should check at the brush head — that's what's actually hitting the glass.",
    ],
    correct: 1,
    remediation: "TDS only matters at the tank outlet — after the resin has worked. Tap water is never 0 PPM. A reading before the tank tells you nothing about the water quality reaching the glass.",
  },
  {
    q: "You arrive at a job and realize the barbed coupler isn't in the tool bag. What's the consequence and correct action?",
    opts: [
      "No consequence unless the hose actually bursts — proceed and deal with it if it happens.",
      "You have no field repair if the hose bursts mid-job. Notify Ahmed and confirm whether to proceed or return to restock.",
      "Use electrical tape as a substitute — it works under low pressure.",
    ],
    correct: 1,
    remediation: "Without the barbed coupler, a hose burst ends the job on the spot. Always confirm you have it before starting. If it's missing, Ahmed needs to know before you're 40 feet from the truck with no repair option.",
  },
  {
    q: "The DI tank outlet reads 0 PPM before you start. What does this mean?",
    opts: [
      "The tank sensor is broken — 0 PPM isn't physically possible.",
      "The tank is empty — request a replacement before starting.",
      "Pure water. This is exactly what you want. Start the job normally.",
    ],
    correct: 2,
    remediation: "0 PPM means the resin has fully stripped all dissolved solids. Glass cleaned with 0 PPM water dries completely clear. This is the ideal reading — no adjustment needed.",
  },

  // ── Water-Fed Pole ─────────────────────────────────────────────────────────
  {
    q: "After cleaning you notice dirt from the upper frame has re-deposited on glass you already scrubbed. What caused it?",
    opts: [
      "You used too much water — it carried debris further than normal.",
      "You cleaned the glass before the frame. The correct sequence is frames → sills → glass → rinse, specifically to prevent redeposit.",
      "Your TDS was too high — mineral-rich water makes debris stick.",
    ],
    correct: 1,
    remediation: "Frames first, sills second, glass third, rinse last — every time. Cleaning glass before the frame guarantees that loosened frame dirt runs down onto clean glass. There's no way to fix it after the fact except redoing the glass.",
  },
  {
    q: "During a rinse pass you're holding the brush 18 inches from the glass. The window shows streaks after drying. What went wrong?",
    opts: [
      "Too close — the bristles dragged and deposited debris.",
      "Too far — at 18 inches the water fans out and doesn't sheet evenly down the pane. Rinse at 2–3 inches.",
      "The water temperature was too cold to rinse effectively.",
    ],
    correct: 1,
    remediation: "2–3 inches off the glass. That's the distance at which pure water sheets evenly top to bottom. Too far and the spray scatters — you get inconsistent coverage that shows as streaks when dry.",
  },
  {
    q: "You just finished a WFP exterior on a bright sunny day. The customer asks if you're going to squeegee it. Best answer?",
    opts: [
      "Yes — always squeegee after rinsing to guarantee no streaks.",
      "Only on ground-floor windows where I can reach comfortably.",
      "No — deionized water dries completely spot-free. Squeegeeing is for interior work and traditional-setup cleans only.",
    ],
    correct: 2,
    remediation: "DI water at 0–10 PPM leaves no dissolved minerals behind, so there's nothing to spot. Squeegeeing a WFP exterior is unnecessary and risks dragging a clean pane. Know this answer — customers ask it often.",
  },
  {
    q: "After a WFP clean you notice a faint horizontal mineral line across the bottom 2 inches of multiple panes. Most likely cause?",
    opts: [
      "The DI tank is failing — a tank swap is the only fix.",
      "The final rinse didn't reach the bottom edge of each pane. Water stopped before sheeting fully off the sill.",
      "The brush was held too close and the bristles dragged at the bottom.",
    ],
    correct: 1,
    remediation: "A mineral line at the bottom means the rinse stopped too early. The rinse needs to sheet water completely off the bottom of each pane — hold 2–3 inches and sweep past the sill. This is a technique error, not a tank problem.",
  },
  {
    q: "You're cleaning a three-story house. Which side do you start on?",
    opts: [
      "The sunniest side — warm glass responds better to the brush.",
      "The back of the house, then sides, then the front — regardless of sun exposure.",
      "The shadiest side first so water doesn't evaporate before you rinse.",
    ],
    correct: 1,
    remediation: "Back → sides → front, always. The customer-facing front gets your freshest technique and tank. Sun affects dwell time in the hard-water procedure, not WFP cleaning order.",
  },

  // ── Special Situations ─────────────────────────────────────────────────────
  {
    q: "You're treating hard-water buildup on a shaded window. Correct dwell time for the acidic solution?",
    opts: [
      "5 seconds — keep it short regardless of conditions.",
      "30–60 seconds for full effect.",
      "Closer to 15 seconds — shaded glass is cooler so the solution stays wet longer.",
    ],
    correct: 2,
    remediation: "Dwell time is 5–15 seconds: closer to 5 in direct sun, closer to 15 in shade. Shaded glass doesn't evaporate the solution as fast, so you get a longer effective dwell. Never exceed 15 seconds — risk of etching.",
  },
  {
    q: "After the first dwell-and-rinse on a hard-water window, the glass is cleaner but still shows a faint haze. Correct next step?",
    opts: [
      "Apply the acidic solution a third time with a longer dwell.",
      "Clean the acidic solution off the brush, scrub the window again, and rinse a second time.",
      "Squeegee the remaining haze and move on.",
    ],
    correct: 1,
    remediation: "The two-pass procedure: (1) scrub, dwell, rinse — (2) clean the brush, scrub again, rinse again. The second pass removes residue loosened by the first. Skipping it leaves the haze you saw.",
  },
  {
    q: "A window has both hard-water buildup on the glass AND an oxidized frame above it. What order do you address them?",
    opts: [
      "Hard water on the glass first — that's the visible priority.",
      "Frame first — scrub until runoff is completely clear, then treat the hard-water glass below.",
      "Tackle both simultaneously to save time.",
    ],
    correct: 1,
    remediation: "Oxidized frames chalk any glass below them. Clear the frame runoff completely first, then treat the glass. Doing the glass first means you'll redo it after the chalk runs down — double the work.",
  },
  {
    q: "You spray the acidic brush on a second-floor window in direct afternoon sun. How long do you let it dwell?",
    opts: [
      "Closer to 5 seconds — direct sun dries the solution fast.",
      "At least 30 seconds — upper floors need longer contact time.",
      "No dwell needed — scrub and rinse immediately.",
    ],
    correct: 0,
    remediation: "Direct sun = closer to 5 seconds. The solution dries faster in heat and direct light. Past 15 seconds you risk leaving a residue ring. Quick dwell, thorough rinse.",
  },
  {
    q: "You finish a hard-water treatment and the customer shows you white streaks on the glass. Most likely cause?",
    opts: [
      "The TDS was too low — overly pure water causes streaks on treated glass.",
      "Acidic solution wasn't fully rinsed off — either the rinse was insufficient or the second scrub-and-rinse pass was skipped.",
      "The brush was held too close during the final rinse.",
    ],
    correct: 1,
    remediation: "White streaks after hard-water treatment = acid residue left on the glass. Happens when the rinse was rushed or the second pass was skipped. Both passes need to fully sheet water off the entire pane — top to bottom, edge to edge.",
  },

  // ── Screens ────────────────────────────────────────────────────────────────
  {
    q: "You pull 12 screens and stack them near the front door without labeling. After cleaning, reinstall takes 25 minutes of guessing. What was the error?",
    opts: [
      "Nothing — 25 minutes is within normal range for 12 screens.",
      "Screens need painters tape + Sharpie labels (room + window position) as you pull them. Stacking order alone doesn't survive an interruption.",
      "You should photograph each screen instead — photos are faster than labels.",
    ],
    correct: 1,
    remediation: "Painters tape + Sharpie on every screen as you pull it: room and window position (left/right/center). Stacking relies on memory you won't have after a break or interruption. Photos miss position detail and are slower to reference on reinstall.",
  },
  {
    q: "You notice a screen has a small bend at the corner. The customer hasn't said anything. What do you do before reinstalling?",
    opts: [
      "Install it — they probably already knew and forgot to mention it.",
      "Point it out to the customer, confirm it was pre-existing, and note it on the job sheet before reinstalling.",
      "Set it aside and tell the customer it was too damaged to reinstall.",
    ],
    correct: 1,
    remediation: "Surface damage must be flagged to the customer before you finish. If you reinstall silently and they notice later, you own the bend. Proactive disclosure protects you — a 10-second conversation now prevents a dispute after you leave.",
  },
  {
    q: "You've been trying to remove a second-floor screen for 90 seconds and it won't budge. Correct next step?",
    opts: [
      "Keep applying force — stuck screens always come out eventually.",
      "Ask the customer if they know how to release it. Note it on the job sheet and leave it if they don't.",
      "Use the metal screen pry from the tool bag to force it free.",
    ],
    correct: 1,
    remediation: "Never force a stuck screen. Bent or broken frames are damage you'll own. Customers often know the trick for their own windows — ask first. If they don't know, note it clearly. A missed screen clean is better than a broken frame.",
  },
  {
    q: "Where do clean screens go to dry after washing?",
    opts: [
      "Laid flat on the lawn — lower risk of them blowing over.",
      "Leaning against the truck until you're ready to reinstall.",
      "Standing upright against the side of the house, in sun if possible.",
    ],
    correct: 2,
    remediation: "Upright against the house. Flat screens collect lawn debris and dry slower. Standing them in sun dries them faster and keeps them clean. Reinstall once you reach that window — the glass doesn't need to be completely dry first.",
  },
  {
    q: "You reinstall all screens, then notice the glass behind two of them is still dirty. What went wrong in your sequence?",
    opts: [
      "Nothing — glass behind screens is outside the scope of the job.",
      "Screens were reinstalled before the glass was cleaned. Correct order: pull screens, clean screens, clean glass, reinstall screens.",
      "The screens blocked your view during glass cleaning — you need a better angle.",
    ],
    correct: 1,
    remediation: "Screens come out before glass cleaning so you have full, unobstructed access to the glass. If screens go back before the glass is done, you're either skipping the glass or removing the screens twice. Sequence matters.",
  },

  // ── Traditional Cleaning ───────────────────────────────────────────────────
  {
    q: "You fan a window and notice a streak forming on the fourth stroke. You had not wiped the rubber since the second stroke. What's the rule you broke?",
    opts: [
      "Wipe the rubber every other stroke on windows over 3 feet wide.",
      "Wipe the rubber after every single stroke — not when you see a streak forming.",
      "Replace the rubber blade any time a streak appears.",
    ],
    correct: 1,
    remediation: "After every stroke — not reactively. By the time a streak is visible, the dirty rubber has already deposited grime on the previous pass. Wiping every stroke prevents streaks; wiping after you see one fixes nothing on that stroke.",
  },
  {
    q: "The mop with soap didn't fully clean a ground-floor interior window. What comes next?",
    opts: [
      "Use the walnut pad with light pressure after the mop — it's designed for exactly this situation.",
      "Re-mop with more soap and squeegee harder.",
      "Move on — if the mop couldn't break it, it's outside the scope of the clean.",
    ],
    correct: 0,
    remediation: "Walnut pad is the next tool after the mop fails on a stubborn interior window. Light pressure — it's abrasive. Use it after the mop with soap, not instead of it. Never use it on WFP exteriors.",
  },
  {
    q: "You finish a window. You look straight at the glass from arm's length and it looks clear. The customer says they can see something. Who's right to check the angle?",
    opts: [
      "You are — if it looked clear straight-on, it is clean.",
      "The customer. Step back and view the pane from an angle in natural light — streaks only appear off-axis.",
      "Neither — offer to re-clean it without checking, to avoid the debate.",
    ],
    correct: 1,
    remediation: "Streaks are only visible off-axis. Looking straight at glass in most lighting conditions hides them entirely. Always check from an angle in natural light — that's your quality control step. If you find something, fix it. If not, show the customer the angle view.",
  },
  {
    q: "There's a dried paint speck on an interior window that the mop couldn't budge. First tool to reach for?",
    opts: [
      "Walnut pad — more abrasive than the mop.",
      "Paint scraper at a flat angle to lift the speck, then re-mop the area.",
      "Leave it and note it — paint specks require a specialist.",
    ],
    correct: 1,
    remediation: "Paint scraper first — flat angle, never perpendicular. It lifts the speck cleanly without scratching. Reach for the walnut pad only if the scraper doesn't fully clear it. Always confirm with the customer before using abrasive tools on their glass.",
  },
  {
    q: "When do you use the traditional bucket setup on an exterior window instead of the WFP?",
    opts: [
      "Always on ground-floor windows — WFP is for upper floors only.",
      "On super-dirty exterior windows where pure water alone can't break the grime, and on all interior windows.",
      "On older homes — WFP equipment can damage aging window frames.",
    ],
    correct: 1,
    remediation: "WFP is the default for all standard exterior cleaning. Traditional setup is reserved for: (1) any interior window, and (2) exterior windows too dirty for pure water — where soap is needed to break the grime before squeegeeing.",
  },

  // ── Job Order & Workflow ───────────────────────────────────────────────────
  {
    q: "On a two-tech interior + exterior job with screens, what's the correct sequence from start to finish?",
    opts: [
      "Tech 1 handles all screens solo; Tech 2 starts interior while screens are being pulled.",
      "Both techs pull all screens together → both clean all screens → split into interior and exterior simultaneously → both reinstall screens at the end.",
      "Both techs do interior together, then exterior together, then screens last.",
    ],
    correct: 1,
    remediation: "Pull together, clean together, then split. This keeps both techs moving in parallel on the most time-consuming work (interior + exterior) rather than working sequentially. Screens go back at the very end — both techs together.",
  },
  {
    q: "You're running solo and arrive at an exterior-only booking. The customer asks if you can do the interior too while you're there. What's the right call?",
    opts: [
      "Do it — the customer asked and you're already there.",
      "Do whatever you have time for and bill the difference at the end.",
      "Explain that interior + exterior is a two-tech appointment and offer to book that separately.",
    ],
    correct: 2,
    remediation: "Interior + exterior is a two-tech job — it was quoted and staffed that way. Taking it on solo compromises quality and isn't what the customer contracted. Upsell correctly: offer a properly staffed two-tech appointment rather than improvising.",
  },
  {
    q: "Roughly what share of ClearSide routes require two techs?",
    opts: [
      "About 50% — interior jobs make up roughly half of all bookings.",
      "About 10% — only interior + exterior jobs use two techs.",
      "Almost all of them — pairing is the company's default staffing model.",
    ],
    correct: 1,
    remediation: "About 10%. Most routes are exterior-only and run solo. Two techs are only deployed for interior + exterior jobs. Don't expect a partner — the default is solo.",
  },
  {
    q: "You finish the back and both sides of a house early. The second tech is still working inside. Best move?",
    opts: [
      "Start pulling the screens solo to stay ahead.",
      "Ask the second tech how you can help — don't start screens solo without coordinating first.",
      "Wait by the truck until the interior is done.",
    ],
    correct: 1,
    remediation: "Coordination matters. Pulling screens solo risks mislabeling — which wastes more time on reinstall than you saved. Ask your partner how to help. They may want you staging equipment, doing a second pass on something, or holding off on screens until both can work together.",
  },
  {
    q: "On the front of the house — the last side you clean — which floor do you start on?",
    opts: [
      "Ground floor first so the customer can see progress from inside.",
      "Top floor first, working down — same method as every other side.",
      "Largest window first regardless of floor, to get it done while the tank is freshest.",
    ],
    correct: 1,
    remediation: "Top floor down — always. Dirty water from upper floors drips onto lower glass. Working bottom to top undoes your own work. The front being last means your technique is at its best, but the top-down rule never changes.",
  },

  // ── Customer & Sales ───────────────────────────────────────────────────────
  {
    q: "A customer asks why window cleaning is 'so expensive.' Best answer?",
    opts: [
      "We're fully insured and licensed, which raises the cost.",
      "Our prices are competitive with everyone else in the area.",
      "We use a 30-foot carbon-fiber pole from the ground with deionized water — no ladders, no streaks, no risk of damage to your home. That system is what you're paying for.",
    ],
    correct: 2,
    remediation: "The WFP method IS the answer to the price objection. It explains the equipment, eliminates the 'anyone can do this' objection, and positions the result as the value. Memorize this answer — you'll use it on every job.",
  },
  {
    q: "A customer hesitates on the subscription: 'let me think about it.' What's the standard close?",
    opts: [
      "No problem — give them your card and move on.",
      "'We'll be in the neighborhood twice a year. If we can fit you in next time, we'll take $50 off each visit.'",
      "'This pricing is only available today — it'll go up next time.'",
    ],
    correct: 1,
    remediation: "The standard close ties the discount to a concrete upcoming event — the next neighborhood route. It creates real urgency without pressure or false scarcity. Know the exact phrase: 'We'll be in the neighborhood twice a year. Fit you in next time, $50 off each visit.'",
  },
  {
    q: "You identify a gutter-cleaning opportunity and report it to the office. A salesman calls the customer and closes it. What's your commission on that job?",
    opts: [
      "30% — you identified the lead.",
      "20% — same rate as a subscription.",
      "Less than 30% — the full 30% only applies when you both identify AND close the additional service yourself.",
    ],
    correct: 2,
    remediation: "30% is for additional services you set up AND close yourself on the spot. If the office closes it, your rate drops. To earn the full 30%, stay in the sale: identify the opportunity, quote it, and close it with the customer directly.",
  },
  {
    q: "A customer asks you to treat their hard-water windows before you've discussed the upcharge. What do you do?",
    opts: [
      "Do it — you're already there and it's a quick add-on.",
      "Quote the hard-water upcharge to the customer first, get verbal confirmation, then proceed.",
      "Note it for the office to quote on the next visit.",
    ],
    correct: 1,
    remediation: "Hard-water treatment is an upcharge — never perform it without customer authorization. Doing the work first and billing after leads to disputes. Quote it, confirm it, then do it. Always in that order.",
  },
  {
    q: "A customer calls a week after their job saying two windows still have spots. What's the right response?",
    opts: [
      "Apologize and offer to come back for free — customer satisfaction comes first.",
      "Explain it was likely sprinklers or rain and offer nothing.",
      "Acknowledge their concern, don't make independent promises, and tell them Ahmed will follow up within 24 hours.",
    ],
    correct: 2,
    remediation: "Techs don't independently commit to returns, refunds, or fault assessments — those are Ahmed's calls. Acknowledge the concern without arguing or assigning blame, and escalate immediately. Ahmed will determine whether a return visit is warranted.",
  },
];

window.QUIZZES = QUIZZES;
window.FINAL_EXAM = FINAL_EXAM;
