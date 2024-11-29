import express from 'express';
import { Comment } from '../models/Comment.js';
import { Post } from '../models/Post.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

// Get comments for a post
router.get('/:postId', asyncHandler(async (req, res) => {
  const comments = await Comment.find({
    postId: req.params.postId,
    status: 'approved'
  }).sort({ createdAt: -1 });
  res.json(comments);
}));

// Create comment
router.post('/:postId', asyncHandler(async (req, res) => {
  const { content, anonymous } = req.body;
  const postId = req.params.postId;
  
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  const comment = new Comment({
    postId,
    content,
    anonymous
  });
  
  await comment.save();
  
  // Update post comments count
  post.comments += 1;
  await post.save();
  
  res.status(201).json(comment);
}));

export const commentsRouter = router;