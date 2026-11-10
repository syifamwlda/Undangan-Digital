export interface StoryChapter {
  id: string;
  chapterNumber: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  quote?: string;
}

export interface EventDetail {
  title: string;
  tagline: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  venueName: string;
  roomHall?: string;
  address: string;
  city: string;
  googleMapsUrl: string;
  calendarEvent: {
    title: string;
    description: string;
    location: string;
    startIso: string;
    endIso: string;
  };
}

export interface GalleryPhoto {
  id: string;
  url: string;
  thumbnail?: string;
  caption: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  featured?: boolean;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeUrl?: string;
  note?: string;
}

export interface MusicConfig {
  title: string;
  artist: string;
  audioUrl?: string;
  youtubeUrlOrId?: string;
  mode?: 'auto' | 'youtube' | 'audio';
}

export interface InvitationData {
  projectName: string;
  tagline: string;
  couple: {
    bride: {
      fullName: string;
      nickname: string;
      initial: string;
      fatherName: string;
      motherName: string;
      instagramHandle?: string;
      bio: string;
      photo: string;
    };
    groom: {
      fullName: string;
      nickname: string;
      initial: string;
      fatherName: string;
      motherName: string;
      instagramHandle?: string;
      bio: string;
      photo: string;
    };
    monogram: string; // e.g., "A & L"
    heroPhoto: string;
    closingPhoto: string;
  };
  wedding: {
    dateIso: string; // e.g. "2026-12-18T08:00:00+07:00"
    dateDisplay: string;
    hashtag: string;
    themeName: string;
    dressCode: {
      title: string;
      description: string;
      attireNotes: string;
      colors: Array<{
        name: string;
        hex: string;
        description: string;
      }>;
      guidelines: string[];
    };
    events: {
      akad: EventDetail;
      reception: EventDetail;
    };
  };
  story: {
    sectionTitle: string;
    sectionSubtitle: string;
    chapters: StoryChapter[];
  };
  gallery: {
    sectionTitle: string;
    sectionSubtitle: string;
    photos: GalleryPhoto[];
  };
  music: MusicConfig;
  rsvp: {
    whatsappNumber: string; // international format without + or spaces, e.g. "6281234567890"
    enableSupabaseBackend: boolean;
    supabaseConfig?: {
      url: string;
      anonKey: string;
    };
  };
  gift: {
    title: string;
    subtitle: string;
    accounts: BankAccount[];
    physicalGiftAddress?: {
      recipient: string;
      phone: string;
      address: string;
      city: string;
      postalCode: string;
    };
  };
}

export const invitationData: InvitationData = {
  projectName: "A LOVE WRITTEN IN ETERNITY",
  tagline: "Two Souls. One Promise. An Eternity Together.",
  couple: {
    bride: {
      fullName: "Lady Aurelia Genevieve Vance",
      nickname: "Aurelia",
      initial: "A",
      fatherName: "Lord Arthur Harrison Vance",
      motherName: "Lady Eleanor Beatrice Vance",
      instagramHandle: "@aurelia.vance",
      bio: "A soul drawn to classical literature, antique parchment, and timeless artistry. She found in Christian the quiet harbor and poetic heart she had always yearned for.",
      photo: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
    },
    groom: {
      fullName: "Lord Christian Alexander Sterling",
      nickname: "Christian",
      initial: "C",
      fatherName: "Lord Julian Alistair Sterling",
      motherName: "Lady Charlotte Evelyn Sterling",
      instagramHandle: "@christian.sterling",
      bio: "An architect of classical heritage and devoted adventurer of life. In Aurelia, he discovered his eternal muse and the grace of unconditional devotion.",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    },
    monogram: "A & C",
    heroPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop",
    closingPhoto: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1920&auto=format&fit=crop",
  },
  wedding: {
    // 2026 European winter/spring date
    dateIso: "2026-12-19T09:00:00+07:00",
    dateDisplay: "Saturday, 19 December 2026",
    hashtag: "#AureliaChristianForever",
    themeName: "European Royal Vintage Luxury",
    dressCode: {
      title: "The Evening Attire",
      description: "An elegant royal celebration deserves an equally beautiful presence. We warmly invite our esteemed guests to grace us in black-tie and opulent vintage formal attire.",
      attireNotes: "Gentlemen are invited to wear bespoke black tuxedos or dark burgundy velvet evening jackets. Ladies are adorned in floor-length evening gowns of royal burgundy, champagne gold, or deep wine.",
      colors: [
        { name: "Obsidian Black", hex: "#101010", description: "Timeless black-tie elegance" },
        { name: "Royal Burgundy", hex: "#4A1727", description: "Opulent regal drama" },
        { name: "Deep Wine", hex: "#35111D", description: "Sophisticated vintage tone" },
        { name: "Champagne Gold", hex: "#C8A96A", description: "Metallic antique shimmer" },
        { name: "Warm Ivory", hex: "#F2EBDD", description: "Soft romantic cream accents" },
      ],
      guidelines: [
        "Floor-length evening gowns or classical velvet cocktail dress for ladies",
        "Classic black-tie tuxedos or dark bespoke suits with bow tie for gentlemen",
        "We kindly request guests to avoid plain white or bright neon colors",
      ],
    },
    events: {
      akad: {
        title: "The Holy Matrimony & Akad",
        tagline: "The Sacred Vows Before God & Family",
        day: "Saturday",
        date: "19 December 2026",
        startTime: "09:00 WIB",
        endTime: "11:30 WIB",
        timezone: "GMT+7 (WIB)",
        venueName: "Palais de Versailles Grand Chapel",
        roomHall: "The Royal Sanctuary & Hall of Mirrors",
        address: "Jl. Grand Royal Boulevard No. 88, Menteng",
        city: "Jakarta Pusat, DKI Jakarta",
        googleMapsUrl: "https://maps.google.com/?q=The+Dharmawangsa+Jakarta",
        calendarEvent: {
          title: "The Holy Matrimony of Aurelia & Christian",
          description: "Sacred Holy Matrimony & Akad Nikah of Aurelia Genevieve Vance & Christian Alexander Sterling.",
          location: "Palais de Versailles Grand Chapel, Jakarta",
          startIso: "2026-12-19T09:00:00+07:00",
          endIso: "2026-12-19T11:30:00+07:00",
        },
      },
      reception: {
        title: "The Royal Wedding Banquet",
        tagline: "An Evening of Music, Wine & Celebration",
        day: "Saturday",
        date: "19 December 2026",
        startTime: "18:30 WIB",
        endTime: "22:00 WIB",
        timezone: "GMT+7 (WIB)",
        venueName: "The Grand Imperial Ballroom",
        roomHall: "Chandelier Pavilion & Royal Courtyard",
        address: "Jl. Grand Royal Boulevard No. 88, Menteng",
        city: "Jakarta Pusat, DKI Jakarta",
        googleMapsUrl: "https://maps.google.com/?q=The+Dharmawangsa+Jakarta",
        calendarEvent: {
          title: "The Royal Wedding Banquet of Aurelia & Christian",
          description: "Evening Celebration and Royal Banquet honoring Aurelia & Christian.",
          location: "The Grand Imperial Ballroom, Jakarta",
          startIso: "2026-12-19T18:30:00+07:00",
          endIso: "2026-12-19T22:00:00+07:00",
        },
      },
    },
  },
  story: {
    sectionTitle: "EVERY LOVE STORY HAS A BEGINNING",
    sectionSubtitle: "Ours is a story written in little moments, beautiful memories, and a promise to last forever.",
    chapters: [
      {
        id: "chapter-1",
        chapterNumber: "01",
        title: "THE FIRST MEETING",
        date: "Autumn, October 2021",
        location: "Vienna, Austria",
        description: "Beneath the high arched ceiling of an antique Viennese library, two strangers reached for the exact same worn anthology of Rilke's poetry. A shared glance, an apologetic smile, and an afternoon espresso in the misty square that dissolved all sense of time.",
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
        quote: "Some souls simply recognize the cadence of another before words are even spoken.",
      },
      {
        id: "chapter-2",
        chapterNumber: "02",
        title: "THE FIRST CHAPTER",
        date: "Spring, May 2022",
        location: "Lake Como, Italy",
        description: "Whispered conversations along the cypress-lined shores of Bellagio. As moonlight danced across the dark turquoise water, we realized our lives were no longer parallel streams, but rivers yearning to converge into one shared destiny.",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
        quote: "With you, even the simplest quiet feels like a grand symphony.",
      },
      {
        id: "chapter-3",
        chapterNumber: "03",
        title: "THE JOURNEY",
        date: "Summer, August 2023",
        location: "Edinburgh & The Scottish Highlands",
        description: "Wandering through ancient castle ruins amidst the morning mist, weathering sudden storms together, and discovering that joy is not found in pristine destinations, but in the steadfast hand holding yours along the rugged journey.",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
        quote: "Through every winding path and tempest, your hand remained my true North.",
      },
      {
        id: "chapter-4",
        chapterNumber: "04",
        title: "THE PROMISE",
        date: "Winter, December 2024",
        location: "Château de Chantilly, France",
        description: "Surrounded by centuries of gilded French history and candlelight in the private royal gardens, Christian knelt on the frosted stone terrace. With an heirloom antique sapphire ring, he asked for a lifetime; with joyful tears, Aurelia answered forever.",
        image: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200&auto=format&fit=crop",
        quote: "I choose you not only for today, but for every tomorrow that heaven grants.",
      },
      {
        id: "chapter-5",
        chapterNumber: "05",
        title: "FOREVER BEGINS",
        date: "Winter, December 2026",
        location: "Our Sacred Wedding Day",
        description: "Standing at the threshold of eternity, enveloped by the prayers of our families and the warmth of beloved friends. Here, two distinct melodies blend into one eternal harmony.",
        image: "https://images.unsplash.com/photo-1519225429980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
        quote: "And so, our forever begins—written in eternity.",
      },
    ],
  },
  gallery: {
    sectionTitle: "MOMENTS THAT LAST FOREVER",
    sectionSubtitle: "A visual journal of tenderness, light, and timeless devotion captured through vintage editorial lens.",
    photos: [
      {
        id: "gallery-1",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
        caption: "The Gilded Embrace — Château Versailles Gardens",
        aspectRatio: "portrait",
        featured: true,
      },
      {
        id: "gallery-2",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1400&auto=format&fit=crop",
        caption: "Whispers in Burgundy Velvet — Forehead Kiss",
        aspectRatio: "landscape",
      },
      {
        id: "gallery-3",
        url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1400&auto=format&fit=crop",
        caption: "Aurelia's Vintage Lace & Antique Gold Headdress",
        aspectRatio: "portrait",
      },
      {
        id: "gallery-4",
        url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1400&auto=format&fit=crop",
        caption: "The Ring of Vows — Emerald-Cut Heirloom Diamond",
        aspectRatio: "square",
      },
      {
        id: "gallery-5",
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop",
        caption: "Starlight Dance in the Royal Courtyard",
        aspectRatio: "landscape",
        featured: true,
      },
      {
        id: "gallery-6",
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1400&auto=format&fit=crop",
        caption: "Love Letters on Warm Parchment with Wax Seal",
        aspectRatio: "portrait",
      },
      {
        id: "gallery-7",
        url: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=1400&auto=format&fit=crop",
        caption: "The Royal Ballroom Architecture & Chandeliers",
        aspectRatio: "landscape",
      },
      {
        id: "gallery-8",
        url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1400&auto=format&fit=crop",
        caption: "A Timeless Stare, An Unshakable Vow",
        aspectRatio: "portrait",
      },
      {
        id: "gallery-9",
        url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1400&auto=format&fit=crop",
        caption: "Champagne Toast & Golden Laughter with Beloved Guests",
        aspectRatio: "landscape",
      },
      {
        id: "gallery-10",
        url: "https://images.unsplash.com/photo-1519225429980-715cb0215aed?q=80&w=1400&auto=format&fit=crop",
        caption: "Walking Hand in Hand into Eternity",
        aspectRatio: "portrait",
      },
    ],
  },
  music: {
    title: "Beautiful in White",
    artist: "Shane Filan",
    // Can accept any YouTube or YouTube Music link, or video ID (e.g. W-TE_Ys4iwM)
    youtubeUrlOrId: "https://www.youtube.com/watch?v=W-TE_Ys4iwM",
    // Premium acoustic wedding instrumental piano audio source as direct stream
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-piano-112199.mp3",
    // 'auto' tries YouTube first, with seamless fallback to direct acoustic stream
    mode: "auto",
  },
  rsvp: {
    whatsappNumber: "6281298765432",
    enableSupabaseBackend: false,
  },
  gift: {
    title: "YOUR LOVE IS THE GREATEST GIFT",
    subtitle: "Your prayers, blessings, and gracious presence at our celebration are the greatest gifts we could ever ask for. Should you desire to honor us with a token of love, we have provided our wedding registry details below.",
    accounts: [
      {
        bankName: "Bank Central Asia (BCA)",
        accountNumber: "8830 1928 4410",
        accountHolder: "Christian Alexander Sterling",
        note: "Wedding Gift Registry — Christian",
      },
      {
        bankName: "Bank Mandiri",
        accountNumber: "1230 0098 7765 2",
        accountHolder: "Aurelia Genevieve Vance",
        note: "Wedding Gift Registry — Aurelia",
      },
    ],
    physicalGiftAddress: {
      recipient: "Christian Sterling & Aurelia Vance",
      phone: "+62 812-9876-5432",
      address: "The Sterling Estate, Residence Royal No. 12, Menteng",
      city: "Jakarta Pusat",
      postalCode: "10310",
    },
  },
};

