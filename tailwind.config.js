/**
 * TAILWIND CONFIG
 *
 * We extend Tailwind's default theme instead of replacing it, so all the
 * standard utilities (spacing, grid, flex, etc.) still work. The custom
 * "brand" colors and fonts below are what give this dashboard its own
 * identity instead of looking like a default Tailwind template.
 */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#12161A",
          900: "#181D22",
          800: "#232A31",
          700: "#333C44",
        },
        paper: "#F6F4EF",
        gold: {
          50: "#FBF3DF",
          100: "#F3E2B3",
          400: "#C99A2E",
          500: "#A6790A",
          600: "#8A6308",
        },
        profit: {
          50: "#EAF3ED",
          500: "#3F6C51",
          600: "#315A41",
        },
        loss: {
          50: "#FBEAE8",
          500: "#B23A2F",
          600: "#96302A",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(18, 22, 26, 0.06), 0 1px 1px rgba(18, 22, 26, 0.04)",
      },
    },
  },
  plugins: [],
};
