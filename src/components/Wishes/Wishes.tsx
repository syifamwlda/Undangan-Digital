import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VintageDivider, CornerFlourish } from '../Decorative/GoldOrnaments';
import { Feather, Heart, Send, MessageCircle } from 'lucide-react';

interface WishMessage {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
}

const INITIAL_WISHES: WishMessage[] = [
  {
    id: 'wish-1',
    name: 'Duke & Duchess of Somerset',
    relation: 'Family Friends',
    message: 'May your union be blessed with the timeless grandeur of the Viennese halls where you first met, and the serenity of Lake Como. Dearest Aurelia & Christian, an eternity of joy and steadfast devotion to you both.',
    timestamp: '2 hours ago',
  },
  {
    id: 'wish-2',
    name: 'Dr. Julian & Clarissa Sterling',
    relation: 'Cousins of the Groom',
    message: 'Seeing the profound love between you two renews our faith in true romance. May your hearth always be warm, your laughter abundant, and your love story ever inspiring.',
    timestamp: '5 hours ago',
  },
  {
    id: 'wish-3',
    name: 'Lady Genevieve & Sir Anthony',
    relation: 'Childhood Friends',
    message: 'To the most radiant couple! We cannot wait to raise a glass to you under the grand chandeliers of the palace. Wishing you a lifetime of poetic tomorrows.',
    timestamp: '1 day ago',
  },
];

export const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<WishMessage[]>(INITIAL_WISHES);
  const [name, setName] = useState<string>('');
  const [relation, setRelation] = useState<string>('Esteemed Guest');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Load persisted wishes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_aurelia_christian');
      if (saved) {
        setWishes(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load local wishes:', e);
    }
  }, []);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: WishMessage = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      relation: relation.trim() || 'Esteemed Guest',
      message: message.trim(),
      timestamp: 'Just now',
    };

    setTimeout(() => {
      const updated = [newWish, ...wishes];
      setWishes(updated);
      try {
        localStorage.setItem('wedding_wishes_aurelia_christian', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage save error:', err);
      }

      setName('');
      setMessage('');
      setIsSubmitting(false);
      setFeedback('Your heartfelt letter of love has been added to our guestbook.');
      setTimeout(() => setFeedback(null), 4000);
    }, 500);
  };

  return (
    <section id="wishes" className="relative py-28 sm:py-36 bg-[#120B0E] text-ivory-warm overflow-hidden border-t border-gold-antique/20">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-burgundy/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-antique/30 bg-burgundy-deep/30 backdrop-blur-sm mb-3">
            <Feather className="w-3.5 h-3.5 text-gold-champagne" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-champagne font-cinzel font-semibold">
              Guestbook &amp; Letters
            </span>
          </div>

          <h2 className="font-italiana text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6EE] mt-2">
            Words From The Heart
          </h2>

          <VintageDivider className="mx-auto w-52 my-5" />

          <p className="font-cormorant italic text-base sm:text-lg text-ivory-muted/80">
            Leave your warmest blessings, poetic wishes, and prayers for our eternal journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Wish Submission Form (Cols 1-5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-[#181014] border border-gold-antique/40 shadow-vintage-card relative"
          >
            <h3 className="font-cormorant text-2xl font-semibold text-gold-light mb-1">
              Pen a Love Letter
            </h3>
            <p className="text-xs text-ivory-muted/70 font-sans mb-6">
              Your words will be cherished in our digital remembrance journal.
            </p>

            {feedback && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
                <Heart className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            <form onSubmit={handleAddWish} className="space-y-4">
              <div>
                <label className="block text-xs font-sans tracking-widest uppercase text-gold-champagne mb-1.5">
                  Your Distinguished Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lady Clara or The Sterling Family"
                  className="w-full px-4 py-2.5 bg-obsidian/70 rounded-lg border border-gold-antique/30 text-ivory-warm text-sm placeholder:text-neutral-500 focus:outline-none focus:border-gold-champagne transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans tracking-widest uppercase text-gold-champagne mb-1.5">
                  Relationship / Relation
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="e.g. University Colleague, Dear Friend"
                  className="w-full px-4 py-2.5 bg-obsidian/70 rounded-lg border border-gold-antique/30 text-ivory-warm text-sm placeholder:text-neutral-500 focus:outline-none focus:border-gold-champagne transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans tracking-widest uppercase text-gold-champagne mb-1.5">
                  Your Heartfelt Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your prayers, advice, and blessings..."
                  className="w-full px-4 py-2.5 bg-obsidian/70 rounded-lg border border-gold-antique/30 text-ivory-warm text-sm placeholder:text-neutral-500 focus:outline-none focus:border-gold-champagne transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-gold-shimmer text-obsidian font-sans text-xs tracking-[0.2em] uppercase font-bold transition-all shadow-gold-glow hover:scale-102 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Inscribing...' : 'Send Wedding Wish'}</span>
              </button>
            </form>
          </motion.div>

          {/* Displayed Messages (Cols 6-12) - Vintage Parchment Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7 space-y-5 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
          >
            {wishes.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-obsidian/50 border border-gold-antique/20">
                <MessageCircle className="w-8 h-8 text-gold-champagne/40 mx-auto mb-2" />
                <p className="text-sm font-sans text-ivory-muted/70">
                  No letters inscribed yet. Be the first to grace the couple with your love.
                </p>
              </div>
            ) : (
              wishes.map((item) => (
                <div
                  key={item.id}
                  className="relative p-6 sm:p-7 rounded-xl bg-[#FAF6EE] text-[#1c1216] border-2 border-gold-antique/60 shadow-lg parchment-texture overflow-hidden group hover:shadow-2xl transition-all"
                >
                  {/* Antique Flourish Corners */}
                  <CornerFlourish position="top-left" className="absolute top-2 left-2 w-5 h-5 text-gold-dark/40" />
                  <CornerFlourish position="bottom-right" className="absolute bottom-2 right-2 w-5 h-5 text-gold-dark/40" />

                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="font-italiana text-2xl font-bold text-burgundy-dark leading-tight">
                        {item.name}
                      </h4>
                      <span className="text-[10px] tracking-wider uppercase font-cinzel text-gold-dark font-semibold">
                        {item.relation}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-500 font-sans">
                      {item.timestamp}
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-gold-dark/20 my-2.5" />

                  <p className="font-cormorant italic text-base sm:text-lg text-neutral-800 leading-relaxed">
                    "{item.message}"
                  </p>
                </div>
              ))
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

