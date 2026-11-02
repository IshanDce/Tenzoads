import mongoose from 'mongoose';

const processStepSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      default: '1',
    },
    icon: {
      type: String,
      default: 'CheckCircle2',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const ProcessStep = mongoose.model('ProcessStep', processStepSchema);

