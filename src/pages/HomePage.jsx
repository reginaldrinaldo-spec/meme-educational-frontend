import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizzes } from '../services/api';

function HomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await getAllQuizzes();
      setQuizzes(data);
      setError(null);
    } catch (err) {
      setError('Kon quizzes niet laden. Probeer het later opnieuw.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
        <button 
          onClick={fetchQuizzes}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Opnieuw proberen
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 mb-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welkom bij MeMe Educational Platform! 🚀
        </h1>
        <p className="text-xl md:text-2xl text-primary-100 mb-6">
          Leer, Speel & Groei - Educatieve quizzes voor jong en oud
        </p>
        <p className="text-lg text-primary-50">
          Ontdek quizzes over Wiskunde & Wetenschap, Taal & Communicatie, en Gezondheid & Sport.
          Perfect voor leeftijden 6 tot 28 jaar!
        </p>
      </section>

      {/* Quiz Categories Info */}
      <section className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-primary-500">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Wiskunde & Wetenschap</h3>
          <p className="text-gray-600">Ontdek de wonderen van getallen en natuurkunde</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-secondary-500">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Taal & Communicatie</h3>
          <p className="text-gray-600">Verbeter je taalvaardigheden en woordenschat</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-accent-500">
          <div className="text-4xl mb-3">⚽</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Gezondheid & Sport</h3>
          <p className="text-gray-600">Leer over een gezonde levensstijl en beweging</p>
        </div>
      </section>

      {/* Available Quizzes */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Beschikbare Quizzes</h2>
        
        {quizzes.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">Geen quizzes beschikbaar op dit moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{quiz.title}</h3>
                  <p className="text-primary-50">{quiz.description}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">
                      🎯 Niveau: <span className="font-semibold capitalize">{quiz.difficulty_level}</span>
                    </span>
                    <span className="text-sm text-gray-600">
                      ✨ {quiz.category}
                    </span>
                  </div>
                  <Link 
                    to={`/quiz/${quiz.id}`}
                    className="block w-full text-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Start Quiz →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
