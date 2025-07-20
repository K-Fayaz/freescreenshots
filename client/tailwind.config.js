/** @type {import('tailwindcss').Config} */
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
        imbMono: ["IBM Plex Mono", "monospace"]
      },
    },
  },
  plugins: [],
};
