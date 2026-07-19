import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a2430",
        "ink-2": "#243040",
        "ink-3": "#2f3d4f",
        navy: "#1f2b3a",
        "navy-2": "#2a3849",
        line: "#e6e4df",
        "line-dark": "#d6d3cc",
        mute: "#2b3440",
        caption: "#3f4650",
        cream: "#faf9f6",
        soft: "#f3f2ee",
        brand: "#0f766e",
        "brand-2": "#0d9488",
        "brand-3": "#115e59",
      },
      fontFamily: {
        sans: ["Source Sans 3 Variable", "Source Sans 3", "ui-sans-serif", "system-ui"],
        serif: ["Source Serif 4 Variable", "Source Serif 4", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
