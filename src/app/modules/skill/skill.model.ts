import { model, Schema } from 'mongoose';
import { TSkillData } from './skill.interface';

const skillSchema = new Schema<TSkillData>(
  {
    order: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Skill = model<TSkillData>('skills', skillSchema);
