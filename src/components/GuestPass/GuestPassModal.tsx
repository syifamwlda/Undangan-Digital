import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Sparkles, Check, Download, ShieldCheck } from 'lucide-react';
import { invitationData } from '../../data/invitationData';
import { CornerFlourish, WaxSealSymbol } from '../Decorative/GoldOrnaments';
import { useToast } from '../Toast/ToastContext';

interface GuestPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuestPassModal: React.FC<GuestPassModalProps> = ({ isOpen, onClose }) => {
  const [guestName, setGuestName] = useState<string>('Distinguished Guest');
  const { showToast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to') || params.get('guest') || params.get('u');
    if (to) {
      setGuestName(decodeURIComponent(to).replace(/\+/g, ' '));
    }
  }, []);

  const handleDownload = () => {
    window.print();
    showToast('Printing or saving VIP Guest Pass...', 'gold');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 backdrop-blur-xl p-4 select-none"
        >
          {/* Close Backdrop Button */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1f1218] via-[#160c12] to-obsidian border-2 border-gold-champagne/60 shadow-2xl text-ivory-warm"
          >
            {/* Corner Filigrees */}
            <CornerFlourish position="top-left" className="absolute top-3 left-3 w-7 h-7 text-gold-champagne/60" />
            <CornerFlourish position="top-right" className="absolute top-3 right-3 w-7 h-7 text-gold-champagne/60" />
            <CornerFlourish position="bottom-left" className="absolute bottom-3 left-3 w-7 h-7 text-gold-champagne/60" />
            <CornerFlourish position="bottom-right" className="absolute bottom-3 right-3 w-7 h-7 text-gold-champagne/60" />

            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gold-champagne hover:text-white rounded-full bg-black/40 border border-gold-antique/30 transition-all z-20"
              aria-label="Close VIP Pass"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Monogram */}
            <div className="text-center mb-4">
              <span className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-gold-champagne block font-bold">
                Royal Wedding Guest Access
              </span>
              <h3 className="font-italiana text-2xl sm:text-3xl text-[#FAF6EE] mt-1 font-semibold">
                VIP Admission Pass
              </h3>
              <div className="w-16 h-[1px] bg-gold-champagne/40 mx-auto my-3" />
            </div>

            {/* Guest Name Display */}
            <div className="p-4 rounded-xl bg-black/50 border border-gold-antique/30 text-center mb-5">
              <span className="text-[9px] uppercase tracking-[0.3em] font-cinzel text-gold-champagne/80 block">
                Honored Guest
              </span>
              <p className="font-italiana text-xl sm:text-2xl font-bold text-[#FFF6E5] mt-0.5">
                {guestName}
              </p>
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-emerald-400 font-sans">
                <ShieldCheck className="w-3 h-3" />
                Verified Digital Guest List
              </span>
            </div>

            {/* QR Code Presentation Box */}
            <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-[#FAF6EE] text-obsidian border-2 border-gold-antique/60 shadow-lg mb-5 relative overflow-hidden">
              <div className="absolute inset-0 parchment-texture opacity-70 pointer-events-none" />

              {/* High-Resolution SVG QR Code Pattern */}
              <svg
                viewBox="0 0 100 100"
                className="w-36 h-36 relative z-10 text-burgundy-dark"
                fill="currentColor"
              >
                {/* QR Marker Top-Left */}
                <rect x="5" y="5" width="26" height="26" rx="2" fill="#35111D" />
                <rect x="9" y="9" width="18" height="18" fill="#FAF6EE" />
                <rect x="13" y="13" width="10" height="10" fill="#35111D" />

                {/* QR Marker Top-Right */}
                <rect x="69" y="5" width="26" height="26" rx="2" fill="#35111D" />
                <rect x="73" y="9" width="18" height="18" fill="#FAF6EE" />
                <rect x="77" y="13" width="10" height="10" fill="#35111D" />

                {/* QR Marker Bottom-Left */}
                <rect x="5" y="69" width="26" height="26" rx="2" fill="#35111D" />
                <rect x="9" y="73" width="18" height="18" fill="#FAF6EE" />
                <rect x="13" y="77" width="10" height="10" fill="#35111D" />

                {/* Central Decorative Monogram Seal */}
                <circle cx="50" cy="50" r="14" fill="#C8A96A" />
                <circle cx="50" cy="50" r="11" fill="#35111D" />
                <text x="50" y="54" fontSize="9" textAnchor="middle" fill="#FAF6EE" fontFamily="serif" fontWeight="bold">
                  A&amp;C
                </text>

                {/* Pattern Data Dots */}
                <rect x="36" y="8" width="4" height="4" fill="#35111D" />
                <rect x="44" y="14" width="4" height="4" fill="#35111D" />
                <rect x="56" y="8" width="4" height="4" fill="#35111D" />
                <rect x="38" y="22" width="4" height="4" fill="#35111D" />
                <rect x="52" y="24" width="4" height="4" fill="#35111D" />
                <rect x="10" y="38" width="4" height="4" fill="#35111D" />
                <rect x="22" y="42" width="4" height="4" fill="#35111D" />
                <rect x="70" y="38" width="4" height="4" fill="#35111D" />
                <rect x="84" y="44" width="4" height="4" fill="#35111D" />
                <rect x="38" y="72" width="4" height="4" fill="#35111D" />
                <rect x="52" y="68" width="4" height="4" fill="#35111D" />
                <rect x="44" y="84" width="4" height="4" fill="#35111D" />
                <rect x="74" y="76" width="4" height="4" fill="#35111D" />
                <rect x="86" y="82" width="4" height="4" fill="#35111D" />
              </svg>

              <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 font-cinzel mt-2 font-bold relative z-10">
                Scan for Express Reception Check-In
              </span>
            </div>

            {/* Event Details Summary */}
            <div className="text-center text-xs font-sans text-ivory-muted/90 space-y-1 mb-6">
              <p className="font-cinzel text-gold-light font-semibold">
                {invitationData.wedding.dateDisplay}
              </p>
              <p className="text-[11px]">
                {invitationData.wedding.events.reception.venueName}
              </p>
              <p className="text-[10px] text-ivory-muted/60">
                Admit: 2 Persons • Black-Tie &amp; Royal Evening Attire
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 rounded-full bg-gold-shimmer text-obsidian font-cinzel text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:scale-102 active:scale-98 transition-all shadow-gold-glow"
              >
                <Download className="w-4 h-4" />
                <span>Save Pass</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-gold-antique/40 hover:border-gold-champagne text-xs font-cinzel tracking-widest uppercase text-gold-champagne transition-all"
              >
                Close
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

