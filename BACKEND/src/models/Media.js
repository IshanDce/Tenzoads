import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 0,
    },
    uploadedBy: {
      type: String,
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
);

export const Media = mongoose.model('Media', mediaSchema);

