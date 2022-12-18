/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',

        gray900: '#282828',
        gray800: '#444444',
        gray700: '#484848',
        gray500: '#666666',
        gray300: '#808080',
        gray100: '#A0A0A0',

        purple700: '#4236A2',
        purple500: '#7B6DC7',
        purple300: '#9C91F0',

        yellow500: '#FCA236',

        orange500: '#CC6F00',

        green500: '#00CC6A',
      },

      backgroundImage: {
        'purple-gradient': 'linear-gradient(90deg, #7B6DC7 0%, #9C91F0 100%)',
      },
    },
  },
  plugins: [],
}
