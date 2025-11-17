import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://educational-gamification-platform.onrender.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Service Functions

/**
 * Get all available quizzes
 * @returns {Promise<Array>} List of quiz objects
 */
export const getAllQuizzes = async () => {
  try {
    const response = await api.get('/quizzes');
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
};

/**
 * Get a specific quiz by ID
 * @param {number} quizId - The ID of the quiz
 * @returns {Promise<Object>} Quiz object
 */
export const getQuizById = async (quizId) => {
  try {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz ${quizId}:`, error);
    throw error;
  }
};

/**
 * Get questions for a specific quiz
 * @param {number} quizId - The ID of the quiz
 * @returns {Promise<Array>} List of question objects
 */
export const getQuizQuestions = async (quizId) => {
  try {
    const response = await api.get(`/quizzes/${quizId}/questions`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching questions for quiz ${quizId}:`, error);
    throw error;
  }
};

/**
 * Submit quiz answers (placeholder for future implementation)
 * @param {number} quizId - The ID of the quiz
 * @param {Object} answers - User's answers
 * @returns {Promise<Object>} Result object
 */
export const submitQuizAnswers = async (quizId, answers) => {
  try {
    // This will be implemented in Phase 9 (User Management)
    console.log('Quiz submission:', { quizId, answers });
    return { score: 0, total: 0 }; // Placeholder
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw error;
  }
};

export default api;
