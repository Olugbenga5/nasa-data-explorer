  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line,
  } from 'recharts';

  const NeoDashboard = () => {
    const [neoData, setNeoData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
      const fetchNeoData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_NEO_API_BASE_URL}/neo-feed`
          );
          const raw = response.data.near_earth_objects;

          const formattedData = Object.keys(raw).map((date) => {
            const neos = raw[date];
            const count = neos.length;
            const avgDiameter =
              neos.reduce((sum, neo) => {
                const est = neo.estimated_diameter.kilometers;
                return sum + (est.estimated_diameter_min + est.estimated_diameter_max) / 2;
              }, 0) / count;

            return {
              date,
              count,
              avgDiameter: parseFloat(avgDiameter.toFixed(5)),
            };
          });

          formattedData.sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );

          setNeoData(formattedData);
        } catch (err) {
          console.error('Error fetching NEO data:', err);
          setError('Failed to load asteroid data. Try again later.');
        }
      };

      fetchNeoData();
    }, []);

    return (
      <div className="px-8 py-6">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-2">
          Near-Earth Objects (Past 7 Days)
        </h2>
        <p className="text-center text-gray-600 mb-6">
          A breakdown of daily near-Earth asteroid observations detected by NASA.
        </p>

        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

        {!error && (
          <>
            <h3 className="text-lg font-semibold text-center text-blue-700 mt-8 mb-4">
              Asteroid Count Per Day
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={neoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>

            <h3 className="text-lg font-semibold text-center text-blue-700 mt-10 mb-4">
              Avg Asteroid Diameter (km)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={neoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgDiameter" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    );
  };

  export default NeoDashboard;
