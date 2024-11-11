import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GemifyLanding from './GemifyLanding';
import Collections from './pages/Collections';
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // Import Footer only once
import Auctions from './pages/Auctions';
import Marketplace from './pages/Marketplace';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<GemifyLanding />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;