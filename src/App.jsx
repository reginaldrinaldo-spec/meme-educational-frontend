import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <header className="bg-primary-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">MeMe Educational Platform</h1>
            <p className="text-primary-100 mt-2">Leer, Speel & Groei</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-16 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">© 2025 MeMe Educational Platform - Onderwijs voor de jonge generatie</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
