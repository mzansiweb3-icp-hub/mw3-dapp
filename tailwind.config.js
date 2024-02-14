/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Teal: "#592C7E",
        HummingBird: "#d1f1ee",
        yellow: "#e4d63b",
        Solitude: "#e9e9ea",
      },
      fontFamily: {
        Poppins: "Poppins",
        kinfolk: ['Kinfolk', 'sans-serif'],
        cormorant: ['Cormorant', 'sans-serif'],
        tiempos: ['Tiempos', 'sans-serif'],
        graphikBold: ['Graphik-bold', 'sans-serif'],
        graphikSemiBold: ['Graphik-semi-bold', 'sans-serif'],
        graphik: ['Graphik', 'sans-serif'],
        roboto: ['var(--font-roboto)'],
      },
      animation: {
        slide: "slide 25s linear infinite"
      },
      keyframes: {
        slide: {
          "0%,100%" : {transform: "translateX(5%)"},
          "50%": {transform: "translateX(-120%)"}
        }
      }
    },
    screens: {
      ts: "360px",
      xs: "480px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },

  plugins: [],
}
