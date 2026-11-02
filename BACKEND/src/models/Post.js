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
      default: '',
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: '',
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
      default: 'Nov 2026',
    },
    readTime: {
      type: String,
      default: '6 min read',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre('save', function (next) {
  if (this.order !== undefined && this.sortOrder === undefined) {
    this.sortOrder = this.order;
  } else if (this.sortOrder !== undefined && this.order === undefined) {
    this.order = this.sortOrder;
  }
  next();
});

export const Post = mongoose.model('Post', postSchema);
