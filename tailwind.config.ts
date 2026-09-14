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
        bg: "var(--bg)",
        "bg-dark": "var(--bg-dark)",
        accent: "var(--accent)",
        ink: "var(--text)",
        muted: "var(--muted)",
        "muted-dark": "var(--muted-on-dark)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      spacing: {
        gutter: "var(--gutter)",
        "section-y": "var(--section-y)",
      },
      maxWidth: {
        measure: "var(--measure)",
        site: "88rem",
      },
    },
  },
  plugins: [],
};
export default config;
