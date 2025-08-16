/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        ibmSans: ["IBM Plex Sans", "sans-serif"],
        noto: ["Noto Sans", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        geistMono: ["Geist Mono", "monospace"],
        poppins: [ "Poppins", "sans-serif"],
        imbMono: ["IBM Plex Mono", "monospace"],
        cursive: [ "Edu NSW ACT Cursive", "cursive"]
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: '0.2em',
              marginBottom: '0.2em',
            },
            h1: { marginTop: '4px', marginBottom: '3px' },
            h2: { marginTop: '3px', marginBottom: '3px' },
            h3: { marginTop: '3px', marginBottom: '3px' },
            h4: { marginTop: '3px', marginBottom: '3px' },
            ol: { marginTop: '3px', marginBottom: '3px' },
            ul: { marginTop: '3px', marginBottom: '3px' },
            li: { marginTop: '2px', marginBottom: '2px' },
          },
        },
      },
    },
  },
  plugins: [typography],
};
