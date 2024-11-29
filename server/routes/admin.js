import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Post } from '../models/Post.js';
import { Admin } from '../models/Admin.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register new admin
router.post('/auth/register', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  
  const admin = new Admin({
    email,
    password,
    role: 'moderator'
  });
  
  await admin.save();
  
  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.status(201).json({
    token,
    user: {
      id: admin._id,
      email: admin.email,
      role: admin.role
    }
  });
}));

// Login
router.post('/auth/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  // Update last login
  admin.lastLogin = new Date();
  await admin.save();
  
  res.json({
    token,
    user: {
      id: admin._id,
      email: admin.email,
      role: admin.role
    }
  });
}));

// Protected routes
router.use(authMiddleware);

// Get admin dashboard stats
router.get('/stats', asyncHandler(async (req, res) => {
  const totalPosts = await Post.countDocuments();
  const activeReports = await Post.countDocuments({ reports: { $gt: 0 } });
  
  const posts = await Post.find();
  const totalEngagement = posts.reduce((sum, post) => sum + post.likes + post.comments, 0);
  const engagement = totalPosts ? Math.round((totalEngagement / totalPosts) * 100) : 0;
  
  res.json({
    totalPosts,
    activeReports,
    engagement,
    responseTime: 24,
    postsChange: 12,
    reportsChange: -5,
    engagementChange: 8,
    responseTimeChange: -15
  });
}));

// Get recent posts
router.get('/posts/recent', asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(5);
  res.json(posts);
}));

// Get reported content
router.get('/reports', asyncHandler(async (req, res) => {
  const reportedPosts = await Post.find({ reports: { $gt: 0 } })
    .sort({ reports: -1 })
    .limit(10);
  res.json(reportedPosts);
}));

// Approve report
router.post('/reports/:id/approve', asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  post.status = 'removed';
  await post.save();
  res.json(post);
}));

// Reject report
router.post('/reports/:id/reject', asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  post.reports = 0;
  await post.save();
  res.json(post);
}));

export const adminRouter = router;