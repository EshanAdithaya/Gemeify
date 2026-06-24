/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gold — primary luxury accent (replacing purple)
        gold: {
          50:  '#FFFDF0',
          100: '#FEF9D7',
          200: '#FCF0A8',
          300: '#F8E069',
          400: '#F2CB3C',
          500: '#D4AF37',
          600: '#C9A84C',
          700: '#B8962E',
          800: '#8A6F1A',
          900: '#5C4710',
          950: '#3A2D08',
        },
        // Obsidian — deep luxury dark backgrounds
        obsidian: {
          50:  '#F7F6F5',
          100: '#EAE8E6',
          200: '#D3D0CC',
          300: '#ABA7A2',
          400: '#7A756F',
          500: '#55504A',
          600: '#3A3630',
          700: '#252220',
          800: '#181614',
          900: '#0E0C0B',
          950: '#070605',
        },
        // Pearl — luxury warm light tones
        pearl: {
          50:  '#FEFDFB',
          100: '#FAF9F6',
          200: '#F4F1EB',
          300: '#EAE5DC',
          400: '#D9D2C5',
          500: '#C5BBAC',
          600: '#A99E8E',
          700: '#8A7E6E',
          800: '#6B6054',
          900: '#4A4239',
        },
        // Brand → remapped to gold for backward compatibility
        brand: {
          50:  '#FFFDF0',
          100: '#FEF9D7',
          200: '#FCF0A8',
          300: '#F8E069',
          400: '#F2CB3C',
          500: '#D4AF37',
          600: '#C9A84C',
          700: '#B8962E',
          800: '#8A6F1A',
          900: '#5C4710',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif:   ['var(--font-cormorant)', 'Georgia', 'Cambria', 'serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'Cambria', 'serif'],
      },
      letterSpacing: {
        'widest-xl':  '0.20em',
        'widest-2xl': '0.30em',
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C9A84C 0%, #D4AF37 50%, #B8962E 100%)',
        'gold-shimmer':     'linear-gradient(90deg, #8A6F1A 0%, #D4AF37 40%, #F2CB3C 60%, #8A6F1A 100%)',
        'obsidian-radial':  'radial-gradient(ellipse at top, #181614 0%, #070605 70%)',
        'luxury-hero':      'radial-gradient(ellipse 120% 80% at 60% 40%, #1A1612 0%, #0A0908 60%, #070605 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'toast-in': {
          '0%':   { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'gold-shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'border-glow': {
          '0%, 100%': { 'border-color': 'rgba(212,175,55,0.25)' },
          '50%':      { 'border-color': 'rgba(212,175,55,0.70)' },
        },
        'count-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up':     'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in':     'fade-in 0.5s ease-out both',
        'toast-in':    'toast-in 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) both',
        'float':       'float 6s ease-in-out infinite',
        'scale-in':    'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'border-glow': 'border-glow 3s ease-in-out infinite',
        'count-up':    'count-up 0.6s ease-out both',
      },
      boxShadow: {
        'glow':       '0 0 24px -4px rgba(212,175,55,0.45)',
        'glow-lg':    '0 0 56px -8px rgba(212,175,55,0.55)',
        'gold':       '0 4px 24px rgba(212,175,55,0.20)',
        'gold-lg':    '0 8px 48px rgba(212,175,55,0.30)',
        'obsidian':   '0 8px 32px rgba(0,0,0,0.6)',
        'luxury':     '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.12)',
        'card':       '0 4px 24px rgba(0,0,0,0.35)',
        'card-hover': '0 16px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.18)',
        'nav':        '0 1px 0 0 rgba(212,175,55,0.12)',
      },
    },
  },
  plugins: [],
};
