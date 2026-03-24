const Footer = () => (
  <footer className="border-t border-border py-6 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-muted-foreground font-body">
    <span>NVTS Digital</span>
    <div className="flex items-center gap-6">
      <span>© 2025</span>
      <a href="#services" className="hover:text-primary transition-colors duration-200">Services</a>
      <a href="#about" className="hover:text-primary transition-colors duration-200">About</a>
      <a href="#contact" className="hover:text-primary transition-colors duration-200">Contact</a>
    </div>
  </footer>
);

export default Footer;
