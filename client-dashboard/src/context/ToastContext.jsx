'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error:   AlertCircle,
  info:    Info,
};

const ACCENTS = {
  success: 'border-emerald-500/40 text-emerald-300',
  error:   'border-red-500/40 text-red-300',
  info:    'border-gold-700/40 text-gold-400',
};

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, type = 'success', duration = 3200) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]">
        {toasts.map((t) => {
          const Icon = ICONS[t.type] || Info;
          return (
            <div
              key={t.id}
              role="status"
              className={`flex items-start gap-3 border px-4 py-3 shadow-luxury rounded-sm ${ACCENTS[t.type] || ACCENTS.info}`}
              style={{
                background: 'rgba(14,12,11,0.96)',
                backdropFilter: 'blur(12px)',
                animation: 'fade-up 0.25s ease both',
              }}
            >
              <Icon size={16} className="mt-0.5 shrink-0" />
              <p className="flex-1 text-sm text-pearl-200">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="text-pearl-600 hover:text-pearl-300 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
