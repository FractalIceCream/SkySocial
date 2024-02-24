// add mutation to save tripinfo into model from api

// put aside until main func is created
// add mutation to like post
// add mutation to unlike post
// add mutation to like comment 
// add mutation to unlike comment
// fix comment mutation to not have to create multiple level mutations

const typeDefs = `
    type Profile {
        _id: ID
        name: String
        email: String
        posts: [Post]
        following: [Profile]
        wishlist: [TripInfo]
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

    type TripInfo {
        _id: ID
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
        itinerary: FlightOffer
    }

    input TripInput {
        _id: ID
        name: String
        originLocationCode: String!
        destinationLocationCode: String!
        departureDate: String!
        returnDate: String
        adults: Int!
        children: Int
        infants: Int
        #travelClass: String
        #includeAirlineCodes: String
        #excludeAirlineCodes: String
        #nonStop: Boolean
        #currecnyCode: String
        #maxPrice: Int
        #max: Int
    }

    type FlightOffer {
        departureDate: String
        departureCode: String
        arrivalDate: String
        arrivalCode: String
        price: Float
    }

    input ItineraryInput {
        departureDate: String
        departureCode: String
        arrivalDate: String
        arrivalCode: String
        price: Float
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
        following: [Profile]
        tripinfo: [TripInfo]
        #flightOffer(tripId: ID!, tripInfo: TripInput!): FlightOffer
        myTripinfo: [TripInfo]
        #flightOffer(
            #originLocationCode: String!,
            #destinationLocationCode: String!,
            #departureDate: String!,
            #adults: Int!): FlightOffer
    }

    type Mutation {
        addProfile(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createPost(postText: String!, imageUrl: String): Post
        removePost(postId: ID!): Post
        createComment(postId: ID!, commentText: String!): Post
        removeComment(postId: ID!, commentId: String!): Post
        createSecondLevelComment(postId:ID!, commentId: ID!, commentText: String!): Post
        removeSecondLevelComment(postId: ID!, commentId: ID!, secondLevelCommentId: ID!): Post
        followProfile(profileId: ID!): Profile
        unfollowProfile(profileId: ID!): Profile
        createTrip(name: String!): TripInfo
        removeTrip(tripId: ID!): TripInfo
        updateTrip(tripId: ID!, tripInfo: TripInput!): FlightOffer
        addItinerary(tripId: ID!, itinerary: ItineraryInput!): TripInfo
    }
`;

module.exports = typeDefs;