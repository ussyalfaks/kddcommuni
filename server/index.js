const express = 'express';
const cors = 'cors';
const helmet = 'helmet';
const rateLimit = 'express-rate-limit';
const dotenv = 'dotenv';
const { connectDatabase } = './config/database.js';
const { postsRouter } = './routes/posts.js';
const { commentsRouter } = './routes/comments.js';
const { adminRouter } = './routes/admin.js';
const { uploadRouter } = './routes/upload.js';
const { errorHandler } = './middleware/errorHandler.js';

dotenv.config();

const app = express();    
const PORT = process.env.PORT || 10000;
// Connect to MongoDB
connectDatabase();

// Middleware


app.use(cors({
  origin: [
    'https://mood-tracker-3m3icapmr-ussyalfaks-projects.vercel.app',
    'https://mood-tracker-jtu6xapf9-ussyalfaks-projects.vercel.app',
    'https://mood-tracker-eta-two.vercel.app',
    'https://mood-tracker-git-main-ussyalfaks-projects.vercel.app',
    'https://mood-tracker-11zeigmtq-ussyalfaks-projects.vercel.app'

  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
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

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
