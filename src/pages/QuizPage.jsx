import React, { useState, useEffect } from 'react';
import XPGainAnimation from '../components/XPGainAnimation';
import AchievementToast from '../components/AchievementToast';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizQuestions } from '../services/api';

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [showXPGain, setShowXPGain] = useState(false);
    const [xpGained, setXpGained] = useState(0);
    const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await getQuizQuestions(id);
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Kon vragen niet laden.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Calculate score
      const correctAnswers = Object.keys(userAnswers).filter(
        (questionId) => {
          const question = questions.find((q) => q.id === parseInt(questionId));
          return question && userAnswers[questionId] === question.correct_answer;
        }
      ).length;

      // Call the gamification endpoint
      const response = await fetch('https://educational-gamification-platform.onrender.com/api/quizzes/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          quiz_id: parseInt(id),
          score: correctAnswers,
          total_questions: questions.length,
          time_taken: 300,
          category: 'general'
        })
      });

      const data = await response.json();

      // Show XP gain animation
      if (data.xp_gained > 0) {
        setXpGained(data.xp_gained);
        setShowXPGain(true);
        setTimeout(() => setShowXPGain(false), 2000);
      }

      // Show badge toasts
      if (data.earned_badges && data.earned_badges.length > 0) {
        setEarnedBadges(data.earned_badges);
        setTimeout(() => setEarnedBadges([]), 5000);
      }

      // Navigate to results after animations
      setTimeout(() => {
        navigate('/results', { state: { userAnswers, questions, gamificationData: data } });
      }, 2500);

    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Fallback: navigate anyway
      navigate('/results', { state: { userAnswers, questions } });
    }
  };
  if (loading) return <div className="flex justify-center items-center min-h-[400px]"><div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div></div>;
  if (error) return <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p className="text-red-600">{error}</p></div>;
  if (questions.length === 0) return <div className="text-center p-8">Geen vragen beschikbaar.</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Vraag {currentQuestionIndex + 1} van {questions.length}</span>
          <span>{Math.round(progress)}% voltooid</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-primary-600 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="mb-6">
          <span className="inline-block px-4 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-semibold mb-4">
            {currentQuestion.difficulty_level}
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentQuestion.question}</h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {['A', 'B', 'C', 'D'].map((option) => {
            const optionText = currentQuestion[`option_${option.toLowerCase()}`];
            const isSelected = userAnswers[currentQuestion.id] === option;
            return (
              <button
                key={option}
                onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <span className="font-bold text-primary-600 mr-3">{option})</span>
                {optionText}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-50"
        >
          ← Vorige
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
          >
            Volgende →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-secondary-600 text-white rounded-lg font-semibold hover:bg-secondary-700"
          >
            Voltooien ✓
          </button>
        )}
      </div>

            {/* Gamification Components */}
      {showXPGain && <XPGainAnimation xp={xpGained} />}
      {earnedBadges.map((badge, index) => (
        <AchievementToast
          key={index}
          badge={badge}
          onClose={() => setEarnedBadges(earnedBadges.filter((_, i) => i !== index))}
        />
      ))}
    </div>
  );
}

export default QuizPage;

