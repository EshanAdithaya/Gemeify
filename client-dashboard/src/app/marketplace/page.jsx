'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Search, SlidersHorizontal, X, Heart, Star,
  ChevronDown, Shield, Eye, GitCompare,
} from 'lucide-react';
import { gemsAPI } from '@/lib/api';
import { useCompare } from '@/context/CompareContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Protected from '@/components/Protected';
import GemDetailModal from '@/components/GemDetailModal';
import CompareTray from '@/components/CompareTray';
import RecentlyViewed from '@/components/RecentlyViewed';
import OptimizedImage from '@/components/OptimizedImage';
import { GemGridSkeleton } from '@/components/Skeleton';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=800&q=80';

const FILTERS = {
  categories:    ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl', 'Other'],
  certification: ['GIA', 'IGI', 'AGS', 'GRS', 'Gubelin'],
  cut:           ['Round', 'Oval', 'Cushion', 'Princess', 'Emerald Cut'],
  clarity:       ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2'],
  treatment:     ['Heated', 'No Heat', 'Minor', 'None'],
};

function normalizeGem(g) {
  const price         = Number(g.price)         || 0;
  const originalPrice = Number(g.originalPrice) || 0;
  return {
    id:               g.id,
    slug:             g.slug,
    name:             g.name,
    category:         g.category?.name || 'Gemstone',
    price,
    certification:    g.certificationLab || '—',
    cut:              g.cut,
    clarity:          g.clarity,
    color:            g.color,
    treatment:        g.treatment || 'None',
    weight:           g.weight,
    origin:           g.origin,
    mainImage:        g.mainImage || (Array.isArray(g.images) ? g.images[0] : null) || PLACEHOLDER,
    additionalImages: Array.isArray(g.images) ? g.images : [],
    description:      g.description,
    rating:           Number(g.rating) || 0,
    views:            g.views || 0,
    discount:         originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
    availability:     g.isActive !== false && (g.quantity ?? 1) > 0 && g.status !== 'sold' ? 'Available' : 'Sold',
    createdAt:        g.createdAt,
  };
}

function CheckboxRow({ option, selected, onChange }) {
  const on = selected.includes(option);
  return (
    <label className={`flex items-center gap-3 cursor-pointer text-sm transition-colors py-1 ${on ? 'text-gold-400' : 'text-pearl-500 hover:text-gold-400'}`}>
      <span className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors ${on ? 'border-gold-500 bg-gold-500' : 'border-pearl-600'}`}>
        {on && (
          <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2">
            <path d="M1 4l3 3 5-6" stroke="#0A0908" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      <input type="checkbox" checked={on} onChange={() => onChange(on ? selected.filter((i) => i !== option) : [...selected, option])} className="sr-only" />
      <span>{option}</span>
    </label>
  );
}

function FilterSection({ title, options, selected, onChange }) {
  return (
    <div className="py-4 border-b border-gold-900/25">
      <h3 className="text-[10px] font-bold tracking-widest uppercase text-pearl-500 mb-3">{title}</h3>
      <div className="space-y-0.5">
        {options.map((o) => <CheckboxRow key={o} option={o} selected={selected} onChange={onChange} />)}
      </div>
    </div>
  );
}

function FilterSidebar({ priceRange, setPriceRange, selectedCategories, setSelectedCategories, selectedCertifications, setSelectedCertifications, selectedCuts, setSelectedCuts, selectedClarity, setSelectedClarity, selectedTreatments, setSelectedTreatments }) {
  return (
    <div className="space-y-0">
      <div className="pb-4 border-b border-gold-900/25">
        <h3 className="text-[10px] font-bold tracking-widest uppercase text-pearl-500 mb-4">Investment Value</h3>
        <input type="range" min="0" max="50000" step="1000" value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
          className="w-full accent-gold-500" />
        <div className="flex justify-between mt-2 text-xs font-bold">
          <span className="text-pearl-500">${priceRange[0].toLocaleString()}</span>
          <span className="text-gold-500">${priceRange[1].toLocaleString()}</span>
        </div>
      </div>
      <FilterSection title="Stone Type"    options={FILTERS.categories}    selected={selectedCategories}    onChange={setSelectedCategories} />
      <FilterSection title="Certification" options={FILTERS.certification}  selected={selectedCertifications} onChange={setSelectedCertifications} />
      <FilterSection title="Cut"           options={FILTERS.cut}           selected={selectedCuts}           onChange={setSelectedCuts} />
      <FilterSection title="Clarity"       options={FILTERS.clarity}       selected={selectedClarity}        onChange={setSelectedClarity} />
      <FilterSection title="Treatment"     options={FILTERS.treatment}     selected={selectedTreatments}     onChange={setSelectedTreatments} />
    </div>
  );
}

function MarketplaceContent() {
  const { toggleCompare, isComparing, canAddMore, recordView } = useCompare();
  const { toast } = useToast();
  const { has: inWishlist, toggle: toggleWishlist } = useWishlist();
  const { addItem, setOpen: setCartOpen } = useCart();

  const [filterOpen, setFilterOpen]   = useState(false);
  const [selectedSort, setSelectedSort] = useState('Featured');
  const [gems, setGems]               = useState([]);
  const [isLoading, setIsLoading]     = useState(true);
  const [error, setError]             = useState(null);
  const [searchTerm, setSearchTerm]   = useState('');
  const [selectedGem, setSelectedGem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [priceRange, setPriceRange]                             = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories]             = useState([]);
  const [selectedCertifications, setSelectedCertifications]     = useState([]);
  const [selectedCuts, setSelectedCuts]                         = useState([]);
  const [selectedClarity, setSelectedClarity]                   = useState([]);
  const [selectedTreatments, setSelectedTreatments]             = useState([]);

  useEffect(() => {
    const fetchGems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res  = await gemsAPI.getAll(1, 60);
        const list = res.data?.data?.data || res.data?.data || [];
        setGems(list.map(normalizeGem));
      } catch {
        setError('Failed to load gems. Please make sure the backend API is running.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchGems();
  }, []);

  useEffect(() => {
    if (filterOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [filterOpen]);

  const filteredGems = useMemo(() => {
    let f = [...gems];
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      f = f.filter((g) => g.name?.toLowerCase().includes(t) || g.category?.toLowerCase().includes(t) || g.description?.toLowerCase().includes(t));
    }
    if (selectedCategories.length)     f = f.filter((g) => selectedCategories.includes(g.category));
    f = f.filter((g) => g.price >= priceRange[0] && g.price <= priceRange[1]);
    if (selectedCertifications.length) f = f.filter((g) => selectedCertifications.includes(g.certification));
    if (selectedCuts.length)           f = f.filter((g) => selectedCuts.includes(g.cut));
    if (selectedClarity.length)        f = f.filter((g) => selectedClarity.includes(g.clarity));
    if (selectedTreatments.length)     f = f.filter((g) => selectedTreatments.includes(g.treatment));

    switch (selectedSort) {
      case 'Price: Low to High': f.sort((a, b) => a.price - b.price); break;
      case 'Price: High to Low': f.sort((a, b) => b.price - a.price); break;
      case 'Newest':             f.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      case 'Most Popular':       f.sort((a, b) => (b.views || 0) - (a.views || 0)); break;
    }
    return f;
  }, [gems, searchTerm, selectedSort, priceRange, selectedCategories, selectedCertifications, selectedCuts, selectedClarity, selectedTreatments]);

  const handleGemClick = (gem) => { setSelectedGem(gem); setIsModalOpen(true); recordView(gem); };

  const handlePurchase = (e, gem) => {
    e.stopPropagation();
    if (gem.availability !== 'Available') { toast('This gem is no longer available', 'info'); return; }
    addItem(gem, 1);
    setCartOpen(true);
    toast(`${gem.name} added to cart`, 'success');
  };

  const handleCompare = (e, gem) => {
    e.stopPropagation();
    const was = isComparing(gem.id);
    if (!was && !canAddMore) { toast('You can compare up to 4 gems at once', 'info'); return; }
    toggleCompare(gem);
    toast(was ? `Removed ${gem.name} from comparison` : `Added ${gem.name} to comparison`, 'success');
  };

  const filterProps = { priceRange, setPriceRange, selectedCategories, setSelectedCategories, selectedCertifications, setSelectedCertifications, selectedCuts, setSelectedCuts, selectedClarity, setSelectedClarity, selectedTreatments, setSelectedTreatments };

  if (error) {
    return (
      <div className="min-h-screen bg-obsidian-950 pt-32 flex items-center justify-center px-4">
        <div className="luxury-card p-8 sm:p-10 text-center max-w-sm w-full">
          <p className="text-sm text-pearl-400 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-gold w-full">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-950 pt-16">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="border-b border-gold-900/25 px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-1.5">Private Marketplace</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pearl-50 leading-tight">
              Investment Gemstones
            </h1>
            {/* Search — full width on mobile */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-pearl-500" />
              <input
                type="text"
                placeholder="Search sapphires, rubies, diamonds…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-sm pl-9 pr-4 py-3 sm:py-2.5 text-sm focus:outline-none border border-gold-900/30 bg-obsidian-900 text-pearl-100 placeholder-pearl-600 focus:border-gold-600/60 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex gap-8 lg:gap-10">

        {/* ── Desktop sidebar ─────────────────────────────────────────── */}
        <div className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-24">
            <p className="section-label mb-4">Refine</p>
            <FilterSidebar {...filterProps} />
          </div>
        </div>

        {/* ── Main content ────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <RecentlyViewed onSelect={handleGemClick} />

          {/* Sort + filter bar — sticky on mobile */}
          <div className="sticky top-16 z-20 bg-obsidian-950/95 backdrop-blur-sm -mx-4 sm:mx-0 px-4 sm:px-0 py-3 border-b border-gold-900/25 flex items-center justify-between gap-3 mb-5">
            <p className="text-xs text-pearl-500 font-bold">
              <span className="text-pearl-100">{filteredGems.length}</span> gems
            </p>
            <div className="flex items-center gap-2">
              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="appearance-none px-3 py-2 pr-7 text-xs font-bold rounded-sm border border-gold-900/30 bg-obsidian-900 text-pearl-100 focus:outline-none focus:border-gold-600/60 transition-colors"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                  <option>Newest</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-3 w-3 pointer-events-none text-pearl-500" />
              </div>
              {/* Filter button — mobile only */}
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-gold-900/30 rounded-sm text-xs font-bold text-pearl-300 hover:text-gold-400 hover:border-gold-700/50 transition-colors"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
            </div>
          </div>

          {/* Gem grid */}
          {isLoading ? (
            <GemGridSkeleton count={6} />
          ) : filteredGems.length === 0 ? (
            <div className="luxury-card py-16 text-center">
              <p className="text-sm text-pearl-500">No gems match your current filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {filteredGems.map((gem) => (
                <div key={gem.id} onClick={() => handleGemClick(gem)}
                  className="luxury-card overflow-hidden group cursor-pointer">
                  {/* Image */}
                  <div className="relative">
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <OptimizedImage
                        src={gem.mainImage}
                        alt={gem.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 to-transparent" />

                    {/* Wishlist */}
                    <button onClick={(e) => { e.stopPropagation(); toggleWishlist(gem); }}
                      aria-label={inWishlist(gem.id) ? 'Remove from wishlist' : 'Save to wishlist'}
                      className="absolute top-3 right-3 p-2 bg-obsidian-950/60 backdrop-blur-sm rounded-sm hover:bg-obsidian-950/80 transition-colors">
                      <Heart size={16} className={inWishlist(gem.id) ? 'text-red-400 fill-red-400' : 'text-pearl-300'} />
                    </button>

                    {/* Compare */}
                    <button onClick={(e) => handleCompare(e, gem)}
                      disabled={!isComparing(gem.id) && !canAddMore}
                      aria-label="Compare"
                      className={`absolute bottom-3 left-3 p-2 backdrop-blur-sm rounded-sm transition-colors disabled:opacity-40 ${
                        isComparing(gem.id) ? 'bg-gold-500 text-obsidian-950' : 'bg-obsidian-950/60 text-pearl-300 hover:bg-obsidian-950/80'
                      }`}>
                      <GitCompare size={14} />
                    </button>

                    {gem.discount > 0 && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold tracking-wider bg-gold-gradient text-obsidian-950 rounded-sm">
                        -{gem.discount}%
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gold-500">{gem.category}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                        <span className="text-xs text-pearl-500">{gem.rating ? gem.rating.toFixed(1) : '4.8'}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-pearl-100 mb-1 leading-snug">{gem.name}</h3>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mb-3 text-xs">
                      {[['Weight', `${gem.weight} ct`], ['Cut', gem.cut], ['Origin', gem.origin], ['Treatment', gem.treatment]].map(([lbl, val]) => (
                        <div key={lbl}>
                          <span className="text-pearl-600">{lbl}: </span>
                          <span className="text-pearl-300">{val || '—'}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-end justify-between pt-3 border-t border-gold-900/25 mb-3">
                      <div>
                        <p className="text-[9px] font-bold tracking-widest uppercase text-pearl-600 mb-0.5">Price</p>
                        <p className="text-lg font-bold text-gold-gradient">${gem.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center gap-1 text-[10px] font-bold tracking-wider mb-0.5 ${gem.availability === 'Available' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          <Shield size={10} />{gem.certification}
                        </div>
                        <p className={`text-[10px] font-bold ${gem.availability === 'Available' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {gem.availability}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons — 44px touch targets */}
                    <div className="flex gap-2">
                      <button onClick={(e) => handlePurchase(e, gem)}
                        className="flex-1 btn-gold text-xs py-2.5">
                        Acquire
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleGemClick(gem); }}
                        aria-label="View details"
                        className="p-2.5 rounded-sm border border-gold-900/30 text-pearl-400 hover:text-gold-400 hover:border-gold-600/40 transition-colors">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter — bottom sheet ────────────────────────────────── */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${filterOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-obsidian-950/70 backdrop-blur-sm transition-opacity duration-300 ${filterOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setFilterOpen(false)} />
        <div className={`absolute inset-x-0 bottom-0 bg-obsidian-950 border-t border-gold-900/30 rounded-t-xl max-h-[80vh] overflow-y-auto transition-transform duration-300 ${filterOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-pearl-700" />
          </div>
          <div className="flex items-center justify-between px-5 py-4 border-b border-gold-900/25">
            <p className="section-label">Refine Results</p>
            <button onClick={() => setFilterOpen(false)} className="p-1.5 text-pearl-500 hover:text-gold-400 transition-colors">
              <X size={18} />
            </button>
          </div>
          <div className="px-5 pb-8">
            <FilterSidebar {...filterProps} />
          </div>
          <div className="sticky bottom-0 bg-obsidian-950 border-t border-gold-900/25 p-4">
            <button onClick={() => setFilterOpen(false)} className="btn-gold w-full py-3">
              Show {filteredGems.length} Gems
            </button>
          </div>
        </div>
      </div>

      {selectedGem && (
        <GemDetailModal gem={selectedGem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      <CompareTray />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Protected>
      <MarketplaceContent />
    </Protected>
  );
}
