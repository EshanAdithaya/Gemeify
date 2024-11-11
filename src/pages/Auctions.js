import React, { useState } from 'react';
import { 
  Clock, 
  ArrowRight, 
  Search,
  SlidersHorizontal,
  Eye,
  FileText,  // Changed from Certificate
  Timer,
  ArrowUpCircle,
  History,
  Star,
  Download
} from 'lucide-react';

const AuctionsPage = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedLot, setSelectedLot] = useState(null);

  const auctionLots = [
    {
      id: 1,
      name: "Exceptional Kashmir Sapphire",
      currentBid: 158000,
      estimatedValue: "150,000 - 200,000",
      timeLeft: "2d 4h 35m",
      bids: 24,
      watchers: 156,
      image: "/api/placeholder/800/600",
      description: "An extraordinary 8.2-carat Kashmir sapphire of exceptional color and clarity. Accompanied by GRS certificate.",
      weight: "8.2 carats",
      color: "Royal Blue",
      origin: "Kashmir, India",
      treatment: "No Heat",
      certification: "GRS, AGL",
      lotNumber: "LOT 4281",
      condition: "Excellent",
      bidHistory: [
        { time: "2h ago", amount: 158000, bidder: "Client 4281" },
        { time: "4h ago", amount: 155000, bidder: "Client 3892" },
        { time: "6h ago", amount: 152000, bidder: "Client 4281" }
      ],
      additionalImages: [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
      ],
      documents: [
        { name: "GRS Certificate", size: "2.4 MB" },
        { name: "AGL Report", size: "1.8 MB" },
        { name: "Provenance History", size: "1.2 MB" }
      ]
    },
    // Add more auction lots...
  ];

  const upcomingAuctions = [
    {
      id: 101,
      name: "Rare Colombian Emerald Collection",
      date: "Dec 15, 2024",
      preview: "Dec 10-14",
      lots: 45,
      image: "/api/placeholder/600/400",
      featured: true
    },
    {
      id: 102,
      name: "Imperial Jade Exhibition",
      date: "Dec 20, 2024",
      preview: "Dec 16-19",
      lots: 32,
      image: "/api/placeholder/600/400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-24">
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Gem Auctions
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Discover and bid on the world's most exceptional gemstones. Each gem is thoroughly authenticated and certified by leading gemological laboratories.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-4 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('live')}
              className={`pb-4 px-4 text-sm font-medium ${
                activeTab === 'live'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Live Auctions
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-4 px-4 text-sm font-medium ${
                activeTab === 'upcoming'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Upcoming Auctions
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-4 px-4 text-sm font-medium ${
                activeTab === 'past'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
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
              <div className="bg-slate-800/50 rounded-xl p-6">
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
                      <h2 className="text-2xl font-bold text-white mb-2">{auctionLots[0].name}</h2>
                      <p className="text-gray-400">{auctionLots[0].description}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                      {auctionLots[0].lotNumber}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Current Bid</div>
                      <div className="text-xl font-bold text-white">
                        ${auctionLots[0].currentBid.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Time Left</div>
                      <div className="text-xl font-bold text-white flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-purple-400" />
                        {auctionLots[0].timeLeft}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 mb-1">Weight</div>
                      <div className="text-white">{auctionLots[0].weight}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Origin</div>
                      <div className="text-white">{auctionLots[0].origin}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Treatment</div>
                      <div className="text-white">{auctionLots[0].treatment}</div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium">
                      Place Bid
                    </button>
                    <button className="px-4 py-3 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bid History and Details */}
              <div className="space-y-6">
                {/* Certification */}
                <div className="bg-slate-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-400" />
                    Certification & Documents
                  </h3>
                  <div className="space-y-3">
                    {auctionLots[0].documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-white">{doc.name}</span>
                        <button className="text-purple-400 hover:text-purple-300 flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          <span className="text-sm">{doc.size}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bid History */}
                <div className="bg-slate-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                    <History className="w-5 h-5 mr-2 text-purple-400" />
                    Bid History
                  </h3>
                  <div className="space-y-3">
                    {auctionLots[0].bidHistory.map((bid, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <div className="text-white">{bid.bidder}</div>
                          <div className="text-sm text-gray-400">{bid.time}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            ${bid.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Images */}
                <div className="bg-slate-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Additional Views</h3>
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
                <div key={auction.id} className="bg-slate-800/50 rounded-xl overflow-hidden group">
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
                    <h3 className="text-xl font-bold text-white mb-2">{auction.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400">Date</div>
                        <div className="text-white">{auction.date}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Preview</div>
                        <div className="text-white">{auction.preview}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{auction.lots} Lots</span>
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