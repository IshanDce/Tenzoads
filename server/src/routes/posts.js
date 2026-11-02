import express from 'express';
import { Post } from '../models/Post.js';

const router = express.Router();

// GET featured post
router.get('/featured', async (req, res, next) => {
  try {
    let post = await Post.findOne({ featured: true });
    if (!post) {
      post = await Post.findOne().sort({ createdAt: -1 });
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
});

// GET all posts with optional filtering & pagination
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 6, excludeFeatured } = req.query;
    const filter = {};

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
      .sort({ sortOrder: 1, createdAt: -1 })
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
});

// GET post by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug.toLowerCase() });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post with slug '${req.params.slug}' not found`,
      });
    }

    // Get 2 related posts
    const related = await Post.find({
      _id: { $ne: post._id },
    })
      .sort({ sortOrder: 1 })
      .limit(2);

    return res.json({
      success: true,
      data: post,
      related,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
