'use client';

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const SOCIAL_ICONS = [Facebook, Twitter, Instagram, Linkedin];
const QUICK_LINKS = ['About Us', 'Collections', 'Auctions', 'Blog', 'Contact'];
const SERVICE_LINKS = ['FAQ', 'Shipping Info', 'Returns', 'Track Order', 'Privacy Policy'];
const CONTACT = [
  { Icon: Mail, text: 'contact@gemify.com' },
  { Icon: Phone, text: '+1 (555) 123-4567' },
  { Icon: MapPin, text: '123 Gem Street, NY 10001' },
];

export default function Footer() {
  const { isDarkMode } = useTheme();

  const muted = isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900';
  const heading = isDarkMode ? 'text-gray-300' : 'text-gray-900';

  return (
    <footer
      className={`${
        isDarkMode ? 'bg-slate-900 text-gray-300' : 'bg-white text-gray-600 border-t'
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Gemify
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Discover the world's finest collection of precious gems and jewelry.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_ICONS.map((Icon, index) => (
                <Icon key={index} className={`w-5 h-5 cursor-pointer ${muted}`} />
              ))}
            </div>
          </div>

          <div>
            <h4 className={`text-lg font-semibold mb-4 ${heading}`}>Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <a className={`${muted} transition-colors cursor-pointer`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`text-lg font-semibold mb-4 ${heading}`}>Customer Service</h4>
            <ul className="space-y-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link}>
                  <a className={`${muted} transition-colors cursor-pointer`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`text-lg font-semibold mb-4 ${heading}`}>Contact Us</h4>
            <div className="space-y-4">
              {CONTACT.map(({ Icon, text }, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-purple-400" />
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'border-gray-800' : 'border-gray-200'} border-t mt-12 pt-8 transition-colors`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2024 Developed by Eshan Gunathilaka and team. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">Made with ❤️ by Eshan Gunathilaka</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
