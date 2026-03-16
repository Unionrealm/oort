import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#141414",
        surfaceHigh: "#1E1E1E",
        border: "#2A2A2A",
        accent: "#4A9EFF",
        accentHover: "#6BB3FF",
        amber: "#F5A623",
        amberLight: "#F7B84B",
        textPrimary: "#FFFFFF",
        textSecondary: "#A0A0A0",
        textMuted: "#606060",
        live: "#FF3B30",
        liveGlow: "rgba(255, 59, 48, 0.4)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        ui: ["var(--font-dm-sans)", "sans-serif"],
      },
      maxWidth: {
        mobile: "480px",
        desktop: "1200px",
      },
      animation: {
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-down": "slide-down 0.3s ease-out forwards",
        "beacon-enter": "beacon-enter 0.4s ease-out forwards",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "beacon-enter": {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
