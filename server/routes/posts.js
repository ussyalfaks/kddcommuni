import express from 'express';
import { Post } from '../models/Post.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validatePost } from '../middleware/validation.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Get all posts with pagination
router.get('/', asyncHandler(async (req, res) => {
  const { location, search, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  
  let query = { status: 'active' };
  
  if (location) {
    query.location = location;
  }
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  const [posts, total] = await Promise.all([
    Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Post.countDocuments(query)
  ]);

  res.json({
    posts,
    total,
    pages: Math.ceil(total / limit),
    currentPage: parseInt(page)
  });
}));

// Create post
router.post('/', 
  upload.single('image'),
  validatePost,
  asyncHandler(async (req, res) => {
    const { title, description, location, anonymous } = req.body;
    const imageUrl = req.file?.path;
    
    const post = new Post({
      title,
      description,
      location,
      imageUrl,
      anonymous: Boolean(anonymous)
    });
    
    await post.save();
    res.status(201).json(post);
  })
);

// Like post
router.post('/:id/like', asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  post.likes += 1;
  await post.save();
  res.json(post);
}));

// Report post
router.post('/:id/report', asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  post.reports += 1;
  if (post.reports >= 5) {
    post.status = 'archived';
  }
  await post.save();
  res.json(post);
}));

export const postsRouter = router;