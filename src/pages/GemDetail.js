import React, { useState } from 'react';
import { 
  X, 
  Heart,
  Star,
  Shield,
  PackageCheck,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';

const GemDetailModal = ({ gem, isOpen, onClose, isDarkMode }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const allImages = [gem.mainImage, ...(gem.additionalImages || [])].filter(Boolean);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className={`relative w-full max-w-6xl ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        } rounded-2xl shadow-xl overflow-hidden`}>
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
              isDarkMode 
                ? 'bg-slate-700 text-white hover:bg-slate-600' 
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2 relative">
              <div className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} 
                   onClick={() => setIsZoomed(!isZoomed)}>
                <img
                  src={allImages[selectedImageIndex]}
                  alt={gem.name}
                  className={`w-full h-[400px] lg:h-[600px] object-cover ${
                    isZoomed ? 'object-cover' : 'object-contain'
                  }`}
                />
                {!isZoomed && (
                  <div className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-lg text-white text-sm flex items-center">
                    <ZoomIn className="w-4 h-4 mr-1" />
                    Click to zoom
                  </div>
                )}
              </div>

              {/* Image Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Thumbnail Navigation */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-lg">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Details Section */}
            <div className="lg:w-1/2 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                    {gem.category}
                  </span>
                  {gem.discount && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                      {gem.discount}% OFF
                    </span>
                  )}
                </div>
                <button className="p-2 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              <h2 className={`text-3xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {gem.name}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className={`ml-1 font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>4.8</span>
                </div>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>•</span>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className={`ml-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{gem.certification} Certified</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className={`text-4xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${gem.price?.toLocaleString()}
                  </div>
                  {gem.discount && (
                    <div className="text-lg text-gray-500 line-through">
                      ${(gem.price * (1 + gem.discount/100)).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Weight', value: `${gem.weight} ct` },
                    { label: 'Cut', value: gem.cut },
                    { label: 'Color', value: gem.color },
                    { label: 'Clarity', value: gem.clarity },
                    { label: 'Origin', value: gem.origin },
                    { label: 'Treatment', value: gem.treatment }
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <dt className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{label}</dt>
                      <dd className={`mt-1 font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{value}</dd>
                    </div>
                  ))}
                </div>

                {gem.description && (
                  <div>
                    <h3 className={`text-lg font-medium mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Description</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {gem.description}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-6 py-4">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-500 mr-2" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Authenticity Guaranteed
                    </span>
                  </div>
                  <div className="flex items-center">
                    <PackageCheck className="w-5 h-5 text-blue-500 mr-2" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Free Shipping
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium">
                    Purchase Now
                  </button>
                  <button className="px-6 py-3 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GemDetailModal;