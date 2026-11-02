import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingState from './components/common/LoadingState';

// Lazy loaded page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-ink selection:bg-amber-300 selection:text-ink">
      <ScrollToTop />
      {/* 1. Global Top Bar */}
      <TopBar />
      {/* 2. Global Sticky Navbar */}
      <Navbar />

      {/* 3. Page Routes with Suspense */}
      <main className="flex-1">
        <Suspense fallback={<LoadingState message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<ProjectDetail />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* 4. Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
