import { motion } from "framer-motion";

const DiagnoseBlock = () => (
  <section className="py-24 md:py-32 px-6 bg-muted border-y border-border">
    <div className="max-w-3xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-2xl md:text-3xl lg:text-[32px] text-foreground leading-[1.6] tracking-tight"
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
