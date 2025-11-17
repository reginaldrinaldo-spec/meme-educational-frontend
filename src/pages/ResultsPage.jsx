import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userAnswers, questions } = location.state || { userAnswers: {}, questions: [] };

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

  // Get feedback based on score
  const getFeedback = () => {
    if (percentage >= 90) return { text: 'Uitstekend! 🎉', color: 'text-green-600', emoji: '🌟' };
    if (percentage >= 70) return { text: 'Goed gedaan! 👍', color: 'text-blue-600', emoji: '🎯' };
    if (percentage >= 50) return { text: 'Niet slecht! 💪', color: 'text-yellow-600', emoji: '📚' };
    return { text: 'Blijf oefenen! 🎓', color: 'text-red-600', emoji: '💡' };
  };

  const feedback = getFeedback();

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Geen resultaten beschikbaar</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Terug naar Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{feedback.emoji}</div>
          <h1 className={`text-4xl font-bold mb-2 ${feedback.color}`}>{feedback.text}</h1>
          <p className="text-gray-600">Je hebt {score} van de {totalQuestions} vragen goed!</p>
        </div>

        {/* Score Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className={percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}
                strokeWidth="10"
                strokeDasharray={`${percentage * 2.51} 251`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">{percentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Quiz Overzicht</h2>
        <div className="space-y-3">
          {questions.map((question, index) => {
            const isCorrect = userAnswers[question.id] === question.correct_answer;
            const userAnswer = userAnswers[question.id];
            
            return (
              <div
                key={question.id}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start">
                  <span className={`text-2xl mr-3 ${
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-2">
                      {index + 1}. {question.question_text}
                    </p>
                    <div className="text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Jouw antwoord:</span>{' '}
                        <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                          {question[`option_${userAnswer?.toLowerCase()}`] || 'Niet beantwoord'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-gray-600 mt-1">
                          <span className="font-medium">Correct antwoord:</span>{' '}
                          <span className="text-green-700">
                            {question[`option_${question.correct_answer.toLowerCase()}`]}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6 mb-8">
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
        >
          🏠 Terug naar Home
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
        >
          🔄 Nog een quiz!
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
