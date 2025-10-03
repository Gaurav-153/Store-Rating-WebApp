
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Store, Users, Settings, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'user':
        return '/user/dashboard';
      case 'store_owner':
        return '/store-owner/dashboard';
      default:
        return '/login';
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <Link 
              to={getDashboardLink()} 
              className="flex items-center space-x-3 group"
            >
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-white text-xl font-bold group-hover:text-blue-300 transition-colors duration-200">
                  <span className="hidden sm:inline">Store Rating System</span>
                  <span className="sm:hidden">SRS</span>
                </span>
                <div className="text-xs text-blue-300 hidden sm:block">
                  Professional Platform
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {/* Navigation Links based on role */}
                {user?.role === 'admin' && (
                  <>
                    <Link 
                      to="/admin/dashboard" 
                      className="text-white/90 hover:text-white hover:bg-white/10 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      <Settings size={18} />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      to="/admin/users" 
                      className="text-white/90 hover:text-white hover:bg-white/10 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      <Users size={18} />
                      <span>Users</span>
                    </Link>
                    <Link 
                      to="/admin/stores" 
                      className="text-white/90 hover:text-white hover:bg-white/10 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      <Store size={18} />
                      <span>Stores</span>
                    </Link>
                  </>
                )}
                
                {user?.role === 'user' && (
                  <>
                    <Link 
                      to="/user/dashboard" 
                      className="text-white/90 hover:text-white hover:bg-white/10 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      <Settings size={18} />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      to="/user/stores" 
                      className="text-white/90 hover:text-white hover:bg-white/10 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      <Store size={18} />
                      <span>Stores</span>
                    </Link>
                    <Link 
                      to="/user/profile" 
                      className="text-white/90 hover:text-white hover:bg-white/10 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>
                  </>
                )}
                
                {user?.role === 'store_owner' && (
                  <>
                    <Link 
                      to="/store-owner/dashboard" 
                      className="text-white/90 hover:text-white hover:bg-white/10 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      <Settings size={18} />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      to="/store-owner/profile" 
                      className="text-white/90 hover:text-white hover:bg-white/10 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>
                  </>
                )}

                {/* User Info and Logout */}
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="text-white/90 text-sm hidden lg:inline font-medium">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white/90 hover:text-white hover:bg-red-500/20 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold transform hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-blue-200 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-700 border-t border-blue-500">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  
                  <div className="text-white text-sm px-3 py-2 border-b border-blue-500">
                    Welcome, {user?.name}
                  </div>

                  {/* Navigation Links based on role */}
                  {user?.role === 'admin' && (
                    <>
                      <Link 
                        to="/admin/dashboard" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Settings size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        to="/admin/users" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Users size={16} />
                        <span>Users</span>
                      </Link>
                      <Link 
                        to="/admin/stores" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Store size={16} />
                        <span>Stores</span>
                      </Link>
                    </>
                  )}
                  
                  {user?.role === 'user' && (
                    <>
                      <Link 
                        to="/user/dashboard" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Settings size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        to="/user/stores" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Store size={16} />
                        <span>Stores</span>
                      </Link>
                      <Link 
                        to="/user/profile" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </Link>
                    </>
                  )}
                  
                  {user?.role === 'store_owner' && (
                    <>
                      <Link 
                        to="/store-owner/dashboard" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Settings size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        to="/store-owner/profile" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </Link>
                    </>
                  )}

                  {/* Logout button */}
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="w-full text-left text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-white hover:bg-blue-600 block px-3 py-2 rounded"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-white hover:bg-blue-600 block px-3 py-2 rounded"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;