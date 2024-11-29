import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  reactions: {
    like: { type: Number, default: 0 },
    helpful: { type: Number, default: 0 },
    insightful: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

export const Comment = mongoose.model('Comment', commentSchema);