import { gql } from '@apollo/client';

export const QUERY_SINGLE_PROFILE = gql`
query Query($name: String!) {
    profile(name: $name) {
      _id
      name
      posts {
        _id
        postAuthor
        postText
        imageUrl
        createdAt
        comments {
          _id
          commentText
          commentAuthor
          createdAt
          secondLevelComments {
            _id
            secondLevelcommentText
            secondLevelcommentAuthor
            secondLevelcreatedAt
          }
        }
      }
      wishlist {
        _id
        name
      }
      following {
        _id
      }
    }
  }
`;

export const QUERY_ME = gql`
query Query {
    me {
      _id
      name
      email
      posts {
        _id
        postAuthor
        postText
        imageUrl
        createdAt
        comments {
          _id
          commentText
          commentAuthor
          createdAt
          secondLevelComments {
            _id
            secondLevelcommentText
            secondLevelcommentAuthor
            secondLevelcreatedAt
          }
        }
      }
      wishlist {
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
      }
      following {
        _id
        name
      }
    }
  }
`;

export const QUERY_POST = gql`
query Query {
    posts {
      _id
      postAuthor
      postText
      imageUrl
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
        secondLevelComments {
          _id
          secondLevelcommentText
          secondLevelcommentAuthor
          secondLevelcreatedAt
        }
      }
    }
  }
`;
