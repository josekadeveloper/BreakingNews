/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      maxHeight: {
        '128': '52rem',
      },
      screens: {
        'mobile': '300px',
      },
    },
  },
  plugins: [],
}

