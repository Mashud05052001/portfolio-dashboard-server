import { model, Schema } from 'mongoose';
import { TBlog } from './blogs.interface';

const blogSchema = new Schema<TBlog>(
  {
    order: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    overview: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<TBlog>('blogs', blogSchema);
