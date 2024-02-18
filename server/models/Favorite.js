const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new Schema({
    // INSERT TRIP ENTIRETY? DESINATION? FLIGHT? ACCOMODATIONS?
})

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;