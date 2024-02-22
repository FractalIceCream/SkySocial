const { Profile, Post, TripInfo } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const { getIataCode, getFlightOffers } = require('../utils/api');

// NEED TO CREATE MUTATION FOR ACCEPT FRIEND
// addFriend will add a friend and save the added friend to the profile that sent the friend request
// need to either add another mutation that will be linked to a accept friend button
// or edit my addFriend code so that a friend is added to both the sender and the reciever
// for example test5 user adds test56 user. test 5 user has a friend and test56 does not

// find all posts should populate all comments as well

// edit profile query so that logged out users cant see everything only show post and comments
// edit trip info so that if you are context or a friend of context

// rename addFriend to followProfile 

// do not need wishlist mutations because when we use createTrip that will populate the wishlist by name
// after the user clicks on said trip to book it then 

const resolvers = {
    Query: {

        //takes args{originLocationCode, destinationCode, departureDate}
        //reassigns to get corresponding IataCodes from user-input
        //returns {departureCode, departureDate, arrivalCode, arrivalDate, price} so far!

        //want to see name's of to and from cities
        flightOffer: async (parent, args) => {
            const origin = await getIataCode(args.originLocationCode);
            const originLocationCode = origin.iataCode;

            const destination = await getIataCode(args.destinationLocationCode);
            const destinationLocationCode = destination.iataCode;

            const offer = await getFlightOffers({ ...args, originLocationCode, destinationLocationCode, max: 1 });

            return offer;
        },

        // used to get data in graphql playground only
        // works correctly 
        profiles: async () => {
            return Profile.find().populate('posts').populate('following').populate('wishlist');
        },

        // works correctly
        profile: async (parent, { name }) => {
            return Profile.findOne({ name }).populate('posts').populate('following').populate('wishlist');
        },


        // works correctly 
        posts: async () => {
            return Post.find();
        },

        // used to load the users profile that is logged in
        // works correctly
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id }).populate('posts').populate('following').populate('wishlist');
            }
            throw AuthenticationError
        },

        // untested
        tripinfo: async (parent, args, context) => {
            
            if (context.user) {
                return Profile.findOne({ _id: context.user._id }).populate('tripinfo').populate('wishlist');
            }
        },
    },

    Mutation: {

        // works correctly 
        addProfile: async (parent, { name, email, password }) => {

            try {
                const profile = await Profile.create({ name, email, password });

                const token = signToken(profile);

                return { token, profile };

            } catch (error) {

                throw AuthenticationError

            }
        },

        // works correctly 
        login: async (parent, { email, password }) => {
            const profile = await Profile.findOne({ email }).populate('posts');

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

        // works correctly 
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
                    { $addToSet: { posts: post._id } },
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

        //  works correctly 

        removePost: async (parent, { postId }, context) => {
            if (context.user) {

                const post = await Post.findOneAndDelete({
                    _id: postId,
                    postAuthor: context.user.name
                });

                await Profile.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: post._id } }
                );

                return post;
            }
            throw AuthenticationError
        },

        // Works correctly 
        createComment: async (parent, { postId, commentText }, context) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $addToSet: {
                            comments: { commentText, commentAuthor: context.user.name },
                        },
                    },
                    {
                        new: true,
                    },
                );
            }
            throw AuthenticationError
        },

        // works correctly
        removeComment: async (parent, { postId, commentId }, context) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                                commentAuthor: context.user.name,
                            },
                        },
                    },
                    {
                        new: true
                    }
                );
            }
            throw AuthenticationError
        },

        // works correctly
        createSecondLevelComment: async (parent, { postId, commentId, commentText }, context) => {
            try {
                const post = await Post.findById(postId);

                if (!post) {
                    throw new Error('Post not found');
                }

                const commentIndex = post.comments.findIndex(comment => comment._id.equals(commentId));
                if (commentIndex === -1) {
                    throw new Error('Comment not found');
                }

                post.comments[commentIndex].secondLevelComments.push({
                    secondLevelcommentText: commentText,
                    secondLevelcommentAuthor: context.user.name,
                    secondLevelcreatedAt: new Date().toISOString(),
                });

                await post.save();

                return post;

            } catch (error) {
                console.error('Error creating second-level comment:', error);
                throw error;
            }
        },

        // works correctly
        removeSecondLevelComment: async (parent, { postId, commentId, secondLevelCommentId }, context) => {
            try {

                const post = await Post.findById(postId);

                if (!post) {
                    throw new Error('Post not found')
                }

                const commentIndex = post.comments.findIndex(comment => comment._id.equals(commentId));
                if (commentIndex === -1) {
                    throw new Error('Comment not found');
                }

                const comment = post.comments[commentIndex];

                const secondLevelCommentIndex = comment.secondLevelComments.findIndex(comment => comment._id.equals(secondLevelCommentId));
                if (secondLevelCommentIndex === -1) {
                    throw new Error('Second-level comment not found');
                }

                comment.secondLevelComments.splice(secondLevelCommentIndex, 1);

                await post.save();

                return post;

            } catch (error) {
                console.error('Error removing second-level comment:', error);
                throw error;
            }
        },

        // look at comments above to see if these needs to be edited or a whole other mutation needs to be created.
        followProfile: async (parent, { profileId }, context) => {
            try {
                if (!context.user) {
                    throw new AuthenticationError('Must be logged in to follow profile');
                }

                const profile = await Profile.findById(context.user._id);

                if (!profile) {
                    throw new Error('Profile not found');
                }

                if (!profile.following.includes(profileId)) {
                    profile.following.push(profileId);
                    await profile.save();
                }

                return profile;

            } catch (error) {
                console.error('Error adding following profile:', error);
                throw error;
            };
        },

        unfollowProfile: async (parent, { profileId }, context) => {
            try {
                if (!context.user) {
                    throw new AuthenticationError('You must be logged into unfollow that profile');
                }

                const profile = await Profile.findById(context.user._id);

                if (!profile) {
                    throw new Error('Profile not found');
                }

                const index = profile.following.indexOf(profileId);
                if (index !== -1) {
                    profile.following.splice(index, 1);
                    await profile.save();
                }

                return profile;

            } catch (error) {
                console.error('Error unfollowing profile:', error);
                throw error
            }
        },

        // // untested
        // // need to edit code since wishlist is not a model anymore
        // removeWishlist: async (parent, { wishlistId }, context) => {
        //     if (context.user) {

        //         const profile = await Profile.findOneAndUpdate(
        //             { _id: context.user._id },
        //             { $pull: { wishlist: { _id: wishlistId } } },
        //             { new: true }
        //         );

        //         const removedWishlistItem = profile.wishlist.find(item => item._id === wishlistId);

        //         return removedWishlistItem;
        //     }
        //     throw AuthenticationError
        // },

        // untested
        // removed addWishlist mutation because we will be able to populate the wishlist ui with
        // this mutation
        createTrip: async (parent, { name }, context) => {
            if (context.user) {
                const tripInfoItem = await TripInfo.create({
                    name,
                });

                await Profile.findOneAndUpdate(
                    { _id: (context.user._id) },
                    { $addToSet: { wishlist: tripInfoItem._id } },
                    { new: true }
                );

                return tripInfoItem;
            }
            throw AuthenticationError;
        },

        removeTrip: async (parent, { tripId }, context) => {
            if (context.user) {

                const profile = await Profile.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { wishlist: { _id: tripId } } },
                    { new: true }
                );

                const removedWishlistItem = profile.wishlist.find(item => item._id === wishlistId);

                return removedWishlistItem;
            }
            throw AuthenticationError
        },
    },
};

module.exports = resolvers;