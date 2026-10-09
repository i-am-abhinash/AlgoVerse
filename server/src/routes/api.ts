import { Router } from 'express';
import User from '../models/User';
import Progress from '../models/Progress';
import RewardEvent from '../models/RewardEvent';

const router = Router();

// Mock Auth: Get or Create Dev User
router.get('/auth/me', async (req, res) => {
  try {
    let user = await User.findOne({ email: 'dev@algoverse.com' });
    if (!user) {
      user = new User({
        username: 'Hero',
        email: 'dev@algoverse.com',
      });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit Challenge & Award XP
router.post('/challenges/:id/submit', async (req, res) => {
  const { id } = req.params;
  const { userId, answer } = req.body;

  try {
    // Basic validation for "linear-search" challenge
    // E.g., The target 9 is at index 4 in [4, 2, 8, 1, 9, 3]
    let isCorrect = false;
    
    if (id === 'linear-search') {
      // Expect answer to be index 4
      if (answer === 4 || answer === '4') {
        isCorrect = true;
      }
    }

    if (!isCorrect) {
      return res.json({ success: false, message: 'Incorrect answer. Keep trying!' });
    }

    // It's correct, award XP if not already awarded
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let xpAwarded = 0;
    
    try {
      // Attempt to create a reward event
      await RewardEvent.create({
        userId: user._id,
        eventType: 'CHALLENGE_COMPLETE',
        sourceId: id,
        xpAwarded: 50
      });
      
      // Update user XP
      user.xp += 50;
      
      // Level up logic: every 100 xp = 1 level (simple mock)
      user.level = Math.floor(user.xp / 100) + 1;
      
      // Mark progress
      await Progress.findOneAndUpdate(
        { userId: user._id, lessonId: id },
        { status: 'completed', completedAt: new Date(), $inc: { attempts: 1 } },
        { upsert: true }
      );
      
      await user.save();
      xpAwarded = 50;
    } catch (e: any) {
      // E11000 duplicate key error means already rewarded
      if (e.code !== 11000) throw e;
    }

    res.json({ success: true, xpAwarded, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// AI Mentor Mock Chat
router.post('/mentor/chat', (req, res) => {
  const { messages, context } = req.body;
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  
  // Very simple mock logic for linear search
  let reply = "I'm here to help! Could you be more specific?";
  
  if (lastMessage.includes('hint')) {
    reply = "Hint: Linear search starts from the beginning (index 0) and checks each element one by one until it finds the target.";
  } else if (lastMessage.includes('explain') || lastMessage.includes('linear search')) {
    reply = "Linear search is an algorithm that steps through an array sequentially. It checks each element to see if it matches the target. It's simple but can take O(n) time, meaning it's slow for very large arrays!";
  } else if (lastMessage.includes('time complexity')) {
    reply = "The worst-case time complexity of linear search is O(n), where n is the number of elements in the array. This happens when the element is at the very end or not in the array at all.";
  }
  
  // Simulate AI delay
  setTimeout(() => {
    res.json({ reply });
  }, 1000);
});

export default router;
