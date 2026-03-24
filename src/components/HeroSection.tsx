import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-4xl relative z-10 pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display font-semibold text-[42px] md:text-[80px] leading-[1.05] tracking-tight text-foreground mb-8"
        >
          One expert.
          <br />
          <span className="text-primary">Five pillars.</span>
          <br />
          Zero gaps.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-lg font-body max-w-[440px] mb-12 leading-relaxed"
        >
          Full-stack digital consulting — from data to AI, experience to growth.
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
            Discover My Services
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-foreground/20 text-foreground px-8 py-4 font-display font-medium text-sm rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
          >
            Let's Talk
          </a>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
