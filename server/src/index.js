import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';
import projectsRoutes from './routes/projects.js';
import postsRoutes from './routes/posts.js';
import healthRoutes from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';
import { Project } from './models/Project.js';
import { seedData } from './scripts/seed.js';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS
const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly permissive
    },
    credentials: true,
  })
);

// Request body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for dev
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
  }
  next();
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/health', healthRoutes);

// Fallback for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route ${req.originalUrl} not found`,
  });
});

// Centralized error handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
  try {
    await connectDB();

    // Auto seed if empty
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('[Startup] No projects detected in database. Auto-populating initial data...');
      await seedData();
    }

    app.listen(PORT, () => {
      console.log(`🚀 [TenzoAds Server] Running at http://localhost:${PORT}`);
      console.log(`📡 [TenzoAds Server] Health check available at http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('❌ [Startup] Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
