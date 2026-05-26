// WaterFlowDiagram.jsx — animated 5-stage water-path diagram

function WaterFlowDiagram() {
  return (
    <div className="cs-wfp-diagram">
      <div className="cs-wfp-diagram__eyebrow">System chain · X-ray</div>

      <svg viewBox="0 0 1040 330" style={{ width:'100%', height:'auto', display:'block' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wfp-bg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#9AA3B0" stopOpacity="0.07"/>
            <stop offset="32%"  stopColor="#9AA3B0" stopOpacity="0.07"/>
            <stop offset="40%"  stopColor="#5BB8E8" stopOpacity="0.03"/>
            <stop offset="100%" stopColor="#5BB8E8" stopOpacity="0.11"/>
          </linearGradient>
          <marker id="wfp-arr-d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#9AA3B0"/>
          </marker>
          <marker id="wfp-arr-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#5BB8E8"/>
          </marker>
        </defs>

        {/* Zone background */}
        <rect x="14" y="14" width="1012" height="268" rx="14" fill="url(#wfp-bg)"/>
        <line x1="363" y1="14" x2="363" y2="282" stroke="#5BB8E8" strokeWidth="1" strokeDasharray="4 6" opacity="0.22"/>
        <text x="190" y="36" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#9AA3B0" letterSpacing="0.12em">UNFILTERED</text>
        <text x="700" y="36" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5BB8E8" letterSpacing="0.12em">PURE · DEIONISED</text>

        {/* ─── DIRTY PIPE: spigot → DI tank ─── */}
        <line x1="116" y1="170" x2="250" y2="170" stroke="#9AA3B0" strokeWidth="6" strokeLinecap="round" strokeDasharray="5 9" markerEnd="url(#wfp-arr-d)"/>
        <text x="183" y="152" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#9AA3B0" letterSpacing="0.07em">GARDEN HOSE</text>
        {[0, 0.53, 1.07].map((begin, i) => (
          <circle key={i} r="4" fill="#9AA3B0" opacity="0.5">
            <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${begin}s`} path="M116,170 L248,170"/>
          </circle>
        ))}

        {/* ─── CLEAN PIPE: DI tank → WFP hose ─── */}
        <line x1="363" y1="170" x2="600" y2="170" stroke="#5BB8E8" strokeWidth="6" strokeLinecap="round" markerEnd="url(#wfp-arr-c)"/>
        <text x="481" y="196" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5BB8E8" letterSpacing="0.07em">PURE WATER</text>
        {[0, 0.7, 1.4].map((begin, i) => (
          <circle key={i} r="5" fill="#8ADAF5" opacity="0.85">
            <animateMotion dur="2.1s" repeatCount="indefinite" begin={`${begin}s`} path="M363,170 L598,170"/>
          </circle>
        ))}

        {/* ─── CLEAN PIPE: WFP hose → pole ─── */}
        <line x1="727" y1="170" x2="800" y2="170" stroke="#5BB8E8" strokeWidth="6" strokeLinecap="round" markerEnd="url(#wfp-arr-c)"/>
        {[0, 0.45].map((begin, i) => (
          <circle key={i} r="5" fill="#8ADAF5" opacity="0.85">
            <animateMotion dur="0.9s" repeatCount="indefinite" begin={`${begin}s`} path="M727,170 L799,170"/>
          </circle>
        ))}

        {/* ══════════ 1 — HOME SPIGOT ══════════ */}
        <g transform="translate(50 145)">
          <rect x="0" y="0" width="60" height="44" rx="6" fill="#FBF8F2" stroke="#1A2332" strokeWidth="2"/>
          <rect x="42" y="16" width="14" height="12" fill="#1A2332"/>
          <circle cx="30" cy="-12" r="14" fill="#E8967A" stroke="#1A2332" strokeWidth="2"/>
          <line x1="22" y1="-12" x2="38" y2="-12" stroke="#1A2332" strokeWidth="2"/>
          <line x1="30" y1="-20" x2="30" y2="-4" stroke="#1A2332" strokeWidth="2"/>
        </g>
        <circle cx="80" cy="246" r="14" fill="#1A2332"/>
        <text x="80" y="251" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="14" fill="white">1</text>
        <text x="80" y="270" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="600" fill="#3F4A5C">Home spigot</text>
        <text x="80" y="287" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6A7585">tap water in</text>

        {/* ══════════ 2 — DI TANK ══════════ */}
        <g transform="translate(265 60)">
          <ellipse cx="45" cy="-6" rx="34" ry="10" fill="#C9CFD7" stroke="#1A2332" strokeWidth="2"/>
          <rect x="11" y="-6" width="68" height="12" fill="#C9CFD7" stroke="#1A2332" strokeWidth="2"/>
          <rect x="38" y="-22" width="14" height="10" fill="#1A2332"/>
          <line x1="45" y1="-26" x2="45" y2="-22" stroke="#1A2332" strokeWidth="2"/>
          <rect x="79" y="4" width="14" height="10" fill="#1A2332"/>
          <circle cx="93" cy="9" r="3" fill="#5BB8E8" stroke="#1A2332" strokeWidth="1.5"/>
          <rect x="11" y="6" width="68" height="176" rx="2" fill="#E6EAEF" stroke="#1A2332" strokeWidth="2"/>
          <rect x="20" y="10" width="6" height="168" fill="#FFFFFF" opacity="0.55"/>
          <rect x="56" y="10" width="3" height="168" fill="#FFFFFF" opacity="0.35"/>
          {/* X-ray window */}
          <rect x="28" y="22" width="34" height="148" rx="3" fill="#EBF7FD" stroke="#5BB8E8" strokeWidth="1.5" strokeDasharray="3 3"/>
          {/* Resin beads — pulsing to show active filtration */}
          {Array.from({length: 48}).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            return (
              <circle key={i} cx={33 + col * 8} cy={30 + row * 12} r="3.2" fill="#5BB8E8">
                <animate attributeName="opacity" values="0.45;1;0.45" dur="2.8s" repeatCount="indefinite" begin={`${(row * 0.13 + col * 0.06).toFixed(2)}s`}/>
              </circle>
            );
          })}
          <rect x="6" y="182" width="78" height="12" rx="2" fill="#C9CFD7" stroke="#1A2332" strokeWidth="2"/>
          {/* Callouts */}
          <line x1="66" y1="50" x2="106" y2="50" stroke="#1A2332" strokeWidth="1" strokeDasharray="2 3" opacity="0.4"/>
          <text x="110" y="47" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600" fill="#1E7FBB" letterSpacing="0.05em">RESIN BED</text>
          <text x="110" y="58" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#6A7585">pulls dissolved solids</text>
          <line x1="93" y1="9" x2="106" y2="9" stroke="#5BB8E8" strokeWidth="1" strokeDasharray="2 3" opacity="0.6"/>
          <text x="110" y="7" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600" fill="#1E7FBB" letterSpacing="0.05em">OUTLET</text>
          <text x="110" y="18" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#6A7585">check TDS here</text>
        </g>
        <circle cx="315" cy="278" r="14" fill="#1A2332"/>
        <text x="315" y="283" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="14" fill="white">2</text>
        <text x="315" y="300" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="600" fill="#3F4A5C">DI tank</text>

        {/* TDS callout pill */}
        <rect x="374" y="14" width="122" height="44" rx="10" fill="#1A2332" stroke="#5BB8E8" strokeWidth="1.5"/>
        <text x="435" y="30" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="600" fill="#5B8FAA" letterSpacing="0.12em">CHECK AT OUTLET</text>
        <text x="435" y="47" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" fontWeight="600" fill="#B8F5C8" letterSpacing="0.03em">0–10 PPM ✓</text>
        <path d="M435,58 Q435,68 360,70" stroke="#5BB8E8" strokeWidth="1.5" strokeDasharray="3 5" fill="none" markerEnd="url(#wfp-arr-c)"/>

        {/* ══════════ 3 — WFP HOSE ══════════ */}
        <g transform="translate(610 110)">
          <ellipse cx="55" cy="60" rx="44" ry="44" fill="none" stroke="#5BB8E8" strokeWidth="5">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite" begin="0s"/>
          </ellipse>
          <ellipse cx="55" cy="60" rx="32" ry="32" fill="none" stroke="#5BB8E8" strokeWidth="5" opacity="0.55"/>
          <ellipse cx="55" cy="60" rx="20" ry="20" fill="none" stroke="#5BB8E8" strokeWidth="5" opacity="0.3"/>
          <path d="M99 60 Q112 60 112 60" stroke="#5BB8E8" strokeWidth="5" strokeLinecap="round" fill="none"/>
        </g>
        <circle cx="665" cy="252" r="14" fill="#1A2332"/>
        <text x="665" y="257" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="14" fill="white">3</text>
        <text x="665" y="273" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="600" fill="#3F4A5C">WFP hose</text>
        <text x="665" y="289" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6A7585">150 ft · quick-connect</text>

        {/* ══════════ 4 — CARBON-FIBER POLE ══════════ */}
        <g transform="translate(805 160)">
          <line x1="0" y1="10" x2="140" y2="10" stroke="#1A2332" strokeWidth="5"/>
          <line x1="40" y1="4"  x2="40" y2="16"  stroke="#1A2332" strokeWidth="1.5" opacity="0.4"/>
          <line x1="80" y1="4"  x2="80" y2="16"  stroke="#1A2332" strokeWidth="1.5" opacity="0.4"/>
          <line x1="120" y1="4" x2="120" y2="16" stroke="#1A2332" strokeWidth="1.5" opacity="0.4"/>
          <path d="M140 10 Q158 10 158 -2" stroke="#1A2332" strokeWidth="3" fill="none"/>
          {/* Brush head */}
          <rect x="150" y="-22" width="36" height="14" rx="2" fill="#1A2332"/>
          {Array.from({length: 9}).map((_, i) => (
            <line key={i} x1={153 + i*4} y1="-22" x2={153 + i*4} y2="-34" stroke="#6A7585" strokeWidth="1.2"/>
          ))}
          {/* Animated water pulses at the brush head */}
          {[162, 170, 178].map((cx, i) => (
            <circle key={i} cx={cx} cy={i === 1 ? 4 : 0} r="3" fill="#8ADAF5">
              <animate attributeName="r"       values="2;4.5;2"   dur="1.4s" repeatCount="indefinite" begin={`${i * 0.47}s`}/>
              <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.47}s`}/>
            </circle>
          ))}
        </g>
        <circle cx="875" cy="252" r="14" fill="#1A2332"/>
        <text x="875" y="257" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="14" fill="white">4</text>
        <text x="875" y="273" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="600" fill="#3F4A5C">30 ft pole</text>
        <text x="875" y="289" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6A7585">carbon fiber</text>

        {/* Badge 5 — brush label (top-right) */}
        <circle cx="992" cy="82" r="14" fill="#1A2332"/>
        <text x="992" y="87" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="14" fill="white">5</text>
        <text x="992" y="103" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="600" fill="#3F4A5C">Hybrid brush</text>
        <text x="992" y="119" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6A7585">nylon + boar hair</text>
        <path d="M992,122 L992,130 L984,134" stroke="#1A2332" strokeWidth="1.5" strokeDasharray="3 3" fill="none"/>
      </svg>

      <div className="cs-wfp-diagram__footer">
        <span><strong style={{color:'var(--salmon-700)'}}>Don't check the resin color.</strong> Your only check is the TDS readout at the outlet.</span>
        <span><strong style={{color:'var(--go)'}}>0–9 PPM</strong> — start the job. <strong style={{color:'var(--caution)'}}>10 PPM</strong> — extra rinse, text Ahmed. <strong style={{color:'var(--stop)'}}>11+ PPM</strong> — two passes per pane, text Ahmed.</span>
      </div>
    </div>
  );
}

window.WaterFlowDiagram = WaterFlowDiagram;
