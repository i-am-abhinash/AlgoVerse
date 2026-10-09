import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  level: number;
  xp: number;
  unlockedLessonIds: string[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  unlockedLessonIds: { type: [String], default: ['linear-search'] },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
