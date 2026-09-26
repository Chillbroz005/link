/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bento: {
          bg: "#050b14",
          card: "rgba(11, 20, 35, 0.75)",
          border: "rgba(30, 58, 95, 0.5)",
          cyan: "#00e5ff",
          indigo: "#6366f1",
          emerald: "#10b981",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 229, 255, 0.12)",
        "glow-emerald": "0 0 30px rgba(16, 185, 129, 0.12)",
      },
    },
  },
  plugins: [],
};
