import { model, Schema } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema<TProject>(
  {
    order: { type: Number, required: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tech: { type: [String], required: true },
    live: { type: String, required: true },
    githubClient: { type: String, required: true },
    githubServer: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Project = model<TProject>('projects', projectSchema);
