/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f7f4',
          100: '#d9ede5',
          200: '#b5dccb',
          300: '#84c3a8',
          400: '#52a483',
          500: '#6B9E7F',  // sage green — main brand color
          600: '#4d7f63',
          700: '#3d6450',
          800: '#2e4d3d',
          900: '#1e3328',
        },
        accent: {
          50:  '#fdf4ef',
          100: '#fbe5d4',
          200: '#f6c9a8',
          300: '#f0a573',
          400: '#e87d45',
          500: '#D97657',  // terracotta — accent color
          600: '#c05a3a',
          700: '#9e4530',
          800: '#7d3727',
          900: '#5c2820',
        },
        cream: '#FAFAF5',
        bark:  '#2C3E2D',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':      'fadeUp 0.6s ease-out forwards',
        'fade-in':      'fadeIn 0.4s ease-out forwards',
        'slide-left':   'slideLeft 0.3s ease-out forwards',
        'shimmer':      'shimmer 1.5s infinite',
        'pulse-ring':   'pulseRing 2s ease-out infinite',
        'marquee':      'marquee 30s linear infinite',
        'float':        'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:     { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:     { from: { opacity: 0 }, to: { opacity: 1 } },
        slideLeft:  { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        shimmer:    { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        pulseRing:  { '0%': { transform: 'scale(1)', opacity: 1 }, '100%': { transform: 'scale(1.6)', opacity: 0 } },
        marquee:    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
}
