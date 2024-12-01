import React, { useState, useEffect } from 'react';
import { X, Mail, Bell } from 'lucide-react';

const PopupMessage = ({ 
  isOpen, 
  onClose, 
  title = "Special Offer!", 
  message = "Subscribe to our newsletter", 
  type = "newsletter",
  buttonText = "Subscribe Now",
  onAction = () => {},
  showEmail = true
}) => {
  const [email, setEmail] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Delay to allow animation to complete
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAction(email);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup Content */}
      <div className={`relative w-full max-w-md transform rounded-2xl bg-white shadow-xl transition-all duration-500 ${
        isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            {type === "newsletter" ? (
              <Mail className="h-6 w-6 text-purple-600" />
            ) : (
              <Bell className="h-6 w-6 text-purple-600" />
            )}
          </div>
          <h3 className="mt-4 text-center text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-center text-sm text-gray-500">
            {message}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4">
            {showEmail && (
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 py-2 text-white transition-all hover:opacity-90 group"
            >
              <span className="relative z-10">{buttonText}</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500 to-green-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </form>

          {/* Optional secondary action */}
          <button
            onClick={onClose}
            className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;