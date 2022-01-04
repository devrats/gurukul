module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primaryPink: "#F7BDD6",
        cyan: "#66BFBF",
        priBack: "#D3E4CD",
      },
      backgroundImage: {
        dashboard_background:
          "url('https://www.gstatic.com/classroom/themes/img_walkingdog.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
