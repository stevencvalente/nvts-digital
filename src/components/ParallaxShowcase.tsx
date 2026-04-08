import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/i18n";
import { useIsMobile } from "@/hooks/use-mobile";

const ParallaxShowcase = () => {
  const { t } = useI18n();
  const features = t.parallax.features;
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileShowcase features={features} />;
  }

  return <DesktopShowcase features={features} />;
};

// Mobile: static layout, no scroll animation, no blur
const MobileShowcase = ({ features }: { features: { label: string; title: string; description: string }[] }) => {
  return (
    <section className="bg-foreground py-20 px-6">
      <div className="space-y-16">
        {features.map((feature, i) => (
          <div key={i} className="max-w-xl mx-auto">
            <span className="inline-block font-display text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">
              {feature.label}
            </span>
            <h2 className="font-display font-semibold text-[36px] text-background leading-[1.05] tracking-[-0.03em] mb-4">
              {feature.title}
            </h2>
            <p className="font-body text-base text-background/50 leading-relaxed">
              {feature.description}
            </p>
            {i < features.length - 1 && (
              <div className="mt-12 h-px bg-background/10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Desktop: full parallax experience
const DesktopShowcase = ({ features }: { features: { label: string; title: string; description: string }[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(features.length + 1) * 100}vh` }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden bg-foreground"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.2]) }}
        >
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-primary/30"
            style={{
              x: useTransform(scrollYProgress, [0, 1], ["-20%", "60%"]),
              y: useTransform(scrollYProgress, [0, 1], ["10%", "50%"]),
              willChange: "transform",
            }}
          />
          <motion.div
            className="absolute right-0 w-[400px] h-[400px] rounded-full blur-[100px] bg-accent/20"
            style={{
              x: useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]),
              y: useTransform(scrollYProgress, [0, 1], ["60%", "10%"]),
              willChange: "transform",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute top-0 left-0 h-[3px] bg-primary z-20"
          style={{
            width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            willChange: "transform",
          }}
        />

        <div className="absolute top-8 right-8 md:right-16 z-10">
          {features.map((_, i) => {
            const segStart = i / features.length;
            const segEnd = (i + 1) / features.length;
            return (
              <FeatureCounter
                key={i}
                index={i}
                total={features.length}
                progress={scrollYProgress}
                start={segStart}
                end={segEnd}
              />
            );
          })}
        </div>

        {features.map((feature, i) => {
          const segStart = i / features.length;
          const segMid = (i + 0.5) / features.length;
          const segEnd = (i + 1) / features.length;
          return (
            <FeaturePanel
              key={i}
              feature={feature}
              index={i}
              total={features.length}
              progress={scrollYProgress}
              segStart={segStart}
              segMid={segMid}
              segEnd={segEnd}
            />
          );
        })}
      </div>
    </section>
  );
};

const FeatureCounter = ({
  index,
  total,
  progress,
  start,
  end,
}: {
  index: number;
  total: number;
  progress: any;
  start: number;
  end: number;
}) => {
  const opacity = useTransform(
    progress,
    [start, start + 0.02, end - 0.02, end],
    [0, 1, 1, 0]
  );
  return (
    <motion.span
      className="absolute font-display text-sm tracking-widest text-background/40 font-medium"
      style={{ opacity, willChange: "opacity" }}
    >
      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </motion.span>
  );
};

const FeaturePanel = ({
  feature,
  index,
  total,
  progress,
  segStart,
  segMid,
  segEnd,
}: {
  feature: { label: string; title: string; description: string };
  index: number;
  total: number;
  progress: any;
  segStart: number;
  segMid: number;
  segEnd: number;
}) => {
  const isLast = index === total - 1;
  const opacity = useTransform(
    progress,
    [segStart, segStart + 0.08, isLast ? 1 : segEnd - 0.08, isLast ? 1 : segEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [segStart, segStart + 0.08, isLast ? 1 : segEnd - 0.08, isLast ? 1 : segEnd],
    [80, 0, 0, -80]
  );
  const scale = useTransform(progress, [segStart, segMid], [0.95, 1]);
  const labelX = useTransform(progress, [segStart, segStart + 0.06], [-20, 0]);
  const descY = useTransform(progress, [segStart, segEnd], [30, -10]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 md:px-16"
      style={{ opacity, willChange: "transform, opacity" }}
    >
      <div className="max-w-3xl w-full">
        <motion.span
          className="inline-block font-display text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-medium mb-6"
          style={{ x: labelX, opacity, willChange: "transform" }}
        >
          {feature.label}
        </motion.span>
        <motion.h2
          className="font-display font-semibold text-[40px] md:text-[72px] lg:text-[88px] text-background leading-[1.02] tracking-[-0.04em] mb-6"
          style={{ scale, y, willChange: "transform" }}
        >
          {feature.title}
        </motion.h2>
        <motion.p
          className="font-body text-lg md:text-xl text-background/50 max-w-lg leading-relaxed"
          style={{ y: descY, willChange: "transform" }}
        >
          {feature.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ParallaxShowcase;
