import { useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/i18n";
import beforeImg from "@/assets/before-state.jpg";
import afterImg from "@/assets/after-state.jpg";

const BeforeAfterSlider = () => {
  const { t } = useI18n();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const updatePos = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  }, [updatePos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePos(e.clientX);
  }, [updatePos]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <section ref={containerRef} className="relative bg-background py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          style={{ opacity: headingOpacity, y: headingY }}
        >
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
            {t.beforeAfter.heading}
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            {t.beforeAfter.subheading}
          </p>
        </motion.div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-xl"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          role="slider"
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.beforeAfter.heading}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setSliderPos((p) => Math.max(0, p - 2));
            if (e.key === "ArrowRight") setSliderPos((p) => Math.min(100, p + 2));
          }}
        >
          {/* After (background) */}
          <img
            src={afterImg}
            alt={t.beforeAfter.afterLabel}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            width={960}
            height={640}
          />

          {/* Before (clipped) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={beforeImg}
              alt={t.beforeAfter.beforeLabel}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              width={960}
              height={640}
            />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-background z-10 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          />

          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-background border-2 border-primary shadow-lg flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary">
              <path d="M5 3L2 8L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 3L14 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Labels */}
          <span className="absolute top-4 left-4 bg-foreground/80 text-background text-xs font-display font-semibold px-3 py-1 rounded-full z-10 uppercase tracking-wider">
            {t.beforeAfter.beforeLabel}
          </span>
          <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-display font-semibold px-3 py-1 rounded-full z-10 uppercase tracking-wider">
            {t.beforeAfter.afterLabel}
          </span>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
