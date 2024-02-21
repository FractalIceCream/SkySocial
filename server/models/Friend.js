const { Schema, model } = require('mongoose');

const friendSchema = new Schema(
    {
        name: {
            type: String,
        },
        iataCode: {
            type: String,
        }
    },
)

const Friend = model('Friend', friendSchema);

module.exports = Friend;
