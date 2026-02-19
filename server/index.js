import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from "./routes/userRoute.js";
import cors from 'cors';

const app = express();

// Load environment variables FIRST
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow all origins for development
    // For production, specify allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:8700',
      'http://localhost:5000',
      'https://newschoolapi.mniagrohubinfo.com',
      'https://nextpages.mniagrohubinfo.com'  // ← Your frontend domain
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
};
// Use CORS with options
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route to check CORS
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    cors: 'Enabled'
  });
});

// Your routes
app.use('/api', route);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      error: 'CORS Error', 
      message: 'Origin not allowed',
      allowedOrigins: [
        'http://localhost:3000',
        'http://localhost:8700'
      ]
    });
  }
  
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// MongoDB connection and server start
mongoose.connect(MONGOURL)
  .then(() => {
    console.log("✅ Connected to MongoDB database");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
      console.log(`🌐 CORS enabled for multiple origins`);
      console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

export default app;