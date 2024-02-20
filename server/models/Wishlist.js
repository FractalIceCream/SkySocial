const { Schema, model } = require('mongoose');

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