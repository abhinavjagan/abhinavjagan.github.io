import { useEffect, useRef, useState } from "react";
import { layoutNextLine, prepareWithSegments } from "./pretext/layout";

const FLOW_TEXT = `
Abhinav Jagan Polimera builds distributed systems, router software, traffic mirroring features,
automation platforms, AI-assisted internal tools, and product-minded engineering experiences.
Cisco 8000. Silicon One. ERSPAN over GUE. Egress mirroring. NetFlow. SPAN. Lawful Intercept.
Quantized ML models on routers. Python automation. React interfaces. Systems debugging. Product clarity.
`.trim().replace(/\s+/g, " ");

const FONT = '400 18px "Jersey 10"';
const LINE_HEIGHT = 24;
const PADDING = 18;

function DynamicTextFlow() {
  const ref = useRef(null);
  const [lines, setLines] = useState([]);
  const [spot, setSpot] = useState({ x: 0.7, y: 0.46, section: "top" });

  useEffect(() => {
    const onSpotLayout = (event) => {
      if (!event.detail) {
        return;
      }
      setSpot(event.detail);
    };

    window.addEventListener("spot-layout", onSpotLayout);
    return () => window.removeEventListener("spot-layout", onSpotLayout);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    let cancelled = false;
    let prepared = null;

    const build = async () => {
      try {
        if (document.fonts) {
          await document.fonts.load(FONT);
        }
      } catch {
        // Ignore font-loading errors and fall back to immediate layout.
      }

      prepared = prepareWithSegments(FLOW_TEXT, FONT);

      const renderLines = () => {
        if (cancelled || !prepared) {
          return;
        }

        const { clientWidth: width, clientHeight: height } = element;
        if (width < 60 || height < 60) {
          return;
        }

        const centerX = spot.x * width;
        const centerY = spot.y * height;
        const radiusX = Math.min(170, width * 0.22);
        const radiusY = Math.min(220, height * 0.34);
        const nextLines = [];
        let cursor = { segmentIndex: 0, graphemeIndex: 0 };
        let y = PADDING;
        let guard = 0;

        while (y + LINE_HEIGHT <= height - PADDING && guard < 180) {
          guard += 1;
          const bandTop = y;
          const bandBottom = y + LINE_HEIGHT;
          const bandMid = (bandTop + bandBottom) / 2;
          let startX = PADDING;
          let maxWidth = width - PADDING * 2;

          const dy = Math.abs(bandMid - centerY);
          if (dy < radiusY) {
            const ellipseRatio = 1 - (dy * dy) / (radiusY * radiusY);
            const dx = Math.sqrt(Math.max(0, ellipseRatio)) * radiusX;
            const exclusionLeft = Math.max(PADDING, centerX - dx - 18);
            const exclusionRight = Math.min(width - PADDING, centerX + dx + 18);
            const leftWidth = exclusionLeft - PADDING;
            const rightWidth = width - PADDING - exclusionRight;

            if (rightWidth > leftWidth && rightWidth > 140) {
              startX = exclusionRight;
              maxWidth = rightWidth;
            } else if (leftWidth > 140) {
              startX = PADDING;
              maxWidth = leftWidth;
            }
          }

          const line = layoutNextLine(prepared, cursor, maxWidth);
          if (!line) {
            cursor = { segmentIndex: 0, graphemeIndex: 0 };
            continue;
          }

          nextLines.push({
            text: line.text,
            top: y,
            left: Math.round(startX),
            width: Math.round(maxWidth),
            hot:
              spot.section === "experience"
                ? guard % 5 === 0
                : spot.section === "projects"
                  ? guard % 6 === 0
                  : guard % 7 === 0,
          });
          cursor = line.end;
          y += LINE_HEIGHT;
        }

        setLines(nextLines);
      };

      renderLines();
      const resizeObserver = new ResizeObserver(renderLines);
      resizeObserver.observe(element);
      window.addEventListener("resize", renderLines);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", renderLines);
      };
    };

    let cleanup = null;
    build().then((fn) => {
      cleanup = fn;
    });

    return () => {
      cancelled = true;
      if (cleanup) {
        cleanup();
      }
    };
  }, [spot]);

  return (
    <div ref={ref} className="dynamic-flow" aria-hidden="true">
      {lines.map((line, index) => (
        <p
          key={`${line.top}-${index}`}
          className={`dynamic-flow-line${line.hot ? " dynamic-flow-line-hot" : ""}`}
          style={{
            top: `${line.top}px`,
            left: `${line.left}px`,
            maxWidth: `${line.width}px`,
            lineHeight: `${LINE_HEIGHT}px`,
          }}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}

export default DynamicTextFlow;
