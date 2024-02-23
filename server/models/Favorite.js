const { Schema, model } = require('mongoose');

// INSERT TRIP ENTIRETY? DESINATION? FLIGHT? ACCOMODATIONS?
const favoriteSchema = new Schema(
    {
        tripName: {
            type: String,
        },
        tripDescription: {
            type: String,
        },
    }
)

const Favorite = model('Favorite', favoriteSchema)

module.exports = Favorite;