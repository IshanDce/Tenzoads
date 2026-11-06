import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle, Plus, X } from 'lucide-react';
import { sendContactMessage } from '../services/api';
import { useSettings, usePageContent } from '../hooks/useSiteData';

// Form validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name (at least 2 characters)'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(5, 'Please share a few details about your project'),
  preferredDateTime: z.string().optional(),
  _honey: z.string().optional(),
});

// Exact FAQ items from Image 3
const defaultContactFaqs = [
  {
    question: 'How much does a mobile app or website cost?',
    answer:
      "Cost depends on scope, platforms and features. Share your idea and we'll send an estimate within 24 hours.",
  },
  {
    question: 'Which technologies do you work with?',
    answer:
      'Android, iOS, Flutter, React Native, React, Next.js, Node, Nest.js, Vue, Angular, Laravel, PHP, WordPress, Wix, Webflow.',
  },
  {
    question: 'Can you add AI features to an existing product?',
    answer:
      'Yes. We integrate chatbots, search, recommendations and automation into existing apps.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'Websites typically take 2-6 weeks and mobile apps 2-5 months, depending on complexity.',
  },
];

export const Contact = () => {
  const { topBarPhone, topBarEmail, workingHours } = useSettings();

  const { content: contactContent } = usePageContent('contact', {
    heroTitle: "Let's build your app, website or AI solution",
    heroDescription:
      'Tell us about your project. We reply within 24 hours with next steps and a free quote.',
  });

  const [openFaqIndex, setOpenFaqIndex] = useState(0); // First item open by default

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
      budget: '',
    },
  });

  const onSubmit = async (data) => {
    // Honeypot bot protection
    if (data._honey) {
      console.warn('Bot submission blocked');
      return;
    }

    setSubmissionState({ loading: true, success: false, error: '', data: null });

    try {
      const response = await sendContactMessage(data);
      setSubmissionState({
        loading: false,
        success: true,
        error: '',
        data: response.data,
      });
      reset();
    } catch (err) {
      setSubmissionState({
        loading: false,
        success: false,
        error: err.response?.data?.message || 'Failed to submit quote request. Please try again.',
        data: null,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Get a free quote | TenzoAds IT Services</title>
        <meta
          name="description"
          content="Tell us about your mobile app, website, or AI project. We reply within 24 hours with next steps and a free quote."
        />
      </Helmet>

      {/* 1. HERO SECTION (Dark Navy with Ambient Blue Glow matching Image 3) */}
      <section className="relative bg-[#070B19] text-white pt-16 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-slate-900">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4 relative z-10">
          <nav className="text-xs font-bold text-slate-400 tracking-wider">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>{' '}
            / <span className="text-white">Get a free quote</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.14]">
            {contactContent.heroTitle || "Let's build your app, website or AI solution"}
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed pt-2">
            {contactContent.heroDescription ||
              'Tell us about your project. We reply within 24 hours with next steps and a free quote.'}
          </p>
        </div>
      </section>

      {/* 2. TWO COLUMNS (Form Left + Direct Contact Right Matching Image 3) */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Send us a message
              </h2>

              {/* Success Notification */}
              {submissionState.success && (
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-slate-900 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm">Quote Request Received!</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Thank you! Our technical team will review your project and reply within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {submissionState.error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-center gap-3 text-xs sm:text-sm font-semibold">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span>{submissionState.error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="text" {...register('_honey')} className="hidden" tabIndex="-1" autoComplete="off" />

                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                      errors.name ? 'border-red-500' : 'border-slate-200'
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
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="you@company.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                      errors.email ? 'border-red-500' : 'border-slate-200'
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
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="+00 000 000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Service needed */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    Service needed
                  </label>
                  <select
                    {...register('service')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
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
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    Budget
                  </label>
                  <select
                    {...register('budget')}
                    className={`w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${
                      errors.budget ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Select your budget</option>
                    <option value="Under $2,000">Under $2,000</option>
                    <option value="$2,000-$5,000">$2,000 - $5,000</option>
                    <option value="$5,000-$10,000">$5,000 - $10,000</option>
                    <option value="$10,000-$25,000">$10,000 - $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  {errors.budget && (
                    <span className="text-xs text-red-600 font-medium mt-1 block">
                      {errors.budget.message}
                    </span>
                  )}
                </div>

                {/* Project details */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    Project details
                  </label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    placeholder="What are you looking to build?"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                      errors.message ? 'border-red-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-600 font-medium mt-1 block">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Preferred call time */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    Preferred call time
                  </label>
                  <input
                    type="text"
                    {...register('preferredDateTime')}
                    placeholder="Pick a date and time"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Full-width Blue Button: Send message */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submissionState.loading}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-full transition-all duration-200 shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <span>{submissionState.loading ? 'Sending Request...' : 'Send message'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Reach us directly + Map (Matching Image 3) */}
            <div className="lg:col-span-5 space-y-5">
              <h2 className="text-xl font-bold text-slate-900">
                Reach us directly
              </h2>

              {/* 4 Stacked Info Cards with Blue Circles */}
              <div className="space-y-3.5">
                {/* 1. Email */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      EMAIL
                    </span>
                    <a
                      href={`mailto:${topBarEmail || 'hello@tenzoads.com'}`}
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {topBarEmail || 'hello@tenzoads.com'}
                    </a>
                  </div>
                </div>

                {/* 2. Phone / WhatsApp */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PHONE / WHATSAPP
                    </span>
                    <a
                      href={`tel:${(topBarPhone || '+910000000000').replace(/\s+/g, '')}`}
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {topBarPhone || '+91 00000 00000'}
                    </a>
                  </div>
                </div>

                {/* 3. Offices */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      OFFICES
                    </span>
                    <span className="text-sm font-bold text-slate-900 block">
                      India & USA
                    </span>
                  </div>
                </div>

                {/* 4. Working hours */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      WORKING HOURS
                    </span>
                    <span className="text-sm font-bold text-slate-900 block">
                      {workingHours || 'Mon - Fri, 9:00 - 18:00'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Box Matching Image 3 */}
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100/90 h-56 flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  MAP
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS SECTION (Matching Image 3) */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto">
              Everything you need to know about working with TenzoAds.
            </p>
          </div>

          {/* Accordion List with Image 3 exact toggle states */}
          <div className="space-y-4">
            {defaultContactFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border border-slate-200/90 bg-white rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                        isOpen ? 'bg-blue-600 text-white' : 'bg-slate-50 text-blue-600'
                      }`}
                    >
                      {isOpen ? <X className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
