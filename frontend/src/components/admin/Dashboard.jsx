import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Loading from '../common/Loading';
import { Users, Store, Star, Plus, BarChart3, StoreIcon } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/ratings/stats');
      setStats(response.data);
    } catch (error) {
      setError('Failed to load dashboard statistics');
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Loading dashboard..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="space-y-8 p-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600 font-medium">
                    Comprehensive system management & analytics
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/admin/add-user"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Add User</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white/70 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Total Users
                    </p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">
                      {stats.totalUsers}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-blue-500">👥</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-4 border-t border-blue-200">
              <Link to="/admin/users" className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors duration-200 flex items-center">
                <span>View all users</span>
                <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                    <Store className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Total Stores
                    </p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">
                      {stats.totalStores}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-emerald-500">🏪</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-8 py-4 border-t border-emerald-200">
              <Link to="/admin/stores" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors duration-200 flex items-center">
                <span>View all stores</span>
                <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Total Ratings
                    </p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">
                      {stats.totalRatings}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-amber-500">⭐</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-100 px-8 py-4 border-t border-amber-200">
              <div className="text-sm font-semibold text-amber-700 flex items-center">
                <span>System engagement metric</span>
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
      </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20 rounded-2xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
            </div>
            <p className="text-gray-600 mt-2">Streamlined management tools</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/admin/users"
                className="group flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <h4 className="font-bold text-gray-900 text-lg">Manage Users</h4>
                  <p className="text-gray-600 mt-1">View, search, and manage all users</p>
                </div>
              </Link>

              <Link
                to="/admin/stores"
                className="group flex items-center p-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl hover:from-emerald-100 hover:to-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <h4 className="font-bold text-gray-900 text-lg">Manage Stores</h4>
                  <p className="text-gray-600 mt-1">View and manage store listings</p>
                </div>
              </Link>

              <Link
                to="/admin/add-user"
                className="group flex items-center p-6 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-violet-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <h4 className="font-bold text-gray-900 text-lg">Add New User</h4>
                  <p className="text-gray-600 mt-1">Create user or store owner accounts</p>
                </div>
              </Link>

              <Link 
                to="/admin/add-store" 
                className="group flex items-center p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <StoreIcon className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <h4 className="font-bold text-gray-900 text-lg">Add New Store</h4>
                  <p className="text-gray-600 mt-1">Create a new store listing</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/50 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                System Overview
              </h3>
              <div className="text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Your platform is thriving with <span className="font-bold text-blue-600">{stats.totalUsers}</span> registered users 
                  across <span className="font-bold text-emerald-600">{stats.totalStores}</span> stores, 
                  generating <span className="font-bold text-amber-600">{stats.totalRatings}</span> valuable ratings and reviews.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                    📈 Active Platform
                  </span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                    🏪 Store Network
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">
                    ⭐ User Engagement
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;