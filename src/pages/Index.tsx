import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BoldStatement from "@/components/BoldStatement";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="bg-background min-h-screen">
    <Navbar />
    <HeroSection />
    <BoldStatement />
    <ServicesSection />
    <AboutSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
