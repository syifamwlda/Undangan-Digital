import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { invitationData, GalleryPhoto } from '../../data/invitationData';
import { VintageDivider } from '../Decorative/GoldOrnaments';
import { ImageWithFallback } from '../Common/ImageWithFallback';
import { X, ChevronLeft, ChevronRight, Camera, Maximize2 } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { sectionTitle, sectionSubtitle, photos } = invitationData.gallery;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const activePhoto: GalleryPhoto | null =
    selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  const handleNext = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => ((prev as number) + 1) % photos.length);
  }, [selectedPhotoIndex, photos.length]);

  const handlePrev = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => ((prev as number) - 1 + photos.length) % photos.length);
  }, [selectedPhotoIndex, photos.length]);

  const handleClose = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedPhotoIndex, handleClose, handleNext, handlePrev]);

  return (
    <section id="gallery" className="relative py-28 sm:py-36 bg-[#100C0E] text-ivory-warm overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-antique/30 bg-burgundy-deep/30 backdrop-blur-sm mb-3">
            <Camera className="w-3.5 h-3.5 text-gold-champagne" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-champagne font-cinzel font-semibold">
              Editorial Gallery
            </span>
          </div>

          <h2 className="font-italiana text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6EE] mt-2">
            {sectionTitle}
          </h2>

          <VintageDivider className="mx-auto w-52 my-5" />

          <p className="font-cormorant italic text-base sm:text-lg text-ivory-muted/80">
            {sectionSubtitle}
          </p>
        </div>

        {/* Asymmetrical Fashion Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {photos.map((photo, index) => {
            const isFeatured = photo.featured;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.15 }}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`group relative rounded-xl overflow-hidden cursor-pointer bg-obsidian border border-gold-antique/30 shadow-vintage-card ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Photo Aspect Container */}
                <div
                  className={`w-full overflow-hidden relative ${
                    isFeatured
                      ? 'aspect-[16/10] sm:aspect-[21/11]'
                      : photo.aspectRatio === 'portrait'
                      ? 'aspect-[3/4]'
                      : 'aspect-[4/3]'
                  }`}
                >
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter sepia-[0.08] contrast-[1.06] group-hover:scale-105 group-hover:sepia-0 transition-all duration-700 ease-out"
                    containerClassName="w-full h-full"
                  />

                  {/* Dark Vignette & Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-obsidian/70 backdrop-blur-md border border-gold-antique/40 flex items-center justify-center text-gold-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Caption on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-italiana text-xl sm:text-2xl text-[#FAF6EE] font-semibold drop-shadow-md">
                      {photo.caption}
                    </p>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold-champagne font-cinzel block mt-1">
                      View Photograph • {index + 1} of {photos.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhoto && selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/96 backdrop-blur-2xl p-4 sm:p-8 select-none"
          >
            {/* Top Bar Controls */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30">
              <span className="text-xs uppercase tracking-[0.3em] font-sans text-gold-champagne">
                Photograph {selectedPhotoIndex + 1} / {photos.length}
              </span>

              <button
                onClick={handleClose}
                className="p-2.5 rounded-full bg-black/60 border border-gold-antique/40 text-gold-champagne hover:text-white hover:border-gold-champagne transition-all"
                aria-label="Close Lightbox (ESC)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Previous Navigation Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/60 border border-gold-antique/40 text-gold-champagne hover:text-white hover:border-gold-champagne transition-all focus:outline-none"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/60 border border-gold-antique/40 text-gold-champagne hover:text-white hover:border-gold-champagne transition-all focus:outline-none"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Center Image Display */}
            <div className="relative max-w-5xl max-h-[82vh] flex flex-col items-center">
              <motion.img
                key={activePhoto.id}
                src={activePhoto.url}
                alt={activePhoto.caption}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-[72vh] object-contain rounded-lg border border-gold-antique/30 shadow-2xl"
              />

              {/* Photo Caption */}
              <div className="mt-4 text-center max-w-xl">
                <p className="font-cormorant text-xl sm:text-2xl text-ivory-warm font-medium">
                  {activePhoto.caption}
                </p>
                <p className="text-[11px] font-sans text-ivory-muted/70 tracking-widest mt-1">
                  Use arrow keys or swipe to navigate • Press ESC to close
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

