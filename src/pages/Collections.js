// CollectionsPage.js
import React, { useState } from 'react';
import { 
  Slider, 
  Search, 
  Heart,
  SlidersHorizontal,
  X,
  ChevronDown,
  Star
} from 'lucide-react';

export const CollectionsPage = ({ isDarkMode }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

  const gems = [
    {
      id: 1,
      name: "Natural Blue Sapphire",
      category: "Sapphire",
      price: 15999,
      rating: 4.8,
      reviews: 124,
      image: "/api/placeholder/600/400",
      certification: "GIA",
      carat: "3.2",
      origin: "Sri Lanka"
    },
    {
      id: 2,
      name: "Ruby Ring Stone",
      category: "Ruby",
      price: 12499,
      rating: 4.9,
      reviews: 89,
      image: "/api/placeholder/600/400",
      certification: "IGI",
      carat: "2.8",
      origin: "Myanmar"
    },
    {
      id: 3,
      name: "Emerald Cut Diamond",
      category: "Diamond",
      price: 28999,
      rating: 5.0,
      reviews: 156,
      image: "/api/placeholder/600/400",
      certification: "GIA",
      carat: "2.1",
      origin: "South Africa"
    }
  ].concat(Array(5).fill().map((_, i) => ({
    id: i + 4,
    name: "Premium Gemstone",
    category: "Other",
    price: 9999,
    rating: 4.5,
    reviews: 75,
    image: "/api/placeholder/600/400",
    certification: "IGI",
    carat: "1.8",
    origin: "Brazil"
  })));

  const categories = [
    'All',
    'Diamond',
    'Ruby',
    'Sapphire',
    'Emerald',
    'Pearl',
    'Other'
  ];

  const sortOptions = [
    'Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Top Rated',
    'Newest'
  ];

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    } transition-colors duration-300`}>
      {/* Header Section */}
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Our Collection
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Discover our curated selection of premium gemstones
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className={`${
                isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
              } rounded-xl p-6 sticky top-24`}>
                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <h3 className={`text-lg font-medium mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Search</h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search gems..."
                        className={`w-full ${
                          isDarkMode 
                            ? 'bg-slate-700/50 text-white placeholder-gray-400' 
                            : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                        } rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                      <Search className={`absolute right-3 top-2.5 h-5 w-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className={`text-lg font-medium mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Price Range</h3>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        className="w-full"
                      />
                      <div className={`flex justify-between text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <span>$0</span>
                        <span>$50,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className={`text-lg font-medium mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className={`flex items-center space-x-2 cursor-pointer ${
                          isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}>
                          <input
                            type="checkbox"
                            className="rounded border-gray-400 text-purple-500 focus:ring-purple-500"
                          />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Certification */}
                  <div>
                    <h3 className={`text-lg font-medium mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Certification</h3>
                    <div className="space-y-2">
                      {['GIA', 'IGI', 'AGS'].map((cert) => (
                        <label key={cert} className={`flex items-center space-x-2 cursor-pointer ${
                          isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}>
                          <input
                            type="checkbox"
                            className="rounded border-gray-400 text-purple-500 focus:ring-purple-500"
                          />
                          <span>{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters Button */}
            <button
              onClick={() => setFilterOpen(true)}
              className="lg:hidden fixed bottom-6 right-6 bg-purple-500 text-white p-4 rounded-full shadow-lg z-50 hover:bg-purple-600 transition-colors"
            >
              <SlidersHorizontal className="h-6 w-6" />
            </button>

            {/* Mobile Filters Modal */}
            {filterOpen && (
              <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
                <div className={`absolute inset-y-0 right-0 w-full max-w-xs ${
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
                  {/* Mobile filters content - same as desktop */}
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Showing <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{gems.length}</span> results
                </p>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`appearance-none px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDarkMode 
                        ? 'bg-slate-800/50 text-white' 
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-2 top-3 h-4 w-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } pointer-events-none`} />
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gems.map((gem) => (
                  <div key={gem.id} className={`${
                    isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                  } rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform`}>
                    <div className="relative group">
                      <img 
                        src={gem.image} 
                        alt={gem.name}
                        className="w-full h-48 object-cover"
                      />
                      <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                        <Heart size={20} className="text-white" />
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4">
                          <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-purple-400">{gem.category}</span>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>{gem.certification}</span>
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{gem.name}</h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(gem.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                          />
                        ))}
                        <span className={`ml-2 text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>({gem.reviews})</span>
                      </div>
                      <div className={`flex items-center justify-between text-sm mb-3 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span>{gem.carat} Carat</span>
                        <span>{gem.origin}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-lg font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>${gem.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CollectionsPage;