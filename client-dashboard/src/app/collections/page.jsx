'use client';

import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';
import Protected from '@/components/Protected';
import animationData from '@/resources/animation.json';

// lottie-react touches the DOM, so load it client-side only.
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const FEATURES = [
  { emoji: '✨', title: 'Curated Collections', text: 'Handpicked gems organized into themed collections' },
  { emoji: '💎', title: 'Virtual Showcase', text: 'Interactive 3D views of our finest pieces' },
  { emoji: '🎯', title: 'Personalized Recommendations', text: 'Tailored suggestions based on your preferences' },
];

function CollectionsContent() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-white'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-12 pt-28 text-center">
        <div className="w-[400px] max-w-full h-[400px] mx-auto mb-8">
          <Lottie animationData={animationData} loop style={{ width: '100%', height: '100%' }} />
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            Coming Soon
          </h1>

          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We&apos;re crafting something special for you. Our collection feature will bring a whole new way to discover
            and explore precious gems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-slate-800/50' : 'bg-white'
                } shadow-lg transform hover:scale-105 transition-transform duration-300`}
              >
                <div className="text-purple-500 text-2xl mb-3">{feature.emoji}</div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{feature.text}</p>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-8 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'} shadow-lg max-w-xl mx-auto`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Be the First to Know
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-slate-700 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300">
                Notify Me
              </button>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce" />
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.1s]" />
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Protected>
      <CollectionsContent />
    </Protected>
  );
}
