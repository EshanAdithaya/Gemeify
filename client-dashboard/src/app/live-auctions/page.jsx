'use client';

import { useState, useEffect, useCallback } from 'react';
import { Gavel, Eye, Timer, Trophy, AlertCircle, Users, ArrowUp, X } from 'lucide-react';
import { auctionsAPI } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import Protected from '@/components/Protected';
import OptimizedImage from '@/components/OptimizedImage';
import { Skeleton } from '@/components/Skeleton';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';

function formatTime(endTime) {
  const diff = new Date(endTime) - new Date();
  if (diff <= 0) return 'Ended';
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function LiveAuctionsContent() {
  const { toast } = useToast();
  const [auctions, setAuctions]           = useState([]);
  const [selectedAuction, setSelected]    = useState(null);
  const [bidAmount, setBidAmount]         = useState('');
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [placingBid, setPlacingBid]       = useState(false);
  const [tick, setTick]                   = useState(0);

  const fetch = useCallback(async () => {
    try {
      const res = await auctionsAPI.getLive();
      setAuctions(res.data.auctions || res.data?.data || []);
      setError(null);
    } catch {
      setError('Unable to load live auctions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const poll = setInterval(fetch, 30000);
    const clock = setInterval(() => setTick((t) => t + 1), 1000);
    return () => { clearInterval(poll); clearInterval(clock); };
  }, [fetch]);

  const placeBid = async (auctionId) => {
    if (!bidAmount || isNaN(Number(bidAmount))) {
      toast('Please enter a valid bid amount', 'error');
      return;
    }
    setPlacingBid(true);
    try {
      await auctionsAPI.placeBid(auctionId, { amount: parseFloat(bidAmount) });
      await fetch();
      setBidAmount('');
      setSelected(null);
      toast('Bid placed successfully', 'success');
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to place bid', 'error');
    } finally {
      setPlacingBid(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-48 shimmer bg-slate-100 rounded-sm mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {[0,1,2].map((i) => <Skeleton key={i} className="h-80 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={32} className="text-red-400 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">{error}</p>
          <button onClick={() => { setLoading(true); fetch(); }} className="btn-gold">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-28 pb-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="flex items-start justify-between mb-10">
          <div>
            <p className="section-label mb-1">Private Auction House</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Live Auctions
            </h1>
            <p className="text-sm text-slate-500 mt-2">Real-time bidding on investment-grade gemstones</p>
          </div>
          {auctions.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 border border-red-500/30 rounded-sm"
              style={{ background: 'rgba(239,68,68,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-red-400">{auctions.length} Live</span>
            </div>
          )}
        </header>

        {auctions.length === 0 ? (
          <div className="luxury-card p-16 text-center">
            <Gavel size={32} className="text-royal-700 mx-auto mb-4" />
            <p className="text-xl font-bold text-slate-600 mb-2">
              No Active Auctions
            </p>
            <p className="text-sm text-slate-400">Private auction events are announced to verified members.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {auctions.map((auction) => {
              const nextBid    = (Number(auction.currentBid) || 0) + (Number(auction.minimumBidIncrement) || 100);
              const reserveMet = auction.reservePrice && auction.currentBid >= auction.reservePrice;
              const isSelected = selectedAuction === auction.id;

              return (
                <article key={auction.id} className="luxury-card overflow-hidden group">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <OptimizedImage
                      src={auction.gem?.mainImage || auction.gem?.images?.[0] || PLACEHOLDER}
                      alt={auction.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 to-transparent" />

                    {/* LIVE badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 border border-red-500/40 rounded-sm"
                      style={{ background: 'rgba(239,68,68,0.15)', backdropFilter: 'blur(8px)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-red-400">Live</span>
                    </div>

                    {/* Bidders */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>
                      <Users size={11} className="text-slate-500" />
                      <span className="text-[10px] text-slate-500">{auction.uniqueBidders || 0}</span>
                    </div>

                    {/* Timer overlay */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}>
                      <Timer size={11} className="text-royal-700" />
                      <span className="text-[11px] font-mono font-bold text-slate-700">{formatTime(auction.endTime)}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {auction.gem?.category?.name && (
                      <p className="section-label mb-1.5">{auction.gem.category.name}</p>
                    )}
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {auction.title}
                    </h3>
                    {auction.description && (
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                        {auction.description}
                      </p>
                    )}

                    {/* Bid / Time grid */}
                    <div className="grid grid-cols-2 gap-2.5 mb-4">
                      <div className="luxury-card p-3">
                        <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">Current Bid</p>
                        <p className="text-lg font-bold text-gold-gradient">
                          ${Number(auction.currentBid || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="luxury-card p-3">
                        <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">Total Bids</p>
                        <p className="text-lg font-bold text-slate-800">
                          {auction.totalBids || 0}
                        </p>
                      </div>
                    </div>

                    {/* Gem specs */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4 text-xs">
                      {[
                        ['Weight',  auction.gem?.weight ? `${auction.gem.weight} ct` : '—'],
                        ['Origin',  auction.gem?.origin  || '—'],
                        ['Cut',     auction.gem?.cut      || '—'],
                        ['Clarity', auction.gem?.clarity  || '—'],
                      ].map(([l, v]) => (
                        <div key={l} className="flex gap-1.5">
                          <span className="text-slate-400">{l}:</span>
                          <span className="text-slate-600">{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* Reserve status */}
                    {auction.reservePrice && (
                      <div className={`flex items-center gap-1.5 text-[11px] font-semibold mb-3 ${reserveMet ? 'text-emerald-400' : 'text-amber-500'}`}>
                        <Trophy size={12} />
                        {reserveMet ? 'Reserve Price Met' : 'Reserve Not Yet Met'}
                      </div>
                    )}

                    {/* Bid interface */}
                    {isSelected ? (
                      <div className="space-y-2.5">
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder={`Min $${nextBid.toLocaleString()}`}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-royal-400 transition-colors"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => placeBid(auction.id)}
                            disabled={placingBid}
                            className="flex-1 btn-gold py-2 flex items-center justify-center gap-1.5 text-xs disabled:opacity-50"
                          >
                            <ArrowUp size={12} />
                            {placingBid ? 'Placing…' : 'Place Bid'}
                          </button>
                          <button
                            onClick={() => setSelected(null)}
                            className="px-3 py-2 border border-slate-200 text-slate-500 hover:text-slate-600 rounded-sm transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setSelected(auction.id); setBidAmount(String(nextBid)); }}
                          className="flex-1 btn-gold py-2 text-xs flex items-center justify-center gap-1.5"
                        >
                          <Gavel size={12} /> Bid Now
                        </button>
                        <button
                          className="px-3 py-2 btn-outline-gold text-xs"
                          title="Watch"
                          aria-label="Watch auction"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    )}

                    <p className="text-center text-[10px] text-slate-300 mt-2">
                      Next bid: ${nextBid.toLocaleString()}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default function LiveAuctionsPage() {
  return (
    <Protected>
      <LiveAuctionsContent />
    </Protected>
  );
}
