import { model, Schema } from 'mongoose';
import { TEducation } from './education.interface';

const educationSchema = new Schema<TEducation>(
  {
    order: { type: Number, required: true },
    course: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String, required: false },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Education = model<TEducation>('educations', educationSchema);
