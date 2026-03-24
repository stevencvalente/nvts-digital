import { motion } from "framer-motion";

const DiagnoseBlock = () => (
  <section className="py-20 md:py-28 px-6 bg-secondary/50">
    <div className="max-w-3xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-xl md:text-2xl lg:text-[28px] text-foreground leading-[1.6] tracking-tight"
      >
        Most businesses are sitting on untapped revenue — buried in broken processes,
        disconnected tools, and digital experiences that underperform.{" "}
        <span className="text-primary font-semibold">
          I diagnose the full stack and build what actually moves the needle.
        </span>
      </motion.p>
    </div>
  </section>
);

export default DiagnoseBlock;
