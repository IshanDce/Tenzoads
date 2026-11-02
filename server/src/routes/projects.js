import express from 'express';
import { Project } from '../models/Project.js';

const router = express.Router();

// GET all projects with optional filtering & pagination
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 9, featured } = req.query;
    const filter = {};

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
      .sort({ sortOrder: 1, createdAt: -1 })
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
});

// GET single project by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug.toLowerCase() });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with slug '${req.params.slug}' not found`,
      });
    }

    // Also fetch 2 related projects
    const related = await Project.find({
      category: project.category,
      _id: { $ne: project._id },
    }).limit(2);

    return res.json({
      success: true,
      data: project,
      related,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
