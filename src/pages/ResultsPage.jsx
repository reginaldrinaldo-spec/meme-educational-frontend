import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LevelProgressBar from '../components/LevelProgressBar';
import BadgeShowcase from '../components/BadgeShowcase';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userAnswers, questions, gamificationData } = location.state || { userAnswers: {}, questions: [], gamificationData: null };
  
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[question.id] === question.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Trigger confetti for high scores
  useEffect(() => {
    if (percentage >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [percentage]);

  // Get feedback based on score
  const getFeedback = () => {
    if (percentage >= 90) return { text: 'Uitmuntend! 🎉', color: 'text-green-600', emoji: '🏆', message: 'Je bent een absolute MEESTER!' };
    if (percentage >= 75) return { text: 'Geweldig! 👏', color: 'text-blue-600', emoji: '⭐', message: 'Fantastische prestatie!' };
    if (percentage >= 60) return { text: 'Goed gedaan! 😊', color: 'text-yellow-600', emoji: '💪', message: 'Blijf zo doorgaan!' };
    return { text: 'Blijf oefenen! 💪', color: 'text-orange-600', emoji: '🎯', message: 'Elke quiz maakt je sterker!' };
  };

  const feedback = getFeedback();

  // Extract gamification data
  const xpGained = gamificationData?.xp_gained || 0;
  const newLevel = gamificationData?.new_level || 1;
  const leveledUp = gamificationData?.leveled_up || false;
  const earnedBadges = gamificationData?.earned_badges || [];
  const currentStreak = gamificationData?.streak?.current_streak || 0;
  const longestStreak = gamificationData?.streak?.longest_streak || 0;
  const categoryProgress = gamificationData?.category_progress || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-animation">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'][Math.floor(Math.random() * 5)]
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Main Results Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 transform hover:scale-105 transition-transform duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-bounce">{feedback.emoji}</div>
            <h1 className={`text-4xl font-bold ${feedback.color} mb-2`}>{feedback.text}</h1>
            <p className="text-xl text-gray-600">{feedback.message}</p>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 mb-6">
            <div className="text-center">
              <p className="text-gray-700 text-lg mb-2">Je score</p>
              <p className="text-6xl font-bold text-purple-600 mb-2">
                {score}/{totalQuestions}
              </p>
              <p className="text-4xl font-bold text-blue-600">{percentage}%</p>
            </div>
          </div>

          {/* Gamification Stats Grid */}
          {gamificationData && (
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* XP Gained */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 text-center border-2 border-yellow-200 transform hover:scale-110 transition-transform">
                <div className="text-4xl mb-2">⚡</div>
                <p className="text-3xl font-bold text-orange-600">+{xpGained}</p>
                <p className="text-gray-600 text-sm">XP Gained</p>
              </div>

              {/* Current Level */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border-2 border-purple-200 transform hover:scale-110 transition-transform">
                <div className="text-4xl mb-2">🎮</div>
                <p className="text-3xl font-bold text-purple-600">Level {newLevel}</p>
                <p className="text-gray-600 text-sm">{leveledUp ? '🎉 LEVEL UP!' : 'Current Level'}</p>
              </div>

              {/* Streak */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 text-center border-2 border-red-200 transform hover:scale-110 transition-transform">
                <div className="text-4xl mb-2">🔥</div>
                <p className="text-3xl font-bold text-red-600">{currentStreak} Days</p>
                <p className="text-gray-600 text-sm">Current Streak</p>
                {longestStreak > currentStreak && (
                  <p className="text-xs text-gray-500 mt-1">Longest: {longestStreak} days</p>
                )}
              </div>
            </div>
          )}

          {/* Level Progress Bar */}
          {gamificationData && (
            <div className="mb-6">
              <LevelProgressBar 
                currentXP={gamificationData.total_xp || 0}
                currentLevel={newLevel}
              />
            </div>
          )}

          {/* Earned Badges Showcase */}
          {earnedBadges.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-center mb-4 text-purple-600">
                🏆 Nieuwe Badges Verdiend! 🏆
              </h2>
              <BadgeShowcase badges={earnedBadges} isNew={true} />
            </div>
          )}

          {/* Category Mastery */}
          {categoryProgress && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center">
                <span className="mr-2">📊</span> Category Mastery
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold">{categoryProgress.category}</span>
                    <span className="text-blue-600">{categoryProgress.mastery_level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${(categoryProgress.quizzes_completed / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {categoryProgress.quizzes_completed}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🏠 Terug naar Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🔄 Nog een keer!
            </button>
          </div>
        </div>

        {/* Motivation Message */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <p className="text-gray-700 text-lg">
            💪 <strong>Blijf leren!</strong> Elke quiz brengt je dichter bij meesterschap!
          </p>
          {currentStreak > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              🔥 Je hebt een {currentStreak}-daagse streak! Kom morgen terug om hem te behouden!
            </p>
          )}
        </div>
      </div>

      {/* Confetti CSS */}
      <style jsx>{`
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          opacity: 0.8;
          animation: confetti-fall 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default ResultsPage;
