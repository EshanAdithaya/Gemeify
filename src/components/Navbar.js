import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, Heart, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <nav className={`fixed w-full ${
      isDarkMode 
        ? 'bg-slate-900/80' 
        : 'bg-white/80'
      } backdrop-blur-md z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Gemify
            </Link>
          </div>
          
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
            <button className={`p-2 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}>
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button className={`p-2 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}>
              <Heart size={20} />
            </button>

            {/* Mobile Menu */}
            <button className={`md:hidden p-2 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;