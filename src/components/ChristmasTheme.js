import React, { useEffect, useState } from 'react';

const ChristmasTheme = ({ isDarkMode }) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Generate initial snowflakes
    const initialSnowflakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.7,
      size: 4 + Math.random() * 6
    }));
    setSnowflakes(initialSnowflakes);

    // Periodically add new snowflakes
    const interval = setInterval(() => {
      setSnowflakes(prev => {
        if (prev.length > 100) return prev;
        return [...prev, {
          id: Date.now(),
          left: Math.random() * 100,
          animationDuration: 5 + Math.random() * 20,
          opacity: 0.3 + Math.random() * 0.7,
          size: 4 + Math.random() * 6
        }];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
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
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Christmas lights top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 animate-twinkle" />

      {/* Festive corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className={`w-full h-full border-l-4 border-t-4 rounded-tl-xl ${
          isDarkMode ? 'border-red-400/30' : 'border-red-500/30'
        }`} />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className={`w-full h-full border-r-4 border-t-4 rounded-tr-xl ${
          isDarkMode ? 'border-green-400/30' : 'border-green-500/30'
        }`} />
      </div>
    </div>
  );
};

export default ChristmasTheme;