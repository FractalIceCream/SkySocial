import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
mutation Mutation($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        email
        name
      }
    }
  }
`;

export const LOGIN_PROFILE = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        email
        name
      }
    }
 }  
`;

export const CREATE_POST = gql`
mutation Mutation($postText: String!, $imageUrl: String) {
    createPost(postText: $postText, imageUrl: $imageUrl) {
      _id
      postAuthor
      postText
      imageUrl
      createdAt
      comments {
        _id
        commentAuthor
        commentText
        createdAt
        secondLevelComments {
          _id
          secondLevelcommentAuthor
          secondLevelcommentText
          secondLevelcreatedAt
        }
      }
    }
  }
`;

export const REMOVE_POST = gql`
mutation Mutation($postId: ID!) {
    removePost(postId: $postId) {
      _id
      postAuthor
      postText
      imageUrl
      createdAt
      comments {
        _id
        commentAuthor
        commentText
        createdAt
        secondLevelComments {
          _id
          secondLevelcommentAuthor
          secondLevelcommentText
          secondLevelcreatedAt
        }
      }
    }
  }
`;

export const ADD_LIKE = gql`
mutation Mutation($postId: ID!) {
  likePost(postId: $postId) {
    likes {
      _id
    }
  }
}`;

export const REMOVE_LIKE = gql`
mutation Mutation($postId: ID!) {
  unlikePost(postId: $postId) {
    likes {
      _id
    }
  }
}`;

export const CREATE_COMMENT = gql`
mutation Mutation($postId: ID!, $commentText: String!) {
    createComment(postId: $postId, commentText: $commentText) {
      _id
      postAuthor
      postText
      imageUrl
      createdAt
      comments {
        _id
        commentAuthor
        commentText
        createdAt
        secondLevelComments {
          _id
          secondLevelcommentAuthor
          secondLevelcommentText
          secondLevelcreatedAt
        }
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
mutation Mutation($postId: ID!, $commentId: String!) {
    removeComment(postId: $postId, commentId: $commentId) {
      _id
      postAuthor
      postText
      imageUrl
      createdAt
      comments {
        _id
        commentAuthor
        commentText
        createdAt
        secondLevelComments {
          _id
          secondLevelcommentAuthor
          secondLevelcommentText
          secondLevelcreatedAt
        }
      }
    }
  }
`;

export const CREATE_SECOND_LEVEL_COMMENT = gql`
mutation Mutation($postId: ID!, $commentId: ID!, $commentText: String!) {
    createSecondLevelComment(postId: $postId, commentId: $commentId, commentText: $commentText) {
      _id
      postAuthor
      postText
      imageUrl
      createdAt
      comments {
        _id
        commentAuthor
        commentText
        createdAt
        secondLevelComments {
          _id
          secondLevelcommentAuthor
          secondLevelcommentText
          secondLevelcreatedAt
        }
      }
    }
  }
`;

export const REMOVE_SECOND_LEVEL_COMMENT = gql`
mutation Mutation($postId: ID!, $commentId: ID!, $secondLevelCommentId: ID!) {
    removeSecondLevelComment(postId: $postId, commentId: $commentId, secondLevelCommentId: $secondLevelCommentId) {
      _id
      postAuthor
      postText
      imageUrl
      createdAt
      comments {
        _id
        commentAuthor
        commentText
        createdAt
        secondLevelComments {
          _id
          secondLevelcommentAuthor
          secondLevelcommentText
          secondLevelcreatedAt
        }
      }
    }
  }
`;

// double check this is all we'll need returned back
export const FOLLOW_PROFILE = gql`
mutation Mutation($profileId: ID!) {
    followProfile(profileId: $profileId) {
      _id
      email
      name
    }
  }
`;

// double check this is all we'll need returned back
export const UNFOLLOW_PROFILE = gql`
mutation Mutation($profileId: ID!) {
    unfollowProfile(profileId: $profileId) {
      _id
      email
      name
    }
  }
`;

export const CREATE_TRIP = gql`
mutation Mutation($name: String!) {
    createTrip(name: $name) {
      _id
      name
      departureDate
      returnDate
      originLocationCode
      destinationLocationCode
      adults
      children
      infants
    }
  }
`;


export const REMOVE_TRIP = gql`
  mutation Mutation($tripId: ID!) {
    removeTrip(tripId: $tripId) {
      _id
      name
      departureDate
      returnDate
      originLocationCode
      destinationLocationCode
      adults
      children
      infants
    }
  }
`;

export const UPDATE_TRIP = gql ` 
mutation Mutation($tripId: ID!, $tripInfo: TripInput!) {
  updateTrip(tripId: $tripId, tripInfo: $tripInfo) {
    departureDate
    departureCode
    arrivalDate
    arrivalCode
    departureDateR
    arrivalDateR
    price
  }
}`;

export const ADD_ITINERARY =gql`
mutation Mutation($tripId: ID!, $itinerary: ItineraryInput!) {
  addItinerary(tripId: $tripId, itinerary: $itinerary) {
    _id
    name
    originLocationCode
    destinationLocationCode
    departureDate
    returnDate
    adults
    children
    infants
    travelClass
    includedAirlineCodes
    excludedAirlineCodes
    nonStop
    currencyCode
    maxPrice
    max
    itinerary {
      departureDate
      departureCode
      arrivalDate
      arrivalCode
      departureDateR
      arrivalDateR
      price
    }
    count
  }
}
`;