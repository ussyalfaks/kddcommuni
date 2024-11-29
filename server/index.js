import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import { postsRouter } from './routes/posts.js';
import { commentsRouter } from './routes/comments.js';
import { adminRouter } from './routes/admin.js';
import { uploadRouter } from './routes/upload.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();    
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => {
  res.send('App is running');
});
// Connect to MongoDB
connectDatabase();

// Middleware


app.use(cors({
  origin: [
    'https://kddcommuni.vercel.app',
    'https://kddcommuni-git-main-ussyalfaks-projects.vercel.app/',
    'https://kddcommuni-10edshh3v-ussyalfaks-projects.vercel.app/',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
}));

app.options('*', cors());

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

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
