'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2 || formData.name.trim().length > 100) {
      errors.name = 'Name must be between 2 and 100 characters.';
    }
    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10 || formData.message.trim().length > 5000) {
      errors.message = 'Message must be between 10 and 5000 characters.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setSubmitMessage('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', message: '' });
        setValidationErrors({});
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to send email. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass =
    'w-full px-4 py-3 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg font-mono text-sm text-foreground outline-none transition-colors focus:border-primary-500 placeholder:text-faint';

  const contacts = [
    { icon: Mail, label: 'email', value: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
    { icon: Phone, label: t.contact.info.phoneLabel, value: t.contact.info.phone, href: `tel:${t.contact.info.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: t.contact.info.location, value: t.contact.info.availability, href: null },
    { icon: MessageCircle, label: 'whatsapp', value: t.contact.info.whatsapp, href: 'https://api.whatsapp.com/send/?phone=970567777368' },
    { icon: ExternalLink, label: 'mostaql', value: t.contact.info.mostaql, href: 'https://mostaql.com/u/YHegazy' },
    { icon: ExternalLink, label: 'upwork', value: t.contact.info.upwork, href: 'https://upwork.com/freelancers/~01122d39b9a2ff1593' },
  ];

  return (
    <section id="contact" className="relative section-padding">
      <div className="container-custom">
        <SectionHeader index="08" command="./connect" title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact channels */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="space-y-3 min-w-0"
          >
            {contacts.map((c) => {
              const Inner = (
                <div className="flex items-center gap-4 p-4 panel hover:border-[var(--border-strong)] transition-colors">
                  <span className="grid place-items-center w-10 h-10 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] shrink-0">
                    <c.icon className="w-4 h-4 text-primary-500" />
                  </span>
                  <div className="min-w-0">
                    <div className="mono-label">{c.label}</div>
                    <div className="text-sm text-foreground line-clamp-2">{c.value}</div>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
                  {Inner}
                </a>
              ) : (
                <div key={c.label}>{Inner}</div>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            noValidate
            className="panel p-6 md:p-8 space-y-5 min-w-0"
          >
            <div>
              <label htmlFor="name" className="block mono-label mb-2">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="John Doe"
              />
              {validationErrors.name && <p className="mt-1 text-xs text-red-500">{validationErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block mono-label mb-2">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="john@example.com"
              />
              {validationErrors.email && <p className="mt-1 text-xs text-red-500">{validationErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block mono-label mb-2">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Your message..."
              />
              <div className="flex justify-between mt-1">
                {validationErrors.message ? <p className="text-xs text-red-500">{validationErrors.message}</p> : <span />}
                <span className={`text-xs font-mono ${formData.message.length > 5000 ? 'text-red-500' : 'text-faint'}`}>
                  {formData.message.length}/5000
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3.5 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-[#0c0a09] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#0c0a09] border-t-transparent rounded-full animate-spin" />
                  {t.contact.form.sending}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t.contact.form.send}
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 justify-center text-[var(--signal-ok)]">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium text-sm">{submitMessage}</span>
              </div>
            )}
            {submitStatus === 'error' && (
              <p className="text-center text-sm text-red-500 font-medium">{submitMessage}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
