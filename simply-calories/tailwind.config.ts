import type { Config } from "tailwindcss";

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

        LightbgCol: "#161A30",
        LightPrimaryCol: "#31304D",
        LightSecondaryCol: "#B6BBC4",
        LightUiCol: "#fffff",
        LightTextCol: "#F0ECE5",

        // Dark Theme

        DarkbgCol: "#121212",
        DarkPrimaryCol: "#31304D",
        DarkSecondaryCol: "#B6BBC4",
        DarkUiCol: "#121212",
        DarkTextCol: "#F0ECE5",
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
  plugins: [],
};
export default config;
