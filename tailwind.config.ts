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
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "#0A0302",
        dark_brown: "#3D120E",
        orange: "#F24738",
        light_pink: "#FBC6C1",
        white: "#FFFAF9",
      },
      fontFamily: {
        anek: ['var(--font-anek)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
