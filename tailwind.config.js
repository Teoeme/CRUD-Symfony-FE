/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        montse : 'var(--font-montse)',
        helvetica:'var(--font-helvetica)'
      },
      fontSize:{
        'xxs':'11px',
        '2xs':'10px',
        '3xs':'9px',
        '4xs':'8px'
      }
    },
  },
  plugins: [],
};
