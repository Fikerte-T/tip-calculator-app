/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
      "custom-strongcyan": "hsl(172, 67%, 45%)",
      "custom-verydarkcyan": "hsl(183, 100%, 15%)",
      "custom-darkgrayishcyan": "hsl(186, 14%, 43%)",
      "custom-grayishcyan": "hsl(184, 14%, 56%)",
      "custom-lightgrayishcyan": "hsl(185, 41%, 84%)",
      "custom-verylightgrayishcyan": "hsl(189, 41%, 97%)",
      },
      fontFamily: {
        "custom": ["Space Mono", "monospace"]
      }
    },
  },
  plugins: [],
}

