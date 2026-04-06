import { useEffect, useRef, useCallback } from "react";

const COLS = 32;
const ROWS = 24;
const PRIMARY_COLOR = { r: 34, g: 53, b: 201 };
const ACCENT_COLOR = { r: 120, g: 140, b: 255 };

const SpiralGalaxy = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
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

    timeRef.current += 0.012;
    const t = timeRef.current;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const mouseActive = mouseRef.current.active;

    ctx.clearRect(0, 0, w, h);

    // Precompute node positions
    const nodes: { x: number; y: number; alpha: number; r: number; g: number; b: number; size: number }[] = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cx = col * cellW + cellW / 2;
        const cy = row * cellH + cellH / 2;

        const dx = (cx / w - 0.5) * 2;
        const dy = (cy / h - 0.5) * 2;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Edge fade — smooth falloff on all 4 edges
        const nx01 = col / (COLS - 1); // 0..1
        const ny01 = row / (ROWS - 1); // 0..1
        const fadeL = Math.min(1, nx01 * 4);       // left
        const fadeR = Math.min(1, (1 - nx01) * 4); // right
        const fadeT = Math.min(1, ny01 * 4);       // top
        const fadeB = Math.min(1, (1 - ny01) * 4); // bottom
        const edgeFadeAll = fadeL * fadeR * fadeT * fadeB;

        // Autonomous wave motion
        const wave1 = Math.sin(dist * 5 - t * 2.5) * 0.5 + 0.5;
        const wave2 = Math.cos(dist * 3 + t * 1.8) * 0.5 + 0.5;

        // Base autonomous distortion
        let distortX = Math.sin(t * 1.5 + row * 0.3 + col * 0.2) * cellW * 0.35;
        let distortY = Math.cos(t * 1.2 + col * 0.4 + row * 0.15) * cellH * 0.35;

        // Mouse interaction — repel/attract nearby dots
        if (mouseActive) {
          const mdx = cx / w - mx;
          const mdy = cy / h - my;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const influence = Math.max(0, 1 - mDist / 0.3);
          const push = influence * influence * 40;
          distortX += (mdx / (mDist + 0.01)) * push;
          distortY += (mdy / (mDist + 0.01)) * push;
        }

        // Size
        const baseSize = 2.5;
        const sizeBoost = wave1 * 3 + wave2 * 2;
        const size = baseSize + sizeBoost + Math.sin(t * 0.8 + dist * 4) * 1.5;

        // Color
        const mix = wave1 * 0.5 + wave2 * 0.3 + dist * 0.2;
        const r = Math.round(PRIMARY_COLOR.r + (ACCENT_COLOR.r - PRIMARY_COLOR.r) * mix);
        const g = Math.round(PRIMARY_COLOR.g + (ACCENT_COLOR.g - PRIMARY_COLOR.g) * mix);
        const b = Math.round(PRIMARY_COLOR.b + (ACCENT_COLOR.b - PRIMARY_COLOR.b) * mix);

        // Opacity — always visible, pulsing
        const alpha = Math.max(0, Math.min(0.7,
          (0.25 + wave1 * 0.25 + wave2 * 0.15) * edgeFadeAll
        ));

        const nx = cx + distortX;
        const ny = cy + distortY;

        nodes.push({ x: nx, y: ny, alpha, r, g, b, size });

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(nx, ny, Math.max(1, size), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw connection lines
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const idx = row * COLS + col;
        const node = nodes[idx];

        // Right neighbor
        if (col < COLS - 1) {
          const neighbor = nodes[idx + 1];
          const lineAlpha = Math.min(node.alpha, neighbor.alpha) * 0.35;
          if (lineAlpha > 0.01) {
            ctx.strokeStyle = `rgba(${node.r},${node.g},${node.b},${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
          }
        }
        // Bottom neighbor
        if (row < ROWS - 1) {
          const neighbor = nodes[idx + COLS];
          const lineAlpha = Math.min(node.alpha, neighbor.alpha) * 0.35;
          if (lineAlpha > 0.01) {
            ctx.strokeStyle = `rgba(${node.r},${node.g},${node.b},${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
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

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.parentElement?.addEventListener("mousemove", onMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", onMouseLeave);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [animate]);

  return (
    <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-auto opacity-80">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default SpiralGalaxy;
