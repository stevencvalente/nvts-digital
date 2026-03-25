import type { Translations } from "./types";

export const fr: Translations = {
  nav: {
    services: "Services",
    about: "À propos",
    contact: "Contact",
    letsTalk: "Parlons-en",
  },
  hero: {
    line1: "Un expert.",
    line2: "Cinq piliers.",
    line3: "Résultats réels.",
    description:
      "J'aide les entreprises ambitieuses à générer plus de revenus, réduire les frictions opérationnelles et construire des expériences digitales qui performent réellement à chaque niveau du stack",
    cta1: "Découvrir Mes Services",
    cta2: "Parlons-en",
  },
  bold: {
    line1: "Je ne fais pas du conseil.",
    line2: "Je transforme.",
    subtitle:
      "Votre agence gère une chose. Votre développeur en gère une autre. Pendant ce temps, vous perdez de l'argent.",
  },
  services: {
    heading: "Cinq piliers. Une vision.",
    subheading: "Cliquez sur un pilier pour explorer.",
    clickToExplore: "Cliquez pour explorer →",
    pillar: "Pilier",
    whatIDo: "Ce que je fais",
    ctaButton: "Vous voulez ça pour votre entreprise ? Parlons-en →",
    pillars: [
      {
        title: "Données & Intelligence de Contenu",
        tagline: "Faites travailler vos données et vos actifs plus dur.",
        services: ["PIM", "DAM", "Analyse de Données"],
        problemQuote:
          "Nos données produit sont réparties dans 5 tableurs, nos actifs sont dispersés sur des drives partagés, et personne ne fait confiance aux chiffres de nos rapports.",
        whatIDo:
          "J'audite vos flux de données, j'implémente une source unique de vérité pour les informations produit et les actifs numériques, et je construis des dashboards analytics qui donnent à chaque équipe la même vision fiable.",
      },
      {
        title: "Expérience Digitale",
        tagline: "Pixel-perfect, partout.",
        services: ["WebGL/WebGPU", "Apps Mobiles", "E-Commerce"],
        problemQuote:
          "Notre site web semble dépassé, nous n'avons pas d'app mobile malgré les demandes des clients, et notre boutique e-commerce convertit à peine 1.2%.",
        whatIDo:
          "Je conçois et développe des points de contact numériques immersifs et performants — des expériences de marque en WebGL à l'e-commerce optimisé pour la conversion et aux apps mobiles de qualité native.",
      },
      {
        title: "Croissance & Acquisition",
        tagline: "Stratégie full-funnel, du premier clic au client fidèle.",
        services: ["CRM", "Campagnes Payantes", "SEO", "Stratégie Marketing"],
        problemQuote:
          "Nous dépensons beaucoup en publicité mais ne pouvons pas suivre ce qui convertit. Notre CRM est un fouillis de doublons, notre SEO est inexistant, et chaque équipe a une stratégie marketing différente.",
        whatIDo:
          "Je construis un moteur de croissance unifié — une base CRM propre, une stratégie payante basée sur des données ROAS réelles, un SEO qui s'accumule dans le temps, et un plan multicanal cohérent.",
      },
      {
        title: "Transformation Digitale",
        tagline: "Faire en sorte que la transformation tienne vraiment.",
        services: ["Stratégie", "Refonte des Processus", "Intégration Tech", "Conduite du Changement"],
        problemQuote:
          "Nous avons 12 outils qui ne communiquent pas entre eux, les équipes travaillent en silos, et chaque initiative digitale s'enlise à mi-chemin.",
        whatIDo:
          "J'audite l'ensemble de votre stack, j'élimine les redondances, je redéfinis les processus autour d'objectifs business réels, et je favorise l'adoption dans toutes les équipes — pour que la transformation tienne vraiment.",
      },
      {
        title: "Intelligence Artificielle",
        tagline: "L'IA qui délivre du ROI, pas du battage.",
        services: ["Automatisation", "Chatbot IA", "Analyse Prédictive", "IA Conversationnelle"],
        problemQuote:
          "Notre équipe support est submergée de questions répétitives, nous prenons des décisions au feeling car nos données ne sont pas exploitables, et nous ne savons pas par où commencer avec l'IA.",
        whatIDo:
          "J'identifie les points d'entrée IA à plus fort ROI dans votre entreprise, je crée des chatbots sur mesure, j'automatise les workflows répétitifs et je déploie des modèles prédictifs qui fonctionnent 24h/24.",
      },
    ],
  },
  parallax: {
    features: [
      {
        label: "Stratégie",
        title: "Voyez le tableau complet.",
        description:
          "La plupart des entreprises optimisent en silos. Je cartographie chaque point de contact — du premier clic à l'achat récurrent — et je trouve où la valeur s'échappe.",
      },
      {
        label: "Exécution",
        title: "Livrez ce qui compte.",
        description:
          "Pas de decks de 80 pages. Je construis, lance et itère des sites, automatisations, intégrations en semaines, pas en trimestres.",
      },
      {
        label: "Croissance",
        title: "Cumulez votre avantage.",
        description:
          "Chaque système que je construis est conçu pour scaler. Les données s'accumulent. Les automatisations se multiplient. Votre avantage grandit chaque mois.",
      },
    ],
  },
  diagnose: {
    paragraph:
      "La plupart des entreprises sont assises sur des revenus inexploités, enfouis dans des processus cassés, des outils déconnectés et des expériences digitales sous-performantes.",
    highlight:
      "Je diagnostique l'ensemble du stack et je construis ce qui fait vraiment avancer les choses.",
  },
  about: {
    label: "À propos",
    heading: "Un consultant. Expertise full-stack.",
    description:
      "Avec plus de 10 ans en conseil digital, j'ai aidé des entreprises en e-commerce, retail et B2B à transformer leur façon d'opérer, de croître et de concurrencer. Je travaille sur l'ensemble du stack digital, de l'architecture données à l'expérience client, de la stratégie IA à l'acquisition payante, pour que rien ne passe entre les mailles.",
    stats: ["10+ ans d'expérience", "30+ projets livrés", "5 piliers d'expertise"],
  },
  contact: {
    heading: "Vous avez un projet en tête ?",
    subheading: "Construisons quelque chose qui performe vraiment.",
    namePlaceholder: "Nom",
    emailPlaceholder: "Email",
    pillarPlaceholder: "Pilier d'intérêt",
    messagePlaceholder: "Message",
    sendButton: "Envoyer le Message",
    sendingButton: "Envoi en cours...",
    sentTitle: "Message envoyé.",
    sentSubtitle: "Je vous recontacte sous peu.",
    successToast: "Message envoyé avec succès !",
    errorToast: "Quelque chose s'est mal passé. Veuillez réessayer.",
    errors: {
      nameRequired: "Le nom est requis",
      nameMax: "Le nom doit faire moins de 100 caractères",
      emailInvalid: "Veuillez entrer un email valide",
      emailMax: "L'email doit faire moins de 255 caractères",
      pillarRequired: "Veuillez sélectionner un pilier d'intérêt",
      messageRequired: "Le message est requis",
      messageMax: "Le message doit faire moins de 2000 caractères",
    },
  },
  footer: {
    brand: "NVTS Digital",
  },
};
