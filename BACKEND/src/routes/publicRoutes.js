import express from 'express';
import {
  getSettings,
  getPageContent,
  getServices,
  getFaqs,
  getTechnologies,
  getProcessSteps,
  getWhyUs,
  getProjects,
  getProjectBySlug,
  getPosts,
  getFeaturedPost,
  getPostBySlug,
} from '../controllers/publicController.js';
import contactRouter from './contact.js';
import newsletterRouter from './newsletter.js';
import healthRouter from './health.js';
import { cacheMiddleware } from '../utils/cache.js';

const router = express.Router();

// Content endpoints (cached for 60s)
router.get('/settings', cacheMiddleware(60), getSettings);
router.get('/page-content/:key', cacheMiddleware(60), getPageContent);
router.get('/services', cacheMiddleware(60), getServices);
router.get('/faqs', cacheMiddleware(60), getFaqs);
router.get('/technologies', cacheMiddleware(60), getTechnologies);
router.get('/process-steps', cacheMiddleware(60), getProcessSteps);
router.get('/why-us', cacheMiddleware(60), getWhyUs);

// Projects
router.get('/projects', cacheMiddleware(30), getProjects);
router.get('/projects/:slug', cacheMiddleware(30), getProjectBySlug);

// Posts
router.get('/posts', cacheMiddleware(30), getPosts);
router.get('/posts/featured', cacheMiddleware(30), getFeaturedPost);
router.get('/posts/:slug', cacheMiddleware(30), getPostBySlug);

// Interactive (Not cached)
router.use('/contact', contactRouter);
router.use('/newsletter', newsletterRouter);
router.use('/health', healthRouter);

export default router;

