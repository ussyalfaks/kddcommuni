import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(1000),
  location: z.string().min(3).max(50),
  anonymous: z.boolean().optional(),
  imageUrl: z.string().url().optional()
});

const commentSchema = z.object({
  content: z.string().min(1).max(500),
  anonymous: z.boolean().optional()
});

export const validatePost = (req, res, next) => {
  try {
    postSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: 'Validation Error',
      errors: error.errors
    });
  }
};

export const validateComment = (req, res, next) => {
  try {
    commentSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: 'Validation Error',
      errors: error.errors
    });
  }
};