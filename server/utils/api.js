// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter

const Amadeus = require('amadeus');

const amadeus = new Amadeus({
    clientId: 'd9z5xUM7qGiZA1gGdhLEc8zSfNe32sD8',
    clientSecret: 'U6qZP8oQtRLjLSyU'
});


amadeus.referenceData.urls.checkinLinks.get({ airlineCode: 'BA' }).then(function(res) {
    console.log(res.data);
}).catch((res) => console.log(res.code));

// amadeus.shopping.flightOffersSearch.get({
//     originLocationCode: 'SYD',
//     destinationLocationCode: 'BKK',
//     departureDate: '2024-02-19',
//     adults: '2'
// }).then(function(response){
//   console.log(response.data);
// }).catch(function(responseError){
//   console.log(responseError.code);
// });

// module.exports = searchFlightOffer = function () {

//     const currentDate = new Date.now();
//     const year = currentDate.getFullYear();
//     const month = (currentDate.getMonth() + 1).padStart(2, '0').toString();
//     const day = (currentDate.getDate()).padStart(2, '0');

//     const formatDate = `${year}-${month}-${day}`;

//     const data = fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=${formatDate}&adults=1&max=2`);

//     console.log(data);
//     // return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
//   };
  