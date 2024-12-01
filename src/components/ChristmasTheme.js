import React, { useEffect, useState, useCallback } from 'react';

const ChristmasTheme = ({ isDarkMode }) => {
  const [snowflakes, setSnowflakes] = useState([]);
  const MAX_SNOWFLAKES = 100;

  // Create a single snowflake with a unique ID
  const createSnowflake = useCallback((index) => ({
    id: `snowflake-${Date.now()}-${index}`,
    left: Math.random() * 100,
    animationDuration: 5 + Math.random() * 10,
    opacity: 0.3 + Math.random() * 0.7,
    size: 4 + Math.random() * 6
  }), []);

  // Add a new snowflake and remove old ones
  const addSnowflake = useCallback(() => {
    setSnowflakes(prev => {
      // Remove snowflakes that have completed their animation
      const activeSnowflakes = prev.slice(-MAX_SNOWFLAKES);
      
      // Add new snowflake
      return [...activeSnowflakes, createSnowflake(prev.length)];
    });
  }, [createSnowflake]);

  useEffect(() => {
    // Generate initial batch of snowflakes
    const initialSnowflakes = Array.from(
      { length: 30 }, 
      (_, i) => createSnowflake(i)
    );
    setSnowflakes(initialSnowflakes);

    // Set up interval for adding new snowflakes
    const interval = setInterval(addSnowflake, 500);

    // Cleanup function
    return () => {
      clearInterval(interval);
      setSnowflakes([]);
    };
  }, [createSnowflake, addSnowflake]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Snowflakes */}
      {snowflakes.map(snowflake => (
        <div
          key={snowflake.id}
          className="absolute animate-fall"
          style={{
            left: `${snowflake.left}%`,
            top: '-20px',
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            opacity: snowflake.opacity,
            background: isDarkMode ? 'white' : '#e5e7eb',
            borderRadius: '50%',
            animation: `fall ${snowflake.animationDuration}s linear infinite`,
            filter: 'blur(1px)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
      ))}

      {/* Christmas lights top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500" 
        style={{
          animation: 'twinkle 2s ease-in-out infinite'
        }}
      />

      {/* Festive corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div 
          className={`w-full h-full border-l-4 border-t-4 rounded-tl-xl transition-colors duration-300 ${
            isDarkMode ? 'border-red-400/30' : 'border-red-500/30'
          }`} 
        />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div 
          className={`w-full h-full border-r-4 border-t-4 rounded-tr-xl transition-colors duration-300 ${
            isDarkMode ? 'border-green-400/30' : 'border-green-500/30'
          }`}
        />
      </div>
    </div>
  );
};

export default ChristmasTheme;