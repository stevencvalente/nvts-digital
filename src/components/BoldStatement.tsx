import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/i18n";

const BoldStatement = () => {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const headingScale = useTransform(scrollYProgress, [0.1, 0.4], [0.92, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.12, 0.32, 0.7, 0.9], [0, 1, 1, 0]);
  const orbX1 = useTransform(scrollYProgress, [0, 1], ["-30%", "50%"]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], ["20%", "60%"]);
  const orbX2 = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ["70%", "20%"]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.5, 0.5, 0.2]);

  return (
    <section ref={containerRef} className="relative bg-foreground py-32 md:py-48 lg:py-56 px-6 overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: orbOpacity }}>
        <motion.div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] bg-primary/30" style={{ x: orbX1, y: orbY1 }} />
        <motion.div className="absolute right-0 w-[350px] h-[350px] rounded-full blur-[100px] bg-accent/20" style={{ x: orbX2, y: orbY2 }} />
      </motion.div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2
          className="font-display font-semibold text-[36px] md:text-[64px] text-background leading-[1.05] tracking-tight mb-10 lg:text-8xl"
          style={{ y: headingY, scale: headingScale, opacity: headingOpacity }}
        >
          {t.bold.line1}
          <br />
          <span className="text-primary text-8xl">{t.bold.line2}</span>
        </motion.h2>
        <motion.p
          className="font-body text-lg md:text-xl text-background/60 max-w-[580px] leading-relaxed mb-4 whitespace-pre-line mx-0 px-0 text-center"
          style={{ y: subtitleY, opacity: subtitleOpacity }}
        >
          {t.bold.subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default BoldStatement;
