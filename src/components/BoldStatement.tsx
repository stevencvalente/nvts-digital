import { motion } from "framer-motion";

const BoldStatement = () => (
  <section className="bg-primary py-16 md:py-[60px] px-6">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display font-semibold text-[28px] md:text-[48px] text-primary-foreground mb-6"
      >
        I don't consult. I transform.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-body text-base text-primary-foreground/80 max-w-[560px] mx-auto leading-relaxed mb-4"
      >
        Your agency handles one thing. Your developer handles another.
        Meanwhile, you're losing money.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-body text-base text-primary-foreground/60 max-w-[480px] mx-auto leading-relaxed"
      >
        Most businesses are sitting on untapped revenue — buried in broken processes,
        disconnected tools, and digital experiences that underperform. I diagnose the
        full stack and build what actually moves the needle.
      </motion.p>
    </div>
  </section>
);

export default BoldStatement;
