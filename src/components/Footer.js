import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`${
      isDarkMode 
        ? 'bg-slate-900 text-gray-300' 
        : 'bg-white text-gray-600 border-t'
    } transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Gemify
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Discover the world's finest collection of precious gems and jewelry.
            </p>
            <div className="flex space-x-4">
              <Facebook className={`w-5 h-5 cursor-pointer ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`} />
              <Twitter className={`w-5 h-5 cursor-pointer ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`} />
              <Instagram className={`w-5 h-5 cursor-pointer ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`} />
              <Linkedin className={`w-5 h-5 cursor-pointer ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Collections', 'Auctions', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a className={`${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-500 hover:text-gray-900'
                    } transition-colors cursor-pointer`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>Customer Service</h4>
            <ul className="space-y-2">
              {['FAQ', 'Shipping Info', 'Returns', 'Track Order', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a className={`${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-500 hover:text-gray-900'
                    } transition-colors cursor-pointer`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>Contact Us</h4>
            <div className="space-y-4">
              {[
                { Icon: Mail, text: 'contact@gemify.com' },
                { Icon: Phone, text: '+1 (555) 123-4567' },
                { Icon: MapPin, text: '123 Gem Street, NY 10001' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <item.Icon className="w-5 h-5 text-purple-400" />
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        } border-t mt-12 pt-8 transition-colors`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              © 2024 Gemify. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Terms', 'Privacy', 'Cookies'].map((link) => (
                <a key={link} className={`text-sm ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-900'
                  } transition-colors cursor-pointer`}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;