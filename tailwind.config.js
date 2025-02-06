/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        grad_red:"#FF7A7A",
        grad_purple : "#AE7CF4",
        grad_blue : "#5A8BF5",
        btn_pink:"#FF86A0",
        stop_bg:"#FFEFEF",
      }
    },
  },
  plugins: [],
}

