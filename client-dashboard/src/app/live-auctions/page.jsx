'use client';

import { useState, useEffect, useCallback } from 'react';
import { Gavel, Eye, Heart, ArrowUp, Timer, Trophy, AlertCircle, DollarSign, Users } from 'lucide-react';
import { auctionsAPI } from '@/lib/api';
import { useTheme } from '@/context/ThemeContext';
import Protected from '@/components/Protected';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';

function formatTimeRemaining(endTime) {
  const diff = new Date(endTime) - new Date();
  if (diff <= 0) return 'Ended';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function LiveAuctionsContent() {
  const { isDarkMode } = useTheme();
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placingBid, setPlacingBid] = useState(false);

  const fetchLiveAuctions = useCallback(async () => {
    try {
      const res = await auctionsAPI.getLive();
      setAuctions(res.data.auctions || res.data?.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching live auctions:', err);
      setError('Failed to load live auctions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveAuctions();
    const interval = setInterval(fetchLiveAuctions, 30000);
    return () => clearInterval(interval);
  }, [fetchLiveAuctions]);

  const placeBid = async (auctionId) => {
    if (!bidAmount || Number.isNaN(Number(bidAmount))) {
      alert('Please enter a valid bid amount');
      return;
    }
    try {
      setPlacingBid(true);
      await auctionsAPI.placeBid(auctionId, { amount: parseFloat(bidAmount) });
      await fetchLiveAuctions();
      setBidAmount('');
      setSelectedAuction(null);
      alert('Bid placed successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place bid');
    } finally {
      setPlacingBid(false);
    }
  };

  const pageBg = isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-white';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4" />
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Loading live auctions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
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

  const card = isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg';
  const muted = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${pageBg} pt-24 transition-colors duration-300`}>
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Gavel className="w-8 h-8 mr-3 text-purple-500" />
              Live Auctions
            </h1>
            <p className={muted}>Real-time bidding on premium gemstones</p>
          </div>
          <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'}`}>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium">{auctions.length} Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {auctions.length === 0 ? (
            <div className={`text-center py-16 ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'} rounded-xl`}>
              <Gavel className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No Live Auctions</h3>
              <p className={muted}>Check back soon for upcoming auctions</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {auctions.map((auction) => {
                const nextBid = (Number(auction.currentBid) || 0) + (Number(auction.minimumBidIncrement) || 100);
                return (
                  <div key={auction.id} className={`${card} rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300`}>
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={auction.gem?.mainImage || auction.gem?.images?.[0] || PLACEHOLDER}
                        alt={auction.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm rounded-full flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
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

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-purple-400 text-sm font-medium">{auction.gem?.category?.name || 'Gemstone'}</span>
                        <div className="flex items-center text-sm text-gray-400">
                          <Users size={16} className="mr-1" />
                          {auction.uniqueBidders || 0}
                        </div>
                      </div>

                      <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{auction.title}</h3>
                      <p className={`text-sm mb-4 ${muted}`}>
                        {auction.description ? `${auction.description.substring(0, 100)}...` : ''}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                          <div className={`text-sm ${muted}`}>Current Bid</div>
                          <div className={`text-lg font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <DollarSign size={18} className="mr-1" />
                            {Number(auction.currentBid || 0).toLocaleString()}
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                          <div className={`text-sm ${muted}`}>Time Left</div>
                          <div className={`text-lg font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <Timer size={18} className="mr-1" />
                            {formatTimeRemaining(auction.endTime)}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                        {[
                          ['Weight', auction.gem?.weight ? `${auction.gem.weight} ct` : '—'],
                          ['Origin', auction.gem?.origin || '—'],
                          ['Cut', auction.gem?.cut || '—'],
                          ['Clarity', auction.gem?.clarity || '—'],
                        ].map(([label, value]) => (
                          <div key={label}>
                            <span className={muted}>{label}:</span>
                            <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${muted}`}>Next Bid: ${nextBid.toLocaleString()}</span>
                          <span className={`text-sm ${muted}`}>{auction.totalBids || 0} bids</span>
                        </div>

                        {selectedAuction === auction.id ? (
                          <div className="space-y-3">
                            <input
                              type="number"
                              value={bidAmount}
                              onChange={(e) => setBidAmount(e.target.value)}
                              placeholder={`Min: $${nextBid.toLocaleString()}`}
                              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 ${
                                isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-900 border-gray-300'
                              }`}
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => placeBid(auction.id)}
                                disabled={placingBid}
                                className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                              >
                                {placingBid ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
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
                                  isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
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
                                setBidAmount(String(nextBid));
                              }}
                              className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
                            >
                              <Gavel size={16} className="mr-2" />
                              Bid Now
                            </button>
                            <button
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                              }`}
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        )}
                      </div>

                      {auction.reservePrice ? (
                        <div
                          className={`mt-3 text-sm flex items-center ${
                            auction.currentBid >= auction.reservePrice ? 'text-green-500' : 'text-yellow-500'
                          }`}
                        >
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
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LiveAuctionsPage() {
  return (
    <Protected>
      <LiveAuctionsContent />
    </Protected>
  );
}
