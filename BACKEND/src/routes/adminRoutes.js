import express from 'express';
import {
  login,
  logout,
  refresh,
  getMe,
  changePassword,
} from '../controllers/authController.js';
import {
  getDashboardStats,
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  listServices,
  createService,
  updateService,
  deleteService,
  listFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  listTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  listProcessSteps,
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
  listWhyUs,
  createWhyUs,
  updateWhyUs,
  deleteWhyUs,
  getPageContent,
  updatePageContent,
  getSiteSettings,
  updateSiteSettings,
  listContacts,
  getContact,
  updateContact,
  deleteContact,
  exportContactsCSV,
  listSubscribers,
  toggleSubscriber,
  deleteSubscriber,
  exportSubscribersCSV,
  uploadMediaFile,
  listMedia,
  deleteMedia,
  listUsers,
  createUser,
  updateUser,
  resetUserPassword,
  deleteUser,
} from '../controllers/adminController.js';
import { verifyAdmin } from '../middleware/auth.js';
import { requireSuperAdmin } from '../middleware/role.js';
import { loginLimiter } from '../middleware/rateLimiter.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// ==========================================
// 1. AUTH (Public endpoints)
// ==========================================
router.post('/auth/login', loginLimiter, login);
router.post('/auth/logout', logout);
router.post('/auth/refresh', refresh);

// Protected Auth
router.get('/auth/me', verifyAdmin, getMe);
router.put('/auth/change-password', verifyAdmin, changePassword);

// ==========================================
// 2. DASHBOARD
// ==========================================
router.get('/dashboard', verifyAdmin, getDashboardStats);

// ==========================================
// 3. PROJECTS CRUD
// ==========================================
router.get('/projects', verifyAdmin, listProjects);
router.post('/projects', verifyAdmin, createProject);
router.get('/projects/:id', verifyAdmin, getProject);
router.put('/projects/:id', verifyAdmin, updateProject);
router.delete('/projects/:id', verifyAdmin, deleteProject);

// ==========================================
// 4. POSTS CRUD
// ==========================================
router.get('/posts', verifyAdmin, listPosts);
router.post('/posts', verifyAdmin, createPost);
router.get('/posts/:id', verifyAdmin, getPost);
router.put('/posts/:id', verifyAdmin, updatePost);
router.delete('/posts/:id', verifyAdmin, deletePost);

// ==========================================
// 5. SERVICES CRUD
// ==========================================
router.get('/services', verifyAdmin, listServices);
router.post('/services', verifyAdmin, createService);
router.put('/services/:id', verifyAdmin, updateService);
router.delete('/services/:id', verifyAdmin, deleteService);

// ==========================================
// 6. FAQS CRUD
// ==========================================
router.get('/faqs', verifyAdmin, listFaqs);
router.post('/faqs', verifyAdmin, createFaq);
router.put('/faqs/:id', verifyAdmin, updateFaq);
router.delete('/faqs/:id', verifyAdmin, deleteFaq);

// ==========================================
// 7. TECHNOLOGIES CRUD
// ==========================================
router.get('/technologies', verifyAdmin, listTechnologies);
router.post('/technologies', verifyAdmin, createTechnology);
router.put('/technologies/:id', verifyAdmin, updateTechnology);
router.delete('/technologies/:id', verifyAdmin, deleteTechnology);

// ==========================================
// 8. PROCESS STEPS & WHY-US
// ==========================================
router.get('/process-steps', verifyAdmin, listProcessSteps);
router.post('/process-steps', verifyAdmin, createProcessStep);
router.put('/process-steps/:id', verifyAdmin, updateProcessStep);
router.delete('/process-steps/:id', verifyAdmin, deleteProcessStep);

router.get('/why-us', verifyAdmin, listWhyUs);
router.post('/why-us', verifyAdmin, createWhyUs);
router.put('/why-us/:id', verifyAdmin, updateWhyUs);
router.delete('/why-us/:id', verifyAdmin, deleteWhyUs);

// ==========================================
// 9. PAGE CONTENT (Tabs for Home, About, etc.)
// ==========================================
router.get('/page-content/:key', verifyAdmin, getPageContent);
router.put('/page-content/:key', verifyAdmin, updatePageContent);

// ==========================================
// 10. QUOTE REQUESTS / CONTACTS
// ==========================================
router.get('/quote-requests/export-csv', verifyAdmin, exportContactsCSV);
router.get('/quote-requests', verifyAdmin, listContacts);
router.get('/quote-requests/:id', verifyAdmin, getContact);
router.put('/quote-requests/:id', verifyAdmin, updateContact);
router.delete('/quote-requests/:id', verifyAdmin, deleteContact);

// ==========================================
// 11. SUBSCRIBERS
// ==========================================
router.get('/subscribers/export-csv', verifyAdmin, exportSubscribersCSV);
router.get('/subscribers', verifyAdmin, listSubscribers);
router.put('/subscribers/:id/toggle', verifyAdmin, toggleSubscriber);
router.delete('/subscribers/:id', verifyAdmin, deleteSubscriber);

// ==========================================
// 12. MEDIA UPLOAD
// ==========================================
router.post('/media', verifyAdmin, upload.single('file'), uploadMediaFile);
router.get('/media', verifyAdmin, listMedia);
router.delete('/media/:id', verifyAdmin, deleteMedia);

// ==========================================
// 13. SUPERADMIN ONLY (Settings & Users)
// ==========================================
router.get('/settings', verifyAdmin, requireSuperAdmin, getSiteSettings);
router.put('/settings', verifyAdmin, requireSuperAdmin, updateSiteSettings);

router.get('/users', verifyAdmin, requireSuperAdmin, listUsers);
router.post('/users', verifyAdmin, requireSuperAdmin, createUser);
router.put('/users/:id', verifyAdmin, requireSuperAdmin, updateUser);
router.put('/users/:id/reset-password', verifyAdmin, requireSuperAdmin, resetUserPassword);
router.delete('/users/:id', verifyAdmin, requireSuperAdmin, deleteUser);

export default router;

