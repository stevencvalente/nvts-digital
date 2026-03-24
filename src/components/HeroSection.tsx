import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-violet/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-body"
        >
          Digital Consultant
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
        >
          Crafting digital
          <br />
          strategies that
          <br />
          <span className="text-gradient-cyan">move industries.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mb-12 font-body leading-relaxed"
        >
          I partner with organizations to unlock growth through technology, innovation, and bold thinking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex gap-4 items-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display font-semibold text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
          >
            Start a project
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 border border-foreground/20 text-foreground/80 px-8 py-4 font-display font-semibold text-sm tracking-wider uppercase hover:border-primary/50 hover:text-primary transition-colors"
          >
            Explore
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
