import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, X } from "lucide-react";

interface PillarData {
  number: string;
  title: string;
  accent: string;
  accentHex: string;
  services: string[];
  problemQuote: string;
  whatIDo: string;
  tools: string[];
  stats: { value: string; label: string }[];
}

const pillars: PillarData[] = [
  {
    number: "01",
    title: "Data & Content Intelligence",
    accent: "pillar-violet",
    accentHex: "#7C6FF7",
    services: ["PIM", "DAM", "Data Analytics"],
    problemQuote:
      "Our product data lives in 5 spreadsheets, our assets are scattered across shared drives, and nobody trusts the numbers in our reports.",
    whatIDo:
      "Audit your data flows, implement a single source of truth for product info and digital assets, and build analytics dashboards that give every team the same reliable picture.",
    tools: ["Akeneo", "Bynder", "Contentful", "Widen", "Tableau", "Looker", "Power BI"],
    stats: [
      { value: "30%", label: "faster product launches" },
      { value: "68%", label: "reduction in asset costs" },
      { value: "310%", label: "average DAM ROI" },
      { value: "17%", label: "fewer product returns" },
    ],
  },
  {
    number: "02",
    title: "Digital Experience",
    accent: "pillar-teal",
    accentHex: "#1DB98A",
    services: ["WebGL/WebGPU", "Mobile Apps", "E-Commerce"],
    problemQuote:
      "Our website looks outdated, we have no mobile app despite customers asking for one, and our e-commerce store converts at barely 1.2%.",
    whatIDo:
      "Design and build immersive, high-performance digital touchpoints — from WebGL-powered brand experiences to conversion-optimised e-commerce and native-quality mobile apps.",
    tools: ["Three.js", "React Native", "Flutter", "Shopify", "Magento", "Next.js", "WebGPU"],
    stats: [
      { value: "11×", label: "higher app conversion" },
      { value: "47%", label: "more engagement" },
      { value: "25%", label: "revenue uplift post-app" },
      { value: "11%+", label: "e-com conversion rate" },
    ],
  },
  {
    number: "03",
    title: "Growth & Acquisition",
    accent: "pillar-coral",
    accentHex: "#F4623A",
    services: ["CRM", "Paid Campaigns", "SEO", "Marketing Strategy"],
    problemQuote:
      "We spend heavily on ads but can't track what converts. Our CRM is a mess of duplicates, our SEO is non-existent, and every team has a different marketing strategy.",
    whatIDo:
      "Build a unified growth engine — clean CRM foundation, a paid strategy built on real ROAS data, SEO that compounds over time, and a coherent multi-channel plan.",
    tools: ["HubSpot", "Salesforce", "Google Ads", "Meta Ads", "Semrush", "Ahrefs", "Klaviyo"],
    stats: [
      { value: "$8.71", label: "back per $1 on CRM" },
      { value: "5:1", label: "average paid ROAS" },
      { value: "748%", label: "median SEO ROI" },
      { value: "300%", label: "more lead conversions" },
    ],
  },
  {
    number: "04",
    title: "Digital Transformation",
    accent: "pillar-blue",
    accentHex: "#3A9EF4",
    services: ["Strategy", "Process Redesign", "Tech Integration", "Change Management"],
    problemQuote:
      "We have 12 tools that don't talk to each other, teams work in silos, and every digital initiative stalls halfway. We spend more time managing systems than growing.",
    whatIDo:
      "Audit your full stack, eliminate redundancy, redesign processes around real business goals, and drive adoption across teams — so transformation actually sticks.",
    tools: ["Notion", "Miro", "Zapier", "Make", "Jira", "Confluence", "Azure"],
    stats: [
      { value: "40%", label: "ops cost reduction" },
      { value: "3×", label: "faster time-to-market" },
      { value: "60%", label: "fewer tool redundancies" },
      { value: "89%", label: "of transformations fail without strategy" },
    ],
  },
  {
    number: "05",
    title: "Artificial Intelligence",
    accent: "pillar-lime",
    accentHex: "#C8F135",
    services: ["Process Automation", "AI Chatbot", "Predictive Analytics", "Conversational AI"],
    problemQuote:
      "Our support team is overwhelmed with repetitive questions, we make gut-feel decisions because our data isn't actionable, and we have no idea where to actually start with AI.",
    whatIDo:
      "Identify the highest-ROI AI entry points in your business, build custom chatbots, automate repetitive workflows, and deploy predictive models that work 24/7.",
    tools: ["OpenAI", "Claude", "LangChain", "n8n", "Voiceflow", "Dialogflow", "Vertex AI"],
    stats: [
      { value: "80%", label: "of queries handled automatically" },
      { value: "75%", label: "faster processing" },
      { value: "$3.50", label: "back per $1 spent" },
      { value: "300%", label: "ROI in year one" },
    ],
  },
];

const ServicesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (i: number) => setExpanded(expanded === i ? null : i);

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display font-semibold text-4xl md:text-[48px] text-foreground tracking-tight mb-4">
            Five pillars. Twelve disciplines.
          </h2>
          <p className="font-body text-base text-muted-foreground">
            Click any pillar to explore the process, tools, and business impact.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card overflow-hidden transition-colors duration-200"
              style={{
                borderColor: expanded === i ? pillar.accentHex : undefined,
              }}
            >
              {/* Header */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-4 md:gap-6 px-6 py-5 text-left cursor-pointer group"
              >
                <span
                  className="font-display font-semibold text-lg shrink-0"
                  style={{ color: pillar.accentHex }}
                >
                  {pillar.number}
                </span>
                <span className="font-display font-medium text-foreground text-base md:text-lg flex-1">
                  {pillar.title}
                </span>
                <span className="hidden md:flex items-center gap-2 text-muted-foreground text-[13px] font-body">
                  {pillar.services.join(" · ")}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-foreground/30 transition-colors ml-2">
                  {expanded === i ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </span>
              </button>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 bg-secondary/50 space-y-8">
                      {/* Problem quote */}
                      <blockquote
                        className="italic text-muted-foreground text-sm font-body leading-relaxed pl-4 border-l-2 mt-4"
                        style={{ borderColor: pillar.accentHex }}
                      >
                        "{pillar.problemQuote}"
                      </blockquote>

                      {/* What I do */}
                      <div>
                        <h4 className="font-display font-medium text-foreground text-sm mb-2">
                          What I do
                        </h4>
                        <p className="text-muted-foreground text-sm font-body leading-relaxed">
                          {pillar.whatIDo}
                        </p>
                      </div>

                      {/* Tools */}
                      <div className="flex flex-wrap gap-2">
                        {pillar.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-xs font-body px-3 py-1.5 rounded-full border"
                            style={{
                              color: pillar.accentHex,
                              borderColor: `${pillar.accentHex}4D`,
                              backgroundColor: `${pillar.accentHex}15`,
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {pillar.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="bg-card border border-border rounded-lg px-4 py-4 text-center"
                          >
                            <p
                              className="font-display font-semibold text-2xl md:text-[32px]"
                              style={{ color: pillar.accentHex }}
                            >
                              {stat.value}
                            </p>
                            <p className="text-muted-foreground text-xs font-body mt-1">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <a
                        href="#contact"
                        className="inline-flex items-center font-display font-medium text-sm transition-colors duration-200 hover:opacity-80"
                        style={{ color: pillar.accentHex }}
                      >
                        Want this for your business? Let's talk →
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
