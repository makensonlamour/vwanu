module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        "v-yellow-dark": "#ffa801",
        "v-yellow": "#ffc700",
        "v-gray": "#eff3ff",
        "g-one": "#053DC8",
        "g-two": "#4E81FF",
        "placeholder-color": "#EFF3FF",
        "vwanu-color-3": "#797979",
        "info-2": "#e0f2fe",
        "success-2": "#dcfce7",
        "warning-2": "#fef9c3",
        "error-2": "#fee2e2",
      },
      screens: {
        "2xs": "320px",
        xs: "390px",
        "3xl": "2000px",
        "4xl": "2400px",
        // => @media (min-width: 2000px) { ... }
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],

  //Config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#ff4200",

          secondary: "#053dc8",

          accent: "#2155d7",

          neutral: "#3D4451",

          "base-100": "#FFFFFF",
        },
        screens: {
          sm: "425px",
          // => @media (min-width: 425px) { ... }

          md: "768px",
          // => @media (min-width: 768px) { ... }

          lg: "1023px",
          // => @media (min-width: 1024px) { ... }

          xl: "1100px",
          // => @media (min-width: 1100px) { ... }

          "2xl": "1440px",
          // => @media (min-width: 1440px) { ... }
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
