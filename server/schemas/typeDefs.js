// what other fields should favorite trip have

// add query to get all favorite trips specific to a users profile
// add query to get all posts from friends for home page
// add query to get all posts specific to a users profile for profile page

// add mutation to comment on post
// add mutation to add friend
// add mutation to unadd friend
// add mutation to like post
// add mutation to unlike post

// able to addUser and login but i am not getting my profile information back

const typeDefs = `
    type Profile {
        _id: ID
        name: String
        email: String
        posts: [Post]
        friends: [Friend]
        favorites: [Favorite]
    }

    type Friend {
        _id: ID
        name: String
    }

    type Post {
        _id: ID
        postAuthor: String
        postText: String
        imageUrl: String
        createdAt: String
        comments: [Comment]
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String
    }

    type Favorite {
        _id: ID
        tripName: String
        tripDescription: String
    }

    type Auth {
        token: ID!
        profile: Profile
    }

    type Query {
        profiles: [Profile]
        profile(name: String!): Profile
        me: Profile
        posts: [Post]
    }

    type Mutation {
        addProfile(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createPost(postText: String!): Post
    }
`;

module.exports = typeDefs;

