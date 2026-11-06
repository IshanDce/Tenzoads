/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0084FF',
          hover: '#0070DE',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#0084FF',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Re-map amber so legacy amber references take on the new electric blue brand palette
        amber: {
          DEFAULT: '#0084FF',
          hover: '#0070DE',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#0084FF',
          600: '#0070DE',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        navy: {
          DEFAULT: '#070B19',
          light: '#0B1120',
          card: '#0F172A',
          border: '#1E293B',
        },
        ink: {
          DEFAULT: '#0A0F1D',
          light: '#1E293B',
          card: '#0F172A',
        },
        cream: {
          DEFAULT: '#F8FAFC',
          light: '#F8FAFC',
          soft: '#F1F5F9',
        },
        muted: '#64748B',
        borderCream: '#E2E8F0',
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
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'soft-hover': '0 12px 30px -4px rgba(15, 23, 42, 0.09)',
        'blue-glow': '0 10px 25px -5px rgba(0, 132, 255, 0.35)',
        'amber-glow': '0 10px 25px -5px rgba(0, 132, 255, 0.35)',
      },
    },
  },
  plugins: [],
}
