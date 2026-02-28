'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.contact.title}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex items-center gap-4 p-5 glass-card rounded-xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary-200 dark:hover:border-primary-700"
                >
                  <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-xl shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Email</p>
                    <a
                      href={`mailto:${t.contact.info.email}`}
                      className="text-gray-900 dark:text-gray-100 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {t.contact.info.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex items-center gap-4 p-5 glass-card rounded-xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-accent-200 dark:hover:border-accent-700"
                >
                  <div className="p-4 bg-gradient-to-br from-accent-500 to-accent-600 dark:from-accent-600 dark:to-accent-700 rounded-xl shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {t.contact.info.location}
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold">
                      {t.contact.info.availability}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              noValidate
              className="glass-card p-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 focus:border-primary-500 outline-none transition-all hover:border-primary-300 dark:hover:border-primary-600"
                  placeholder="John Doe"
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 focus:border-primary-500 outline-none transition-all hover:border-primary-300 dark:hover:border-primary-600"
                  placeholder="john@example.com"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 focus:border-primary-500 outline-none transition-all resize-none hover:border-primary-300 dark:hover:border-primary-600"
                  placeholder="Your message..."
                />
                <div className="flex justify-between mt-1">
                  {validationErrors.message ? (
                    <p className="text-sm text-red-500">{validationErrors.message}</p>
                  ) : <span />}
                  <span className={`text-xs ${formData.message.length > 5000 ? 'text-red-500' : 'text-gray-400'}`}>
                    {formData.message.length}/5000
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.contact.form.sending}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t.contact.form.send}
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 justify-center text-green-600 dark:text-green-400"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </motion.div>
                  <span className="font-medium">{submitMessage}</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-red-500 font-medium"
                >
                  {submitMessage}
                </motion.p>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
