const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create virtual for like count
// add ref to wishlist

const postSchema = new Schema(
    {
        postAuthor: {
            type: String,
            required: true,
            trim: true,
        },
        postText: {
            type: String,
            required: [true, 'Must have a post'],
            minLength: 1,
            maxLength: 280,
            trim: true,
        },
        imageUrl: {
            type: String, // url of image here
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => dateFormat(timestamp),
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Profile'
            }
        ],
        comments: [
            {
                commentText: {
                    type: String,
                    required: true,
                    minlength: 1,
                    maxlength: 280,
                },
                commentAuthor: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                    get: (timestamp) => dateFormat(timestamp),
                },
                secondLevelComments: [
                    {
                        secondLevelcommentText: {
                            type: String,
                            required: true,
                            minlength: 1,
                            maxlength: 280,
                        },
                        secondLevelcommentAuthor: {
                            type: String,
                            required: true,
                        },
                        secondLevelcreatedAt: {
                            type: Date,
                            default: Date.now,
                            get: (timestamp) => dateFormat(timestamp),
                        },
                    },
                ],
            },
        ],
    },
)

postSchema.virtual('likesCount').get(function() {return this.likes.length})

const Post = model('Post', postSchema);

module.exports = Post;