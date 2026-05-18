import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        "ink-2": "#111114",
        "ink-3": "#1a1a1f",
        navy: "#0b1220",
        "navy-2": "#111a30",
        line: "#e5e7eb",
        "line-dark": "#1f2937",
        mute: "#6b7280",
        cream: "#fafafa",
        soft: "#f4f6f8",
        brand: "#1d4ed8",
        "brand-2": "#2563eb",
        "brand-3": "#1e40af",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-instrument)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
