const Footer = () => (
  <footer className="border-t border-border py-10 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-body">
    <p>© {new Date().getFullYear()} Studio. All rights reserved.</p>
    <div className="flex gap-6">
      <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
      <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
      <a href="#" className="hover:text-foreground transition-colors">Email</a>
    </div>
  </footer>
);

export default Footer;
