import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0C",
        surface: {
          DEFAULT: "#121216",
          light: "#181820",
          card: "#15151B",
          border: "#262633",
        },
        brand: {
          pink: {
            DEFAULT: "#FF2E93",
            light: "#FF5CA8",
            dark: "#D91B74",
            subtle: "rgba(255, 46, 147, 0.12)",
          },
          dark: {
            950: "#070709",
            900: "#0A0A0C",
            800: "#121216",
            700: "#181820",
            600: "#22222D",
          },
        },
      },
      boxShadow: {
        "glow-pink": "0 0 25px rgba(255, 46, 147, 0.35)",
        "glow-pink-lg": "0 0 45px rgba(255, 46, 147, 0.5)",
        "card-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "pink-gradient": "linear-gradient(135deg, #FF2E93 0%, #E11D48 100%)",
        "dark-gradient": "linear-gradient(180deg, rgba(18,18,22,0.8) 0%, rgba(10,10,12,0.95) 100%)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
