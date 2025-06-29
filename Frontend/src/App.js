import './App.css';
import React, { Suspense, lazy } from 'react';
import Landing from './components/Landing.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const ApodViewer = lazy(() => import('./components/ApodViewer'));
const NeoDashboard = lazy(() => import('./components/NeoDashboard'));

function App() {
  return (
    <Router>
    <Suspense fallback={<div className="text-center mt-20 text-gray-600">Loading...</div>}></Suspense>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-4">
          <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-start">
            <Link to="/" className="text-blue-600 hover:underline text-sm sm:text-base">Home</Link>
            <Link to="/apod" className="text-blue-600 hover:underline text-sm sm:text-base">APOD Viewer</Link>
            <Link to="/neo" className="text-blue-600 hover:underline text-sm sm:text-base">Asteroid Tracker</Link>
          </nav>
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/apod" element={<ApodViewer />} />
            <Route path="/neo" element={<NeoDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

