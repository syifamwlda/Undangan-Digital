import React from 'react';

export const VintageDivider: React.FC<{ className?: string }> = ({ className = "w-48 my-6" }) => {
  return (
    <div className={`flex items-center justify-center space-x-3 text-gold-champagne/80 ${className}`}>
      <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-champagne/60 to-gold-champagne" />
      <svg className="w-5 h-5 flex-shrink-0 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.2 8.5L21 9.2L16 13.8L17.5 20.5L12 17L6.5 20.5L8 13.8L3 9.2L9.8 8.5L12 2Z" opacity="0.9" />
      </svg>
      <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-champagne/60 to-gold-champagne" />
    </div>
  );
};

export const RoyalFlourish: React.FC<{ className?: string }> = ({ className = "w-64 h-12" }) => {
  return (
    <div className={`flex justify-center text-gold-champagne/75 ${className}`}>
      <svg viewBox="0 0 300 40" fill="currentColor" className="w-full h-full max-w-[280px]">
        <path d="M150 25 C140 25 135 15 125 15 C115 15 110 25 90 25 C75 25 70 12 50 12 C30 12 15 25 0 25 L0 23 C15 23 28 10 50 10 C70 10 77 23 90 23 C110 23 115 13 125 13 C135 13 140 23 150 23 C160 23 165 13 175 13 C185 13 190 23 210 23 C223 23 230 10 250 10 C272 10 285 23 300 23 L300 25 C285 25 270 12 250 12 C230 12 225 25 210 25 C190 25 185 15 175 15 C165 15 160 25 150 25 Z" />
        <circle cx="150" cy="24" r="3.5" fill="#F5E5C9" />
        <circle cx="130" cy="19" r="2" />
        <circle cx="170" cy="19" r="2" />
        <circle cx="90" cy="24" r="2" />
        <circle cx="210" cy="24" r="2" />
      </svg>
    </div>
  );
};

export const CornerFlourish: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = "w-10 h-10 text-gold-champagne/60" }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-left':
        return '';
      case 'top-right':
        return 'scale-x-[-1]';
      case 'bottom-left':
        return 'scale-y-[-1]';
      case 'bottom-right':
        return 'scale-[-1]';
    }
  };

  return (
    <svg
      viewBox="0 0 60 60"
      fill="currentColor"
      className={`${className} ${getTransform()} pointer-events-none select-none`}
    >
      <path d="M0 0 L60 0 C45 0 35 5 28 12 C20 20 18 30 16 45 C15 52 10 58 0 60 L0 52 C6 50 10 45 11 38 C13 25 16 16 23 10 C30 5 40 2 52 2 L0 2 Z" />
      <circle cx="14" cy="14" r="2.5" />
    </svg>
  );
};

export const WaxSealSymbol: React.FC<{
  monogram: string;
  size?: number;
  className?: string;
}> = ({ monogram, size = 110, className = "" }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full wax-seal-gold flex items-center justify-center p-2 border-2 border-gold-light/40 shadow-2xl ${className}`}
    >
      <div className="w-full h-full rounded-full border border-gold-dark/60 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-gold-antique/90 via-gold-dark to-burgundy-deep/80 text-ivory-warm">
        {/* Rim details */}
        <div className="absolute inset-1 rounded-full border border-dashed border-gold-champagne/50 pointer-events-none" />
        
        {/* Monogram letters */}
        <span className="font-pinyon text-3xl sm:text-4xl text-[#FFF3D6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] select-none">
          {monogram}
        </span>
        <span className="text-[9px] tracking-[0.3em] uppercase text-gold-champagne/90 font-cinzel mt-0.5 font-bold">
          FOREVER
        </span>
      </div>
    </div>
  );
};

