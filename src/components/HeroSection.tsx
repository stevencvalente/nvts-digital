import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import { useI18n } from "@/i18n";

const SpiralGalaxy = lazy(() => import("@/components/SpiralGalaxy"));

const HeroSection = () => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage: "linear-gradient(to left, black 0%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 70%)",
          }}
        />
      </div>

      <Suspense fallback={null}>
        <SpiralGalaxy />
      </Suspense>

      <div className="max-w-4xl relative z-10 pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display font-semibold text-[42px] md:text-[80px] leading-[1.05] tracking-tight text-foreground mb-8"
        >
          {t.hero.line1}
          <br />
          <span className="text-primary">{t.hero.line2}</span>
          <br />
          {t.hero.line3}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-lg font-body max-w-[440px] mb-12 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#services"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 font-display font-medium text-sm rounded-lg hover:bg-primary/90 transition-all duration-200"
          >
            {t.hero.cta1}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-foreground/20 text-foreground px-8 py-4 font-display font-medium text-sm rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
          >
            {t.hero.cta2}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
