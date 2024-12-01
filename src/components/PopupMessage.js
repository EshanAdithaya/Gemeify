import React, { useState, useEffect } from 'react';
import { X, Mail, Bell } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'shown_popup_titles';
const COOKIE_EXPIRY = 3; // days

const PopupController = ({ user, isDarkMode }) => {
  const [popups, setPopups] = useState([]);
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const [emailInputs, setEmailInputs] = useState({});

  const getSeenPopupTitles = () => {
    try {
      const seenTitles = Cookies.get(COOKIE_NAME);
      const parsedTitles = seenTitles ? JSON.parse(seenTitles) : [];
      console.log('Retrieved seen popup titles:', parsedTitles);
      return parsedTitles;
    } catch (error) {
      console.error('Error reading popup cookies:', error);
      return [];
    }
  };

  const markPopupAsSeen = (title) => {
    try {
      const seenTitles = getSeenPopupTitles();
      if (!seenTitles.includes(title)) {
        const updatedTitles = [...seenTitles, title];
        Cookies.set(COOKIE_NAME, JSON.stringify(updatedTitles), { 
          expires: COOKIE_EXPIRY,
          sameSite: 'Strict',
          secure: true
        });
        console.log('Saved new popup title to cookies:', title);
      }
    } catch (error) {
      console.error('Error saving popup cookie:', error);
    }
  };

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const popupsSnapshot = await getDocs(collection(db, 'popups'));
        const now = new Date();
        const seenTitles = getSeenPopupTitles();

        const eligiblePopups = popupsSnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            isClosing: false
          }))
          .filter(popup => {
            if (!popup.isActive || !popup.title) return false;
            
            const hasSeenTitle = seenTitles.includes(popup.title);
            if (hasSeenTitle) return false;
            
            const startDate = popup.startDate ? new Date(popup.startDate) : null;
            const endDate = popup.endDate ? new Date(popup.endDate) : null;
            
            const isInDateRange = (!startDate || startDate <= now) && 
                                (!endDate || endDate >= now);
            if (!isInDateRange) return false;
            
            let isTargetAudienceMatch = false;
            switch (popup.targetAudience) {
              case 'guests':
                isTargetAudienceMatch = !user;
                break;
              case 'registered':
                isTargetAudienceMatch = !!user;
                break;
              case 'all':
                isTargetAudienceMatch = true;
                break;
              default:
                isTargetAudienceMatch = true;
            }
            
            return isTargetAudienceMatch;
          });

        setPopups(eligiblePopups);
        setCurrentPopupIndex(0);
        
        const initialEmailInputs = {};
        eligiblePopups.forEach(popup => {
          if (popup.showEmail) {
            initialEmailInputs[popup.id] = '';
          }
        });
        setEmailInputs(initialEmailInputs);
      } catch (error) {
        console.error('Error fetching popups:', error);
      }
    };

    fetchPopups();
  }, [user]);

  const handleClose = (popup) => {
    if (!popup.title) return;
    
    setPopups(current => 
      current.map((p, index) => 
        index === currentPopupIndex 
          ? { ...p, isClosing: true }
          : p
      )
    );

    setTimeout(() => {
      markPopupAsSeen(popup.title);
      setPopups(current => {
        // Remove the current popup
        const updatedPopups = current.filter((_, index) => index !== currentPopupIndex);
        // If there are more popups, reset the index to 0, otherwise it will stay at current index
        if (currentPopupIndex >= updatedPopups.length) {
          setCurrentPopupIndex(0);
        }
        return updatedPopups;
      });
    }, 300);
  };

  const handleSubmit = async (e, popup) => {
    e.preventDefault();
    if (popup.showEmail && !emailInputs[popup.id]) return;
    
    try {
      handleClose(popup);
    } catch (error) {
      console.error('Error submitting popup form:', error);
    }
  };

  // Show nothing if no popups or if currentPopupIndex is invalid
  if (popups.length === 0 || currentPopupIndex >= popups.length) return null;

  // Get current popup to display
  const currentPopup = popups[currentPopupIndex];

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center justify-center p-4 sm:bottom-6">
      <div
        className={`
          relative w-full transform overflow-hidden rounded-3xl
          ${isDarkMode ? 'bg-slate-800/95 text-white' : 'bg-white/95 text-gray-900'}
          shadow-[0_8px_40px_rgb(0,0,0,0.12)] backdrop-blur-md
          transition-all duration-300
          sm:w-[600px] md:w-[720px] lg:w-[840px] xl:w-[920px]
          ${currentPopup.isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
        `}
      >
        {currentPopup.bannerImage && (
          <div className="relative h-48 sm:h-72 w-full overflow-hidden">
            <img
              src={currentPopup.bannerImage}
              alt={currentPopup.title || ''}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            {currentPopup.title && (
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white text-shadow-lg">
                  {currentPopup.title}
                </h3>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => handleClose(currentPopup)}
          className="absolute right-4 top-4 z-10 rounded-full p-2.5
            bg-black/20 text-white backdrop-blur-sm
            hover:bg-black/30 transition-all duration-200
            hover:rotate-90 transform"
        >
          <X size={22} />
        </button>

        <div className="p-6 sm:p-8 lg:p-10">
          {!currentPopup.bannerImage && currentPopup.title && (
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">
              {currentPopup.title}
            </h3>
          )}

          <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full 
            ${isDarkMode ? 'bg-purple-500/20 ring-1 ring-purple-500/30' : 'bg-purple-100'}`}
          >
            {currentPopup.type === "newsletter" ? (
              <Mail className={`h-8 w-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            ) : (
              <Bell className={`h-8 w-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            )}
          </div>

          <p className={`mt-6 text-center text-lg sm:text-xl leading-relaxed
            ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {currentPopup.message}
          </p>

          <form onSubmit={(e) => handleSubmit(e, currentPopup)} className="mt-8 space-y-4">
            {currentPopup.showEmail && (
              <input
                type="email"
                value={emailInputs[currentPopup.id] || ''}
                onChange={(e) => setEmailInputs(prev => ({
                  ...prev,
                  [currentPopup.id]: e.target.value
                }))}
                placeholder="Enter your email"
                className={`w-full rounded-xl border px-5 py-3.5 text-lg
                  ${isDarkMode 
                    ? 'border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 focus:border-purple-500' 
                    : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                  } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                required
              />
            )}
            
            {currentPopup.buttonText && (
              <button
                type="submit"
                className="w-full rounded-xl bg-purple-500 py-3.5 text-lg font-medium text-white 
                  transition-all duration-200 hover:bg-purple-600 active:scale-[0.98]
                  hover:shadow-lg hover:shadow-purple-500/25"
              >
                {currentPopup.buttonText}
              </button>
            )}
          </form>

          <button
            onClick={() => handleClose(currentPopup)}
            className={`mt-4 w-full rounded-xl border py-3 text-base font-medium
              ${isDarkMode 
                ? 'border-slate-600 text-gray-400 hover:bg-slate-700/50' 
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              } transition-colors duration-200`}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupController;