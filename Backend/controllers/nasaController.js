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

    // Send request to NASA APOD API
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params,
    });

    // Return the response data to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch APOD data from NASA',
      error: error.message,
    });
  }
};
