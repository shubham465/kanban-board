module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // Enable dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1f2937", // Dark gray
          light: "#374151", // Lighter dark gray
        },
        secondary: {
          DEFAULT: "#4b5563", // Gray
          light: "#6b7280", // Lighter gray
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
