import React from 'react';
import { motion } from 'framer-motion';
import { invitationData } from '../../data/invitationData';
import { VintageDivider, CornerFlourish } from '../Decorative/GoldOrnaments';
import { ImageWithFallback } from '../Common/ImageWithFallback';
import { MapPin, Calendar, BookOpen } from 'lucide-react';

export const LoveStory: React.FC = () => {
  const { sectionTitle, sectionSubtitle, chapters } = invitationData.story;

  return (
    <section id="our-story" className="relative py-28 sm:py-36 bg-obsidian text-ivory-warm overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-burgundy/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gold-dark/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-antique/30 bg-burgundy-deep/30 backdrop-blur-sm mb-3">
            <BookOpen className="w-3.5 h-3.5 text-gold-champagne" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-champagne font-cinzel font-semibold">
              Our Journey
            </span>
          </div>

          <h2 className="font-italiana text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6EE] mt-2 leading-tight">
            {sectionTitle}
          </h2>

          <VintageDivider className="mx-auto w-52 my-5" />

          <p className="font-cormorant italic text-base sm:text-lg text-ivory-muted/80">
            {sectionSubtitle}
          </p>
        </div>

        {/* Editorial Journal Timeline */}
        <div className="relative">
          {/* Central Golden Timeline Spine on Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-champagne/40 to-transparent pointer-events-none" />

          <div className="space-y-20 sm:space-y-28">
            {chapters.map((chapter, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Central Node Badge on Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold-champagne/80 bg-obsidian items-center justify-center font-cormorant text-xs font-bold text-gold-champagne shadow-gold-glow z-20">
                    {chapter.chapterNumber}
                  </div>

                  {/* PHOTO COLUMN (Cols 1-6 or 7-12 depending on even/odd) */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? 'lg:pr-8' : 'lg:order-2 lg:pl-8'
                    }`}
                  >
                    <div className="relative rounded-xl overflow-hidden p-2 bg-gradient-to-br from-gold-antique/30 via-burgundy-deep/40 to-obsidian border border-gold-antique/40 shadow-vintage-card group">
                      <CornerFlourish position="top-left" className="absolute top-3 left-3 w-6 h-6 text-gold-light/60 z-10" />
                      <CornerFlourish position="bottom-right" className="absolute bottom-3 right-3 w-6 h-6 text-gold-light/60 z-10" />

                      <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                        <ImageWithFallback
                          src={chapter.image}
                          alt={chapter.title}
                          className="w-full h-full object-cover object-center filter sepia-[0.1] contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                          containerClassName="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* CONTENT COLUMN (Cols 7-12 or 1-6) */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? 'lg:pl-8' : 'lg:order-1 lg:pr-8 lg:text-right'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Chapter number pill */}
                      <div className={`flex items-center gap-2 ${isEven ? 'justify-start' : 'lg:justify-end'}`}>
                        <span className="font-cinzel text-xs tracking-[0.35em] uppercase text-gold-champagne font-bold">
                          Chapter {chapter.chapterNumber}
                        </span>
                        <span className="w-8 h-[1px] bg-gold-champagne/40" />
                      </div>

                      {/* Chapter Title */}
                      <h3 className="font-italiana text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#FAF6EE]">
                        {chapter.title}
                      </h3>

                      {/* Date & Location Pill */}
                      <div className={`flex flex-wrap items-center gap-3 text-xs tracking-wider font-sans text-gold-antique ${isEven ? 'justify-start' : 'lg:justify-end'}`}>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {chapter.date}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {chapter.location}
                        </span>
                      </div>

                      {/* Story narrative */}
                      <p className="text-sm sm:text-base text-ivory-muted/90 font-sans leading-relaxed pt-1">
                        {chapter.description}
                      </p>

                      {/* Editorial quote */}
                      {chapter.quote && (
                        <div className={`pt-2 border-t border-gold-antique/20 ${isEven ? '' : 'lg:text-right'}`}>
                          <p className="font-cormorant italic text-sm text-gold-light">
                            "{chapter.quote}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

