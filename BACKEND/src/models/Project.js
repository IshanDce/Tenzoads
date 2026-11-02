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
      enum: [
        'Mobile Apps',
        'Mobile App',
        'Websites',
        'Website',
        'AI Solutions',
        'UI/UX Design',
        'Graphic Design',
      ],
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
      default: '',
    },
    shortDescription: {
      type: String,
      default: '',
    },
    fullDescription: {
      type: String,
      default: '',
    },
    thumbnail: {
      type: String,
      default: '',
    },
    mockupStyle: {
      type: String,
      enum: ['phone', 'browser', 'dashboard', 'brand', 'chat'],
      default: 'browser',
    },
    mockupType: {
      // Legacy compatibility
      type: String,
      enum: ['phone', 'browser', 'dashboard', 'brand', 'chat'],
      default: 'browser',
    },
    bgColor: {
      type: String,
      enum: ['cream', 'amber', 'black'],
      default: 'cream',
    },
    tags: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      default: '',
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
    order: {
      type: Number,
      default: 0,
    },
    sortOrder: {
      // Legacy compatibility
      type: Number,
      default: 0,
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
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to synchronize aliases
projectSchema.pre('save', function (next) {
  if (this.mockupStyle && !this.mockupType) {
    this.mockupType = this.mockupStyle;
  } else if (this.mockupType && !this.mockupStyle) {
    this.mockupStyle = this.mockupType;
  }

  if (this.shortDescription && !this.description) {
    this.description = this.shortDescription;
  } else if (this.description && !this.shortDescription) {
    this.shortDescription = this.description;
  }

  if (this.order !== undefined && this.sortOrder === undefined) {
    this.sortOrder = this.order;
  } else if (this.sortOrder !== undefined && this.order === undefined) {
    this.order = this.sortOrder;
  }

  next();
});

export const Project = mongoose.model('Project', projectSchema);
