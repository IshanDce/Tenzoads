import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { connectDB } from './config/db.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { Project } from './models/Project.js';
import { seedData } from './scripts/seed.js';

const app = express();
const PORT = process.env.PORT || 5000;
const WEBSITE_URL = process.env.WEBSITE_URL || 'http://localhost:5173';
const ADMIN_URL = process.env.ADMIN_URL || 'http://localhost:5174';

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration allowing both WEBSITE_URL and ADMIN_URL
const allowedOrigins = [
  WEBSITE_URL,
  ADMIN_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev
    },
    credentials: true,
  })
);

// Parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
const uploadDir = path.resolve(process.cwd(), process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Request logger for dev
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
  }
  next();
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

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
      console.log(`🚀 [TenzoAds Backend] Running at http://localhost:${PORT}`);
      console.log(`📡 [TenzoAds Backend] Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('❌ [Startup] Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
