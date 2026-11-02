import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Mobile Apps', 'Websites', 'AI Solutions', 'UI/UX Design', 'Graphic Design'],
    },
    categoryDisplay: {
      type: String,
      default: '', // e.g. "WEB DEVELOPMENT", "AI INTEGRATION", etc.
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      default: '6 min read',
    },
    author: {
      type: String,
      default: 'TenzoAds Engineering',
    },
    authorRole: {
      type: String,
      default: 'Senior Technical Architect',
    },
    date: {
      type: String,
      default: 'Oct 2026',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model('Post', postSchema);
