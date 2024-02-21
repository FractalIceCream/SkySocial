module.exports = {
  // Specify the paths to all of the files in your project
  purge: [
    'index.html',
    'main.jsx',
    // Add more paths as needed
  ],

  // Other configuration options...
  theme: {
    extend: {
     height: {
       'wishlist-height': '35rem',
       'inner-wishlist-height': '28rem',
       'actionsWidget': '25rem'
     },
     width: {
       'wishlist-width': '20rem',
       'inner-wishlist-width': '17rem',
       'actionsWidget': '25rem'
     },
     backgroundColor: {
       "gray-dark": "#2E2F31",
        'gray': '#33363C',
         'gray-light': '#535050',
     },
     borderRadius: {
       "custom": "30px",
     },
     boxShadow: {
        'inner-strong': 'inset 0 0 5px rgba(0, 0, 0, 0.4)', 
        'inner-strongest': 'inset 0 0 20px rgba(0, 0, 0, 0.8)', 
      },
      fontFamily: {
        'custom': 'Raleway'
      }
    },
  },
  plugins: [],
}