// what other fields should favorite trip have

// add query to get all favorite trips specific to a users profile
// add query to get all posts for home page
// add query to get all posts specific to a users profile for profile page
// add query to get all wishlist trips specific to a logged in users trips
// add query to get all scheduled users trips

// put aside until main func is created

// add mutation to like post
// add mutation to unlike post
// add mutation to like comment 
// add mutation to unlike comment

// delete type favorite

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
        secondLevelComments: [secondLevelComment]
    }

    type secondLevelComment {
        _id: ID
        secondLevelcommentText: String
        secondLevelcommentAuthor: String
        secondLevelcreatedAt: String
    }

    type Wishlist {
        _id: ID
        name: String
        tripInfo: [TripInfo]
    }

    type TripInfo {
        name: String
        originLocationCode: String
        destinationLocationCode: String
        departureDate: String
        returnDate: String 
        adults: Int
        children: Int
        infants: Int
        travelClass: String
        includedAirlineCodes: String
        excludedAirlineCodes: String
        nonStop: Boolean
        currencyCode: String
        maxPrice: Int
        max: Int
        profile: [Profile]
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
        removePost(postId: ID!): Post
        createComment(postId: ID!, commentText: String!): Post
        removeComment(postId: ID!, commentId: String!): Post
        createSecondLevelComment(postId:ID!, commentId: ID!, commentText: String!): Post
        removeSecondLevelComment(postId: ID!, commentId: ID!, secondLevelCommentId: ID!): Post
        addFriend(friendId: ID!): Profile
        removeFriend(friendId: ID!): Profile
    }
`;

module.exports = typeDefs;

