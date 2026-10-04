import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F3EA",
        surface: "#FFFCF6",
        surfaceHover: "#F2EDE1",
        forest: {
          DEFAULT: "#23483D",
          dark: "#18352D",
          light: "#356354",
        },
        ink: {
          DEFAULT: "#232B25",
          muted: "#5D665E",
          faint: "#8A948C",
        },
        terracotta: {
          DEFAULT: "#A44F36",
          dark: "#873E29",
          light: "#C0654B",
          subtle: "#F5E9E4",
        },
        gold: {
          DEFAULT: "#B08A47",
          dark: "#8D6E34",
          light: "#D4A95B",
          subtle: "#F6F1E6",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Lora", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(35, 43, 37, 0.05)",
        lifted: "0 10px 30px -4px rgba(35, 43, 37, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
