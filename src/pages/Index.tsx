import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import useHeadMeta from "@/hooks/useHeadMeta";

const BoldStatement = lazy(() => import("@/components/BoldStatement"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ParallaxShowcase = lazy(() => import("@/components/ParallaxShowcase"));
const DiagnoseBlock = lazy(() => import("@/components/DiagnoseBlock"));
const ImpactNumbers = lazy(() => import("@/components/ImpactNumbers"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useHeadMeta();

  return (
    <div className="bg-background min-h-screen">
    <Navbar />
    <HeroSection />
    <Suspense fallback={null}>
      <BoldStatement />
      <ServicesSection />
      <ParallaxShowcase />
      <DiagnoseBlock />
      <ImpactNumbers />
      <AboutSection />
      <ContactSection />
      <Footer />
    </Suspense>
    </div>
  );
};

export default Index;
