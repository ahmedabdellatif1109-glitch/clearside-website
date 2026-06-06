// EquipmentGrid.jsx

const EQUIPMENT_ITEMS = [
  {
    id: 'wfp',
    name: 'Water-Fed Pole',
    short: '30 ft carbon fiber + hybrid brush',
    photo: 'assets/equipment-photos/wfp-system.jpeg',
    tooltip: 'A 30-ft carbon-fiber telescoping pole that delivers pure deionized water through a hybrid brush head. Cleans all exterior windows from the ground — no ladders, no streaks.',
    tag: 'WFP SETUP',
  },
  {
    id: 'ditank',
    name: 'DI Tank',
    short: 'Deionization tank',
    photo: 'assets/equipment-photos/di-tank.jpeg',
    tooltip: 'Packed with ion-exchange resin that strips dissolved minerals from tap water. The pure water coming out is what dries on glass without leaving any spots.',
    tag: 'WFP SETUP',
  },
  {
    id: 'hose',
    name: 'Garden Hose',
    short: '100 ft standard hose',
    photo: 'assets/equipment-photos/garden-hose.jpeg',
    tooltip: 'Connects the house spigot to the DI tank inlet. Tap water in, on its way to be filtered. Female end on the spigot, male end on the tank.',
    tag: 'WFP SETUP',
  },
  {
    id: 'toolbag',
    name: 'Tool Bag',
    short: 'Your kit on the ground',
    photo: 'assets/equipment-photos/tool-bag.jpg',
    tooltip: 'Carries everything you need on the property: scraper, painters tape, Sharpie, walnut pads, O-rings, surgical towels, and the barbed coupler for emergency hose repairs.',
    tag: 'KIT',
  },
  {
    id: 'squeegee',
    name: 'Squeegee',
    short: '12 in. channel + rubber blade',
    photo: 'assets/equipment-photos/squeegee.jpeg',
    tooltip: 'Pulls soapy water off glass after the mop. Used on interior and super-dirty windows only — never on WFP exteriors, because DI water dries spot-free on its own.',
    tag: 'TRADITIONAL',
  },
  {
    id: 'mop',
    name: 'Mop',
    short: 'T-bar applicator',
    photo: 'assets/equipment-photos/mop-applicator.webp',
    tooltip: 'Applies soapy water to glass before squeegeeing. Traditional cleaning setup only — stays in the bucket with the squeegee and is never used with the WFP.',
    tag: 'TRADITIONAL',
  },
  {
    id: 'walnut',
    name: 'Walnut Pad',
    short: 'Crushed-shell scrubber',
    photo: 'assets/equipment-photos/walnut-pad.webp',
    tooltip: 'Abrasive pad for grime the mop couldn\'t lift. Use after the mop with light pressure — interior or very dirty windows only. Never on WFP exteriors.',
    tag: 'TRADITIONAL',
  },
  {
    id: 'towel',
    name: 'Surgical Towel',
    short: 'Lint-free detail towel',
    photo: 'assets/equipment-photos/surgical-towel.jpeg',
    tooltip: 'Lint-free towel for wiping the squeegee rubber after every stroke and detailing edges and sills. Always carry at least two — one soaks through fast.',
    tag: 'BOTH',
  },
];

function EquipmentGrid() {
  const [tooltip, setTooltip] = React.useState(null);
  const touchMovedRef = React.useRef(false);

  // Desktop: instant hover
  function onMouseEnter(id) { setTooltip(id); }
  function onMouseLeave() { setTooltip(null); }

  // Mobile: tap to toggle
  function onTouchStart() { touchMovedRef.current = false; }
  function onTouchMove() { touchMovedRef.current = true; }
  function onTouchEnd(id) {
    if (touchMovedRef.current) return;
    setTooltip(prev => prev === id ? null : id);
  }

  return (
    <div className="cs-eqgrid-wrap">
      <div className="cs-eqgrid__intro">
        <div className="cs-eqgrid__eyebrow">Know your gear first</div>
        <h2 className="cs-h2 cs-h2--sky" style={{ marginTop: 6 }}>Know your gear.</h2>
        <p className="cs-body">
          Before the procedures, the names. Hover any item to see what it does.
        </p>
      </div>

      <div className="cs-eqgrid">
        {EQUIPMENT_ITEMS.map(item => (
          <div
            key={item.id}
            className={`cs-eqtile ${tooltip === item.id ? 'is-active' : ''}`}
            onMouseEnter={() => onMouseEnter(item.id)}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() => onTouchEnd(item.id)}
            onTouchCancel={onTouchMove}
          >
            <div className="cs-eqtile__photo">
              <img src={item.photo} alt={item.name}/>
              <span className="cs-eqtile__tag">{item.tag}</span>
            </div>
            <div className="cs-eqtile__name">{item.name}</div>
            <div className="cs-eqtile__short">{item.short}</div>
            {tooltip === item.id && (
              <div className="cs-eqtile__desc">{item.tooltip}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

window.EquipmentGrid = EquipmentGrid;
window.EQUIPMENT_ITEMS = EQUIPMENT_ITEMS;
