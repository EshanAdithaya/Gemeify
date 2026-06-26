'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error:   AlertCircle,
  info:    Info,
};

const STYLES = {
  success: {
    border: 'border-emerald-200',
    bg:     'bg-emerald-50',
    icon:   'text-emerald-600',
    text:   'text-emerald-900',
    close:  'text-emerald-400 hover:text-emerald-700',
  },
  error: {
    border: 'border-red-200',
    bg:     'bg-red-50',
    icon:   'text-red-500',
    text:   'text-red-800',
    close:  'text-red-300 hover:text-red-600',
  },
  info: {
    border: 'border-royal-200',
    bg:     'bg-royal-50',
    icon:   'text-royal-600',
    text:   'text-royal-900',
    close:  'text-royal-300 hover:text-royal-600',
  },
};

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, type = 'success', duration = 4000) => {
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
          const Icon  = ICONS[t.type] || Info;
          const style = STYLES[t.type] || STYLES.info;
          return (
            <div
              key={t.id}
              role="alert"
              className={`flex items-start gap-3 border px-4 py-3 rounded-lg shadow-card ${style.border} ${style.bg}`}
              style={{ animation: 'fade-up 0.25s ease both' }}
            >
              <Icon size={16} className={`mt-0.5 shrink-0 ${style.icon}`} />
              <p className={`flex-1 text-sm font-medium ${style.text}`}>{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className={`transition-colors ${style.close}`}
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
