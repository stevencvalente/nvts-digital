import { motion } from "framer-motion";

const stats = [
  "10+ years experience",
  "30+ projects delivered",
  "5 pillars of expertise",
];

const AboutSection = () => (
  <section id="about" className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
      {/* Photo placeholder */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="aspect-[4/5] bg-secondary border border-border rounded-xl flex items-center justify-center"
      >
        <span className="text-muted-foreground/40 font-body text-sm">[ Photo ]</span>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <p className="text-primary text-xs font-body uppercase tracking-[0.2em] mb-4">
          About
        </p>
        <h2 className="font-display font-medium text-3xl md:text-4xl text-foreground tracking-tight mb-6">
          One consultant. Full-stack expertise.
        </h2>
        <p className="text-muted-foreground font-body text-base leading-[1.8] mb-8">
          With over 10 years in digital consulting, I've helped companies across e-commerce,
          retail, and B2B transform the way they operate, grow, and compete. I work across the
          full digital stack — from data architecture to customer experience, from AI strategy
          to paid acquisition — so nothing falls through the cracks.
        </p>

        <div className="flex flex-wrap gap-3">
          {stats.map((s) => (
            <span
              key={s}
              className="text-sm font-body text-foreground bg-secondary border border-border rounded-full px-5 py-2.5"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
