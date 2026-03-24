import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WebGLBackground from "@/components/WebGLBackground";

const Index = () => (
  <>
    <WebGLBackground />
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <ExperienceSection />
    <ContactSection />
    <Footer />
  </>
);

export default Index;
