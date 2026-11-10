import React from 'react';
import { motion } from 'framer-motion';
import { invitationData } from '../../data/invitationData';
import { VintageDivider, CornerFlourish } from '../Decorative/GoldOrnaments';
import { ImageWithFallback } from '../Common/ImageWithFallback';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Couple: React.FC = () => {
  const { bride, groom } = invitationData.couple;

  return (
    <section id="the-couple" className="relative py-28 sm:py-36 bg-[#140F11] text-ivory-warm overflow-hidden">
      {/* Background Subtle Burgundy Atmosphere */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-burgundy/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gold-antique/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-champagne font-cinzel font-semibold">
            Two Souls Bound by Faith &amp; Love
          </p>
          <h2 className="font-italiana text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6EE] mt-2">
            The Bride &amp; The Groom
          </h2>
          <VintageDivider className="mx-auto w-52 my-5" />
          <p className="font-cormorant italic text-base sm:text-lg text-ivory-muted/80 max-w-xl mx-auto">
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
          </p>
        </div>

        {/* Editorial Magazine Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-8 items-center">
          
          {/* THE BRIDE (Col 1-5) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-right"
          >
            {/* Portrait Frame with Antique Gold Border */}
            <div className="relative w-64 sm:w-72 md:w-80 h-[360px] sm:h-[420px] rounded-t-full rounded-b-lg p-2.5 bg-gradient-to-b from-gold-antique/40 via-burgundy-deep to-obsidian border border-gold-antique/50 shadow-vintage-card mb-6 group">
              <CornerFlourish position="top-left" className="absolute top-3 left-3 w-7 h-7 text-gold-light/60 z-10" />
              <CornerFlourish position="top-right" className="absolute top-3 right-3 w-7 h-7 text-gold-light/60 z-10" />
              
              <div className="w-full h-full rounded-t-full rounded-b overflow-hidden relative">
                <ImageWithFallback
                  src={bride.photo}
                  fallbackSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                  alt={bride.fullName}
                  className="w-full h-full object-cover object-top contrast-[1.04] group-hover:scale-105 transition-all duration-700"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Bride Information */}
            <span className="text-[10px] tracking-[0.35em] uppercase text-gold-champagne font-cinzel font-semibold">
              The Bride
            </span>
            <h3 className="font-italiana text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FAF6EE] mt-1">
              {bride.fullName}
            </h3>
            
            <div className="mt-3 text-sm text-ivory-muted/90 font-sans leading-relaxed">
              <p className="text-xs uppercase tracking-wider text-gold-antique">The Beloved Daughter of</p>
              <p className="font-cormorant text-lg text-ivory-warm font-medium">{bride.fatherName}</p>
              <p className="font-cormorant text-lg text-ivory-warm font-medium">&amp; {bride.motherName}</p>
            </div>

            <p className="font-cormorant italic text-sm text-ivory-muted/75 mt-3 max-w-sm">
              "{bride.bio}"
            </p>

            {bride.instagramHandle && (
              <a
                href={`https://instagram.com/${bride.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-xs tracking-wider text-gold-champagne/80 hover:text-gold-light border-b border-gold-champagne/40 pb-0.5 transition-colors font-sans"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>{bride.instagramHandle}</span>
              </a>
            )}
          </motion.div>

          {/* ORNAMENTAL CENTER AMPERSAND (Col 6) */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center my-4 lg:my-0 select-none">
            <div className="hidden lg:block w-[1px] h-20 bg-gradient-to-b from-transparent to-gold-antique/60" />
            <div className="relative my-4">
              <span className="font-pinyon text-7xl sm:text-8xl lg:text-9xl text-gold-champagne drop-shadow-[0_2px_12px_rgba(200,169,106,0.4)]">
                &amp;
              </span>
            </div>
            <div className="hidden lg:block w-[1px] h-20 bg-gradient-to-t from-transparent to-gold-antique/60" />
          </div>

          {/* THE GROOM (Col 7-11) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Portrait Frame with Antique Gold Border */}
            <div className="relative w-64 sm:w-72 md:w-80 h-[360px] sm:h-[420px] rounded-t-full rounded-b-lg p-2.5 bg-gradient-to-b from-gold-antique/40 via-burgundy-deep to-obsidian border border-gold-antique/50 shadow-vintage-card mb-6 group">
              <CornerFlourish position="top-left" className="absolute top-3 left-3 w-7 h-7 text-gold-light/60 z-10" />
              <CornerFlourish position="top-right" className="absolute top-3 right-3 w-7 h-7 text-gold-light/60 z-10" />

              <div className="w-full h-full rounded-t-full rounded-b overflow-hidden relative">
                <ImageWithFallback
                  src={groom.photo}
                  fallbackSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
                  alt={groom.fullName}
                  className="w-full h-full object-cover object-top contrast-[1.04] group-hover:scale-105 transition-all duration-700"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Groom Information */}
            <span className="text-[10px] tracking-[0.35em] uppercase text-gold-champagne font-cinzel font-semibold">
              The Groom
            </span>
            <h3 className="font-italiana text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FAF6EE] mt-1">
              {groom.fullName}
            </h3>

            <div className="mt-3 text-sm text-ivory-muted/90 font-sans leading-relaxed">
              <p className="text-xs uppercase tracking-wider text-gold-antique">The Beloved Son of</p>
              <p className="font-cormorant text-lg text-ivory-warm font-medium">{groom.fatherName}</p>
              <p className="font-cormorant text-lg text-ivory-warm font-medium">&amp; {groom.motherName}</p>
            </div>

            <p className="font-cormorant italic text-sm text-ivory-muted/75 mt-3 max-w-sm">
              "{groom.bio}"
            </p>

            {groom.instagramHandle && (
              <a
                href={`https://instagram.com/${groom.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-xs tracking-wider text-gold-champagne/80 hover:text-gold-light border-b border-gold-champagne/40 pb-0.5 transition-colors font-sans"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>{groom.instagramHandle}</span>
              </a>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
