import { motion } from "framer-motion";
import { useState } from "react";
import { Linkedin } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const pillarOptions = [
  "Data & Content Intelligence",
  "Digital Experience",
  "Growth & Acquisition",
  "Digital Transformation",
  "Artificial Intelligence",
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  pillar: z.string().min(1, "Please select a pillar of interest"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be under 2000 characters"),
});

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", pillar: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check — bots fill hidden fields
    if (honeypot) return;

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSending(true);

    try {
      const id = crypto.randomUUID();

      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: result.data.email,
          idempotencyKey: `contact-confirm-${id}`,
          templateData: { name: result.data.name },
        },
      });

      setSent(true);
      setForm({ name: "", email: "", pillar: "", message: "" });
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
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
            {/* Honeypot — hidden from real users, bots fill it */}
            <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
              <input
                type="text"
                name="website"
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Name"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 text-[15px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              {errors.name && <p className="text-destructive text-xs font-body mt-1.5">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 text-[15px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              {errors.email && <p className="text-destructive text-xs font-body mt-1.5">{errors.email}</p>}
            </div>
            <div>
              <select
                value={form.pillar}
                onChange={(e) => setForm({ ...form, pillar: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 text-[15px] font-body text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="" disabled>Pillar of interest</option>
                {pillarOptions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              {errors.pillar && <p className="text-destructive text-xs font-body mt-1.5">{errors.pillar}</p>}
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Message"
                maxLength={2000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 text-[15px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
              {errors.message && <p className="text-destructive text-xs font-body mt-1.5">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-primary text-primary-foreground font-display font-medium text-base py-4 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send Message"}
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