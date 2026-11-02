import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Lazy-loaded pages
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectForm = lazy(() => import('./pages/ProjectForm'));
const Posts = lazy(() => import('./pages/Posts'));
const PostForm = lazy(() => import('./pages/PostForm'));
const QuoteRequests = lazy(() => import('./pages/QuoteRequests'));
const Subscribers = lazy(() => import('./pages/Subscribers'));
const Services = lazy(() => import('./pages/Services'));
const Faqs = lazy(() => import('./pages/Faqs'));
const Technologies = lazy(() => import('./pages/Technologies'));
const ProcessSteps = lazy(() => import('./pages/ProcessSteps'));
const WhyUs = lazy(() => import('./pages/WhyUs'));
const Pages = lazy(() => import('./pages/Pages'));
const MediaPage = lazy(() => import('./pages/MediaPage'));
const Settings = lazy(() => import('./pages/Settings'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

const LoadingFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-muted font-medium">Loading view...</span>
    </div>
  </div>
);

export const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Projects */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/:id/edit" element={<ProjectForm />} />

          {/* Posts */}
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/:id/edit" element={<PostForm />} />

          {/* Leads & Newsletter */}
          <Route path="/quote-requests" element={<QuoteRequests />} />
          <Route path="/subscribers" element={<Subscribers />} />

          {/* Content sections */}
          <Route path="/services" element={<Services />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/process-steps" element={<ProcessSteps />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/media" element={<MediaPage />} />

          {/* Superadmin restricted */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute requiredRole="superadmin">
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRole="superadmin">
                <UsersPage />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* 404 Inside Layout */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

