/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "769px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      zIndex: {
        130: 900,
        140: 950,
        150: 999,
      },
      screens: {
        xs: { min: "180px", max: "640px" },
        // safari: {
        //   raw: "(min-color-index:0) and (-webkit-min-device-pixel-ratio:0)",
        // },
      },
      boxShadow:{
        dashboard: "0px 2px 11px rgba(0, 0, 0, 0.32)",
        card: "0px 4px 18px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "gradient": "linear-gradient(to bottom, #cc9441, #668968)",
          auth:`url("./public/authbuyer_bg.png")`,
      },
      fontFamily: {
        Roboto: ["Roboto"],
        RobotoBold: ["RobotoBold"],
      },
      colors: {
        primary: "#668968",
        secondary: "#cc9441",
      },
      backgroundColor: {
        "modal": "rgba(0, 0, 0, 0.15)",
      },
  
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}

