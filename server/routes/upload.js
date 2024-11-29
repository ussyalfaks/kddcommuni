import express from 'express';
import { upload } from '../utils/upload.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all upload routes
router.use(authMiddleware);

// Single file upload
router.post('/single', upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    url: req.file.path,
    publicId: req.file.filename
  });
}));

// Multiple files upload (max 5)
router.post('/multiple', upload.array('files', 5), asyncHandler(async (req, res) => {
  if (!req.files?.length) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const files = req.files.map(file => ({
    url: file.path,
    publicId: file.filename
  }));

  res.json({ files });
}));

export const uploadRouter = router;