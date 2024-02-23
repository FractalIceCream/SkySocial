const { Schema } = require('mongoose');

module.exports = itinerarySchema = new Schema(
    {
        departureDate: {
            type: String
        },
        departureCode: {
            type: String
        },
        arrivalDate: {
            type: String
        },
        arrivalCode: {
            type: String
        },
        price: {
            type: Number
        }
    }
);