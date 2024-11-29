import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // Check for token in cookies or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the admin by the ID in the token
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the admin to the request object
    req.admin = admin;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
