import { motion } from "framer-motion";
import { useState } from "react";
import { Linkedin } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";

const ContactSection = () => {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", pillar: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const contactSchema = z.object({
    name: z.string().trim().min(1, t.contact.errors.nameRequired).max(100, t.contact.errors.nameMax),
    email: z.string().trim().email(t.contact.errors.emailInvalid).max(255, t.contact.errors.emailMax),
    pillar: z.string().min(1, t.contact.errors.pillarRequired),
    message: z.string().trim().min(1, t.contact.errors.messageRequired).max(2000, t.contact.errors.messageMax),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      // Send both emails in parallel: notification to owner + confirmation to sender
      await Promise.all([
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "contact-notification",
            recipientEmail: "info@nvtsdigital.com",
            idempotencyKey: `contact-notify-${id}`,
            templateData: {
              name: result.data.name,
              email: result.data.email,
              pillar: result.data.pillar,
              message: result.data.message,
            },
          },
        }),
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "contact-confirmation",
            recipientEmail: result.data.email,
            idempotencyKey: `contact-confirm-${id}`,
            templateData: { name: result.data.name },
          },
        }),
      ]);
      setSent(true);
      setForm({ name: "", email: "", pillar: "", message: "" });
      toast.success(t.contact.successToast);
    } catch {
      toast.error(t.contact.errorToast);
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
            {t.contact.heading}
          </h2>
          <p className="font-body text-lg text-muted-foreground">{t.contact.subheading}</p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-secondary border border-border rounded-2xl p-10 text-center"
          >
            <p className="font-display font-medium text-foreground text-lg mb-2">{t.contact.sentTitle}</p>
            <p className="text-muted-foreground font-body text-sm">{t.contact.sentSubtitle}</p>
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
                placeholder={t.contact.namePlaceholder}
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
                placeholder={t.contact.emailPlaceholder}
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
                <option value="" disabled>
                  {t.contact.pillarPlaceholder}
                </option>
                {t.services.pillars.map((p) => (
                  <option key={p.title} value={p.title}>
                    {p.title}
                  </option>
                ))}
                <option value="Multiple ones">{t.contact.pillarMultiple}</option>
              </select>
              {errors.pillar && <p className="text-destructive text-xs font-body mt-1.5">{errors.pillar}</p>}
            </div>
            <div>
              <textarea
                rows={4}
                placeholder={t.contact.messagePlaceholder}
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
              {sending ? t.contact.sendingButton : t.contact.sendButton}
            </button>
          </motion.form>
        )}

        <div className="flex items-center justify-center gap-4 mt-10 text-muted-foreground text-sm font-body">
          <span>info@nvtsdigital.com</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
