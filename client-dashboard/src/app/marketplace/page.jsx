'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, SlidersHorizontal, X, Heart, Star,
  ChevronDown, Shield, Eye, GitCompare, ArrowRight,
} from 'lucide-react';
import { gemsAPI } from '@/lib/api';
import { useTheme } from '@/context/ThemeContext';
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

function FilterSection({ title, options, selected, onChange, dark }) {
  const divider = dark ? 'border-gold-900/25' : 'border-gold-700/15';
  const subText = dark ? 'text-pearl-400' : 'text-obsidian-500';
  const head    = dark ? 'text-pearl-100' : 'text-obsidian-900';

  return (
    <div className={`py-4 border-b ${divider}`}>
      <h3 className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${subText}`}>{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option}
            className={`flex items-center gap-2.5 cursor-pointer text-sm transition-colors group ${
              selected.includes(option) ? 'text-gold-400' : `${subText} hover:text-gold-400`
            }`}>
            <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors ${
              selected.includes(option)
                ? 'border-gold-500 bg-gold-500'
                : dark ? 'border-pearl-600' : 'border-obsidian-400'
            }`}>
              {selected.includes(option) && (
                <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2">
                  <path d="M1 4l3 3 5-6" stroke="#0A0908" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <input type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(
                selected.includes(option)
                  ? selected.filter((i) => i !== option)
                  : [...selected, option]
              )}
              className="sr-only"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function MarketplaceContent() {
  const { isDarkMode } = useTheme();
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

  const [priceRange, setPriceRange]               = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [selectedCuts, setSelectedCuts]             = useState([]);
  const [selectedClarity, setSelectedClarity]       = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);

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

  const filteredGems = useMemo(() => {
    let f = [...gems];
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      f = f.filter((g) =>
        g.name?.toLowerCase().includes(t) ||
        g.category?.toLowerCase().includes(t) ||
        g.description?.toLowerCase().includes(t)
      );
    }
    if (selectedCategories.length)    f = f.filter((g) => selectedCategories.includes(g.category));
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

  const handleGemClick = (gem) => {
    setSelectedGem(gem);
    setIsModalOpen(true);
    recordView(gem);
  };

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

  const dark    = isDarkMode;
  const subText = dark ? 'text-pearl-400' : 'text-obsidian-500';
  const divider = dark ? 'border-gold-900/25' : 'border-gold-700/15';
  const pageBg  = dark ? 'bg-obsidian-950' : 'bg-pearl-100';

  if (error) {
    return (
      <div className={`min-h-screen ${pageBg} pt-32 flex items-center justify-center px-6`}>
        <div className="luxury-card p-10 text-center max-w-sm">
          <p className={`text-sm mb-4 ${subText}`}>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-gold">Retry</button>
        </div>
      </div>
    );
  }

  const sidebar = (
    <aside className="space-y-0">
      <div className={`pb-4 border-b ${divider}`}>
        <h3 className={`text-[10px] font-bold tracking-widest uppercase mb-4 ${subText}`}>Investment Value</h3>
        <input
          type="range" min="0" max="50000" step="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
          className="w-full accent-gold-500"
        />
        <div className="flex justify-between mt-2 text-xs font-semibold">
          <span className={subText}>${priceRange[0].toLocaleString()}</span>
          <span className="text-gold-500">${priceRange[1].toLocaleString()}</span>
        </div>
      </div>
      <FilterSection title="Stone Type"     options={FILTERS.categories}    selected={selectedCategories}    onChange={setSelectedCategories}    dark={dark} />
      <FilterSection title="Certification"  options={FILTERS.certification}  selected={selectedCertifications} onChange={setSelectedCertifications} dark={dark} />
      <FilterSection title="Cut"            options={FILTERS.cut}           selected={selectedCuts}           onChange={setSelectedCuts}           dark={dark} />
      <FilterSection title="Clarity"        options={FILTERS.clarity}       selected={selectedClarity}        onChange={setSelectedClarity}        dark={dark} />
      <FilterSection title="Treatment"      options={FILTERS.treatment}     selected={selectedTreatments}     onChange={setSelectedTreatments}     dark={dark} />
    </aside>
  );

  return (
    <div className={`min-h-screen ${pageBg} pt-24`}>
      {/* Header */}
      <div className={`border-b ${divider} px-6 lg:px-8 pb-8 pt-8`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-2">Private Marketplace</p>
            <h1 className={`font-display font-light leading-tight ${dark ? 'text-pearl-50' : 'text-obsidian-900'}`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Investment Gemstones
            </h1>
          </div>
          <div className="relative w-full md:w-80">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${subText}`} />
            <input
              type="text"
              placeholder="Search sapphires, rubies, diamonds…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-sm pl-9 pr-4 py-2.5 text-sm focus:outline-none border focus:border-gold-600/60 transition-colors ${
                dark
                  ? 'bg-obsidian-900 border-gold-900/30 text-pearl-100 placeholder-pearl-600'
                  : 'bg-white border-gold-700/20 text-obsidian-900 placeholder-obsidian-400'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex gap-10">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-28">
            <p className="section-label mb-4">Refine</p>
            {sidebar}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <RecentlyViewed onSelect={handleGemClick} />

          {/* Sort bar */}
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b ${divider}`}>
            <p className={`text-sm ${subText}`}>
              <span className={dark ? 'text-pearl-100' : 'text-obsidian-900'}>{filteredGems.length}</span> gems available
            </p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className={`appearance-none px-4 py-2 pr-8 text-sm rounded-sm border focus:outline-none focus:border-gold-600/60 transition-colors ${
                    dark
                      ? 'bg-obsidian-900 border-gold-900/30 text-pearl-100'
                      : 'bg-white border-gold-700/20 text-obsidian-900'
                  }`}
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                  <option>Newest</option>
                </select>
                <ChevronDown className={`absolute right-2 top-3 h-4 w-4 pointer-events-none ${subText}`} />
              </div>
              <button
                onClick={() => setFilterOpen(true)}
                className={`lg:hidden p-2 ${subText} hover:text-gold-400 transition-colors`}
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>

          {isLoading ? (
            <GemGridSkeleton count={6} />
          ) : filteredGems.length === 0 ? (
            <div className="luxury-card py-16 text-center">
              <p className={`text-sm ${subText}`}>No gems match your current filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredGems.map((gem) => (
                <div key={gem.id} onClick={() => handleGemClick(gem)}
                  className="luxury-card overflow-hidden group cursor-pointer">
                  <div className="relative">
                    <div className="relative h-52 overflow-hidden">
                      <OptimizedImage
                        src={gem.mainImage}
                        alt={gem.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
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
                        isComparing(gem.id)
                          ? 'bg-gold-500 text-obsidian-950'
                          : 'bg-obsidian-950/60 text-pearl-300 hover:bg-obsidian-950/80'
                      }`}>
                      <GitCompare size={14} />
                    </button>

                    {/* Discount */}
                    {gem.discount > 0 && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold tracking-wider bg-gold-gradient text-obsidian-950 rounded-sm">
                        -{gem.discount}%
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-gold-500">
                        {gem.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                        <span className={`text-xs ${subText}`}>
                          {gem.rating ? gem.rating.toFixed(1) : '4.8'}
                        </span>
                      </div>
                    </div>

                    <h3 className={`font-display text-lg font-medium mb-1 ${dark ? 'text-pearl-100' : 'text-obsidian-900'}`}
                      style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                      {gem.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4 text-xs">
                      {[['Weight', `${gem.weight} ct`], ['Cut', gem.cut], ['Origin', gem.origin], ['Treatment', gem.treatment]].map(([lbl, val]) => (
                        <div key={lbl}>
                          <span className={subText}>{lbl}: </span>
                          <span className={dark ? 'text-pearl-200' : 'text-obsidian-800'}>{val || '—'}</span>
                        </div>
                      ))}
                    </div>

                    <div className={`flex items-end justify-between pt-4 border-t ${divider}`}>
                      <div>
                        <p className={`text-[10px] font-semibold tracking-widest uppercase mb-0.5 ${subText}`}>Price</p>
                        <p className="font-display text-xl font-semibold text-gold-gradient"
                          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                          ${gem.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center gap-1 text-[10px] font-semibold tracking-wider mb-1 ${
                          gem.availability === 'Available' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          <Shield size={10} />
                          {gem.certification}
                        </div>
                        <p className={`text-[10px] ${gem.availability === 'Available' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {gem.availability}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => handlePurchase(e, gem)}
                        className="flex-1 btn-gold text-xs py-2 rounded-sm">
                        Acquire
                      </button>
                      <button className={`p-2 rounded-sm border transition-colors ${
                        dark
                          ? 'border-gold-900/30 text-pearl-400 hover:text-gold-400 hover:border-gold-600/40'
                          : 'border-gold-700/20 text-obsidian-500 hover:text-gold-700 hover:border-gold-600/40'
                      }`}>
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

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-obsidian-950/70 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          <div className={`absolute inset-y-0 right-0 w-72 p-6 overflow-y-auto ${dark ? 'bg-obsidian-950' : 'bg-pearl-100'}`}>
            <div className={`flex justify-between items-center mb-6 pb-4 border-b ${divider}`}>
              <p className="section-label">Refine</p>
              <button onClick={() => setFilterOpen(false)} className={subText}>
                <X size={18} />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}

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
