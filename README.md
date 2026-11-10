# A LOVE WRITTEN IN ETERNITY
### European Vintage Luxury — Cinematic Wedding Invitation Website

A bespoke, production-ready interactive digital wedding invitation designed with an opulent European vintage royal aesthetic, cinematic motion design, and editorial craftsmanship.

---

## 🌟 Key Features

1. **Cinematic Opening Envelope Experience**
   - 3D textured vintage envelope with antique gold wax seal bearing the couple's monogram.
   - Interactive opening sequence: wax seal cracking, envelope flap opening, invitation card rising, and smooth crossfade into the celebration.
   - URL guest name personalization support: e.g. `?to=Lord+Arthur` or `?guest=Bapak+Hartono`.
   - Accessible "Skip Intro" option.

2. **Hero Section — The Wedding Film**
   - Fullscreen couple background photography with cinematic slow zoom.
   - Editorial typography (Cormorant Garamond, Playfair Display, Great Vibes).
   - Floating golden dust particles and romantic vignette lighting.
   - Scroll indicator leading into the story.

3. **Our Love Story — The Beginning of Forever**
   - Editorial journal timeline featuring 5 milestone chapters (*The First Meeting, The First Chapter, The Journey, The Promise, Forever Begins*).
   - Alternating layouts with high-resolution photography, quotes, and locations.

4. **The Couple — Two Souls**
   - Luxury magazine editorial presentation of the Bride and Groom with parents' names, photos in arched frames with gold filigree, bios, and Instagram handles.
   - Elegant center ornamental ampersand `&`.

5. **Wedding Countdown**
   - Live real-time countdown to the wedding date and time.
   - Displays *"AND SO, FOREVER BEGINS."* once the date has arrived.

6. **Event Details — Akad & Royal Banquet**
   - Two distinct editorial presentations for *Akad Nikah / Holy Matrimony* and *Royal Wedding Banquet*.
   - Direct Google Maps links, One-click Address Copying with feedback toasts, and **Add to Calendar** (.ics file generation for Apple, Google, and Outlook calendars).

7. **The Evening Attire & Etiquette**
   - Color palette swatches: Obsidian Black, Royal Burgundy, Deep Wine, Champagne Gold, and Warm Ivory.
   - Black-tie guidance and wedding etiquette recommendations.

8. **Photo Gallery & Fullscreen Lightbox**
   - Asymmetrical editorial masonry grid with featured image treatment.
   - Fullscreen lightbox with Next, Previous, keyboard navigation (Arrow keys, ESC to close), image counter, and body scroll locking.

9. **Floating Music Player & Sound Engine**
   - Floating circular controller with gold play/pause button, animated equalizer wave, volume slider, mute toggle, and progress bar.
   - Plays royalty-free romantic acoustic piano & cello audio upon user interaction.
   - Zero-dependency built-in Web Audio API romantic chord synthesizer fallback if audio files are offline or network-blocked.

10. **Interactive RSVP with WhatsApp Integration**
    - Guest name, attendance selection (*Joyfully Accepts* / *Regretfully Declines*), number of attendees, session preference, and optional note.
    - Celebratory gold and ivory confetti on acceptance.
    - Pre-formatted, encoded WhatsApp reservation message to the wedding concierge.

11. **Letters of Love — Digital Guestbook**
    - Vintage parchment paper cards with antique gold flourishes.
    - Form to submit heartfelt blessings, persisted in browser LocalStorage.

12. **Wedding Gift Registry**
    - Tasteful collapsible gift section.
    - Bank details (BCA, Mandiri) with one-click account copying.
    - Physical gift delivery address with copy address button.

13. **Final Closing & Back to Top**
    - Emotional closing photography, warm gratitude message, and smooth Back to Top trigger.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **Icons:** Lucide React + Custom SVG European Royal Ornaments
- **Celebration Effects:** Canvas Confetti

---

## 📁 Central Configuration System

All wedding information, names, dates, venues, photographs, music, bank accounts, and RSVP settings can be updated from a single file:

```
src/data/invitationData.ts
```

### How to personalize:
- **Couple Details:** Edit `couple.bride` and `couple.groom` (names, parents, bios, photos).
- **Wedding Date:** Change `wedding.dateIso` (ISO 8601 format, e.g. `2026-12-19T09:00:00+07:00`) and `wedding.dateDisplay`.
- **Events & Venues:** Edit `wedding.events.akad` and `wedding.events.reception`.
- **Love Story:** Add, edit, or remove chapters in `story.chapters`.
- **Photo Gallery:** Update image URLs and captions in `gallery.photos`.
- **Music:** Change `music.audioUrl`, `music.title`, and `music.artist`.
- **RSVP WhatsApp:** Update `rsvp.whatsappNumber` with your country code (e.g. `6281298765432`).
- **Gift Registry:** Update bank accounts and recipient details in `gift.accounts`.

---

## 🚀 Running the Project

### Development Server:
```bash
pnpm dev
# or npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Test with Guest Personalization:
Open in your browser with query parameters:
```
http://localhost:5173/?to=The+Somerset+Family
```

### Production Build:
```bash
pnpm run build
# or npm run build
```
The optimized production output will be generated in the `dist/` directory.

### Preview Production Build:
```bash
pnpm preview
```

---

## 🌐 Deployment Instructions

You can deploy the contents of the `dist/` folder to any static hosting provider:
- **Vercel:** Import repository and set framework preset to `Vite`.
- **Netlify:** Drag and drop the `dist/` folder or link GitHub repo with build command `pnpm build` and publish directory `dist`.
- **GitHub Pages:** Deploy `dist/` branch via GitHub Actions.

