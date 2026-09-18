'use client';

import { useEffect, useRef } from 'react';

const RAMP = ' .,:;irsxXA253hMHGS#9B&@';

type SmokePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

export default function AsciiBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animation = 0;
    let tick = 0;
    let cols = 0;
    let rows = 0;
    let cell = 8;
    let fontSize = 9;
    let points: SmokePoint[] = [];
    let pointerX = window.innerWidth * 0.66;
    let pointerY = window.innerHeight * 0.28;
    let lastPointerX = pointerX;
    let lastPointerY = pointerY;
    let running = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      cell = window.innerWidth < 600 ? 7 : window.innerWidth < 1100 ? 8 : 9;
      fontSize = cell + 1;
      cols = Math.ceil(window.innerWidth / cell);
      rows = Math.ceil(window.innerHeight / cell);
    };

    const addSmoke = (x: number, y: number, power = 1) => {
      const count = Math.floor(5 + power * 6);

      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.35 + Math.random() * 1.8 * power;
        points.push({
          x: x + (Math.random() - 0.5) * 36,
          y: y + (Math.random() - 0.5) * 36,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.25,
          life: 0.82 + Math.random() * 0.78,
          size: 56 + Math.random() * 132 * power,
        });
      }

      if (points.length > 110) points = points.slice(points.length - 110);
    };

    const movePointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      const distance = Math.hypot(pointerX - lastPointerX, pointerY - lastPointerY);

      if (distance > 6) {
        addSmoke(pointerX, pointerY, Math.min(1.7, distance / 48));
        lastPointerX = pointerX;
        lastPointerY = pointerY;
      }
    };

    const draw = () => {
      if (!running) return;
      tick += 0.011;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = '#000';
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      context.font = `${fontSize}px "Courier New", monospace`;
      context.textBaseline = 'top';

      if (Math.floor(tick * 1000) % 4 === 0) {
        for (let i = 0; i < 2; i += 1) {
          addSmoke(
            window.innerWidth * (0.12 + 0.76 * (0.5 + Math.sin(tick * (0.55 + i * 0.13) + i * 1.7) * 0.5)),
            window.innerHeight * (0.16 + 0.58 * (0.5 + Math.cos(tick * (0.47 + i * 0.11) + i * 2.1) * 0.5)),
            0.38,
          );
        }
      }

      points = points
        .map((point) => {
          const curl = Math.sin(point.y * 0.014 + tick * 7.5) * Math.cos(point.x * 0.012 - tick * 6.2);
          return {
            ...point,
            x: point.x + point.vx + curl * 0.92,
            y: point.y + point.vy + Math.sin(point.x * 0.01 + tick * 5.4) * 0.42,
            vx: point.vx * 0.995 + curl * 0.018,
            vy: point.vy * 0.994 - 0.003,
            life: point.life - 0.0044,
            size: point.size * 1.001,
          };
        })
        .filter((point) => point.life > 0);

      for (let row = 0; row < rows; row += 1) {
        const y = row * cell;

        for (let col = 0; col < cols; col += 1) {
          const x = col * cell;
          let density = 0;

          for (const point of points) {
            const dx = x - point.x;
            const dy = y - point.y;
            const distance = dx * dx + dy * dy;
            density += Math.exp(-distance / (point.size * point.size)) * point.life;
          }

          const vortex =
            Math.sin(col * 0.095 + tick * 5.2) *
            Math.cos(row * 0.085 - tick * 4.4) *
            0.08;
          const pointerGlow = Math.exp(-((x - pointerX) ** 2 + (y - pointerY) ** 2) / 9500) * 0.18;
          const value = Math.max(0, Math.min(1, density * 0.46 + vortex + pointerGlow - 0.05));

          if (value < 0.028) continue;

          const charIndex = Math.min(RAMP.length - 1, Math.floor(value * (RAMP.length - 1)));
          const alpha = Math.min(0.38, 0.026 + value * 0.32);
          context.fillStyle = `rgba(255,255,255,${alpha})`;
          context.fillText(RAMP[charIndex], x, y);
        }
      }

      animation = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || reducedMotion || document.hidden) return;
      running = true;
      draw();
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(animation);
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    for (let i = 0; i < 7; i += 1) {
      addSmoke(
        window.innerWidth * (0.1 + Math.random() * 0.8),
        window.innerHeight * (0.12 + Math.random() * 0.66),
        0.7,
      );
    }
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibility);

    if (reducedMotion) {
      context.fillStyle = '#000';
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    } else {
      window.addEventListener('pointermove', movePointer);
      start();
    }

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="ascii-backdrop" aria-hidden="true" />;
}
