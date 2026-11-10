import React, { useState, useEffect } from 'react';
import { Menu, X, QrCode } from 'lucide-react';
import { invitationData } from '../../data/invitationData';

interface NavigationProps {
  onOpenGuestPass?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenGuestPass }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'OUR STORY', href: '#our-story' },
    { label: 'THE COUPLE', href: '#the-couple' },
    { label: 'THE WEDDING', href: '#the-wedding' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'WISHES', href: '#wishes' },
    { label: 'GIFT', href: '#gift' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Intersection detection for active section
      const sections = ['home', 'our-story', 'the-couple', 'the-wedding', 'gallery', 'rsvp', 'wishes', 'gift'];
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Desktop & Mobile Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-obsidian/90 backdrop-blur-md border-b border-gold-antique/25 shadow-2xl'
            : 'py-6 bg-gradient-to-b from-obsidian/90 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Couple Monogram Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-full border border-gold-champagne/70 flex items-center justify-center font-cinzel text-xs font-bold text-gold-champagne group-hover:scale-105 group-hover:border-gold-light transition-all bg-burgundy-deep/40 shadow-gold-glow">
              {invitationData.couple.bride.initial}&amp;{invitationData.couple.groom.initial}
            </div>
            <span className="font-italiana tracking-[0.2em] uppercase text-base sm:text-lg font-semibold text-ivory-warm group-hover:text-gold-light transition-colors">
              {invitationData.couple.bride.nickname} &amp; {invitationData.couple.groom.nickname}
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-[11px] tracking-[0.28em] font-cinzel transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-gold-light font-bold'
                      : 'text-ivory-warm/75 hover:text-gold-champagne'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
                  )}
                </a>
              );
            })}

            {/* VIP Pass Button */}
            {onOpenGuestPass && (
              <button
                onClick={onOpenGuestPass}
                className="py-1.5 px-3.5 rounded-full border border-gold-champagne/60 bg-burgundy-deep/50 hover:bg-burgundy text-[10px] tracking-widest font-cinzel uppercase font-bold text-gold-light flex items-center gap-1.5 shadow-gold-glow transition-all"
              >
                <QrCode className="w-3.5 h-3.5 text-gold-champagne" />
                <span>VIP Pass</span>
              </button>
            )}
          </nav>

          {/* Right Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            {onOpenGuestPass && (
              <button
                onClick={onOpenGuestPass}
                className="py-1 px-2.5 rounded-full border border-gold-champagne/50 bg-burgundy-deep/50 text-[10px] font-cinzel text-gold-light flex items-center gap-1"
                aria-label="Open VIP Pass"
              >
                <QrCode className="w-3.5 h-3.5 text-gold-champagne" />
                <span>Pass</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gold-champagne hover:text-gold-light rounded-lg border border-gold-antique/30 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-center items-center bg-obsidian/98 backdrop-blur-2xl p-6 text-center animate-in fade-in duration-300">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-gold-champagne hover:text-gold-light border border-gold-antique/30 rounded-full"
            aria-label="Close navigation"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-8">
            <div className="w-16 h-16 mx-auto rounded-full border border-gold-champagne/80 flex items-center justify-center font-cinzel text-xl font-bold text-gold-champagne bg-burgundy-deep/50 mb-3 shadow-gold-glow">
              {invitationData.couple.bride.initial}&amp;{invitationData.couple.groom.initial}
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-champagne font-cinzel">
              European Vintage Luxury
            </p>
          </div>

          <nav className="flex flex-col space-y-5">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-italiana text-2xl sm:text-3xl tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-gold-light font-bold underline underline-offset-8 decoration-gold-champagne/70'
                      : 'text-ivory-warm/80 hover:text-gold-champagne'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <p className="mt-12 text-xs font-cormorant italic text-ivory-muted/70">
            "{invitationData.tagline}"
          </p>
        </div>
      )}
    </>
  );
};

