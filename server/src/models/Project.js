import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
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
    categoryTag: {
      type: String,
      default: '',
    },
    techTag: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      default: '',
    },
    challenge: {
      type: String,
      default: '',
    },
    solution: {
      type: String,
      default: '',
    },
    results: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    mockupType: {
      type: String,
      enum: ['phone', 'browser', 'dashboard', 'brand', 'chat'],
      default: 'browser',
    },
    featured: {
      type: Boolean,
      default: false,
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

export const Project = mongoose.model('Project', projectSchema);

