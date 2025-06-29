import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nasaRoutes from './routes/nasaRoutes.js';
import { router as neoRoutes } from './routes/neoRoutes.js';




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/nasa', nasaRoutes);
app.use('/api',neoRoutes);

app.get('/', (req, res) => {
  res.send('NASA API Server is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
