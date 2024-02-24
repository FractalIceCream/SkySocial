import { gql } from '@apollo/client';

// did not do flight offer yet
// did not do myTripInfo yet until we know what fields we are actually wanting

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
  me 
  {
    _id
    email
    name
    posts
    
      }
    } `;
     
    // {
    //   _id
    //   postAuthor
    //   postText
    //   imageUrl
    //   createdAt
    //   comments 
    //   {
    //     _id
    //     commentText
    //     commentAuthor
    //     createdAt
    //     secondLevelComments 
    //     {
    //       _id
    //       secondLevelcommentText
    //       secondLevelcommentAuthor
    //       secondLevelcreatedAt
    //     }
    //   }
    // }
    // wishlist 
    // {
    //   _id
    //   name
    //   originLocationCode
    //   destinationLocationCode
    //   departureDate
    //   returnDate
    //   adults
    //   children
    //   infants
    //   travelClass
    //   includedAirlineCodes
    //   excludedAirlineCodes
    //   nonStop
    //   currencyCode
    //   maxPrice
    //   max
    //   itinerary 
    //   {
    //     departureDate
    //     departureCode
    //     arrivalDate
    //     arrivalCode
    //     price
    //   }
    // }
//   }
// }
// `;

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

export const QUERY_FOLLOWING = gql`
  query Query {
    following {
      _id
      email
      name
    }
  }
`;

export const MY_TRIPINFO = gql`
query MyTripinfo {
    myTripinfo {
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
