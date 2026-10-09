import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  lessonId: string;
  status: 'started' | 'completed';
  attempts: number;
  completedAt?: Date;
}

const progressSchema = new Schema<IProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: String, required: true },
  status: { type: String, enum: ['started', 'completed'], default: 'started' },
  attempts: { type: Number, default: 0 },
  completedAt: { type: Date },
}, { timestamps: true });

progressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

export default mongoose.model<IProgress>('Progress', progressSchema);
