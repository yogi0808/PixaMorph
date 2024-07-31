/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        g: "#22c55e",
        w: "#f8fafc",
        b: {
          1: "#1e293b",
          2: "#94a3b8",
          3: "#3b82f6",
          4: "#020817"
        },
      }
    },
  },
  plugins: [],
}