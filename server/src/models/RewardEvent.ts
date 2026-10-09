import mongoose, { Document, Schema } from 'mongoose';

export interface IRewardEvent extends Document {
  userId: mongoose.Types.ObjectId;
  eventType: string; // e.g., 'LESSON_COMPLETE', 'CHALLENGE_COMPLETE'
  sourceId: string;  // e.g., 'linear-search'
  xpAwarded: number;
}

const rewardEventSchema = new Schema<IRewardEvent>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventType: { type: String, required: true },
  sourceId: { type: String, required: true },
  xpAwarded: { type: Number, required: true },
}, { timestamps: true });

// Ensure idempotency: a user can only be rewarded once for a specific source event
rewardEventSchema.index({ userId: 1, eventType: 1, sourceId: 1 }, { unique: true });

export default mongoose.model<IRewardEvent>('RewardEvent', rewardEventSchema);
