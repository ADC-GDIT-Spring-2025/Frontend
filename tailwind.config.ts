/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            typography: {
              DEFAULT: {
                css: {
                  color: 'white',
                  h1: { color: 'white' },
                  h2: { color: 'white' },
                  h3: { color: 'white' },
                  li: { color: 'white' },
                },
              },
            },
          },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('tailwind-scrollbar-hide'),
    ],
  }