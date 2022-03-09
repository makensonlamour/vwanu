module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "v-yellow-dark": "#ffa801",
        "v-yellow": "#ffc700",
        "v-gray": "#eff3ff",
      },
      screens: {
        "3xl": "2000px",
        "4xl": "2400px",
        // => @media (min-width: 2000px) { ... }
      },
    },
  },
  plugins: [require("daisyui")],

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

          info: "#e0f2fe",

          success: "#dcfce7",

          warning: "#fef9c3",

          error: "#fee2e2",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
