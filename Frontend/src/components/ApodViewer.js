import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const ApodViewer = () => {
  const [apods, setApods] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('apodFavorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('date');
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fetchApod = async (date) => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = `${BASE_URL}/api/nasa/apod?date=${date}`;
      const response = await axios.get(endpoint);
      setApods([response.data]);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch APOD data');
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomApod = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/api/nasa/apod?count=1`);
      setApods([response.data[0]]);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch a random APOD');
    } finally {
      setLoading(false);
    }
  };

  const fetchApodHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const end = dayjs().isAfter(dayjs(selectedDate)) ? dayjs(selectedDate) : dayjs();
      const start = end.subtract(4, 'day');
      const url = `${BASE_URL}/api/nasa/apod?start_date=${start.format('YYYY-MM-DD')}&end_date=${end.format('YYYY-MM-DD')}`;
      const response = await axios.get(url);

      if (!Array.isArray(response.data)) throw new Error("Unexpected data format");
      setApods(response.data.reverse());
    } catch (err) {
      console.error('APOD history fetch error:', err);
      setError('Failed to fetch APOD history. Try a more recent date.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === 'date') fetchApod(selectedDate);
    else if (mode === 'random') fetchRandomApod();
    else if (mode === 'history') fetchApodHistory();
  }, [mode, selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setMode('date');
  };

  const handleAddToFavorites = (apod) => {
    const exists = favorites.find((fav) => fav.date === apod.date);
    if (exists) {
      setFeedbackMsg('Already in Favorites!');
    } else {
      const updated = [...favorites, apod];
      setFavorites(updated);
      localStorage.setItem('apodFavorites', JSON.stringify(updated));
      setFeedbackMsg('Added to Favorites!');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setFeedbackMsg(''), 2500);
  };

  const handleRemoveFromFavorites = (apod) => {
    const updated = favorites.filter((fav) => fav.date !== apod.date);
    setFavorites(updated);
    localStorage.setItem('apodFavorites', JSON.stringify(updated));
    setFeedbackMsg('Removed from Favorites');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setFeedbackMsg(''), 2500);
  };

  const apodList = mode === 'favorites' ? favorites : apods;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full bg-red-600 text-white py-6 px-8 shadow-md mb-6">
        <div className="w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            NASA Astronomy Picture of the Day
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="px-4 py-2 rounded-md text-sm text-gray-800 bg-white border border-gray-300"
            />
            <button onClick={() => setMode('random')} className={`px-5 py-2 rounded-md ${mode === 'random' ? 'bg-purple-600 text-white' : 'bg-white text-black'}`}>Random</button>
            <button onClick={() => setMode('history')} className={`px-5 py-2 rounded-md ${mode === 'history' ? 'bg-green-600 text-white' : 'bg-white text-black'}`}>Last 5 Days</button>
            <button onClick={() => setMode('favorites')} className={`px-5 py-2 rounded-md ${mode === 'favorites' ? 'bg-yellow-500 text-white' : 'bg-white text-black'}`}>Favorites</button>
          </div>
        </div>
      </div>

      {feedbackMsg && <div className="text-center mb-6"><span>{feedbackMsg}</span></div>}
      {loading && <div className="text-center my-6">Loading...</div>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="max-w-screen-xl mx-auto px-4 pb-12">
        {!loading && apodList.map((apod, index) => (
          <div key={apod.date || index} className="mb-12">
            <div className="text-center mb-6 px-4">
              <h2 className="text-3xl font-bold mb-4">{apod.title}</h2>
              {apod.media_type === 'image' ? (
                <img src={apod.url} alt={apod.title} className="mx-auto w-full max-w-4xl rounded-lg" />
              ) : (
                <iframe title="NASA Video" src={apod.url} allowFullScreen className="mx-auto w-full max-w-4xl h-96 rounded-lg" />
              )}
            </div>
            <div className="max-w-4xl mx-auto px-4">
              <p>{apod.explanation}</p>
              <p className="mt-4 text-sm text-gray-600">{apod.date}</p>
              {mode === 'favorites' ? (
                <button onClick={() => handleRemoveFromFavorites(apod)} className="mt-4 bg-gray-300 text-black py-2 px-4 rounded">Remove from Favorites</button>
              ) : (
                <button onClick={() => handleAddToFavorites(apod)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Save to Favorites</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApodViewer;
