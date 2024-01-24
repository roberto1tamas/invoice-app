/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["League Spartan'", "sans-serif"],
    },
    fontSize: {
      sm: [
        "0.8125em",
        {
          fontWeight: "500",
          lineHeight: "0.9375rem",
          letterSpacing: "-0.00625rem",
        },
      ],
      base: [
        "0.8125rem",
        {
          lineHeight: "1.125rem",
          letterSpacing: "-0.00625rem",
          fontWeight: "500",
        },
      ],
      "hs-variant": [
        "0.9375rem",
        {
          fontWeight: "700",
          lineHeight: "0.9375rem",
          letterSpacing: "-0.01563rem",
        },
      ],
      hs: [
        "0.9375rem",
        {
          fontWeight: "700",
          lineHeight: "1.5rem",
          letterSpacing: "-0.01563rem",
        },
      ],
      hm: [
        "1.5rem",
        {
          fontWeight: 700,
          lineHeight: "2rem", // bk: "1.375rem"
          letterSpacing: "-0.04688rem",
        },
      ],
      hl: [
        "2.25rem",
        {
          fontWeight: "700",
          lineHeight: "2.063rem",
          letterSpacing: "-0.07031rem;",
        },
      ],
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        purple: "#7C5DFA",
        "purple-light": "#9277FF",
        dark: "#1E2139",
        "grey-yankees": "#252945",
        "link-water": "#DFE3FA",
        "grey-regent": "#888EB0",
        "blue-wild": "#7E88C3",
        "dark-cinder": "#0C0E16",
        red: "#EC5757",
        pink: "#FF9797",
        white: "#F8F8FB",
        "white-pure": "#ffffff",
        "dark-mirage": "#141625",
      },
      boxShadow: {
        10: "0px 10px 10px -10px rgba(72, 84, 159, 0.10)",
      },
    },
  },

  plugins: [],
};
