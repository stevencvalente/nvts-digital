import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Shield, Code, BarChart3, Zap } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Digital Strategy",
    description: "Roadmaps that align technology with business objectives for lasting competitive advantage.",
  },
  {
    icon: TrendingUp,
    title: "Growth & Transformation",
    description: "Scaling organizations through data-driven frameworks and operational excellence.",
  },
  {
    icon: Shield,
    title: "Cybersecurity Advisory",
    description: "Risk assessments, compliance strategies, and resilience planning for critical infrastructure.",
  },
  {
    icon: Code,
    title: "Technology Architecture",
    description: "Designing robust systems that adapt to evolving needs and emerging technologies.",
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    description: "Turning raw data into actionable intelligence for smarter decision-making.",
  },
  {
    icon: Zap,
    title: "Innovation Workshops",
    description: "Facilitating ideation sprints that unlock creative solutions for complex challenges.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-body">What I do</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Services
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background p-8 md:p-10 group hover:bg-secondary/50 transition-colors duration-500"
            >
              <service.icon className="w-6 h-6 text-primary mb-6 group-hover:text-lime transition-colors duration-500" />
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
