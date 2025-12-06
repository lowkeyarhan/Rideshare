/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A0A",
        "background-light": "#FFFFFF",
        "text-primary": "#0A0A0A",
        "text-secondary": "#5F5F5F",
        "text-tertiary": "#8E8E8E",
        "border-light": "#E5E5E5",
        surface: "#F7F7F7",
        accent: "#3E63DD",
      },
      fontFamily: {
        display: ["SF Pro Display", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1.25rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
