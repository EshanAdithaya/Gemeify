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
        // Gold — kept for gem/certification badges only
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
        // Obsidian — kept for backwards compat, maps to dark navy
        obsidian: {
          50:  '#F8FAFF',
          100: '#F0F4FF',
          200: '#E0E8FF',
          300: '#C0D0F5',
          400: '#8DA8E8',
          500: '#5A7DD4',
          600: '#3558B8',
          700: '#1E3A8A',
          800: '#162D6E',
          900: '#0F1F52',
          950: '#080F2E',
        },
        // Pearl — light background tones
        pearl: {
          50:  '#FAFCFF',
          100: '#F0F4FF',
          200: '#E2EBFF',
          300: '#C9D8F8',
          400: '#9EB8EE',
          500: '#7294D8',
          600: '#4D6DBF',
          700: '#3455A0',
          800: '#213D80',
          900: '#132660',
        },
        // Royal blue — primary CTA / trust color
        royal: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        // Slate — body text
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        // Brand → royal blue
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
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
        'royal-gradient':   'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%)',
        'royal-shimmer':    'linear-gradient(90deg, #1E3A8A 0%, #2563EB 40%, #60A5FA 60%, #1E3A8A 100%)',
        'gold-gradient':    'linear-gradient(135deg, #C9A84C 0%, #D4AF37 50%, #B8962E 100%)',
        'light-hero':       'radial-gradient(ellipse 120% 80% at 60% 40%, #EFF6FF 0%, #F0F4FF 60%, #FFFFFF 100%)',
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
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'border-glow': {
          '0%, 100%': { 'border-color': 'rgba(37,99,235,0.25)' },
          '50%':      { 'border-color': 'rgba(37,99,235,0.70)' },
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
        'glow':       '0 0 24px -4px rgba(37,99,235,0.35)',
        'glow-lg':    '0 0 56px -8px rgba(37,99,235,0.45)',
        'royal':      '0 4px 24px rgba(37,99,235,0.18)',
        'royal-lg':   '0 8px 48px rgba(37,99,235,0.28)',
        'gold':       '0 4px 24px rgba(212,175,55,0.20)',
        'card':       '0 2px 16px rgba(15,23,42,0.08)',
        'card-hover': '0 8px 40px rgba(15,23,42,0.15), 0 0 0 1px rgba(37,99,235,0.15)',
        'nav':        '0 1px 0 0 rgba(15,23,42,0.08), 0 2px 12px rgba(15,23,42,0.06)',
        'luxury':     '0 20px 60px rgba(15,23,42,0.12), 0 0 0 1px rgba(37,99,235,0.10)',
      },
    },
  },
  plugins: [],
};
