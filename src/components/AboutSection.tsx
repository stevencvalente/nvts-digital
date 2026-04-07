import { motion } from "framer-motion";

import { useI18n } from "@/i18n";

const AboutSection = () => {
  const { t } = useI18n();

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-secondary/50">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="aspect-[4/5] rounded-2xl overflow-hidden"
        >
          <img src="/lovable-uploads/7a248e3b-8a40-42e4-b9a6-f6eca9b00cbc.webp" alt="Digital transformation consultant" className="w-full h-full object-cover rounded-2xl shadow-md" width="600" height="750" loading="lazy" decoding="async" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-primary text-xs font-body uppercase tracking-[0.2em] mb-4 font-medium">{t.about.label}</p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-foreground tracking-tight mb-6">
            {t.about.heading}
          </h2>
          <p className="text-muted-foreground font-body text-base leading-[1.8] mb-8">
            {t.about.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {t.about.stats.map((s) => (
              <span key={s} className="text-sm font-body text-foreground bg-background border border-border rounded-full px-5 py-2.5">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
