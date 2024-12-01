import React, { useState, useEffect } from 'react';
import { X, Mail, Bell } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const PopupController = ({ user, isDarkMode }) => {
  const [currentPopup, setCurrentPopup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [seenPopups, setSeenPopups] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('seenPopups') || '[]');
    } catch {
      return [];
    }
  });

  // Fetch eligible popups
  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const now = new Date().toISOString();
        const userType = user ? 'registered' : 'guests';
        
        const popupsQuery = query(
          collection(db, 'popups'),
          where('isActive', '==', true),
          where('startDate', '<=', now),
          where('endDate', '>=', now)
        );
        
        const querySnapshot = await getDocs(popupsQuery);
        const eligiblePopups = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(popup => {
            // Filter by audience
            const audienceMatch = 
              popup.targetAudience === 'all' || 
              (popup.targetAudience === userType) ||
              (popup.targetAudience === 'registered' && user) ||
              (popup.targetAudience === 'guests' && !user);
            
            // Check if popup hasn't been seen
            const notSeen = !seenPopups.includes(popup.id);
            
            return audienceMatch && notSeen;
          })
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        if (eligiblePopups.length > 0) {
          setCurrentPopup(eligiblePopups[0]);
          setShowPopup(true);
        }
      } catch (error) {
        console.error('Error fetching popups:', error);
      }
    };

    // Wait a bit before showing popup for better UX
    const timer = setTimeout(fetchPopups, 2000);
    return () => clearTimeout(timer);
  }, [user, seenPopups]);

  // Handle popup close
  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsAnimating(false);
      // Mark popup as seen
      if (currentPopup) {
        const newSeenPopups = [...seenPopups, currentPopup.id];
        setSeenPopups(newSeenPopups);
        localStorage.setItem('seenPopups', JSON.stringify(newSeenPopups));
      }
    }, 300);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPopup?.showEmail && !email) return;

    try {
      // Here you can add logic to handle the email submission
      // For example, save to your newsletter collection
      console.log('Form submitted with email:', email);
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!showPopup || !currentPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup Content */}
      <div className={`
        relative w-full max-w-md transform rounded-2xl 
        ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}
        shadow-xl transition-all duration-300
        ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
      `}>
        {/* Banner Image */}
        {currentPopup.bannerImage && (
          <div className="relative h-48 w-full rounded-t-2xl overflow-hidden">
            <img
              src={currentPopup.bannerImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute right-4 top-4 ${
            currentPopup.bannerImage ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
          } hover:opacity-75 focus:outline-none`}
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-6">
          <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
            isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            {currentPopup.type === "newsletter" ? (
              <Mail className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            ) : (
              <Bell className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            )}
          </div>

          <h3 className={`mt-4 text-center text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {currentPopup.title}
          </h3>

          <p className={`mt-2 text-center text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>
            {currentPopup.message}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4">
            {currentPopup.showEmail && (
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full rounded-lg px-4 py-2 ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200`}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-purple-500 py-2 text-white transition-all hover:bg-purple-600"
            >
              {currentPopup.buttonText}
            </button>
          </form>

          {/* Secondary action */}
          <button
            onClick={handleClose}
            className={`mt-3 w-full rounded-lg border px-4 py-2 text-sm ${
              isDarkMode 
                ? 'border-slate-600 text-gray-400 hover:bg-slate-700' 
                : 'border-gray-300 text-gray-500 hover:bg-gray-50'
            }`}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupController;