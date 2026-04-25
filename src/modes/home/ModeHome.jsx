import DynamicTextFlow from "../story/DynamicTextFlow.jsx";

const MODES = [
  {
    id: "story",
    title: "Story",
    blurb: "Scroll-driven intro, 3D text beats, full Spider-Verse ride.",
  },
  {
    id: "crisp",
    title: "Crisp",
    blurb: "Fast, readable one-pager — highlights without the scroll theater.",
  },
  {
    id: "cv",
    title: "CV",
    blurb: "Classic résumé layout — scan roles and skills at a glance.",
  },
];

export default function ModeHome({ onSelectMode }) {
  return (
    <main className="mode-home" aria-label="Choose how to view this portfolio">
      <div className="story-fixed-layer">
        <div className="binary-canvas">
          <DynamicTextFlow />
        </div>
      </div>

      <div className="mode-picker-overlay">
        <header className="mode-picker-header">
          <p className="mode-picker-kicker">Abhinav Polimera</p>
          <h1 className="mode-picker-title">Pick a view</h1>
        </header>

        <ul className="mode-picker-grid">
          {MODES.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                className="mode-card"
                onClick={() => onSelectMode(m.id)}
              >
                <span className="mode-card-title">{m.title}</span>
                <span className="mode-card-blurb">{m.blurb}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
