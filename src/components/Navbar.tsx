import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useI18n, LOCALES } from "@/i18n";

const Navbar = () => {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (code: string) => {
    navigate(`/${code}`);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-16 lg:px-24 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm" : ""
      }`}
    >
      <div className="flex items-center justify-between py-5">
        <a href={`/${locale}`} className="font-display font-semibold text-base tracking-tight text-foreground">
          NVTS DIGITAL
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher */}
          <div className="flex items-center gap-1 border border-border rounded-full px-1 py-0.5">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => switchLocale(l.code)}
                className={`text-xs font-display font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${
                  locale === l.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="text-sm font-display font-medium bg-primary text-primary-foreground px-5 py-2 rounded-md hover:bg-primary/90 transition-all duration-200"
          >
            {t.nav.letsTalk}
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="flex flex-col gap-4 py-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile language switcher */}
              <div className="flex items-center gap-2">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      switchLocale(l.code);
                      setMenuOpen(false);
                    }}
                    className={`text-xs font-display font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
                      locale === l.code
                        ? "bg-primary text-primary-foreground border-primary"
                        : "text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-display font-medium bg-primary text-primary-foreground px-5 py-2 rounded-md text-center"
              >
                {t.nav.letsTalk}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
