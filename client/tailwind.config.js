/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/theme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container:{
        center: true
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "login-bg-img": "url(/client/public/login.jpg)"
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        Lora: ["Lora", "sans-serif"],
        Play: ["Play", "sans-serif"],
        Archivo: ["Archivo", "sans-serif"],
      },
      colors: {
        'login-bg':'#16202A',
        'btn-color':'#5d5fef',
        'cc-color':'#cccccc',
        'border-color':'#343059',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
