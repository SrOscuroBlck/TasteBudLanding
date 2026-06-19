import type { Config } from "tailwindcss";

// Mirrors the TasteBud app design system (tastebud-pal): always-dark, warm-red
// brand. Tokens are HSL CSS variables defined in app/globals.css so the
// marketing site and the product app stay visually identical.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 10px 40px -10px hsla(11, 100%, 34%, 0.4)",
        card: "0 8px 32px rgba(0, 0, 0, 0.6)",
        elevated: "0 20px 60px -15px rgba(0, 0, 0, 0.7)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float-shape": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(30px, -30px) rotate(120deg)" },
          "66%": { transform: "translate(-20px, 20px) rotate(240deg)" },
        },
        "beta-pulse": {
          "0%": { boxShadow: "0 0 0 0 hsla(11, 100%, 45%, 0.5)" },
          "70%": { boxShadow: "0 0 0 7px hsla(11, 100%, 45%, 0)" },
          "100%": { boxShadow: "0 0 0 0 hsla(11, 100%, 45%, 0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) both",
        "scale-in": "scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) both",
        "float-shape": "float-shape 20s ease-in-out infinite",
        "beta-pulse": "beta-pulse 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
