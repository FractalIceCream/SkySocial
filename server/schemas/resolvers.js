const { Profile, Post, TripInfo } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const { getIataCode, getFlightOffers } = require('../utils/api');

const resolvers = {
    Query: {
        profiles: async () => {
            return Profile.find().populate('posts').populate('following').populate('wishlist');
        },
        profile: async (parent, { profileId }) => {
            Profile.fine
            return Profile.findById(profileId).populate('posts').populate('following').populate('wishlist');
        },
        profileByName: async (parent, { name }) => {
            try {
                const profile = await Profile.findOne(
                    { name: { $regex: new RegExp('^' + name + '$', 'i') } }
                ).populate('posts').populate('following').populate('wishlist');
                
                console.log('Profile:', profile);
        
                if (!profile) {
                    return null;
                }
                return profile;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        posts: async () => {
            return Post.find().populate('likes');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id }).populate('posts').populate('following').populate('wishlist');
            }
            throw AuthenticationError
        },
        tripinfo: async () => {
            return TripInfo.find();
        },
        aggregateTrips: async () => {
            return TripInfo.aggregate([
                { $group: { _id: "$name", count: { $sum: 1 } } },
                { $project: { name: "$_id", count: "$count" } },
                { $sort: { count: -1 } }
              ]);
        },
        myTripinfo: async (parent, args, context) => {
            if (context.user) {
                const profile = await Profile.findOne({ _id: context.user._id }).populate('wishlist');

                if (profile) {
                    return profile.wishlist;
                } else {
                    throw new Error('Profile not found');
                }
            } else {
                throw new Error('User not authenticated')
            }
        },
        following: async (parent, args, context) => {
            if (context.user) {
                const profile = await Profile.findOne({ _id: context.user._id }).populate('following');

                if (profile) {
                    return profile.following;
                } else { 
                    throw new Error('Profile not found');
                }
            }  else {
                throw new Error('User not authenticated');
            }
        }
    },
    Mutation: {
        addProfile: async (parent, { name, email, password }) => {
            try {
                const profile = await Profile.create({ name, email, password });
                    console.log(name, email, password);
                const token = signToken(profile);

                return { token, profile };

            } catch (error) {
                console.error(error);
                throw AuthenticationError
            }
        },
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
        createPost: async (parent, { postText, imageUrl }, context) => {
            if (context.user) {
                const post = await Post.create({
                    postText,
                    postAuthor: context.user.name,
                    imageUrl
                });
                await Profile.findOneAndUpdate(
                    { _id: (context.user._id) },
                    { $addToSet: { posts: post._id } },
                    {
                        new: true,
                    },
                );
                return post;
            }
            throw AuthenticationError;
        },
        likePost: async (parent, { postId }, context) => {
            if (context.user) {
                const post = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $addToSet: {likes: context.user._id} },
                    { new: true },
                )
                return post;
            }
        },
        unlikePost: async (parent, { postId }, context) => {
            try {
              if (context.user) {
                const post = await Post.findByIdAndUpdate(
                  postId,
                  { $pull: { likes: context.user._id } },
                  { new: true }
                );
                return post;
              } else {
                throw new AuthenticationError("User not authenticated");
              }
            } catch (error) {
              console.error("Error unliking post:", error);
              throw new Error("Error unliking post");
            }
        },
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
        createComment: async (parent, { postId, commentText }, context) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    { $addToSet: 
                        { comments: { commentText, commentAuthor: context.user.name } } 
                    },
                    { new: true },
                );
            }
            throw AuthenticationError
        },
        removeComment: async (parent, { postId, commentId }, context) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    { $pull: { 
                        comments: { _id: commentId, commentAuthor: context.user.name },
                        },
                    },
                    { new: true }
                );
            }
            throw AuthenticationError
        },
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

                const tripInfoItem = await TripInfo.findOneAndDelete({
                    _id: tripId,
                });

                await Profile.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { wishlist: tripInfoItem._id } }
                );

                return tripInfoItem;
            }
        },
        //run third-API queries to retrieve proper IATA CODES and flightoffer data
        updateTrip: async (parent, { tripId, tripInfo }, context) => {
            try {
                if (context.user) {
                    const origin = await getIataCode(tripInfo.originLocationCode);
                    const dest = await getIataCode(tripInfo.destinationLocationCode);
                    const originLocationCode =  origin.iataCode;
                    const destinationLocationCode =  dest.iataCode;

                    await TripInfo.findOneAndUpdate(
                        { _id: tripId },
                        { ...tripInfo, originLocationCode, destinationLocationCode }
                    );
    
                    const offer = await getFlightOffers( { ...tripInfo, originLocationCode, destinationLocationCode, max: 1});
                    if (!offer) throw new Error('No flight offer found with those dates');
                    return offer;
                }
            } catch (error) {
                console.error('Error adding following profile:', error);
                return error;
            }
            throw AuthenticationError;
        },
        // store API response from the flightoffer
        addItinerary: async (parent, { tripId, itinerary }, context) => {
            if (context.user) {
                const addItinerary = await TripInfo.findOneAndUpdate(
                    { _id: tripId },
                    { $set: { itinerary }},
                    { new:true}
                );
                return addItinerary;
            }
            throw AuthenticationError;
        }
    },
};

module.exports = resolvers;