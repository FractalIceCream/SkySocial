const { Profile, Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require('mongoose').Types

// get all profiles query working but postData coming back null

const resolvers = {
    Query: {
        // used to get data in graphql playground only
        // works correctly 
        profiles: async () => {
            return Profile.find();
        },

        // used to find a specific user by name
        // works correctly 
        profile: async (parent, { name }) => {
            return Profile.findOne({ name });
        },

        posts: async () => {
            return Post.find();
        },

        // used to load the users profile that is logged in
        // need to test
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id });
            }
            throw AuthenticationError
        },
    },

    Mutation: {
        // works correctly but not returning profile information after adding profile
        addProfile: async (parent, { name, email, password }) => {

            try {
                const profile = await Profile.create({ name, email, password });
                // console.log(user)

                const token = signToken(profile);

                return { token, profile };

            } catch (error) {

                throw AuthenticationError

            }
        },

        // works correctly but not returning profile information after logged in
        login: async (parent, { email, password }) => {
            const profile = await Profile.findOne({ email });

            if (!profile) {
                throw AuthenticationError;
            }

            const correctPw = await profile.isCorrectPassword(password)

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(profile);

            return { token, profile };
        },

        // post is being created and saved to profile but
        // the text is showing up as null

        createPost: async (parent, { postText }, context) => {
            console.log(context.user)
            if (context.user) {
                const post = await Post.create({
                    postText,
                    postAuthor: context.user.name,
                });

                console.log(post)

                await Profile.findOneAndUpdate(
                    { _id: (context.user._id) },
                    { $addToSet: { posts: post._id} },
                    {
                        // new: true,
                        // ask about runValidators
                        // runValidators: true,
                    },
                );

                return post;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },

    }
}

module.exports = resolvers;