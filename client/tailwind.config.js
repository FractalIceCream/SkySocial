module.exports = {
  // Specify the paths to all of the files in your project
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
 

  // Other configuration options...
  theme: {
    extend: {
     height: {
       'wishlist-height': '35rem',
       'inner-wishlist-height': '28rem',
       'actionsWidget': '25rem',
       'submitPost': '15rem',
       'inputSubmitPost': '9rem',
       'line': '.10rem',
       'postContainer': '60rem',
       'post': '26rem',
       'submitComment': '3.8rem'
      
     },
     width: {
       'wishlist-width': '20rem',
       'inner-wishlist-width': '17rem',
       'actionsWidget': '25rem',
       'submitPost': '42rem',
       'inputSubmitPost': '39rem',
       'postContainer': '43rem',
       'submitComment': '39rem',
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
        'inner-strongest': 'inset 0 0 5px rgba(0, 0, 0, 0.3)', 
        'custom': '0 20px 20px -5px rgb(0 0 0 / 0.7)',
      },
      fontFamily: {
        'custom': 'Raleway'
      },
       maxHeight: {
        'custom': '24rem', 
      },
       maxWidth: {
        'custom': '43rem', // Replace 'custom' with your preferred class name and adjust the value
      },
      
    },
  },
  plugins: [],
}