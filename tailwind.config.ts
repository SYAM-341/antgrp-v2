import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1f2b3a",
        "ink-2": "#2a3849",
        "ink-3": "#35455a",
        navy: "#22303f",
        "navy-2": "#2c3b4d",
        line: "#e6e4df",
        "line-dark": "#d6d3cc",
        mute: "#545b66",
        cream: "#faf9f6",
        soft: "#f3f2ee",
        brand: "#0f766e",
        "brand-2": "#0d9488",
        "brand-3": "#115e59",
      },
      fontFamily: {
        sans: ["Manrope Variable", "Manrope", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
