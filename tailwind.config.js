/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#02462E',
        'brand-gold': '#FEC700',
        'brand-cream': '#F5F2EA',
        'brand-dark': '#0D1210',
        'brand-text': '#111814',
        'brand-sage': '#4A6B5A',
      },
      fontFamily: {
        'display': ['"Cormorant Garamond"', 'serif'],
        'heading': ['"Plus Jakarta Sans"', 'sans-serif'],
        'body': ['"DM Sans"', 'sans-serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'brand': '0 20px 60px rgba(2, 70, 46, 0.12)',
        'brand-lg': '0 30px 80px rgba(2, 70, 46, 0.2)',
        'brand-xl': '0 40px 100px rgba(2, 70, 46, 0.3)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(254, 199, 0, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(254, 199, 0, 0)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
