import React from 'react';
import { Search, Menu, ShoppingCart, Heart, ArrowRight, Star } from 'lucide-react';

const GemifyLanding = () => {
  const featuredGems = [
    {
      id: 1,
      name: "Royal Blue Sapphire",
      description: "3.2 Carat | AAA Quality",
      price: "15,999",
      rating: 5,
      image: "/api/placeholder/600/400"
    },
    {
      id: 2,
      name: "Pink Diamond",
      description: "1.8 Carat | VS1 Clarity",
      price: "32,999",
      rating: 5,
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      name: "Colombian Emerald",
      description: "2.5 Carat | Natural",
      price: "12,999",
      rating: 4.5,
      image: "/api/placeholder/600/400"
    }
  ];

  const categories = [
    {
      name: "Diamonds",
      image: "/api/placeholder/400/300",
      count: "2,534"
    },
    {
      name: "Rubies",
      image: "/api/placeholder/400/300",
      count: "1,826"
    },
    {
      name: "Sapphires",
      image: "/api/placeholder/400/300",
      count: "1,463"
    },
    {
      name: "Emeralds",
      image: "/api/placeholder/400/300",
      count: "982"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-slate-900/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                Gemify
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a className="text-gray-300 hover:text-white transition-colors">Collections</a>
                <a className="text-gray-300 hover:text-white transition-colors">Auctions</a>
                <a className="text-gray-300 hover:text-white transition-colors">Marketplace</a>
                <a className="text-gray-300 hover:text-white transition-colors">About</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-white">
                <Search size={20} />
              </button>
              <button className="p-2 text-gray-300 hover:text-white">
                <Heart size={20} />
              </button>
              <button className="p-2 text-gray-300 hover:text-white">
                <ShoppingCart size={20} />
              </button>
              <button className="md:hidden p-2 text-gray-300 hover:text-white">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[150%] min-h-[150%] blur-3xl opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 animate-pulse"></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Rare and Precious
              <span className="block bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                Gemstones
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Explore our curated collection of exceptional gems from around the world
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* Featured Gems Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Featured Gems</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGems.map((gem) => (
              <div key={gem.id} className="bg-slate-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform">
                <div className="relative">
                  <img 
                    src={gem.image} 
                    alt={gem.name}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                    <Heart size={20} className="text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < gem.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                      />
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{gem.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{gem.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-medium">${gem.price}</span>
                    <button className="text-white hover:text-purple-400 transition-colors">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category.name} className="group relative overflow-hidden rounded-xl cursor-pointer">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-medium text-white">{category.name}</h3>
                    <p className="text-sm text-gray-300">{category.count} items</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GemifyLanding;