const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { connectDatabase } = require('./config/database.js');
const { postsRouter } = require('./routes/posts.js');
const { commentsRouter } = require('./routes/comments.js');
const { adminRouter } = require('./routes/admin.js');
const { uploadRouter } = require('./routes/upload.js');
const { errorHandler } = require('./middleware/errorHandler.js');

dotenv.config();

const app = express();    
const PORT = process.env.PORT || 5000;
app.set('trust proxy', 1);
// Connect to MongoDB
connectDatabase();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'https://kddcommuni.vercel.app/',
  credentials: true
}));
app.use(helmet());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/upload', uploadRouter);

// Error handling
app.use(errorHandler);

// Export the app to work with Vercel serverless functions
export default app;
