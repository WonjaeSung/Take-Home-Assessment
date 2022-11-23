const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./*.{html,js}","./src/**/*.{html,js}"],
  theme: {
    screens: {
      'xl': '361px',
      ...defaultTheme.screens,
    },
    extend: {
    
    },
  },
  plugins: [ require('@tailwindcss/forms')],
}
