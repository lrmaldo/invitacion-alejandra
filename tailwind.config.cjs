module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'serif']
      },
      colors: {
        primary: '#f7e7f7',
        accent: '#b892d6'
      }
    }
  },
  plugins: []
}
