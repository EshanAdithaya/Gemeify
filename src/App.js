import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import GemifyLanding from './GemifyLanding';
import Collections from './pages/Collections';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Auctions from './pages/Auctions';
import Marketplace from './pages/Marketplace';
import AboutUs from './pages/AboutUs';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Routes>
          <Route path="/" element={<GemifyLanding isDarkMode={isDarkMode} />} />
          <Route path="/collections" element={<Collections isDarkMode={isDarkMode} />} />
          <Route path="/auctions" element={<Auctions isDarkMode={isDarkMode} />} />
          <Route path="/marketplace" element={<Marketplace isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<AboutUs isDarkMode={isDarkMode} />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </BrowserRouter>
  );
}

export default App;