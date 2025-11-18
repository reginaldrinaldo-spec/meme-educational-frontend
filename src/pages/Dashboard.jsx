import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Target, Flame, Award, Star, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, [timeframe]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const userId = sessionStorage.getItem('user_id') || '1';
      
      // Fetch user stats
      const userResponse = await fetch(
        `https://educational-gamification-platform.onrender.com/api/user/${userId}/stats`
      );
      const userStats = await userResponse.json();
      setUserData(userStats);

      // Fetch leaderboard
      const leaderboardResponse = await fetch(
        `https://educational-gamification-platform.onrender.com/api/leaderboard?timeframe=${timeframe}`
      );
      const leaderboardData = await leaderboardResponse.json();
      setLeaderboard(leaderboardData.slice(0, 10));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className="flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );

  const LeaderboardEntry = ({ rank, name, xp, level, streak, badges, isCurrentUser }) => (
    <div className={`flex items-center justify-between p-4 rounded-lg mb-2 transition-all duration-300 ${
      isCurrentUser
        ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500'
        : 'bg-gray-800/50 hover:bg-gray-800'
    }`}>
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-gray-900' :
          rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900' :
          rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
          'bg-gray-700 text-white'
        }`}>
          {rank <= 3 ? <Trophy className="w-5 h-5" /> : rank}
        </div>
        <div>
          <p className="text-white font-semibold">{name}</p>
          <p className="text-sm text-gray-400">Level {level}</p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-white font-medium">{streak}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-purple-400" />
          <span className="text-white font-medium">{badges}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-white font-bold">{xp} XP</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-2">
              Your Dashboard
            </h1>
            <p className="text-gray-300 text-lg">Track your progress and compete with others!</p>
          </div>
          <button
            onClick={() => navigate('/quiz/1')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-200"
          >
            Start Quiz
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Star}
          label="Total XP"
          value={userData?.total_xp || 0}
          color="bg-gradient-to-br from-yellow-500 to-orange-500"
          trend="+15%"
        />
        <StatCard
          icon={Target}
          label="Current Level"
          value={userData?.level || 1}
          color="bg-gradient-to-br from-purple-500 to-pink-500"
        />
        <StatCard
          icon={Flame}
          label="Day Streak"
          value={userData?.streak || 0}
          color="bg-gradient-to-br from-orange-500 to-red-500"
          trend="+3 days"
        />
        <StatCard
          icon={Award}
          label="Badges"
          value={userData?.badges?.length || 0}
          color="bg-gradient-to-br from-blue-500 to-cyan-500"
        />
      </div>

      {/* Leaderboard */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              🏆 Leaderboard
            </h2>
            <div className="flex space-x-2">
              {['all', 'week', 'month'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    timeframe === tf
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {leaderboard.map((entry, index) => (
              <LeaderboardEntry
                key={entry.user_id}
                rank={entry.rank}
                name={`Player ${entry.user_id}`}
                xp={entry.total_xp}
                level={entry.level}
                streak={entry.streak}
                badges={entry.badge_count}
                isCurrentUser={entry.user_id === parseInt(sessionStorage.getItem('user_id') || '1')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
