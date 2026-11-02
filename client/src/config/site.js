export const siteConfig = {
  name: 'TenzoAds',
  tagline: 'We build Apps, Websites & AI Products that grow your business.',
  description:
    'TenzoAds is an IT services company helping startups and growing businesses turn ideas into reliable mobile apps, websites and AI-powered products.',
  contact: {
    phone: '+91 00000 00000',
    phoneHref: 'tel:+910000000000',
    email: 'hello@yourdomain.com',
    emailHref: 'mailto:hello@yourdomain.com',
    workingHours: 'Mon - Fri, 9:00 - 18:00 (Time zone)',
    indiaOffice: {
      title: 'India Office',
      address: 'Tower B, Tech Park, Sector 62, Noida, Delhi NCR, India',
    },
    usaOffice: {
      title: 'USA Office',
      address: '548 Market St, Suite 34291, San Francisco, CA 94104',
    },
    fullAddress: '[Street address], [City], [Country]',
  },
  social: {
    twitter: 'https://twitter.com/tenzoads',
    linkedin: 'https://linkedin.com/company/tenzoads',
    github: 'https://github.com/tenzoads',
  },
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blogs', path: '/blogs' },
  ],
  services: [
    { label: 'Mobile App Development', path: '/portfolio?category=Mobile+Apps' },
    { label: 'Website Development', path: '/portfolio?category=Websites' },
    { label: 'AI Integration', path: '/portfolio?category=AI+Solutions' },
    { label: 'UI/UX Design', path: '/portfolio?category=UI%2FUX+Design' },
    { label: 'Graphic Design', path: '/portfolio?category=Graphic+Design' },
  ],
  technologies: [
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
  ],
  servicesDetailed: [
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      description:
        'Native and cross-platform apps for iOS and Android. High-performance, intuitive UI, and integrated cloud backend.',
      tech: 'Flutter, React Native, Swift, Kotlin',
      icon: 'Smartphone',
    },
    {
      id: 'website-dev',
      title: 'Website Development',
      description:
        'Fast, SEO-friendly websites and web apps built with React, Next.js, Vue, and modern cloud stacks.',
      tech: 'React, Next.js, Node.js, Laravel',
      icon: 'Globe',
    },
    {
      id: 'cms-nocode',
      title: 'CMS & No-Code Websites',
      description:
        'Custom content management systems and visual website builders that give your marketing team full control.',
      tech: 'WordPress, Webflow, Wix, PHP',
      icon: 'Layers',
    },
    {
      id: 'ai-integration',
      title: 'AI Integration',
      description:
        'Add chatbots, semantic search, and AI-powered automation to your product to improve speed and save cost.',
      tech: 'OpenAI, LangChain, Embeddings',
      icon: 'Sparkles',
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description:
        'Research, wireframes, and high-fidelity prototype interfaces that delight users and maximize conversion.',
      tech: 'Figma, Wireframing, Prototyping',
      icon: 'Palette',
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      description:
        'Brand identity, logos, vector illustration and marketing collateral that sets your brand apart from competitors.',
      tech: 'Illustrator, Brand Systems, Guidelines',
      icon: 'PenTool',
    },
  ],
  whyUs: [
    {
      title: 'End-to-end delivery',
      description: 'Strategy, design, development, and launch handled by a single dedicated team.',
      icon: 'Box',
    },
    {
      title: 'Agile & transparent',
      description: 'Weekly sprint demos, real-time code updates, and direct channel to developers.',
      icon: 'Zap',
    },
    {
      title: 'AI-ready by design',
      description: 'Modern architectures ready for intelligent search, automation, and LLM integrations.',
      icon: 'Bot',
    },
    {
      title: 'Support after launch',
      description: 'Continuous monitoring, routine maintenance, and platform feature upgrades.',
      icon: 'ShieldCheck',
    },
  ],
  steps: [
    {
      number: '1',
      title: 'Discover',
      description: 'Define your vision, users, and core requirements to build an actionable roadmap.',
    },
    {
      number: '2',
      title: 'Design',
      description: 'Wireframes, prototypes and UI designs you can review and approve.',
    },
    {
      number: '3',
      title: 'Develop',
      description: 'Agile sprints with clean code, review-ready builds, and continuous QA.',
    },
    {
      number: '4',
      title: 'Launch & Support',
      description: 'Seamless cloud deploy, app store submission and continuous optimization.',
    },
  ],
  faqsHome: [
    {
      question: 'How much does it cost to build a mobile app?',
      answer:
        'Cost depends on scope, platforms (iOS, Android, or both), and custom features. Typically, simple apps start from $3,000, while complex applications with AI and custom backends range from $8,000 to $25,000. We share a clear, transparent fixed-price estimate within 24 hours.',
    },
    {
      question: 'Should I choose native, Flutter or React Native?',
      answer:
        'For 85% of startups and businesses, Flutter or React Native offers huge savings by maintaining a single codebase across iOS and Android with 60fps performance. If your app requires heavy hardware sensors, Bluetooth low-energy, or Apple ARKit, native Swift/Kotlin is recommended.',
    },
    {
      question: 'How long does a website development take?',
      answer:
        'Marketing websites and landing pages typically take 2 to 4 weeks. Custom web applications, portals, and complex e-commerce platforms take between 6 to 12 weeks depending on features, integrations, and content readiness.',
    },
    {
      question: 'Do you provide support after launch?',
      answer:
        'Yes! Every project includes complimentary 30-day post-launch warranty and bug-fix support. We also offer affordable monthly SLA maintenance packages for security patches, server monitoring, and feature iteration.',
    },
  ],
  faqsContact: [
    {
      question: 'How much does a mobile app or website cost?',
      answer:
        'Cost depends on scope, platforms and features. We share a transparent, fixed-price estimate within 24 hours of receiving your requirements.',
    },
    {
      question: 'Which technologies do you work with?',
      answer:
        'We work across modern native and cross-platform stacks: Android (Kotlin), iOS (Swift), Flutter, React Native, React, Next.js, Node.js, Vue, Angular, Laravel, PHP, WordPress, Wix and Webflow.',
    },
    {
      question: 'Can you add AI features to an existing product?',
      answer:
        'Yes, absolutely. We integrate chatbots, semantic vector search, recommendation engines and automated document workflows into existing applications without requiring a full rewrite.',
    },
    {
      question: 'How long does a project take?',
      answer:
        'Websites typically take 2-6 weeks, and mobile apps 2-5 months depending on feature complexity and integration depth.',
    },
  ],
};
