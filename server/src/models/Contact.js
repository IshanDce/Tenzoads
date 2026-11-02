import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
      required: true,
      enum: [
        'Mobile App Development',
        'Website Development',
        'CMS & No-Code',
        'AI Integration',
        'UI/UX Design',
        'Graphic Design',
      ],
    },
    budget: {
      type: String,
      required: true,
      enum: [
        'Under $2,000',
        '$2,000-$5,000',
        '$5,000-$10,000',
        '$10,000-$25,000',
        '$25,000+',
        'Not sure yet',
      ],
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    preferredDateTime: {
      type: String,
      trim: true,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.model('Contact', contactSchema);

