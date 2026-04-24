import { useEffect, useRef, useState } from "react";
import { layoutNextLine, prepareWithSegments } from "../pretext/src/layout.ts";

const FLOW_TEXT =
  "0101011010010110100101101001011010010110100101101001011010010110101001011010010110".repeat(
    120,
  );

const FONT = '400 46px "Bitcount Grid Double"';
const LINE_HEIGHT = 52;
const CHUNK_SIZE = 8;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value) {
  return clamp(value, 0, 1);
}

function easeOut(value) {
  return 1 - (1 - value) ** 3;
}

function morphBinaryText(text, influence, seed) {
  if (influence <= 0.06 || text.length === 0) {
    return text;
  }

  const chars = text.split("");

  for (let i = 0; i < chars.length; i += 1) {
    const edgeDistance = Math.abs(i - (chars.length - 1) * 0.5) / Math.max(chars.length * 0.5, 1);
    const localInfluence = influence * (1 - edgeDistance * 0.55);
    const phase = Math.sin(seed * 0.9 + i * 0.82) * 0.5 + 0.5;

    if (phase < localInfluence * 0.52) {
      chars[i] = chars[i] === "0" ? "1" : "0";
    }
  }

  return chars.join("");
}

function buildChunkedLine(text, lineWidth, lineMidY, pointer, radius, lineIndex) {
  const chunks = [];
  const active = pointer.active;

  for (let start = 0; start < text.length; start += CHUNK_SIZE) {
    const chunkText = text.slice(start, start + CHUNK_SIZE);
    const chunkIndex = Math.floor(start / CHUNK_SIZE);
    const centerRatio = text.length <= 1 ? 0.5 : (start + chunkText.length * 0.5) / text.length;
    const chunkCenterX = centerRatio * lineWidth;
    const dx = chunkCenterX - pointer.x;
    const dy = lineMidY - pointer.y;
    const distance = Math.hypot(dx, dy);
    const influence = active ? clamp01(1 - distance / radius) : 0;
    const pressure = easeOut(influence);
    const push = dx === 0 ? 0 : dx / Math.abs(dx);
    const ripple = Math.sin(distance * 0.04 - lineIndex * 0.55 - chunkIndex * 0.45);
    const shift = active ? Math.round(push * pressure * 26 + ripple * pressure * 10) : 0;

    chunks.push({
      text: morphBinaryText(chunkText, pressure, lineIndex + chunkIndex),
      shift,
      opacity: 0.28 + pressure * 0.72,
      glow: pressure,
    });
  }

  return chunks;
}

function DynamicTextFlow() {
  const ref = useRef(null);
  const hostRef = useRef(null);
  const preparedRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef(0);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const element = ref.current;
    const host = hostRef.current;
    if (!element || !host) {
      return undefined;
    }

    let cancelled = false;

    const scheduleRender = () => {
      if (frameRef.current) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        renderLines();
      });
    };

    const renderLines = () => {
      const prepared = preparedRef.current;
      if (cancelled || !prepared) {
        return;
      }

      const { clientWidth: width, clientHeight: height } = element;
      if (width < 60 || height < 60) {
        return;
      }

      const pointer = pointerRef.current.active
        ? pointerRef.current
        : { x: width * 0.5, y: height * 0.5, active: false };
      const radius = clamp(Math.min(width, height) * 0.26, 150, 320);
      const nextLines = [];
      let cursor = { segmentIndex: 0, graphemeIndex: 0 };
      let y = 0;
      let lineIndex = 0;

      while (y <= height + LINE_HEIGHT) {
        const line = layoutNextLine(prepared, cursor, width);
        if (!line) {
          cursor = { segmentIndex: 0, graphemeIndex: 0 };
          continue;
        }

        const lineMidY = y + LINE_HEIGHT * 0.5;
        const verticalInfluence = pointer.active
          ? clamp01(1 - Math.abs(lineMidY - pointer.y) / (radius * 1.15))
          : 0;
        const indentWave = Math.sin((lineMidY - pointer.y) * 0.03 + pointer.x * 0.01);
        const pressure = easeOut(verticalInfluence);
        const indent = pointer.active ? Math.round(indentWave * pressure * 22) : 0;
        const drift = pointer.active ? Math.round((pointer.x / Math.max(width, 1) - 0.5) * 24 * pressure) : 0;

        nextLines.push({
          key: `${y}-${lineIndex}`,
          top: y,
          left: drift,
          maxWidth: width,
          lineHeight: LINE_HEIGHT,
          opacity: 0.5 + pressure * 0.18,
          indent,
          glow: pressure,
          chunks: buildChunkedLine(line.text, line.width, lineMidY, pointer, radius, lineIndex),
        });

        cursor = line.end;
        y += LINE_HEIGHT;
        lineIndex += 1;
      }

      setLines(nextLines);
    };

    const syncPointer = (event) => {
      const rect = host.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
      scheduleRender();
    };

    const clearPointer = () => {
      pointerRef.current = { ...pointerRef.current, active: false };
      scheduleRender();
    };

    const prepare = async () => {
      try {
        if (document.fonts) {
          await document.fonts.load(FONT);
        }
      } catch {
        // Ignore font loading issues and continue with fallback metrics.
      }

      if (cancelled) {
        return;
      }

      preparedRef.current = prepareWithSegments(FLOW_TEXT, FONT, {
        whiteSpace: "pre",
        letterSpacing: 5.5,
      });
      scheduleRender();
    };

    prepare();

    const resizeObserver = new ResizeObserver(scheduleRender);
    resizeObserver.observe(host);
    host.addEventListener("pointermove", syncPointer);
    host.addEventListener("pointerleave", clearPointer);
    window.addEventListener("resize", scheduleRender);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", syncPointer);
      host.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("resize", scheduleRender);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div ref={hostRef} className="dynamic-flow-host">
      <div ref={ref} className="dynamic-flow" aria-hidden="true">
      {lines.map((line) => (
        <p
          key={line.key}
          className="dynamic-flow-line"
          style={{
            top: `${line.top}px`,
            left: `${line.left}px`,
            maxWidth: `${line.maxWidth}px`,
            lineHeight: `${line.lineHeight}px`,
            opacity: line.opacity,
            textIndent: `${line.indent}px`,
            color: `rgb(${Math.round(118 + line.glow * 20)} ${Math.round(118 + line.glow * 20)} ${Math.round(
              118 + line.glow * 20,
            )})`,
            textShadow: `0 0 ${6 + line.glow * 10}px rgba(170, 170, 170, ${0.05 + line.glow * 0.1})`,
            filter: `brightness(${0.82 + line.glow * 0.14})`,
          }}
        >
          {line.chunks.map((chunk, index) => (
            <span
              key={`${line.key}-${index}`}
              className="dynamic-flow-chunk"
              style={{
                transform: `translateX(${chunk.shift}px)`,
                opacity: chunk.opacity,
                color: `rgb(${Math.round(122 + chunk.glow * 24)} ${Math.round(122 + chunk.glow * 24)} ${Math.round(
                  122 + chunk.glow * 24,
                )})`,
                textShadow: `0 0 ${5 + chunk.glow * 10}px rgba(176, 176, 176, ${0.06 + chunk.glow * 0.12})`,
                filter: `brightness(${0.84 + chunk.glow * 0.15})`,
              }}
            >
              {chunk.text}
            </span>
          ))}
        </p>
      ))}
      </div>
    </div>
  );
}

export default DynamicTextFlow;
