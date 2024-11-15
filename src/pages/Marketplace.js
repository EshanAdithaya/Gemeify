import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Heart,
  Star,
  ChevronDown,
  ArrowUpDown,
  Shield,
  Certificate as CertIcon,
  PackageCheck,
  Eye
} from 'lucide-react';

const Marketplace = ({ isDarkMode }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Featured');
  const [viewType, setViewType] = useState('grid');

  const gems = [
    {
      id: 1,
      name: "Natural Ceylon Sapphire",
      price: 12499,
      discount: 15,
      originalPrice: 14999,
      rating: 4.8,
      reviews: 124,
      image: "/api/placeholder/600/400",
      category: "Sapphire",
      certification: "GIA",
      weight: "2.5 ct",
      color: "Royal Blue",
      clarity: "VS",
      cut: "Oval",
      origin: "Sri Lanka",
      treatment: "Heated",
      seller: {
        name: "Royal Gems",
        rating: 4.9,
        verified: true,
        sales: 1289
      }
    },
    {
      id: 2,
      name: "Pigeon Blood Ruby",
      price: 18999,
      rating: 4.9,
      reviews: 89,
      image: "/api/placeholder/600/400",
      category: "Ruby",
      certification: "GRS",
      weight: "1.8 ct",
      color: "Vivid Red",
      clarity: "VVS",
      cut: "Cushion",
      origin: "Myanmar",
      treatment: "No Heat",
      seller: {
        name: "Luxury Gems Co.",
        rating: 5.0,
        verified: true,
        sales: 892
      }
    },
  ];

  const displayGems = [...gems, ...gems, ...gems].map((gem, index) => ({
    ...gem,
    id: index + 1
  }));

  const filters = {
    categories: ['All', 'Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl', 'Other'],
    certification: ['GIA', 'IGI', 'AGS', 'GRS', 'Gubelin'],
    cut: ['Round', 'Oval', 'Cushion', 'Princess', 'Emerald Cut'],
    clarity: ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2'],
    treatment: ['Heated', 'No Heat', 'Minor', 'None'],
    priceRange: ['Under $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000+']
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    } pt-24 transition-colors duration-300`}>
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Gem Marketplace
              </h1>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Browse our collection of certified precious gems
              </p>
            </div>
            {/* Search and View Controls */}
            <div className="flex items-center gap-4">
              <div className="relative flex-grow md:w-80">
                <input
                  type="text"
                  placeholder="Search gems..."
                  className={`w-full ${
                    isDarkMode 
                      ? 'bg-slate-800/50 text-white placeholder-gray-400' 
                      : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200'
                  } rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <Search className={`absolute right-3 top-2.5 h-5 w-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <button
                onClick={() => setFilterOpen(true)}
                className={`p-2 md:hidden ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <SlidersHorizontal size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Price Range */}
                <div className={`${
                  isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                } rounded-xl p-6`}>
                  <h3 className={`text-lg font-medium mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Price Range</h3>
                  <div className="space-y-2">
                    {filters.priceRange.map((range) => (
                      <label key={range} className={`flex items-center space-x-2 cursor-pointer ${
                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}>
                        <input
                          type="checkbox"
                          className={`rounded text-purple-500 focus:ring-purple-500 ${
                            isDarkMode ? 'bg-slate-700 border-gray-600' : 'bg-white border-gray-300'
                          }`}
                        />
                        <span>{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className={`${
                  isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                } rounded-xl p-6`}>
                  <h3 className={`text-lg font-medium mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Categories</h3>
                  <div className="space-y-2">
                    {filters.categories.map((category) => (
                      <label key={category} className={`flex items-center space-x-2 cursor-pointer ${
                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}>
                        <input
                          type="checkbox"
                          className={`rounded text-purple-500 focus:ring-purple-500 ${
                            isDarkMode ? 'bg-slate-700 border-gray-600' : 'bg-white border-gray-300'
                          }`}
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Certification */}
                <div className={`${
                  isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                } rounded-xl p-6`}>
                  <h3 className={`text-lg font-medium mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Certification</h3>
                  <div className="space-y-2">
                    {filters.certification.map((cert) => (
                      <label key={cert} className={`flex items-center space-x-2 cursor-pointer ${
                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}>
                        <input
                          type="checkbox"
                          className={`rounded text-purple-500 focus:ring-purple-500 ${
                            isDarkMode ? 'bg-slate-700 border-gray-600' : 'bg-white border-gray-300'
                          }`}
                        />
                        <span>{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cut */}
                <div className={`${
                  isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                } rounded-xl p-6`}>
                  <h3 className={`text-lg font-medium mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Cut</h3>
                  <div className="space-y-2">
                    {filters.cut.map((cutType) => (
                      <label key={cutType} className={`flex items-center space-x-2 cursor-pointer ${
                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}>
                        <input
                          type="checkbox"
                          className={`rounded text-purple-500 focus:ring-purple-500 ${
                            isDarkMode ? 'bg-slate-700 border-gray-600' : 'bg-white border-gray-300'
                          }`}
                        />
                        <span>{cutType}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className={`${
                isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
              } rounded-xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Showing <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{displayGems.length}</span> results
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className={`appearance-none px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        isDarkMode 
                          ? 'bg-slate-700/50 text-white' 
                          : 'bg-gray-50 text-gray-900'
                      }`}
                    >
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Most Popular</option>
                      <option>Newest</option>
                    </select>
                    <ChevronDown className={`absolute right-2 top-3 h-4 w-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    } pointer-events-none`} />
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setViewType('grid')}
                      className={`p-2 rounded ${
                        viewType === 'grid' 
                          ? isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'
                          : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewType('list')}
                      className={`p-2 rounded ${
                        viewType === 'list' 
                          ? isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'
                          : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid View */}
              {viewType === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayGems.map((gem) => (
                    <div key={gem.id} className={`${
                      isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                    } rounded-xl overflow-hidden group`}>
                      <div className="relative">
                        <img 
                          src={gem.image} 
                          alt={gem.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                       <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                          <Heart size={20} className="text-white" />
                        </button>
                        {gem.discount && (
                          <div className="absolute top-4 left-4 px-2 py-1 bg-purple-500 text-white text-sm rounded-full">
                            -{gem.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-purple-400">{gem.category}</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className={`text-sm ml-1 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>{gem.rating}</span>
                          </div>
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{gem.name}</h3>
                        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                          <div>
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Weight:</span>
                            <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} ml-1`}>{gem.weight}</span>
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
                          <div>
                            <div className={`text-2xl font-bold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              ${gem.price.toLocaleString()}
                            </div>
                            {gem.originalPrice && (
                              <div className={`text-sm line-through ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                ${gem.originalPrice.toLocaleString()}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Shield className="w-4 h-4 mr-1" />
                            {gem.certification}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                            Purchase Now
                          </button>
                          <button className={`p-2 rounded-lg transition-colors ${
                            isDarkMode 
                              ? 'bg-slate-700/50 text-white hover:bg-slate-700' 
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}>
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewType === 'list' && (
                <div className="space-y-6">
                  {displayGems.map((gem) => (
                    <div key={gem.id} className={`${
                      isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                    } rounded-xl overflow-hidden`}>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-72 relative">
                          <img 
                            src={gem.image} 
                            alt={gem.name}
                            className="w-full h-48 md:h-full object-cover"
                          />
                          <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                            <Heart size={20} className="text-white" />
                          </button>
                          {gem.discount && (
                            <div className="absolute top-4 left-4 px-2 py-1 bg-purple-500 text-white text-sm rounded-full">
                              -{gem.discount}%
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-purple-400">{gem.category}</span>
                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>•</span>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                  <span className={`text-sm ml-1 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                  }`}>{gem.rating}</span>
                                </div>
                              </div>
                              <h3 className={`text-xl font-semibold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>{gem.name}</h3>
                            </div>
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                ${gem.price.toLocaleString()}
                              </div>
                              {gem.originalPrice && (
                                <div className={`text-sm line-through ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  ${gem.originalPrice.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                              <span className={`block text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>Weight</span>
                              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                {gem.weight}
                              </span>
                            </div>
                            <div>
                              <span className={`block text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>Cut</span>
                              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                {gem.cut}
                              </span>
                            </div>
                            <div>
                              <span className={`block text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>Origin</span>
                              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                {gem.origin}
                              </span>
                            </div>
                            <div>
                              <span className={`block text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>Treatment</span>
                              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                {gem.treatment}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-6">
                              <div className="flex items-center">
                                <Shield className="w-4 h-4 text-purple-400 mr-2" />
                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                  {gem.certification} Certified
                                </span>
                              </div>
                              <div className="flex items-center">
                                <PackageCheck className="w-4 h-4 text-purple-400 mr-2" />
                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                  Free Shipping
                                </span>
                              </div>
                            </div>
                            <div className={`flex items-center ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              <span className="text-sm">Sold by {gem.seller.name}</span>
                              {gem.seller.verified && (
                                <Shield className="w-4 h-4 ml-1 text-blue-400" />
                              )}
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <button className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                              Purchase Now
                            </button>
                            <button className="px-4 py-2 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-colors">
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
      </div>

      {/* Mobile Filter Sidebar */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className={`absolute inset-y-0 right-0 max-w-xs w-full ${
            isDarkMode ? 'bg-slate-900' : 'bg-white'
          } p-6`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Filters</h2>
              <button
                onClick={() => setFilterOpen(false)}
                className={isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-6">
              {/* Mobile Filters - Same as desktop */}
              <div>
                <h3 className={`text-lg font-medium mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Price Range</h3>
                <div className="space-y-2">
                  {filters.priceRange.map((range) => (
                    <label key={range} className={`flex items-center space-x-2 cursor-pointer ${
                      isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}>
                      <input
                        type="checkbox"
                        className={`rounded text-purple-500 focus:ring-purple-500 ${
                          isDarkMode ? 'bg-slate-700 border-gray-600' : 'bg-white border-gray-300'
                        }`}
                      />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Add other filter sections similarly */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;