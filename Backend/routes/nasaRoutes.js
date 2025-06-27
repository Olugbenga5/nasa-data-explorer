import express from 'express';
import { getApod } from '../controllers/nasaController.js';

const router = express.Router();
router.get('/apod', getApod);

export default router;
