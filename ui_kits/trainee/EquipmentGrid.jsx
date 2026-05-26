// EquipmentGrid.jsx
// A tappable photo grid of every piece of gear a tech carries.
// Used at the top of Module 01 so a new hire can match the name to the object
// before any procedural content. Clicking any tile opens a focused detail
// drawer with the photo, name, what it's for, and which module covers it.

const EQUIPMENT_ITEMS = [
  {
    id: 'wfp',
    name: 'Water-Fed Pole',
    short: '30 ft carbon fiber + hybrid brush',
    photo: '../../assets/equipment-photos/wfp-system.jpeg',
    purpose: 'Telescoping 30 ft carbon-fiber pole with a nylon/boar hair hybrid brush at the tip. The whole exterior cleaning system flows through this — pure DI water out the brush, no ladders, no streaks.',
    where: 'Stays on the truck. Carried out at the start of every exterior job. The brush head is a single hybrid — you don\'t swap it for different surfaces.',
    moduleNum: 2,
    moduleLabel: 'Covered in Module 02 — Water-Fed Pole Cleaning',
    tag: 'WFP SETUP',
  },
  {
    id: 'ditank',
    name: 'DI Tank',
    short: 'Deionization tank',
    photo: '../../assets/equipment-photos/di-tank.jpeg',
    purpose: 'Single-chamber tank packed with deionizing resin that pulls dissolved solids out of tap water. The water that comes out of this tank is what dries on the glass without leaving any spots.',
    where: 'Sits next to the house, hooked between the garden hose and the WFP hose.',
    moduleNum: 1,
    moduleLabel: 'Covered in this module — Equipment & Setup',
    tag: 'WFP SETUP',
  },
  {
    id: 'hose',
    name: 'Garden Hose',
    short: '100 ft standard hose',
    photo: '../../assets/equipment-photos/garden-hose.jpeg',
    purpose: 'Connects the home spigot to the DI tank inlet. Tap water in, on its way to be filtered.',
    where: 'Female end on the spigot. Male end on the tank inlet.',
    moduleNum: 1,
    moduleLabel: 'Covered in this module — Equipment & Setup',
    tag: 'WFP SETUP',
  },
  {
    id: 'toolbag',
    name: 'Tool Bag',
    short: 'Your kit on the ground',
    photo: '../../assets/equipment-photos/tool-bag.jpg',
    purpose: 'Holds everything you need on the property that isn\'t the bucket: paint scraper, painters tape, Sharpie, walnut pads, extra gooseneck/angle adapter, extra O-rings for the garden hose, wrench, plumbers tape, metal screen pry, surgical towels, and the barbed hose coupler for hose-burst repair.',
    where: 'On the porch or driveway near where you set up. Never on a flowerbed.',
    moduleNum: 1,
    moduleLabel: 'Covered in this module — Equipment & Setup',
    tag: 'KIT',
  },
  {
    id: 'squeegee',
    name: 'Squeegee',
    short: '12 in. channel + rubber blade',
    photo: '../../assets/equipment-photos/squeegee.jpeg',
    purpose: 'Lives in the bucket. Removes water from glass after the mop applies soap. Interior or super-dirty windows only — never used on WFP exteriors, because DI water dries spot-free.',
    where: 'In the bucket. Spare rubber blade in the tool bag.',
    moduleNum: 5,
    moduleLabel: 'Covered in Module 05 — Traditional Cleaning',
    tag: 'TRADITIONAL',
  },
  {
    id: 'mop',
    name: 'Mop',
    short: 'T-bar applicator',
    photo: '../../assets/equipment-photos/mop-applicator.webp',
    purpose: 'Lives in the bucket. Applies soapy water to glass before squeegeeing. Traditional setup only — not used with WFP.',
    where: 'In the bucket with the squeegee, acidic-solution bottle, and dish soap.',
    moduleNum: 5,
    moduleLabel: 'Covered in Module 05 — Traditional Cleaning',
    tag: 'TRADITIONAL',
  },
  {
    id: 'walnut',
    name: 'Walnut Pad',
    short: 'Crushed-shell scrubber',
    photo: '../../assets/equipment-photos/walnut-pad.webp',
    purpose: 'Abrasive pad for paint speck or anything the mop with soap couldn\'t lift. Only used on super-dirty windows or interior windows, after the mop — never on a WFP exterior.',
    where: 'In your tool bag. Stays dry until you need it.',
    moduleNum: 5,
    moduleLabel: 'Covered in Module 05 — Traditional Cleaning',
    tag: 'TRADITIONAL',
  },
  {
    id: 'towel',
    name: 'Surgical Towel',
    short: 'Lint-free detail towel',
    photo: '../../assets/equipment-photos/surgical-towel.jpeg',
    purpose: 'Wipes the squeegee rubber after every stroke, details the bottom of the glass and the sill. Lint-free — the only thing that should touch finished glass.',
    where: 'In your tool bag. Always carry at least two — one will soak through fast.',
    moduleNum: 5,
    moduleLabel: 'Covered in Module 05 — Traditional Cleaning',
    tag: 'BOTH',
  },
];

function EquipmentGrid() {
  const [open, setOpen] = React.useState(null);
  const active = open ? EQUIPMENT_ITEMS.find(i => i.id === open) : null;

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="cs-eqgrid-wrap">
      <div className="cs-eqgrid__intro">
        <div className="cs-eqgrid__eyebrow">Know your gear first</div>
        <h2 className="cs-h2 cs-h2--sky" style={{ marginTop: 6 }}>Tap any tool to see what it is.</h2>
        <p className="cs-body">
          Before the procedures, the names. You'll see all of these on every job — match the photo to the name now and the rest of the training will go faster.
        </p>
      </div>

      <div className="cs-eqgrid">
        {EQUIPMENT_ITEMS.map(item => (
          <button
            key={item.id}
            className={`cs-eqtile ${open === item.id ? 'is-active' : ''}`}
            onClick={() => setOpen(item.id === open ? null : item.id)}
          >
            <div className="cs-eqtile__photo">
              <img src={item.photo} alt={item.name}/>
              <span className="cs-eqtile__tag">{item.tag}</span>
            </div>
            <div className="cs-eqtile__name">{item.name}</div>
            <div className="cs-eqtile__short">{item.short}</div>
          </button>
        ))}
      </div>

      {active ? (
        <div className="cs-eqdrawer" role="dialog" aria-modal="true">
          <button className="cs-eqdrawer__close" onClick={() => setOpen(null)} aria-label="Close">
            <ModuleIcon name="x" size={20}/>
          </button>
          <div className="cs-eqdrawer__media">
            <img src={active.photo} alt={active.name}/>
          </div>
          <div className="cs-eqdrawer__body">
            <div className="cs-eqdrawer__tag">{active.tag}</div>
            <h3 className="cs-eqdrawer__name">{active.name}</h3>
            <div className="cs-eqdrawer__short">{active.short}</div>

            <div className="cs-eqdrawer__row">
              <div className="cs-eqdrawer__label">What it does</div>
              <div className="cs-eqdrawer__text">{active.purpose}</div>
            </div>

            <div className="cs-eqdrawer__row">
              <div className="cs-eqdrawer__label">Where you'll find it</div>
              <div className="cs-eqdrawer__text">{active.where}</div>
            </div>

            <div className="cs-eqdrawer__module">
              <ModuleIcon name="book-open" size={14}/>
              <span>{active.moduleLabel}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

window.EquipmentGrid = EquipmentGrid;
window.EQUIPMENT_ITEMS = EQUIPMENT_ITEMS;
