/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spiderly: {
          black:  "#0A0A0A",
          white:  "#FFFFFF",
          accent: "#E63329",
          gray:   "#1A1A1A",
          muted:  "#6B6B6B",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}