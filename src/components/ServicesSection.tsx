import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Database,
  Layers,
  Rocket,
  Compass,
  Sparkles,
  Package,
  FolderOpen,
  LineChart,
  Brain,
  Globe,
  Smartphone,
  ShoppingCart,
  Users,
  Megaphone,
  Search,
  BarChart3,
  Bot,
  MessageSquare,
  Cpu,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const pillars = [
  {
    icon: Database,
    title: "Data & Content Intelligence",
    accent: "cyan",
    tagline:
      "Make your data and assets work harder. Smarter content, sharper insights, automated intelligence.",
    stats: [
      { value: "30%", label: "faster launches" },
      { value: "310%", label: "average ROI" },
      { value: "75%", label: "less processing" },
    ],
    services: [
      { icon: Package, name: "PIM" },
      { icon: FolderOpen, name: "DAM" },
      { icon: LineChart, name: "Data Analytics" },
    ],
  },
  {
    icon: Layers,
    title: "Digital Experience",
    accent: "violet",
    tagline:
      "Everything the end user sees and interacts with. Design, build, convert — pixel-perfect, everywhere.",
    stats: [
      { value: "47%", label: "more engagement" },
      { value: "11×", label: "app conversion" },
      { value: "11%+", label: "store conversion" },
    ],
    services: [
      { icon: Globe, name: "WebGL / WebGPU" },
      { icon: Smartphone, name: "Mobile Apps" },
      { icon: ShoppingCart, name: "E-Commerce" },
    ],
  },
  {
    icon: Rocket,
    title: "Growth & Acquisition",
    accent: "lime",
    tagline:
      "Full-funnel strategy from first click to loyal customer. Bring people in and keep them.",
    stats: [
      { value: "$8.71", label: "per $1 CRM" },
      { value: "5:1", label: "avg ROAS" },
      { value: "8.5×", label: "SEO close rate" },
    ],
    services: [
      { icon: Users, name: "CRM" },
      { icon: Megaphone, name: "Paid Campaigns" },
      { icon: Search, name: "SEO" },
      { icon: BarChart3, name: "Marketing Strategy" },
    ],
  },
  {
    icon: Sparkles,
    title: "Artificial Intelligence",
    accent: "amber",
    tagline:
      "From automating workflows to deploying intelligent assistants — AI that delivers real ROI, not hype.",
    stats: [
      { value: "300%", label: "ROI year one" },
      { value: "80%", label: "queries handled" },
      { value: "75%", label: "faster processing" },
    ],
    services: [
      { icon: Cpu, name: "Process Automation" },
      { icon: Bot, name: "AI Chatbot / Assistant" },
      { icon: Brain, name: "Predictive Analytics" },
      { icon: MessageSquare, name: "Conversational AI" },
    ],
  },
  {
    icon: Compass,
    title: "Digital Transformation",
    accent: "cyan",
    tagline:
      "The big picture. I connect technology, people, and process — positioning you as an industry leader.",
    stats: [
      { value: "300%", label: "ROI in 12mo" },
      { value: "80%", label: "automated" },
      { value: "∞", label: "advantage" },
    ],
    services: [
      { icon: Database, name: "Data Strategy" },
      { icon: Layers, name: "Experience Design" },
      { icon: Rocket, name: "Growth Engine" },
      { icon: Sparkles, name: "AI Integration" },
    ],
  },
];

const accentColor: Record<string, string> = {
  cyan: "text-cyan",
  violet: "text-violet",
  lime: "text-lime",
  amber: "text-amber-400",
};

const accentBg: Record<string, string> = {
  cyan: "bg-cyan/10",
  violet: "bg-violet/10",
  lime: "bg-lime/10",
  amber: "bg-amber-400/10",
};

const accentBorder: Record<string, string> = {
  cyan: "border-cyan/40",
  violet: "border-violet/40",
  lime: "border-lime/40",
  amber: "border-amber-400/40",
};

const ServicesSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [api]);

  return (
    <section id="services" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-body">
            What I do
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Four pillars.{" "}
            <span className="text-gradient-cyan">One vision.</span>
          </h2>
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
                  className="pl-4 basis-[85%] sm:basis-[75%] md:basis-[60%] lg:basis-[50%]"
                >
                  <div
                    className={`relative flex flex-col rounded-2xl border bg-card overflow-hidden transition-all duration-500 cursor-grab active:cursor-grabbing ${
                      isActive
                        ? `${accentBorder[pillar.accent]} scale-100 opacity-100 shadow-2xl`
                        : "border-border/30 scale-[0.92] opacity-40"
                    }`}
                    style={{ minHeight: "560px" }}
                    onClick={() => api?.scrollTo(i)}
                  >
                    {/* Top accent bar */}
                    <div
                      className={`h-1 w-full transition-all duration-500 ${
                        isActive ? accentBg[pillar.accent].replace("/10", "") : "bg-border"
                      }`}
                    />

                    <div className="flex flex-col flex-1 p-8 md:p-10">
                      {/* Header */}
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div
                            className={`w-11 h-11 rounded-xl ${accentBg[pillar.accent]} flex items-center justify-center`}
                          >
                            <pillar.icon
                              className={`w-5 h-5 ${accentColor[pillar.accent]}`}
                            />
                          </div>
                          <span
                            className={`text-[10px] font-display tracking-[0.25em] uppercase ${accentColor[pillar.accent]}`}
                          >
                            Pillar {i + 1}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4 leading-tight">
                          {pillar.title}
                        </h3>

                        <p className="text-muted-foreground text-sm font-body leading-relaxed">
                          {pillar.tagline}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-6 mb-8">
                        {pillar.stats.map((stat) => (
                          <div key={stat.label}>
                            <p
                              className={`font-display text-xl md:text-2xl font-bold ${accentColor[pillar.accent]}`}
                            >
                              {stat.value}
                            </p>
                            <p className="text-muted-foreground text-[10px] font-body mt-1 uppercase tracking-wider">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Services list */}
                      <div className="mt-auto flex flex-col gap-2">
                        <p className="text-[10px] font-display tracking-[0.25em] uppercase text-muted-foreground mb-1">
                          Services
                        </p>
                        {pillar.services.map((svc) => (
                          <div
                            key={svc.name}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/40 bg-background/40 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300 group/svc"
                          >
                            <svc.icon className="w-4 h-4 text-muted-foreground group-hover/svc:text-primary transition-colors" />
                            <span className="font-display font-medium text-sm">
                              {svc.name}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover/svc:opacity-100 group-hover/svc:translate-x-1 text-primary transition-all duration-300" />
                          </div>
                        ))}
                      </div>
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
  );
};

export default ServicesSection;
