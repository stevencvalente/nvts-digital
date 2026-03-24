import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BoldStatement from "@/components/BoldStatement";
import ServicesSection from "@/components/ServicesSection";
import DiagnoseBlock from "@/components/DiagnoseBlock";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PowerLine from "@/components/PowerLine";

const Index = () => (
  <div className="relative bg-background min-h-screen">
    <PowerLine />
    <Navbar />
    <HeroSection />
    <BoldStatement />
    <ServicesSection />
    <DiagnoseBlock />
    <AboutSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
