import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['Admin'], default: 'Admin' },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('users', userSchema);
