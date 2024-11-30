import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Create user in Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, { displayName: name });

      // Create user document in Firestore
      // In your signup component when creating the user document:
await setDoc(doc(db, 'users', user.uid), {
  uid: user.uid,
  name,
  email,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  role: 'customer', // Add customer role
  status: 'New',    // Add initial status
  totalSpent: 0,    // Add initial total spent
  lastPurchase: null, // Add last purchase date
  isBanned: false    // Add ban status
});

      // Navigate to login page
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message.includes('auth/') 
        ? 'This email is already registered or invalid.' 
        : 'An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className={`max-w-md w-full mx-4 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      } rounded-xl shadow-lg p-8`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-2">
            Create Account
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Join us today
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 pl-11 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-slate-700 text-white border-slate-600' 
                    : 'bg-white text-gray-900 border-gray-300'
                } border`}
                required
                disabled={isLoading}
              />
              <User className={`absolute left-3 top-2.5 h-5 w-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 pl-11 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-slate-700 text-white border-slate-600' 
                    : 'bg-white text-gray-900 border-gray-300'
                } border`}
                required
                disabled={isLoading}
              />
              <Mail className={`absolute left-3 top-2.5 h-5 w-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 pl-11 pr-11 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-slate-700 text-white border-slate-600' 
                    : 'bg-white text-gray-900 border-gray-300'
                } border`}
                required
                disabled={isLoading}
                minLength={6}
              />
              <Lock className={`absolute left-3 top-2.5 h-5 w-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-2.5 ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className={`font-medium ${
                isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'
              }`}
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;