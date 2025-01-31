module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1f2937",
          light: "#374151",
        },
        secondary: {
          DEFAULT: "#4b5563",
          light: "#6b7280",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
