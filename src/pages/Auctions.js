import React, { useState } from 'react';
import { 
  Clock, 
  ArrowRight, 
  Search,
  SlidersHorizontal,
  Eye,
  FileText,
  Timer,
  ArrowUpCircle,
  History,
  Star,
  Download
} from 'lucide-react';

const AuctionsPage = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedLot, setSelectedLot] = useState(null);


  const auctionLots = [
    {
      id: 1,
      name: "Natural Blue Sapphire",
      description: "Exceptional 8.52-carat Ceylon sapphire with GRS certification",
      lotNumber: "Lot 001",
      currentBid: 45000,
      timeLeft: "2h 15m",
      weight: "8.52 carats",
      origin: "Ceylon",
      treatment: "No Heat",
      image: "https://www.burtonsgemsandopals.com/cdn/shop/files/heatedbluesapphire.jpg?v=1689299200&width=416",
      documents: [
        { name: "GRS Certificate", size: "2.4 MB" },
        { name: "Quality Report", size: "1.8 MB" },
        { name: "Origin Report", size: "1.2 MB" }
      ],
      bidHistory: [
        { bidder: "Bidder 5492", amount: 45000, time: "5 minutes ago" },
        { bidder: "Bidder 3287", amount: 44000, time: "15 minutes ago" },
        { bidder: "Bidder 7731", amount: 43000, time: "30 minutes ago" }
      ],
      additionalImages: [
        "https://imgix.starlanka.com/static/bluesapphire-imagecategory.jpg",
        "https://www.elizabethjewellers.com/cdn/shop/products/21_4.gif?v=1480696210",
        "https://cdn.shopify.com/s/files/1/0080/0004/5171/products/BS01HMB_d235a2e9-0e0d-4675-9360-07bc9106df89_350x@2x.jpg?v=1625054119"
      ]
    }
    // Add more auction lots as needed
  ];

  // Define upcoming auctions data
  const upcomingAuctions = [
    {
      id: 1,
      name: "Exceptional Colored Diamonds",
      date: "Dec 15, 2024",
      preview: "Dec 10-14",
      lots: 86,
      featured: true,
      image: "https://jewelryinformer.com/wp-content/uploads/2024/01/fancy-colored-diamonds-1024x576-1.jpg"
    },
    {
      id: 2,
      name: "Important Sapphires & Rubies",
      date: "Dec 20, 2024",
      preview: "Dec 15-19",
      lots: 124,
      featured: false,
      image: "https://4cs.gia.edu/wp-content/uploads/2016/03/80147-960x960-ruby-sapphire-gems-300x300.jpg"
    },
    {
      id: 3,
      name: "Rare Emeralds Collection",
      date: "Jan 5, 2025",
      preview: "Dec 28-Jan 3",
      lots: 95,
      featured: true,
      image: "https://hips.hearstapps.com/hmg-prod/images/emeraldauctionphoto-1492452110.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*"
    },
    {
      id: 4,
      name: "Imperial Jadeite Selection",
      date: "Jan 15, 2025",
      preview: "Jan 10-14",
      lots: 72,
      featured: false,
      image: "https://www.gia.edu/images/138016.jpg"
    }
  ];
  // Your existing auctionLots and upcomingAuctions data...

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    } pt-24 transition-colors duration-300`}>
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Gem Auctions
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Discover and bid on the world's most exceptional gemstones. Each gem is thoroughly authenticated and certified by leading gemological laboratories.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className={`flex space-x-4 border-b ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <button
              onClick={() => setActiveTab('live')}
              className={`pb-4 px-4 text-sm font-medium ${
                activeTab === 'live'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Live Auctions
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-4 px-4 text-sm font-medium ${
                activeTab === 'upcoming'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming Auctions
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-4 px-4 text-sm font-medium ${
                activeTab === 'past'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past Results
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'live' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Featured Lot */}
              <div className={`${
                isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
              } rounded-xl p-6`}>
                <div className="aspect-w-4 aspect-h-3 mb-6">
                  <img
                    src={auctionLots[0].image}
                    alt={auctionLots[0].name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className={`text-2xl font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{auctionLots[0].name}</h2>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {auctionLots[0].description}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                      {auctionLots[0].lotNumber}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`rounded-lg p-4 ${
                      isDarkMode ? 'bg-slate-700/30' : 'bg-gray-50'
                    }`}>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Current Bid</div>
                      <div className={`text-xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        ${auctionLots[0].currentBid.toLocaleString()}
                      </div>
                    </div>
                    <div className={`rounded-lg p-4 ${
                      isDarkMode ? 'bg-slate-700/30' : 'bg-gray-50'
                    }`}>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Time Left</div>
                      <div className={`text-xl font-bold flex items-center ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Clock className="w-5 h-5 mr-2 text-purple-400" />
                        {auctionLots[0].timeLeft}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Weight</div>
                      <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        {auctionLots[0].weight}
                      </div>
                    </div>
                    <div>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Origin</div>
                      <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        {auctionLots[0].origin}
                      </div>
                    </div>
                    <div>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Treatment</div>
                      <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        {auctionLots[0].treatment}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium">
                      Place Bid
                    </button>
                    <button className={`px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors ${
                      isDarkMode ? 'bg-slate-700/50 text-white' : 'bg-gray-100 text-gray-900'
                    }`}>
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bid History and Details */}
              <div className="space-y-6">
                {/* Certification */}
                <div className={`rounded-xl p-6 ${
                  isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                }`}>
                  <h3 className={`text-lg font-medium mb-4 flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <FileText className="w-5 h-5 mr-2 text-purple-400" />
                    Certification & Documents
                  </h3>
                  <div className="space-y-3">
                    {auctionLots[0].documents.map((doc, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                        isDarkMode ? 'bg-slate-700/30' : 'bg-gray-50'
                      }`}>
                        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                          {doc.name}
                        </span>
                        <button className="text-purple-400 hover:text-purple-300 flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          <span className="text-sm">{doc.size}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bid History */}
                <div className={`rounded-xl p-6 ${
                  isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                }`}>
                  <h3 className={`text-lg font-medium mb-4 flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <History className="w-5 h-5 mr-2 text-purple-400" />
                    Bid History
                  </h3>
                  <div className="space-y-3">
                    {auctionLots[0].bidHistory.map((bid, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                        isDarkMode ? 'bg-slate-700/30' : 'bg-gray-50'
                      }`}>
                        <div>
                          <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                            {bid.bidder}
                          </div>
                          <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            {bid.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            ${bid.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Images */}
                <div className={`rounded-xl p-6 ${
                  isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                }`}>
                  <h3 className={`text-lg font-medium mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Additional Views</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {auctionLots[0].additionalImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`View ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingAuctions.map((auction) => (
                <div key={auction.id} className={`rounded-xl overflow-hidden group ${
                  isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                }`}>
                  <div className="relative">
                    <img
                      src={auction.image}
                      alt={auction.name}
                      className="w-full h-48 object-cover"
                    />
                    {auction.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{auction.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Date</div>
                        <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                          {auction.date}
                        </div>
                      </div>
                      <div>
                        <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Preview</div>
                        <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                          {auction.preview}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {auction.lots} Lots
                      </span>
                      <button className="text-purple-400 hover:text-purple-300 flex items-center">
                        View Catalog
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionsPage;