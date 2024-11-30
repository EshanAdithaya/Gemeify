import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../resources/Animation - 1732987938448.json';

const CollectionsPage = ({ isDarkMode }) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    }`}>
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        {/* Animation Container */}
        <div className="w-[400px] h-[400px] mx-auto mb-8">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h1 className={`text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse`}>
            Coming Soon
          </h1>
          
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } max-w-2xl mx-auto`}>
            We're crafting something special for you. Our collection feature will bring a whole new way to discover and explore precious gems.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-slate-800/50' : 'bg-white'
            } shadow-lg transform hover:scale-105 transition-transform duration-300`}>
              <div className="text-purple-500 text-2xl mb-3">✨</div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Curated Collections</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Handpicked gems organized into themed collections
              </p>
            </div>

            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-slate-800/50' : 'bg-white'
            } shadow-lg transform hover:scale-105 transition-transform duration-300`}>
              <div className="text-purple-500 text-2xl mb-3">💎</div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Virtual Showcase</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Interactive 3D views of our finest pieces
              </p>
            </div>

            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-slate-800/50' : 'bg-white'
            } shadow-lg transform hover:scale-105 transition-transform duration-300`}>
              <div className="text-purple-500 text-2xl mb-3">🎯</div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Personalized Recommendations</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Tailored suggestions based on your preferences
              </p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className={`mt-12 p-8 rounded-xl ${
            isDarkMode ? 'bg-slate-800/50' : 'bg-white'
          } shadow-lg max-w-xl mx-auto`}>
            <h3 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Be the First to Know
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-slate-700 text-white placeholder-gray-400' 
                    : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300">
                Notify Me
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-12">
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce"></div>
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce delay-100"></div>
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;