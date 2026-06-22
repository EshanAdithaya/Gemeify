'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Heart, Star, ChevronDown, Shield, Eye, PackageCheck, Loader, GitCompare } from 'lucide-react';
import { gemsAPI } from '@/lib/api';
import { useTheme } from '@/context/ThemeContext';
import { useCompare } from '@/context/CompareContext';
import Protected from '@/components/Protected';
import GemDetailModal from '@/components/GemDetailModal';
import CompareTray from '@/components/CompareTray';
import RecentlyViewed from '@/components/RecentlyViewed';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=800&q=80';

const FILTERS = {
  categories: ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl', 'Other'],
  certification: ['GIA', 'IGI', 'AGS', 'GRS', 'Gubelin'],
  cut: ['Round', 'Oval', 'Cushion', 'Princess', 'Emerald Cut'],
  clarity: ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2'],
  treatment: ['Heated', 'No Heat', 'Minor', 'None'],
};

// Map a backend (TypeORM) gem entity onto the shape used by the cards/modal.
function normalizeGem(g) {
  const price = Number(g.price) || 0;
  const originalPrice = Number(g.originalPrice) || 0;
  return {
    id: g.id,
    name: g.name,
    category: g.category?.name || 'Gemstone',
    price,
    certification: g.certificationLab || '—',
    cut: g.cut,
    clarity: g.clarity,
    color: g.color,
    treatment: g.treatment || 'None',
    weight: g.weight,
    origin: g.origin,
    mainImage: g.mainImage || (Array.isArray(g.images) ? g.images[0] : null) || PLACEHOLDER,
    additionalImages: Array.isArray(g.images) ? g.images : [],
    description: g.description,
    rating: Number(g.rating) || 0,
    views: g.views || 0,
    discount: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
    availability: g.isActive !== false && (g.quantity ?? 1) > 0 && g.status !== 'sold' ? 'Available' : 'Sold',
    createdAt: g.createdAt,
  };
}

function FilterSection({ title, options, selected, onChange, isDarkMode }) {
  return (
    <div className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl p-6 mb-4`}>
      <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center space-x-2 cursor-pointer ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() =>
                onChange(selected.includes(option) ? selected.filter((i) => i !== option) : [...selected, option])
              }
              className={`rounded text-purple-500 focus:ring-purple-500 ${
                isDarkMode ? 'bg-slate-700 border-gray-600' : 'bg-white border-gray-300'
              }`}
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

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Featured');
  const [viewType, setViewType] = useState('grid');
  const [gems, setGems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGem, setSelectedGem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [selectedCuts, setSelectedCuts] = useState([]);
  const [selectedClarity, setSelectedClarity] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);

  useEffect(() => {
    const fetchGems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await gemsAPI.getAll(1, 60);
        const list = res.data?.data?.data || res.data?.data || [];
        setGems(list.map(normalizeGem));
      } catch (err) {
        console.error('Error fetching gems:', err);
        setError('Failed to load gems. Please make sure the backend API is running.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchGems();
  }, []);

  const filteredGems = useMemo(() => {
    let filtered = [...gems];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (gem) =>
          gem.name?.toLowerCase().includes(term) ||
          gem.category?.toLowerCase().includes(term) ||
          gem.description?.toLowerCase().includes(term)
      );
    }

    if (selectedCategories.length) filtered = filtered.filter((g) => selectedCategories.includes(g.category));
    filtered = filtered.filter((g) => g.price >= priceRange[0] && g.price <= priceRange[1]);
    if (selectedCertifications.length) filtered = filtered.filter((g) => selectedCertifications.includes(g.certification));
    if (selectedCuts.length) filtered = filtered.filter((g) => selectedCuts.includes(g.cut));
    if (selectedClarity.length) filtered = filtered.filter((g) => selectedClarity.includes(g.clarity));
    if (selectedTreatments.length) filtered = filtered.filter((g) => selectedTreatments.includes(g.treatment));

    switch (selectedSort) {
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Most Popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [
    gems,
    searchTerm,
    selectedSort,
    priceRange,
    selectedCategories,
    selectedCertifications,
    selectedCuts,
    selectedClarity,
    selectedTreatments,
  ]);

  const handleGemClick = (gem) => {
    setSelectedGem(gem);
    setIsModalOpen(true);
    recordView(gem);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <p className={`text-lg ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const sidebar = (
    <>
      <div className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl p-6 mb-4`}>
        <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Price Range</h3>
        <input
          type="range"
          min="0"
          max="50000"
          step="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
      </div>
      <FilterSection title="Categories" options={FILTERS.categories} selected={selectedCategories} onChange={setSelectedCategories} isDarkMode={isDarkMode} />
      <FilterSection title="Certification" options={FILTERS.certification} selected={selectedCertifications} onChange={setSelectedCertifications} isDarkMode={isDarkMode} />
      <FilterSection title="Cut" options={FILTERS.cut} selected={selectedCuts} onChange={setSelectedCuts} isDarkMode={isDarkMode} />
      <FilterSection title="Clarity" options={FILTERS.clarity} selected={selectedClarity} onChange={setSelectedClarity} isDarkMode={isDarkMode} />
      <FilterSection title="Treatment" options={FILTERS.treatment} selected={selectedTreatments} onChange={setSelectedTreatments} isDarkMode={isDarkMode} />
    </>
  );

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-white'
      } pt-24 transition-colors duration-300`}
    >
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Gem Marketplace
            </h1>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Browse our collection of certified precious gems
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-grow md:w-80">
              <input
                type="text"
                placeholder="Search gems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-slate-800/50 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200'
                }`}
              />
              <Search className={`absolute right-3 top-2.5 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              className={`p-2 lg:hidden ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <SlidersHorizontal size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-2">{sidebar}</div>
          </div>

          <div className="flex-1">
            <RecentlyViewed onSelect={handleGemClick} />

            {/* Sort bar */}
            <div
              className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}
            >
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Showing <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{filteredGems.length}</span> results
              </p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className={`appearance-none px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDarkMode ? 'bg-slate-700/50 text-white' : 'bg-gray-50 text-gray-900'
                    }`}
                  >
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                    <option>Newest</option>
                  </select>
                  <ChevronDown className={`absolute right-2 top-3 h-4 w-4 pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <div className="flex gap-1">
                  {['grid', 'list'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setViewType(type)}
                      className={`p-2 rounded ${
                        viewType === type
                          ? isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'
                          : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={type === 'grid' ? 'M4 6h16M4 10h16M4 14h16M4 18h16' : 'M4 6h16M4 12h16m-7 6h7'}
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="w-12 h-12 animate-spin text-purple-500" />
              </div>
            ) : filteredGems.length === 0 ? (
              <div className={`text-center py-16 rounded-xl ${isDarkMode ? 'bg-slate-800/50 text-gray-400' : 'bg-white text-gray-600 shadow-lg'}`}>
                No gems match your filters yet.
              </div>
            ) : viewType === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGems.map((gem) => (
                  <div
                    key={gem.id}
                    onClick={() => handleGemClick(gem)}
                    className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow duration-300`}
                  >
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={gem.mainImage} alt={gem.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                        <Heart size={20} className="text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(gem);
                        }}
                        disabled={!isComparing(gem.id) && !canAddMore}
                        aria-label={isComparing(gem.id) ? 'Remove from comparison' : 'Add to comparison'}
                        title={!isComparing(gem.id) && !canAddMore ? 'Compare up to 4 gems' : 'Compare'}
                        className={`absolute bottom-4 left-4 p-2 rounded-full backdrop-blur-md transition-colors disabled:opacity-40 ${
                          isComparing(gem.id)
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <GitCompare size={18} />
                      </button>
                      {gem.discount ? (
                        <div className="absolute top-4 left-4 px-2 py-1 bg-purple-500 text-white text-sm rounded-full">
                          -{gem.discount}%
                        </div>
                      ) : null}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-purple-400">{gem.category}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className={`text-sm ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {gem.rating ? gem.rating.toFixed(1) : '4.8'}
                          </span>
                        </div>
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{gem.name}</h3>
                      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                        <div>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Weight:</span>
                          <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} ml-1`}>{gem.weight} ct</span>
                        </div>
                        <div>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Cut:</span>
                          <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} ml-1`}>{gem.cut}</span>
                        </div>
                        <div>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Origin:</span>
                          <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} ml-1`}>{gem.origin}</span>
                        </div>
                        <div>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Treatment:</span>
                          <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} ml-1`}>{gem.treatment}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${gem.price.toLocaleString()}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Shield className="w-4 h-4 mr-1" />
                          {gem.certification}
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${gem.availability === 'Available' ? 'text-green-500' : 'text-yellow-500'}`}>
                        {gem.availability}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                          Purchase Now
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode ? 'bg-slate-700/50 text-white hover:bg-slate-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredGems.map((gem) => (
                  <div
                    key={gem.id}
                    onClick={() => handleGemClick(gem)}
                    className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300`}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-72 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={gem.mainImage} alt={gem.name} className="w-full h-48 md:h-full object-cover" />
                        {gem.discount ? (
                          <div className="absolute top-4 left-4 px-2 py-1 bg-purple-500 text-white text-sm rounded-full">
                            -{gem.discount}%
                          </div>
                        ) : null}
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm text-purple-400">{gem.category}</span>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>•</span>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className={`text-sm ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {gem.rating ? gem.rating.toFixed(1) : '4.8'}
                                </span>
                              </div>
                            </div>
                            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{gem.name}</h3>
                          </div>
                          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            ${gem.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {[
                            ['Weight', `${gem.weight} ct`],
                            ['Cut', gem.cut],
                            ['Origin', gem.origin],
                            ['Treatment', gem.treatment],
                          ].map(([label, value]) => (
                            <div key={label}>
                              <span className={`block text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</span>
                              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center">
                            <Shield className="w-4 h-4 text-purple-400 mr-2" />
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{gem.certification} Certified</span>
                          </div>
                          <div className="flex items-center">
                            <PackageCheck className="w-4 h-4 text-purple-400 mr-2" />
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Free Shipping</span>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                            Purchase Now
                          </button>
                          <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className={`absolute inset-y-0 right-0 max-w-xs w-full ${isDarkMode ? 'bg-slate-900' : 'bg-white'} p-6 overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h2>
              <button
                onClick={() => setFilterOpen(false)}
                className={isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}
              >
                <X className="h-6 w-6" />
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
