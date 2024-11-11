import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Search, 
    Menu, 
    Heart, 
    ArrowRight, 
    Star,
    ShieldCheck as Shield,
    Sparkles as SparklesIcon,
    Eye,
    Scale as ScaleIcon,
    Gem as GemIcon 
} from 'lucide-react';

const GemifyLanding = ({ isDarkMode }) => {
    const featuredGems = [
        {
          id: 1,
          name: "Royal Blue Sapphire",
          description: "3.2 Carat | AAA Quality",
          price: "15,999",
          rating: 5,
          image: "https://cdn.shopify.com/s/files/1/0080/0004/5171/products/BS01HMDB_4b2042f1-421e-4024-b814-6bc73855a9c5_350x@2x.jpg?v=1625054014",
          quality: "AAA",
          certification: "GIA",
          highlights: [
            "Natural Blue",
            "Heat Treated",
            "Ceylon Origin"
          ]
        },
        {
          id: 2,
          name: "Pink Diamond",
          description: "1.8 Carat | VS1 Clarity",
          price: "32,999",
          rating: 5,
          image: "https://media.cnn.com/api/v1/images/stellar/prod/230328171155-01-eternal-pink-diamond.jpg?c=original",
          quality: "VS1",
          certification: "GIA",
          highlights: [
            "Natural Color",
            "GIA Certified",
            "Argyle Mine"
          ]
        },
        {
          id: 3,
          name: "Colombian Emerald",
          description: "2.5 Carat | Natural",
          price: "12,999",
          rating: 4.5,
          image: "https://jrcolombianemeralds.com/cdn/shop/files/IMG_4559.jpg?v=1712765173&width=2570",
          quality: "AAA",
          certification: "GRS",
          highlights: [
            "Minor Oil",
            "Muzo Mine",
            "Rich Green"
          ]
        }
      ];

  const categories = [
    {
      name: "Diamonds",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/2/382845659/WJ/BP/SL/211079491/diamonds-for-sale.jpg",
      count: "2,534"
    },
    {
      name: "Rubies",
      image: "https://www.latelita.com/cdn/shop/articles/the-ruby-gemstone-everything-you-ever-needed-to-know-about-rubies-748231.jpg?v=1692710601&width=2048",
      count: "1,826"
    },
    {
      name: "Sapphires",
      image: "https://www.gemsinsrilanka.com/wp-content/uploads/2021/01/Blue-sapphire-sri-lanka.jpg",
      count: "1,463"
    },
    {
      name: "Emeralds",
      image: "https://www.astrosawal.com/assets/gemstone/Emrald_gemstone.jpg",
      count: "982"
    }
  ];

  const guarantees = [
    {
      icon: <SparklesIcon className={`w-4 h-4 mr-2 ${
        isDarkMode ? 'text-purple-400' : 'text-purple-600'
      }`} />,
      title: "Certified Authentic",
      description: "Every gem comes with certification from leading gemological laboratories"
    },
    {
      icon: <SparklesIcon className={`w-5 h-5 mr-3 ${
        isDarkMode ? 'text-purple-400' : 'text-purple-600'
      }`} />,
      title: "Fair Pricing",
      description: "Transparent pricing based on current market values"
    },
    {
      icon: <ScaleIcon className={`w-6 h-6 ${
        isDarkMode ? 'text-purple-400' : 'text-purple-600'
      }`} />,
      title: "Expert Selection",
      description: "Each gem personally selected by our certified gemologists"
    },
    {
      icon: <SparklesIcon className={`w-6 h-6 ${
        isDarkMode ? 'text-purple-400' : 'text-purple-600'
      }`} />,
      title: "Quality Guarantee",
      description: "100% satisfaction guaranteed or your money back"
    }
  ];

  return (
<div className={`min-h-screen ${
    isDarkMode 
      ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white' 
      : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'
  } transition-all duration-300`}>
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[150%] min-h-[150%] blur-3xl opacity-30">
            <div className={`absolute inset-0 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800' 
                : 'bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200'
              } animate-pulse`}></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Discover World's Finest
              <span className="block bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                Investment Grade Gems
              </span>
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Curated collection of certified precious gems, personally selected by expert gemologists
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/collections" 
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Explore Collection
              </Link>
              <Link to="/about"
                className={`px-8 py-3 rounded-lg font-medium ${
                  isDarkMode 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-gray-900/10 text-gray-900 hover:bg-gray-900/20'
                } transition-colors`}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className={`${
                isDarkMode ? 'bg-slate-800/50' : 'bg-white'
              } rounded-xl p-6 flex flex-col items-center text-center`}>
                <div className={`mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  {guarantee.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{guarantee.title}</h3>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{guarantee.description}</p>
                
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Gems Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Featured Investment Gems</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGems.map((gem) => (
              <div key={gem.id} className={`${
                isDarkMode ? 'bg-slate-800/50' : 'bg-white'
              } rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform shadow-lg`}>
                <div className="relative">
                  <img 
                    src={gem.image} 
                    alt={gem.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 px-2 py-1 bg-purple-500 text-white text-sm rounded-full">
                    {gem.quality}
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                    <Heart size={20} className="text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < gem.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                        />
                      ))}
                    </div>
                    <span className={`text-sm ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>{gem.certification}</span>
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{gem.name}</h3>
                  <p className={`text-sm mb-3 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{gem.description}</p>
                  <div className="space-y-2 mb-4">
                    {gem.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        <SparklesIcon className={`w-4 h-4 mr-2 ${
                          isDarkMode ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>${gem.price}</span>
                    <Link to={`/gems/${gem.id}`} className={`flex items-center ${
                      isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'
                    }`}>
                      View Details
                      <ArrowRight size={20} className="ml-2" />
                    </Link>
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
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Investment Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.name} className="group relative overflow-hidden rounded-xl cursor-pointer h-80">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-300 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{category.count} items</span>
                    <span className="text-purple-400 group-hover:translate-x-2 transition-transform duration-300">
                      <ArrowRight size={20} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

{/* Expert Consultation Section */}
<div className={`px-4 sm:px-6 lg:px-8 py-16 ${
  isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50'
}`}>
  <div className="max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className={`text-3xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Expert Guidance for Your Investment
        </h2>
        <div className={`space-y-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>
            Our team of certified gemologists is here to help you make informed investment decisions. 
            With decades of experience in the industry, we provide:
          </p>
          <ul className="space-y-3">
                    <li className="flex items-center">
            <Shield className={`w-5 h-5 mr-3 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            Detailed gem analysis and authenticity verification
            </li>
            <li className="flex items-center">
              <SparklesIcon className={`w-5 h-5 mr-3 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
              Investment potential assessment
            </li>
            <li className="flex items-center">
              <Eye className={`w-5 h-5 mr-3 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
              Market trends and opportunities insights
            </li>
          </ul>
        </div>
        <div className="mt-8 flex gap-4">
          <Link to="/about" 
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Meet Our Experts
          </Link>
          <Link to="/contact" 
            className={`px-6 py-3 rounded-lg font-medium border ${
              isDarkMode 
                ? 'border-gray-700 text-white hover:bg-white/10' 
                : 'border-gray-300 text-gray-900 hover:bg-gray-100'
            } transition-colors`}>
            Schedule Consultation
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <img 
          src="/api/placeholder/400/500" 
          alt="Expert examination" 
          className="rounded-xl w-full h-64 object-cover"
        />
        <img 
          src="/api/placeholder/400/500" 
          alt="Gem certification" 
          className="rounded-xl w-full h-64 object-cover mt-8"
        />
      </div>
    </div>
  </div>
</div>

{/* Investment Benefits */}
<div className="px-4 sm:px-6 lg:px-8 py-16">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className={`text-3xl font-bold mb-12 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      Why Invest in Precious Gems?
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
      }`}>
        <div className={`w-12 h-12 rounded-full ${
          isDarkMode ? 'bg-purple-400/20' : 'bg-purple-100'
        } flex items-center justify-center mx-auto mb-4`}>
          <ScaleIcon className={`w-6 h-6 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`} />
        </div>
        <h3 className={`text-xl font-semibold mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Value Appreciation</h3>
        <p className={`${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>Historical track record of steady value growth, especially for rare gems</p>
      </div>
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
      }`}>
        <div className={`w-12 h-12 rounded-full ${
        isDarkMode ? 'bg-purple-400/20' : 'bg-purple-100'
        } flex items-center justify-center mx-auto mb-4`}>
        <Shield className={`w-6 h-6 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
        }`} />
        </div>
        <h3 className={`text-xl font-semibold mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Tangible Asset</h3>
        <p className={`${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>Physical ownership of beautiful and portable wealth</p>
      </div>
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
      }`}>
        <div className={`w-12 h-12 rounded-full ${
          isDarkMode ? 'bg-purple-400/20' : 'bg-purple-100'
        } flex items-center justify-center mx-auto mb-4`}>
          <SparklesIcon className={`w-6 h-6 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`} />
        </div>
        <h3 className={`text-xl font-semibold mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Portfolio Diversity</h3>
        <p className={`${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>Alternative investment uncorrelated with traditional markets</p>
      </div>
    </div>
  </div>
</div>
      

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
    <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>Featured Investment Gems</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredGems.map((gem) => (
        <div key={gem.id} className={`${
          isDarkMode ? 'bg-slate-800/50' : 'bg-white'
        } rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform shadow-lg`}>
          <div className="relative">
            <img 
              src={gem.image} 
              alt={gem.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 left-4 px-2 py-1 bg-purple-500 text-white text-sm rounded-full">
              {gem.quality}
            </div>
            <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
              <Heart size={20} className="text-white" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < gem.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                  />
                ))}
              </div>
              <span className={`text-sm ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>{gem.certification}</span>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{gem.name}</h3>
            <p className={`text-sm mb-3 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>{gem.description}</p>
            <div className="space-y-2 mb-4">
              {gem.highlights && gem.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center">
                  <SparklesIcon className={`w-4 h-4 mr-2 ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{highlight}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>${gem.price}</span>
              <Link to={`/gems/${gem.id}`} className={`flex items-center ${
                isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'
              }`}>
                View Details
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Categories Section */}
      {/* <div className="px-4 sm:px-6 lg:px-8 py-12">
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
      </div> */}
    </div>

  );
};

export default GemifyLanding;