import React from 'react';
import { motion } from 'framer-motion';
import { invitationData } from '../../data/invitationData';
import { RoyalFlourish, VintageDivider } from '../Decorative/GoldOrnaments';
import { ImageWithFallback } from '../Common/ImageWithFallback';
import { ArrowUp } from 'lucide-react';

export const Closing: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-obsidian text-ivory-warm overflow-hidden select-none">
      {/* Background Photography with Slow Zoom & Cinematic Vignette */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={invitationData.couple.closingPhoto}
            alt="Forever and Always"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.1] sepia-[0.2]"
            containerClassName="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Cinematic Vignette Layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/90 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      {/* Central Content */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center py-24">
        
        <RoyalFlourish className="mx-auto mb-6 opacity-80" />

        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-cinzel text-gold-champagne font-semibold mb-3"
        >
          Forever And Always
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-italiana text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6EE] leading-tight"
        >
          And So, Our Forever Begins.
        </motion.h2>

        <VintageDivider className="mx-auto w-56 my-6" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-cormorant italic text-lg sm:text-2xl text-gold-light max-w-xl mx-auto leading-relaxed"
        >
          "Thank you for being part of our beautiful beginning and gracing our eternal love story."
        </motion.p>

        <div className="mt-8">
          <p className="font-italiana text-3xl sm:text-4xl font-semibold text-ivory-warm">
            {invitationData.couple.bride.nickname} &amp; {invitationData.couple.groom.nickname}
          </p>
          <p className="text-xs uppercase tracking-[0.28em] text-gold-antique font-cinzel mt-2 font-medium">
            {invitationData.wedding.dateDisplay}
          </p>
          <p className="font-pinyon text-3xl sm:text-5xl text-gold-champagne mt-4">
            With Love, Always.
          </p>
        </div>

        {/* Back to Top Button */}
        <div className="mt-14">
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold-antique/40 hover:border-gold-champagne bg-obsidian/60 hover:bg-burgundy-deep/60 backdrop-blur-md text-xs font-sans uppercase tracking-widest text-gold-champagne hover:text-gold-light transition-all duration-300"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

