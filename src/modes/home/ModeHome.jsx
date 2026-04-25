import DynamicTextFlow from "../story/DynamicTextFlow.jsx";

const MODES = [
  {
    id: "story",
    title: "Story mode",
    desc: "Why hire me!?",
    time: "~3 min",
    recommended: "Startup, founders, and VCs",
  },
  {
    id: "crisp",
    title: "Crisp mode",
    desc: "Quick one-page highlight",
    time: "~1 min",
    recommended: "Anyone who wants a quick, scannable page",
  },
  {
    id: "cv",
    title: "CV mode",
    desc: "Résumé-based layout with sections",
    time: "~1 min",
    recommended: "Companies and hiring teams",
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
        <div className="mode-home-hero">
          <h1 className="mode-home-name" lang="en">
            Abhinav Polimera
          </h1>
        </div>

        <div className="mode-home-lower">
          <header className="mode-picker-header">
            <h2 className="mode-picker-title">Pick a view</h2>
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
                  <span className="mode-card-desc">{m.desc}</span>
                  <span className="mode-card-time">{m.time}</span>
                  <span className="mode-card-recommended">
                    Recommended for {m.recommended}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
