import { model, Schema } from 'mongoose';
import { TExperience } from './experience.interface';

const experienceSchema = new Schema<TExperience>(
  {
    order: { type: Number, required: true },
    company: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String, required: false },
    location: { type: String, required: false },
    technologies: { type: [String], required: false },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Experience = model<TExperience>('experiencies', experienceSchema);
