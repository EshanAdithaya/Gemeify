import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import './App.css';

import GemifyLanding from './GemifyLanding';
import Collections from './pages/Collections';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Auctions from './pages/Auctions';
import Marketplace from './pages/Marketplace';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [isBanned, setIsBanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(currentUser);
            setIsBanned(userData.isBanned || false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        setIsBanned(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Ban message component
  const BannedMessage = () => (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    }`}>
      <div className={`max-w-md w-full mx-4 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      } rounded-xl shadow-lg p-8 text-center`}>
        <h1 className={`text-2xl font-bold mb-4 ${
          isDarkMode ? 'text-red-400' : 'text-red-600'
        }`}>Account Suspended</h1>
        <p className={`mb-6 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Your account has been suspended. Please contact support for assistance.
        </p>
        <button
          onClick={() => auth.signOut()}
          className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (user && isBanned) {
      return <BannedMessage />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}>
        <Navbar 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          user={user} 
        />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <GemifyLanding isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="/collections" element={
            <ProtectedRoute>
              <Collections isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="/auctions" element={
            <ProtectedRoute>
              <Auctions isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="/marketplace" element={
            <ProtectedRoute>
              <Marketplace isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <AboutUs isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            user ? (
              isBanned ? (
                <BannedMessage />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Login isDarkMode={isDarkMode} />
            )
          } />
          <Route path="/signup" element={
            user ? (
              isBanned ? (
                <BannedMessage />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Signup isDarkMode={isDarkMode} />
            )
          } />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </BrowserRouter>
  );
}

export default App;