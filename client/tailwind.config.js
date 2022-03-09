module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "v-yellow-dark": "#ffa801",
        "v-yellow": "#ffc700",
        "v-gray": "#eff3ff",
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

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
