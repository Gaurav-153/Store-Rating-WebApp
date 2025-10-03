import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Loading from "../common/Loading";
import { useAuth } from "../../context/AuthContext";
import { Star, Store, User, TrendingUp } from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRatings: 0,
    averageRating: 0,
    totalStores: 0,
  });
  const [recentRatings, setRecentRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ratingsResponse, storesResponse] = await Promise.all([
        api.get("/ratings/user"),
        api.get("/stores"),
      ]);

      const userRatings = ratingsResponse.data;
      const allStores = storesResponse.data;

      setStats({
        totalRatings: userRatings.length,
        averageRating:
          userRatings.length > 0
            ? userRatings.reduce((sum, rating) => sum + rating.rating, 0) /
              userRatings.length
            : 0,
        totalStores: allStores.length,
      });

      setRecentRatings(userRatings.slice(0, 5));
    } catch (error) {
      setError("Failed to load dashboard data");
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 transition-colors ${
            i < rating
              ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
              : "text-gray-300"
          }`}
        />
      ));
  };

  if (loading) return <Loading message="Loading dashboard..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="space-y-8 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl rounded-3xl p-8 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center space-x-6">
            <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl border border-white/30">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Welcome back, <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">{user?.name}!</span>
              </h1>
              <p className="text-lg opacity-90 font-medium">
                🏪 Discover and rate amazing stores in your area
              </p>
              <div className="flex items-center mt-3 space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm opacity-75">Active Session</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-xl shadow-md">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">My Ratings</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalRatings}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-yellow-500">⭐</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-100 px-8 py-4 border-t border-yellow-200">
              <div className="text-sm font-semibold text-yellow-700">Total ratings given</div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Average Rating</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{stats.averageRating.toFixed(1)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-emerald-500">📈</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-green-100 px-8 py-4 border-t border-emerald-200">
              <div className="text-sm font-semibold text-emerald-700">Your rating average</div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-lg">
                    <Store className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Available Stores</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalStores}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-blue-500">🏪</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 px-8 py-4 border-t border-blue-200">
              <Link to="/user/stores" className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors duration-200 flex items-center">
                <span>Explore stores</span>
                <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20 rounded-2xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <Store className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
            </div>
            <p className="text-gray-600 mt-2">Explore and manage your experience</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/user/stores"
                className="group flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <h4 className="font-bold text-gray-900 text-lg">Browse Stores</h4>
                  <p className="text-gray-600 mt-1">Discover and rate new stores</p>
                  <div className="flex items-center mt-2 text-blue-600 font-medium">
                    <span className="text-sm">Explore stores</span>
                    <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              <Link
                to="/user/profile"
                className="group flex items-center p-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl hover:from-emerald-100 hover:to-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <h4 className="font-bold text-gray-900 text-lg">My Profile</h4>
                  <p className="text-gray-600 mt-1">Update your account settings</p>
                  <div className="flex items-center mt-2 text-emerald-600 font-medium">
                    <span className="text-sm">Manage profile</span>
                    <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Ratings */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20 rounded-2xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Recent Ratings</h3>
            </div>
            <Link
              to="/user/stores"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
            >
              View all
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        {recentRatings.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Star className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-3 text-base font-semibold text-gray-800">
              No ratings yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start rating stores to see your activity here.
            </p>
            <div className="mt-6">
              <Link
                to="/user/stores"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Rate Your First Store
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentRatings.map((rating) => (
              <div
                key={rating.id}
                className="px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {rating.store_name}
                    </h4>
                    <div className="flex items-center mt-1">
                      <div className="flex">{renderStars(rating.rating)}</div>
                      <span className="ml-2 text-sm font-medium text-gray-600">
                        {rating.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(rating.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
