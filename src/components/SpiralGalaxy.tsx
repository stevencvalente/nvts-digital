import { useEffect, useRef, useCallback } from "react";

const COLS = 28;
const ROWS = 20;
const PRIMARY_COLOR = { r: 34, g: 53, b: 201 }; // #2235c9
const ACCENT_COLOR = { r: 252, g: 252, b: 252 }; // #fcfcfc

const SpiralGalaxy = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollVelocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const animFrameRef = useRef(0);
  const timeRef = useRef(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cellW = w / COLS;
    const cellH = h / ROWS;

    // Decay velocity
    scrollVelocityRef.current *= 0.92;
    timeRef.current += 0.016;
    const t = timeRef.current;
    const vel = Math.min(Math.abs(scrollVelocityRef.current), 60);
    const intensity = vel / 60; // 0-1

    ctx.clearRect(0, 0, w, h);

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cx = col * cellW + cellW / 2;
        const cy = row * cellH + cellH / 2;

        // Distance from center for radial effects
        const dx = (cx / w - 0.5) * 2;
        const dy = (cy / h - 0.5) * 2;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Wave distortion based on scroll velocity
        const wave = Math.sin(dist * 4 - t * 2) * 0.5 + 0.5;
        const distortX = Math.sin(t * 1.5 + row * 0.3 + col * 0.2) * intensity * cellW * 0.6;
        const distortY = Math.cos(t * 1.2 + col * 0.4 + row * 0.15) * intensity * cellH * 0.6;

        // Size oscillation — cells pulse with scroll
        const baseSize = 2;
        const sizeBoost = intensity * 8 * wave;
        const size = baseSize + sizeBoost + Math.sin(t + dist * 3) * 1.5;

        // Color mix: primary → accent based on distance + wave
        const mix = wave * 0.6 + dist * 0.3;
        const r = Math.round(PRIMARY_COLOR.r + (ACCENT_COLOR.r - PRIMARY_COLOR.r) * mix);
        const g = Math.round(PRIMARY_COLOR.g + (ACCENT_COLOR.g - PRIMARY_COLOR.g) * mix);
        const b = Math.round(PRIMARY_COLOR.b + (ACCENT_COLOR.b - PRIMARY_COLOR.b) * mix);

        // Opacity: stronger at center, faded at edges, boosted by scroll
        const edgeFade = 1 - Math.pow(dist, 2) * 0.5;
        const alpha = Math.max(0, Math.min(1,
          (0.12 + intensity * 0.5 + wave * 0.15) * edgeFade
        ));

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(cx + distortX, cy + distortY, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fill();

        // Draw connection lines between nearby distorted dots when scrolling
        if (intensity > 0.05) {
          // Connect to right neighbor
          if (col < COLS - 1) {
            const nx = (col + 1) * cellW + cellW / 2;
            const ny = row * cellH + cellH / 2;
            const nDistortX = Math.sin(t * 1.5 + row * 0.3 + (col + 1) * 0.2) * intensity * cellW * 0.6;
            const nDistortY = Math.cos(t * 1.2 + (col + 1) * 0.4 + row * 0.15) * intensity * cellH * 0.6;

            const lineAlpha = alpha * intensity * 0.4;
            if (lineAlpha > 0.01) {
              ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(cx + distortX, cy + distortY);
              ctx.lineTo(nx + nDistortX, ny + nDistortY);
              ctx.stroke();
            }
          }
          // Connect to bottom neighbor
          if (row < ROWS - 1) {
            const nx = col * cellW + cellW / 2;
            const ny = (row + 1) * cellH + cellH / 2;
            const nDistortX = Math.sin(t * 1.5 + (row + 1) * 0.3 + col * 0.2) * intensity * cellW * 0.6;
            const nDistortY = Math.cos(t * 1.2 + col * 0.4 + (row + 1) * 0.15) * intensity * cellH * 0.6;

            const lineAlpha = alpha * intensity * 0.4;
            if (lineAlpha > 0.01) {
              ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(cx + distortX, cy + distortY);
              ctx.lineTo(nx + nDistortX, ny + nDistortY);
              ctx.stroke();
            }
          }
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
    };

    const onScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocityRef.current = currentScroll - lastScrollRef.current;
      lastScrollRef.current = currentScroll;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [animate]);

  return (
    <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none opacity-70">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default SpiralGalaxy;
