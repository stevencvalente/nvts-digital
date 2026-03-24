import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 py-5 transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <a href="#" className="font-display font-bold text-lg tracking-tight text-foreground">
        NVTS<span className="text-primary"> DIGITAL</span>
      </a>
      <div className="flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hidden md:block text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="text-sm font-display font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Let's talk
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
