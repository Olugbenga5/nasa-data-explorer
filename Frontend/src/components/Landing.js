import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-indigo-700"> Welcome to the NASA Explorer</h1>
      <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-xl">
        Explore the universe with real NASA data! View stunning Astronomy Pictures of the Day and track near-Earth asteroids with interactive charts.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/apod"
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition text-sm sm:text-base"
        >
          APOD Viewer
        </Link>
        <Link
          to="/neo"
          className="px-6 py-3 bg-indigo-100 text-indigo-700 border border-indigo-400 rounded-2xl hover:bg-indigo-200 transition text-sm sm:text-base"
        >
          Asteroid Tracker
        </Link>
      </div>
    </div>
  );
};

export default Landing;
