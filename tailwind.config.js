/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        app: {
          bg: "var(--color-bg)",
          sidebar: "var(--color-sidebar)",
          input: "var(--color-input)",
          accent: "var(--color-accent)",
          text: "var(--color-text)",
          "text-secondary": "var(--color-text-secondary)",
          border: "var(--color-border)",
        },
      },
    },
  },
  plugins: [],
};
