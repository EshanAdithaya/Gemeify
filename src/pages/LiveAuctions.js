import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Gavel,
  TrendingUp,
  Users,
  Eye,
  Heart,
  ArrowUp,
  Timer,
  Trophy,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { auctionsAPI } from '../services/api';

const LiveAuctions = ({ isDarkMode }) => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placingBid, setPlacingBid] = useState(false);

  useEffect(() => {
    fetchLiveAuctions();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLiveAuctions, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveAuctions = async () => {
    try {
      console.log('🔴 Fetching live auctions...');
      const response = await auctionsAPI.getLive();
      setAuctions(response.data.auctions || []);
      setError(null);
    } catch (error) {
      console.error('❌ Error fetching live auctions:', error);
      setError('Failed to load live auctions');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const placeBid = async (auctionId) => {
    if (!bidAmount || isNaN(bidAmount)) {
      alert('Please enter a valid bid amount');
      return;
    }

    try {
      setPlacingBid(true);
      console.log(`💰 Placing bid: $${bidAmount} on auction ${auctionId}`);
      
      await auctionsAPI.placeBid(auctionId, {
        amount: parseFloat(bidAmount),
      });

      // Refresh auction data
      await fetchLiveAuctions();
      setBidAmount('');
      setSelectedAuction(null);
      
      alert('Bid placed successfully!');
    } catch (error) {
      console.error('❌ Error placing bid:', error);
      alert(error.response?.data?.message || 'Failed to place bid');
    } finally {
      setPlacingBid(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-white'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Loading live auctions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-white'
      }`}>
        <div className="text-center">
          <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
          <p className={`text-lg ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    } pt-24 transition-colors duration-300`}>
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 flex items-center ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Gavel className="w-8 h-8 mr-3 text-purple-500" />
                Live Auctions
              </h1>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Real-time bidding on premium gemstones
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full ${
                isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
              }`}>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">{auctions.length} Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Auctions Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {auctions.length === 0 ? (
            <div className={`text-center py-16 ${
              isDarkMode ? 'bg-slate-800/50' : 'bg-white'
            } rounded-xl`}>
              <Gavel className={`w-16 h-16 mx-auto mb-4 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>No Live Auctions</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Check back soon for upcoming auctions
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {auctions.map((auction) => (
                <div
                  key={auction.id}
                  className={`${
                    isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                  } rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300`}
                >
                  {/* Auction Image */}
                  <div className="relative">
                    <img
                      src={auction.gem?.mainImage || auction.gem?.images?.[0] || '/api/placeholder/400/250'}
                      alt={auction.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/400/250';
                      }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm rounded-full flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      LIVE
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                        <Heart size={20} className="text-white" />
                      </button>
                      <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                        <Eye size={20} className="text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Auction Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-purple-400 text-sm font-medium">
                        {auction.gem?.category?.name || 'Gemstone'}
                      </span>
                      <div className="flex items-center text-sm text-gray-400">
                        <Users size={16} className="mr-1" />
                        {auction.uniqueBidders || 0}
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {auction.title}
                    </h3>

                    <p className={`text-sm mb-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {auction.description?.substring(0, 100)}...
                    </p>

                    {/* Current Bid and Time */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
                      }`}>
                        <div className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>Current Bid</div>
                        <div className={`text-lg font-bold flex items-center ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          <DollarSign size={18} className="mr-1" />
                          {auction.currentBid?.toLocaleString() || '0'}
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
                      }`}>
                        <div className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>Time Left</div>
                        <div className={`text-lg font-bold flex items-center ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          <Timer size={18} className="mr-1" />
                          {formatTimeRemaining(auction.endTime)}
                        </div>
                      </div>
                    </div>

                    {/* Gem Details */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Weight:</span>
                        <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {auction.gem?.weight} ct
                        </span>
                      </div>
                      <div>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Origin:</span>
                        <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {auction.gem?.origin}
                        </span>
                      </div>
                      <div>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Cut:</span>
                        <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {auction.gem?.cut}
                        </span>
                      </div>
                      <div>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Clarity:</span>
                        <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {auction.gem?.clarity}
                        </span>
                      </div>
                    </div>

                    {/* Bidding Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Next Bid: ${((auction.currentBid || 0) + (auction.minimumBidIncrement || 100)).toLocaleString()}
                        </span>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {auction.totalBids || 0} bids
                        </span>
                      </div>

                      {selectedAuction === auction.id ? (
                        <div className="space-y-3">
                          <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder={`Min: $${((auction.currentBid || 0) + (auction.minimumBidIncrement || 100)).toLocaleString()}`}
                            className={`w-full px-4 py-2 rounded-lg ${
                              isDarkMode 
                                ? 'bg-slate-700 text-white border-slate-600' 
                                : 'bg-white text-gray-900 border-gray-300'
                            } border focus:ring-2 focus:ring-purple-500`}
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => placeBid(auction.id)}
                              disabled={placingBid}
                              className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                            >
                              {placingBid ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                  Placing...
                                </>
                              ) : (
                                <>
                                  <ArrowUp size={16} className="mr-2" />
                                  Place Bid
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => setSelectedAuction(null)}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                isDarkMode 
                                  ? 'bg-slate-700 text-white hover:bg-slate-600' 
                                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                              }`}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedAuction(auction.id);
                              setBidAmount(((auction.currentBid || 0) + (auction.minimumBidIncrement || 100)).toString());
                            }}
                            className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
                          >
                            <Gavel size={16} className="mr-2" />
                            Bid Now
                          </button>
                          <button
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              isDarkMode 
                                ? 'bg-slate-700 text-white hover:bg-slate-600' 
                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                            }`}
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Reserve Price Status */}
                    {auction.reservePrice && (
                      <div className={`mt-3 text-sm flex items-center ${
                        auction.currentBid >= auction.reservePrice
                          ? 'text-green-500'
                          : 'text-yellow-500'
                      }`}>
                        {auction.currentBid >= auction.reservePrice ? (
                          <>
                            <Trophy size={16} className="mr-2" />
                            Reserve Met
                          </>
                        ) : (
                          <>
                            <AlertCircle size={16} className="mr-2" />
                            Reserve Not Met
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveAuctions;