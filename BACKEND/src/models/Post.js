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
      enum: [
        'Mobile Apps',
        'Websites',
        'Web Development',
        'AI Solutions',
        'AI Integration',
        'UI/UX Design',
        'Graphic Design',
        'Technology',
      ],
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
    tags: {
      type: [String],
      default: [],
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Auto set categoryDisplay if empty
postSchema.pre('save', function (next) {
  if (!this.categoryDisplay && this.category) {
    this.categoryDisplay = this.category.toUpperCase();
  }
  next();
});

export const Post = mongoose.model('Post', postSchema);
