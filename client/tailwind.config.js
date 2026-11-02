/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          DEFAULT: '#F5A93B',
          hover: '#E8962A',
          50: '#FFF8EC',
          100: '#FEEFD4',
          200: '#FCDF9F',
          300: '#F9C86A',
          400: '#F6B543',
          500: '#F5A93B',
          600: '#E8962A',
          700: '#C27419',
          800: '#9B5817',
          900: '#7E4717',
        },
        ink: {
          DEFAULT: '#0D0D0D',
          light: '#1A1A1A',
          card: '#141414',
        },
        cream: {
          DEFAULT: '#FDF6E4', // hero sections
          light: '#FBF7EE',   // cards / alternate sections
          soft: '#F5EEDD',
        },
        muted: '#5F5F5F',
        borderCream: '#EFE7D6',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      maxWidth: {
        'site': '1240px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(13, 13, 13, 0.05)',
        'soft-hover': '0 12px 30px -4px rgba(13, 13, 13, 0.09)',
        'amber-glow': '0 10px 25px -5px rgba(245, 169, 59, 0.35)',
      },
    },
  },
  plugins: [],
}
