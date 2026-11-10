/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#101010',
        'soft-black': '#191515',
        burgundy: {
          DEFAULT: '#4A1727',
          deep: '#35111D',
          dark: '#230a13',
          light: '#652338',
        },
        gold: {
          champagne: '#C8A96A',
          antique: '#A8874C',
          light: '#dfc996',
          dark: '#856733',
        },
        ivory: {
          warm: '#F2EBDD',
          muted: '#DCD1C0',
          paper: '#FAF6EE',
          dark: '#b8ab96',
        }
      },
      fontFamily: {
        italiana: ['"Italiana"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        'cinzel-dec': ['"Cinzel Decorative"', 'serif'],
        bodoni: ['"Bodoni Moda"', 'serif'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        script: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #A8874C 0%, #F5E5C9 30%, #C8A96A 50%, #856733 80%, #C8A96A 100%)',
        'burgundy-vignette': 'radial-gradient(circle, rgba(74,23,39,0.3) 0%, rgba(16,16,16,0.95) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(200, 169, 106, 0.25)',
        'burgundy-glow': '0 0 35px rgba(74, 23, 39, 0.4)',
        'vintage-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(200, 169, 106, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
