// load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: './env/.env' });

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

const app = express();

// ===== Middleware =====
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// ===== MongoDB Connection (Mongoose) =====
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MONGO_URI environment variable is required');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

// ===== Routes =====
app.get('/', (req, res) => {
  res.send('qtec-job-server is running');
});

app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// ===== Global Error Handler (Production Ready) =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

// ===== Start Server =====
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});