// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter

const Amadeus = require('amadeus');

const amadeus = new Amadeus({
    clientId: process.env.API_KEY || 'd9z5xUM7qGiZA1gGdhLEc8zSfNe32sD8',
    clientSecret: process.env.SECRET || 'U6qZP8oQtRLjLSyU'
});

//query contains keyword like a city name
//keyword only required to fetch 
module.exports = {
    getIataCode: async (query, res) => {
    try {
        const data = await amadeus.client.get('/v1/reference-data/locations/cities', {
            keyword: query,
            max: 1,
            include: 'AIRPORTS'
        });
        console.log(data);
        if (!data) {
            res.status(400).json({ message: "Something went wrong"});
        }

        const iataCode = data[0].iataCode;
        const name = data[0].name;

        return res.status(500).json({ name, iataCode });
    } catch (error) {
        return res.status(500).json(error);
    }
    
},

//queryArgs object needs at minimum
//originLocationCode, destinationLocationCode, departureDate
// additional args returnData, adults, children, infants, nonStop, includeAirlines, excludeAirlines,
// maxPrice, travelClass, currencyCode, max
    getFlightOffers: async ( queryArgs , res) => {
    try {
        const data = await amadeus.client.get('/v2/shopping/flight-offers', {
            queryArgs
        });
        if (!data) {
            res.status(400).json({ message: "Something went wrong"});
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}
};
// const { originLocationCode,
//         destinationLocationCode,
//         departureDate,
//         returnDate, 
//         adults, 
//         children, 
//         infants, 
//         nonStop, 
//         includedAirlines, 
//         excludedAirines, 
//         maxPrice, 
//         travelClass, 
//         currencyCode, 
//         max } = amadeusParams;

// amadeus.client.get('/v2/shopping/flight-offers', {
//     originLocationCode: 'DFW',
//     destinationLocationCode: 'NYC',
//     departureDate: '2024-02-20',
//     adults: 1,
//     max: 2
//     }).then((res) => console.log(JSON.stringify(res.data)))
//     .catch((err) => console.error(err.code));

// amadeus.client.get('/v1/reference-data/locations/cities', {
//     keyword: 'dallas', max: 10, include: 'AIRPORTS'})
//     .then(res => console.log(res.data))
//     .catch(err => console.error(err));

// res.data[0].iataCode  DFW
//  res.data[0].name    Dallas

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
  
//res.data
// [
//     {
//       type: 'flight-offer',
//       id: '1',
//       source: 'GDS',
//       instantTicketingRequired: false,
//       nonHomogeneous: false,
//       oneWay: false,
//       lastTicketingDate: '2024-02-20',
//       lastTicketingDateTime: '2024-02-20',
//       numberOfBookableSeats: 9,
//       itineraries: [ [Object] ],
//       price: {
//         currency: 'EUR',
//         total: '482.96',
//         base: '409.00',
//         fees: [Array],
//         grandTotal: '482.96'
//       },
//       pricingOptions: { fareType: [Array], includedCheckedBagsOnly: true },
//       validatingAirlineCodes: [ 'MH' ],
//       travelerPricings: [ [Object] ]
//     },
//     {
//       type: 'flight-offer',
//       id: '2',
//       source: 'GDS',
//       instantTicketingRequired: false,
//       nonHomogeneous: false,
//       oneWay: false,
//       lastTicketingDate: '2024-02-20',
//       lastTicketingDateTime: '2024-02-20',
//       numberOfBookableSeats: 9,
//       itineraries: [ [Object] ],
//       price: {
//         currency: 'EUR',
//         total: '482.96',
//         base: '409.00',
//         fees: [Array],
//         grandTotal: '482.96'
//       },
//       pricingOptions: { fareType: [Array], includedCheckedBagsOnly: true },
//       validatingAirlineCodes: [ 'MH' ],
//       travelerPricings: [ [Object] ]
//     }
//   ]



// const tripInfoSchema = new Schema(
//     {
//         name: {
//             type: String,
//             required: true,

//         },
//         originLocationCode: {
//             type: String,
//             required: true,
//         },
//         destinationLocationCode: {
//             type: String,
//             required: true,
//         },
//         departureDate: {
//             type: Date,
//             required: true,
//             // Dates specified in ISO 8601 YYYY-MM-DD format
//         },
//         returnDate: {
//             type: Date,
//             // Dates specified in ISO 8601 YYYY-MM-DD format
//             validate: {
//                 validator: function(value) {
//                     return this.departureDate === undefined || value >= this.departureDate;
//                 },
//                 message: 'Return date should be equal to or after the departure date',
//             }
//         },
//         adults: {
//             type: Number,
//             required: true,
//         },
//         children: {
//             type: Number,
//             maxLength: 9,
//         },
//         infants: {
//             type: Number,
//             // maxLength not exceeding amount of adults
//             validate: {
//                 validator: function(value) {
//                     return this.adults === undefined || value <= this.adults;
//                 },
//                 message: 'Number of infants should not exceed the number of adults',
//             },
//         },
//         travelClass: {
//             type: String,
//             // available options: ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST
//             enum: ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'],
//         },
//         includedAirlineCodes: {
//             type: String,
//             // IATA airline codes and comma-separated
//         },
//         excludedAirlineCodes: {
//             type: String,
//             // IATA airline codes and comma-separated
//         },
//         nonStop: {
//             type: Boolean,
//             default: false,
//         },
//         currencyCode: {
//             type: String,
//             // ISO 4217 format
//         },
//         maxPrice: {
//             type: Number,
//             // should be a positive number with no decimals
//         },
//         max: {
//             type: Number,
//             // max number of returned flights, default value 250, should be greater than or equal to 1
//         },
//         profile: [
//             {
//                 type: Schema.Types.ObjectId,
//                 ref: 'Profile',
//             }
//         ]
//     }
// )