import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: 'TenzoAds',
    },
    tagline: {
      type: String,
      default: 'We build Apps, Websites & AI Products that grow your business.',
    },
    logo: {
      type: String,
      default: '',
    },
    topBarPhone: {
      type: String,
      default: '+91 00000 00000',
    },
    topBarEmail: {
      type: String,
      default: 'hello@yourdomain.com',
    },
    footerDescription: {
      type: String,
      default:
        'TenzoAds is an IT services company helping startups and growing businesses turn ideas into reliable mobile apps, websites and AI-powered products.',
    },
    indiaOffice: {
      title: { type: String, default: 'India Office' },
      address: {
        type: String,
        default: 'Tower B, Tech Park, Sector 62, Noida, Delhi NCR, India',
      },
    },
    usaOffice: {
      title: { type: String, default: 'USA Office' },
      address: {
        type: String,
        default: '548 Market St, Suite 34291, San Francisco, CA 94104',
      },
    },
    workingHours: {
      type: String,
      default: 'Mon - Fri, 9:00 - 18:00 (Time zone)',
    },
    googleMapsEmbedUrl: {
      type: String,
      default: '',
    },
    socialLinks: {
      twitter: { type: String, default: 'https://twitter.com/tenzoads' },
      linkedin: { type: String, default: 'https://linkedin.com/company/tenzoads' },
      github: { type: String, default: 'https://github.com/tenzoads' },
    },
    seoDefaults: {
      title: {
        type: String,
        default: 'TenzoAds | Mobile Apps, Websites & AI Products',
      },
      description: {
        type: String,
        default:
          'TenzoAds is an IT services company helping startups and growing businesses turn ideas into reliable mobile apps, websites and AI-powered products.',
      },
      ogImage: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

