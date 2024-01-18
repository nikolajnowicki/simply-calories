import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "0.5": "0.125rem",
        "0.25": "0.0625rem",
        px: "1px",
      },
      colors: {
        // Light Theme

        LightbgCol: "#b3e4f0",
        LightPrimaryCol: "#365486",
        LightSecondaryCol: "#B6BBC4",
        LightUiCol: "#e2e8f0",
        LightUiCol2: "#DCF2F1",
        LightTextCol: "#0F1035",
        LightTextCol2: "#1A1A56",

        // Dark Theme

        DarkbgCol: "#121212",
        DarkPrimaryCol: "#31304D",
        DarkSecondaryCol: "#B6BBC4",
        DarkUiCol: "#121212",
        DarkTextCol: "#FFFFFF",
        DarkTextCol2: "#FFBF00",

        // Universal

        textError: "#FF7070",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwind-hamburgers")],
};
export default config;
