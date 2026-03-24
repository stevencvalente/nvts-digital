import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Database, Layers, Rocket, Compass, Sparkles,
  ChevronLeft, ChevronRight, X,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface PillarData {
  icon: typeof Database;
  number: string;
  title: string;
  tagline: string;
  services: string[];
  problemQuote: string;
  whatIDo: string;
  tools: string[];
  stats: { value: string; label: string }[];
}

const pillars: PillarData[] = [
  {
    icon: Database,
    number: "01",
    title: "Data & Content Intelligence",
    tagline: "Make your data and assets work harder.",
    services: ["PIM", "DAM", "Data Analytics"],
    problemQuote: "Our product data lives in 5 spreadsheets, our assets are scattered across shared drives, and nobody trusts the numbers in our reports.",
    whatIDo: "Audit your data flows, implement a single source of truth for product info and digital assets, and build analytics dashboards that give every team the same reliable picture.",
    tools: ["Akeneo", "Bynder", "Contentful", "Widen", "Tableau", "Looker", "Power BI"],
    stats: [
      { value: "30%", label: "faster product launches" },
      { value: "68%", label: "reduction in asset costs" },
      { value: "310%", label: "average DAM ROI" },
      { value: "17%", label: "fewer product returns" },
    ],
  },
  {
    icon: Layers,
    number: "02",
    title: "Digital Experience",
    tagline: "Pixel-perfect, everywhere.",
    services: ["WebGL/WebGPU", "Mobile Apps", "E-Commerce"],
    problemQuote: "Our website looks outdated, we have no mobile app despite customers asking for one, and our e-commerce store converts at barely 1.2%.",
    whatIDo: "Design and build immersive, high-performance digital touchpoints — from WebGL-powered brand experiences to conversion-optimised e-commerce and native-quality mobile apps.",
    tools: ["Three.js", "React Native", "Flutter", "Shopify", "Magento", "Next.js", "WebGPU"],
    stats: [
      { value: "11×", label: "higher app conversion" },
      { value: "47%", label: "more engagement" },
      { value: "25%", label: "revenue uplift post-app" },
      { value: "11%+", label: "e-com conversion rate" },
    ],
  },
  {
    icon: Rocket,
    number: "03",
    title: "Growth & Acquisition",
    tagline: "Full-funnel strategy, first click to loyal customer.",
    services: ["CRM", "Paid Campaigns", "SEO", "Marketing Strategy"],
    problemQuote: "We spend heavily on ads but can't track what converts. Our CRM is a mess of duplicates, our SEO is non-existent, and every team has a different marketing strategy.",
    whatIDo: "Build a unified growth engine — clean CRM foundation, a paid strategy built on real ROAS data, SEO that compounds over time, and a coherent multi-channel plan.",
    tools: ["HubSpot", "Salesforce", "Google Ads", "Meta Ads", "Semrush", "Ahrefs", "Klaviyo"],
    stats: [
      { value: "$8.71", label: "back per $1 on CRM" },
      { value: "5:1", label: "average paid ROAS" },
      { value: "748%", label: "median SEO ROI" },
      { value: "300%", label: "more lead conversions" },
    ],
  },
  {
    icon: Compass,
    number: "04",
    title: "Digital Transformation",
    tagline: "Make transformation actually stick.",
    services: ["Strategy", "Process Redesign", "Tech Integration", "Change Management"],
    problemQuote: "We have 12 tools that don't talk to each other, teams work in silos, and every digital initiative stalls halfway.",
    whatIDo: "Audit your full stack, eliminate redundancy, redesign processes around real business goals, and drive adoption across teams — so transformation actually sticks.",
    tools: ["Notion", "Miro", "Zapier", "Make", "Jira", "Confluence", "Azure"],
    stats: [
      { value: "40%", label: "ops cost reduction" },
      { value: "3×", label: "faster time-to-market" },
      { value: "60%", label: "fewer tool redundancies" },
      { value: "89%", label: "fail without strategy" },
    ],
  },
  {
    icon: Sparkles,
    number: "05",
    title: "Artificial Intelligence",
    tagline: "AI that delivers ROI, not hype.",
    services: ["Process Automation", "AI Chatbot", "Predictive Analytics", "Conversational AI"],
    problemQuote: "Our support team is overwhelmed with repetitive questions, we make gut-feel decisions because our data isn't actionable, and we have no idea where to actually start with AI.",
    whatIDo: "Identify the highest-ROI AI entry points in your business, build custom chatbots, automate repetitive workflows, and deploy predictive models that work 24/7.",
    tools: ["OpenAI", "Claude", "LangChain", "n8n", "Voiceflow", "Dialogflow", "Vertex AI"],
    stats: [
      { value: "80%", label: "queries handled automatically" },
      { value: "75%", label: "faster processing" },
      { value: "$3.50", label: "back per $1 spent" },
      { value: "300%", label: "ROI in year one" },
    ],
  },
];

const ServicesSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [selectedPillar, setSelectedPillar] = useState<PillarData | null>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [api]);

  return (
    <>
      <section id="services" className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h2 className="font-display font-semibold text-4xl md:text-[48px] text-foreground tracking-tight mb-4">
              Five pillars. One vision.
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-md mx-auto">
              Click any pillar to explore the full scope.
            </p>
          </motion.div>

          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "center" }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {pillars.map((pillar, i) => {
                const isActive = current === i;
                return (
                  <CarouselItem
                    key={pillar.title}
                    className="pl-4 basis-[80%] sm:basis-[55%] md:basis-[38%] lg:basis-[32%]"
                  >
                    <div
                      onClick={() => {
                        if (isActive) {
                          setSelectedPillar(pillar);
                        } else {
                          api?.scrollTo(i);
                        }
                      }}
                      className={`relative flex flex-col rounded-2xl border bg-card overflow-hidden cursor-pointer transition-all duration-500 ${
                        isActive
                          ? "border-primary/40 scale-100 opacity-100 shadow-lg"
                          : "border-border scale-[0.93] opacity-50"
                      }`}
                      style={{ minHeight: "420px" }}
                    >
                      <div className="flex flex-col flex-1 p-8">
                        {/* Icon & number */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <pillar.icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-display font-semibold text-sm text-muted-foreground">
                            {pillar.number}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-semibold text-xl md:text-2xl tracking-tight text-foreground mb-3 leading-tight">
                          {pillar.title}
                        </h3>

                        {/* Tagline */}
                        <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
                          {pillar.tagline}
                        </p>

                        {/* Services tags */}
                        <div className="mt-auto flex flex-wrap gap-2">
                          {pillar.services.map((svc) => (
                            <span
                              key={svc}
                              className="text-xs font-body px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border"
                            >
                              {svc}
                            </span>
                          ))}
                        </div>

                        {/* CTA hint */}
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-5 text-primary font-display font-medium text-sm"
                          >
                            Click to explore →
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => api?.scrollPrev()}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {pillars.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    current === i
                      ? "w-8 bg-primary"
                      : "w-3 bg-border hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => api?.scrollNext()}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPillar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedPillar(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <selectedPillar.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-display text-sm text-primary font-medium">
                        Pillar {selectedPillar.number}
                      </span>
                      <h3 className="font-display font-semibold text-2xl text-foreground">
                        {selectedPillar.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPillar(null)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Problem quote */}
                <blockquote className="italic text-muted-foreground text-sm font-body leading-relaxed pl-4 border-l-2 border-primary mb-8">
                  "{selectedPillar.problemQuote}"
                </blockquote>

                {/* What I do */}
                <div className="mb-8">
                  <h4 className="font-display font-medium text-foreground text-sm mb-2">What I do</h4>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">
                    {selectedPillar.whatIDo}
                  </p>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedPillar.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-body px-3 py-1.5 rounded-full border border-primary/20 text-primary bg-primary/5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {selectedPillar.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-secondary border border-border rounded-xl px-4 py-4 text-center"
                    >
                      <p className="font-display font-semibold text-2xl text-primary">
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
                  onClick={() => setSelectedPillar(null)}
                  className="inline-flex items-center justify-center w-full bg-primary text-primary-foreground font-display font-medium text-sm py-4 rounded-lg hover:bg-primary/90 transition-all duration-200"
                >
                  Want this for your business? Let's talk →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServicesSection;
