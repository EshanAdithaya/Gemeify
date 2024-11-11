import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, ShoppingCart, Heart } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed w-full bg-slate-900/80 backdrop-blur-md z-50">
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
                  location.pathname === '/collections' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                Collections
              </Link>
              <Link 
                to="/auctions" 
                className={`${
                  location.pathname === '/auctions' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                Auctions
              </Link>
              <Link 
                to="/marketplace" 
                className={`${
                  location.pathname === '/marketplace' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                Marketplace
              </Link>
              <Link 
                to="/about" 
                className={`${
                  location.pathname === '/about' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                About
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-white">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-300 hover:text-white">
              <Heart size={20} />
            </button>
            <button className="p-2 text-gray-300 hover:text-white">
              <ShoppingCart size={20} />
            </button>
            <button className="md:hidden p-2 text-gray-300 hover:text-white">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;