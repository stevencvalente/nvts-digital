import { motion } from "framer-motion";
import { useState } from "react";
import { Linkedin } from "lucide-react";

const pillarOptions = [
  "Data & Content Intelligence",
  "Digital Experience",
  "Growth & Acquisition",
  "Digital Transformation",
  "Artificial Intelligence",
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", pillar: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", pillar: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-display font-semibold text-4xl md:text-[52px] text-foreground tracking-tight mb-4">
            Got a project in mind?
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Let's build something that actually performs.
          </p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-secondary border border-border rounded-2xl p-10 text-center"
          >
            <p className="font-display font-medium text-foreground text-lg mb-2">Message sent.</p>
            <p className="text-muted-foreground font-body text-sm">I'll be in touch shortly.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 text-[15px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 text-[15px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <select
              required
              value={form.pillar}
              onChange={(e) => setForm({ ...form, pillar: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 text-[15px] font-body text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
            >
              <option value="" disabled>Pillar of interest</option>
              {pillarOptions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <textarea
              required
              rows={4}
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 text-[15px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-display font-medium text-base py-4 rounded-xl hover:bg-primary/90 transition-all duration-200"
            >
              Send Message
            </button>
          </motion.form>
        )}

        <div className="flex items-center justify-center gap-4 mt-10 text-muted-foreground text-sm font-body">
          <span>hello@nvtsdigital.com</span>
          <a href="#" className="hover:text-primary transition-colors duration-200">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
