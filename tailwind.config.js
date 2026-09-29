/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        showroom: {
          bg: "#f7f7f9",
          card: "rgba(255, 255, 255, 0.72)",
          border: "rgba(0, 0, 0, 0.07)",
          dark: "#121214",
          muted: "#71717a",
          accent: "#27272a",
          stone: "#e4e4e7"
        }
      },
      fontFamily: {
        sans: ['"Cabinet Grotesk"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Didot', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        widest: '0.22em',
        luxury: '0.35em'
      }
    },
  },
  plugins: [],
}
