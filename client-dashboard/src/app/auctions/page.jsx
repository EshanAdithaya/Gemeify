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

function EmptyState({ Icon, title, text, isDarkMode }) {
  return (
    <div className="luxury-card py-20 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-sm border border-gold-700/30 flex items-center justify-center mb-5"
        style={{ background: 'rgba(212,175,55,0.06)' }}>
        <Icon className="w-8 h-8 text-gold-600" />
      </div>
      <h3 className={`font-display text-xl font-medium mb-2 ${isDarkMode ? 'text-pearl-100' : 'text-obsidian-900'}`}
        style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
        {title}
      </h3>
      <p className={`text-sm ${isDarkMode ? 'text-pearl-500' : 'text-obsidian-500'}`}>{text}</p>
    </div>
  );
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
    } catch {
      setError('Failed to load auctions');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { fetchAuctions(); }, [fetchAuctions]);

  const totalBids    = liveAuctions.reduce((t, a) => t + (a.totalBids    || 0), 0);
  const activeBidders = liveAuctions.reduce((t, a) => t + (a.uniqueBidders || 0), 0);

  const dark    = isDarkMode;
  const subText = dark ? 'text-pearl-400' : 'text-obsidian-500';
  const divider = dark ? 'border-gold-900/25' : 'border-gold-700/15';
  const pageBg  = dark ? 'bg-obsidian-950' : 'bg-pearl-100';

  const STATS = [
    { Icon: Gavel,     label: 'Live Auctions', value: liveAuctions.length    },
    { Icon: Calendar,  label: 'Upcoming',       value: upcomingAuctions.length },
    { Icon: TrendingUp,label: 'Total Bids',     value: totalBids               },
    { Icon: Eye,       label: 'Active Bidders', value: activeBidders            },
  ];

  return (
    <div className={`min-h-screen ${pageBg} pt-24`}>
      {/* Header */}
      <div className={`border-b ${divider} px-6 lg:px-8 pb-10 pt-8`}>
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-3">Private Auction House</p>
          <h1 className={`font-display font-light leading-tight ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Gem Auctions
          </h1>
          <p className={`mt-3 max-w-xl ${subText}`}>
            Bid on the world&apos;s most exceptional certified gemstones.
            Every lot authenticated by leading gemological laboratories.
          </p>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ Icon, label, value }) => (
              <div key={label} className="luxury-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-sm border border-gold-700/30 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,175,55,0.08)' }}>
                  <Icon size={18} className="text-gold-500" />
                </div>
                <div>
                  <p className={`text-xs font-semibold tracking-widest uppercase ${subText}`}>{label}</p>
                  <p className="font-display text-2xl font-semibold text-gold-gradient"
                    style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className={`flex gap-0 border-b ${divider}`}>
            {[['live','Live Auctions'], ['upcoming','Upcoming'], ['past','Past Results']].map(([key, label]) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`px-5 py-3 text-[11px] font-semibold tracking-widest uppercase border-b-2 -mb-px transition-colors ${
                  activeTab === key
                    ? 'border-gold-500 text-gold-500'
                    : `border-transparent ${subText} hover:text-gold-400`
                }`}>
                {label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-2 border-gold-700/30 border-t-gold-500 rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="luxury-card p-10 flex flex-col items-center text-center">
              <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
              <p className={`text-sm ${subText} mb-4`}>{error}</p>
              <button onClick={fetchAuctions} className="btn-gold">Retry</button>
            </div>
          )}

          {/* Live */}
          {activeTab === 'live' && !loading && !error && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`font-display text-2xl font-light ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
                  style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                  Live Auctions
                </h2>
                <Link href="/live-auctions" className="btn-gold text-sm">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
              {liveAuctions.length === 0 ? (
                <EmptyState Icon={Gavel} title="No Live Auctions" text="Check back soon for upcoming auctions" isDarkMode={dark} />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                  {liveAuctions.slice(0, 6).map((auction) => (
                    <div key={auction.id} className="luxury-card overflow-hidden group">
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={auction.gem?.mainImage || auction.gem?.images?.[0] || PLACEHOLDER}
                          alt={auction.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 to-transparent" />
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase rounded-sm">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          LIVE
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className={`font-display text-lg font-medium mb-3 ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}
                          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                          {auction.title}
                        </h3>
                        <div className={`grid grid-cols-2 gap-3 mb-4 pb-4 border-b ${divider}`}>
                          <div>
                            <p className={`text-[10px] font-semibold tracking-widest uppercase mb-0.5 ${subText}`}>Current Bid</p>
                            <p className="font-display text-xl font-semibold text-gold-gradient"
                              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                              ${Number(auction.currentBid || 0).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className={`text-[10px] font-semibold tracking-widest uppercase mb-0.5 ${subText}`}>Time Left</p>
                            <p className={`font-semibold flex items-center gap-1.5 ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}>
                              <Clock size={14} className="text-gold-500" />
                              {formatTimeRemaining(auction.endTime)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className={`text-[11px] ${subText}`}>{auction.totalBids || 0} bids placed</p>
                          <Link href="/live-auctions"
                            className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-gold-500 hover:text-gold-300 transition-colors">
                            Bid Now <ArrowRight size={12} />
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
              <h2 className={`font-display text-2xl font-light mb-6 ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                Upcoming Auctions
              </h2>
              {upcomingAuctions.length === 0 ? (
                <EmptyState Icon={Calendar} title="No Upcoming Auctions" text="New auctions will be announced soon" isDarkMode={dark} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {upcomingAuctions.map((auction) => (
                    <div key={auction.id} className="luxury-card overflow-hidden group">
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={auction.gem?.mainImage || auction.gem?.images?.[0] || PLACEHOLDER}
                          alt={auction.title}
                          className="w-full h-48 object-cover"
                        />
                        <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-gold-gradient text-obsidian-950 rounded-sm">
                          {auction.status === 'draft' ? 'Draft' : 'Scheduled'}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className={`font-display text-xl font-medium mb-3 ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}
                          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                          {auction.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                            <p className={`text-[10px] font-semibold tracking-widest uppercase ${subText}`}>Starting Bid</p>
                            <p className={`font-semibold ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}>
                              ${Number(auction.startingPrice || 0).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className={`text-[10px] font-semibold tracking-widest uppercase ${subText}`}>Start Date</p>
                            <p className={`font-semibold ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}>
                              {auction.startTime ? new Date(auction.startTime).toLocaleDateString() : '—'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className={`text-[11px] ${subText}`}>{auction.gem?.category?.name || 'Gemstone'}</p>
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-gold-500">
                            View Details <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'past' && !loading && !error && (
            <div>
              <h2 className={`font-display text-2xl font-light mb-6 ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                Past Results
              </h2>
              <EmptyState Icon={History} title="Coming Soon" text="Past auction results will be available here" isDarkMode={dark} />
            </div>
          )}
        </div>
      </div>
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
