import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Check, CheckCircle2, Copy, Mail, Send } from 'lucide-react';
import { BRAND_PROFILE } from '../data/portfolio';
import { MagneticButton } from './MagneticButton';

interface ContactSectionProps {
  prefilledSubject: string;
  onClearPrefilledSubject: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection({
  prefilledSubject,
  onClearPrefilledSubject,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (prefilledSubject) {
      setSubject(prefilledSubject);
      setErrors((prev) => ({ ...prev, subject: undefined }));
      onClearPrefilledSubject();
    }
  }, [prefilledSubject, onClearPrefilledSubject]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BRAND_PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const validateClient = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) {
      next.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (subject.trim().length < 3) {
      next.subject = 'Please enter a subject (at least 3 characters).';
    }
    if (message.trim().length < 10) {
      next.message = 'Please include a short message (at least 10 characters).';
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setConfirmation(null);

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          website: honeypot,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        referenceId?: string;
        errors?: FormErrors;
      };

      if (!response.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(data.message || 'Unable to submit your message. Please check your inputs.');
        return;
      }

      setConfirmation({
        referenceId: data.referenceId || 'CONFIRMED',
        message: data.message || 'Your message has been received.',
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setServerError(
        'Could not reach the server. Please verify the backend is running and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Bold Headline & Real Direct Contact */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between gap-10"
          >
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-cyan-400 uppercase mb-4">
                Start A Conversation
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-tight text-white [text-wrap:balance]">
                Let&apos;s Create Something{' '}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  Extraordinary
                </span>
                .
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                Have a project, collaboration, or interesting idea? I&apos;d love to hear about it.
              </p>
            </div>

            {/* Real Direct Contact Details */}
            <div className="border-t border-white/[0.08] pt-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Direct Contact
              </p>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center gap-3">
                <a
                  href={`mailto:${BRAND_PROFILE.email}`}
                  className="flex flex-1 min-h-[48px] items-center gap-3 rounded-2xl border border-white/10 bg-[#0A0B12] px-4 py-3 text-sm font-medium text-white transition-colors hover:border-cyan-400/45 hover:bg-[#0F111B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Mail className="h-4 w-4 text-cyan-400 shrink-0" aria-hidden="true" />
                  <span className="truncate">{BRAND_PROFILE.email}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0A0B12] px-4 py-3 text-xs font-medium text-slate-300 transition-colors hover:border-violet-400/45 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                      <span className="text-cyan-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Sophisticated Validated Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-[#0A0B12] p-6 sm:p-8 shadow-2xl shadow-black/50"
            >
              {/* Hidden spam-trap field */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-slate-200 mb-2"
                  >
                    Name
                  </label>
                  <input
                    ref={nameInputRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    className={`w-full min-h-[46px] rounded-xl border bg-[#06070B] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/50 ${
                      errors.name ? 'border-rose-500/70' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.name && (
                    <p id="error-name" className="mt-1.5 text-xs text-rose-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-slate-200 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className={`w-full min-h-[46px] rounded-xl border bg-[#06070B] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/50 ${
                      errors.email ? 'border-rose-500/70' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.email && (
                    <p id="error-email" className="mt-1.5 text-xs text-rose-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-slate-200 mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Project inquiry, collaboration, or idea"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                  }}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'error-subject' : undefined}
                  className={`w-full min-h-[46px] rounded-xl border bg-[#06070B] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/50 ${
                    errors.subject ? 'border-rose-500/70' : 'border-white/10 hover:border-white/20'
                  }`}
                />
                {errors.subject && (
                  <p id="error-subject" className="mt-1.5 text-xs text-rose-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-200 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about what you're looking to build..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className={`w-full rounded-xl border bg-[#06070B] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/50 resize-y ${
                    errors.message ? 'border-rose-500/70' : 'border-white/10 hover:border-white/20'
                  }`}
                />
                {errors.message && (
                  <p id="error-message" className="mt-1.5 text-xs text-rose-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Explicit Submission Feedback */}
              {serverError && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-950/25 px-4 py-3 text-sm text-rose-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                  <span>{serverError}</span>
                </div>
              )}

              {confirmation && (
                <div
                  role="status"
                  className="mt-5 flex items-start gap-2.5 rounded-xl border border-cyan-500/30 bg-cyan-950/25 px-4 py-3 text-sm text-cyan-100"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium">Message saved ({confirmation.referenceId})</p>
                    <p className="mt-0.5 text-xs text-cyan-200/80">{confirmation.message}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-end">
                <MagneticButton
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-950/35 transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
