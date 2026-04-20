import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Database, Layers, Rocket, Compass, Sparkles,
  ChevronLeft, ChevronRight, X,
} from "lucide-react";
import {
  Carousel, CarouselContent, CarouselItem, type CarouselApi,
} from "@/components/ui/carousel";
import { useI18n } from "@/i18n";

const icons = [Database, Layers, Rocket, Compass, Sparkles];
const numbers = ["01", "02", "03", "04", "05"];
const toolsList = [
  ["Akeneo", "Bynder", "Contentful", "Widen", "Tableau", "Looker", "Power BI"],
  ["Three.js", "React Native", "Flutter", "Shopify", "Magento", "Next.js", "WebGPU"],
  ["HubSpot", "Salesforce", "Google Ads", "Meta Ads", "Semrush", "Ahrefs", "Klaviyo"],
  ["Notion", "Miro", "Zapier", "Make", "Jira", "Confluence", "Azure"],
  ["OpenAI", "Claude", "LangChain", "n8n", "Voiceflow", "Dialogflow", "Vertex AI"],
];
const statsList = [
  [{ value: "30%", label: "faster product launches" }, { value: "68%", label: "reduction in asset costs" }, { value: "310%", label: "average DAM ROI" }, { value: "17%", label: "fewer product returns" }],
  [{ value: "11×", label: "higher app conversion" }, { value: "47%", label: "more engagement" }, { value: "25%", label: "revenue uplift post-app" }, { value: "11%+", label: "e-com conversion rate" }],
  [{ value: "$8.71", label: "back per $1 on CRM" }, { value: "5:1", label: "average paid ROAS" }, { value: "748%", label: "median SEO ROI" }, { value: "300%", label: "more lead conversions" }],
  [{ value: "40%", label: "ops cost reduction" }, { value: "3×", label: "faster time-to-market" }, { value: "60%", label: "fewer tool redundancies" }, { value: "89%", label: "fail without strategy" }],
  [{ value: "80%", label: "queries handled automatically" }, { value: "75%", label: "faster processing" }, { value: "$3.50", label: "back per $1 spent" }, { value: "300%", label: "ROI in year one" }],
];

const ServicesSection = () => {
  const { t } = useI18n();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [api]);

  const pillars = t.services.pillars;

  return (
    <>
      <section id="services" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h2 className="font-display font-semibold text-4xl md:text-[48px] text-foreground tracking-tight mb-4">
              {t.services.heading}
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-md mx-auto">
              {t.services.subheading}
            </p>
          </motion.div>

          <Carousel setApi={setApi} opts={{ loop: true, align: "center" }} className="w-full">
            <CarouselContent className="-ml-4">
              {pillars.map((pillar, i) => {
                const isActive = current === i;
                const Icon = icons[i];
                return (
                  <CarouselItem key={i} className="pl-4 basis-[88%] sm:basis-[70%] md:basis-[55%] lg:basis-[46%]">
                    <div
                      onClick={() => isActive ? setSelectedIndex(i) : api?.scrollTo(i)}
                      className={`relative flex flex-col rounded-2xl border bg-card overflow-hidden cursor-pointer transition-all duration-500 ${
                        isActive ? "border-primary/40 scale-100 opacity-100 shadow-lg" : "border-border scale-[0.93] opacity-50"
                      }`}
                      style={{ minHeight: "540px" }}
                    >
                      <div className="flex flex-col flex-1 p-10 md:p-12">
                        <div className="flex items-center justify-between mb-8">
                          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="font-display font-semibold text-base text-muted-foreground">{numbers[i]}</span>
                        </div>
                        <h3 className="font-display font-semibold text-2xl md:text-3xl tracking-tight text-foreground mb-3 leading-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-muted-foreground text-base font-body leading-relaxed mb-5">{pillar.tagline}</p>
                        <p className="text-muted-foreground/80 text-sm font-body leading-relaxed mb-8">{pillar.description}</p>
                        <ul className="mt-auto flex flex-col gap-2 mb-2">
                          {pillar.services.map((svc) => (
                            <li key={svc} className="flex items-center gap-2.5 text-sm font-body text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                              {svc}
                            </li>
                          ))}
                        </ul>
                        {isActive && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 inline-block bg-primary text-primary-foreground font-display font-medium text-sm px-6 py-2.5 rounded-full self-start">
                            {t.services.clickToExplore}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          <div className="flex items-center justify-center gap-6 mt-10">
            <button onClick={() => api?.scrollPrev()} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {pillars.map((_, i) => (
                <button key={i} onClick={() => api?.scrollTo(i)} className={`h-1.5 rounded-full transition-all duration-500 ${current === i ? "w-8 bg-primary" : "w-3 bg-border hover:bg-muted-foreground/50"}`} />
              ))}
            </div>
            <button onClick={() => api?.scrollNext()} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      {(() => { const Icon = icons[selectedIndex]; return <Icon className="w-5 h-5 text-primary" />; })()}
                    </div>
                    <div>
                      <span className="font-display text-sm text-primary font-medium">{t.services.pillar} {numbers[selectedIndex]}</span>
                      <h3 className="font-display font-semibold text-2xl text-foreground">{pillars[selectedIndex].title}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedIndex(null)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <blockquote className="italic text-muted-foreground text-sm font-body leading-relaxed pl-4 border-l-2 border-primary mb-8">
                  "{pillars[selectedIndex].problemQuote}"
                </blockquote>
                <div className="mb-8">
                  <h4 className="font-display font-medium text-foreground text-sm mb-2">{t.services.whatIDo}</h4>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">{pillars[selectedIndex].whatIDo}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {toolsList[selectedIndex].map((tool) => (
                    <span key={tool} className="text-xs font-body px-3 py-1.5 rounded-full border border-primary/20 text-primary bg-primary/5">{tool}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {statsList[selectedIndex].map((stat) => (
                    <div key={stat.label} className="bg-secondary border border-border rounded-xl px-4 py-4 text-center">
                      <p className="font-display font-semibold text-2xl text-primary">{stat.value}</p>
                      <p className="text-muted-foreground text-xs font-body mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <a href="#contact" onClick={() => setSelectedIndex(null)} className="inline-flex items-center justify-center w-full bg-primary text-primary-foreground font-display font-medium text-sm py-4 rounded-lg hover:bg-primary/90 transition-all duration-200">
                  {t.services.ctaButton}
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
