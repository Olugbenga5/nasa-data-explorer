import React, { useEffect, useState } from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,} from 'recharts';

const NeoDashboard = () => {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeoData = async () => {
      try {
        const response = await fetch('/api/neo-feed');
        const data = await response.json();

        const formatted = Object.entries(data.near_earth_objects).map(
          ([date, asteroids]) => {
            const count = asteroids.length;
            const avgDiameter =
              asteroids.reduce((sum, neo) => {
                const est = neo.estimated_diameter.kilometers;
                const avg = (est.estimated_diameter_min + est.estimated_diameter_max) / 2;
                return sum + avg;
              }, 0) / count;

            return {
              date,
              count,
              avgDiameter: Number(avgDiameter.toFixed(3)),
            };
          }
        );

        setNeoData(formatted);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NEO data:', error);
        setLoading(false);
      }
    };

    fetchNeoData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-gray-600 text-lg">Loading asteroid data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-4 text-center">
         Near-Earth Objects (Past 7 Days)
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 text-center">
        A breakdown of daily near-Earth asteroid observations detected by NASA.
      </p>

      <div className="mb-12">
        <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-2 text-center">
          Asteroid Count Per Day
        </h3>
        <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 200 : 300}>
          <BarChart data={neoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-2 text-center">
           Avg Asteroid Diameter (km)
        </h3>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Based on the average of min and max estimated diameters.
        </p>
        <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 200 : 300}>
          <BarChart data={neoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgDiameter" fill="#34d399" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NeoDashboard;
