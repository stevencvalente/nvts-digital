import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    services: "Services",
    about: "About",
    contact: "Contact",
    letsTalk: "Let's Talk",
  },
  hero: {
    line1: "One expert.",
    line2: "Five pillars.",
    line3: "Real results.",
    description:
      "I help ambitious companies generate more revenue, reduce operational friction and build digital experiences that actually perform across every layer of the stack",
    cta1: "Discover My Services",
    cta2: "Let's Talk",
  },
  bold: {
    line1: "I don't consult.",
    line2: "I transform.",
    subtitle:
      "Real change doesn't come from one more tool or one more agency.\n\n\n" +
      "It comes from someone who understands the full picture, your data, your customers, your technology and your goals and builds a strategy that connects all of it. That\u2019s what I do.",
  },
  services: {
    heading: "Five pillars. One vision.",
    subheading: "Click any pillar to explore the full scope.",
    clickToExplore: "Click to explore →",
    pillar: "Pillar",
    whatIDo: "What I do",
    ctaButton: "Want this for your business? Let's talk →",
    pillars: [
      {
        title: "Data & Content Intelligence",
        tagline: "Make your data and assets work harder.",
        description: "Centralise product information, organise digital assets, and turn raw data into clear, actionable insights your whole team can trust.",
        services: ["PIM", "DAM", "Data Analytics"],
        problemQuote:
          "Our product data lives in 5 spreadsheets, our assets are scattered across shared drives, and nobody trusts the numbers in our reports.",
        whatIDo:
          "Audit your data flows, implement a single source of truth for product info and digital assets, and build analytics dashboards that give every team the same reliable picture.",
      },
      {
        title: "Digital Experience",
        tagline: "Pixel-perfect, everywhere.",
        description: "Build immersive web experiences, high-converting e-commerce stores, and native-quality mobile apps that keep users coming back.",
        services: ["WebGL/WebGPU", "Mobile Apps", "E-Commerce"],
        problemQuote:
          "Our website looks outdated, we have no mobile app despite customers asking for one, and our e-commerce store converts at barely 1.2%.",
        whatIDo:
          "Design and build immersive, high-performance digital touchpoints — from WebGL-powered brand experiences to conversion-optimised e-commerce and native-quality mobile apps.",
      },
      {
        title: "Growth & Acquisition",
        tagline: "Full-funnel strategy, first click to loyal customer.",
        description: "Align CRM, paid media, SEO and marketing strategy into one growth engine that turns spend into measurable, compounding revenue.",
        services: ["CRM", "Paid Campaigns", "SEO", "Marketing Strategy"],
        problemQuote:
          "We spend heavily on ads but can't track what converts. Our CRM is a mess of duplicates, our SEO is non-existent, and every team has a different marketing strategy.",
        whatIDo:
          "Build a unified growth engine — clean CRM foundation, a paid strategy built on real ROAS data, SEO that compounds over time, and a coherent multi-channel plan.",
      },
      {
        title: "Digital Transformation",
        tagline: "Make transformation actually stick.",
        description: "Rationalise your tool stack, redesign processes around real goals, and drive adoption so digital initiatives don't stall halfway.",
        services: ["Strategy", "Process Redesign", "Tech Integration", "Change Management"],
        problemQuote:
          "We have 12 tools that don't talk to each other, teams work in silos, and every digital initiative stalls halfway.",
        whatIDo:
          "Audit your full stack, eliminate redundancy, redesign processes around real business goals, and drive adoption across teams — so transformation actually sticks.",
      },
      {
        title: "Artificial Intelligence",
        tagline: "AI that delivers ROI, not hype.",
        description: "Identify the highest-impact AI use cases, automate repetitive work, and deploy intelligent systems that run 24/7 and pay for themselves.",
        services: ["Process Automation", "AI Chatbot", "Predictive Analytics", "Conversational AI"],
        problemQuote:
          "Our support team is overwhelmed with repetitive questions, we make gut-feel decisions because our data isn't actionable, and we have no idea where to actually start with AI.",
        whatIDo:
          "Identify the highest-ROI AI entry points in your business, build custom chatbots, automate repetitive workflows, and deploy predictive models that work 24/7.",
      },
    ],
  },
  parallax: {
    features: [
      {
        label: "Strategy",
        title: "See the full picture.",
        description:
          "Most businesses optimize in silos. I map every touchpoint — from first click to repeat purchase — and find where value leaks out.",
      },
      {
        label: "Execution",
        title: "Ship what matters.",
        description:
          "No 80-page decks. I build, launch, and iterate websites, automations, integrations in weeks, not quarters.",
      },
      {
        label: "Growth",
        title: "Compound your advantage.",
        description:
          "Every system I build is designed to scale. Data compounds. Automations multiply. Your edge widens every month.",
      },
    ],
  },
  diagnose: {
    paragraph:
      "Most businesses are sitting on untapped revenue buried in broken processes, disconnected tools and digital experiences that underperform.",
    highlight: "I diagnose the full stack and build what actually moves the needle.",
  },
  about: {
    label: "About",
    heading: "One consultant. Full-stack expertise.",
    description:
      "With over 10 years in digital consulting, I've helped companies across e-commerce, retail, and B2B transform the way they operate, grow and compete. I work across the full digital stack from data architecture to customer experience, from AI strategy to paid acquisition so nothing falls through the cracks.",
    stats: ["10+ years experience", "30+ projects delivered", "5 pillars of expertise"],
  },
  contact: {
    heading: "Got a project in mind?",
    subheading: "Let's build something that actually performs.",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    pillarPlaceholder: "Pillar of interest",
    messagePlaceholder: "Message",
    sendButton: "Send Message",
    sendingButton: "Sending...",
    sentTitle: "Message sent.",
    sentSubtitle: "I'll be in touch shortly.",
    successToast: "Message sent successfully!",
    errorToast: "Something went wrong. Please try again.",
    errors: {
      nameRequired: "Name is required",
      nameMax: "Name must be under 100 characters",
      emailInvalid: "Please enter a valid email",
      emailMax: "Email must be under 255 characters",
      pillarRequired: "Please select a pillar of interest",
      messageRequired: "Message is required",
      messageMax: "Message must be under 2000 characters",
    },
  },
  footer: {
    brand: "NVTS Digital",
  },
};
