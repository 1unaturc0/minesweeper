/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "450px",
      md: "600px",
      hmd: { raw: "(min-height: 600px)" },
    },
    extend: {
      colors: {
        "primary-a": "rgba(var(--primary-a))",
        "primary-b": "rgba(var(--primary-b))",
        "primary-c": "rgba(var(--primary-c))",
        "secondary-a": "rgba(var(--secondary-a))",
        "secondary-b": "rgba(var(--secondary-b))",
      },
    },
  },
  plugins: [],
};
