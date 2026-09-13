/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // ===== Semantic tokens (auto-swap between light & dark via CSS vars) =====
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',   // page background
          subtle: 'rgb(var(--surface-subtle) / <alpha-value>)',
          muted: 'rgb(var(--surface-muted) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',       // cards / inputs
          soft: 'rgb(var(--card-soft) / <alpha-value>)',
        },
        line: 'rgb(var(--line) / <alpha-value>)',            // borders / dividers
        ink: 'rgb(var(--text) / <alpha-value>)',             // headings / primary text
        body: 'rgb(var(--text-2) / <alpha-value>)',          // body text
        muted: 'rgb(var(--text-3) / <alpha-value>)',         // secondary / captions
        faint: 'rgb(var(--text-4) / <alpha-value>)',         // placeholders / disabled
        // Brand accent — deep azure in light, sky blue in dark (auto-swap)
        teal: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          light: 'rgb(var(--accent-light) / <alpha-value>)',
          dark: '#0A4552',
        },
        onaccent: 'rgb(var(--on-accent) / <alpha-value>)',   // text/icon on accent fills

        // ===== Fixed brand palette (Oraixen brand book) =====
        azure: { DEFAULT: '#0F5E70', dark: '#0A4552', light: '#1A7A8F' },
        skyblue: { DEFAULT: '#56C9E3', light: '#8FE0F2', dark: '#3AADC7' },
        inkblack: { DEFAULT: '#050517', light: '#0A0A1F', lighter: '#12122E' },
        softwhite: '#FFFCFD',
        dust: { DEFAULT: '#DAD2D8', light: '#ECE8EB', dark: '#B9AEB7' },
      },
      fontFamily: {
        // Body / UI = modern geometric sans; headings = Aleo (brand slab serif). Arabic = Tajawal.
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Aleo', 'Georgia', 'serif'],
        serif: ['Aleo', 'Georgia', 'serif'],
        arabic: ['Tajawal', 'IBM Plex Sans Arabic', 'Cairo', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.6rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.8rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.015em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '8xl': ['6rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        // modern, layered, soft elevation
        card: '0 1px 2px rgba(5,5,23,0.04), 0 6px 20px rgba(5,5,23,0.06)',
        hover: '0 2px 6px rgba(5,5,23,0.05), 0 16px 40px rgba(15,94,112,0.13)',
        glow: '0 8px 30px rgba(86,201,227,0.30)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
