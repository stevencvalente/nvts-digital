import { useI18n } from "@/i18n";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border py-6 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-muted-foreground font-body">
      <img src={logo} alt="NVTS Digital" className="h-10 w-auto" />
      <div className="flex items-center gap-6">
        <span>© 2026</span>
        <a href="#services" className="hover:text-primary transition-colors duration-200">
          {t.nav.services}
        </a>
        <a href="#about" className="hover:text-primary transition-colors duration-200">
          {t.nav.about}
        </a>
        <a href="#contact" className="hover:text-primary transition-colors duration-200">
          {t.nav.contact}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
