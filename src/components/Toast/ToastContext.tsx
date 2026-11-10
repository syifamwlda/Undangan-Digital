import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Sparkles, AlertCircle } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'gold';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info' | 'gold') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Notifications Container */}
      <div className="fixed top-20 right-4 sm:right-8 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl bg-obsidian/95 border border-gold-champagne/60 text-ivory-warm shadow-2xl backdrop-blur-xl"
            >
              <div className="w-7 h-7 rounded-full bg-burgundy-deep/60 border border-gold-antique/50 flex items-center justify-center flex-shrink-0 text-gold-champagne">
                {toast.type === 'success' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : toast.type === 'info' ? (
                  <AlertCircle className="w-4 h-4 text-sky-400" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-gold-champagne" />
                )}
              </div>
              <p className="text-xs font-sans font-medium tracking-wide text-[#F7EACD]">
                {toast.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

