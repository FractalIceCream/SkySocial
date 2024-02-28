const Amadeus = require('amadeus');
require('dotenv').config();

const amadeus = new Amadeus({
    clientId: process.env.API_KEY,
    clientSecret: process.env.API_SECRET
});

// query contains keyword like a city name
// keyword only required to fetch 
module.exports = {
    getIataCode: async (query) => {
        try {
            const res = await amadeus.client.get('/v1/reference-data/locations/cities', {
                keyword: query,
                max: 1,
            });
             if (!res) {
                console.log("Something went wrong");
            }

            const { name, iataCode } = res.data[0];
            return ({ name, iataCode });
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
                {...queryArgs, nonStop: true});
            
            if(res.data.length === 0) {
                return;
            }
            if (!res) {
                return console.log("Something went wrong");
            }

            //destination itinerary
            const departureCode = res.data[0]?.itineraries[0].segments[0].departure.iataCode;
            const departureDate = res.data[0]?.itineraries[0].segments[0].departure.at;
            const arrivalCode = res.data[0]?.itineraries[0].segments[0].arrival.iataCode;
            const arrivalDate = res.data[0]?.itineraries[0].segments[0].arrival.at;

            //return itinerary
            const departureCodeR = res.data[0]?.itineraries[1].segments[0].departure.iataCode;
            const departureDateR = res.data[0]?.itineraries[1].segments[0].departure.at;
            const arrivalCodeR = res.data[0]?.itineraries[1].segments[0].arrival.iataCode;
            const arrivalDateR = res.data[0]?.itineraries[1].segments[0].arrival.at;

            const price = res.data[0]?.price.grandTotal;
            const offer = {
                departureDate,
                departureCode,
                arrivalDate,
                arrivalCode,
                departureDateR,
                departureCodeR,
                arrivalDateR,
                arrivalCodeR,
                price
            };


            return offer;
        } catch (error) {
            return console.log(error);
        }
    }
};
