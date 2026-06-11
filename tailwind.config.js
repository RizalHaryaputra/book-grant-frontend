/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        primary: "#504137",
        secondary: "#F4EDE4",
        accent: "#D9C5B2",
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,.05)",
      },

    },
  },

  plugins: [],
}