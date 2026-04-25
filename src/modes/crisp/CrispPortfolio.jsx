import PALETTE from "../../shared/palette.js";

export default function CrispPortfolio({ onBack }) {
  return (
    <main className="crisp-page" aria-label="Portfolio overview">
      <header className="crisp-top">
        <button type="button" className="mode-exit-btn" onClick={onBack}>
          ← Mode
        </button>
      </header>

      <section className="crisp-hero">
        <p className="crisp-eyebrow" style={{ color: PALETTE.neonCyan }}>
          Software engineer
        </p>
        <h1 className="crisp-name">Abhinav Polimera</h1>
        <p className="crisp-lead">
          Frontend-focused builder — performance, typography, and interfaces that feel
          intentional.
        </p>
      </section>

      <section className="crisp-block">
        <h2>Focus</h2>
        <ul className="crisp-list">
          <li>React, WebGL, and motion for product storytelling</li>
          <li>Design systems, accessibility, and resilient layouts</li>
          <li>Shipping readable code with clear boundaries</li>
        </ul>
      </section>

      <section className="crisp-block">
        <h2>Contact</h2>
        <p className="crisp-muted">
          Replace with your preferred links — email, GitHub, LinkedIn, or calendar.
        </p>
      </section>
    </main>
  );
}
