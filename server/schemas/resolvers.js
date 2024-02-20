const { Profile, Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // used to get data in graphql playground only
        // works correctly 
        profiles: async () => {
            return Profile.find().populate('posts');
        },

        // works correctly
        profile: async (parent, { name }) => {
            return Profile.findOne({ name }).populate('posts');
        },

        // works correctly 
        posts: async () => {
            return Post.find();
        },

        // used to load the users profile that is logged in
        // works correctly
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id }).populate('posts');
            }
            throw AuthenticationError
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

        //  works correctly 

        removePost: async (parent, { postId }, context) => {
            if (context.user) {

                const post = await Post.findOneAndDelete({
                    _id: postId,
                    postAuthor: context.user.name
                });

                await Profile.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: post._id}}
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
        }
    }
}

module.exports = resolvers;