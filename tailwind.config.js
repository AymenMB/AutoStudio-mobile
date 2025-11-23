/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#121212',
          light: '#1E1E1E',
        },
        surface: {
          dark: '#1E1E1E',
          light: '#2A2A2A',
        },
        carbon: {
          950: '#0A0A0A',
          900: '#121212',
          800: '#1E1E1E',
          700: '#2A2A2A',
          600: '#404040',
          500: '#525252',
          400: '#A3A3A3',
          200: '#E5E5E5',
        },
        primary: '#007AFF',
        'neon-cyan': '#00D9FF',
        'neon-purple': '#A855F7',
        text: {
          'primary-dark': '#FFFFFF',
          'secondary-dark': '#A3A3A3',
        }
      },
      fontFamily: {
        display: ['Inter_900Black'],
        bold: ['Inter_700Bold'],
        medium: ['Inter_500Medium'],
        regular: ['Inter_400Regular'],
      },
    },
  },
  plugins: [],
}

