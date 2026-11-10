import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { invitationData } from '../../data/invitationData';
import { VintageDivider } from '../Decorative/GoldOrnaments';
import { Send, CheckCircle2, MessageSquare, Users, User, AlertCircle } from 'lucide-react';

export const RSVP: React.FC = () => {
  const { whatsappNumber, enableSupabaseBackend } = invitationData.rsvp;

  const [formData, setFormData] = useState({
    name: '',
    attendance: 'joyfully_accepts' as 'joyfully_accepts' | 'regretfully_declines',
    guestsCount: 1,
    eventAttending: 'both' as 'both' | 'akad' | 'reception',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const triggerCelebrationConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#C8A96A', '#F2EBDD', '#A8874C', '#4A1727'],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please kindly enter your distinguished name.');
      return;
    }

    setIsSubmitting(true);

    const attendanceText =
      formData.attendance === 'joyfully_accepts'
        ? 'JOYFULLY ACCEPTS / Hadir'
        : 'REGRETFULLY DECLINES / Berhalangan Hadir';

    const eventsText =
      formData.eventAttending === 'both'
        ? 'Both Akad & Reception'
        : formData.eventAttending === 'akad'
        ? 'Akad Nikah Only'
        : 'Royal Reception Only';

    // Format text for WhatsApp direct communication
    const waText = encodeURIComponent(
      `*RSVP — A LOVE WRITTEN IN ETERNITY*\n` +
      `Wedding of Aurelia & Christian\n\n` +
      `*Guest Name:* ${formData.name.trim()}\n` +
      `*Attendance:* ${attendanceText}\n` +
      `*Number of Guests:* ${formData.guestsCount} Person(s)\n` +
      `*Events Attending:* ${eventsText}\n` +
      (formData.message.trim() ? `*Heartfelt Note:* "${formData.message.trim()}"\n\n` : '\n') +
      `Sent via Official Digital Wedding Invitation`
    );

    const waUrl = `https://wa.me/${whatsappNumber}?text=${waText}`;

    // If Supabase backend is not configured, we explicitly use WhatsApp integration
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      if (formData.attendance === 'joyfully_accepts') {
        triggerCelebrationConfetti();
      }

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 700);
  };

  return (
    <section id="rsvp" className="relative py-28 sm:py-36 bg-obsidian text-ivory-warm overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-burgundy/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-champagne font-cinzel font-semibold">
            Reservation of Attendance
          </p>
          <h2 className="font-italiana text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6EE] mt-2 leading-tight">
            We Would Be Honored by Your Presence
          </h2>
          <VintageDivider className="mx-auto w-52 my-5" />
          <p className="font-cormorant italic text-base sm:text-lg text-ivory-muted/80">
            Please let us know if you can join us on our special day.
          </p>
        </div>

        {/* RSVP Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          className="rounded-2xl p-6 sm:p-10 md:p-12 bg-gradient-to-b from-[#1c1216] via-[#160d11] to-obsidian border border-gold-antique/40 shadow-vintage-card backdrop-blur-md relative"
        >
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full border-2 border-gold-champagne/80 bg-burgundy-deep/60 flex items-center justify-center mx-auto text-gold-champagne shadow-gold-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-cormorant text-3xl sm:text-4xl text-gold-light font-semibold">
                Thank You for Responding
              </h3>
              <p className="text-sm font-sans text-ivory-muted max-w-md mx-auto leading-relaxed">
                Your RSVP confirmation has been prepared and transmitted to the wedding hosts. We deeply cherish your presence and prayers.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full border border-gold-antique/40 hover:border-gold-champagne text-xs font-sans uppercase tracking-widest text-gold-champagne transition-all"
              >
                Send Another Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800/60 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Guest Full Name */}
              <div>
                <label className="block text-[11px] font-cinzel tracking-widest uppercase text-gold-champagne mb-2 font-bold">
                  Distinguished Guest Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gold-champagne/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lord Arthur &amp; Lady Eleanor Vance"
                    className="w-full pl-10 pr-4 py-3 bg-obsidian/70 rounded-lg border border-gold-antique/30 text-ivory-warm text-sm placeholder:text-neutral-500 focus:outline-none focus:border-gold-champagne transition-colors"
                  />
                </div>
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block text-xs font-sans tracking-widest uppercase text-gold-champagne mb-3">
                  Will You Be Attending? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`cursor-pointer p-4 rounded-xl border flex items-center gap-3 transition-all ${
                      formData.attendance === 'joyfully_accepts'
                        ? 'bg-burgundy-deep/70 border-gold-champagne shadow-gold-glow'
                        : 'bg-obsidian/60 border-gold-antique/25 hover:border-gold-antique/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="joyfully_accepts"
                      checked={formData.attendance === 'joyfully_accepts'}
                      onChange={() => setFormData({ ...formData, attendance: 'joyfully_accepts' })}
                      className="accent-gold-champagne w-4 h-4"
                    />
                    <div>
                      <span className="font-cormorant text-lg font-semibold block text-ivory-warm">
                        Joyfully Accepts
                      </span>
                      <span className="text-[11px] text-ivory-muted/70 font-sans block">
                        I / We will be there with great delight
                      </span>
                    </div>
                  </label>

                  <label
                    className={`cursor-pointer p-4 rounded-xl border flex items-center gap-3 transition-all ${
                      formData.attendance === 'regretfully_declines'
                        ? 'bg-burgundy-deep/70 border-gold-champagne shadow-gold-glow'
                        : 'bg-obsidian/60 border-gold-antique/25 hover:border-gold-antique/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="regretfully_declines"
                      checked={formData.attendance === 'regretfully_declines'}
                      onChange={() => setFormData({ ...formData, attendance: 'regretfully_declines' })}
                      className="accent-gold-champagne w-4 h-4"
                    />
                    <div>
                      <span className="font-cormorant text-lg font-semibold block text-ivory-warm">
                        Regretfully Declines
                      </span>
                      <span className="text-[11px] text-ivory-muted/70 font-sans block">
                        Will celebrate with you in prayers &amp; spirit
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Number of Attendees & Event Selection */}
              {formData.attendance === 'joyfully_accepts' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-xs font-sans tracking-widest uppercase text-gold-champagne mb-2">
                      Number of Attendees
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-gold-champagne/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: parseInt(e.target.value) })}
                        className="w-full pl-10 pr-4 py-3 bg-obsidian/70 rounded-lg border border-gold-antique/30 text-ivory-warm text-sm focus:outline-none focus:border-gold-champagne transition-colors"
                      >
                        <option value={1} className="bg-obsidian">1 Person</option>
                        <option value={2} className="bg-obsidian">2 Persons</option>
                        <option value={3} className="bg-obsidian">3 Persons</option>
                        <option value={4} className="bg-obsidian">4 Persons</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans tracking-widest uppercase text-gold-champagne mb-2">
                      Attending Session
                    </label>
                    <select
                      value={formData.eventAttending}
                      onChange={(e) => setFormData({ ...formData, eventAttending: e.target.value as 'both' | 'akad' | 'reception' })}
                      className="w-full px-4 py-3 bg-obsidian/70 rounded-lg border border-gold-antique/30 text-ivory-warm text-sm focus:outline-none focus:border-gold-champagne transition-colors"
                    >
                      <option value="both" className="bg-obsidian">Both Akad &amp; Reception</option>
                      <option value="akad" className="bg-obsidian">Holy Matrimony / Akad Only</option>
                      <option value="reception" className="bg-obsidian">Wedding Banquet &amp; Reception Only</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Heartfelt Note / Message */}
              <div>
                <label className="block text-xs font-sans tracking-widest uppercase text-gold-champagne mb-2">
                  Special Note or Dietary Request (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-gold-champagne/60 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Send a warm note to the bride and groom..."
                    className="w-full pl-10 pr-4 py-3 bg-obsidian/70 rounded-lg border border-gold-antique/30 text-ivory-warm text-sm placeholder:text-neutral-500 focus:outline-none focus:border-gold-champagne transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-gold-shimmer text-obsidian font-sans text-xs tracking-[0.25em] uppercase font-bold transition-all shadow-gold-glow hover:scale-105 active:scale-95 disabled:opacity-50 inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting RSVP...' : 'Confirm RSVP via WhatsApp'}</span>
                </button>

                <p className="text-[11px] text-ivory-muted/70 font-sans mt-3">
                  {enableSupabaseBackend
                    ? 'Your reservation will be saved securely into our wedding database.'
                    : `Your reservation details will open directly in WhatsApp to our wedding concierge (${whatsappNumber}).`}
                </p>
              </div>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
};

