import { Project } from '../models/Project.js';
import { Post } from '../models/Post.js';
import { Service } from '../models/Service.js';
import { Faq } from '../models/Faq.js';
import { Technology } from '../models/Technology.js';
import { ProcessStep } from '../models/ProcessStep.js';
import { WhyUsItem } from '../models/WhyUsItem.js';
import { PageContent } from '../models/PageContent.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { Contact } from '../models/Contact.js';
import { Subscriber } from '../models/Subscriber.js';
import { Media } from '../models/Media.js';
import { Admin } from '../models/Admin.js';
import { clearCache } from '../utils/cache.js';
import path from 'path';
import fs from 'fs';

// ==========================================
// 1. DASHBOARD STATS
// ==========================================
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalSubscribers = await Subscriber.countDocuments({ isActive: true });
    const newQuoteRequests = await Contact.countDocuments({ status: 'new' });
    const totalQuoteRequests = await Contact.countDocuments();

    const recentQuotes = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Compute monthly quote requests for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyAggregation = await Contact.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyQuotes = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const found = monthlyAggregation.find((a) => a._id.year === y && a._id.month === m);
      monthlyQuotes.push({
        month: `${months[m - 1]} ${y}`,
        shortMonth: months[m - 1],
        quotes: found ? found.count : 0,
      });
    }

    return res.json({
      success: true,
      stats: {
        totalProjects,
        totalPosts,
        totalSubscribers,
        newQuoteRequests,
        totalQuoteRequests,
      },
      monthlyQuotes,
      recentQuotes,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. PROJECTS CRUD
// ==========================================
export const listProjects = async (req, res, next) => {
  try {
    const { search, category, status, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { techTag: { $regex: search, $options: 'i' } },
      ];
    }
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (status) {
      filter.status = status;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const total = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .sort({ order: 1, sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    let slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    slug = slug.replace(/^-|-$/g, '');

    const existing = await Project.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const project = await Project.create({
      ...req.body,
      slug,
      shortDescription: req.body.shortDescription || req.body.description,
      description: req.body.description || req.body.shortDescription,
      mockupStyle: req.body.mockupStyle || req.body.mockupType || 'browser',
      mockupType: req.body.mockupStyle || req.body.mockupType || 'browser',
    });

    clearCache('projects');
    return res.status(201).json({ success: true, message: 'Project created successfully', data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        shortDescription: req.body.shortDescription || req.body.description,
        description: req.body.description || req.body.shortDescription,
        mockupStyle: req.body.mockupStyle || req.body.mockupType || 'browser',
        mockupType: req.body.mockupStyle || req.body.mockupType || 'browser',
      },
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    clearCache('projects');
    return res.json({ success: true, message: 'Project updated successfully', data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    clearCache('projects');
    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. POSTS CRUD
// ==========================================
export const listPosts = async (req, res, next) => {
  try {
    const { search, category, status, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (status) {
      filter.status = status;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .sort({ order: 1, sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    return res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    let slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    slug = slug.replace(/^-|-$/g, '');

    const existing = await Post.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const post = await Post.create({
      ...req.body,
      slug,
      publishedAt: req.body.status === 'published' ? new Date() : null,
    });

    clearCache('posts');
    return res.status(201).json({ success: true, message: 'Post created successfully', data: post });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    clearCache('posts');
    return res.json({ success: true, message: 'Post updated successfully', data: post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    clearCache('posts');
    return res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 4. SERVICES CRUD
// ==========================================
export const listServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    return res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    clearCache('services');
    return res.status(201).json({ success: true, message: 'Service created', data: service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearCache('services');
    return res.json({ success: true, message: 'Service updated', data: service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    clearCache('services');
    return res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 5. FAQS CRUD
// ==========================================
export const listFaqs = async (req, res, next) => {
  try {
    const { page } = req.query;
    const filter = page ? { page } : {};
    const faqs = await Faq.find(filter).sort({ order: 1 });
    return res.json({ success: true, data: faqs });
  } catch (error) {
    next(error);
  }
};

export const createFaq = async (req, res, next) => {
  try {
    const faq = await Faq.create(req.body);
    clearCache('faqs');
    return res.status(201).json({ success: true, message: 'FAQ created', data: faq });
  } catch (error) {
    next(error);
  }
};

export const updateFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearCache('faqs');
    return res.json({ success: true, message: 'FAQ updated', data: faq });
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (req, res, next) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    clearCache('faqs');
    return res.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 6. TECHNOLOGIES CRUD
// ==========================================
export const listTechnologies = async (req, res, next) => {
  try {
    const technologies = await Technology.find().sort({ order: 1 });
    return res.json({ success: true, data: technologies });
  } catch (error) {
    next(error);
  }
};

export const createTechnology = async (req, res, next) => {
  try {
    const tech = await Technology.create(req.body);
    clearCache('technologies');
    return res.status(201).json({ success: true, message: 'Technology added', data: tech });
  } catch (error) {
    next(error);
  }
};

export const updateTechnology = async (req, res, next) => {
  try {
    const tech = await Technology.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearCache('technologies');
    return res.json({ success: true, message: 'Technology updated', data: tech });
  } catch (error) {
    next(error);
  }
};

export const deleteTechnology = async (req, res, next) => {
  try {
    await Technology.findByIdAndDelete(req.params.id);
    clearCache('technologies');
    return res.json({ success: true, message: 'Technology deleted' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 7. PROCESS STEPS & WHY-US CRUD
// ==========================================
export const listProcessSteps = async (req, res, next) => {
  try {
    const steps = await ProcessStep.find().sort({ order: 1 });
    return res.json({ success: true, data: steps });
  } catch (error) {
    next(error);
  }
};

export const createProcessStep = async (req, res, next) => {
  try {
    const step = await ProcessStep.create(req.body);
    clearCache('process-steps');
    return res.status(201).json({ success: true, message: 'Process step created', data: step });
  } catch (error) {
    next(error);
  }
};

export const updateProcessStep = async (req, res, next) => {
  try {
    const step = await ProcessStep.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearCache('process-steps');
    return res.json({ success: true, message: 'Process step updated', data: step });
  } catch (error) {
    next(error);
  }
};

export const deleteProcessStep = async (req, res, next) => {
  try {
    await ProcessStep.findByIdAndDelete(req.params.id);
    clearCache('process-steps');
    return res.json({ success: true, message: 'Process step deleted' });
  } catch (error) {
    next(error);
  }
};

export const listWhyUs = async (req, res, next) => {
  try {
    const items = await WhyUsItem.find().sort({ order: 1 });
    return res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const createWhyUs = async (req, res, next) => {
  try {
    const item = await WhyUsItem.create(req.body);
    clearCache('why-us');
    return res.status(201).json({ success: true, message: 'Item created', data: item });
  } catch (error) {
    next(error);
  }
};

export const updateWhyUs = async (req, res, next) => {
  try {
    const item = await WhyUsItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearCache('why-us');
    return res.json({ success: true, message: 'Item updated', data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteWhyUs = async (req, res, next) => {
  try {
    await WhyUsItem.findByIdAndDelete(req.params.id);
    clearCache('why-us');
    return res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 8. PAGE CONTENT (KEY-VALUE JSON)
// ==========================================
export const getPageContent = async (req, res, next) => {
  try {
    const { key } = req.params;
    const item = await PageContent.findOne({ key: key.toLowerCase() });
    return res.json({
      success: true,
      data: item ? item.content : null,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePageContent = async (req, res, next) => {
  try {
    const { key } = req.params;
    const content = req.body;
    const item = await PageContent.findOneAndUpdate(
      { key: key.toLowerCase() },
      { key: key.toLowerCase(), content },
      { new: true, upsert: true }
    );
    clearCache(`page-content/${key.toLowerCase()}`);
    return res.json({ success: true, message: 'Page content updated successfully', data: item.content });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 9. SITE SETTINGS (SUPERADMIN ONLY)
// ==========================================
export const getSiteSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSiteSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true });
    }
    clearCache('settings');
    return res.json({ success: true, message: 'Settings saved successfully', data: settings });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 10. QUOTE REQUESTS / CONTACTS
// ==========================================
export const listContacts = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } },
      ];
    }
    if (status && status !== 'all') {
      filter.status = status;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }
    // Mark as read automatically
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }
    return res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { status, internalNotes, isRead } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(internalNotes !== undefined && { internalNotes }),
        ...(isRead !== undefined && { isRead }),
      },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }
    return res.json({ success: true, message: 'Quote request updated', data: contact });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Quote request deleted' });
  } catch (error) {
    next(error);
  }
};

export const exportContactsCSV = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    let csv = 'ID,Name,Email,Phone,Service,Budget,Status,PreferredTime,CreatedAt,Message\n';

    contacts.forEach((c) => {
      const cleanMsg = (c.message || '').replace(/"/g, '""').replace(/\n/g, ' ');
      csv += `"${c._id}","${c.name}","${c.email}","${c.phone || ''}","${c.service}","${c.budget}","${c.status}","${c.preferredDateTime || ''}","${c.createdAt.toISOString()}","${cleanMsg}"\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment(`quote-requests-${new Date().toISOString().slice(0, 10)}.csv`);
    return res.send(csv);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 11. SUBSCRIBERS
// ==========================================
export const listSubscribers = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (search) {
      filter.email = { $regex: search, $options: 'i' };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const total = await Subscriber.countDocuments(filter);
    const subscribers = await Subscriber.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      data: subscribers,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleSubscriber = async (req, res, next) => {
  try {
    const sub = await Subscriber.findById(req.params.id);
    if (!sub) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }
    sub.isActive = !sub.isActive;
    await sub.save();
    return res.json({ success: true, message: `Subscriber ${sub.isActive ? 'activated' : 'deactivated'}`, data: sub });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscriber = async (req, res, next) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Subscriber removed' });
  } catch (error) {
    next(error);
  }
};

export const exportSubscribersCSV = async (req, res, next) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    let csv = 'ID,Email,Active,SubscribedAt\n';

    subs.forEach((s) => {
      csv += `"${s._id}","${s.email}","${s.isActive ? 'Yes' : 'No'}","${s.createdAt.toISOString()}"\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment(`newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
    return res.send(csv);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 12. MEDIA UPLOAD & ASSETS
// ==========================================
export const uploadMediaFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    const media = await Media.create({
      filename: req.file.filename,
      url: fileUrl,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.admin?.email || 'admin',
    });

    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const listMedia = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const total = await Media.countDocuments();
    const media = await Media.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    // Attempt to remove physical file if in local uploads
    const localPath = path.resolve(process.cwd(), process.env.UPLOAD_DIR || 'uploads', media.filename);
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }

    await Media.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Media file deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 13. ADMIN USERS (SUPERADMIN ONLY)
// ==========================================
export const listUsers = async (req, res, next) => {
  try {
    const users = await Admin.find().select('-passwordHash').sort({ createdAt: -1 });
    return res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An admin with this email already exists' });
    }

    const passwordHash = await Admin.hashPassword(password);
    const user = await Admin.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: role || 'editor',
    });

    return res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { role, isActive, name } = req.body;
    const user = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
        ...(name && { name }),
      },
      { new: true }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, message: 'Admin user updated', data: user });
  } catch (error) {
    next(error);
  }
};

export const resetUserPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const user = await Admin.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.passwordHash = await Admin.hashPassword(newPassword);
    await user.save();

    return res.json({ success: true, message: `Password reset successfully for ${user.email}` });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.admin._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own admin account' });
    }

    const user = await Admin.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, message: 'Admin user deleted' });
  } catch (error) {
    next(error);
  }
};

