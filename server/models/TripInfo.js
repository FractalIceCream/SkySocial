const { Schema, model } = require('mongoose');
const itinerarySchema = require('./Itinerary');
const dateFormat = require('../utils/dateFormat');

const tripInfoSchema = new Schema(
    {
        itinerary: itinerarySchema,

        name: {
            type: String,
            required: true,
        },
        originLocationCode: {
            type: String,
            // required: true,
        },
        destinationLocationCode: {
            type: String,
            // required: true,
        },
        departureDate: {
            type: String,
            // required: true,
            // Dates specified in ISO 8601 YYYY-MM-DD format
        },
        returnDate: {
            type: String,
            // Dates specified in ISO 8601 YYYY-MM-DD format
            // validate: {
            //     validator: function(value) {
            //         return this.departureDate === undefined || value >= this.departureDate;
            //     },
            //     message: 'Return date should be equal to or after the departure date',
            // }
        },
        adults: {
            type: Number,
            // required: true,
        },
        children: {
            type: Number,
            maxLength: 9,
        },
        infants: {
            type: Number,
            // maxLength not exceeding amount of adults
            validate: {
                validator: function(value) {
                    return this.adults === undefined || value <= this.adults;
                },
                message: 'Number of infants should not exceed the number of adults',
            },
        },
        // travelClass: {
        //     type: String,
        //     // available options: ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST
        //     enum: ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'],
        // },
        // includedAirlineCodes: {
        //     type: String,
        //     // IATA airline codes and comma-separated
        // },
        // excludedAirlineCodes: {
        //     type: String,
        //     // IATA airline codes and comma-separated
        // },
        // nonStop: {
        //     type: Boolean,
        //     default: false,
        // },
        // currencyCode: {
        //     type: String,
        //     // ISO 4217 format
        // },
        // maxPrice: {
        //     type: Number,
        //     // should be a positive number with no decimals
        // },
        // max: {
        //     type: Number,
        //     // max number of returned flights, default value 250, should be greater than or equal to 1
        // },
    }
)

const TripInfo = model('TripInfo', tripInfoSchema)

module.exports = TripInfo;