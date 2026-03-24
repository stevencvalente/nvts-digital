import { motion } from "framer-motion";
import { useState } from "react";
import {
  Database,
  Layers,
  Rocket,
  Compass,
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
import Autoplay from "embla-carousel-autoplay";

const pillars = [
  {
    icon: Database,
    title: "Data & Content Intelligence",
    accent: "cyan",
    gradient: "from-cyan/20 via-cyan/5 to-transparent",
    borderGlow: "group-hover:shadow-[0_0_60px_-15px_hsl(var(--cyan)/0.3)]",
    tagline:
      "Make your data and assets work harder. Smarter content, sharper insights, automated intelligence.",
    stats: [
      { value: "30%", label: "faster product launches" },
      { value: "310%", label: "average DAM ROI" },
      { value: "75%", label: "less processing time" },
    ],
    services: [
      { icon: Package, name: "PIM" },
      { icon: FolderOpen, name: "DAM" },
      { icon: LineChart, name: "Data Analytics" },
      { icon: Brain, name: "AI Automation" },
    ],
  },
  {
    icon: Layers,
    title: "Digital Experience",
    accent: "violet",
    gradient: "from-violet/20 via-violet/5 to-transparent",
    borderGlow: "group-hover:shadow-[0_0_60px_-15px_hsl(var(--violet)/0.3)]",
    tagline:
      "Everything the end user sees and interacts with. Design, build, convert — pixel-perfect, everywhere.",
    stats: [
      { value: "47%", label: "more engagement" },
      { value: "11×", label: "higher app conversion" },
      { value: "11%+", label: "top store conversion" },
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
    gradient: "from-lime/20 via-lime/5 to-transparent",
    borderGlow: "group-hover:shadow-[0_0_60px_-15px_hsl(var(--lime)/0.3)]",
    tagline:
      "Full-funnel strategy from first click to loyal customer. Bring people in and keep them.",
    stats: [
      { value: "$8.71", label: "CRM return per $1" },
      { value: "5:1", label: "average ROAS" },
      { value: "8.5×", label: "SEO lead close rate" },
    ],
    services: [
      { icon: Users, name: "CRM" },
      { icon: Megaphone, name: "Paid Campaigns" },
      { icon: Search, name: "SEO" },
      { icon: BarChart3, name: "Marketing Strategy" },
    ],
  },
  {
    icon: Compass,
    title: "Digital Transformation",
    accent: "cyan",
    gradient: "from-cyan/10 via-violet/10 to-lime/5",
    borderGlow:
      "group-hover:shadow-[0_0_60px_-15px_hsl(var(--primary)/0.3)]",
    tagline:
      "The big picture. I connect the dots across technology, people, and process — positioning you as an industry leader, not a follower.",
    stats: [
      { value: "300%", label: "ROI in 12 months" },
      { value: "80%", label: "routine work automated" },
      { value: "∞", label: "competitive advantage" },
    ],
    services: [
      { icon: Database, name: "Data Strategy" },
      { icon: Layers, name: "Experience Design" },
      { icon: Rocket, name: "Growth Engine" },
      { icon: Brain, name: "AI Integration" },
    ],
  },
];

const accentColorMap: Record<string, string> = {
  cyan: "text-cyan",
  violet: "text-violet",
  lime: "text-lime",
};

const accentBorderMap: Record<string, string> = {
  cyan: "border-cyan/30",
  violet: "border-violet/30",
  lime: "border-lime/30",
};

const accentBgMap: Record<string, string> = {
  cyan: "bg-cyan/10",
  violet: "bg-violet/10",
  lime: "bg-lime/10",
};

const ServicesSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const scrollTo = (index: number) => api?.scrollTo(index);

  return (
    <section id="services" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-body">
            What I do
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Four pillars.
            <br />
            <span className="text-gradient-cyan">One vision.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl font-body leading-relaxed">
            Every engagement maps to a strategic pillar — connecting technology,
            growth, and transformation into measurable outcomes.
          </p>
        </motion.div>

        {/* Pillar navigation pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {pillars.map((p, i) => (
            <button
              key={p.title}
              onClick={() => scrollTo(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-display font-medium transition-all duration-300 ${
                current === i
                  ? `${accentBorderMap[p.accent]} ${accentColorMap[p.accent]} ${accentBgMap[p.accent]}`
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              <p.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{p.title}</span>
              <span className="sm:hidden">{p.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          plugins={[Autoplay({ delay: 6000, stopOnInteraction: true })]}
          className="w-full"
        >
          <CarouselContent
            className="-ml-4"
            ref={() => {
              if (!api) return;
              const onSelect = () => setCurrent(api.selectedScrollSnap());
              api.on("select", onSelect);
              onSelect();
            }}
          >
            {pillars.map((pillar, i) => (
              <CarouselItem key={pillar.title} className="pl-4 basis-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12 lg:p-16 transition-all duration-700 ${pillar.borderGlow}`}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />

                  <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Left column */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div
                          className={`inline-flex items-center gap-3 mb-6`}
                        >
                          <div
                            className={`w-12 h-12 rounded-xl ${accentBgMap[pillar.accent]} flex items-center justify-center`}
                          >
                            <pillar.icon
                              className={`w-6 h-6 ${accentColorMap[pillar.accent]}`}
                            />
                          </div>
                          <span
                            className={`text-xs font-display tracking-[0.2em] uppercase ${accentColorMap[pillar.accent]}`}
                          >
                            Pillar {i + 1}
                          </span>
                        </div>

                        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
                          {pillar.title}
                        </h3>

                        <p className="text-muted-foreground text-base md:text-lg font-body leading-relaxed max-w-md mb-8">
                          {pillar.tagline}
                        </p>
                      </div>

                      {/* Stats row */}
                      <div className="flex gap-8 flex-wrap">
                        {pillar.stats.map((stat) => (
                          <div key={stat.label}>
                            <p
                              className={`font-display text-2xl md:text-3xl font-bold ${accentColorMap[pillar.accent]}`}
                            >
                              {stat.value}
                            </p>
                            <p className="text-muted-foreground text-xs font-body mt-1 uppercase tracking-wider">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right column — services */}
                    <div className="flex flex-col gap-3">
                      <p className="text-xs font-display tracking-[0.2em] uppercase text-muted-foreground mb-2">
                        Included services
                      </p>
                      {pillar.services.map((svc) => (
                        <div
                          key={svc.name}
                          className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-background/50 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300 group/svc"
                        >
                          <svc.icon className="w-5 h-5 text-muted-foreground group-hover/svc:text-primary transition-colors" />
                          <span className="font-display font-medium text-sm">
                            {svc.name}
                          </span>
                          <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground/0 group-hover/svc:text-primary group-hover/svc:translate-x-1 transition-all duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation arrows */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-2">
            {pillars.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  current === i
                    ? "w-8 bg-primary"
                    : "w-4 bg-border hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => api?.scrollPrev()}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
