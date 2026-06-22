'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Eye, History, Gavel, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
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
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function AuctionsContent() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('live');
  const [liveAuctions, setLiveAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuctions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (activeTab === 'live') {
        const res = await auctionsAPI.getLive();
        setLiveAuctions(res.data.auctions || res.data?.data || []);
      } else if (activeTab === 'upcoming') {
        const res = await auctionsAPI.getUpcoming();
        setUpcomingAuctions(res.data.auctions || res.data?.data || []);
      }
    } catch (err) {
      console.error('Error fetching auctions:', err);
      setError('Failed to load auctions');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchAuctions();
  }, [fetchAuctions]);

  const totalBids = liveAuctions.reduce((t, a) => t + (a.totalBids || 0), 0);
  const activeBidders = liveAuctions.reduce((t, a) => t + (a.uniqueBidders || 0), 0);

  const stats = [
    { Icon: Gavel, label: 'Live Auctions', value: liveAuctions.length, color: isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600' },
    { Icon: Calendar, label: 'Upcoming', value: upcomingAuctions.length, color: isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600' },
    { Icon: TrendingUp, label: 'Total Bids', value: totalBids, color: isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600' },
    { Icon: Eye, label: 'Active Bidders', value: activeBidders, color: isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600' },
  ];

  const card = isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg';

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-white'
      } pt-24 transition-colors duration-300`}
    >
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Gem Auctions
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Discover and bid on the world&apos;s most exceptional gemstones. Each gem is thoroughly authenticated and
            certified by leading gemological laboratories.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className={`flex space-x-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            {[
              ['live', 'Live Auctions'],
              ['upcoming', 'Upcoming Auctions'],
              ['past', 'Past Results'],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-4 px-4 text-sm font-medium ${
                  activeTab === key
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map(({ Icon, label, value, color }) => (
              <div key={label} className={`${card} rounded-xl p-4`}>
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4" />
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Loading auctions...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
                <p className={`text-lg ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
                <button
                  onClick={fetchAuctions}
                  className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Live */}
          {activeTab === 'live' && !loading && !error && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Live Auctions</h2>
                <Link
                  href="/live-auctions"
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
                >
                  View All Live
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>

              {liveAuctions.length === 0 ? (
                <EmptyState Icon={Gavel} title="No Live Auctions" text="Check back soon for upcoming auctions" isDarkMode={isDarkMode} />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {liveAuctions.slice(0, 6).map((auction) => (
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
                      </div>
                      <div className="p-4">
                        <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{auction.title}</h3>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Bid:</span>
                            <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              ${Number(auction.currentBid || 0).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time Left:</span>
                            <div className={`font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              <Clock size={16} className="mr-1" />
                              {formatTimeRemaining(auction.endTime)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {auction.totalBids || 0} bids
                          </span>
                          <Link href="/live-auctions" className="text-purple-400 hover:text-purple-300 flex items-center text-sm">
                            Bid Now
                            <ArrowRight size={16} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Upcoming */}
          {activeTab === 'upcoming' && !loading && !error && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Auctions</h2>
              {upcomingAuctions.length === 0 ? (
                <EmptyState Icon={Calendar} title="No Upcoming Auctions" text="New auctions will be announced soon" isDarkMode={isDarkMode} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingAuctions.map((auction) => (
                    <div key={auction.id} className={`rounded-xl overflow-hidden ${card}`}>
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={auction.gem?.mainImage || auction.gem?.images?.[0] || PLACEHOLDER}
                          alt={auction.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                          {auction.status === 'draft' ? 'Draft' : 'Scheduled'}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{auction.title}</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Starting Bid</div>
                            <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                              ${Number(auction.startingPrice || 0).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Start Date</div>
                            <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                              {auction.startTime ? new Date(auction.startTime).toLocaleDateString() : '—'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            {auction.gem?.category?.name || 'Gemstone'}
                          </span>
                          <span className="text-purple-400 flex items-center">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Past */}
          {activeTab === 'past' && !loading && !error && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Past Auction Results</h2>
              <EmptyState Icon={History} title="Coming Soon" text="Past auction results will be available here" isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ Icon, title, text, isDarkMode }) {
  return (
    <div className={`text-center py-16 ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'} rounded-xl`}>
      <Icon className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
      <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{text}</p>
    </div>
  );
}

export default function AuctionsPage() {
  return (
    <Protected>
      <AuctionsContent />
    </Protected>
  );
}
