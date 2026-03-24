import { motion } from "framer-motion";
import { Crown, Landmark, Factory, Monitor, ShieldCheck } from "lucide-react";

const experiences = [
  {
    icon: Crown,
    sector: "Luxury Industry",
    tagline: "Elevating digital presence for premium brands",
    description: "Led digital transformation initiatives for leading luxury houses, bridging heritage craftsmanship with modern consumer expectations through bespoke technology platforms.",
    accent: "text-primary",
  },
  {
    icon: Landmark,
    sector: "Governments",
    tagline: "Modernizing public services at scale",
    description: "Advised government agencies on citizen-facing digital services, data governance frameworks, and smart city infrastructure deployments across multiple regions.",
    accent: "text-violet",
  },
  {
    icon: Factory,
    sector: "Big Industries",
    tagline: "Powering industrial innovation",
    description: "Partnered with major industrial players to implement IoT solutions, predictive maintenance systems, and supply chain optimization that delivered measurable ROI.",
    accent: "text-lime",
  },
  {
    icon: Monitor,
    sector: "IT & Technology",
    tagline: "Building the backbone of digital ecosystems",
    description: "Guided enterprise IT departments through cloud migrations, DevOps adoption, and platform modernization to accelerate delivery and reduce operational overhead.",
    accent: "text-primary",
  },
  {
    icon: ShieldCheck,
    sector: "Police & Law Enforcement",
    tagline: "Securing communities through technology",
    description: "Developed secure communication platforms, evidence management systems, and data analytics tools for law enforcement agencies with strict compliance requirements.",
    accent: "text-violet",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 px-6 md:px-16 lg:px-24 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-body">Track Record</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Industries I've shaped
          </h2>
        </motion.div>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.sector}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border-t border-border py-10 md:py-12 flex flex-col md:flex-row md:items-start gap-6 md:gap-12 hover:bg-secondary/30 transition-colors px-4 -mx-4"
            >
              <div className="flex items-center gap-4 md:w-64 shrink-0">
                <exp.icon className={`w-5 h-5 ${exp.accent}`} />
                <h3 className="font-display text-xl md:text-2xl font-semibold">{exp.sector}</h3>
              </div>
              <div className="flex-1">
                <p className={`text-sm font-display font-medium ${exp.accent} mb-2`}>{exp.tagline}</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
