import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { invitationData } from '../../data/invitationData';
import { CornerFlourish, RoyalFlourish, WaxSealSymbol } from '../Decorative/GoldOrnaments';
import { FloatingParticles } from '../Decorative/FloatingParticles';
import { MailOpen, Sparkles, ChevronRight } from 'lucide-react';

interface OpeningEnvelopeProps {
  onOpen: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpen }) => {
  const [guestName, setGuestName] = useState<string>('');
  const [openingStage, setOpeningStage] = useState<'idle' | 'breakingSeal' | 'openingFlap' | 'revealingCard' | 'completed'>('idle');

  useEffect(() => {
    // Check for guest name in URL parameters, e.g. ?to=Lord+Arthur or ?guest=Arthur
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to') || params.get('guest') || params.get('u');
    if (to) {
      setGuestName(decodeURIComponent(to).replace(/\+/g, ' '));
    }
  }, []);

  const handleOpenInvitation = () => {
    if (openingStage !== 'idle') return;

    // Stage 1: Break seal
    setOpeningStage('breakingSeal');

    // Stage 2: Open Flap after 600ms
    setTimeout(() => {
      setOpeningStage('openingFlap');
    }, 700);

    // Stage 3: Card slides up after 1300ms
    setTimeout(() => {
      setOpeningStage('revealingCard');
    }, 1400);

    // Stage 4: Fade to main experience after 2600ms
    setTimeout(() => {
      setOpeningStage('completed');
      onOpen();
    }, 2800);
  };

  const handleSkipIntro = () => {
    setOpeningStage('completed');
    onOpen();
  };

  if (openingStage === 'completed') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-obsidian text-ivory-warm select-none"
      >
        {/* Subtle Burgundy Ambient Glow */}
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-burgundy/25 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 film-grain pointer-events-none" />

        {/* Floating golden dust particles */}
        <FloatingParticles density={35} />

        {/* Skip Intro button for accessibility */}
        <div className="absolute top-6 right-6 z-30">
          <button
            onClick={handleSkipIntro}
            className="text-xs uppercase tracking-[0.2em] font-sans text-gold-champagne/70 hover:text-gold-light py-2 px-4 rounded-full border border-gold-champagne/30 hover:border-gold-champagne transition-all duration-300 backdrop-blur-sm bg-obsidian/40 flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-gold-champagne"
            aria-label="Skip cinematic introduction"
          >
            <span>Skip Intro</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Top Header Flourish */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-20 text-center max-w-xl px-4 mb-4 sm:mb-6"
        >
          <RoyalFlourish className="mx-auto mb-3 opacity-80" />
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-champagne font-cinzel font-semibold">
            You Are Cordially Invited
          </p>
          <h2 className="text-2xl sm:text-3xl font-italiana tracking-wider text-ivory-warm mt-1">
            To Celebrate a Love Story
          </h2>
        </motion.div>

        {/* Envelope Composition Container */}
        <div className="relative z-20 w-[92vw] max-w-[460px] h-[340px] sm:h-[370px] flex items-center justify-center perspective-[1200px]">
          
          {/* Back of Envelope */}
          <div className="relative w-full h-full rounded-lg shadow-2xl bg-[#1d1418] border border-gold-antique/30 overflow-visible flex items-center justify-center">
            
            {/* Corner Filigree Flourishes on Envelope */}
            <div className="absolute top-2 left-2">
              <CornerFlourish position="top-left" className="w-8 h-8 text-gold-champagne/40" />
            </div>
            <div className="absolute top-2 right-2">
              <CornerFlourish position="top-right" className="w-8 h-8 text-gold-champagne/40" />
            </div>
            <div className="absolute bottom-2 left-2">
              <CornerFlourish position="bottom-left" className="w-8 h-8 text-gold-champagne/40" />
            </div>
            <div className="absolute bottom-2 right-2">
              <CornerFlourish position="bottom-right" className="w-8 h-8 text-gold-champagne/40" />
            </div>

            {/* Subtle inner border */}
            <div className="absolute inset-3 border border-gold-champagne/20 rounded pointer-events-none" />

            {/* INVITATION CARD (Sliding Upwards during reveal) */}
            <motion.div
              initial={{ y: 0, opacity: 0.85, scale: 0.94 }}
              animate={
                openingStage === 'revealingCard'
                  ? { y: -140, opacity: 1, scale: 1, zIndex: 40 }
                  : { y: 0, opacity: 0.85, scale: 0.94, zIndex: 10 }
              }
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-[88%] h-[84%] bg-[#FAF6EE] text-obsidian rounded shadow-2xl p-5 flex flex-col justify-between border-2 border-gold-antique/60 select-none overflow-hidden"
            >
              {/* Parchment background effect */}
              <div className="absolute inset-0 parchment-texture opacity-90 pointer-events-none" />
              <div className="absolute inset-2 border border-dashed border-gold-dark/40 pointer-events-none" />

              <div className="relative z-10 text-center pt-1">
                <span className="text-[10px] tracking-[0.35em] uppercase text-gold-dark font-cinzel font-semibold">
                  Royal Wedding Invitation
                </span>
                <div className="w-12 h-[1px] bg-gold-dark/40 mx-auto my-1.5" />
                <h3 className="font-italiana text-2xl sm:text-3xl font-bold tracking-wide text-burgundy-dark leading-tight mt-1">
                  {invitationData.couple.bride.nickname} &amp; {invitationData.couple.groom.nickname}
                </h3>
                <p className="font-cormorant italic text-sm text-neutral-700 mt-1">
                  {invitationData.tagline}
                </p>
              </div>

              <div className="relative z-10 text-center py-2 bg-burgundy-deep/5 rounded border border-gold-antique/20 my-auto">
                <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-500 font-cinzel">
                  The Matrimony
                </p>
                <p className="font-italiana text-base sm:text-lg font-semibold text-burgundy">
                  {invitationData.wedding.dateDisplay}
                </p>
                <p className="text-[11px] text-neutral-600 font-sans">
                  {invitationData.wedding.events.reception.city}
                </p>
              </div>

              <div className="relative z-10 text-center pb-1">
                <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-cinzel">
                  Official Digital Invitation
                </p>
              </div>
            </motion.div>

            {/* ENVELOPE TRIANGULAR FLAP (3D Animated) */}
            <motion.div
              style={{ transformOrigin: 'top center' }}
              initial={{ rotateX: 0 }}
              animate={
                openingStage === 'openingFlap' || openingStage === 'revealingCard'
                  ? { rotateX: 180, zIndex: 5 }
                  : { rotateX: 0, zIndex: 25 }
              }
              transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
              className="absolute top-0 left-0 right-0 h-1/2 overflow-visible pointer-events-none"
            >
              {/* Flap SVG Polygon with Paper Shadow */}
              <svg
                viewBox="0 0 460 170"
                className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                preserveAspectRatio="none"
              >
                <polygon
                  points="0,0 460,0 230,170"
                  fill="#2A101A"
                  stroke="#A8874C"
                  strokeWidth="1.5"
                />
                <line x1="0" y1="0" x2="230" y2="170" stroke="#C8A96A" strokeWidth="0.8" opacity="0.6" />
                <line x1="460" y1="0" x2="230" y2="170" stroke="#C8A96A" strokeWidth="0.8" opacity="0.6" />
              </svg>
            </motion.div>

            {/* ENVELOPE LOWER BODY POCKET OVERLAY (Covers lower half of card before it slides up) */}
            <div className="absolute bottom-0 left-0 right-0 h-[65%] z-20 pointer-events-none overflow-hidden rounded-b-lg">
              <svg viewBox="0 0 460 220" className="w-full h-full" preserveAspectRatio="none">
                <polygon
                  points="0,220 460,220 460,0 230,120 0,0"
                  fill="#1D0C13"
                  stroke="#A8874C"
                  strokeWidth="1.2"
                />
              </svg>
            </div>

            {/* WAX SEAL (Centered at Flap Point) */}
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={
                openingStage === 'breakingSeal'
                  ? { scale: [1, 1.25, 0.9], rotate: [0, -10, 15], opacity: [1, 0.8, 0] }
                  : openingStage === 'openingFlap' || openingStage === 'revealingCard'
                  ? { opacity: 0, scale: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.6 }}
              className="absolute z-35 top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <WaxSealSymbol monogram={invitationData.couple.monogram} size={96} />
            </motion.div>
          </div>
        </div>

        {/* Personalized Guest Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-20 text-center mt-5 sm:mt-7 px-4 max-w-md"
        >
          <div className="inline-block px-6 py-2.5 rounded border border-gold-antique/30 bg-burgundy-deep/40 backdrop-blur-md mb-4 shadow-lg">
            <p className="text-[10px] tracking-[0.35em] uppercase text-gold-champagne/80 font-cinzel">
              Dear Esteemed Guest
            </p>
            <h4 className="font-italiana text-2xl sm:text-3xl font-semibold text-[#FAF6EE] mt-0.5 tracking-wide">
              {guestName || 'Distinguished Guest & Family'}
            </h4>
          </div>

          {/* Action Open Button */}
          <div>
            <button
              onClick={handleOpenInvitation}
              disabled={openingStage !== 'idle'}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full overflow-hidden text-obsidian font-cinzel text-xs tracking-[0.3em] uppercase font-bold transition-all duration-500 shadow-gold-glow hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-champagne cursor-pointer disabled:opacity-50"
            >
              {/* Button Gold Foil Shimmer Background */}
              <span className="absolute inset-0 bg-gold-shimmer group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <MailOpen className="w-4 h-4 text-obsidian" />
                <span>Open Your Invitation</span>
                <Sparkles className="w-3.5 h-3.5 text-obsidian animate-pulse" />
              </span>
            </button>
          </div>

          <p className="text-[11px] text-ivory-muted/70 font-sans tracking-wider mt-3">
            Click to unfold our formal invitation letter &amp; soundtrack
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
