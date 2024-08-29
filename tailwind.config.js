/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-banner": "url(https://quukdgmptljwmfbsitnj.supabase.co/storage/v1/object/public/publicbucket/bookcover/world-domination-system.jpg)"
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          },
        },
      }
    },
    fontFamily: {
      montessart: ['"Montserrat"', 'sans-serif']
    }
  },
  plugins: [],
}

