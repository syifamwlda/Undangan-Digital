import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import { invitationData } from '../../data/invitationData';
import { VintageDivider } from '../Decorative/GoldOrnaments';
import { Heart, Clock } from 'lucide-react';

export const Countdown: React.FC = () => {
  const { days, hours, minutes, seconds, isPassed } = useCountdown(invitationData.wedding.dateIso);

  const timeUnits = [
    { label: 'DAYS', value: days },
    { label: 'HOURS', value: hours },
    { label: 'MINUTES', value: minutes },
    { label: 'SECONDS', value: seconds },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#140F11] via-burgundy-deep/70 to-obsidian text-ivory-warm overflow-hidden select-none border-y border-gold-antique/20">
      {/* Background Vignette and Grain */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20 text-center">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-antique/30 bg-burgundy/40 backdrop-blur-sm mb-3">
            <Clock className="w-3.5 h-3.5 text-gold-champagne" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-champagne font-cinzel font-semibold">
              The Sacred Timeline
            </span>
          </div>

          <h2 className="font-italiana text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6EE] mt-2">
            Counting Down to Forever
          </h2>

          <VintageDivider className="mx-auto w-48 my-4" />

          <p className="font-cormorant italic text-base sm:text-lg text-gold-light max-w-md mx-auto">
            Until we pledge our eternity before God and our beloved ones.
          </p>
        </div>

        {/* Countdown Display or Passed State */}
        {isPassed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-2xl bg-burgundy-deep/40 border border-gold-antique/40 backdrop-blur-md max-w-xl mx-auto shadow-gold-glow"
          >
            <Heart className="w-10 h-10 text-gold-champagne mx-auto mb-4 animate-pulse" />
            <h3 className="font-cormorant text-3xl sm:text-4xl text-gold-light font-semibold mb-2">
              And So, Forever Begins.
            </h3>
            <p className="text-sm text-ivory-muted font-sans leading-relaxed">
              The sacred vows have been uttered. Our journey together as husband and wife has joyfully commenced.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {timeUnits.map((unit, index) => (
              <div
                key={unit.label}
                className="relative p-5 sm:p-8 rounded-xl bg-obsidian/75 border border-gold-antique/40 shadow-vintage-card backdrop-blur-sm group hover:border-gold-champagne transition-colors"
              >
                {/* Subtle corner accents */}
                <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-gold-champagne/60" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-gold-champagne/60" />
                <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-t border-l rotate-180 border-gold-champagne/60" />
                <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-t border-r rotate-180 border-gold-champagne/60" />

                {/* Number Display */}
                <span className="block font-italiana text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFF6E5] drop-shadow-[0_2px_12px_rgba(200,169,106,0.35)]">
                  {unit.value < 10 ? `0${unit.value}` : unit.value}
                </span>

                {/* Unit Label */}
                <span className="block text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold-champagne font-cinzel mt-2 font-semibold">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Date Reminder Pill */}
        <div className="mt-12 text-xs sm:text-sm tracking-[0.2em] uppercase font-sans text-ivory-muted/80">
          <span>{invitationData.wedding.dateDisplay}</span>
          <span className="mx-2 text-gold-champagne">•</span>
          <span>{invitationData.wedding.events.akad.city}</span>
        </div>

      </div>
    </section>
  );
};

