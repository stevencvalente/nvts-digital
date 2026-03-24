import { motion } from "framer-motion";

const BoldStatement = () => (
  <section className="bg-foreground py-24 md:py-32 px-6">
    <div className="max-w-5xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-display font-semibold text-[36px] md:text-[64px] lg:text-[72px] text-background leading-[1.05] tracking-tight mb-10"
      >
        I don't consult.
        <br />
        <span className="text-primary">I transform.</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="font-body text-lg md:text-xl text-background/60 max-w-[580px] mx-auto leading-relaxed mb-4"
      >
        Your agency handles one thing. Your developer handles another.
        Meanwhile, you're losing money.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="font-body text-base text-background/40 max-w-[500px] mx-auto leading-relaxed"
      >
        Most businesses are sitting on untapped revenue — buried in broken processes,
        disconnected tools, and digital experiences that underperform. I diagnose the
        full stack and build what actually moves the needle.
      </motion.p>
    </div>
  </section>
);

export default BoldStatement;
