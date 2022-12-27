/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "split-gray-white":
          "linear-gradient(to bottom, #fefefe 30%, #fafafa 30%);",
        "split-white-gray":
          "linear-gradient(to bottom, #f6f6f6 30%, #fafafa 30%);",
        "split-blue-gray":
          "linear-gradient(to bottom, #426fef 33vh, #fafafa 30vh);",
      },
    },
    colors: {
      gray: "#fefefe",
      gray1: "#ECEDF1",
      gray2: "#767a82",
      gray3: "#a8a8a8",
      gray4: "#4b4b4b",
      blue1: "#0D26E0",
      blue2: "#415EDE",
      green: "#30d26c",
      red: "#ce427a",
      orange1: "#f8ba72",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
