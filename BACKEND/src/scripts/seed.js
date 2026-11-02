import dotenv from 'dotenv';
dotenv.config();

import { connectDB, closeDB } from '../config/db.js';
import { Admin } from '../models/Admin.js';
import { Project } from '../models/Project.js';
import { Post } from '../models/Post.js';
import { Service } from '../models/Service.js';
import { Faq } from '../models/Faq.js';
import { Technology } from '../models/Technology.js';
import { ProcessStep } from '../models/ProcessStep.js';
import { WhyUsItem } from '../models/WhyUsItem.js';
import { PageContent } from '../models/PageContent.js';
import { SiteSettings } from '../models/SiteSettings.js';

export const seedData = async () => {
  try {
    console.log('[Seed] Connecting to database...');
    await connectDB();

    // 1. SEED SUPERADMIN & EDITOR
    const superAdminEmail = (process.env.SEED_ADMIN_EMAIL || 'admin@tenzoads.com').toLowerCase();
    const superAdminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@123456';

    const existingSuperAdmin = await Admin.findOne({ email: superAdminEmail });
    if (!existingSuperAdmin) {
      console.log(`[Seed] Creating Superadmin: ${superAdminEmail}`);
      const passwordHash = await Admin.hashPassword(superAdminPassword);
      await Admin.create({
        name: 'TenzoAds SuperAdmin',
        email: superAdminEmail,
        passwordHash,
        role: 'superadmin',
        isActive: true,
      });
    }

    // Also seed a test editor
    const editorEmail = 'editor@tenzoads.com';
    const existingEditor = await Admin.findOne({ email: editorEmail });
    if (!existingEditor) {
      console.log(`[Seed] Creating Editor: ${editorEmail}`);
      const passwordHash = await Admin.hashPassword('Editor@123456');
      await Admin.create({
        name: 'Alex Editor',
        email: editorEmail,
        passwordHash,
        role: 'editor',
        isActive: true,
      });
    }

    // 2. SEED SITE SETTINGS
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      console.log('[Seed] Creating default SiteSettings...');
      await SiteSettings.create({
        siteName: 'TenzoAds',
        tagline: 'We build Apps, Websites & AI Products that grow your business.',
        logo: '',
        topBarPhone: '+91 00000 00000',
        topBarEmail: 'hello@yourdomain.com',
        footerDescription:
          'TenzoAds is an IT services company helping startups and growing businesses turn ideas into reliable mobile apps, websites and AI-powered products.',
        indiaOffice: {
          title: 'India Office',
          address: 'Tower B, Tech Park, Sector 62, Noida, Delhi NCR, India',
        },
        usaOffice: {
          title: 'USA Office',
          address: '548 Market St, Suite 34291, San Francisco, CA 94104',
        },
        workingHours: 'Mon - Fri, 9:00 - 18:00 (Time zone)',
        googleMapsEmbedUrl: '',
        socialLinks: {
          twitter: 'https://twitter.com/tenzoads',
          linkedin: 'https://linkedin.com/company/tenzoads',
          github: 'https://github.com/tenzoads',
        },
        seoDefaults: {
          title: 'TenzoAds | Mobile Apps, Websites & AI Products',
          description:
            'TenzoAds is an IT services company helping startups and growing businesses turn ideas into reliable mobile apps, websites and AI-powered products.',
          ogImage: '',
        },
      });
    }

    // 3. SEED SERVICES
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      console.log('[Seed] Seeding Services...');
      await Service.insertMany([
        {
          title: 'Mobile App Development',
          description:
            'Native and cross-platform apps for iOS and Android. High-performance, intuitive UI, and integrated cloud backend.',
          icon: 'Smartphone',
          tech: 'Flutter, React Native, Swift, Kotlin',
          order: 1,
          isActive: true,
        },
        {
          title: 'Website Development',
          description:
            'Fast, SEO-friendly websites and web apps built with React, Next.js, Node.js, and modern cloud stacks.',
          icon: 'Globe',
          tech: 'React, Next.js, Node.js, Laravel',
          order: 2,
          isActive: true,
        },
        {
          title: 'CMS & No-Code Websites',
          description:
            'Custom content management systems and visual website builders that give your marketing team full control.',
          icon: 'Layers',
          tech: 'WordPress, Webflow, Wix, PHP',
          order: 3,
          isActive: true,
        },
        {
          title: 'AI Integration',
          description:
            'Add chatbots, semantic search, and AI-powered automation to your product to improve speed and save cost.',
          icon: 'Sparkles',
          tech: 'OpenAI, LangChain, Embeddings',
          order: 4,
          isActive: true,
        },
        {
          title: 'UI/UX Design',
          description:
            'Research, wireframes, and high-fidelity prototype interfaces that delight users and maximize conversion.',
          icon: 'Palette',
          tech: 'Figma, Wireframing, Prototyping',
          order: 5,
          isActive: true,
        },
        {
          title: 'Graphic Design',
          description:
            'Brand identity, logos, vector illustration and marketing collateral that sets your brand apart from competitors.',
          icon: 'PenTool',
          tech: 'Illustrator, Brand Systems, Guidelines',
          order: 6,
          isActive: true,
        },
      ]);
    }

    // 4. SEED TECHNOLOGIES
    const techCount = await Technology.countDocuments();
    if (techCount === 0) {
      console.log('[Seed] Seeding Technologies...');
      const techNames = [
        'Flutter',
        'React Native',
        'Swift',
        'Kotlin',
        'React',
        'Next.js',
        'Node.js',
        'Vue.js',
        'Angular',
        'Laravel',
        'PHP',
        'WordPress',
        'Wix',
        'Webflow',
        'Figma',
        'OpenAI',
      ];
      await Technology.insertMany(
        techNames.map((name, i) => ({
          name,
          order: i + 1,
          isActive: true,
        }))
      );
    }

    // 5. SEED PROCESS STEPS
    const stepCount = await ProcessStep.countDocuments();
    if (stepCount === 0) {
      console.log('[Seed] Seeding Process Steps...');
      await ProcessStep.insertMany([
        {
          number: '1',
          title: 'Discover',
          description: 'Define your vision, users, and core requirements to build an actionable roadmap.',
          icon: 'Search',
          order: 1,
        },
        {
          number: '2',
          title: 'Design',
          description: 'Wireframes, prototypes and UI designs you can review and approve.',
          icon: 'Layout',
          order: 2,
        },
        {
          number: '3',
          title: 'Develop',
          description: 'Agile sprints with clean code, review-ready builds, and continuous QA.',
          icon: 'Code',
          order: 3,
        },
        {
          number: '4',
          title: 'Launch & Support',
          description: 'Seamless cloud deploy, app store submission and continuous optimization.',
          icon: 'Rocket',
          order: 4,
        },
      ]);
    }

    // 6. SEED WHY-US ITEMS
    const whyUsCount = await WhyUsItem.countDocuments();
    if (whyUsCount === 0) {
      console.log('[Seed] Seeding Why-Us Items...');
      await WhyUsItem.insertMany([
        {
          title: 'End-to-end delivery',
          description: 'Strategy, design, development, and launch handled by a single dedicated team.',
          icon: 'Box',
          order: 1,
        },
        {
          title: 'Agile & transparent',
          description: 'Weekly sprint demos, real-time code updates, and direct channel to developers.',
          icon: 'Zap',
          order: 2,
        },
        {
          title: 'AI-ready by design',
          description: 'Modern architectures ready for intelligent search, automation, and LLM integrations.',
          icon: 'Bot',
          order: 3,
        },
        {
          title: 'Support after launch',
          description: 'Continuous monitoring, routine maintenance, and platform feature upgrades.',
          icon: 'ShieldCheck',
          order: 4,
        },
      ]);
    }

    // 7. SEED FAQS
    const faqCount = await Faq.countDocuments();
    if (faqCount === 0) {
      console.log('[Seed] Seeding FAQs...');
      await Faq.insertMany([
        {
          question: 'How much does it cost to build a mobile app?',
          answer:
            'Cost depends on scope, platforms (iOS, Android, or both), and custom features. Typically, simple apps start from $3,000, while complex applications with AI and custom backends range from $8,000 to $25,000. We share a clear, transparent fixed-price estimate within 24 hours.',
          page: 'home',
          order: 1,
          isActive: true,
        },
        {
          question: 'Should I choose native, Flutter or React Native?',
          answer:
            'For 85% of startups and businesses, Flutter or React Native offers huge savings by maintaining a single codebase across iOS and Android with 60fps performance. If your app requires heavy hardware sensors, Bluetooth low-energy, or Apple ARKit, native Swift/Kotlin is recommended.',
          page: 'home',
          order: 2,
          isActive: true,
        },
        {
          question: 'How long does a website development take?',
          answer:
            'Marketing websites and landing pages typically take 2 to 4 weeks. Custom web applications, portals, and complex e-commerce platforms take between 6 to 12 weeks depending on features, integrations, and content readiness.',
          page: 'home',
          order: 3,
          isActive: true,
        },
        {
          question: 'Do you provide support after launch?',
          answer:
            'Yes! Every project includes complimentary 30-day post-launch warranty and bug-fix support. We also offer affordable monthly SLA maintenance packages for security patches, server monitoring, and feature iteration.',
          page: 'home',
          order: 4,
          isActive: true,
        },
        {
          question: 'How much does a mobile app or website cost?',
          answer:
            'Cost depends on scope, platforms and features. We share a transparent, fixed-price estimate within 24 hours of receiving your requirements.',
          page: 'contact',
          order: 1,
          isActive: true,
        },
        {
          question: 'Which technologies do you work with?',
          answer:
            'We work across modern native and cross-platform stacks: Android (Kotlin), iOS (Swift), Flutter, React Native, React, Next.js, Node.js, Vue, Angular, Laravel, PHP, WordPress, Wix and Webflow.',
          page: 'contact',
          order: 2,
          isActive: true,
        },
        {
          question: 'Can you add AI features to an existing product?',
          answer:
            'Yes, absolutely. We integrate chatbots, semantic vector search, recommendation engines and automated document workflows into existing applications without requiring a full rewrite.',
          page: 'contact',
          order: 3,
          isActive: true,
        },
        {
          question: 'How long does a project take?',
          answer:
            'Websites typically take 2-6 weeks, and mobile apps 2-5 months depending on feature complexity and integration depth.',
          page: 'contact',
          order: 4,
          isActive: true,
        },
      ]);
    }

    // 8. SEED PAGE CONTENT (Key-Value)
    const pageKeys = ['home', 'about', 'portfolio', 'blogs', 'contact', 'cta'];
    for (const key of pageKeys) {
      const existing = await PageContent.findOne({ key });
      if (!existing) {
        let content = {};
        if (key === 'home') {
          content = {
            heroEyebrow: 'IT SERVICES & DIGITAL PRODUCT STUDIO',
            heroHeading: 'We build Apps, Websites & AI Products that grow your business.',
            heroParagraph:
              'TenzoAds is a full-service IT company delivering native and cross-platform mobile apps, high-performance websites and custom AI integrations, UI/UX and graphic design all under one roof.',
            btnStart: 'Start Project',
            btnWork: 'View Our Work',
            trustBadges: ['Free consultation', 'Transparent pricing', 'Agile delivery'],
          };
        } else if (key === 'about') {
          content = {
            heroTitle: "We're a team of builders, designers and problem-solvers",
            heroParagraph:
              'TenzoAds is an IT services company helping startups and growing businesses turn ideas into reliable mobile apps, websites and AI-powered products.',
            storyEyebrow: 'OUR STORY',
            storyTitle: 'Built to be the only tech partner you need',
            storyParagraph1:
              'We started TenzoAds with a simple idea: great digital products need design, engineering and strategy working together, not scattered across different vendors.',
            storyParagraph2:
              'Today we design and build native and cross-platform mobile apps, high-performance websites and practical AI integrations for clients who value clear communication and quality work.',
            storyBullets: [
              'Mobile, web and AI under one roof',
              'Design-led, engineering-driven process',
              'Clear communication and honest timelines',
              'Support that continues after launch',
            ],
            missionTitle: 'Our Mission',
            missionText:
              'To help businesses grow by delivering digital products that are fast, reliable and a pleasure to use.',
            visionTitle: 'Our Vision',
            visionText:
              'To be the most trusted technology partner for startups and growing companies, known for quality, honesty and long-term relationships.',
          };
        } else if (key === 'cta') {
          content = {
            eyebrow: 'READY WHEN YOU ARE',
            heading: "Have an idea? Let's build it together.",
            text: 'Tell us about your project and get a free consultation with our team within 24 hours.',
            buttonText: 'Start Your Project',
          };
        } else if (key === 'portfolio') {
          content = {
            heroHeading: 'Our work: Apps, Websites & digital products',
            heroParagraph:
              "A selection of mobile apps, websites, AI solutions and designs we've delivered. Browse by category to see what we can build for you.",
          };
        } else if (key === 'blogs') {
          content = {
            heroHeading: 'Mobile App, Web & AI Development Insights',
            heroParagraph:
              'Guides, comparisons and case studies on Flutter, React Native, Next.js, AI integration and UI/UX design.',
          };
        } else if (key === 'contact') {
          content = {
            heroHeading: "Let's Build Your App, Website or AI Solution",
            heroParagraph:
              'Tell us about your project. We reply with next steps and a free quote.',
          };
        }
        await PageContent.create({ key, content });
      }
    }

    // 9. SEED PROJECTS
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('[Seed] Seeding 9 Projects...');
      const defaultProjects = [
        {
          title: 'Bloom Finance App',
          slug: 'bloom-finance-app',
          category: 'Mobile Apps',
          categoryTag: 'Mobile App',
          techTag: 'Flutter',
          description: 'Personal finance app with budgeting and spending insights.',
          shortDescription: 'Personal finance app with budgeting and spending insights.',
          fullDescription:
            'Bloom Finance is a modern personal wealth and budgeting application engineered with Flutter. Built for both iOS and Android from a unified codebase, it enables users to seamlessly connect accounts, track real-time expenses, forecast recurring bills, and achieve personalized financial milestones.',
          challenge:
            'The client needed high-frequency real-time financial tracking with smooth 60fps animations across both platforms, while adhering to strict banking security standards and local encryption on devices.',
          solution:
            'We engineered the core state management using Bloc architecture in Flutter, paired with SQLite local encrypted storage and secure biometric authentication. An intelligent caching layer minimized API roundtrips.',
          results: [
            'Over 85,000 active users onboarded within 90 days',
            '4.8 star average rating on App Store and Google Play',
            'Unified codebase saved 40% on engineering & maintenance expenses',
          ],
          features: [
            'Interactive monthly budget tracker & visual charts',
            'Smart categorization with auto-tagging algorithms',
            'Bank-grade AES-256 local encrypted storage',
            'Offline-first synchronization engine',
          ],
          mockupStyle: 'phone',
          mockupType: 'phone',
          bgColor: 'cream',
          featured: true,
          status: 'published',
          order: 1,
          sortOrder: 1,
        },
        {
          title: 'North Studio Website',
          slug: 'north-studio-website',
          category: 'Websites',
          categoryTag: 'Website',
          techTag: 'Next.js',
          description: 'SEO-optimized agency website with a custom CMS.',
          shortDescription: 'SEO-optimized agency website with a custom CMS.',
          fullDescription:
            'North Studio is an award-winning architectural and design agency requiring a web presence that matches their aesthetic rigor. We designed and engineered a Next.js web application with sub-second page loads, fluid editorial layouts, and an intuitive headless CMS for their content creators.',
          challenge:
            'High-resolution architectural photography frequently bottlenecked performance on previous site iterations, resulting in degraded Core Web Vitals and poor organic search ranking.',
          solution:
            'We built a modern Next.js App Router solution with advanced image pipelines, edge caching, and semantic markdown-based CMS integration. Pre-rendered static pages deliver immediate interactivity.',
          results: [
            '99/100 Google Lighthouse performance score across mobile & desktop',
            '140% boost in organic search inquiries within 4 months',
            'Editorial content publishing time decreased from 2 hours to 10 minutes',
          ],
          features: [
            'Dynamic project showcase with filtering by project typology',
            'Custom headless CMS with real-time editorial preview',
            'Zero-layout-shift image optimization with AVIF/WebP fallback',
            'Tailored contact capture workflow linked with their internal CRM',
          ],
          mockupStyle: 'browser',
          mockupType: 'browser',
          bgColor: 'cream',
          featured: true,
          status: 'published',
          order: 2,
          sortOrder: 2,
        },
        {
          title: 'Clarity Dashboard',
          slug: 'clarity-dashboard',
          category: 'UI/UX Design',
          categoryTag: 'UI/UX Design',
          techTag: 'Figma',
          description: 'SaaS analytics dashboard designed for daily use.',
          shortDescription: 'SaaS analytics dashboard designed for daily use.',
          fullDescription:
            'Clarity is a B2B SaaS analytics platform delivering operational visibility to enterprise teams. TenzoAds spearheaded the end-to-end product design, establishing a comprehensive design system, data visualization guidelines, and high-density workflows that reduce cognitive fatigue.',
          challenge:
            'The platform handles complex datasets spanning millions of event records. Users frequently struggled to extract actionable metrics from dense, tabular reports.',
          solution:
            'We conducted user interviews across 15 enterprise clients and redesigned the information hierarchy around goal-driven widgets, consistent typography hierarchies, and dark-mode ergonomics.',
          results: [
            '38% decrease in onboarding time for new enterprise operators',
            'Net Promoter Score improved from +21 to +64',
            'Design tokens and component library adopted across 4 dev teams',
          ],
          features: [
            'Comprehensive design system with 250+ accessible components',
            'Modular drag-and-drop dashboard canvas layout',
            'Custom high-contrast data visualization palettes (WCAG AAA)',
            'Responsive tablet and laptop viewing presets',
          ],
          mockupStyle: 'dashboard',
          mockupType: 'dashboard',
          bgColor: 'black',
          featured: true,
          status: 'published',
          order: 3,
          sortOrder: 3,
        },
        {
          title: 'Rooted Brand Identity',
          slug: 'rooted-brand-identity',
          category: 'Graphic Design',
          categoryTag: 'Graphic Design',
          techTag: 'Branding',
          description: 'Logo and brand system for an organic food startup.',
          shortDescription: 'Logo and brand system for an organic food startup.',
          fullDescription:
            'Rooted is a farm-to-door organic food brand committed to sustainable agriculture and compostable packaging. We created a holistic brand identity that captures warmth, integrity, and natural freshness without resorting to generic organic cliches.',
          challenge:
            'Standing out on crowded grocery shelves and digital DTC channels required a distinctive visual voice that balanced rustic earthiness with modern typographic clarity.',
          solution:
            'Developed a memorable organic geometric icon mark, a bespoke earthy amber and forest palette, paired with purposeful editorial typography and sustainable packaging guidelines.',
          results: [
            'Successfully placed in 45 premium organic boutique retailers',
            'Brand recognition survey showed 72% recall after launch campaign',
            'Comprehensive 80-page brand book for digital and physical touchpoints',
          ],
          features: [
            'Flexible primary, secondary, and sub-mark logo variants',
            'Packaging design templates for 12 SKU consumer packages',
            'Social media launch kit with editable Figma component assets',
            'Eco-friendly print specifications for soy ink and unbleached paper',
          ],
          mockupStyle: 'brand',
          mockupType: 'brand',
          bgColor: 'amber',
          featured: false,
          status: 'published',
          order: 4,
          sortOrder: 4,
        },
        {
          title: 'Nova AI Assistant',
          slug: 'nova-ai-assistant',
          category: 'AI Solutions',
          categoryTag: 'AI Solutions',
          techTag: 'OpenAI / Chatbot',
          description: 'Support chatbot integrated into an existing product.',
          shortDescription: 'Support chatbot integrated into an existing product.',
          fullDescription:
            'Nova AI is an intelligent customer service copilot designed for a growing enterprise e-commerce platform. Using LLM fine-tuning and retrieval-augmented generation (RAG), Nova resolves complex order and support queries automatically with human-like empathy.',
          challenge:
            'Customer support teams were overwhelmed by seasonal volume spikes, leading to 6-hour average ticket resolution delays and high customer churn.',
          solution:
            'We implemented a secure RAG architecture connected to product catalogs and warehouse APIs, complete with strict guardrails, prompt evaluation suites, and seamless human escalation triggers.',
          results: [
            'Automated 68% of routine support queries without human touch',
            'Average response time reduced from 6 hours to under 4 seconds',
            'Customer satisfaction rating on automated tickets reached 94%',
          ],
          features: [
            'Semantic document retrieval over private company knowledge bases',
            'Real-time order tracking and shipment status lookups',
            'Multilingual conversation support across 14 languages',
            'Real-time sentiment detection and automated supervisor handoff',
          ],
          mockupStyle: 'chat',
          mockupType: 'chat',
          bgColor: 'amber',
          featured: false,
          status: 'published',
          order: 5,
          sortOrder: 5,
        },
        {
          title: 'FreshCart Shopping App',
          slug: 'freshcart-shopping-app',
          category: 'Mobile Apps',
          categoryTag: 'Mobile App',
          techTag: 'React Native',
          description: 'Cross-platform grocery delivery app.',
          shortDescription: 'Cross-platform grocery delivery app.',
          fullDescription:
            'FreshCart is an ultra-fast grocery delivery platform operating across metropolitan clusters. Built with React Native, it features instant search across 20,000 SKUs, real-time courier tracking on interactive maps, and instant one-tap checkout.',
          challenge:
            'Cart reconciliation during sudden inventory changes and real-time GPS tracking of hundreds of simultaneous deliveries created severe latency in legacy mobile builds.',
          solution:
            'Engineered a reactive local state store with WebSocket streaming and optimistic UI updates, ensuring instant cart interactions and fluid live courier location rendering.',
          results: [
            'Processed over 1.2M transactions in the first year of operation',
            'Sub-30ms interaction latency on cart modifications',
            'Maintained 99.98% crash-free sessions across both iOS and Android',
          ],
          features: [
            'Real-time inventory lookup with out-of-stock substitution suggestions',
            'Live driver telemetry and dynamic ETA routing integration',
            'Apple Pay, Google Pay, and localized digital wallet integrations',
            'Repeat order shortcut and scheduled recurring basket delivery',
          ],
          mockupStyle: 'phone',
          mockupType: 'phone',
          bgColor: 'cream',
          featured: false,
          status: 'published',
          order: 6,
          sortOrder: 6,
        },
        {
          title: 'Orbit CRM',
          slug: 'orbit-crm',
          category: 'Websites',
          categoryTag: 'Web App',
          techTag: 'Next.js',
          description: 'Custom CRM web app for a growing sales team.',
          shortDescription: 'Custom CRM web app for a growing sales team.',
          fullDescription:
            'Orbit is a bespoke CRM and deal flow management system built for high-velocity B2B sales teams. Built with Next.js, Node.js, and PostgreSQL, it streamlines pipeline tracking, automated email cadence tracking, and collaborative revenue forecasting.',
          challenge:
            'Off-the-shelf CRM solutions were overly bloated, costly per seat, and lacked specific compliance and pipeline workflows vital to the client’s industry.',
          solution:
            'Designed and deployed a lean, custom cloud platform focused entirely on sales rep ergonomics, automated meeting transcription notes, and instant Kanban pipeline adjustments.',
          results: [
            'Saved $75,000 annually compared to enterprise CRM license tiers',
            'Sales team activity logging increased by 220%',
            'Average sales cycle duration shortened by 14 days',
          ],
          features: [
            'Interactive drag-and-drop pipeline Kanban boards',
            'Bi-directional email and calendar synchronization',
            'Automated activity scoring and deal momentum indicators',
            'Granular role-based access control with audit trails',
          ],
          mockupStyle: 'dashboard',
          mockupType: 'dashboard',
          bgColor: 'black',
          featured: false,
          status: 'published',
          order: 7,
          sortOrder: 7,
        },
        {
          title: 'Trailhead Fitness',
          slug: 'trailhead-fitness',
          category: 'Mobile Apps',
          categoryTag: 'Mobile App',
          techTag: 'Kotlin / Swift',
          description: 'Native iOS and Android app for outdoor activity tracking.',
          shortDescription: 'Native iOS and Android app for outdoor activity tracking.',
          fullDescription:
            'Trailhead Fitness is a premier GPS activity recording and hiking guide app engineered natively for iOS (Swift) and Android (Kotlin). Optimized for harsh outdoor conditions and remote environments with zero cellular coverage.',
          challenge:
            'Continuous high-accuracy GPS tracking rapidly depleted smartphone batteries and frequently crashed in deep valleys where cellular connections dropped completely.',
          solution:
            'Implemented platform-native low-power location algorithms with CoreLocation and Android FusedLocationProvider, paired with offline topographic vector map rendering.',
          results: [
            'Reduced device battery consumption by 45% during active tracking',
            'Nominated for App Store Best Design in Health & Fitness category',
            'Over 250,000 mountain trails downloaded for offline guidance',
          ],
          features: [
            'Vector offline topographic maps with elevation profile graphs',
            'Heart rate and biometric sync via Apple HealthKit & Google Health Connect',
            'Automatic fall detection with emergency contact SMS beaconing',
            'Audio trail milestones and turn-by-turn waypoint cues',
          ],
          mockupStyle: 'phone',
          mockupType: 'phone',
          bgColor: 'cream',
          featured: false,
          status: 'published',
          order: 8,
          sortOrder: 8,
        },
        {
          title: 'Studio Lumen',
          slug: 'studio-lumen',
          category: 'Websites',
          categoryTag: 'Website',
          techTag: 'Webflow',
          description: 'Creative studio portfolio website built on Webflow.',
          shortDescription: 'Creative studio portfolio website built on Webflow.',
          fullDescription:
            'Studio Lumen is an international creative production and cinematography studio. We crafted a cinematic, motion-driven portfolio website leveraging Webflow’s visual CMS, enriched with custom JavaScript micro-interactions and smooth video background loops.',
          challenge:
            'The studio needed to publish high-impact showreels and project case studies weekly without needing an engineering ticket for every visual update.',
          solution:
            'Developed a custom Webflow architecture with modular CMS collections, dynamic video embeds, custom cursor effects, and full client training.',
          results: [
            'Internal team now launches new case studies in under 15 minutes',
            'Average site dwell time surged from 42 seconds to 3 minutes 18 seconds',
            'Featured on multiple digital design recognition showcases',
          ],
          features: [
            'Fluid page transitions and custom magnetic hover states',
            'Optimized HLS video streaming for instant playback on all mobile devices',
            'Custom Webflow CMS structured for multi-media directors and credits',
            'Interactive client inquiry intake with project brief upload',
          ],
          mockupStyle: 'browser',
          mockupType: 'browser',
          bgColor: 'cream',
          featured: false,
          status: 'published',
          order: 9,
          sortOrder: 9,
        },
      ];
      await Project.insertMany(defaultProjects);
    }

    // 10. SEED POSTS
    const postCount = await Post.countDocuments();
    if (postCount === 0) {
      console.log('[Seed] Seeding 7 Blog Posts...');
      const defaultPosts = [
        {
          title: 'Flutter vs React Native in 2026: Which Should You Choose?',
          slug: 'flutter-vs-react-native-2026',
          category: 'Mobile Apps',
          categoryDisplay: 'FEATURED · MOBILE APPS',
          excerpt:
            'Performance, cost, hiring and long-term maintenance compared to pick the right framework for your next mobile product.',
          content: `<p>Choosing the right cross-platform mobile development framework remains one of the most critical decisions a startup or product owner makes. In 2026, both Flutter and React Native have matured into battle-tested ecosystems capable of delivering high-performance, polished user experiences across iOS and Android.</p>
<h3>1. Rendering Engine and Performance</h3>
<p>Flutter compiles directly to native ARM code using Impeller, its modern rendering engine. This eliminates the legacy JavaScript bridge entirely, delivering consistent 60fps and 120fps animations without micro-stutters. On the other hand, React Native’s New Architecture (Fabric renderer and TurboModules) utilizes JSI (JavaScript Interface) for direct C++ communication. Both now offer exceptional, near-native performance for 95% of business applications.</p>
<h3>2. Developer Velocity and Talent Availability</h3>
<p>If your engineering team has extensive JavaScript or TypeScript web expertise, React Native offers an easier learning curve. Code sharing between your Next.js web application and mobile app can reach up to 70% using universal UI libraries. Flutter, written in Dart, requires learning a dedicated language, yet its rich standard widget library often enables teams to build custom UI components 25% faster from scratch.</p>
<h3>3. Long-term Maintenance & Ecosystem</h3>
<p>Both ecosystems boast robust corporate backing (Google for Flutter, Meta for React Native). Flutter shines brightest when you need custom pixel-perfect branding that looks identical down to the subpixel across every device. React Native excels when you need deep integration with native operating system modules and existing React-based engineering orgs.</p>
<h3>Summary Recommendation</h3>
<ul>
<li>Choose Flutter if: You have complex custom animations, prioritize UI consistency across older devices, or are building a brand-new application from scratch.</li>
<li>Choose React Native if: You have an existing React team, plan to share code with a web application, or require tight integration with platform-specific native SDKs.</li>
</ul>`,
          readTime: '9 min read',
          author: 'Vikram Mehta',
          authorRole: 'Head of Mobile Engineering',
          date: 'Oct 28, 2026',
          featured: true,
          status: 'published',
          order: 1,
          sortOrder: 1,
          tags: ['Flutter', 'React Native', 'Mobile Apps', 'Architecture'],
        },
        {
          title: 'Why Next.js Is the Best Choice for SEO-Friendly Business Websites',
          slug: 'why-nextjs-best-choice-seo-business-websites',
          category: 'Websites',
          categoryDisplay: 'WEB DEVELOPMENT',
          excerpt:
            'Server rendering, speed and clean URLs that help your site rank and convert visitors into paying clients.',
          content: `<p>Search engines love speed, semantic HTML, and structured data. For years, client-rendered single-page applications struggled to achieve high organic visibility because web crawlers faced delays in executing JavaScript bundles. Next.js solves this at its core through Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR).</p>
<h3>The Power of Hybrid Rendering</h3>
<p>With Next.js App Router, you don't have to choose between a fast static site and dynamic server logic. Product landing pages can be statically generated at build time for instant CDN delivery, while personalized portals can render dynamically on the edge.</p>
<h3>Core Web Vitals Out of the Box</h3>
<p>Google’s Core Web Vitals directly affect search ranking. Next.js provides built-in components like Next/Image and Next/Font that virtually eliminate Cumulative Layout Shift (CLS) and maximize Largest Contentful Paint (LCP) scores. Combining this with edge routing ensures global response times under 100ms.</p>`,
          readTime: '7 min read',
          author: 'Arjun Sen',
          authorRole: 'Principal Web Architect',
          date: 'Oct 24, 2026',
          featured: false,
          status: 'published',
          order: 2,
          sortOrder: 2,
          tags: ['Next.js', 'SEO', 'Web Development', 'Performance'],
        },
        {
          title: 'How to Add AI to Your App: A Guide for Small Businesses',
          slug: 'how-to-add-ai-to-your-app-small-business-guide',
          category: 'AI Solutions',
          categoryDisplay: 'AI INTEGRATION',
          excerpt:
            'Chatbots, search and automation you can ship in weeks, with real costs and clear business returns.',
          content: `<p>Integrating artificial intelligence into your business does not require training billion-parameter models from scratch or spending hundreds of thousands of dollars. Pragmatic AI integration is about applying existing foundation models to solve specific operational friction points.</p>
<h3>Practical AI Use Cases for Modern Companies</h3>
<ol>
<li>Retrieval-Augmented Generation (RAG): Allow customers or staff to query your internal knowledge base, manuals, or catalogs in natural conversation.</li>
<li>Semantic Search: Replace rigid keyword queries with vector embeddings so users find what they mean, not just what they typed.</li>
<li>Automated Content Drafting: Generate order summaries, email responses, and report drafts for human verification.</li>
</ol>
<h3>Understanding Real Infrastructure Costs</h3>
<p>With pay-per-token pricing models and modern caching, adding an intelligent support assistant to an app serving 5,000 monthly inquiries typically costs less than $100 in API credits. The key is strict prompt engineering, token minimization, and caching common queries.</p>`,
          readTime: '7 min read',
          author: 'Elena Rostova',
          authorRole: 'AI & Data Lead',
          date: 'Oct 20, 2026',
          featured: false,
          status: 'published',
          order: 3,
          sortOrder: 3,
          tags: ['AI Integration', 'LLM', 'Small Business', 'Chatbots'],
        },
        {
          title: '10 UX Principles That Increase App Retention',
          slug: '10-ux-principles-that-increase-app-retention',
          category: 'UI/UX Design',
          categoryDisplay: 'UI/UX DESIGN',
          excerpt:
            'Simple onboarding, clear navigation and feedback loops that retain users over months, not just minutes.',
          content: `<p>User acquisition is expensive; user retention is what builds sustainable enterprise value. A product that loses 80% of its users within the first three days cannot be rescued by marketing spend alone. Good UX design systematically removes friction and reinforces user progress.</p>
<h3>1. Progressive Disclosure in Onboarding</h3>
<p>Do not demand a 15-field profile setup before showing product value. Give users immediate gratification within 60 seconds, and collect secondary preferences progressively as they engage.</p>
<h3>2. Clear Visual Feedback and Latency Masking</h3>
<p>Every user tap must trigger immediate visual acknowledgment. Skeleton loaders, subtle haptic feedback, and optimistic state updates eliminate perceived waiting times and inspire trust.</p>
<h3>3. Thumb-Zone Ergonomics</h3>
<p>With larger mobile screens, ensure key interactive actions reside in the natural thumb zone. Navigation bars, primary CTAs, and filter chips should be reachable with one hand without awkward finger contortions.</p>`,
          readTime: '7 min read',
          author: 'Priya Sharma',
          authorRole: 'Lead Product Designer',
          date: 'Oct 15, 2026',
          featured: false,
          status: 'published',
          order: 4,
          sortOrder: 4,
          tags: ['UI/UX Design', 'User Retention', 'Product Design'],
        },
        {
          title: 'WordPress vs Webflow vs Custom Code: What Fits Your Budget?',
          slug: 'wordpress-vs-webflow-vs-custom-code-budget-guide',
          category: 'Websites',
          categoryDisplay: 'WEB DEVELOPMENT',
          excerpt:
            'Cost, flexibility, speed and scalability compared in plain language so you make the right investment.',
          content: `<p>Building a business website requires selecting the right foundation for your current stage and 3-year growth plans. Choosing custom code too early can burn runway, while outgrowing a no-code tool too late can lead to expensive rewrites.</p>
<h3>WordPress: The Veteran Workhorse</h3>
<p>WordPress powers over 40% of the web. It is ideal for content-heavy publications, blogs, and businesses that need immense plugin flexibility and self-hosted control. However, it requires ongoing maintenance, plugin updates, and security hardening.</p>
<h3>Webflow: The Visual Development Powerhouse</h3>
<p>Webflow bridges design and production code. It enables marketing teams to launch responsive landing pages with sophisticated animations without waiting on engineering sprints. It is perfect for marketing sites and creative agencies with budgets between $3,000 and $15,000.</p>
<h3>Custom Code (React / Next.js): Total Control and Scalability</h3>
<p>When your web presence is your actual software product, or when you require complex custom business logic, third-party API integrations, and enterprise security, custom code is unbeatable. It delivers lowest latency, zero platform lock-in, and endless scalability.</p>`,
          readTime: '7 min read',
          author: 'Arjun Sen',
          authorRole: 'Principal Web Architect',
          date: 'Oct 10, 2026',
          featured: false,
          status: 'published',
          order: 5,
          sortOrder: 5,
          tags: ['Webflow', 'WordPress', 'Next.js', 'Budget'],
        },
        {
          title: 'Native vs Cross-Platform App Development: Decision Framework',
          slug: 'native-vs-cross-platform-app-development-framework',
          category: 'Mobile Apps',
          categoryDisplay: 'MOBILE APPS',
          excerpt:
            'When Kotlin and Swift win, and when one unified codebase saves months of development and budget.',
          content: `<p>The debate between pure native and cross-platform mobile development has evolved dramatically. Today, the choice is no longer about raw performance—it is about architectural fit, hardware depth, and business constraints.</p>
<h3>When Native (Swift / Kotlin) Is Required</h3>
<p>Native development remains the gold standard when your product relies heavily on low-level device hardware, real-time audio/video DSP, complex background GPS geofencing, or cutting-edge platform APIs (such as Apple Vision Pro ARKit or specialized Bluetooth peripherals).</p>
<h3>When Cross-Platform (Flutter / React Native) Wins</h3>
<p>For 85% of mobile applications—including fintech, marketplaces, social platforms, and on-demand services—cross-platform delivers equal polish in roughly half the timeline. Maintaining a single team and a single synchronized release schedule dramatically reduces communication friction.</p>`,
          readTime: '7 min read',
          author: 'Vikram Mehta',
          authorRole: 'Head of Mobile Engineering',
          date: 'Oct 05, 2026',
          featured: false,
          status: 'published',
          order: 6,
          sortOrder: 6,
          tags: ['Native Apps', 'Cross-Platform', 'Swift', 'Kotlin'],
        },
        {
          title: 'Brand Identity Basics: Logo, Color and Type for New Brands',
          slug: 'brand-identity-basics-logo-color-type',
          category: 'Graphic Design',
          categoryDisplay: 'GRAPHIC DESIGN',
          excerpt:
            'Build a consistent look from day one with a simple brand system that scales as your company grows.',
          content: `<p>A brand identity is far more than just a logo file. It is the visual shorthand that conveys competence, credibility, and values before a potential customer reads a single word of your copy. For early-stage companies, establishing a disciplined brand system early prevents fragmented messaging.</p>
<h3>The Core Brand Trinity: Mark, Palette, and Type</h3>
<ol>
<li>The Mark: Ensure your logo works in monochrome (pure black on white) before adding gradients. If it is illegible at 16x16 pixels as a favicon or app icon, simplify it.</li>
<li>The Color System: Limit your brand palette to one primary brand color (such as our signature warm amber), one dark anchor (ink black), one light neutral (cream/soft off-white), and functional state colors.</li>
<li>Typography Hierarchy: Choose one expressive display font for bold headlines and one highly readable workhorse sans-serif for body copy. Maintain consistent font weights and line heights across every digital touchpoint.</li>
</ol>`,
          readTime: '7 min read',
          author: 'Maya Lin',
          authorRole: 'Senior Brand Strategist',
          date: 'Sep 29, 2026',
          featured: false,
          status: 'published',
          order: 7,
          sortOrder: 7,
          tags: ['Graphic Design', 'Branding', 'Typography', 'Logo Design'],
        },
      ];
      await Post.insertMany(defaultPosts);
    }

    console.log('✅ [Seed] Database seeded successfully and safely!');
  } catch (error) {
    console.error('❌ [Seed] Error seeding database:', error);
  }
};

// If run directly via node
if (process.argv[1]?.endsWith('seed.js')) {
  seedData().then(async () => {
    await closeDB();
    process.exit(0);
  });
}
