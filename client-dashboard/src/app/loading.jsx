export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Rotating gem facets */}
        <div className="relative w-20 h-20">
          {/* Outer slow spin */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: 'spin 3s linear infinite' }}
          >
            <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
              <polygon
                points="40,4 72,22 72,58 40,76 8,58 8,22"
                stroke="rgba(59,130,246,0.25)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
          {/* Middle reverse spin */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: 'spin 2s linear infinite reverse' }}
          >
            <svg viewBox="0 0 80 80" className="w-14 h-14" fill="none">
              <polygon
                points="40,10 65,24 65,56 40,70 15,56 15,24"
                stroke="rgba(37,99,235,0.45)"
                strokeWidth="1.5"
                fill="rgba(59,130,246,0.05)"
              />
            </svg>
          </div>
          {/* Inner pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-9 h-9" fill="none">
              <polygon
                points="40,18 56,28 56,52 40,62 24,52 24,28"
                fill="rgba(59,130,246,0.15)"
                stroke="rgba(37,99,235,0.8)"
                strokeWidth="1.5"
                style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
              />
            </svg>
          </div>
          {/* Centre dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-2.5 h-2.5 rounded-full bg-blue-600"
              style={{ animation: 'pulse 1s ease-in-out infinite' }}
            />
          </div>
        </div>

        {/* Dot trail */}
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
              style={{
                animation: `bounce 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-400">
          Loading
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scaleY(1); opacity: 0.5; }
          40% { transform: scaleY(1.6); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
