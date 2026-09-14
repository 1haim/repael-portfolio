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
        "accent-dark": "var(--accent-on-dark)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        "muted-dark": "var(--muted-on-dark)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      fontWeight: {
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      spacing: {
        gutter: "var(--gutter)",
        "section-y": "var(--section-y)",
        nav: "var(--nav-h)",
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
