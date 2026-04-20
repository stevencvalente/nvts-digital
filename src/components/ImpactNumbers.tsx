import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useI18n } from "@/i18n";

const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
};

const ImpactNumbers = () => {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -40]);

  const stats = t.impact.stats;

  return (
    <section ref={containerRef} className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden bg-background text-foreground">

      <motion.div className="max-w-6xl mx-auto relative z-10" style={{ opacity, y }}>
        <h2 className="font-display text-center text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 tracking-tight">
          {t.impact.heading}
        </h2>
        <p className="text-center text-muted-foreground text-base md:text-lg mb-16 md:mb-24 max-w-xl mx-auto">
          {t.impact.subheading}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-3 leading-none">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-display text-lg md:text-xl font-semibold text-foreground mb-2">
                {stat.label}
              </div>
              <p className="text-muted-foreground text-sm md:text-base max-w-[280px] mx-auto leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ImpactNumbers;
