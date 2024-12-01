import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Heart, Sun, Moon, User, Settings, LogOut } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const UserMenu = () => (
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className={`flex items-center space-x-2 ${
          isDarkMode
            ? 'text-gray-300 hover:text-white'
            : 'text-gray-600 hover:text-gray-900'
        } transition-colors`}
      >
        <User size={20} />
        <span>{user.displayName || 'User'}</span>
      </button>

      {isUserMenuOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        } ring-1 ring-black ring-opacity-5`}>
          <div className="py-1" role="menu">
            <Link
              to="/settings"
              className={`flex items-center px-4 py-2 text-sm ${
                isDarkMode
                  ? 'text-gray-300 hover:bg-slate-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsUserMenuOpen(false)}
            >
              <Settings size={16} className="mr-2" />
              Settings
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsUserMenuOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm ${
                isDarkMode
                  ? 'text-gray-300 hover:bg-slate-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav
      className={`fixed w-full ${
        isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'
      } backdrop-blur-md z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
            >
              Gemify
            </Link>
          </div>

          {/* <div className="flex items-center">
            <Link to="/">
              <img src="/path/to/logo.png" alt="Gemify Logo" className="h-8 w-auto" />
            </Link>
          </div>
           */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                to="/collections"
                className={`${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
              >
                Collections
              </Link>
              <Link
                to="/auctions"
                className={`${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
              >
                Auctions
              </Link>
              <Link
                to="/marketplace"
                className={`${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
              >
                Marketplace
              </Link>
              <Link
                to="/about"
                className={`${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
              >
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Search */}
            <button
              className={`p-2 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button
              className={`p-2 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Heart size={20} />
            </button>

            {/* User Authentication */}
            {user ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className={`${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
              >
                Login
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className={`md:hidden ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          } p-4 rounded-b-lg shadow-lg`}>
            <div className="flex flex-col space-y-4">
              <Link
                to="/collections"
                className={`${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/auctions"
                className={`${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Auctions
              </Link>
              <Link
                to="/marketplace"
                className={`${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                to="/about"
                className={`${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {user && (
                <>
                  <Link
                    to="/settings"
                    className={`${
                      isDarkMode
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className={`text-left ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    } transition-colors`}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;