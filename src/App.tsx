import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OpeningEnvelope } from './components/OpeningEnvelope/OpeningEnvelope';
import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './components/Hero/Hero';
import { LoveStory } from './components/LoveStory/LoveStory';
import { Couple } from './components/Couple/Couple';
import { Countdown } from './components/Countdown/Countdown';
import { WeddingEvents } from './components/WeddingEvents/WeddingEvents';
import { DressCode } from './components/DressCode/DressCode';
import { Gallery } from './components/Gallery/Gallery';
import { RSVP } from './components/RSVP/RSVP';
import { Wishes } from './components/Wishes/Wishes';
import { WeddingGift } from './components/Gift/Gift';
import { Closing } from './components/Closing/Closing';
import { Footer } from './components/Footer/Footer';
import { MusicPlayer } from './components/MusicPlayer/MusicPlayer';
import { FloatingParticles } from './components/Decorative/FloatingParticles';
import { FolioPagination } from './components/Navigation/FolioPagination';
import { GuestPassModal } from './components/GuestPass/GuestPassModal';
import { ToastProvider } from './components/Toast/ToastContext';

export const AppContent: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [musicTriggered, setMusicTriggered] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'pages' | 'scroll'>('pages');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isGuestPassOpen, setIsGuestPassOpen] = useState<boolean>(false);

  const pageTitles = [
    'The Wedding Film',
    'Our Love Story',
    'The Couple',
    'The Wedding Day & Countdown',
    'Attire & Gallery',
    'RSVP & Wishes',
    'Gift & Eternity',
  ];

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setMusicTriggered(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === 'pages' ? 'scroll' : 'pages'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory-warm selection:bg-gold-antique selection:text-obsidian overflow-x-hidden">
      {/* Cinematic Opening Screen Envelope */}
      {!isOpened && (
        <OpeningEnvelope onOpen={handleOpenInvitation} />
      )}

      {/* Main Website (visible after opening or skipping) */}
      <div className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Subtle Ambient Golden Dust Particles */}
        <FloatingParticles density={28} />

        {/* Global Navigation Bar with VIP Pass Trigger */}
        <Navigation onOpenGuestPass={() => setIsGuestPassOpen(true)} />

        {/* VIP Admission Guest Pass Modal */}
        <GuestPassModal
          isOpen={isGuestPassOpen}
          onClose={() => setIsGuestPassOpen(false)}
        />

        {/* VIEW MODE: ROYAL FOLIO PAGES (Beda Halaman) */}
        {viewMode === 'pages' ? (
          <main className="min-h-screen pb-24">
            <AnimatePresence mode="wait">
              {currentPage === 1 && (
                <motion.div
                  key="page-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero />
                </motion.div>
              )}

              {currentPage === 2 && (
                <motion.div
                  key="page-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <LoveStory />
                </motion.div>
              )}

              {currentPage === 3 && (
                <motion.div
                  key="page-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <Couple />
                </motion.div>
              )}

              {currentPage === 4 && (
                <motion.div
                  key="page-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <Countdown />
                  <WeddingEvents />
                </motion.div>
              )}

              {currentPage === 5 && (
                <motion.div
                  key="page-5"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <DressCode />
                  <Gallery />
                </motion.div>
              )}

              {currentPage === 6 && (
                <motion.div
                  key="page-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <RSVP />
                  <Wishes />
                </motion.div>
              )}

              {currentPage === 7 && (
                <motion.div
                  key="page-7"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <WeddingGift />
                  <Closing />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        ) : (
          /* VIEW MODE: CONTINUOUS SCROLL */
          <main className="pb-24">
            <Hero />
            <LoveStory />
            <Couple />
            <Countdown />
            <WeddingEvents />
            <DressCode />
            <Gallery />
            <RSVP />
            <Wishes />
            <WeddingGift />
            <Closing />
          </main>
        )}

        <Footer />

        {/* Royal Folio Pagination & View Switcher Bar */}
        <FolioPagination
          currentPage={currentPage}
          totalPages={pageTitles.length}
          pageTitles={pageTitles}
          viewMode={viewMode}
          onPageChange={handlePageChange}
          onToggleViewMode={handleToggleViewMode}
        />

        {/* Persistent Floating Music Player Controller */}
        <MusicPlayer autoPlayTriggered={musicTriggered} />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

export default App;
