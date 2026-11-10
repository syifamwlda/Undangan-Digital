import React from 'react';
import { invitationData } from '../../data/invitationData';

export const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-[#0a0709] border-t border-gold-antique/20 text-center text-ivory-warm/75 text-xs font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <p className="font-cormorant text-xl tracking-widest text-gold-champagne font-semibold mb-1">
          {invitationData.projectName}
        </p>
        <p className="text-[11px] uppercase tracking-[0.25em] text-ivory-muted/70 mb-4 font-sans">
          {invitationData.wedding.hashtag}
        </p>

        <p className="text-[10px] text-ivory-muted/60 tracking-wider">
          European Royal Vintage Luxury Wedding Invitation • Crafted with Eternal Devotion
        </p>
        <p className="text-[10px] text-ivory-muted/50 mt-1">
          Soundtrack: {invitationData.music.title} — {invitationData.music.artist}
        </p>
      </div>
    </footer>
  );
};

