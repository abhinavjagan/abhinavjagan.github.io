import { useEffect, useRef, useState } from "react";
import { layoutNextLine, prepareWithSegments } from "./pretext/layout";

function InteractivePretextBlock({ text, tone = "cyan" }) {
  const ref = useRef(null);
  const [lines, setLines] = useState([]);
  const [spot, setSpot] = useState({ x: 0.5, section: "top" });
  const [pointerX, setPointerX] = useState(0.5);

  useEffect(() => {
    const onSpotLayout = (event) => {
      if (event.detail) {
        setSpot(event.detail);
      }
    };
    const onPointerMove = (event) => {
      setPointerX(event.clientX / window.innerWidth);
    };

    window.addEventListener("spot-layout", onSpotLayout);
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("spot-layout", onSpotLayout);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    let disposed = false;
    let resizeObserver;

    const run = async () => {
      try {
        if (document.fonts) {
          await document.fonts.load('400 15px "Jersey 10"');
        }
      } catch {
        // Ignore font loading failures.
      }

      const prepared = prepareWithSegments(text, '400 15px "Jersey 10"');

      const layout = () => {
        if (disposed) {
          return;
        }
        const width = element.clientWidth;
        const maxWidth = Math.max(160, width - 12);
        const nextLines = [];
        let cursor = { segmentIndex: 0, graphemeIndex: 0 };
        let top = 0;
        let guard = 0;

        while (top < 84 && guard < 6) {
          guard += 1;
          const line = layoutNextLine(prepared, cursor, maxWidth);
          if (!line) {
            break;
          }
          nextLines.push({
            text: line.text,
            top,
            shift: (pointerX - 0.5) * 18 + (spot.x - 0.5) * 22,
          });
          cursor = line.end;
          top += 18;
        }

        setLines(nextLines);
      };

      layout();
      resizeObserver = new ResizeObserver(layout);
      resizeObserver.observe(element);
      window.addEventListener("resize", layout);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", layout);
      };
    };

    let cleanup = null;
    run().then((fn) => {
      cleanup = fn;
    });

    return () => {
      disposed = true;
      if (cleanup) {
        cleanup();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [text, pointerX, spot.x]);

  return (
    <div ref={ref} className={`interactive-pretext interactive-pretext-${tone}`} aria-hidden="true">
      {lines.map((line, index) => (
        <p
          key={`${line.top}-${index}`}
          className="interactive-pretext-line"
          style={{
            top: `${line.top}px`,
            transform: `translateX(${line.shift}px)`,
          }}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}

export default InteractivePretextBlock;
