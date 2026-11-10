import React from 'react';
import { motion } from 'framer-motion';
import { invitationData } from '../../data/invitationData';
import { VintageDivider } from '../Decorative/GoldOrnaments';
import { Sparkles, CheckCircle2, HeartHandshake } from 'lucide-react';

export const DressCode: React.FC = () => {
  const { dressCode } = invitationData.wedding;

  return (
    <section className="relative py-24 sm:py-32 bg-obsidian text-ivory-warm overflow-hidden border-t border-gold-antique/20">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-burgundy-deep/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-antique/30 bg-burgundy/30 backdrop-blur-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-champagne" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold-champagne font-sans font-semibold">
              Guest Guidelines
            </span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-5xl font-normal text-ivory-warm mt-2">
            {dressCode.title}
          </h2>

          <VintageDivider className="mx-auto w-48 my-4" />

          <p className="font-cormorant italic text-base sm:text-lg text-ivory-muted/90">
            "{dressCode.description}"
          </p>
        </div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          className="rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-[#181014] to-obsidian border border-gold-antique/30 shadow-vintage-card backdrop-blur-md"
        >
          {/* Color Palette Swatches */}
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-sans font-semibold mb-4">
              Recommended Color Palette
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {dressCode.colors.map((color) => (
                <div key={color.name} className="flex flex-col items-center group">
                  <div
                    style={{ backgroundColor: color.hex }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gold-champagne/40 shadow-lg group-hover:scale-110 transition-transform duration-300 relative"
                  >
                    <span className="absolute inset-0 rounded-full border border-white/20" />
                  </div>
                  <span className="text-[11px] font-sans font-medium text-ivory-warm mt-2">
                    {color.name}
                  </span>
                  <span className="text-[9px] font-sans text-ivory-muted/60 tracking-wider">
                    {color.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Attire notes */}
          <div className="my-6 p-4 rounded-xl bg-black/40 border border-gold-antique/20 text-center">
            <p className="text-sm font-sans text-ivory-muted/90 leading-relaxed">
              <strong className="text-gold-light font-cormorant text-base block mb-1">Dress Code Notes:</strong>
              {dressCode.attireNotes}
            </p>
          </div>

          {/* Etiquette & Guidelines List */}
          <div className="mt-8 pt-6 border-t border-gold-antique/20">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <HeartHandshake className="w-4 h-4 text-gold-champagne" />
              <h4 className="font-cormorant text-xl text-gold-light font-semibold">
                Celebration Etiquette
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dressCode.guidelines.map((guide, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-obsidian/60 border border-gold-antique/15"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold-champagne flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-ivory-muted/80 font-sans leading-relaxed">
                    {guide}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

