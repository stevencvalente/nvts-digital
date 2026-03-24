export type Locale = "en" | "pt" | "fr";

export interface Translations {
  nav: {
    services: string;
    about: string;
    contact: string;
    letsTalk: string;
  };
  hero: {
    line1: string;
    line2: string;
    line3: string;
    description: string;
    cta1: string;
    cta2: string;
  };
  bold: {
    line1: string;
    line2: string;
    subtitle: string;
  };
  services: {
    heading: string;
    subheading: string;
    clickToExplore: string;
    pillar: string;
    whatIDo: string;
    ctaButton: string;
    pillars: {
      title: string;
      tagline: string;
      services: string[];
      problemQuote: string;
      whatIDo: string;
    }[];
  };
  parallax: {
    features: {
      label: string;
      title: string;
      description: string;
    }[];
  };
  diagnose: {
    paragraph: string;
    highlight: string;
  };
  about: {
    label: string;
    heading: string;
    description: string;
    stats: string[];
  };
  contact: {
    heading: string;
    subheading: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    pillarPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    sentTitle: string;
    sentSubtitle: string;
    successToast: string;
    errorToast: string;
    errors: {
      nameRequired: string;
      nameMax: string;
      emailInvalid: string;
      emailMax: string;
      pillarRequired: string;
      messageRequired: string;
      messageMax: string;
    };
  };
  footer: {
    brand: string;
  };
}
