import React from 'react';
import { motion } from 'framer-motion';
import { invitationData } from '../../data/invitationData';
import { RoyalFlourish, VintageDivider } from '../Decorative/GoldOrnaments';
import { ImageWithFallback } from '../Common/ImageWithFallback';
import { ChevronDown, Calendar, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToStory = () => {
    const el = document.getElementById('our-story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-obsidian select-none">
      {/* Background Photography with Slow Cinematic Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={invitationData.couple.heroPhoto}
            alt="The Wedding of Aurelia and Christian"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.12] sepia-[0.18]"
            containerClassName="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Cinematic Vignette & Burgundy Color Grading Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/80 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      {/* Main Content Hero Card */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16 flex flex-col items-center justify-center min-h-screen">
        
        {/* Crown Flourish */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <RoyalFlourish className="mx-auto mb-4 text-gold-champagne/80" />
        </motion.div>

        {/* Small Heading */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-antique/30 bg-burgundy-deep/30 backdrop-blur-sm mb-4"
        >
          <Sparkles className="w-3 h-3 text-gold-champagne" />
          <span className="text-[10px] sm:text-xs uppercase font-cinzel text-gold-champagne font-semibold tracking-[0.4em]">
            The Royal Wedding Of
          </span>
          <Sparkles className="w-3 h-3 text-gold-champagne" />
        </motion.div>

        {/* Couple Names - Strongest Typographic Element */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="my-3 sm:my-5"
        >
          <h1 className="font-italiana text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-wide text-[#FAF6EE] leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            <span className="block hover:text-gold-light transition-colors duration-500">
              {invitationData.couple.bride.nickname}
            </span>
            <span className="block my-1 sm:my-2 font-pinyon text-4xl sm:text-6xl md:text-7xl text-gold-champagne font-normal tracking-normal">
              &amp;
            </span>
            <span className="block hover:text-gold-light transition-colors duration-500">
              {invitationData.couple.groom.nickname}
            </span>
          </h1>
        </motion.div>

        {/* Subtitle & Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-cormorant italic text-lg sm:text-2xl text-gold-light max-w-xl mx-auto font-light mt-2"
        >
          "Two Souls, One Beautiful Forever."
        </motion.p>

        <VintageDivider className="w-56 my-5" />

        {/* Wedding Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex items-center gap-2.5 text-xs sm:text-sm tracking-[0.25em] uppercase text-ivory-warm font-cinzel bg-black/50 px-6 py-2.5 rounded-full border border-gold-antique/30 shadow-gold-glow"
        >
          <Calendar className="w-4 h-4 text-gold-champagne" />
          <span>{invitationData.wedding.dateDisplay}</span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-14 sm:mt-16 cursor-pointer flex flex-col items-center group"
          onClick={scrollToStory}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-champagne/70 group-hover:text-gold-light transition-colors font-sans mb-2">
            Scroll to Discover Our Story
          </span>
          <div className="w-7 h-10 rounded-full border border-gold-champagne/50 flex items-start justify-center p-1.5 group-hover:border-gold-light transition-colors">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-gold-champagne"
            />
          </div>
          <ChevronDown className="w-4 h-4 text-gold-champagne/70 mt-1 animate-bounce" />
        </motion.div>

      </div>
    </section>
  );
};

