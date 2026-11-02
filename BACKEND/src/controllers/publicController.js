import { SiteSettings } from '../models/SiteSettings.js';
import { PageContent } from '../models/PageContent.js';
import { Service } from '../models/Service.js';
import { Faq } from '../models/Faq.js';
import { Technology } from '../models/Technology.js';
import { ProcessStep } from '../models/ProcessStep.js';
import { WhyUsItem } from '../models/WhyUsItem.js';
import { Project } from '../models/Project.js';
import { Post } from '../models/Post.js';

export const getSettings = async (req, res, next) => {
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

export const getPageContent = async (req, res, next) => {
  try {
    const { key } = req.params;
    const doc = await PageContent.findOne({ key: key.toLowerCase() });
    return res.json({
      success: true,
      data: doc ? doc.content : null,
    });
  } catch (error) {
    next(error);
  }
};

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    return res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const getFaqs = async (req, res, next) => {
  try {
    const { page } = req.query;
    const filter = { isActive: true };
    if (page) {
      filter.page = page;
    }
    const faqs = await Faq.find(filter).sort({ order: 1 });
    return res.json({ success: true, data: faqs });
  } catch (error) {
    next(error);
  }
};

export const getTechnologies = async (req, res, next) => {
  try {
    const technologies = await Technology.find({ isActive: true }).sort({ order: 1 });
    return res.json({ success: true, data: technologies });
  } catch (error) {
    next(error);
  }
};

export const getProcessSteps = async (req, res, next) => {
  try {
    const steps = await ProcessStep.find().sort({ order: 1 });
    return res.json({ success: true, data: steps });
  } catch (error) {
    next(error);
  }
};

export const getWhyUs = async (req, res, next) => {
  try {
    const items = await WhyUsItem.find().sort({ order: 1 });
    return res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 9, featured } = req.query;
    const filter = { status: 'published' };

    if (category && category !== 'All' && category !== 'All Work') {
      filter.category = category;
    }

    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 9;
    const skip = (pageNum - 1) * limitNum;

    const total = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .sort({ order: 1, sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.json({
      success: true,
      count: projects.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug.toLowerCase(),
      status: 'published',
    });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with slug '${req.params.slug}' not found`,
      });
    }

    const related = await Project.find({
      category: project.category,
      _id: { $ne: project._id },
      status: 'published',
    }).limit(2);

    return res.json({
      success: true,
      data: project,
      related,
    });
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 6, excludeFeatured } = req.query;
    const filter = { status: 'published' };

    if (category && category !== 'All' && category !== 'All Work') {
      filter.category = category;
    }

    if (excludeFeatured === 'true') {
      filter.featured = { $ne: true };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 6;
    const skip = (pageNum - 1) * limitNum;

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .sort({ order: 1, sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.json({
      success: true,
      count: posts.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

export const getFeaturedPost = async (req, res, next) => {
  try {
    let post = await Post.findOne({ featured: true, status: 'published' });
    if (!post) {
      post = await Post.findOne({ status: 'published' }).sort({ createdAt: -1 });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'No featured article available',
      });
    }

    return res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug.toLowerCase(),
      status: 'published',
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post with slug '${req.params.slug}' not found`,
      });
    }

    const related = await Post.find({
      _id: { $ne: post._id },
      status: 'published',
    })
      .sort({ order: 1, sortOrder: 1 })
      .limit(2);

    return res.json({
      success: true,
      data: post,
      related,
    });
  } catch (err) {
    next(err);
  }
};

