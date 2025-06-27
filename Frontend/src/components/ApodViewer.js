import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

const API_BASE_URL = 'https://nasa-backend.onrender.com/api/nasa/apod';

const ApodViewer = () => {
  const [apod, setApod] = useState(null);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  const fetchApod = async (selectedDate) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: { date: selectedDate },
      });
      setApod(response.data);
      setError(null);
    } catch (err) {
      setApod(null);
      setError('Failed to fetch APOD. Try a more recent date.');
    }
  };

  useEffect(() => {
    fetchApod(date);
  }, [date]);

  const handleSaveFavorite = () => {
    const updated = [...favorites, apod];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleRandom = () => {
    const start = new Date(1995, 5, 16);
    const end = new Date();
    const random = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    setDate(dayjs(random).format('YYYY-MM-DD'));
  };

  const handleLast5Days = () => {
    const last5 = [];
    for (let i = 0; i < 5; i++) {
      const d = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
      last5.push(d);
    }
    // Show most recent of last 5
    setDate(last5[0]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-white bg-red-600 rounded-lg px-4 py-2 text-center mb-4">
        NASA Astronomy Picture of the Day
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleRandom}>
          Random
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleLast5Days}>
          Last 5 Days
        </button>
        <button className="bg-white border px-4 py-2 rounded" onClick={() => setDate(favorites[0]?.date)}>
          Favorites
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-center mb-4">{error}</p>
      )}

      {apod && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{apod.title}</h2>
          <img
            src={apod.url}
            alt={apod.title}
            className="rounded shadow-md mx-auto mb-4 max-h-[500px] object-contain"
          />
          <p className="mb-4 text-sm text-gray-700">{apod.explanation}</p>
          <button
            onClick={handleSaveFavorite}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Save to Favorites
          </button>
        </div>
      )}
    </div>
  );
};

export default ApodViewer;
