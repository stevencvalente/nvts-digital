import { motion } from "framer-motion";
import { Package, FolderOpen, Users, Globe, Smartphone, Megaphone, Bot, MessageSquare, Brain, ShoppingCart, BarChart3, LineChart, Search } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "PIM",
    tagline: "Launch products 30% faster. Cut returns by 17%. Triple-digit ROI within 2 years.",
  },
  {
    icon: FolderOpen,
    title: "DAM",
    tagline: "Save 30% of your team's week. Cut asset costs by 68%. Average 310% ROI.",
  },
  {
    icon: Users,
    title: "CRM",
    tagline: "$8.71 back for every $1 spent. +29% revenue. +300% lead conversion.",
  },
  {
    icon: Globe,
    title: "WebGL Website",
    tagline: "47% more engagement. 94% of first impressions are design. Stand out or blend in.",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    tagline: "App users convert 11× more. Buy 33% more often. Revenue up 15–25%.",
  },
  {
    icon: Megaphone,
    title: "Paid Campaigns",
    tagline: "Up to $8 back per $1 spent. 5:1 average ROAS. Every click, optimized.",
  },
  {
    icon: Bot,
    title: "AI Process Automation",
    tagline: "Cut processing time by 75%. Reduce errors by 85%. ROI of 150–300% in year one.",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot / Assistant",
    tagline: "Handle 80% of queries automatically. Reply in seconds, not hours. $3.50 back per $1 spent.",
  },
  {
    icon: Brain,
    title: "AI — Full Stack",
    tagline: "Automate 80% of routine work. 75% faster processing. Up to 300% ROI in 12 months.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    tagline: "70% of carts are abandoned. Top stores convert at 11%+. The gap is pure lost revenue — I close it.",
  },
  {
    icon: BarChart3,
    title: "Marketing Strategy",
    tagline: "Data-driven strategies deliver 5–8% more ROI. Email returns $42 per $1. Every channel, optimized.",
  },
  {
    icon: LineChart,
    title: "Data Analytics",
    tagline: "54% of companies using analytics report above-average profits. Most still fly blind. You won't.",
  },
  {
    icon: Search,
    title: "SEO",
    tagline: "$7.48 back per $1 spent. SEO leads close 8.5× more. Organic search drives 44% of all B2B revenue.",
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
                {service.tagline}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
