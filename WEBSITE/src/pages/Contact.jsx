import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { siteConfig } from '../config/site';
import { sendContactMessage } from '../services/api';
import FaqAccordion from '../components/common/FaqAccordion';
import { useSettings, usePageContent, useFaqs } from '../hooks/useSiteData';

// Form validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name (at least 2 characters)'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  service: z.enum(
    [
      'Mobile App Development',
      'Website Development',
      'CMS & No-Code',
      'AI Integration',
      'UI/UX Design',
      'Graphic Design',
    ],
    {
      errorMap: () => ({ message: 'Please select a service' }),
    }
  ),
  budget: z.enum(
    [
      'Under $2,000',
      '$2,000-$5,000',
      '$5,000-$10,000',
      '$10,000-$25,000',
      '$25,000+',
      'Not sure yet',
    ],
    {
      errorMap: () => ({ message: 'Please select a budget range' }),
    }
  ),
  message: z.string().min(10, 'Please share at least a few details about your project (min 10 characters)'),
  preferredDateTime: z.string().optional(),
  _honey: z.string().optional(),
});

export const Contact = () => {
  const { topBarPhone, topBarEmail, workingHours, indiaOffice, usaOffice, googleMapsEmbedUrl } =
    useSettings();

  const { content: contactContent } = usePageContent('contact', {
    heroEyebrow: 'GET A FREE QUOTE',
    heroTitle: "Let's Build Your App, Website or AI Solution",
    heroDescription: 'Tell us about your project. We reply with next steps and a free quote.',
    formTitle: 'Send us a message',
    directTitle: 'Reach us directly',
    faqTitle: 'Frequently asked questions',
  });

  const { faqs } = useFaqs('contact');

  const [submissionState, setSubmissionState] = useState({
    loading: false,
    success: false,
    error: '',
    data: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: 'Mobile App Development',
      budget: '$5,000-$10,000',
      phone: '',
      preferredDateTime: '',
      _honey: '',
    },
  });

  const onSubmit = async (formData) => {
    setSubmissionState({ loading: true, success: false, error: '', data: null });
    try {
      const res = await sendContactMessage(formData);
      setSubmissionState({
        loading: false,
        success: true,
        error: '',
        data: res,
      });
      reset();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        (err.response?.data?.errors && err.response.data.errors[0]?.message) ||
        'Could not send message. Please try again or email us directly.';
      setSubmissionState({
        loading: false,
        success: false,
        error: errorMsg,
        data: null,
      });
    }
  };

  const mapsUrl = googleMapsEmbedUrl || import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL;

  return (
    <>
      <Helmet>
        <title>Get a Free Quote | TenzoAds</title>
        <meta
          name="description"
          content="Tell us about your project requirements and receive a transparent fixed-price estimate and consultation within 24 hours."
        />
      </Helmet>

      {/* 1. HERO SECTION (Cream background) */}
      <section className="bg-cream pt-12 pb-16 md:pt-16 md:pb-20 border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4">
          <nav className="text-xs font-bold text-muted uppercase tracking-wider">
            <Link to="/" className="hover:text-ink transition-colors">
              Home
            </Link>{' '}
            / <span className="text-ink">Get a Free Quote</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight max-w-4xl leading-[1.14]">
            {contactContent.heroTitle || "Let's Build Your App, Website or AI Solution"}
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed pt-2">
            {contactContent.heroDescription ||
              'Tell us about your project. We reply with next steps and a free quote.'}
          </p>
        </div>
      </section>

      {/* 2. TWO COLUMNS (Form Left + Direct Contact Right) */}
      <section className="py-16 md:py-24 bg-white border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-borderCream p-6 sm:p-10 shadow-soft">
              <h2 className="text-2xl font-extrabold text-ink mb-6">
                {contactContent.formTitle || 'Send us a message'}
              </h2>

              {/* Success Notification */}
              {submissionState.success && (
                <div className="mb-6 p-5 rounded-2xl bg-amber-50 border border-amber-300 text-ink flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber flex items-center justify-center flex-shrink-0 text-ink mt-0.5">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm">Quote Request Received!</h4>
                    <p className="text-xs sm:text-sm text-neutral-700 mt-1">
                      Thank you! Our technical architects will analyze your requirements and get back
                      to you within 24 hours. Check your inbox for confirmation.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {submissionState.error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-center gap-3 text-xs sm:text-sm font-semibold">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span>{submissionState.error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  {...register('_honey')}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber ${
                      errors.name ? 'border-red-500 bg-red-50/20' : 'border-borderCream bg-white'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-600 font-medium mt-1 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="you@company.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber ${
                      errors.email ? 'border-red-500 bg-red-50/20' : 'border-borderCream bg-white'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-600 font-medium mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Phone (optional) */}
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="+00 000 000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-borderCream bg-white text-sm text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                </div>

                {/* Service needed */}
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                    Service needed
                  </label>
                  <select
                    {...register('service')}
                    className="w-full px-4 py-3 rounded-xl border border-borderCream bg-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber font-medium"
                  >
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Website Development">Website Development</option>
                    <option value="CMS & No-Code">CMS & No-Code</option>
                    <option value="AI Integration">AI Integration</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                    Budget
                  </label>
                  <select
                    {...register('budget')}
                    className="w-full px-4 py-3 rounded-xl border border-borderCream bg-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber font-medium"
                  >
                    <option value="Under $2,000">Under $2,000</option>
                    <option value="$2,000-$5,000">$2,000 - $5,000</option>
                    <option value="$5,000-$10,000">$5,000 - $10,000</option>
                    <option value="$10,000-$25,000">$10,000 - $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                {/* Project details */}
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                    Project details
                  </label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    placeholder="What are you looking to build?"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber ${
                      errors.message ? 'border-red-500 bg-red-50/20' : 'border-borderCream bg-white'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-600 font-medium mt-1 block">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Select Time to discuss your idea */}
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                    Select Time to discuss your idea
                  </label>
                  <input
                    type="datetime-local"
                    {...register('preferredDateTime')}
                    className="w-full px-4 py-3 rounded-xl border border-borderCream bg-white text-sm text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                  <span className="text-[11px] text-muted block mt-1">
                    Optional: Pick your preferred date and time for an intro call.
                  </span>
                </div>

                {/* Full-width amber button */}
                <button
                  type="submit"
                  disabled={submissionState.loading}
                  className="w-full py-4 px-6 bg-amber hover:bg-amber-hover text-ink font-bold text-base rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{submissionState.loading ? 'Sending Request...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            {/* Right Column: Reach us directly + Map */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl font-extrabold text-ink">
                {contactContent.directTitle || 'Reach us directly'}
              </h2>

              {/* 4 Info Cards with Amber Icon Squares */}
              <div className="space-y-4">
                {/* 1. Email */}
                <div className="bg-white rounded-2xl border border-borderCream p-4 sm:p-5 flex items-center gap-4 transition-all hover:border-amber">
                  <div className="w-12 h-12 rounded-xl bg-amber text-ink flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
                      Email
                    </span>
                    <a
                      href={`mailto:${topBarEmail}`}
                      className="text-sm sm:text-base font-extrabold text-ink hover:text-amber transition-colors"
                    >
                      {topBarEmail}
                    </a>
                  </div>
                </div>

                {/* 2. Phone / WhatsApp */}
                <div className="bg-white rounded-2xl border border-borderCream p-4 sm:p-5 flex items-center gap-4 transition-all hover:border-amber">
                  <div className="w-12 h-12 rounded-xl bg-amber text-ink flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${topBarPhone.replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base font-extrabold text-ink hover:text-amber transition-colors"
                    >
                      {topBarPhone}
                    </a>
                  </div>
                </div>

                {/* 3. Office */}
                <div className="bg-white rounded-2xl border border-borderCream p-4 sm:p-5 flex items-center gap-4 transition-all hover:border-amber">
                  <div className="w-12 h-12 rounded-xl bg-amber text-ink flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
                      Office
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      {indiaOffice?.address || siteConfig.contact.fullAddress}
                    </p>
                    <p className="text-[11px] text-muted mt-0.5">
                      {indiaOffice?.title || 'India Office'} & {usaOffice?.title || 'USA Office'}
                    </p>
                  </div>
                </div>

                {/* 4. Working hours */}
                <div className="bg-white rounded-2xl border border-borderCream p-4 sm:p-5 flex items-center gap-4 transition-all hover:border-amber">
                  <div className="w-12 h-12 rounded-xl bg-amber text-ink flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Clock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
                      Working hours
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      {workingHours || siteConfig.contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Card / Placeholder */}
              <div className="rounded-2xl border border-borderCream overflow-hidden bg-cream h-64 flex items-center justify-center shadow-inner relative">
                {mapsUrl ? (
                  <iframe
                    src={mapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="TenzoAds Office Location"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <div className="w-10 h-10 rounded-full bg-white/80 mx-auto flex items-center justify-center text-amber shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-amber-900/70 block font-mono">
                      MAP PLACEHOLDER
                    </span>
                    <span className="text-[11px] text-muted block max-w-xs">
                      Set Google Maps embed URL in Admin Settings or .env to embed live Google Maps.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS (Centered Accordion) */}
      <section className="py-20 md:py-28 bg-cream-light border-b border-borderCream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              {contactContent.faqTitle || 'Frequently asked questions'}
            </h2>
            <p className="text-sm sm:text-base text-muted">
              Everything you need to know about our collaboration model and delivery process.
            </p>
          </div>

          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
};

export default Contact;
