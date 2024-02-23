const Amadeus = require('amadeus');
require('dotenv').config();

const amadeus = new Amadeus({
    clientId: process.env.API_KEY, //|| 'd9z5xUM7qGiZA1gGdhLEc8zSfNe32sD8',
    clientSecret: process.env.API_SECRET //|| 'U6qZP8oQtRLjLSyU'
});

// query contains keyword like a city name
// keyword only required to fetch 
module.exports = {
    getIataCode: async (query) => {
        try {
            const res = await amadeus.client.get('/v1/reference-data/locations/cities', {
                keyword: query,
                max: 1,
                include: 'AIRPORTS'
            });
            // console.log(data);
            if (!res) {
                console.log("Something went wrong");
            }

            const { name, iataCode } = res.data[0];
            // const name = data[0].name;
            // console.log( name + iataCode );
            return ({ name, iataCode });
        } catch (error) {
            return console.log(error);
        }
    },

    getIataCode1: async (query) => {
        try {
            const res = await amadeus.client.get('/v1/reference-data/locations', {
                subType: ['AIRPORTS', 'CITIES'],
                keyword: query,
                max: 1,
            });
            if (!res) {
                console.log("Something went wrong");
            }

            const { name, iataCode } = res.data[0];

            return { name, iataCode };
        } catch (error) {
            return console.log(error);
        }
    },

    //queryArgs object needs at minimum
    //originLocationCode, destinationLocationCode, departureDate, adults
    // additional args returnData, children, infants, nonStop, includeAirlines, excludeAirlines,
    // maxPrice, travelClass, currencyCode, max
    getFlightOffers: async (queryArgs) => {
        try {
            // console.log(queryArgs);
            const res = await amadeus.client.get('/v2/shopping/flight-offers',
                queryArgs);
            if (!res) {
                console.log("Something went wrong");
                // res.status(400).json({ message: "Something went wrong"});
            }
            const departureCode = res.data[0].itineraries[0].segments[0].departure.iataCode;
            const departureDate = res.data[0].itineraries[0].segments[0].departure.at;
            const arrivalCode = res.data[0].itineraries[0].segments[0].arrival.iataCode;
            const arrivalDate = res.data[0].itineraries[0].segments[0].arrival.at;
            const price = res.data[0].price.grandTotal;
            const offer = {
                departureDate,
                departureCode,
                arrivalDate,
                arrivalCode,
                price
            };


            return offer;
            // return res.status(200).json(data);
        } catch (error) {
            return console.log(error);
            // return res.status(500).json(error);
        }
    }
};
// // // const { originLocationCode,
// // //         destinationLocationCode,
// // //         departureDate,
// // //         returnDate, 
// // //         adults, 
// // //         children, 
// // //         infants, 
// // //         nonStop, 
// // //         includedAirlines, 
// // //         excludedAirines, 
// // //         maxPrice, 
// // //         travelClass, 
// // //         currencyCode, 
// // //         max } = amadeusParams;

// // // amadeus.client.get('/v2/shopping/flight-offers', {
// // //     originLocationCode: 'DFW',
// // //     destinationLocationCode: 'NYC',
// // //     departureDate: '2024-02-20',
// // //     adults: 1,
// // //     max: 2
// // //     }).then((res) => console.log(JSON.stringify(res.data)))
// // //     .catch((err) => console.error(err.code));

// // // amadeus.client.get('/v1/reference-data/locations/cities', {
// // //     keyword: 'dallas', max: 10, include: 'AIRPORTS'})
// // //     .then(res => console.log(res.data))
// // //     .catch(err => console.error(err));

// // // res.data[0].iataCode  DFW
// // //  res.data[0].name    Dallas

// //     // module.exports = searchFlightOffer = function () {

// // //     const currentDate = new Date.now();
// // //     const year = currentDate.getFullYear();
// // //     const month = (currentDate.getMonth() + 1).padStart(2, '0').toString();
// // //     const day = (currentDate.getDate()).padStart(2, '0');

// // //     const formatDate = `${year}-${month}-${day}`;

// // //     const data = fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=${formatDate}&adults=1&max=2`);

// // //     console.log(data);
// // //     // return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// // //   };
