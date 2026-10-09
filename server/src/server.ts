import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import apiRoutes from './routes/api';

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AlgoVerse API is running' });
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/algoverse';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
