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
       'actionsWidget': '25rem',
       'submitPost': '15rem',
       'inputSubmitPost': '9rem',
       'line': '.10rem'
      
     },
     width: {
       'wishlist-width': '20rem',
       'inner-wishlist-width': '17rem',
       'actionsWidget': '25rem',
       'submitPost': '50rem',
       'inputSubmitPost': '48rem'
     },
     backgroundColor: {
       "gray-dark": "#2E2F31",
        'gray': '#33363C',
         'gray-light': '#535050',
         'button-dark': '#464D4E',
     },
     borderRadius: {
       "custom": "30px",
     },
     boxShadow: {
        'inner-strong': 'inset 0 0 5px rgba(0, 0, 0, 0.6)', 
        'inner-strongest': 'inset 0 0 5x rgba(0, 0, 0, 0.9)', 
        'custom': '0 20px 20px -5px rgb(0 0 0 / 0.7)',
      },
      fontFamily: {
        'custom': 'Raleway'
      }
    },
  },
  plugins: [],
}