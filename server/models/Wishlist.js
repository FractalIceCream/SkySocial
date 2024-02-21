const { Schema, model } = require('mongoose');

// will remove trip info because we only need wishlist name to show it on the button
// then when the user clicks on the wishlist trip the process to plan and book a trip begins

const wishlistSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tripInfo: [
            {
                type: Schema.Types.ObjectId,
                ref: 'TripInfo'
            }
        ],
    }
)

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;