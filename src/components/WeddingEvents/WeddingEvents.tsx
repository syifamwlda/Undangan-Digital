import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { invitationData, EventDetail } from '../../data/invitationData';
import { VintageDivider, CornerFlourish } from '../Decorative/GoldOrnaments';
import { useToast } from '../Toast/ToastContext';
import { MapPin, Calendar, Clock, Copy, Check, ExternalLink, CalendarPlus } from 'lucide-react';

export const WeddingEvents: React.FC = () => {
  const { akad, reception } = invitationData.wedding.events;
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleCopyAddress = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(id);
    showToast('Venue address copied to clipboard', 'gold');
    setTimeout(() => setCopiedAddress(null), 2500);
  };

  // Helper to generate Google Calendar or download .ics
  const handleAddToCalendar = (event: EventDetail) => {
    // Generate .ics file for broad compatibility (Apple Calendar, Outlook, Google)
    const startDate = event.calendarEvent.startIso.replace(/[-:]/g, '').split('+')[0] + 'Z';
    const endDate = event.calendarEvent.endIso.replace(/[-:]/g, '').split('+')[0] + 'Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//A Love Written in Eternity//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.calendarEvent.title}`,
      `DESCRIPTION:${event.calendarEvent.description}`,
      `LOCATION:${event.calendarEvent.location} - ${event.address}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Added ${event.title} to your calendar`, 'success');
  };

  const renderEventCard = (event: EventDetail, id: string, badgeText: string) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9 }}
        className="relative rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-[#1c1216] via-[#160d11] to-obsidian border border-gold-antique/40 shadow-vintage-card flex flex-col justify-between group hover:border-gold-champagne transition-all duration-500"
      >
        {/* Antique Corner Flourishes */}
        <CornerFlourish position="top-left" className="absolute top-3 left-3 w-7 h-7 text-gold-champagne/50" />
        <CornerFlourish position="top-right" className="absolute top-3 right-3 w-7 h-7 text-gold-champagne/50" />
        <CornerFlourish position="bottom-left" className="absolute bottom-3 left-3 w-7 h-7 text-gold-champagne/50" />
        <CornerFlourish position="bottom-right" className="absolute bottom-3 right-3 w-7 h-7 text-gold-champagne/50" />

        <div>
          {/* Badge */}
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-cinzel font-bold text-gold-champagne bg-burgundy-deep/60 border border-gold-antique/30">
              {badgeText}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-italiana text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#FAF6EE]">
            {event.title}
          </h3>

          <p className="font-cormorant italic text-sm text-center text-gold-light mt-1">
            "{event.tagline}"
          </p>

          <div className="w-16 h-[1px] bg-gold-antique/40 mx-auto my-5" />

          {/* Date & Time Highlights */}
          <div className="space-y-4 my-6 bg-black/40 p-4 sm:p-5 rounded-xl border border-gold-antique/20">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gold-champagne flex-shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-ivory-muted/70 font-sans">Date</p>
                <p className="font-cormorant text-lg text-ivory-warm font-medium">
                  {event.day}, {event.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gold-champagne flex-shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-ivory-muted/70 font-sans">Time</p>
                <p className="font-cormorant text-lg text-ivory-warm font-medium">
                  {event.startTime} - {event.endTime}
                </p>
                <p className="text-[11px] text-gold-antique font-sans">Timezone: {event.timezone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold-champagne flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-ivory-muted/70 font-sans">Location</p>
                <p className="font-cormorant text-lg text-ivory-warm font-semibold">
                  {event.venueName}
                </p>
                {event.roomHall && (
                  <p className="text-xs text-gold-light font-sans font-medium">{event.roomHall}</p>
                )}
                <p className="text-xs text-ivory-muted/90 font-sans mt-0.5 leading-relaxed">
                  {event.address}, {event.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gold-antique/25 flex flex-col sm:flex-row gap-2.5">
          {/* Google Maps link */}
          <a
            href={event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-lg bg-burgundy-deep/60 hover:bg-burgundy text-gold-light border border-gold-antique/40 flex items-center justify-center gap-2 text-xs tracking-wider uppercase font-sans font-medium transition-all group-hover:border-gold-champagne"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Google Maps</span>
          </a>

          {/* Add to Calendar button */}
          <button
            onClick={() => handleAddToCalendar(event)}
            className="flex-1 py-2.5 px-4 rounded-lg bg-obsidian hover:bg-[#25151b] text-gold-light border border-gold-antique/40 flex items-center justify-center gap-2 text-xs tracking-wider uppercase font-sans font-medium transition-all"
            title="Download .ics Calendar Event"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-gold-champagne" />
            <span>Calendar</span>
          </button>

          {/* Copy Address */}
          <button
            onClick={() => handleCopyAddress(`${event.venueName}, ${event.address}, ${event.city}`, id)}
            className="py-2.5 px-3 rounded-lg bg-black/60 hover:bg-black text-ivory-warm border border-gold-antique/30 flex items-center justify-center gap-1.5 text-xs font-sans transition-all"
            title="Copy address to clipboard"
          >
            {copiedAddress === id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gold-champagne" />
                <span className="text-[11px] hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="the-wedding" className="relative py-28 sm:py-36 bg-[#120B0E] text-ivory-warm overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-burgundy/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-champagne font-cinzel font-semibold">
            Save The Date &amp; Location
          </p>
          <h2 className="font-italiana text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6EE] mt-2">
            The Day We Say I Do
          </h2>
          <VintageDivider className="mx-auto w-52 my-5" />
          <p className="font-cormorant italic text-base sm:text-lg text-ivory-muted/80">
            We cordially request the honor of your presence to witness and celebrate our eternal union.
          </p>
        </div>

        {/* Two Distinct Editorial Event Presentations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {renderEventCard(akad, 'akad', 'Event One • Holy Matrimony & Akad')}
          {renderEventCard(reception, 'reception', 'Event Two • Royal Banquet & Reception')}
        </div>

      </div>
    </section>
  );
};

