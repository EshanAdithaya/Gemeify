'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Quick burst to ~70%, then slow crawl to ~90%, complete on unmount
    const t1 = setTimeout(() => setProgress(30), 50);
    const t2 = setTimeout(() => setProgress(60), 150);
    const t3 = setTimeout(() => setProgress(75), 300);
    const t4 = setTimeout(() => setProgress(88), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 z-[9999] h-[3px] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)',
          boxShadow: '0 0 10px rgba(59,130,246,0.7), 0 0 20px rgba(59,130,246,0.4)',
        }}
      />
      {/* Glow dot at tip */}
      <div
        className="fixed top-0 z-[9999] w-5 h-[3px] transition-all duration-300 ease-out"
        style={{
          left: `calc(${progress}% - 10px)`,
          background: 'radial-gradient(circle, #93c5fd, transparent)',
          filter: 'blur(2px)',
        }}
      />
    </>
  );
}
