/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        charcoal: {
          base: '#0A0A0A',
          elevated: '#111111',
          raised: '#1A1A1A',
          border: '#262626',
          subtle: '#2A2A2A',
        },
        accent: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          muted: '#1E40AF',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        wide: '0.08em',
        widest: '0.12em',
      },
    },
  },
  plugins: [],
};
