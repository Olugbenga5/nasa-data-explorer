import axios from 'axios';

export const getApod = async (req, res) => {
  try {
    const { date, count, start_date, end_date } = req.query;
    const params = {
      api_key: process.env.NASA_API_KEY,
    };

    if (date) params.date = date;
    if (count) params.count = count;
    if (start_date) params.start_date = start_date;
    if (end_date) params.end_date = end_date;

    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('NASA API ERROR:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: 'Failed to fetch APOD data from NASA',
      error: error.response?.data || error.message,
    });
  }
};

export const getNeoFeed = async (req, res) => {
  try {
    const apiKey = process.env.NASA_API_KEY;

    const today = new Date();
    const endDate = today.toISOString().split('T')[0];
    const startDate = new Date(today.setDate(today.getDate() - 6))
      .toISOString()
      .split('T')[0];

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('NASA NEO API ERROR:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: 'Failed to fetch NEO data from NASA',
      error: error.response?.data || error.message,
    });
  }
};
