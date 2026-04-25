import { useEffect, useRef } from "react";
import DynamicTextFlow from "./DynamicTextFlow.jsx";

const WORDS = ["DISCOVER", "OBSESS", "GET STUFF DONE"];

// Per-word scroll windows within this section: [start, peak-in, peak-out, end]
// Slight overlaps between windows let adjacent words cross-fade smoothly.
const WINDOWS = [
  [0.0, 0.1, 0.32, 0.42],
  [0.32, 0.42, 0.62, 0.72],
  [0.62, 0.72, 0.92, 1.0],
];

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value) {
  const c = clamp01(value);
  return c * c * (3 - 2 * c);
}

export default function StoryKeywordsScene() {
  const sectionRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return undefined;
    }

    let frame = 0;
    let disposed = false;

    const apply = () => {
      if (disposed) {
        return;
      }
      const rect = section.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const p = clamp01(scrolled / scrollable);

      WORDS.forEach((_, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        const [s, pi, po, e] = WINDOWS[i];
        let opacity = 0;
        let y = 40;
        if (p >= s && p <= e) {
          if (p < pi) {
            const t = smoothstep((p - s) / Math.max(pi - s, 0.0001));
            opacity = t;
            y = 40 * (1 - t);
          } else if (p < po) {
            opacity = 1;
            y = 0;
          } else {
            const t = smoothstep((p - po) / Math.max(e - po, 0.0001));
            opacity = 1 - t;
            y = -40 * t;
          }
        }
        el.style.opacity = `${opacity}`;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="story-keywords"
      aria-label="Discover. Obsess. Get stuff done."
    >
      <div className="story-keywords-sticky">
        <div className="story-keywords-bg binary-canvas" aria-hidden="true">
          <DynamicTextFlow />
        </div>
        {WORDS.map((word, i) => (
          <div
            key={word}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className={`story-keyword story-keyword--${i + 1}`}
          >
            {word}
          </div>
        ))}
      </div>
    </section>
  );
}
