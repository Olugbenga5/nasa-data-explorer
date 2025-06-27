import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/neo-feed', async (req, res) => {
  try {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);

    const start = startDate.toISOString().split('T')[0];
    const end = today.toISOString().split('T')[0];

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${process.env.NASA_API_KEY}`;
    const { data } = await axios.get(url);

    res.json(data);
  } catch (error) {
    console.error('Error fetching NEO data:', error.message);
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});

export default router;
